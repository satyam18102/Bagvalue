import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { ThemeContext } from '../../ThemeContext';
import { useContext } from 'react';

const steps = ['Order Placed', 'Packed', 'Shipped', 'Out for Delivery', 'Delivered'];

const TrackOrderScreen = () => {
  const navigation = useNavigation();
  const { isDarkMode } = useContext(ThemeContext);

  // Simulated step (you can make dynamic later)
  const currentStep = 3;

  return (
    <ScrollView style={{ flex: 1, backgroundColor: isDarkMode ? '#000' : '#fff' }}>
      <View style={[styles.header, { backgroundColor: isDarkMode ? '#121212' : '#2c2e91' }]}>
        <Ionicons name="navigate" size={24} color="#ffdb00" />
        <Text style={styles.headerText}>Track Order</Text>
      </View>

      <View style={styles.container}>
        <Text style={[styles.orderInfo, { color: isDarkMode ? '#fff' : '#333' }]}>
          Order ID: #SH123456789
        </Text>
        <Text style={[styles.orderInfo, { color: isDarkMode ? '#ccc' : '#555' }]}>
          Estimated Delivery: 3-5 Days
        </Text>

        <View style={styles.timeline}>
          {steps.map((step, index) => {
            const done = index < currentStep;
            const current = index === currentStep;

            return (
              <View key={index} style={styles.stepRow}>
                <Ionicons
                  name={done || current ? 'checkmark-circle' : 'ellipse-outline'}
                  size={24}
                  color={done || current ? '#2c2e91' : '#aaa'}
                />
                <Text
                  style={[
                    styles.stepText,
                    {
                      color: current ? '#2c2e91' : isDarkMode ? '#ccc' : '#333',
                      fontWeight: current ? 'bold' : 'normal',
                    },
                  ]}
                >
                  {step}
                </Text>
              </View>
            );
          })}
        </View>

        <TouchableOpacity
          onPress={() => navigation.goBack()}
          style={styles.backBtn}
        >
          <Ionicons name="arrow-back" color="#fff" size={20} />
          <Text style={styles.backText}>Back to Profile</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  header: {
    padding: 16,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
  },
  headerText: {
    fontSize: 20,
    fontWeight: 'bold',
    marginLeft: 8,
    color: '#fff',
  },
  container: {
    padding: 20,
  },
  orderInfo: {
    fontSize: 16,
    marginBottom: 6,
  },
  timeline: {
    marginTop: 20,
    paddingVertical: 10,
  },
  stepRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 18,
  },
  stepText: {
    fontSize: 16,
    marginLeft: 12,
  },
  backBtn: {
    marginTop: 30,
    backgroundColor: '#2c2e91',
    padding: 14,
    borderRadius: 8,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  backText: {
    color: '#fff',
    fontWeight: 'bold',
    marginLeft: 6,
  },
});

export default TrackOrderScreen;
