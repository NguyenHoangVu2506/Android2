import React, { useState } from 'react';
import { View, TextInput, StyleSheet, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';

const Search = () => {
  const [searchText, setSearchText] = useState('');

  const navigation = useNavigation();

  const navigateToCart = () => {
    navigation.navigate('Cart');
  };

  const handleSearch = () => {
    // Perform search logic based on the search text
    console.log('Performing search for:', searchText);
  };

  const viewCart = () => {
    // Handle logic for viewing the shopping cart
    console.log('Viewing shopping cart');
  };

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        placeholder="Search"
        value={searchText}
        onChangeText={setSearchText}
      />
      <TouchableOpacity style={styles.searchButton} onPress={handleSearch}>
        <Ionicons name="search" size={24} color="white" />
      </TouchableOpacity>
      <TouchableOpacity style={styles.cartButton} onPress={navigateToCart}>
        <Ionicons name="cart" size={24} color="white" />
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
});

export default Search;