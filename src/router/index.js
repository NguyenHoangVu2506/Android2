// import React from 'react';
// import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
// import Home from '../../components/home';
// import ShoppingCart from '../../components/ShoppingCart';
// const Tab = createBottomTabNavigator();

// function Router() {
//   return (
//     <Tab.Navigator>
//       <Tab.Screen name="Trang chủ" component={Home} />
//       <Tab.Screen name="Giỏ hàng" component={ShoppingCart} />
//     </Tab.Navigator>
//   );
// }

// export default Router;
import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons } from '@expo/vector-icons';
import Home from '../Home';
import Cart from '../Cart';

const Tab = createBottomTabNavigator();

const Router = () => {
  return (
    <Tab.Navigator>
      <Tab.Screen
        name="Trang chủ"
        component={Home}
        options={{
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="home" size={size} color={color} />
          ),
        }}
      />
      <Tab.Screen
        name="Giỏ hàng"
        component={Cart}
        options={{
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="cart" size={size} color={color} />
          ),
        }}
      />
    </Tab.Navigator>
  );
};

export default Router;