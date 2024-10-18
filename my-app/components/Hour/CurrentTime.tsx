import React, { useState } from 'react';
import { View, Text, StyleSheet, Pressable, Platform } from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';

interface CurrentTimeProps {
  onTimeChange: (time: Date) => void;
  selectedTime: Date | null; // Alterado de initialTime para selectedTime
}

const CurrentTime: React.FC<CurrentTimeProps> = ({ onTimeChange, selectedTime }) => {
  const [showPicker, setShowPicker] = useState(false);

  const handleTimeChange = (event: any, time?: Date) => {
    if (Platform.OS === 'android') setShowPicker(false); // Fecha o relógio no Android
    if (time) {
      onTimeChange(time); // Envia a hora selecionada para o componente EventEdit
    }
  };

  return (
    <View>
      <Pressable onPress={() => setShowPicker(true)} style={styles.container}>
                <Text style={styles.timeText}>
                    {selectedTime
                        ? selectedTime.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })
                        : "Definir Hora"}
                </Text>
            </Pressable>

      {showPicker && (
        <DateTimePicker
          value={selectedTime || new Date()} // Usa a hora selecionada ou a hora atual
          mode="time"
          display="default"
          onChange={handleTimeChange}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#CCCDCF', // Cor cinza
    padding: 10,
    borderRadius: 4,
  },
  timeText: {
    fontSize: 20,
    color: '#1E90FF',
  },
});

export default CurrentTime;
