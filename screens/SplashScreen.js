import React, { useEffect } from 'react';
import { View, Image, StyleSheet, Text } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const SplashScreen = ({ navigation }) => {
  useEffect(() => {
    const timer = setTimeout(() => {
      navigation.replace('Login');
    }, 2500);
    return () => clearTimeout(timer);
  }, []);

  return (
    <View style={styles.container}>
      {/* App Header */}
      <View style={styles.header}>
        <Ionicons name="cart-outline" size={28} color="#ffdb00" />
        <Text style={styles.headerText}>Bagvalue</Text>
      </View>

      {/* App Logo */}
      <View style={styles.logoBox}>
        <Image source={require('../assets/logo.png')} style={styles.logo} />
      </View>

      {/* App Name */}
      <Text style={styles.appName}>Bagvalue</Text>

      {/* Taglines */}
      <View style={styles.taglines}>
        <Text style={styles.tagline}>🛍️ Discover top deals in every tap</Text>
        <Text style={styles.tagline}>🚀 Fast. Simple. Secure Shopping</Text>
        <Text style={styles.tagline}>💰 Big brands. Bigger discounts</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#1e1f6d',
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 20,
  },
  header: {
    position: 'absolute',
    top: 60,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  headerText: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#ffdb00',
  },
  logoBox: {
    backgroundColor: '#fff',
    padding: 12,
    borderRadius: 60,
    elevation: 5,
    marginBottom: 16,
  },
  logo: {
    width: 80,
    height: 80,
    borderRadius: 40,
  },
  appName: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 10,
  },
  taglines: {
    marginTop: 10,
  },
  tagline: {
    fontSize: 15,
    color: '#ffdb00',
    textAlign: 'center',
    marginBottom: 5,
  },
});

export default SplashScreen;
