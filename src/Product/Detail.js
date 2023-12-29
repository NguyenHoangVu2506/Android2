import React from 'react';
import { TouchableOpacity } from 'react-native';
import { View, Text, StyleSheet, Image } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import AsyncStorage from '@react-native-async-storage/async-storage';

const Detail = ({ route }) => {
  const { product } = route.params;

  const addToCart = async () => {
    try {
      // Get the existing cart items from AsyncStorage
      const existingCartItems = await AsyncStorage.getItem('cartItems');
      let cartItems = [];

      if (existingCartItems) {
        // If there are existing cart items, parse the JSON string and add them to the cartItems array
        cartItems = JSON.parse(existingCartItems);
      }

      // Add the current product to the cartItems array
      cartItems.push(product);

      // Store the updated cart items in AsyncStorage
      await AsyncStorage.setItem('cartItems', JSON.stringify(cartItems));

      console.log('Product added to cart:', product);
    } catch (error) {
      console.log('Error adding product to cart:', error);
    }
  };  
  return (
    <View style={styles.container}>
      <Image source={{ uri: product.images[0] }} style={styles.productImage} />
      <Text style={styles.productName}>{product.title}</Text>
      <Text style={styles.productPrice}>{product.price}</Text>
      <Text style={styles.productDescription}>Chi tiết: {product.description}</Text>
      <TouchableOpacity style={styles.cartButton} onPress={addToCart}>
        <Icon name="shopping-cart" size={24} color="white"/>
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