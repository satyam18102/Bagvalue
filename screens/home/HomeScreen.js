import React, { useContext, useState, useEffect, useRef } from 'react';
import {
  View, Text, StyleSheet, FlatList, TouchableOpacity, Image,
  TextInput, Dimensions, ScrollView
} from 'react-native';
import Carousel from 'react-native-reanimated-carousel';
import { ThemeContext } from '../../ThemeContext';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Ionicons } from '@expo/vector-icons';

const { width } = Dimensions.get('window');

const banners = [
  require('../../assets/banner1.jpg'),
  require('../../assets/banner2.jpg'),
  require('../../assets/banner3.jpg'),
];

const categories = [
  { id: '1', title: 'Electronics', image: require('../../assets/electronics.jpg') },
  { id: '2', title: 'Fashion', image: require('../../assets/fashion.jpg') },
  { id: '3', title: 'Groceries', image: require('../../assets/grocery.jpg') },
  { id: '4', title: 'Home Decor', image: require('../../assets/decor.jpg') },
  { id: '5', title: 'Sports', image: require('../../assets/sports.jpg') },
  { id: '6', title: 'Toys & Games', image: require('../../assets/toys.jpg') },
  { id: '7', title: 'Books', image: require('../../assets/books.jpg') },
  { id: '8', title: 'Fitness', image: require('../../assets/fitness.jpg') },
  { id: '9', title: 'Mobiles', image: require('../../assets/mobiles.jpg') },
  { id: '10', title: 'Headphones', image: require('../../assets/headphones.jpg') },
  { id: '11', title: 'Accessories', image: require('../../assets/accessories.jpg') },
  { id: '12', title: 'Clothes', image: require('../../assets/clothes.jpg') },
  { id: '13', title: 'Laptops', image: require('../../assets/laptop.jpg') },
  { id: '14', title: 'Jewelry', image: require('../../assets/jewelry.jpg') },
];

const HomeScreen = ({ navigation }) => {
  const { isDarkMode } = useContext(ThemeContext);
  const [recommended, setRecommended] = useState([]);
  const [recent, setRecent] = useState([]);
  const [searchText, setSearchText] = useState('');
  const scrollRef = useRef();
  const [scrollX, setScrollX] = useState(0);

  useEffect(() => {
    axios.get('https://fakestoreapi.com/products?limit=10')
      .then((res) => setRecommended(res.data))
      .catch((err) => console.log('Error loading products', err));

    AsyncStorage.getItem('recentlyViewed').then(data => {
      if (data) setRecent(JSON.parse(data));
    });
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      scrollRef.current?.scrollTo({ x: scrollX + 200, animated: true });
      setScrollX(prev => (prev + 200 > 800 ? 0 : prev + 200));
    }, 3000);
    return () => clearInterval(interval);
  }, [scrollX]);

  const renderCategory = ({ item }) => (
    <TouchableOpacity
      style={[
        styles.card,
        { backgroundColor: isDarkMode ? '#1e1e1e' : '#f5f5f5' }
      ]}
      onPress={() => navigation.navigate('ProductList', { category: item.title })}
    >
      <View style={styles.imageWrapper}>
        <Image source={item.image} style={styles.image} />
      </View>
      <Text style={[styles.title, { color: isDarkMode ? '#fff' : '#000' }]} numberOfLines={1}>
        {item.title}
      </Text>
    </TouchableOpacity>
  );

  const renderProduct = ({ item }) => (
    <TouchableOpacity
      style={[
        styles.recommendCard,
        { backgroundColor: isDarkMode ? '#1e1e1e' : '#fff' },
      ]}
      onPress={() => navigation.navigate('ProductDetails', { product: item })}
    >
      <Image source={{ uri: item.image }} style={styles.recommendImage} />
      <Text numberOfLines={1} style={[styles.recommendTitle, { color: isDarkMode ? '#fff' : '#000' }]}>{item.title}</Text>
      <Text style={styles.recommendPrice}>₹ {Math.round(item.price * 80)}</Text>
    </TouchableOpacity>
  );

  return (
    <FlatList
      data={categories}
      renderItem={renderCategory}
      keyExtractor={(item) => item.id}
      numColumns={2}
      columnWrapperStyle={styles.row}
      contentContainerStyle={{ backgroundColor: isDarkMode ? '#000' : '#fff', paddingBottom: 40 }}
      ListHeaderComponent={
        <>
          <View style={styles.appHeader}>
            <Ionicons name="cart-outline" size={28} color="#ffdb00" />
            <Text style={styles.appTitle}>Bagvalue</Text>
          </View>

          <TextInput
            style={[styles.searchInput, {
              backgroundColor: isDarkMode ? '#1e1e1e' : '#f0f0f0',
              color: isDarkMode ? '#fff' : '#000'
            }]}
            placeholder="Search products..."
            placeholderTextColor={isDarkMode ? '#aaa' : '#888'}
            value={searchText}
            onChangeText={setSearchText}
          />

          <View style={styles.offerContainer}>
            <ScrollView horizontal ref={scrollRef} showsHorizontalScrollIndicator={false} scrollEnabled={false}>
              <View style={styles.offerBox}><Text style={styles.offerText}>🔥 50% OFF on Fashion Wear</Text></View>
              <View style={styles.offerBox}><Text style={styles.offerText}>🚀 Free Shipping above ₹499</Text></View>
              <View style={styles.offerBox}><Text style={styles.offerText}>🎧 Headphones Mega Sale</Text></View>
              <View style={styles.offerBox}><Text style={styles.offerText}>📱 Big Deals on Mobiles</Text></View>
            </ScrollView>
          </View>

          <Carousel
            loop
            width={width}
            height={180}
            autoPlay
            data={banners}
            scrollAnimationDuration={1000}
            renderItem={({ item }) => <Image source={item} style={styles.bannerImage} />}
            style={styles.carouselContainer}
          />

          <Text style={[styles.sectionTitle, { color: isDarkMode ? '#fff' : '#2c2e91' }]}>🛍️ Categories</Text>
        </>
      }
      ListFooterComponent={
        <>
          <Text style={[styles.sectionTitle, { color: isDarkMode ? '#fff' : '#2c2e91' }]}>🔥 Recommended For You</Text>
          <FlatList
            data={recommended}
            renderItem={renderProduct}
            keyExtractor={(item) => item.id.toString()}
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={{ paddingHorizontal: 10 }}
          />

          {recent.length > 0 && (
            <>
              <Text style={[styles.sectionTitle, { color: isDarkMode ? '#fff' : '#2c2e91' }]}>🧠 Recently Viewed</Text>
              <FlatList
                data={recent}
                renderItem={renderProduct}
                keyExtractor={(item) => item.id.toString() + '-recent'}
                horizontal
                showsHorizontalScrollIndicator={false}
                contentContainerStyle={{ paddingHorizontal: 10 }}
              />
            </>
          )}
        </>
      }
    />
  );
};

