import React, { useState } from 'react';
import { View, Text, StyleSheet, Pressable, Platform } from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';

interface CurrentDateProps {
  onDateChange: (date: Date) => void;
  selectedDate: Date | null; // Alterado de initialDate para selectedDate
}

const CurrentDate: React.FC<CurrentDateProps> = ({ onDateChange, selectedDate }) => {
  const [showPicker, setShowPicker] = useState(false);

  const handleDateChange = (event: any, date?: Date) => {
    if (Platform.OS === 'android') setShowPicker(false); // Fecha o calendário no Android após a seleção
    if (date) {
      onDateChange(date); // Envia a data selecionada para o componente EventEdit
    }
  };

  const validDate = selectedDate instanceof Date && !isNaN(selectedDate.getTime()) ? selectedDate : new Date();

  return (
    <View>
      <Pressable onPress={() => setShowPicker(true)} style={styles.container}>
                <Text style={styles.dateText}>
                    {selectedDate
                        ? selectedDate.toLocaleDateString()
                        : "Definir Data"}
                </Text>
            </Pressable>

      {showPicker && (
        <DateTimePicker
          value={selectedDate || new Date()} // Usa a data selecionada ou a data atual
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
