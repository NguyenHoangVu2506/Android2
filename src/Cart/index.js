import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity, Image } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';

const Cart = () => {
  const [cartItems, setCartItems] = useState([]);

  useEffect(() => {
    getCartItems();
  }, []);

  const getCartItems = async () => {
    try {
      const existingCartItems = await AsyncStorage.getItem('cartItems');

      if (existingCartItems) {
        const parsedCartItems = JSON.parse(existingCartItems);
        setCartItems(parsedCartItems);
      }
    } catch (error) {
      console.log('Error retrieving cart items:', error);
    }
  };

  const addToCart = async (item) => {
    try {
      let updatedCartItems = [];

      const existingCartItems = await AsyncStorage.getItem('cartItems');

      if (existingCartItems) {
        const parsedCartItems = JSON.parse(existingCartItems);

        // Kiểm tra xem sản phẩm đã tồn tại trong giỏ hàng chưa
        const existingItem = parsedCartItems.find((cartItem) => cartItem.id === item.id);

        if (existingItem) {
          // Nếu sản phẩm đã tồn tại, tăng số lượng lên 1
          updatedCartItems = parsedCartItems.map((cartItem) => {
            if (cartItem.id === item.id) {
              return {
                ...cartItem,
                quantity: cartItem.quantity + 1,
              };
            }
            return cartItem;
          });
        } else {
          // Nếu sản phẩm chưa tồn tại, thêm vào giỏ hàng với số lượng mặc định là 1
          updatedCartItems = [...parsedCartItems, { ...item, quantity: 1 }];
        }
      } else {
        // Nếu giỏ hàng rỗng, thêm sản phẩm vào giỏ hàng với số lượng mặc định là 1
        updatedCartItems = [{ ...item, quantity: 1 }];
      }

      // Cập nhật danh sách sản phẩm mới vào AsyncStorage
      await AsyncStorage.setItem('cartItems', JSON.stringify(updatedCartItems));

      // Cập nhật danh sách sản phẩm trong state
      setCartItems(updatedCartItems);
    } catch (error) {
      console.log('Error adding to cart:', error);
    }
  };

  const removeCartItem = async (itemId) => {
    try {
      const existingCartItems = await AsyncStorage.getItem('cartItems');

      if (existingCartItems) {
        const parsedCartItems = JSON.parse(existingCartItems);

        const updatedCartItems = parsedCartItems.filter((item) => item.id !== itemId);

        await AsyncStorage.setItem('cartItems', JSON.stringify(updatedCartItems));

        setCartItems(updatedCartItems);
      }
    } catch (error) {
      console.log('Error removing cart item:', error);
    }
  };

  const clearCart = async () => {
    try {
      await AsyncStorage.removeItem('cartItems');
      setCartItems([]);
    } catch (error) {
      console.log('Error clearing cart:', error);
    }
  };

  const renderCartItem = ({ item }) => {
    return (
      <View key={item.id} style={styles.cartItem}>
        <Image source={{ uri: item.images[0] }} style={styles.productImage} />
        <Text style={styles.productName}>{item.title}</Text>
        <Text style={styles.productPrice}>{item.price}</Text>
        <View style={styles.quantityContainer}>
          <TouchableOpacity onPress={() => removeCartItem(item.id)} style={styles.removeButton}>
            <Text style={styles.removeButtonText}>Xóa</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => addToCart(item)} style={styles.addButton}>
            <Text style={styles.addButtonText}>+</Text>
          </TouchableOpacity>
          <Text style={styles.quantityText}>{item.quantity}</Text>
        </View>
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Giỏ hàng</Text>
      <TouchableOpacity onPress={clearCart} style={styles.clearButton}>
        <Text style={styles.clearButtonText}>Xóa tất cả</Text>
      </TouchableOpacity>
      <FlatList
        data={cartItems}
renderItem={renderCartItem}
        keyExtractor={(item) => item.id.toString()}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    paddingHorizontal: 10,
    paddingVertical: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  cartItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
  productImage: {
    width: 80,
    height: 80,
    resizeMode: 'cover',
    borderRadius: 5,
  },
  productName: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  productPrice: {
    fontSize: 14,
    color: '#888',
  },
  removeButton: {
    backgroundColor: '#ff0000',
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 5,
  },
  removeButtonText: {
    color: '#fff',
  },
  clearButton: {
    backgroundColor: '#ff0000',
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 5,
    marginTop: 10,
    alignSelf: 'flex-start',
  },
  clearButtonText: {
    color: '#fff',
  },
});

export default Cart;