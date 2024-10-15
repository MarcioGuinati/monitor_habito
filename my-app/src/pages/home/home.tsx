import { Image, StyleSheet, View, ScrollView } from "react-native";
import Event from "@/components/Event/Event";
import WeekContainer from "@/components/WeekContainer/WeekContainer";
import ButtonCreate from "@/components/ButtonCreate/ButtonCreate";

export default function HomeScreen() {
    return (
        <View style={styles.container}>
            <View style={styles.header}></View>

            <View style={styles.weekContainerWrapper}>
                <WeekContainer />
            </View>

            <ScrollView style={styles.eventContainer}>
                <Event />
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
        height: 90,
        justifyContent: "center",
        alignItems: "center",
        borderBottomLeftRadius: 25,
        borderBottomRightRadius: 25,
    },
    weekContainerWrapper: {
        marginTop: 20,
        zIndex: 1,
    },
    eventContainer: {
        flex: 1,
        marginTop: 155,
    },
    buttonCreateWrapper: {
        position: "absolute",
        bottom: 20,
        left: 0,
        right: 0,
        alignItems: "center",
        zIndex: 10,
    },
});