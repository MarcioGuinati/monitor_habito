import React, { useState } from 'react';
import { useNavigation } from "@react-navigation/native";
import { TouchableOpacity, Text, StyleSheet, GestureResponderEvent, ActivityIndicator, Alert } from 'react-native';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '@/src/firebase/config_firebase';

interface ButtonProps {
  onPress?: (event: GestureResponderEvent) => void;
  email: string;
  password: string;
}

const ButtonLogin: React.FC<ButtonProps> = ({ onPress, email, password }) => {
  const navigation = useNavigation();
  const [loading, setLoading] = useState(false);

  const handleLogin = async () => {
    setLoading(true);
    try {
      await signInWithEmailAndPassword(auth, email, password);
      navigation.navigate("home");
    } catch (error) {
      Alert.alert("Erro", "E-mail ou senha incorretos. Tente novamente.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <TouchableOpacity style={styles.button} onPress={handleLogin} disabled={loading}>
      {loading ? (
        <ActivityIndicator size="small" color="#FFF" />
      ) : (
        <Text style={styles.text}>Entrar</Text>
      )}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    marginTop: 30,
    backgroundColor: 'orange',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 4,
    alignItems: 'center',
    justifyContent: 'center',
  },
  text: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default ButtonLogin;