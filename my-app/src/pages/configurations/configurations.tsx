import React from "react";
import { StyleSheet, View, Text, TouchableOpacity, Alert } from "react-native";

export default function ConfigScreen() {
  const handleShare = () => {
    // Falta implementar
    Alert.alert("Compartilhar", "Funcionalidade de compartilhamento ainda não implementada.");
  };

  const handleDevelopers = () => {
    // Mostrar nomes dos desenvolvedores
    Alert.alert("Desenvolvedores", "Marcio - (16) 99247 - 5333\nAlfredo - (21) 97622 - 0117");
  };

  const handleNotifications = () => {
    // Falta implementar
    Alert.alert("Notificações", "Funcionalidade de notificações ainda não implementada.");
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        {/* <Text style={styles.headerText}>Configurações</Text> */}
      </View>
      <View style={styles.content}>
        <TouchableOpacity style={styles.menuItem} onPress={handleShare}>
          <Text style={styles.menuItemText}>Compartilhar</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.menuItem} onPress={handleDevelopers}>
          <Text style={styles.menuItemText}>Desenvolvedores</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.menuItem} onPress={handleNotifications}>
          <Text style={styles.menuItemText}>Notificações</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    backgroundColor: "white",
  },
  header: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    backgroundColor: "#5271ff",
    height: 80,
    justifyContent: "center",
    alignItems: "center",
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
  },
  headerText: {
    color: "white",
    fontSize: 20,
    fontWeight: "bold",
  },
  content: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  menuItem: {
    width: "80%",
    padding: 15,
    marginVertical: 10,
    backgroundColor: "#f0f0f0",
    alignItems: "center",
    borderRadius: 10,
  },
  menuItemText: {
    fontSize: 18,
    color: "#333",
  },
  constructionText: {
    fontSize: 18,
    color: "gray",
    fontStyle: "italic",
  },
});
