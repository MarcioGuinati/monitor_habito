import { Image, StyleSheet, Platform, View, Text } from "react-native";
import { useNavigation } from '@react-navigation/native';
import PasswordBox from "@/components/PasswordBox/PasswordBox";
import InputEmail from "@/components/InputEmail/InputEmail";
import ButtonRegister from "@/components/ButtonRegister/ButtonRegister";


export default function Register() {
    const navigation = useNavigation(); // Inicialize o hook de navegação

    const handleLoginPress = () => {
      navigation.navigate('login'); // Navegue para a tela "Register"
    };

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
                <View style={styles.stepContainer}>
                    <InputEmail />
                </View>
                <View style={styles.stepContainer}>
                    <PasswordBox />
                </View>
                <View style={styles.stepButtonContainer}>
                    <ButtonRegister />
                </View>
            </View>
            <Text style={styles.linktext}>Já tem uma conta? <Text style={styles.link} onPress={handleLoginPress}>Login</Text></Text>
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
    logo: {
        marginTop: 300,
        width: 400,
        height: 500,
        resizeMode: "contain",
    },
    box: {
        marginTop: 125,
        alignItems: "center",
        backgroundColor: "white",
    },
    stepContainer: {
        gap: 8,
        marginBottom: 8,
        width: 315,
    },
    stepButtonContainer: {
        gap: 8,
        marginTop: 45,
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
    linktext: {
        marginTop: 35,
        textAlign: "center",
    },
    link: {
        fontSize: 16,
        color: "orange",
        fontWeight: "bold",
    },
});