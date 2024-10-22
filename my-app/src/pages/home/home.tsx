import { Image, StyleSheet, View, ScrollView } from "react-native";
import Event, { Evento } from "@/components/Event/Event";
import WeekContainer from "@/components/WeekContainer/WeekContainer";
import ButtonCreate from "@/components/ButtonCreate/ButtonCreate";
import { useState } from "react";

export default function HomeScreen() {

    const [eventos, setEventos] = useState<Evento[]>([]);

    return (
        <View style={styles.container}>
            <View style={styles.header}></View>

            <View style={styles.weekContainerWrapper}>
            <WeekContainer eventos={eventos.map(evento => ({ data: evento.data || '' }))} />
            </View>

            <ScrollView style={styles.eventContainer}>
                <Event setEventos={setEventos}/>
            </ScrollView>

            <View style={styles.buttonCreateWrapper}>
                <ButtonCreate />
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
        backgroundColor: "orange",
        height: 80,
        justifyContent: "center",
        alignItems: "center",
        borderBottomLeftRadius: 20,
        borderBottomRightRadius: 20,
    },
    weekContainerWrapper: {
        marginTop: 5,
        zIndex: 1,
    },
    eventContainer: {
        // top: 1,
        //Bug analisar
        bottom: 50,
        flex: 1,
        marginTop: 155,
    },
    buttonCreateWrapper: {
        position: "absolute",
        bottom: 20,
        left: 0,
        right: 0,
        alignItems: "center",
        zIndex: 5,
    },
});