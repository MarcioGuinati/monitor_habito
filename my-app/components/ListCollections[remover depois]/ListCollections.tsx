import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet } from "react-native";
import { db } from "../../src/firebase/config_firebase";
import { collection, getDocs } from "firebase/firestore";

export default function ListCollections() {
    const [collections, setCollections] = useState<string[]>([]);

    useEffect(() => {
        const fetchCollections = async () => {
            const querySnapshot = await getDocs(collection(db, "eventos"));
            const collectionsList: string[] = querySnapshot.docs.map(doc => doc.id);
            setCollections(collectionsList);
        };

        fetchCollections();
    }, []);

    return (
        <View style={styles.container}>
            <Text style={styles.title}>-REMOVER DEPOIS- Documentos na Coleção "eventos" no Firebase:</Text>
            {collections.map((collection, index) => (
                <Text key={index} style={styles.collectionName}>{collection}</Text>
            ))}
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: "#EADCFE",
    },
    title: {
        fontSize: 20,
        fontWeight: "bold",
        marginBottom: 20,
    },
    collectionName: {
        fontSize: 16,
        marginBottom: 10,
        marginLeft: 10,
    },
});
