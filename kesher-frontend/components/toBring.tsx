import React from "react";
import { useTranslation } from "react-i18next";
import { StyleSheet, Text, View } from "react-native";
import globalStyles from "../assets/globalStyles";
import Icons from "../assets/icons/icons";

export default function ToBring({ bring }: any) {
    const { t } = useTranslation();

    return (
        <View>
            <Text style={styles.title}>{t("Please Bring")}</Text>
            <View style={styles.toBring}>
                {bring.map((item: any, index: any) => {
                    return (
                        <View style={styles.toBring} key={index}>
                            <View style={styles.vIcon}>{Icons.toBring}</View>
                            <Text style={styles.text}>{t(item.category)}</Text>
                        </View>
                    );
                })}
            </View>
        </View>
    );
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
    },
    toBring: {
        flexDirection: "row-reverse",
        alignItems: "center",
        marginBottom: 5,
    },
    vIcon: {
        margin: 3.5,
    },
});
