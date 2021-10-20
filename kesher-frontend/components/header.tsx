import React from "react";
import { StyleSheet, Text, View, Image, TouchableOpacity } from "react-native";
import globalStyles from "../assets/globalStyles";
import { useNavigation } from "@react-navigation/native";
import Icons from "../assets/icons/icons";
import { useTranslation } from "react-i18next";

export default function Header({ title }: { title?: string }) {
    const { t } = useTranslation();
    const navigation = useNavigation();

    return (
        <View style={styles.container}>
            {navigation.hasOwnProperty("toggleDrawer") ? (
                <TouchableOpacity onPress={() => navigation.toggleDrawer()}>
                    {Icons.drawer}
                </TouchableOpacity>
            ) : (
                <View style={{ opacity: 0 }}>{Icons.drawer}</View>
            )}

            {title ? (
                <Text style={styles.title}>{title}</Text>
            ) : (
                <Image
                    style={styles.logo}
                    source={require("../assets/images/header_logo.png")}
                />
            )}

            {navigation.canGoBack() ? (
                <TouchableOpacity onPress={() => navigation.goBack()}>
                    <Text style={styles.text}>{t("back")}</Text>
                </TouchableOpacity>
            ) : (
                <Text style={styles.unvisibleText}>{t("back")}</Text>
            )}
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: globalStyles.color.purple,
        height: 90,
        justifyContent: "space-between",
        paddingHorizontal: 20,
        alignItems: "center",
        flexDirection: "row",
        paddingTop: 30,
    },
    title: {
        fontFamily: globalStyles.font.semiBold,
        fontSize: 24,
        lineHeight: 24,
        letterSpacing: 0.1,
        color: "white",
        textAlign: "center",
        alignItems: "center",
    },
    logo: {
        width: 108,
        height: 43.53,
    },
    text: {
        fontFamily: globalStyles.font.semiBold,
        fontSize: 16,
        lineHeight: 24,
        letterSpacing: 0.1,
        color: "white",
        textAlign: "center",
        alignItems: "center",
    },
    unvisibleText: {
        opacity: 0,
        fontSize: 16,
    },
});
