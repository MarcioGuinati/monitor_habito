import React from 'react';
import { Alert, Button, StyleSheet } from 'react-native';
import { useNavigation } from 'expo-router';
import { auth } from '@/src/firebase/config_firebase';
import { sendPasswordResetEmail } from 'firebase/auth';

interface ButtonRecoverPasswordProps {
    userEmail: string;
}

function ButtonRecoverPassword({ userEmail }: ButtonRecoverPasswordProps) {
    const navigation = useNavigation();

    const handleRecoverPassword = async () => {
        if (!userEmail) {
            console.log("O e-mail não foi fornecido.");
            return;
        }

        try {
            await sendPasswordResetEmail(auth, userEmail);
            console.log("E-mail de recuperação de senha enviado com sucesso.");

            Alert.alert(
                "Instruções Enviadas",
                "Clique no link no e-mail que noreply@monitorhabito.firebaseapp.com te enviou, e redefina sua senha.",
                [
                    {
                        text: "OK",
                        onPress: () => {
                            navigation.navigate('login');
                        },
                    },
                ]
            );

        } catch (error) {
            console.error("Erro ao tentar recuperar a senha:", error);
        }
    };

    return (
        <Button title="Recuperar Senha" onPress={handleRecoverPassword} />
    );
}

const styles = StyleSheet.create({
    button: {
        marginTop: 30,
        backgroundColor: "#5271ff",
        paddingVertical: 10,
        paddingHorizontal: 20,
        borderRadius: 4,
        alignItems: "center",
        justifyContent: "center",
    },
    text: {
        color: "white",
        fontSize: 16,
        fontWeight: "bold",
    },
});

export default ButtonRecoverPassword;
