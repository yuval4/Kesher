import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import {
    StyleSheet,
    View,
    TouchableOpacity,
    TextInput,
    Text,
} from "react-native";
import Icons from "../assets/icons/icons";
import UploadImage from "./buttons/uploadImage";

export default function InputBar({
    onChangeText,
    value,
    onSendTextPress,
    currentComment,
}: {
    onChangeText: any;
    value: string;
    onSendTextPress: () => void;
    currentComment: string;
}) {
    const { t } = useTranslation();

    return (
        <View style={styles.container}>
            <UploadImage currentComment={currentComment} />

            <View style={styles.inputView}>
                <TextInput
                    style={styles.input}
                    multiline
                    placeholder={t("Type A message")}
                    onChangeText={onChangeText}
                    value={value}
                />
            </View>

            <TouchableOpacity onPress={onSendTextPress} style={styles.button}>
                {Icons.send}
            </TouchableOpacity>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center",
        width: "100%",
        backgroundColor: "white",
    },
    input: {
        borderColor: "#cccccc",
        borderWidth: 1,
        borderRadius: 50,
        flexDirection: "row",
        justifyContent: "center",
        textAlign: "right",
        color: "black",
        paddingHorizontal: 7,
        paddingVertical: 4,
    },
    inputView: {
        width: "80%",
        padding: 8,
    },
    button: {
        marginTop: 7,
        marginLeft: 3,
        width: "5%",
        alignItems: "center",
    },
});
