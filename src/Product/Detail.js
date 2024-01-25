import React from 'react';
import { TouchableOpacity } from 'react-native';
import { View, Text, StyleSheet, Image } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { urlImage } from '../config';
import accounting from "accounting";
import StarRating from 'react-native-star-rating';

const Detail = ({ route }) => {
  const { new_products_all } = route.params;

  const addToCart = async () => {
    try {
      // Get the existing cart items from AsyncStorage
      const existingCartItems = await AsyncStorage.getItem('cartItems');
      let cartItems = [];

      if (existingCartItems) {
        cartItems = JSON.parse(existingCartItems);
      }
      cartItems.push(new_products_all);
      await AsyncStorage.setItem('cartItems', JSON.stringify(cartItems));
      console.log('Product added to cart:', new_products_all);
    } catch (error) {
      console.log('Error adding product to cart:', error);
    }
  };
  return (
    <View style={styles.container}>
      <Image
        source={{
          uri: urlImage + 'product/' + new_products_all.product_image,
          cache: 'only-if-cached',
        }}
        style={{ width: 150, height: 150 }}
      />
      <Text style={styles.productName}>{new_products_all?.product_name}</Text>
      <Text style={styles.productPrice}>{accounting.formatNumber(new_products_all?.import_price, 0, ".", ",")} đ</Text>
      <StarRating
        disabled={true}
        maxStars={5}
        rating={new_products_all.rating_score || 0}
        starSize={20}
        fullStarColor="gold"
        containerStyle={{ paddingVertical: 10 }}
      />
      <Text style={styles.productDescription}>Chi tiết: {new_products_all?.product_detail}</Text>
      <TouchableOpacity style={styles.cartButton} onPress={addToCart}>
        <Icon name="shopping-cart" size={24} color="white" />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
  productImage: {
    width: 200,
    height: 200,
    resizeMode: 'cover',
    marginBottom: 10,
  },
  productName: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  productPrice: {
    fontSize: 18,
    marginBottom: 10,
  },
  productDescription: {
    fontSize: 16,
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

export default Detail;