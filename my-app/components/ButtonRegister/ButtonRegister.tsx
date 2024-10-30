import React, { useState } from 'react';
import { TouchableOpacity, Text, StyleSheet, GestureResponderEvent, ActivityIndicator, Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { auth } from '@/src/firebase/config_firebase';

interface ButtonProps {
  onPress?: (event: GestureResponderEvent) => void;
  email: string;
  password: string;
}

const ButtonRegister: React.FC<ButtonProps> = ({ onPress, email, password }) => {
  const navigation = useNavigation();
  const [loading, setLoading] = useState(false);

  const handleRegister = async () => {
    setLoading(true);
    try {
      await createUserWithEmailAndPassword(auth, email, password);
      Alert.alert("Sucesso", "Usuário cadastrado com sucesso!");
      navigation.navigate("login"); // Navega para a tela de login após registro bem-sucedido
    } catch (error) {
      // Captura o erro e exibe a mensagem correspondente
      const errorMessage = error.code === 'auth/invalid-email' 
        ? "Email inválido. Verifique e tente novamente." 
        : error.code === 'auth/weak-password' 
          ? "A senha deve ter pelo menos 6 caracteres." 
          : "Falha ao cadastrar usuário. Verifique os dados e tente novamente.";
      Alert.alert("Erro", errorMessage);
    } finally {
      setLoading(false);
    }
  };

  return (
    <TouchableOpacity style={styles.button} onPress={handleRegister} disabled={loading}>
      {loading ? (
        <ActivityIndicator size="small" color="#FFF" />
      ) : (
        <Text style={styles.text}>Cadastrar</Text>
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

export default ButtonRegister;