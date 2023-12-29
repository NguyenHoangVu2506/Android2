import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { NavigationContainer } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/FontAwesome';
import { Text, View } from 'react-native';

const tabIcons = [
  { name: 'home', label: 'Home', color: '#000000' },
  { name: 'user', label: 'Profile', color: '#000000' },
  { name: 'cog', label: 'Settings', color: '#000000' },
];

const HomeScreen = () => (
  <View>
  </View>
);


const ProfileScreen = () => (
  <View>
  </View>
);


const SettingsScreen = () => (
  <View>
  </View>
);


const Tab = createBottomTabNavigator();

const TabBar = () => {
  return (
    <NavigationContainer>
      <Tab.Navigator
        screenOptions={({ route }) => ({
          tabBarIcon: ({ focused, color, size }) => {
            const tabIcon = tabIcons.find(icon => icon.label === route.name);
            return (
              <Icon
                name={tabIcon.name}
                size={size}
                color={color}
              />
            );
          },
        })}
      >
        <Tab.Screen name="Home" component={HomeScreen} />
        <Tab.Screen name="Profile" component={ProfileScreen} />
        <Tab.Screen name="Settings" component={SettingsScreen} />
      </Tab.Navigator>
    </NavigationContainer>
  );
};

export default TabBar;


// import React, { useState } from 'react';
// import { View, StyleSheet, TouchableOpacity } from 'react-native';
// import Icon from 'react-native-vector-icons/FontAwesome';

// const TabBar = () => {
//   const [activeTab, setActiveTab] = useState('home');

//   const handleTabPress = (tabName) => {
//     setActiveTab(tabName);
//   };

//   return (
//     <View style={styles.tabBar}>
//       <TouchableOpacity
//         style={[styles.tabItem, activeTab === 'home' && styles.activeTabItem]}
//         onPress={() => handleTabPress('home')}
//       >
//         <Icon name="home" size={20} color={activeTab === 'home' ? '#000' : '#888'} />
//       </TouchableOpacity>
//       <TouchableOpacity
//         style={[styles.tabItem, activeTab === 'search' && styles.activeTabItem]}
//         onPress={() => handleTabPress('search')}
//       >
//         <Icon name="search" size={20} color={activeTab === 'search' ? '#000' : '#888'} />
//       </TouchableOpacity>
//       <TouchableOpacity
//         style={[styles.tabItem, activeTab === 'profile' && styles.activeTabItem]}
//         onPress={() => handleTabPress('profile')}
//       >
//         <Icon name="user" size={20} color={activeTab === 'profile' ? '#000' : '#888'} />
//       </TouchableOpacity>
//     </View>
//   );
// };

// const styles = StyleSheet.create({
//   tabBar: {
//     flexDirection: 'row',
//     backgroundColor: '#f2f2f2',
//     height: 50,
//     width:'100%',
//     justifyContent: 'space-around',
//     alignItems: 'center',
    
//   },
//   tabItem: {
//     flex: 1,
//     alignItems: 'center',
//     justifyContent: 'center',
//   },
//   activeTabItem: {
//     backgroundColor: '#ddd',
//   },
// });

// export default TabBar;