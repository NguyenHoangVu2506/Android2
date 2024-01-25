import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity, Image } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/FontAwesome';
import { FontAwesome5 } from 'react-native-vector-icons';
import { urlImage } from '../config';
import accounting from 'accounting';
const Cart = () => {
  const [cartItems, setCartItems] = useState([]);
  const navigation = useNavigation();

  useEffect(() => {
    getCartItems();
  }, []);

  const resetCart = async () => {
    try {
      await AsyncStorage.removeItem('cartItems');
      setCartItems([]);
      getCartItems();
      navigation.navigate('Payment');
    } catch (error) {
      console.log('Error resetting cart:', error);
    }
  };
  const getCartItems = async () => {
    try {
      const existingCartItems = await AsyncStorage.getItem('cartItems');
  
      if (existingCartItems) {
        const parsedCartItems = JSON.parse(existingCartItems);
  
        const updatedCartItems = parsedCartItems.reduce((updatedItems, item) => {
          const existingItem = updatedItems.find(i => i.product_id === item.product_id);
          if (existingItem) {
            existingItem.quantity += 1;
          } else {
            updatedItems.push({ ...item, quantity: 1 });
          }
          return updatedItems;
        }, []);
  
        setCartItems(updatedCartItems);
      }
    } catch (error) {
      console.log('Error retrieving cart items:', error);
    }
  };
const removeCartItem = async (itemId) => {
  try {
    const updatedCartItems = cartItems.filter(item => item.product_id !== itemId);

    await AsyncStorage.setItem('cartItems', JSON.stringify(updatedCartItems));

    setCartItems(updatedCartItems);
  } catch (error) {
    console.log('Error removing cart item:', error);
  }
};
  const increaseQuantity = (itemId) => {
    const updatedCartItems = cartItems.map(item => {
      if (item.product_id === itemId) {
        return { ...item, quantity: item.quantity ? item.quantity + 1 : 1 };
      }
      return item;
    });
  
    setCartItems(updatedCartItems);
  };
  
  const decreaseQuantity = (itemId) => {
    const itemIndex = cartItems.findIndex(item => item.product_id === itemId);
  
    if (itemIndex !== -1 && cartItems[itemIndex].quantity > 1) {
      const updatedCartItems = [...cartItems];
      updatedCartItems[itemIndex].quantity = updatedCartItems[itemIndex].quantity - 1;
      setCartItems(updatedCartItems);
    }
  };
  const calculateTotalPrice = () => {
    return cartItems.reduce((total, item) => total + item.import_price * item.quantity, 0);
  };

  const renderCartItem = ({ item }) => {
    return (
      <View style={styles.cartItem}>
        {/* <Image source={{ uri: item.images[0] }} style={styles.productImage} /> */}
        <View style={styles.productInfo}>
        <Image
          source={{
            uri: urlImage + 'product/' + item.product_image,
            cache: 'only-if-cached',
          }}
          style={{ width: 150, height: 150 }}
        />
          <Text style={styles.productName}>{item.product_name}</Text>
          <Text style={styles.productPrice}>{accounting.formatNumber(item.import_price, 0, ".", ",")} đ</Text>
        </View>
        <View style={styles.quantityContainer}>
          <TouchableOpacity onPress={() => decreaseQuantity(item.product_id)} style={styles.quantityButton}>
            <Text style={styles.quantityButtonText}>-</Text>
          </TouchableOpacity>
          <Text style={styles.quantity}>{item.quantity}</Text>
          <TouchableOpacity onPress={() => increaseQuantity(item.product_id)} style={styles.quantityButton}>
            <Text style={styles.quantityButtonText}>+</Text>
          </TouchableOpacity>
        </View>
        <TouchableOpacity onPress={() => removeCartItem(item.product_id)} style={styles.removeButton}>
          <Text style={styles.removeButtonText}>Xóa</Text>
        </TouchableOpacity>
      </View>
    );
  };

  return (
    <View style={styles.container}>
       <View style={styles.buttonContainer}>
        <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('Home')}>
        <FontAwesome5 name="home" size={30} color="#444" />
        </TouchableOpacity>
      </View>
      <Text style={styles.title}>Giỏ hàng</Text>
      {cartItems.length > 0 ? (
        <>
          <FlatList
            data={cartItems}
            renderItem={renderCartItem}
            keyExtractor={(item) => item.product_id}
          />
          <View style={styles.totalContainer}>
            <Text style={styles.totalText}>Tổng tiền:</Text>
            <Text style={styles.totalPrice}>{accounting.formatNumber(calculateTotalPrice(), 0, ".", ",")} đ</Text>
          </View>
        </>
      ) : (
        <Text style={styles.emptyText}>Giỏ hàng trống</Text>
      )}
     <TouchableOpacity style={styles.button} onPress={() => { resetCart(); navigation.navigate('Payment'); }}>
        <Text style={styles.buttonText}>Thanh toán</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    paddingHorizontal: 10,
 
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    paddingRight: 20,
  },
  button: {
    marginLeft: 10,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  emptyText: {
    fontSize: 18,
    alignSelf: 'center',
    marginTop: 20,
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
  productInfo: {
    flex: 1,
    marginLeft: 10,
  },
  productName: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  productPrice: {
    fontSize: 14,
    color: '#888',
  },
  quantityContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  quantityButton: {
    backgroundColor: '#66CCFF',
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 5,
    marginRight: 5,
  },
  quantityButtonText: {
    color: '#fff',
  },
  quantity: {
    fontSize: 16,
    fontWeight: 'bold',
    marginHorizontal: 5,
  },
  removeButton: {
    backgroundColor: '#66CCFF',
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 5,
  },
  removeButtonText: {
    color: 'black',
  },
  button: {
    backgroundColor: '#66CCFF',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
    marginBottom: 10,
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  totalContainer: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    marginTop: 10,
  },
  totalText: {
    fontWeight: 'bold',
    marginRight: 10,
  },
  totalPrice: {
    fontWeight: 'bold',
  },
});

export default Cart;

