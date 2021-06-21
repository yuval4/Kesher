import React from "react";
import { StyleSheet, Text, View, TouchableOpacity } from "react-native";
import globalStyles from "../../assets/globalStyles";
import Icons from "../../assets/icons/icons";

export default function RoundButton({
    onPress,
    title,
}: {
    onPress: () => void;
    title: string;
}) {
    return (
        <View style={styles.container}>
            <TouchableOpacity onPress={onPress}>
                {Icons.textBubble}
                <Text style={styles.text}>{title}</Text>
            </TouchableOpacity>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        width: 76,
        height: 76,
        backgroundColor: globalStyles.color.mediumPurplel,
        shadowOffset: {
            width: 1,
            height: 2,
        },
        shadowOpacity: 0.2,
        shadowRadius: 10,
        borderRadius: 50,
        elevation: 10,
        justifyContent: "center",
        alignItems: "center",
    },
    text: {
        fontFamily: globalStyles.font.semiBold,
        fontSize: 12,
        lineHeight: 12,
        alignItems: "center",
        textAlign: "center",
        letterSpacing: 0.1,
        color: globalStyles.color.text,
        width: 32,
        marginTop: 3,
    },
});
