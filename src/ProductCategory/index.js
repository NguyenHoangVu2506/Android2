import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, FlatList, ScrollView } from 'react-native';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Icon from 'react-native-vector-icons/FontAwesome';
import { useNavigation } from '@react-navigation/native';
import { urlImage } from '../config';

const ProductCategory = ({ route }) => {
    const [AllProducts, setAllProducts] = useState([]);

    const { titleCategory } = route.params;

    const navigation = useNavigation();


    useEffect(() => {
        getAllProduct();
    }, []);

    const getAllProduct = () => {
        axios
            .get('http://172.16.8.97/nguyenhoanvu/public/api/product_store/getNewProductAll/16/1')
            .then(function (response) {
                const listPro = response.data.new_products_all;
                setAllProducts(listPro);
                handleCategory(listPro);
            })
            .catch(function (error) {
                console.log(error.message);
            });
    };

    const handleCategory = (AllProducts) => {
        const filteredProducts = AllProducts.filter((new_products_all) =>
            new_products_all.category_name.toLowerCase().includes(titleCategory.toLowerCase())
        );
        setAllProducts(filteredProducts);
        // console.log(filteredProducts);
        // navigateSearch(filteredProducts);
    };


    const renderProductItem = ({ item }) => {
        return (
            <TouchableOpacity
                style={[
                    styles.productItem,
                    //   { backgroundColor: isSelected ? '#e0e0e0' : '#f2f2f2' },
                ]}
                onPress={() => navigation.navigate('Detail', { new_products_all: item })}
            >
                <Image
                    source={{
                        uri: urlImage + 'product/' + item.product_image,
                        cache: 'only-if-cached',
                    }}
                    style={{ width: 150, height: 150 }}
                />
                <Text style={styles.productName}>{item.product_name}</Text>
                <Text style={styles.productPrice}>{item.import_price}</Text>
                <TouchableOpacity
                    style={styles.cartButton}
                    onPress={() => navigation.navigate('Detail', { product: item })}

                //   onPress={() => addToCartAndToggleSelection(item)}
                >
                    <Text style={{ color: 'red' }}>Chi tiết</Text>
                </TouchableOpacity>
            </TouchableOpacity>
        );
    };

    return (
        <ScrollView contentContainerStyle={styles.container}>
            <View style={styles.header}>
                <Text style={styles.title}>Danh mục {titleCategory}</Text>
            </View>
            <View style={styles.productList}>
                <FlatList
                    data={AllProducts}
                    renderItem={renderProductItem}
                    keyExtractor={(item) => item.product_id}
                    numColumns={2}
                />
            </View>
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    container: {
        flexGrow: 1,
        backgroundColor: '#fff',
    },
    header: {
        paddingVertical: 20,
        paddingHorizontal: 10,
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 10,
    },
    productList: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'space-between',
        paddingHorizontal: 10,
        paddingBottom: 20,
    },
    productItem: {
        width: '48%',
        alignItems: 'center',
        justifyContent: 'center',
        marginVertical: 10,
        marginHorizontal: '1%',
        padding: 20,
        backgroundColor: '#f2f2f2',
        borderRadius: 8,
    },
    productImage: {
        width: 150,
        height: 150,
        marginBottom: 10,
        resizeMode: 'cover',
    },
    productName: {
        fontSize: 16,
        fontWeight: 'bold',
        marginBottom: 5,
    },
    productPrice: {
        fontSize: 14,
        color: '#888',
    },
    cartButton: {
        // backgroundColor: 'red',
        padding: 10,
        marginTop: 10,
        borderRadius: 5,
        alignItems: 'center',
        justifyContent: 'center',
    },
});

export default ProductCategory;