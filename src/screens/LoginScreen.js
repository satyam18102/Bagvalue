import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image, Alert } from 'react-native';
import { Formik, Field } from 'formik';
import { loginValidationSchema } from '../utils/validationSchemas';
import TextInputField from '../components/TextInputField';
import AuthButton from '../components/AuthButton';
import { Ionicons } from '@expo/vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';

const LoginScreen = ({ navigation }) => {
  const handleLogin = async (values) => {
    const storedUser = await AsyncStorage.getItem('user');
    if (!storedUser) {
      Alert.alert('User not found', 'Please sign up first.');
      return;
    }
    const parsedUser = JSON.parse(storedUser);
    if (
      values.email === parsedUser.email &&
      values.password === parsedUser.password
    ) {
      navigation.replace('MainApp');
    } else {
      Alert.alert('Incorrect credentials');
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.topHalf}>
        <View style={styles.logoBox}>
          <Image source={require('../../assets/logo.png')} style={styles.logo} />
        </View>
      </View>

      <View style={styles.card}>
        <Text style={styles.title}>Login</Text>

        <Formik
          initialValues={{ email: '', password: '' }}
          validationSchema={loginValidationSchema}
          onSubmit={handleLogin}
        >
          {({ handleSubmit }) => (
            <View>
              <View style={styles.inputGroup}>
                <Ionicons name="person-outline" size={20} style={styles.icon} />
                <Field component={TextInputField} name="email" placeholder="Username" />
              </View>

              <View style={styles.inputGroup}>
                <Ionicons name="lock-closed-outline" size={20} style={styles.icon} />
                <Field component={TextInputField} name="password" placeholder="Password" secureTextEntry />
              </View>

              <Text style={styles.forgot}>Forgot Password?</Text>

              <AuthButton title="Login ➜" onPress={handleSubmit} />

              <TouchableOpacity onPress={() => navigation.navigate('Signup')}>
                <Text style={styles.link}>Don’t have an account? <Text style={styles.red}>Register</Text></Text>
              </TouchableOpacity>
            </View>
          )}
        </Formik>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1 },
  topHalf: {
    backgroundColor: '#1e3a8a',
    height: '30%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  logoBox: {
    backgroundColor: 'white',
    borderRadius: 100,
    padding: 20,
    elevation: 5,
  },
  logo: { width: 80, height: 80 },
  card: {
    flex: 1,
    backgroundColor: '#e0f2fe',
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    padding: 25,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 20,
    color: '#0f172a',
  },
  inputGroup: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#f9fafb',
    borderRadius: 25,
    paddingHorizontal: 10,
    borderColor: '#d1d5db',
    borderWidth: 1,
    marginBottom: 15,
  },
  icon: { color: '#6b7280', marginRight: 8 },
  forgot: { textAlign: 'right', marginBottom: 15, color: '#64748b' },
  link: { marginTop: 20, textAlign: 'center', color: '#475569' },
  red: { color: '#ef4444', fontWeight: 'bold' },
});

export default LoginScreen;