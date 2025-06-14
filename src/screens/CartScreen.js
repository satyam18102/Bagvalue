import React from 'react';
import { View, Text, StyleSheet, SectionList } from 'react-native';

const sections = [
  {
    title: 'Todays Picks',
    data: ['Apple', 'T-shirt', 'Charger'],
  },
  {
    title: 'Earlier Picks',
    data: ['Laptop', 'Shoes'],
  },
];

const CartScreen = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>My Cart</Text>
      <SectionList
        sections={sections}
        keyExtractor={(item, index) => item + index}
        renderItem={({ item }) => <Text style={styles.item}>{item}</Text>}
        renderSectionHeader={({ section: { title } }) => (
          <Text style={styles.header}>{title}</Text>
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#e0f2fe',
  },
  title: {
    fontSize: 26,
    fontWeight: 'bold',
    marginBottom: 20,
    marginTop: 22,
    color: '#0f172a',
  },
  header: {
    fontSize: 18,
    marginTop: 20,
    color: '#1e3a8a',
  },
  item: {
    fontSize: 16,
    paddingVertical: 5,
    paddingLeft: 10,
    color: '#334155',
  },
});

export default CartScreen;
