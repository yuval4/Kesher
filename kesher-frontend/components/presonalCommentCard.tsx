import React from "react";
import { StyleSheet, Text, View } from "react-native";
import globalStyles from "../assets/globalStyles";

export default function PersonalCommentCard({ data }: any) {
    console.log(data.creator);
    return (
        <View
            style={[
                styles.container,
                data.creator.role !== "teacher"
                    ? { backgroundColor: globalStyles.color.messageboxPurple }
                    : { backgroundColor: globalStyles.color.lightPurple },
            ]}
        >
            <Text style={styles.details}>{data.message}</Text>

            <View style={styles.info}>
                <Text style={styles.author}>
                    {data.creator.name.first} {data.creator.name.last}
                </Text>
                <Text style={styles.timestamp}>
                    {new Date(data.date).toLocaleDateString()}
                    {"  "}
                    {new Date(data.date).toLocaleTimeString().substring(0, 5)}
                </Text>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        // width: "100%",
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
    details: {
        fontFamily: globalStyles.font.regular,
        fontSize: 16,
        lineHeight: 18,
        alignItems: "center",
        textAlign: "right",
        letterSpacing: 0.1,
        color: globalStyles.color.text,
        marginBottom: 7,
        paddingTop: 5,
    },
    timestamp: {
        fontFamily: globalStyles.font.regular,
        fontSize: 16,
        lineHeight: 18,
        textAlign: "right",
        letterSpacing: 0.1,
        color: globalStyles.color.text,
        opacity: 0.55,
        position: "absolute",
        right: 0,
    },
    author: {
        fontFamily: globalStyles.font.regular,
        fontSize: 16,
        lineHeight: 18,
        textAlign: "right",
        letterSpacing: 0.1,
        color: globalStyles.color.text,
        opacity: 0.55,
    },
    info: {
        flexDirection: "row-reverse",
    },
});
