import React from "react";
import { useTranslation } from "react-i18next";
import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import globalStyles from "../assets/globalStyles";

type image = {
    cancelled: boolean;
    height: number;
    type: string;
    uri: string;
    width: number;
} | null;

export default function ChildPhotoBox({
    image,
    onPress,
}: {
    image: image;
    onPress: () => void;
}) {
    const { t } = useTranslation();

    return (
        <View style={styles.childBox}>
            <TouchableOpacity style={styles.box} onPress={onPress}>
                <Image
                    source={
                        image
                            ? { uri: image.uri }
                            : require("../assets/images/user.png")
                    }
                    style={styles.image}
                />

                <Text style={styles.childName}>{t("Add Photo")}</Text>
            </TouchableOpacity>
        </View>
    );
}

const styles = StyleSheet.create({
    childBox: {
        alignSelf: "center",
        height: 96,
        width: "90%",
        borderRadius: 12,
        shadowOffset: {
            width: 0,
            height: 0,
        },
        shadowOpacity: 0.2,
        shadowRadius: 20,
        elevation: 4,
        marginTop: 60,
        backgroundColor: "white",
    },
    box: {
        top: -40,
    },
    image: {
        borderRadius: 50,
        width: 80,
        height: 80,
        alignSelf: "center",
    },
    childName: {
        fontFamily: globalStyles.font.semiBold,
        fontSize: 16,
        lineHeight: 24,
        letterSpacing: 0.1,
        textAlign: "center",
        alignItems: "center",
        display: "flex",
    },
});
