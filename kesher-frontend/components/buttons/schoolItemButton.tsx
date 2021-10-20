import React from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import globalStyles from "../../assets/globalStyles";

export default function SchoolItemButton({
    schoolName,
    onPress,
}: {
    schoolName: string;
    onPress: () => void;
}) {
    return (
        <View>
            <TouchableOpacity style={styles.school} onPress={onPress}>
                <Text style={styles.name}>{schoolName}</Text>
            </TouchableOpacity>
            <Text style={styles.name}>{schoolName}</Text>
        </View>
    );
}

const styles = StyleSheet.create({
    school: {
        backgroundColor: globalStyles.color.lightPurple,
        borderRadius: 500,
        width: globalStyles.window.width * 0.22,
        height: globalStyles.window.width * 0.22,
        justifyContent: "center",
        shadowOffset: {
            width: 0,
            height: 4,
        },
        shadowOpacity: 0.15,
        shadowRadius: 10,
        elevation: 5,
        marginBottom: 7,
        borderWidth: 0.4,
        borderColor: " rgba(166, 131, 228, 0.32)",
    },
    name: {
        fontSize: 12,
        lineHeight: 16,
        alignItems: "center",
        textAlign: "center",
        letterSpacing: 0.1,
        color: globalStyles.color.text,
        fontFamily: globalStyles.font.bold,
    },
});
