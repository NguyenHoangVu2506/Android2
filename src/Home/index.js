import React, { useState } from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, TextInput, ScrollView } from 'react-native';
import Product from './Product';
import Categories from './Categories';
import Banner from './Banner';
import Search from './Search';




const Home = ({ navigation }) => {
    const [selectedCategory, setSelectedCategory] = useState(null);

  const handleCategoryPress = (category) => {
    setSelectedCategory(category);
  };
    return (
        <ScrollView>
            <View style={styles.container}>
                <Search />
                <View style={styles.sliderContainer}>
                    <Banner />
                </View>
                <View style={styles.categoryContainer}>
          <Categories
            selectedCategory={selectedCategory}
            onCategoryPress={handleCategoryPress}
          />
        </View>
                <View style={styles.productContainer}>
                    <Product navigation={navigation} />
                    {/* All product components go here */}
                </View>
            </View>

        </ScrollView>
    );
};


const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white',
    },
    searchContainer: {
        // Style the search container as per your requirements
    },
    sliderContainer: {
        // Style the slider container as per your requirements
    },
    categoryContainer: {
        // Style the category container as per your requirements
    },
    productContainer: {
        // Style the product container as per your requirements
    },
});

export default Home;

