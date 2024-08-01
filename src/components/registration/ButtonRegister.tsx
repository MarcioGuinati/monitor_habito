// components/registration/ButtonRegister.tsx
import React from 'react';
import { TouchableOpacity, Text, StyleSheet } from 'react-native';

const ButtonRegister = () => {
  return (
    <TouchableOpacity style={styles.button}>
      <Text style={styles.buttonText}>Cadastrar</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    backgroundColor: 'orange',
    padding: 10,
    borderRadius: 5,
    alignItems: 'center',
  },
  buttonText: {
    fontFamily: 'Roboto',
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default ButtonRegister;