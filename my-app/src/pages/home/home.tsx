import { Image, StyleSheet, View, Text } from "react-native";
import Event from "@/components/Event/Event";
import WeekContainer from "@/components/WeekContainer/WeekContainer";

export default function HomeScreen() {
    return (
        <View style={styles.container}>
            <View style={styles.header}></View>
            <WeekContainer/>
            <Event/>
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