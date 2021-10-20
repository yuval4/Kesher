import React from "react";
import { StyleSheet, Text, View } from "react-native";
import globalStyles from "../assets/globalStyles";
import Icons from "../assets/icons/icons";

export default function ToBring({ bring }: any) {
    return (
        <View>
            <Text style={styles.title}>בבקשה לשלוח</Text>
            <View style={styles.toBring}>
                {bring.map((item: any, index: any) => {
                    return (
                        <View style={styles.toBring} key={index}>
                            <View style={styles.vIcon}>{Icons.toBring}</View>
                            <Text style={styles.text}>{item.category}</Text>
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
