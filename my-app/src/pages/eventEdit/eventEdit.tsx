import React, { useState, useEffect, useRef } from "react";
import { View, Text, StyleSheet, Pressable, TextInput } from "react-native";
import { useNavigation, useRoute } from "@react-navigation/native";
import { doc, getDoc, setDoc, } from "firebase/firestore";
import { db } from "../../firebase/config_firebase";
import CurrentDate from "@/components/Date/CurrentDate";
import CurrentTime from "@/components/Hour/CurrentTime";
import Edit from "react-native-vector-icons/FontAwesome";
import ButtonSave from "@/components/ButtonSave/ButtonSave";
import ButtonBack from "@/components/ButtonBack/ButtonBack";
import { firebase } from "@react-native-firebase/firestore";

export default function EventEdit() {
    const [editingTitle, setEditingTitle] = useState(false);
    const [eventTitle, setEventTitle] = useState("Escreva seu título");
    const [eventNotes, setEventNotes] = useState("");
    const [selectedDate, setSelectedDate] = useState(new Date());
    const [selectedTime, setSelectedTime] = useState(new Date());


    const navigation = useNavigation();
    const route = useRoute();
    const { eventId, isNewEvent, date, time } = route.params || {};

    const titleInputRef = useRef<TextInput>(null);

    const findNextAvailableId = async () => {
        try {
        let nextId = "01";
        return nextId;
        } catch (error) {
            console.error("Erro ao encontrar o próximo ID disponível:", error);
        return "01";
        }
    };

    useEffect(() => {
        if (isNewEvent) {
            // Defina os valores iniciais para um novo evento
            setEventTitle("Escreva seu título");
            setEventNotes("");
            setSelectedDate(null); // Alterado para null
            setSelectedTime(null); // Alterado para null
        } else {
            if (eventId) {
                const fetchEvento = async () => {
                    try {
                        const docRef = doc(db, "eventos", eventId);
                        const docSnapshot = await getDoc(docRef);
                        if (docSnapshot.exists()) {
                            const eventData = docSnapshot.data();
                            console.log("Evento data:", eventData.data); // Log do que está sendo recuperado

                            setEventTitle(eventData.nome || "Título do Evento");
                            setEventNotes(eventData.notas || "");

                            // Verifique se eventData.data é um timestamp do Firebase ou uma string
                            if (eventData.data instanceof firebase.firestore.Timestamp) {
                                const eventDate = eventData.data.toDate(); // Converta para Date
                                console.log("Data do evento (convertida):", eventDate); // Log da data convertida
                                setSelectedDate(eventDate); // Defina a data do evento
                            } else if (typeof eventData.data === "string") {
                                // Se for uma string no formato "DD/MM/YYYY", converta-a para um objeto Date
                                const parts = eventData.data.split("/");
                                const formattedDate = new Date(parts[2], parts[1] - 1, parts[0]); // Mês é zero-indexado
                                console.log("Data do evento (convertida de string):", formattedDate); // Log da data convertida
                                setSelectedDate(formattedDate); // Defina a data do evento
                            } else {
                                console.error("Data não é um objeto de timestamp do Firebase:", eventData.data);
                            }

                            // Defina a hora do evento
                            setSelectedTime(new Date(`1970-01-01T${eventData.hora}`));
                        } else {
                            console.log(`Evento com ID ${eventId} não encontrado.`);
                        }
                    } catch (error) {
                        console.error("Erro ao buscar dados do evento:", error);
                    }
                };

                fetchEvento();
            } else if (date && time) {
                // Se estamos editando e recebemos data e hora como parâmetros
                setSelectedDate(new Date(date)); // Defina a data recebida
                setSelectedTime(new Date(`1970-01-01T${time}`)); // Defina a hora recebida
            }
        }
    }, [eventId, isNewEvent, date, time]);

    useEffect(() => {
        console.log("Data selecionada:", selectedDate); // Verifique aqui
    }, [selectedDate]);

    useEffect(() => {
        if (editingTitle && titleInputRef.current) {
            titleInputRef.current.focus();
            titleInputRef.current.setSelection(0, eventTitle.length);
        }
    }, [editingTitle]);

    const handleButtonBackPress = () => {
        navigation.navigate("home");};

    const handleEditTitle = () => {
        setEditingTitle(true);};

    const handleTitleChange = (newTitle: string) => {
        setEventTitle(newTitle);};

    const handleSaveTitle = () => {
        setEditingTitle(false);};

        const handleButtonSavePress = async () => {
            try {
                let currentEventId = eventId || (await findNextAvailableId());

                const eventoData = {
                id: currentEventId,
                nome: eventTitle,
                notas: eventNotes,
                data: selectedDate ? selectedDate.toLocaleDateString() : "", // Usa a data selecionada
                hora: selectedTime ? selectedTime.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) : "", // Usa a hora selecionada
                status: false,};
        
            const docRef = doc(db, "eventos", currentEventId);
            await setDoc(docRef, eventoData);
        
            console.log(`Evento com ID ${currentEventId} salvo no Firestore.`);
            navigation.navigate("home");
            } catch (error) {
                console.error("Erro ao salvar o evento no Firestore:", error);
            }
        };

    return (
        <View style={styles.container}>
            <View style={styles.header}></View>

            <View style={styles.eventEditBox}>
                <View style={styles.dateAndHour}>
                    <CurrentDate selectedDate={selectedDate} onDateChange={setSelectedDate} />
                    <CurrentTime selectedTime={selectedTime} onTimeChange={setSelectedTime} />

                </View>

                <View style={styles.titleBox}>
                    {editingTitle ? (
                        <TextInput
                            ref={titleInputRef}
                            style={styles.editableTitle}
                            value={eventTitle}
                            onChangeText={handleTitleChange}
                            autoFocus
                            onBlur={handleSaveTitle}/>
                    ) : (
                        <Text style={styles.eventTitle}>{eventTitle}</Text>)}
                </View>
                <Pressable style={styles.editButton} onPress={handleEditTitle}>
                    <Edit name={"pencil-square-o"} size={25} color="black" />
                </Pressable>

                <View style={styles.notesBox}>
                    <TextInput
                        style={styles.notesInput}
                        value={eventNotes}
                        onChangeText={setEventNotes}
                        multiline
                        placeholder="Adicione suas anotações aqui..."/>
                </View>
            </View>

            <View style={styles.saveBackButtonsBox}>
                <ButtonSave onPress={handleButtonSavePress} />
                <ButtonBack onPress={handleButtonBackPress} />
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center",
        backgroundColor: "white",
        alignItems: "center",
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
    eventEditBox: {
        width: "85%",
        height: "70%",
        marginTop: 90,
        backgroundColor: "#D9D8D8",
        paddingVertical: 10,
        paddingHorizontal: 20,
        borderRadius: 6,
        alignItems: "center",
    },
    dateAndHour: {
        flexDirection: "row",
        backgroundColor: "#D9D8D8",
        paddingVertical: 5,
        paddingHorizontal: 5,
        borderRadius: 4,
    },
    titleBox: {
        backgroundColor: "#D9D8D8",
        marginTop: 30,
        alignItems: "center",
        justifyContent: "center",
    },
    eventTitle: {
        fontSize: 23,
    },
    editableTitle: {
        backgroundColor: "#D9D8D8",
        fontSize: 23,
        borderColor: "black",
    },
    editButton: {
        position: "absolute",
        top: 103,
        right: 25,
        backgroundColor: "#D9D8D8",
    },
    notesBox: {
        backgroundColor: "#D9D8D8",
        width: "90%",
        marginTop: 60,
        padding: 10,
        borderRadius: 6,
    },
    notesInput: {
        fontSize: 16,
        height: 320,
        textAlignVertical: "top",
    },
    saveBackButtonsBox: {
        backgroundColor: "white",
        flexDirection: "row",
        width: "85%",
        justifyContent: "space-between",
        paddingBottom: 15,
    },
});
