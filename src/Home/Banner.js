import React, { useState } from 'react';
import { View, StyleSheet, Image, Dimensions } from 'react-native';
import Carousel, { Pagination } from 'react-native-snap-carousel';

const Banner = () => {
  const { width } = Dimensions.get('window');

  const slides = [
    {
      id: 1,
      image: require('../../assets/images/slider01.webp'),
    },
    {
      id: 2,
      image: require('../../assets/images/slider02.webp'),
    },
    {
      id: 3,
      image: require('../../assets/images/slider03.webp'),
    },
    // Add more slides as needed
  ];

  const [activeSlide, setActiveSlide] = useState(0);

  const renderItem = ({ item, index }) => {
    return (
      <View style={styles.slideContainer}>
        <Image source={item.image} style={styles.slideImage} />
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <Carousel
        data={slides}
        renderItem={renderItem}
        sliderWidth={width}
        itemWidth={width - 60} // Adjust the value for desired width
        layout="default"
        onSnapToItem={(index) => setActiveSlide(index)}
        loop
        autoplay
        autoplayInterval={3000} // Adjust the interval for autoplay
        autoplayDelay={1000} // Delay before autoplay starts
        loopClonesPerSide={slides.length}
      />
      <Pagination
        dotsLength={slides.length}
        activeDotIndex={activeSlide}
        containerStyle={styles.paginationContainer}
        dotStyle={styles.paginationDot}
        inactiveDotStyle={styles.paginationInactiveDot}
        inactiveDotOpacity={0.4}
        inactiveDotScale={0.6}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginVertical: 10,
    alignItems: 'center',
  },
  slideContainer: {
    width: Dimensions.get('window').width - 60, // Adjust the value for desired width
    height: Dimensions.get('window').width * 0.5, // Adjust the value for desired height
    borderRadius: 10,
    overflow: 'hidden',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#f2f2f2', // Add a background color for better visibility
  },
  slideImage: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
  },
  paginationContainer: {
    paddingVertical: 10,
  },
  paginationDot: {
    width: 10,
    height: 10,
    borderRadius: 5,
    marginHorizontal: 5,
    backgroundColor: 'rgba(0, 0, 0, 0.92)',
  },
  paginationInactiveDot: {
    backgroundColor: 'rgba(0, 0, 0, 0.26)',
  },
});

export default Banner;