const styles = StyleSheet.create({
  appHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingTop: 45,
    paddingBottom: 10,
  },
  appTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#2c2e91',
    marginLeft: 10,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginVertical: 15,
    marginLeft: 12,
  },
  carouselContainer: {
    marginBottom: 15,
  },
  bannerImage: {
    width: '100%',
    height: 180,
    borderRadius: 10,
  },
  searchInput: {
    margin: 12,
    borderRadius: 10,
    paddingHorizontal: 14,
    fontSize: 16,
  },
  offerContainer: {
    flexDirection: 'row',
    paddingVertical: 6,
    marginHorizontal: 10,
    marginBottom: 10,
  },
  offerBox: {
    backgroundColor: '#2c2e91',
    paddingHorizontal: 14,
    paddingVertical: 6,
    marginRight: 8,
    borderRadius: 8,
  },
  offerText: {
    fontSize: 14,
    color: '#fff',
    fontWeight: '500',
  },
  row: {
    justifyContent: 'space-between',
    marginBottom: 24,
    paddingHorizontal: 12,
  },
  card: {
    width: '48%',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 12,
    paddingVertical: 10,
    paddingHorizontal: 10,
    backgroundColor: '#f5f5f5',
  },
  imageWrapper: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: '#fff',
    elevation: 2,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 8,
    overflow: 'hidden',
  },
  image: {
    width: 70,
    height: 70,
    resizeMode: 'cover',
    borderRadius: 35,
  },
  title: {
    fontSize: 14,
    fontWeight: '600',
    textAlign: 'center',
  },
  recommendCard: {
    borderRadius: 10,
    padding: 10,
    width: 130,
    marginRight: 12,
    alignItems: 'center',
    elevation: 2,
  },
  recommendImage: {
    width: 100,
    height: 100,
    resizeMode: 'contain',
    marginBottom: 8,
  },
  recommendTitle: {
    fontSize: 13,
    fontWeight: '500',
    textAlign: 'center',
  },
  recommendPrice: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#2c2e91',
    marginTop: 4,
  },
});

export default HomeScreen;
