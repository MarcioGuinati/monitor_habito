import React from 'react';
import { TouchableOpacity, Text, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { collection, getDocs } from 'firebase/firestore';
import { db } from "../../src/firebase/config_firebase";

const ButtonCreate: React.FC = () => {
  const navigation = useNavigation();

  const findNextAvailableId = async () => {
    try {
      const eventosCollection = collection(db, "eventos");
      const querySnapshot = await getDocs(eventosCollection);
      const ids = querySnapshot.docs.map(doc => parseInt(doc.id, 10)).sort((a, b) => a - b);

      let newId = 1;
      for (let i = 0; i < ids.length; i++) {
        if (ids[i] !== newId) {
          break;
        }
        newId++;
      }

      return newId.toString().padStart(2, '0');
    } catch (error) {
      console.error("Erro ao buscar IDs dos eventos:", error);
      return "01";
    }
  };

  const handleNovoEventoPress = async () => {
    try {
      const nextId = await findNextAvailableId();
      navigation.navigate("eventEdit", { eventId: nextId });
    } catch (error) {
      console.error("Erro ao gerar novo ID para evento:", error);
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