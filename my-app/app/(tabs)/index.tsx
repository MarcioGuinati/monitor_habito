
import InputEmail from "@/components/InputEmail/InputEmail";
import { Link } from "expo-router";
import { Image, StyleSheet, Platform, View, Text } from "react-native";

export default function HomeScreen() {
    return (
        <View style={styles.container}>
            <View style={styles.header}></View>
            <View style={styles.box}>
                <View style={styles.stepContainer}>
                    <Text style={styles.subtitle}>Step 1: Try it</Text>
                    <Text> 
                      Edit{" "}
                        <Text style={styles.defaultSemiBold}>
                            app/(tabs)/index.tsx </Text>{" "}
                        to see changes. Press{" "}
                        <Text style={styles.defaultSemiBold}>
                            {Platform.select({
                                ios: "cmd + d",
                                android: "cmd + m",})} </Text> {" "}
                        to open developer tools.
                    </Text>
                </View>
                <View style={styles.stepContainer}>
                    <Text style={styles.subtitle}>Step 2: Explore</Text>
                    <Text>
                        Tap the Explore tab to learn more about what's included
                        in this starter app.
                    </Text>
                 
                </View>
                <View style={styles.stepContainer}>
                    <Text style={styles.subtitle}>
                        Step 3: Get a fresh start
                    </Text>
                    <Text>
                        When you're ready, run{" "}
                        <Text style={styles.defaultSemiBold}>
                            npm run reset-project
                        </Text>{" "}
                        to get a fresh{" "}
                        <Text style={styles.defaultSemiBold}>app</Text>{" "}
                        directory. This will move the current{" "}
                        <Text style={styles.defaultSemiBold}>app</Text> to{" "}
                        <Text style={styles.defaultSemiBold}>app-example</Text>.
                    </Text>
                </View>
            </View>
            <Text style={styles.linktext}>Já tem uma conta? <Link style={styles.link} href={""}>Login</Link></Text>
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
    },
    box: {
        alignItems: "center",
        backgroundColor: "white",
    },
    stepContainer: {
        gap: 8,
        marginBottom: 8,
        width: 315,
    }, //ABAIXO, TEXTOS
    default: {
        fontSize: 16,
        lineHeight: 24,
    },
    defaultSemiBold: {
        fontSize: 16,
        lineHeight: 24,
        fontWeight: "600",
    },
    title: {
        fontSize: 32,
        fontWeight: "bold",
        lineHeight: 32,
    },
    subtitle: {
        fontSize: 20,
        fontWeight: "bold",
    },
    linktext: {
      marginTop: 20,
      textAlign: "center",
  },
    link: {
        fontSize: 16,
        color: "orange",
        fontWeight: "bold",
    },
});
