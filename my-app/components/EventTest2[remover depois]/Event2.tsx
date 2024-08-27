import React, {useState} from "react";
import { View, Text, StyleSheet, Pressable } from "react-native";
import Trash from "react-native-vector-icons/Fontisto";
import Edit from "react-native-vector-icons/FontAwesome";
import { CheckBox } from "react-native-elements";

export default function Event2() {
    const [checked, setChecked] = useState(false);

    return (
        <View style={styles.containerEvento}>

            <View style={styles.backgroundNumeroOrdem}>
                <Text style={styles.numeroOrdem}>3</Text>
            </View>

            <Text style={styles.textoEvento}>2 e 3 são apenas testes</Text>

            <Pressable style={styles.backgroundIcones}>
            {/* Adicionar onPress={RotaDesejada} no Pressable acima */}
                <Edit
                    name={"pencil-square-o"}
                    size={25}
                    color="black"
                />
            </Pressable>

            <CheckBox
                checked={checked}
                onPress={() => setChecked(!checked)}
                containerStyle={styles.checkbox}/>

            <Pressable style={styles.backgroundIcones}>
            {/* Adicionar onPress={ExcluirEvento} no Pressable acima */}
                <Trash
                    name={"trash"}
                    size={25}
                    color="black"/>
            </Pressable>

        </View>
    );
}

const styles = StyleSheet.create({
    containerEvento: {
        backgroundColor: "white",
        flexDirection: "row",
        padding: 10,
        borderWidth: 1,
        borderColor: "white",
        alignItems: "center",
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