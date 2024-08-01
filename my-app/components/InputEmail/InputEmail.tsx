import React from 'react';
import { View, TextInput, StyleSheet } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { styles } from './InputEmailStyle';


const InputEmail = () => {
  return (
    <View style={styles.container}>
      <View style={styles.inputContainer}>
        <MaterialIcons name="email" size={20} color="#000" style={styles.icon} />
        <TextInput
          style={styles.textInput}
          placeholder="Digite seu email"
          underlineColorAndroid="transparent"
          keyboardType="email-address"
        />
      </View>
    </View>
  );
};


export default InputEmail;
