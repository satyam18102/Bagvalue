// import React from 'react';
// import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
// import { Ionicons } from '@expo/vector-icons';

// const categories = [
  // { label: 'Dresses', icon: 'shirt-outline' },
  // { label: 'Fruits', icon: 'nutrition-outline' },
  // { label: 'Electronics', icon: 'tv-outline' },
  // { label: 'Mobiles', icon: 'phone-portrait-outline' },
  // { label: 'Dresses', icon: 'shirt-outline' },
  // { label: 'Fruits', icon: 'nutrition-outline' },
  // { label: 'Vegetables', icon: 'leaf-outline' },
  // { label: 'Dry Fruits', icon: 'cafe-outline' },
  // { label: 'Fitness', icon: 'barbell-outline' },
  // { label: 'Electronics', icon: 'tv-outline' },
  // { label: 'Mobiles', icon: 'phone-portrait-outline' },
  // { label: 'Shoes', icon: 'walk-outline' },
// ];

// const HomeScreen = () => {
//   return (
//     <ScrollView contentContainerStyle={styles.container}>
//       <Text style={styles.title}>Explore Categories</Text>
//       {categories.map((item, index) => (
//         <TouchableOpacity key={index} style={styles.card}>
//           <Ionicons name={item.icon} size={28} color="#1e3a8a" />
//           <Text style={styles.cardText}>{item.label}</Text>
//         </TouchableOpacity>
//       ))}
//     </ScrollView>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     padding: 20,
//     backgroundColor: '#e0f2fe',
//   },
//   title: {
//     fontSize: 22,
//     fontWeight: 'bold',
//     marginBottom: 20,
//     marginTop: 20,
//     color: '#0f172a',
//   },
//   card: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     backgroundColor: '#ffffff',
//     borderRadius: 10,
//     padding: 15,
//     marginBottom: 15,
//     elevation: 3,
//   },
//   cardText: {
//     fontSize: 18,
//     marginLeft: 10,
//     color: '#1e3a8a',
//   },
// });

// export default HomeScreen;
import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

const categories = [
  { label: 'Dresses', icon: 'shirt-outline' },
  { label: 'Fruits', icon: 'nutrition-outline' },
  { label: 'Electronics', icon: 'tv-outline' },
  { label: 'Mobiles', icon: 'phone-portrait-outline' },
  { label: 'Dresses', icon: 'shirt-outline' },
  { label: 'Fruits', icon: 'nutrition-outline' },
  { label: 'Vegetables', icon: 'leaf-outline' },
  { label: 'Dry Fruits', icon: 'cafe-outline' },
  { label: 'Fitness', icon: 'barbell-outline' },
  { label: 'Electronics', icon: 'tv-outline' },
  { label: 'Mobiles', icon: 'phone-portrait-outline' },
  { label: 'Shoes', icon: 'walk-outline' },
];

const HomeScreen = () => {

  const [user, setUser] = useState(null);

  useEffect(() => {
    const fetchUser = async () => {
      const storedUser = await AsyncStorage.getItem('user');
      if (storedUser) {
        setUser(JSON.parse(storedUser));
      }
    };
    fetchUser();
  }, []);

  return (
    <View style={styles.wrapper}>
      <View style={styles.headerBox}>
        <Text style={styles.name}>Welcome Back, {user ? user.fullName : 'Guest'}</Text>
        <Text style={styles.title}>Explore Categories</Text>
      </View>
      <ScrollView contentContainerStyle={styles.container}>
        {categories.map((item, index) => (
          <TouchableOpacity key={index} style={styles.card}>
            <Ionicons name={item.icon} size={28} color="#1e3a8a" />
            <Text style={styles.cardText}>{item.label}</Text>
          </TouchableOpacity>
        ))}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    backgroundColor: '#e0f2fe',
  },
  headerBox: {
    padding: 20,
    backgroundColor: '#e0f2fe',
  },
  container: {
    paddingHorizontal: 20,
    paddingBottom: 20,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#0f172a',
    marginTop: 20,
    marginBottom: 20,
  },
  name: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#0f172a',
    marginTop: 20,
  },
  card: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#ffffff',
    borderRadius: 10,
    padding: 15,
    marginBottom: 15,
    elevation: 3,
  },
  cardText: {
    fontSize: 18,
    marginLeft: 10,
    color: '#1e3a8a',
  },
});

export default HomeScreen;
