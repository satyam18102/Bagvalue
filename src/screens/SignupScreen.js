// SignupScreen.js
import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image, Switch } from 'react-native';
import { Formik, Field } from 'formik';
import { signupValidationSchema } from '../utils/validationSchemas';
import TextInputField from '../components/TextInputField';
import AuthButton from '../components/AuthButton';
import { Ionicons } from '@expo/vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';

const SignupScreen = ({ navigation }) => {
  const handleSignup = async (values) => {
    await AsyncStorage.setItem('user', JSON.stringify(values));
    alert('Signup successful!');
    navigation.replace('Login');
  };

  return (
    <View style={styles.container}>
      <View style={styles.topHalf}>
        <View style={styles.logoBox}>
          <Image source={require('../../assets/logo.png')} style={styles.logo} />
        </View>
      </View>

      <View style={styles.card}>
        <Text style={styles.title}>Sign Up</Text>

        <Formik
          initialValues={{
            fullName: '',
            email: '',
            password: '',
            confirmPassword: '',
            acceptTerms: false,
          }}
          validationSchema={signupValidationSchema}
          onSubmit={handleSignup}
        >
          {({ handleSubmit, values, setFieldValue, errors, touched }) => (
            <View>
              <View style={styles.inputGroup}>
                <Ionicons name="person" size={20} style={styles.icon} />
                <Field component={TextInputField} name="fullName" placeholder="Full Name" />
              </View>

              <View style={styles.inputGroup}>
                <Ionicons name="mail" size={20} style={styles.icon} />
                <Field component={TextInputField} name="email" placeholder="Email Address" />
              </View>

              <View style={styles.inputGroup}>
                <Ionicons name="lock-closed" size={20} style={styles.icon} />
                <Field component={TextInputField} name="password" placeholder="Password" secureTextEntry />
              </View>

              <View style={styles.inputGroup}>
                <Ionicons name="lock-closed" size={20} style={styles.icon} />
                <Field component={TextInputField} name="confirmPassword" placeholder="Confirm Password" secureTextEntry />
              </View>

              <View style={styles.switchRow}>
                <Switch
                  value={values.acceptTerms}
                  onValueChange={(val) => setFieldValue('acceptTerms', val)}
                />
                <Text style={styles.switchText}>I agree to Terms</Text>
              </View>

              {touched.acceptTerms && errors.acceptTerms && (
                <Text style={styles.errorText}>{errors.acceptTerms}</Text>
              )}

              <AuthButton title="Sign Up" onPress={handleSubmit} />

              <TouchableOpacity onPress={() => navigation.navigate('Login')}>
                <Text style={styles.link}>Already have an account? <Text style={styles.red}>Login</Text></Text>
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
  switchRow: { flexDirection: 'row', alignItems: 'center', marginBottom: 10 },
  switchText: { marginLeft: 10, color: '#475569' },
  errorText: { color: '#dc2626', fontSize: 12, marginBottom: 10 },
  link: { marginTop: 20, textAlign: 'center', color: '#475569' },
  red: { color: '#ef4444', fontWeight: 'bold' },
});

export default SignupScreen;