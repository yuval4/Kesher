import React from "react";
import { useTranslation } from "react-i18next";
import { StyleSheet, Text, View } from "react-native";
import globalStyles from "../assets/globalStyles";

export default function CategoryReport({ report }: any) {
    const { t } = useTranslation();

    return report.map((item: any, index: number) => (
        <View key={index}>
            <Text style={styles.title}>{t(item.category)}</Text>
            <Text style={styles.text}>{item.details}</Text>
        </View>
    ));
}

const styles = StyleSheet.create({
    title: {
        fontFamily: globalStyles.font.semiBold,
        fontSize: 16,
        lineHeight: 18,
        alignItems: "center",
        textAlign: "right",
        letterSpacing: 0.1,
        color: globalStyles.color.purple,
        marginBottom: 3,
    },
    text: {
        fontFamily: globalStyles.font.regular,
        fontSize: 16,
        lineHeight: 18,
        alignItems: "center",
        textAlign: "right",
        letterSpacing: 0.1,
        color: globalStyles.color.text,
        marginBottom: 15,
    },
});
