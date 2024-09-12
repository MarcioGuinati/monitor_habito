import React from 'react';
import { TouchableOpacity, Text, StyleSheet, GestureResponderEvent } from 'react-native';

interface ButtonProps {
  onPress?: (event: GestureResponderEvent) => void;
}

const ButtonCreate: React.FC<ButtonProps> = ({ onPress }) => {
  return (
    <TouchableOpacity style={styles.button} onPress={onPress}>
      <Text style={styles.text}>Criar novo evento</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    marginTop: 30,
    backgroundColor: 'orange',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
  },
  text: {
    color: 'white',
    fontSize: 19,
    fontWeight: 'bold',
  },
});

export default ButtonCreate;