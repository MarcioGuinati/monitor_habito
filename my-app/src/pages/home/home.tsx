import { Image, StyleSheet, View, Text } from "react-native";
import Event from "@/components/Event/Event";
import Event1 from "@/components/EventTest1[remover depois]/Event1";
import Event2 from "@/components/EventTest2[remover depois]/Event2";
import WeekContainer from "@/components/WeekContainer/WeekContainer";
import ListCollections from "@/components/ListCollections[remover depois]/ListCollections";

export default function HomeScreen() {
    return (
        <View style={styles.container}>
            <View style={styles.header}></View>
            <WeekContainer/>
            <Event/>
            <Event1/>
            <Event2/>
            <ListCollections/>
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
        height: 75,
        justifyContent: "center",
        alignItems: "center",
    },
});