
import React from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import Home from './src/Home';
import Login from './src/Login';
import Detail from './src/Product/Detail';
import Cart from './src/Cart';
import Router from './src/router';
import Register from './src/Login/register';
import SearchProduct from './src/SearchProduct';
import ProductCategory from './src/ProductCategory';
import Payment from './src/Cart/Payment';

const Stack = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <StatusBar style="auto" />
      <Stack.Navigator initialRouteName="Login">
        {/* <Stack.Screen name="Router" component={Router} options={{ headerShown: false }} /> */}
        <Stack.Screen name="Home" component={Home} options={{ headerShown: false }} />
        <Stack.Screen name="Detail" component={Detail} options={{ headerShown: false }} />
        <Stack.Screen name="Cart" component={Cart} options={{ headerShown: false }} />
        <Stack.Screen name="Login" component={Login} options={{ headerShown: false }} />
        <Stack.Screen name="Register" component={Register} options={{ headerShown: false }} />
        <Stack.Screen name="SearchProduct" component={SearchProduct} options={{ headerShown: false }} />
        <Stack.Screen name="ProductCategory" component={ProductCategory} options={{ headerShown: false }} />
        <Stack.Screen name="Payment" component={Payment} />

      </Stack.Navigator>
      <Router/>
    </NavigationContainer>
  );
}