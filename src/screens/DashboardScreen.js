// src/screens/DashboardScreen.js
import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import FontAwesome6 from '@expo/vector-icons/FontAwesome6';
import Entypo from '@expo/vector-icons/Entypo';

const DashboardScreen = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Dashboard</Text>
      <TouchableOpacity style={styles.card}>
        <Entypo name="location" size={24} color="black" />
        <Text style={styles.cardText}>Saved Adressess</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.card}>
        <FontAwesome6 name="box" size={24} color="black" />
        <Text style={styles.cardText}>My Orders</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#e0f2fe',
    padding: 20,
  },
  title: {
    fontSize: 26,
    fontWeight: 'bold',
    color: '#1e3a8a',
    marginTop: 22,
    marginBottom: 20,
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

export default DashboardScreen;
