import React from "react";
import { StyleSheet, Text, View, TouchableOpacity } from "react-native";
import * as WebBrowser from "expo-web-browser";
import globalStyles from "../assets/globalStyles";
import InputBar from "../components/inputBar";
import UploadImage from "../components/buttons/uploadImage";

export default function ElwynScreen() {
    const handlePress = () => {
        WebBrowser.openBrowserAsync("https://israelelwyn.org.il/he/");
    };

    return (
        <View style={styles.container}>
            <TouchableOpacity onPress={handlePress}>
                <Text style={styles.button}>לחצו כאן</Text>
            </TouchableOpacity>
            <Text style={styles.text}>למעבר לאתר אלווין</Text>

            <UploadImage />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        alignItems: "center",
        justifyContent: "center",
    },
    button: {
        fontFamily: globalStyles.font.bold,
        fontSize: 32,
        color: globalStyles.color.purple,
    },
    text: {
        fontFamily: globalStyles.font.bold,
        fontSize: 32,
    },
});
