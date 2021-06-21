import React from "react";
import { StyleSheet, Text, View, TouchableOpacity } from "react-native";
import globalStyles from "../../assets/globalStyles";

export default function SmallButton({
    text,
    onPress,
    style,
}: {
    text: string;
    onPress?: any;
    style?: any;
}) {
    return (
        <View style={style}>
            <TouchableOpacity style={styles.container} onPress={onPress}>
                <Text style={styles.text}>{text}</Text>
            </TouchableOpacity>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        width: 95,
        height: 36,
        backgroundColor: globalStyles.color.mediumPurplel,
        borderRadius: 16,
        shadowOffset: {
            width: 0,
            height: 1,
        },
        shadowOpacity: 0.15,
        shadowRadius: 16,
        marginBottom: 15,
        elevation: 4,
        justifyContent: "center",
        alignItems: "center",
        textAlign: "center",
    },
    text: {
        color: "white",
        fontFamily: globalStyles.font.semiBold,
        fontSize: 16,
        lineHeight: 24,
        letterSpacing: 0.1,
    },
});
