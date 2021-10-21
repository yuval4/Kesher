import React from "react";
import { StyleSheet, Text, View, TouchableOpacity } from "react-native";
import * as WebBrowser from "expo-web-browser";
import globalStyles from "../assets/globalStyles";
import { saveImage } from "../utils/utils";
import * as AddCalendarEvent from "react-native-add-calendar-event";
import { useTranslation } from "react-i18next";

export default function ElwynScreen() {
    const { t } = useTranslation();
    const handlePress = () => {
        WebBrowser.openBrowserAsync("https://israelelwyn.org.il/he/");
    };
    const handleSaveImage = async () => {
        await saveImage(
            "https://media.istockphoto.com/photos/colored-powder-explosion-abstract-closeup-dust-on-backdrop-colorful-picture-id1072093690?k=20&m=1072093690&s=612x612&w=0&h=Ns3WeEm1VrIHhZOmhiGY_fYKvIlbJrVADLqfxyPQVPM=",
            "name.png"
        );
    };

    return (
        <View style={styles.container}>
            <TouchableOpacity onPress={handlePress}>
                <Text style={styles.button}>{t("Press Here")}</Text>
            </TouchableOpacity>
            <Text style={styles.text}>{t("For Elwyn's Website")}</Text>
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
