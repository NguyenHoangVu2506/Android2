
import { useNavigation } from '@react-navigation/native';
import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native';

const CategoryItem = ({ image, title, navigation }) => {
  return (
    <TouchableOpacity style={styles.categoryItem} onPress={() => navigation.navigate('ProductCategory')}>
      <Image source={image} style={styles.categoryImage} />
      <Text style={styles.categoryTitle}>{title}</Text>
    </TouchableOpacity>
  );
};

const Categories = () => {
  const categories = [

    { id: 5, title: 'Mô hình Anime', image: require('../../assets/images/cate01.png'),name: 'Mô hình Anime' },
    { id: 6, title: 'Mô hình kiến trúc', image: require('../../assets/images/cate02.png') ,name: 'Gundam Bandai' },
    { id: 7, title: 'Mô hình xe', image: require('../../assets/images/cate03.png'),name: 'Xe máy' },
    { id: 5, title: 'Mô hình DragonBall', image: require('../../assets/images/cate04.png'),name: 'Gundam giá rẻ' },
    { id: 6, title: 'Mô hình ', image: require('../../assets/images/cate05.png'),name: 'Gundam Bandai' },
    { id: 7, title: 'Mô hình khác', image: require('../../assets/images/cate06.png') ,name: 'Mô hình lắp ráp khác'},


    // Add more categories as needed
  ];

  const navigation = useNavigation();

  return (
    <View style={styles.container} >
      {categories.map((category,index) => (
        <TouchableOpacity key={index} style={styles.categoryItem} onPress={() => navigation.navigate('ProductCategory',{titleCategory:category.name})}>
          <Image source={category.image} style={styles.categoryImage} />
          <Text style={styles.categoryTitle}>{category.title}</Text>
        </TouchableOpacity>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 10,
    marginBottom: 20,
    flexWrap: 'wrap',
  },
  categoryItem: {
    width: '32%', 
    marginVertical: 10,
    alignItems: 'center',
  },
  categoryImage: {
    width: 70,
    height: 70,
    borderRadius: 10,
  },
  categoryTitle: {
    marginTop: 5,
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'center', 
    flexWrap: 'wrap', 
    lineHeight: 20,
  },
});

export default Categories;