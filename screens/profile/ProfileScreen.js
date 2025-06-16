// ProfileScreen.js
import React, { useEffect, useState, useContext } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  Alert,
  TextInput,
  ScrollView,
  Switch,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import * as ImagePicker from 'expo-image-picker';
import { ThemeContext } from '../../ThemeContext';
import { Ionicons, MaterialCommunityIcons, Feather } from '@expo/vector-icons';

const ProfileScreen = ({ navigation }) => {
  const [user, setUser] = useState(null);
  const [phone, setPhone] = useState('');
  const [address, setAddress] = useState('');
  const [profilePic, setProfilePic] = useState(null);
  const { isDarkMode, toggleTheme } = useContext(ThemeContext);

  useEffect(() => {
    const loadUser = async () => {
      const storedUser = await AsyncStorage.getItem('currentUser');
      if (storedUser) {
        const parsed = JSON.parse(storedUser);
        setUser(parsed);
        setPhone(parsed.phone || '');
        setAddress(parsed.address || '');
        if (parsed.profilePic) setProfilePic(parsed.profilePic);
      }
    };
    loadUser();
  }, []);

  const saveDetails = async () => {
    const updatedUser = {
      ...user,
      phone,
      address,
      profilePic,
    };
    await AsyncStorage.setItem('currentUser', JSON.stringify(updatedUser));
    setUser(updatedUser);
    Alert.alert('Saved', 'Profile updated successfully.');
  };

  const handleLogout = async () => {
    await AsyncStorage.removeItem('currentUser');
    navigation.replace('Login');
  };

  const pickImage = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [1, 1],
      quality: 1,
    });
    if (!result.canceled) {
      setProfilePic(result.assets[0].uri);
    }
  };

  if (!user) {
    return (
      <View style={styles.center}>
        <Text style={styles.loading}>Loading...</Text>
      </View>
    );
  }

  return (
    <ScrollView style={[styles.container, { backgroundColor: isDarkMode ? '#000' : '#fff' }]}>
      <View style={[styles.header, { backgroundColor: isDarkMode ? '#121212' : '#2c2e91' }]}>
        <Text style={styles.appTitle}>Bagvalue</Text>
        <TouchableOpacity onPress={pickImage}>
          <Image
            source={profilePic ? { uri: profilePic } : require('../../assets/profile.jpg')}
            style={styles.avatar}
          />
        </TouchableOpacity>
        <Text style={styles.name}>Hey, {user.name}</Text>
        <Text style={styles.email}>{user.email}</Text>
      </View>

      <View style={styles.section}>
        <TextInput
          placeholder="Phone Number"
          value={phone}
          onChangeText={setPhone}
          style={styles.input}
          keyboardType="phone-pad"
          placeholderTextColor="#666"
        />
        <TextInput
          placeholder="Address"
          value={address}
          onChangeText={setAddress}
          style={[styles.input, { height: 60 }]}
          multiline
          placeholderTextColor="#666"
        />

        <TouchableOpacity style={styles.saveBtn} onPress={saveDetails}>
          <Ionicons name="save" size={20} color="#fff" />
          <Text style={styles.saveText}>Save</Text>
        </TouchableOpacity>

        {address.trim().length > 0 && (
          <View style={styles.savedAddressBox}>
            <Feather name="map-pin" size={18} color="#2c2e91" />
            <Text style={styles.savedAddressText}>{address}</Text>
          </View>
        )}

        <View style={styles.toggleRow}>
          <Text style={{ color: isDarkMode ? '#fff' : '#333' }}>🌙 Dark Mode</Text>
          <Switch value={isDarkMode} onValueChange={toggleTheme} />
        </View>

        <View style={styles.activityRow}>
          <TouchableOpacity style={styles.activityItem}>
            <Ionicons name="chatbox-ellipses-outline" size={22} color="#2c2e91" />
            <Text style={styles.activityText}>Reviews</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.activityItem}>
            <MaterialCommunityIcons name="comment-question-outline" size={22} color="#2c2e91" />
            <Text style={styles.activityText}>Q & A</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.activityItem}>
            <Ionicons name="heart-outline" size={22} color="#2c2e91" />
            <Text style={styles.activityText}>Likes</Text>
          </TouchableOpacity>
        </View>

        {/* Options */}
        <TouchableOpacity style={styles.option} onPress={() => navigation.navigate('Orders')}>
          <Ionicons name="bag" size={20} color="#2c2e91" />
          <Text style={styles.optionText}>My Orders</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.option} onPress={() => navigation.navigate('Wishlist')}>
          <Ionicons name="heart" size={20} color="#2c2e91" />
          <Text style={styles.optionText}>Wishlist</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.option} onPress={() => navigation.navigate('TrackOrder')}>
          <Ionicons name="map" size={20} color="#2c2e91" />
          <Text style={styles.optionText}>Track Order</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.option}>
          <Ionicons name="gift" size={20} color="#2c2e91" />
          <Text style={styles.optionText}>Refer & Earn</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.option}>
          <Ionicons name="help-circle" size={20} color="#2c2e91" />
          <Text style={styles.optionText}>Help & Support</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.option}>
          <Ionicons name="settings" size={20} color="#2c2e91" />
          <Text style={styles.optionText}>Settings</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.premiumBtn}>
          <Ionicons name="star" size={20} color="#fff" />
          <Text style={styles.premiumText}>Get Premium</Text>
        </TouchableOpacity>
      </View>

      <TouchableOpacity style={styles.logoutBtn} onPress={handleLogout}>
        <Text style={styles.logoutText}>Logout</Text>
      </TouchableOpacity>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1 },
  header: {
    alignItems: 'center',
    paddingVertical: 30,
    borderBottomLeftRadius: 30,
    borderBottomRightRadius: 30,
  },
  appTitle: {
    color: '#ffdb00',
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 10,
    fontFamily: 'System',
  },
  avatar: {
    width: 90,
    height: 90,
    borderRadius: 45,
    marginBottom: 10,
    backgroundColor: '#fff',
  },
  name: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#fff',
    fontFamily: 'System',
  },
  email: {
    fontSize: 14,
    color: '#eee',
    fontFamily: 'System',
  },
  section: {
    marginTop: 20,
    paddingHorizontal: 20,
  },
  input: {
    backgroundColor: '#f1f1f1',
    padding: 12,
    borderRadius: 10,
    marginBottom: 10,
    color: '#000',
    fontFamily: 'System',
  },
  saveBtn: {
    flexDirection: 'row',
    backgroundColor: '#2c2e91',
    padding: 12,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 16,
  },
  saveText: {
    color: '#fff',
    marginLeft: 10,
    fontWeight: 'bold',
    fontFamily: 'System',
  },
  toggleRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  savedAddressBox: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#eee',
    padding: 10,
    borderRadius: 10,
    marginBottom: 10,
  },
  savedAddressText: {
    marginLeft: 10,
    fontSize: 14,
    color: '#333',
  },
  activityRow: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginBottom: 16,
  },
  activityItem: {
    alignItems: 'center',
  },
  activityText: {
    marginTop: 4,
    fontSize: 12,
    color: '#333',
    fontFamily: 'System',
  },
  option: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#f9f9f9',
    padding: 14,
    borderRadius: 12,
    marginBottom: 12,
    elevation: 1,
  },
  optionText: {
    fontSize: 16,
    color: '#333',
    marginLeft: 10,
    fontFamily: 'System',
  },
  premiumBtn: {
    backgroundColor: '#ff9f00',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 12,
    borderRadius: 10,
    marginTop: 20,
  },
  premiumText: {
    color: '#fff',
    marginLeft: 8,
    fontWeight: 'bold',
    fontSize: 16,
    fontFamily: 'System',
  },
  logoutBtn: {
    backgroundColor: 'red',
    padding: 15,
    margin: 20,
    borderRadius: 10,
    alignItems: 'center',
  },
  logoutText: {
    color: '#fff',
    fontWeight: 'bold',
  },
  center: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  loading: {
    fontSize: 16,
    color: '#555',
  },
});

export default ProfileScreen;
