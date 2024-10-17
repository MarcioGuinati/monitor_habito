import React, { useState } from 'react';
import { View, Text, StyleSheet, Pressable, Platform } from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';

interface CurrentTimeProps {
  onTimeChange: (time: Date) => void;
}

const CurrentTime: React.FC<CurrentTimeProps> = ({ onTimeChange }) => {
  const [selectedTime, setSelectedTime] = useState(new Date());
  const [showPicker, setShowPicker] = useState(false);

  const formattedTime = selectedTime.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

  const handleTimeChange = (event: any, time?: Date) => {
    if (Platform.OS === 'android') setShowPicker(false); // Fecha o relógio no Android
    if (time) {
      setSelectedTime(time);
      onTimeChange(time); // Envia a hora selecionada para o componente EventEdit
    }
  };

  return (
    <View>
      <Pressable style={styles.container} onPress={() => setShowPicker(true)}>
        <Text style={styles.timeText}>Definir Hora</Text>
      </Pressable>

      {showPicker && (
        <DateTimePicker
          value={selectedTime}
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
