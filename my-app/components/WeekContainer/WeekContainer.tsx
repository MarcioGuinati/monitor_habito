import { StyleSheet, View, Text, Pressable } from "react-native";
import { useState, useEffect } from "react";
import DateTimePicker from '@react-native-community/datetimepicker';
import Icon from 'react-native-vector-icons/FontAwesome'; // Adicione esta linha

export default function WeekContainer() {
    const [currentDate, setCurrentDate] = useState(new Date());
    const [weekDays, setWeekDays] = useState<Date[]>([]);
    const [showPicker, setShowPicker] = useState(false); // Estado para controlar a exibição do calendário
    const [selectedDate, setSelectedDate] = useState(currentDate);

    useEffect(() => {
        const startOfWeek = new Date(currentDate);
        startOfWeek.setDate(currentDate.getDate() - currentDate.getDay());
        const days: Date[] = [];
        for (let i = 0; i < 7; i++) {
            const day = new Date(startOfWeek);
            day.setDate(startOfWeek.getDate() + i);
            days.push(day);
        }
        setWeekDays(days);
    }, [currentDate]);

    const handleCalendarPress = () => {
        setShowPicker(true);
    };

    const handleDateChange = (event: any, date?: Date) => {
        if (date) {
            setSelectedDate(date);
            // Não atualiza currentDate aqui, pois queremos manter o dia atual
        }
        setShowPicker(false); // Fecha o picker após a seleção
    };

    return (
        <View style={styles.Container}>
            <View style={styles.daysWeekContainer}>
                {["DOM", "SEG", "TER", "QUA", "QUI", "SEX", "SAB"].map((day, index) => (
                    <Text key={index} style={styles.dayWeek}>{day}</Text>
                ))}
            </View>
            <View style={styles.daysMonthContainer}>
                {weekDays.map((day, index) => {
                    const isCurrentDay = 
                        day.getDate() === currentDate.getDate() && 
                        day.getMonth() === currentDate.getMonth() && 
                        day.getFullYear() === currentDate.getFullYear();
                    
                    const isSelectedDay = 
                        day.getDate() === selectedDate.getDate() && 
                        day.getMonth() === selectedDate.getMonth() && 
                        day.getFullYear() === selectedDate.getFullYear();

                    return (
                        <View 
                            key={index} 
                            style={[
                                styles.dayContainer, 
                                isCurrentDay ? styles.currentDay : 
                                isSelectedDay ? styles.selectedDay : null
                            ]}
                        >
                            <Text style={styles.dayMonth}>{day.getDate()}</Text>
                        </View>
                    );
                })}
            </View>

            <Pressable onPress={handleCalendarPress} style={styles.calendarIconContainer}>
                    <Icon name="calendar" size={25} color="white" />
            </Pressable>

            {showPicker && (
                <DateTimePicker
                    value={selectedDate}
                    mode="date"
                    display="default"
                    onChange={handleDateChange}
                />
            )}
        </View>
    );
}

const styles = StyleSheet.create({
    Container: {
        position: "absolute",
        top: 85,
        left: 0,
        right: 0,
        backgroundColor: "#999999",
        height: 75,
        justifyContent: "center",
        alignItems: "center",
        marginBottom: 3,
        borderRadius: 10,
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 5,
        elevation: 3,
        margin: 4
    },
    daysWeekContainer: {
        width: 240,
        bottom: 5,
        flexDirection: "row",
        justifyContent: "space-evenly",
    },
    dayWeek: {
        color: "white",
        textAlign: "center",
        width: 35,
    },
    daysMonthContainer: {
        width: 240,
        bottom: 2,
        flexDirection: "row",
        justifyContent: "space-evenly",
    },
    dayContainer: {
        width: 35,
        alignItems: "center",
    },
    dayMonth: {
        color: "white",
        textAlign: "center",
    },
    currentDay: {
        backgroundColor: "orange",
        borderRadius: 20,
        padding: 2,
    },
    selectedDay: {
        backgroundColor: "red", // cor para o dia selecionado no calendário
        borderRadius: 20,
        padding: 2,
    },
    calendarIconContainer: {
        width: 35,
        alignItems: "center",
        justifyContent: "center",
        position: "absolute",
        left: 315,
        bottom: 23,
    },
});
