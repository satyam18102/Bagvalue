import React from 'react';
import { TextInput, Text, View, StyleSheet } from 'react-native';

const TextInputField = ({ field, form, ...props }) => {
  const error = form.errors[field.name];
  const touched = form.touched[field.name];
  const showError = touched && error;

  return (
    <View style={styles.wrapper}>
      <TextInput
        style={[styles.input, showError && styles.errorInput]}
        value={field.value}
        onChangeText={form.handleChange(field.name)}
        onBlur={form.handleBlur(field.name)}
        {...props}
      />
      {showError && <Text style={styles.errorText}>{error}</Text>}
    </View>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    marginBottom: 16,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 10,
    borderRadius: 8,
  },
  errorInput: {
    borderColor: 'red',
  },
  errorText: {
    color: 'red',
    marginTop: 4,
    fontSize: 12,
  },
});

export default TextInputField;
