import React, { useState } from 'react';
import { View, Text, StyleSheet, Pressable, Platform } from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';

interface CurrentDateProps {
  onDateChange: (date: Date) => void;
}

const CurrentDate: React.FC<CurrentDateProps> = ({ onDateChange }) => {
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [showPicker, setShowPicker] = useState(false);

  const formattedDate = `${selectedDate.getDate()}/${(selectedDate.getMonth() + 1)
    .toString()
    .padStart(2, '0')}/${selectedDate.getFullYear()}`;

  const handleDateChange = (event: any, date?: Date) => {
    if (Platform.OS === 'android') setShowPicker(false); // Fecha o calendário no Android após a seleção
    if (date) {
      setSelectedDate(date);
      onDateChange(date); // Envia a data selecionada para o componente EventEdit
    }
  };

  return (
    <View>
      <Pressable style={styles.container} onPress={() => setShowPicker(true)}>
        <Text style={styles.dateText}>Definir Data</Text>
      </Pressable>

      {showPicker && (
        <DateTimePicker
          value={selectedDate}
          mode="date"
          display="default"
          onChange={handleDateChange}
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
    marginRight: 10,
  },
  dateText: {
    fontSize: 20,
    color: '#1E90FF',
  },
});

export default CurrentDate;
