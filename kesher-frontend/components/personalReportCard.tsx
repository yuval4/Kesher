import React from "react";
import { StyleSheet, Text, View } from "react-native";
import globalStyles from "../assets/globalStyles";

export default function PersonalReportCard({ children, info }: any) {
    return (
        <View style={styles.container}>
            {children}
            {/* <View style={styles.info}> */}
            {/* <Text style={styles.author}></Text> */}
            <Text style={styles.info}>
                {new Date(info.date).toLocaleDateString()}
            </Text>
            {/* </View> */}
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: globalStyles.color.lightPurple,
        borderWidth: 0.4,
        borderColor: globalStyles.color.purple,
        borderRadius: 16,
        shadowOffset: {
            width: 1,
            height: 2,
        },
        shadowOpacity: 0.15,
        shadowRadius: 3,
        elevation: 5,
        paddingHorizontal: 11,
        paddingVertical: 7,
    },
    info: {
        fontFamily: globalStyles.font.regular,
        fontSize: 16,
        lineHeight: 18,
        textAlign: "left",
        letterSpacing: 0.1,
        color: globalStyles.color.text,
        opacity: 0.55,
    },
});
