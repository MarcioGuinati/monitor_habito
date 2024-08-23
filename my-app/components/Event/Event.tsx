import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet, Pressable, ScrollView } from "react-native";
import Trash from "react-native-vector-icons/Fontisto";
import Edit from "react-native-vector-icons/FontAwesome";
import { CheckBox } from "react-native-elements";
import { db } from "../../src/firebase/config_firebase";
import { collection, getDocs } from "firebase/firestore";

interface Evento {
    id: string;
    nome: string;
    checked?: boolean;
}

export default function Event() {
    const [eventos, setEventos] = useState<Evento[]>([]);

    useEffect(() => {
        const fetchEventos = async () => {
            const querySnapshot = await getDocs(collection(db, "eventos"));
            const eventosList: Evento[] = querySnapshot.docs.map(doc => ({
                id: doc.id,
                ...doc.data()
            } as Evento));
            setEventos(eventosList);
        };

        fetchEventos();
    }, []);

    return (
        <ScrollView contentContainerStyle={styles.scrollViewContent}>
            {eventos.map((evento, index) => (
                <View key={index} style={styles.containerEvento}>
                    <View style={styles.backgroundNumeroOrdem}>
                        <Text style={styles.numeroOrdem}>{evento.id}</Text>
                    </View>

                    <Text style={styles.textoEvento}>{evento.nome}</Text>

                    <Pressable style={styles.backgroundIcones}>
                        <Edit
                            name={"pencil-square-o"}
                            size={25}
                            color="black"
                        />
                    </Pressable>

                    <CheckBox
                        checked={evento.checked || false}
                        onPress={() => {
                            const updatedEventos = [...eventos];
                            updatedEventos[index].checked = !updatedEventos[index].checked;
                            setEventos(updatedEventos);
                        }}
                        containerStyle={styles.checkbox}
                    />

                    <Pressable style={styles.backgroundIcones}>
                        <Trash
                            name={"trash"}
                            size={25}
                            color="black"
                        />
                    </Pressable>
                </View>
            ))}
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    scrollViewContent: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
    },
    containerEvento: {
        backgroundColor: "white",
        flexDirection: "row",
        padding: 10,
        borderWidth: 1,
        borderColor: "white",
        alignItems: "center",
        marginBottom: 10,
        width: "100%",
    },
    backgroundNumeroOrdem: {
        backgroundColor: "#EADCFE",
        borderRadius: 40,
        width: 40,
        height: 40,
        padding: 2,
        marginRight: 10,
    },
    numeroOrdem: {
        color: "#20015D",
        textAlign: "center",
        fontSize: 25,
    },
    textoEvento: {
        fontSize: 18,
        flex: 1,
    },
    backgroundIcones: {
        backgroundColor: "white",
    },
    checkbox: {
        backgroundColor: "white",
        borderWidth: 0,
        padding: 0,
    },
});
