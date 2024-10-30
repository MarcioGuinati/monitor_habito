import React from 'react';
import { TouchableOpacity, Text, StyleSheet, GestureResponderEvent } from 'react-native';
import { doc, setDoc } from 'firebase/firestore';
import { auth, db } from "../../src/firebase/config_firebase";

interface ButtonProps {
  onPress?: (event: GestureResponderEvent) => void;
  userEmail: string | null;
  eventId: string;
  eventData: any;
}

const ButtonSave: React.FC<ButtonProps> = ({ onPress, userEmail, eventId, eventData }) => {
  const handleSave = async () => {
    const user = auth.currentUser;

    if (!user || !user.email) {
      console.error("Usuário não autenticado.");
      return;
    }

    try {
      const eventRef = doc(db, user.email, eventId);
      await setDoc(eventRef, eventData);
      console.log("Evento salvo com sucesso.");
      const fakeEvent = { nativeEvent: {} } as GestureResponderEvent;
        if (onPress) onPress(fakeEvent);
      } catch (error) {
        console.error("Erro ao salvar o evento:", error);
      }
  };

  return (
    <TouchableOpacity style={styles.button} onPress={handleSave}>
      <Text style={styles.text}>SALVAR</Text>
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

export default ButtonSave;