import React, { useState, useEffect } from 'react';
import { View, TextInput, StyleSheet, TouchableOpacity, Text } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';

const Search = () => {
  const [searchInput, setSearchInput] = useState('');
  const [products, setProducts] = useState([]);


  const [cartItemCount, setCartItemCount] = useState(0);

  const navigation = useNavigation();

  const navigateToCart = () => {
    navigation.navigate('Cart');
  };

  const navigateSearch = (products) => {
    // console.log(products);
    navigation.navigate('SearchProduct', { products: products });
  };

  useEffect(() => {
    getAllProduct();

  }, [cartItemCount]);

  const getCartItems = async () => {
    try {
      const existingCartItems = await AsyncStorage.getItem('cartItems');
      const cartItems = JSON.parse(existingCartItems);
      const itemCount = cartItems ? cartItems.length : 0;
      console.log(itemCount);
      setCartItemCount(itemCount);
    } catch (error) {
      console.log( error);
    }
  }

  useEffect(() => {
    getCartItems();
  }, [cartItemCount]);

  const handleSearch = () => {
    const pro = products.new_products_all;
    const filteredProducts = pro.filter((product) =>
      product.product_name.toLowerCase().includes(searchInput.toLowerCase())
      
    );
    navigateSearch(filteredProducts);
  };

  const getAllProduct = () => {
    axios
      .get('http://172.16.8.97/nguyenhoanvu/public/api/product_store/getNewProductAll/16/1')
      
      .then(function (response) {
        setProducts(response.data);
      })
      .catch(function (error) {
        // handle error
        alert(error.message);
      });
  };
  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        placeholder="Search"
        value={searchInput}
        onChangeText={setSearchInput}
      />
      <TouchableOpacity style={styles.searchButton}
        onPress={handleSearch}>

        <Ionicons name="search" size={24} color="white" />
      </TouchableOpacity>


      <TouchableOpacity style={styles.cartButton} onPress={navigateToCart}>
        <Ionicons name="cart" size={24} color="white" />
        {cartItemCount > 0 && <Text style={styles.cartItemCount}>{cartItemCount}</Text>}
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    // backgroundColor: '#f2f2f2',
    paddingHorizontal: 10,
    borderRadius: 10,
    marginHorizontal: 10,
    marginVertical: 20,
  },
  input: {
    flex: 1,
    height: 40,
    fontSize: 16,
    backgroundColor: '#f2f2f2',

  },
  searchButton: {
    backgroundColor: '#007bff',
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 8,
  },
  cartButton: {
    backgroundColor: '#FF6600',
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 8,
    marginLeft: 10,
  },
  cartItemCount: {
    position: 'absolute',
    top: -5,
    right: -5,
    backgroundColor: 'red',
    color: 'white',
    fontSize: 12,
    paddingHorizontal: 4,
    paddingVertical: 2,
    borderRadius: 10,
    fontWeight: 'bold', 
    textAlign: 'center', 
    minWidth: 16, 
  },
});

export default Search;