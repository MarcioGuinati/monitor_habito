import React from 'react';
import { TouchableOpacity, Text, StyleSheet, GestureResponderEvent } from 'react-native';
import { addDoc, collection } from 'firebase/firestore';
import { db } from "../../src/firebase/config_firebase";
import { useNavigation } from '@react-navigation/native';

const ButtonCreate: React.FC = () => {
  const navigation = useNavigation();
  
  const handleNovoEventoPress = async () => {
    try {
      const dataAtual = new Date().toLocaleDateString();
      const horaAtual = new Date().toLocaleTimeString();

      const novoEventoData = {
        nome: "Novo Evento",
        notas: "",
        data: dataAtual,
        hora: horaAtual,
        status: false,
      };

      const docRef = await addDoc(collection(db, "eventos"), novoEventoData);
      const novoEventoId = docRef.id;
      console.log(`Novo evento criado com ID ${novoEventoId}`);
      navigation.navigate("eventEdit", { eventId: novoEventoId });
    } catch (error) {
      console.error("Erro ao criar novo evento:", error);
    }
  };

  return (
    <TouchableOpacity style={styles.button} onPress={handleNovoEventoPress}>
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