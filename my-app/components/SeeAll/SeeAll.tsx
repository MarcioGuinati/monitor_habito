import React, { useState } from "react";
import { View, Text, StyleSheet } from "react-native";
import { CheckBox } from "react-native-elements";

interface SeeAllProps {
    showAllEvents: boolean;
    setShowAllEvents: (showAll: boolean) => void;
}

const SeeAll: React.FC<SeeAllProps> = ({ showAllEvents, setShowAllEvents }) => {
    const handleToggleSeeAll = () => {
        setShowAllEvents(!showAllEvents);
    };

    return (
        <View style={styles.seeAllContainer}>
            <CheckBox
                checked={showAllEvents}
                onPress={handleToggleSeeAll}
                containerStyle={styles.checkbox}
            />
            <Text style={styles.label}>Visualizar Todos</Text>
        </View>
    );
};

const styles = StyleSheet.create({
    seeAllContainer: {
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#f0f0f0",
        padding: 10,
        borderRadius: 10,
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 5,
        elevation: 3,
        width: "100%",
        marginTop: 10,
        height: 50,
    },
    checkbox: {
        marginRight: 10,
        padding: 0,
    },
    label: {
        fontSize: 16,
    },
});

export default SeeAll;
