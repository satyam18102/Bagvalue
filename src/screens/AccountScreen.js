// AccountScreen.js
import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const AccountScreen = () => {
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
    <View style={styles.container}>
      <Text style={styles.header}>Account Info</Text>
      {user ? (
        <>
          <Text style={styles.label}>Name: <Text style={styles.value}>{user.fullName}</Text></Text>
          <Text style={styles.label}>Email: <Text style={styles.value}>{user.email}</Text></Text>
        </>
      ) : (
        <Text style={styles.label}>No user data found.</Text>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#e0f2fe',
  },
  header: {
    fontSize: 26,
    fontWeight: 'bold',
    marginTop: 22,
    marginBottom: 20,
    color: '#1e3a8a',
  },
  label: {
    fontSize: 16,
    marginBottom: 10,
    color: '#334155',
  },
  value: {
    fontWeight: '600',
    color: '#1e3a8a',
  },
});

export default AccountScreen;


// HomeScreen.js
