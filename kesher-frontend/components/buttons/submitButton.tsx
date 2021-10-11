import React from "react";
import { StyleSheet, Text, View, TouchableOpacity } from "react-native";
import globalStyles from "../../assets/globalStyles";

export default function SubmitButton({
    text,
    onPress,
}: {
    text: string;
    onPress?: () => void;
}) {
    return (
        <View>
            <TouchableOpacity onPress={onPress} style={styles.container}>
                <Text style={styles.text}>{text}</Text>
            </TouchableOpacity>
        </View>
    );
}

// box-shadow: 0px 1px 10px 1px rgba(128, 78, 217, 0.5);

const styles = StyleSheet.create({
    container: {
        width: 100,
        height: 36,
        backgroundColor: globalStyles.color.purple,
        borderRadius: 16,
        shadowOffset: {
            width: 0,
            height: 1,
        },
        shadowColor: globalStyles.color.purple,
        shadowOpacity: 0.5,
        shadowRadius: 10,
        elevation: 4,
        justifyContent: "center",
        alignItems: "center",
        textAlign: "center",
    },
    text: {
        color: "white",
        fontFamily: globalStyles.font.semiBold,
        fontSize: 20,
        lineHeight: 24,
        letterSpacing: 0.1,
    },
});
