import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, FlatList,Image } from 'react-native';
import { urlImage } from '../config';
import StarRating from 'react-native-star-rating';
import accounting from 'accounting';

const SearchProduct = ({ route, navigation }) => {
  const { products } = route.params;

  const renderProductItem = ({ item }) => {
    return (
      <TouchableOpacity
        style={styles.productItem}
        onPress={() => navigation.navigate('Detail', { product: item })}
      >
        <Image
          source={{
            uri: urlImage + 'product/' + item.product_image,
            cache: 'only-if-cached',
          }}
          style={{ width: 150, height: 150 }}
        />
        <Text style={styles.productName}>{item.product_name}</Text>
        <Text style={styles.productPrice}>{accounting.formatNumber(item.import_price, 0, ".", ",")} đ</Text>

        <StarRating
          disabled={true}
          maxStars={5}
          rating={item.rating_score || 0}
          starSize={20}
          fullStarColor="gold"
          containerStyle={{ paddingVertical: 10 }}
        />
        <TouchableOpacity
          style={styles.cartButton}
          onPress={() => navigation.navigate('Detail', { product: item })}
        >
          <Text style={{ color: 'red' }}>Chi tiết</Text>
        </TouchableOpacity>
      </TouchableOpacity>
    );
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Sản phẩm tìm kiếm</Text>
      </View>
      {products.length > 0 ? (
        <FlatList
          data={products}
          renderItem={renderProductItem}
          keyExtractor={(item) => item.product_id.toString()}
          numColumns={2}
        />
      ) : (
        <View style={styles.productList}>
          <Text>Không có sản phẩm</Text>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
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
    justifyContent: 'space-between',
    paddingHorizontal: 10,
    paddingBottom: 20,
  },
  productItem: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    marginVertical: 10,
    marginHorizontal: 5,
    padding: 20,
    backgroundColor: '#f2f2f2',
    borderRadius: 8,
  },
  productName: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  cartButton: {
    padding: 10,
    marginTop: 10,
    borderRadius: 5,
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default SearchProduct;