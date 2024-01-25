import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, FlatList } from 'react-native';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Icon from 'react-native-vector-icons/FontAwesome';
import Categories from './Categories';
import { urlImage } from '../config';
import StoreProductsService from '../services/StoreProductsService';
import accounting from "accounting";
import StarRating from 'react-native-star-rating';
const Product = ({ navigation }) => {
  const [AllProducts, setAllProducts] = useState([]);
  const [page, setPage] = useState(1);
  const [product_qty, setProduct_qty] = useState([]);

  const [end_page, setEndPage] = useState(1);
  const PageChange = (event, value) => {
    setPage(value);
  };
  const [viewMode, setViewMode] = useState("grid");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const products_data = await StoreProductsService.getNewProductAll(8, page);
        if (products_data.data.success === true) {
          setAllProducts(products_data.data.new_products_all);
          setEndPage(products_data.data.end_page);
          setProduct_qty(products_data.data.product_qty);

        } else {
          // Xử lý lỗi nếu cần thiết
        }
      } catch (error) {
        console.error(error);
      }
    };

    fetchData();
  }, [page]);
  const addToCart = async (selectedProducts) => {
    try {
      const existingCartItems = await AsyncStorage.getItem('cartItems');
      let cartItems = [];

      if (existingCartItems) {
        cartItems = JSON.parse(existingCartItems);
      }

      cartItems.push(...selectedProducts);

      await AsyncStorage.setItem('cartItems', JSON.stringify(cartItems));

      console.log('Products added to cart:', cartItems);
    } catch (error) {
      console.log('Error adding products to cart:', error);
    }
  };

  const [selectedItems, setSelectedItems] = useState([]);

  const addToCartAndToggleSelection = (item) => {
    addToCart([item]);
    setSelectedItems((prevSelectedItems) => [...prevSelectedItems, item.product_id]);
  };

  const renderProductItem = ({ item }) => {
    const isSelected = selectedItems.includes(item.product_id);
    // const filteredProducts = selectedCategory
    //   ? AllProducts.filter((new_products_all) => new_products_all.category_name === selectedCategory)
    //   : AllProducts;
    return (
      <TouchableOpacity
        style={[
          styles.productItem,
          { backgroundColor: isSelected ? '#e0e0e0' : '#f2f2f2' },
        ]}
        onPress={() => navigation.navigate('Detail', { new_products_all: item })}
      >
        {/* <Image src='http://192.168.1.9/nguyenhoanvu/public/images/product/product18.jpg' /> */}
        <Image
          source={{
            uri: urlImage + 'product/' + item.product_image,
            cache: 'only-if-cached',
          }}
          style={{ width: 150, height: 150 }}
        />

        <Text style={styles.productName}>{item.product_name}</Text>
        <Text style={styles.productPrice}>{accounting.formatNumber(item.import_price, 0, ".", ",")} đ</Text>
        <StarRating
          disabled={true}
          maxStars={5}
          rating={item.rating_score || 0}
          starSize={20}
          fullStarColor="gold"
          containerStyle={{ paddingVertical: 10 }}
        />
        <TouchableOpacity
          style={styles.cartButton}
          onPress={() => addToCartAndToggleSelection(item)}
        >
          <Icon name="shopping-cart" size={24} color="white" />
        </TouchableOpacity>
      </TouchableOpacity>
    );
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Sản phẩm</Text>
      </View>
      <View style={styles.productList}>
        <FlatList
          data={AllProducts}
          renderItem={renderProductItem}
          keyExtractor={(item) => item.product_id}
          numColumns={2}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  header: {
    paddingVertical: 20,
    paddingHorizontal: 10,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  productList: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    paddingHorizontal: 10,
    paddingBottom: 20,
  },
  productItem: {
    width: '48%',
    alignItems: 'center',
    justifyContent: 'center',
    marginVertical: 10,
    marginHorizontal: '1%',
    padding: 20,
    backgroundColor: '#f2f2f2',
    borderRadius: 8,
  },
  productImage: {
    width: 150,
    height: 150,
    marginBottom: 10,
    resizeMode: 'cover',
  },
  productName: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  productPrice: {
    fontSize: 14,
    color: '#888',
  },
  cartButton: {
    backgroundColor: 'red',
    padding: 10,
    marginTop: 10,
    borderRadius: 5,
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default Product;