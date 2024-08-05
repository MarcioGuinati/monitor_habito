import React from 'react';
import { View, TextInput, StyleSheet } from 'react-native';
import { styles } from './InputEmailStyle';
import { MaterialIcons } from '@expo/vector-icons';
import Icon from 'react-native-vector-icons/MaterialIcons';


const InputEmail = () => {
  return (
    <View style={styles.container}>
          <MaterialIcons name="email" size={24} color="black" style={styles.lockIcon} />
            <TextInput 
            style={styles.input}
            placeholder="Email"
            keyboardType="email-address"
            underlineColorAndroid="transparent"
            />
        </View>
    // <View style={styles.container}>
    //   <View style={styles.inputContainer}>
    //     <Icon name="lock-open" size={24} color="grey" style={styles.icon} />
    //     <TextInput
    //       style={styles.textInput}
    //       placeholder="Digite seu email"
    //       underlineColorAndroid="transparent"
    //       keyboardType="email-address"
    //     />
    //   </View>
    // </View>
  );
};


export default InputEmail;
