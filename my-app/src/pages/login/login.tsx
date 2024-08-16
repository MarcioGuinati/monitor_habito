
import PasswordBox from "@/components/PasswordBox/PasswordBox";
import InputEmail from "@/components/InputEmail/InputEmail";
import { Link } from "expo-router";
import { Image, StyleSheet, Platform, View, Text } from "react-native";
import ButtonLogin from "@/components/ButtonLogin/ButtonLogin";

export default function LoginScreen() {
    return (
        <View style={styles.container}>
            <View style={styles.header}>
                {/* Adiciona a logo no cabeçalho */}
                <Image
                    source={require('@/assets/images/logo.png')}
                    style={styles.logo}
                />
            </View>
            <View style={styles.box}>
                <View style={styles.stepContainerEmail}>
                    <InputEmail />
                </View>
                <View style={styles.stepContainerPassword}>
                    <PasswordBox />
                </View>
                <Link style={styles.linkForgot} href={""}>Esqueceu sua senha?</Link>
                <View style={styles.stepButtonContainer}>
                    <ButtonLogin />
                </View>
            </View>
            <Text style={styles.linktext1}>Não possui uma conta? <Link style={styles.link} href={""}>Cadastre-se</Link></Text>
            <Text style={styles.linktext2}>Esqueceu sua senha? <Link style={styles.link} href={""}>Recuperar</Link></Text>
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
    logo: {
        marginTop: 300,
        width: 400,
        height: 500,
        resizeMode: "contain",
    },
    box: {
        marginTop: 149,
        alignItems: "center",
        backgroundColor: "white",
    },
    stepContainerEmail: {
        gap: 8,
        marginBottom: 8,
        width: 315,
    },
    stepContainerPassword: {
        gap: 8,
        marginBottom: 0,
        width: 315,
    },
    stepButtonContainer: {
        gap: 8,
        marginTop: 36,
        marginBottom: 8,
        width: 315,
    },
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
    linkForgot: {
        alignSelf: "flex-end",
        marginRight: 70,
        marginTop: 0,
        fontSize: 13,
        color: "orange",
        fontWeight: "bold",
    },
    linktext1: {
        marginTop: 35,
        textAlign: "center",
    },
    linktext2: {
        marginTop: 3,
        textAlign: "center",
    },
    link: {
        fontSize: 16,
        color: "orange",
        fontWeight: "bold",
    },
});