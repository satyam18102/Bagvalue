import React, { useContext } from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  Image,
  TouchableOpacity,
} from 'react-native';
import { useCart } from '../../contexts/CartContext';
import { useNavigation } from '@react-navigation/native';
import { ThemeContext } from '../../ThemeContext';

const CartScreen = () => {
  const { cart, dispatch } = useCart();
  const { isDarkMode } = useContext(ThemeContext);
  const navigation = useNavigation();

  const handleRemove = (id) => {
    dispatch({ type: 'REMOVE_FROM_CART', payload: id });
  };

  const total = cart.reduce((acc, item) => acc + item.price * item.quantity, 0);

  const renderItem = ({ item }) => (
    <View style={[styles.card, { backgroundColor: isDarkMode ? '#1a1a1a' : '#f1f1f1' }]}>
      <Image source={{ uri: item.image }} style={styles.image} />
      <View style={styles.info}>
        <Text style={[styles.title, { color: isDarkMode ? '#fff' : '#000' }]}>{item.title}</Text>
        <Text style={[styles.details, { color: isDarkMode ? '#ccc' : '#555' }]}>Qty: {item.quantity}</Text>
        <Text style={[styles.price, { color: '#2c2e91' }]}>₹ {Math.round(item.price * 80)}</Text>
        <TouchableOpacity onPress={() => handleRemove(item.id)}>
          <Text style={[styles.remove, { color: 'red' }]}>Remove</Text>
        </TouchableOpacity>
      </View>
    </View>
  );

  return (
    <View style={[styles.container, { backgroundColor: isDarkMode ? '#000' : '#fff' }]}>
      {/* Header */}
      <View style={styles.headerBox}>
        <Text style={[styles.brand, { color: '#ffdb00' ,marginTop: 20, fontSize: 24, fontWeight: 'bold'
         }]}>Bagvalue</Text>
        <Text style={[styles.header, { color: isDarkMode ? '#fff' : '#2c2e91' }]}>My Cart</Text>
      </View>

      {/* Content */}
      {cart.length === 0 ? (
        <Text style={[styles.empty, { color: isDarkMode ? '#aaa' : '#666' }]}>Your cart is empty.</Text>
      ) : (
        <>
          <FlatList
            data={cart}
            renderItem={renderItem}
            keyExtractor={(item) => item.id.toString()}
            contentContainerStyle={styles.listContainer}
          />
          <View style={styles.footer}>
            <Text style={styles.total}>Total: ₹ {Math.round(total * 80)}</Text>
            <TouchableOpacity
              style={styles.checkoutBtn}
              onPress={() => navigation.navigate('Checkout')}
            >
              <Text style={styles.checkoutText}>Checkout</Text>
            </TouchableOpacity>
          </View>
        </>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 20,
  },
  headerBox: {
    alignItems: 'center',
    marginBottom: 10,
  },
  brand: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  header: {
    fontSize: 22,
    fontWeight: 'bold',
    marginTop: 4,
  },
  empty: {
    textAlign: 'center',
    marginTop: 30,
    fontSize: 16,
  },
  listContainer: {
    paddingHorizontal: 10,
    paddingBottom: 80,
  },
  card: {
    flexDirection: 'row',
    borderRadius: 10,
    marginBottom: 15,
    padding: 10,
    alignItems: 'center',
  },
  image: {
    width: 80,
    height: 80,
    borderRadius: 10,
    marginRight: 15,
    resizeMode: 'contain',
    backgroundColor: '#fff',
  },
  info: {
    flex: 1,
  },
  title: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  details: {
    fontSize: 14,
    marginVertical: 4,
  },
  price: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  remove: {
    marginTop: 5,
    fontSize: 13,
  },
  footer: {
    position: 'absolute',
    bottom: 0,
    width: '100%',
    backgroundColor: '#2c2e91',
    padding: 15,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  total: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  checkoutBtn: {
    backgroundColor: '#ffdb00',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 8,
  },
  checkoutText: {
    color: '#000',
    fontWeight: 'bold',
  },
});

export default CartScreen;
