import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet } from "react-native";
import { CheckBox } from "react-native-elements";
import { writeBatch, doc } from "firebase/firestore";
import { db } from "../../src/firebase/config_firebase";

interface CheckAllProps {
    eventos: Evento[];
    setEventos: (eventos: Evento[]) => void;
}

const CheckAll: React.FC<CheckAllProps> = ({ eventos, setEventos }) => {
    const [checked, setChecked] = useState(false);

    useEffect(() => {
        const allChecked = eventos.every((evento) => evento.checked === true);
        setChecked(allChecked);
    }, [eventos]);

    const handleToggleAll = async () => {
        const newCheckedStatus = !checked;
        setChecked(newCheckedStatus);

        const updatedEventos = eventos.map(evento => ({
            ...evento,
            checked: newCheckedStatus,
            status: newCheckedStatus,
        }));

        setEventos(updatedEventos);

        try {
            const batch = writeBatch(db);

            updatedEventos.forEach(evento => {
                const eventoRef = doc(db, "eventos", evento.id);
                batch.update(eventoRef, {
                    checked: evento.checked,
                    status: evento.status,
                });
            });

            await batch.commit();
            console.log("Todos os eventos atualizados no Firebase.");
        } catch (error) {
            console.error("Erro ao atualizar eventos no Firebase:", error);
        }
    };

    return (
        <View style={styles.checkAllContainer}>
            <CheckBox
                checked={checked}
                onPress={handleToggleAll}
                containerStyle={styles.checkbox}
            />
            <Text style={styles.label}>Marcar/Desmarcar Todos</Text>
        </View>
    );
};

const styles = StyleSheet.create({
    checkAllContainer: {
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center",
        width: "100%",
        height: 35,
        marginTop: 10,
    },
    checkbox: {
        marginRight: 10,
        alignSelf: "flex-end",
        padding: 0,
    },
    label: {
        fontSize: 16,
        
    },
});

export default CheckAll;