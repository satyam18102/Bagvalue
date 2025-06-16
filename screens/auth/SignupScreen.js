import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  Image,
  Alert,
} from 'react-native';
import { Formik } from 'formik';
import * as Yup from 'yup';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Ionicons } from '@expo/vector-icons';

const SignupScreen = ({ navigation }) => {
  const [showPassword, setShowPassword] = useState(false);
  const [agree, setAgree] = useState(false);

  const signupValidationSchema = Yup.object().shape({
    name: Yup.string().required('Name is required'),
    email: Yup.string().email('Invalid email').required('Email is required'),
    password: Yup.string().min(4, 'Password too short').required('Password is required'),
  });

  const handleSignup = async (values) => {
    console.log('🟦 handleSignup called with:', values);

    if (!agree) {
      Alert.alert('Please accept the terms & conditions');
      return;
    }

    const storedUsers = await AsyncStorage.getItem('users');
    const users = storedUsers ? JSON.parse(storedUsers) : [];

    const exists = users.find(u => u.email === values.email);
    if (exists) {
      Alert.alert('User already exists');
      return;
    }

    users.push(values);
    await AsyncStorage.setItem('users', JSON.stringify(users));

    console.log('Ok,User saved successfully.');
    console.log('Redirecting...');

    Alert.alert('Signup Successful', 'Redirecting to Login...');
    console.log('--- Delaying redirect...');
    setTimeout(() => {
      console.log(' Navigating to Login screen...');
      navigation.replace('Login');
    }, 800);
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Ionicons name="bag-handle" size={30} color="#ffdb00" />
        <Text style={styles.brand}>Shoppy</Text>
      </View>

      <Image source={require('../../assets/logo.png')} style={styles.logo} />
      <Text style={styles.title}>Sign Up</Text>

      <Formik
        initialValues={{ name: '', email: '', password: '' }}
        validationSchema={signupValidationSchema}
        onSubmit={handleSignup}
      >
        {({ handleChange, handleBlur, handleSubmit, values, errors, touched }) => (
          <>
            <View style={styles.inputContainer}>
              <Ionicons name="person" size={20} color="#2c2e91" />
              <TextInput
                placeholder="Name"
                style={styles.input}
                value={values.name}
                onChangeText={handleChange('name')}
                onBlur={handleBlur('name')}
              />
            </View>
            {touched.name && errors.name && <Text style={styles.error}>{errors.name}</Text>}

            <View style={styles.inputContainer}>
              <Ionicons name="mail" size={20} color="#2c2e91" />
              <TextInput
                placeholder="Email"
                style={styles.input}
                value={values.email}
                onChangeText={handleChange('email')}
                onBlur={handleBlur('email')}
                keyboardType="email-address"
              />
            </View>
            {touched.email && errors.email && <Text style={styles.error}>{errors.email}</Text>}

            <View style={styles.inputContainer}>
              <Ionicons name="lock-closed" size={20} color="#2c2e91" />
              <TextInput
                placeholder="Password"
                style={styles.input}
                value={values.password}
                onChangeText={handleChange('password')}
                onBlur={handleBlur('password')}
                secureTextEntry={!showPassword}
              />
              <TouchableOpacity onPress={() => setShowPassword(!showPassword)}>
                <Ionicons
                  name={showPassword ? 'eye-off' : 'eye'}
                  size={20}
                  color="#444"
                  style={{ marginRight: 10 }}
                />
              </TouchableOpacity>
            </View>
            {touched.password && errors.password && <Text style={styles.error}>{errors.password}</Text>}

            <TouchableOpacity onPress={() => setAgree(!agree)} style={styles.row}>
              <Ionicons
                name={agree ? 'checkbox' : 'square-outline'}
                size={22}
                color={agree ? '#ffdb00' : '#ccc'}
              />
              <Text style={styles.agreeText}> I accept the Terms & Conditions</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.button} onPress={handleSubmit}>
              <Text style={styles.buttonText}>Sign Up</Text>
            </TouchableOpacity>

            <Text style={styles.or}>Or sign up with</Text>

            <View style={styles.socialRow}>
              <TouchableOpacity style={styles.socialButton}>
                <Ionicons name="logo-google" color="#fff" size={20} />
                <Text style={styles.socialText}>Google</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.socialButton}>
                <Ionicons name="logo-facebook" color="#fff" size={20} />
                <Text style={styles.socialText}>Facebook</Text>
              </TouchableOpacity>
            </View>

            <TouchableOpacity onPress={() => navigation.navigate('Login')}>
              <Text style={styles.link}>Already have an account? Login</Text>
            </TouchableOpacity>
          </>
        )}
      </Formik>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, justifyContent: 'center', backgroundColor: '#1e1f6d' },
  header: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 10,
  },
  brand: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#ffdb00',
    marginLeft: 8,
  },
  logo: {
    width: 80,
    height: 80,
    alignSelf: 'center',
    marginBottom: 10,
    borderRadius: 40,
  },
  title: {
    color: '#fff',
    fontSize: 24,
    textAlign: 'center',
    marginBottom: 20,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    borderRadius: 10,
    marginBottom: 10,
    paddingHorizontal: 10,
  },
  input: {
    flex: 1,
    padding: 12,
    color: '#000',
  },
  error: {
    color: 'red',
    marginBottom: 5,
    marginLeft: 5,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 10,
  },
  agreeText: {
    color: '#ffdb00',
    marginLeft: 8,
    fontSize: 15,
    fontWeight: '500',
  },
  button: {
    backgroundColor: '#ffdb00',
    padding: 14,
    borderRadius: 10,
    alignItems: 'center',
    marginTop: 10,
  },
  buttonText: {
    fontWeight: 'bold',
    color: '#000',
  },
  or: {
    textAlign: 'center',
    marginVertical: 10,
    color: '#fff',
  },
  socialRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 10,
  },
  socialButton: {
    flexDirection: 'row',
    backgroundColor: '#2c2e91',
    padding: 10,
    borderRadius: 10,
    alignItems: 'center',
    width: '48%',
    justifyContent: 'center',
  },
  socialText: {
    color: '#fff',
    marginLeft: 6,
  },
  link: {
    color: '#ffdb00',
    textAlign: 'center',
    marginTop: 10,
  },
});

export default SignupScreen;
