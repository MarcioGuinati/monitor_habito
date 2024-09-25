import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet, Pressable, Modal, TouchableOpacity} from "react-native";
import Trash from "react-native-vector-icons/Fontisto";
import Edit from "react-native-vector-icons/FontAwesome";
import { CheckBox } from "react-native-elements";
import { db } from "../../src/firebase/config_firebase";
import { collection, onSnapshot, deleteDoc, doc, updateDoc, getDoc} from "firebase/firestore";
import { useNavigation } from "@react-navigation/native";

interface Evento {
    id: string;
    nome: string;
    checked?: boolean;
    status?: boolean;
}


export default function Event() {
    const [eventos, setEventos] = useState<Evento[]>([]);
    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const [eventToDeleteIndex, setEventToDeleteIndex] = useState<number | null>(null);
    const [selectAll, setSelectAll] = useState(false);
    
    useEffect(() => {
        const unsubscribe = onSnapshot(collection(db, "eventos"), (snapshot) => {
            const eventosList: Evento[] = snapshot.docs.map((doc) => ({
                id: doc.id,
                ...doc.data(),
            })) as Evento[];
            setEventos(eventosList);
        });

        return () => unsubscribe();
    }, []);

    const handleExcluirEvento = async (index: number) => {
        const updatedEventos = [...eventos];
        const eventIdToDelete = updatedEventos[index].id;

        updatedEventos.splice(index, 1);
        setEventos(updatedEventos);

        try {
            await deleteDoc(doc(db, "eventos", eventIdToDelete));
            console.log(`Evento com ID ${eventIdToDelete} excluído do Firestore.`);
        } catch (error) {
            console.error("Erro ao excluir o evento do Firestore:", error);
        }
    };

    const navigation = useNavigation();

    const handleEventEditPress = (eventId: string) => {
        navigation.navigate("eventEdit", { eventId });};

    
    // marcar todos os checkbox sem alterar o estado dos itens
    const toggleSelectAll = () => {
        setSelectAll(!selectAll);
    };

   // Função para marcar/desmarcar individualmente, riscar o texto e verificar no Firebase
    const toggleIndividualCheckbox = async (index: number) => {
    const updatedEventos = [...eventos];
    const evento = updatedEventos[index];

    // Verifica o status no Firebase antes de alterar
    try {
        const eventoRef = doc(db, 'tasks', evento.id); // Referência ao documento da tarefa
        const eventoSnapshot = await getDoc(eventoRef); // Obtém o documento do banco de dados

        if (eventoSnapshot.exists()) {
            const statusAtual = eventoSnapshot.data().status; // Obtém o status atual do documento

            // Atualiza o status baseado no que está no Firebase
            evento.checked = !statusAtual;
            evento.status = evento.checked;

            // Atualiza o estado local
            setEventos(updatedEventos);

            // Atualiza o banco de dados para refletir o novo status
            await updateDoc(eventoRef, {
                status: evento.status
            });
        } else {
            console.error('Documento não encontrado');
        }
    } catch (error) {
        console.error('Erro ao verificar/atualizar o status no banco de dados:', error);
    }
};
    return (
        <View style={styles.scrollViewContent}>
            {eventos.map((evento, index) => (
                <View key={index} style={styles.containerEvento}>
                    <View style={styles.backgroundNumeroOrdem}>
                        <Text style={styles.numeroOrdem}>{evento.id}</Text>
                    </View>

                    <Text style={styles.textoEvento}>{evento.nome}</Text>

                    <Pressable
                        style={styles.backgroundIcones}
                        onPress={() => handleEventEditPress(evento.id)}>
                        <Edit
                            name={"pencil-square-o"}
                            size={25}
                            color="black"
                        />
                    </Pressable>


                    <CheckBox
                        checked={evento.checked || false}
                        onPress={() => {
                            const updatedEventos = [...eventos];
                            updatedEventos[index].checked =
                                !updatedEventos[index].checked;
                            setEventos(updatedEventos);
                        }}
                        containerStyle={styles.checkbox}/>

                     {/* Checkbox para selecionar todas as tasks sem riscar os textos */}
                        <View>
                            <CheckBox
                                title="Selecionar Todos"
                                checked={selectAll}
                                onPress={toggleSelectAll}
                                containerStyle={styles.checkbox}
                            />
                        </View>

                        {eventos.map((evento, index) => (
                        <View key={evento.id} style={styles.containerEvento}>
                            {/* Checkbox global controlado pelo estado selectAll */}
                            <CheckBox
                                checked={selectAll || evento.checked} // Seleciona se global for true ou o próprio item estiver checked
                                onPress={() => toggleIndividualCheckbox(index)} // Atualiza o checkbox individual
                                containerStyle={styles.checkbox}
                            />

                            {/* Texto que fica riscado apenas se o checkbox individual estiver marcado */}
                            <Text
                                style={[
                                    styles.texto,
                                    evento.checked ? styles.textoRiscado : null
                                ]}
                            >
                                {evento.nome}
                            </Text>
                        </View>
                    ))}
                    <Pressable
                        style={styles.backgroundIcones}
                        onPress={() => {
                            setEventToDeleteIndex(index);
                            setShowDeleteModal(true);}}>
                        <Trash name={"trash"} size={25} color="black" />
                    </Pressable>
                </View>
            ))}

            <Modal visible={showDeleteModal} transparent animationType="slide">
                <View style={styles.modalContainer}>
                    <View style={styles.modalContent}>
                        <Text style={styles.modalText}>
                            Deseja realmente excluir?
                        </Text>
                        <View style={styles.modalButtons}>
                            <TouchableOpacity
                                onPress={() => {
                                    setShowDeleteModal(false);
                                    if (eventToDeleteIndex !== null) {
                                        handleExcluirEvento(eventToDeleteIndex);}}}>
                                <Text style={styles.confirmButton}>Sim</Text>
                            </TouchableOpacity>

                            <TouchableOpacity onPress={() => setShowDeleteModal(false)}>
                                <Text style={styles.cancelButton}>Não</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>
            </Modal>

        </View>
    );
}

const styles = StyleSheet.create({
    scrollViewContent: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
    },
    containerEvento: {
        backgroundColor: "white",
        flexDirection: "row",
        padding: 10,
        borderWidth: 1,
        borderColor: "white",
        alignItems: "center",
        marginBottom: 10,
        width: "100%",
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
    modalContainer: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "rgba(0, 0, 0, 0.5)",
    },
    modalContent: {
        backgroundColor: "white",
        padding: 20,
        borderRadius: 10,
        alignItems: "center",
    },
    modalText: {
        fontSize: 16,
        marginBottom: 20,
    },
    modalButtons: {
        flexDirection: "row",
    },
    confirmButton: {
        marginRight: 5,
        backgroundColor: "orange",
        color: "white",
        paddingVertical: 10,
        paddingHorizontal: 20,
        borderRadius: 4,
        alignItems: "center",
        justifyContent: "center",
    },
    cancelButton: {
        marginLeft: 5,
        backgroundColor: "orange",
        color: "white",
        paddingVertical: 10,
        paddingHorizontal: 20,
        borderRadius: 4,
        alignItems: "center",
        justifyContent: "center",
    },
});
