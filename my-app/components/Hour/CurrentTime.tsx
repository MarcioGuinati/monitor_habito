import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';

const CurrentTime = () => {
  const [currentTime, setCurrentTime] = useState('');

  useEffect(() => {
    const updateCurrentTime = () => {
      const now = new Date();
      const formattedTime = now.toLocaleTimeString();
      setCurrentTime(formattedTime);
    };

    const interval = setInterval(updateCurrentTime, 1000);

    return () => clearInterval(interval);
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.timeText}>{currentTime}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#cdcdcd', // Cor cinza
    padding: 10,
    margin: 10,
  },
  timeText: {
    fontSize: 20,
    color: '#1E90FF',
  },
});

export default CurrentTime;
