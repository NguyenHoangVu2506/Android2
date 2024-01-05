import React, { useState, useEffect } from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { createStackNavigator } from '@react-navigation/stack';
import { useNavigation } from '@react-navigation/native';
import Login from '../Login';

const Stack = createStackNavigator();

export default function Setting() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isLoggedOut, setIsLoggedOut] = useState(false);
  const navigation = useNavigation();

  useEffect(() => {
    if (isLoggedOut) {
      setIsLoggedIn(false);
      navigation.navigate('Home');
    }
  }, [isLoggedOut]);

  const handleLogin = () => {
    setIsLoggedIn(true);
    setIsLoggedOut(false);
    navigation.navigate('Home');
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    setIsLoggedOut(true);
  };

  return (
    <>
      <StatusBar style="auto" />
      <Stack.Navigator>
        {isLoggedIn ? (
          <Stack.Screen
            name="Home"
            options={{
              headerTitle: () => (
                <View style={styles.headerContainer}>
                  <TouchableOpacity onPress={handleLogout}>
                    <Text style={styles.logoutText}>Đăng xuất</Text>
                  </TouchableOpacity>
                </View>
              ),
            }}
            component={HomeScreen}
          />
        ) : (
          <Stack.Screen
            name="Login"
            component={Login}
            options={{
              headerShown: false,
            }}
          />
        )}
      </Stack.Navigator>
    </>
  );
}

function HomeScreen() {
  return (
    <View style={styles.container}>
      <Text>Trang chủ</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  headerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  logoutText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: 'red',
    paddingHorizontal: 10,
  },
});