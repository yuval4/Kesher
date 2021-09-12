import React, { useEffect, useState } from "react";
import {
    StyleSheet,
    View,
    TouchableOpacity,
    TextInput,
    Text,
} from "react-native";
import Icons from "../assets/icons/icons";

export default function InputBar({
    onChangeText,
    value,
    onPress,
}: {
    onChangeText: any;
    value: string;
    onPress: () => void;
}) {
    return (
        <View style={styles.container}>
            <TextInput
                style={styles.input}
                multiline
                placeholder="כתוב כאן..."
                onChangeText={onChangeText}
                value={value}
            />

            <TouchableOpacity onPress={onPress} style={styles.button}>
                {Icons.send}
            </TouchableOpacity>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flexDirection: "row",
        justifyContent: "center",
        width: "100%",
    },
    input: {
        borderColor: "#cccccc",
        borderWidth: 1,
        borderRadius: 50,
        flexDirection: "row",
        justifyContent: "center",
        textAlign: "right",
        color: "black",
        width: "95%",
        padding: 7,
    },
    button: {
        marginTop: 7,
        marginLeft: 3,
        width: "5%",
        alignItems: "center",
    },
});
