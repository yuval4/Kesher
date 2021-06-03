import { DrawerActions } from "@react-navigation/routers";
import React from "react";
import { StyleSheet, Text, View } from "react-native";
import globalStyles from "../assets/globalStyles";

export default function PersonalReportCard({
    data,
}: {
    data: { date: Date; name: string; creator: string; details: number };
}) {
    console.log(data);

    return (
        <View style={styles.container}>
            <Text style={styles.title}>{data.name}</Text>
            <Text style={styles.details}>{data.details}</Text>

            <View style={styles.info}>
                <Text style={styles.author}>{data.creator}</Text>
                <Text style={styles.timestamp}>
                    {new Date(data.date).toLocaleDateString()}
                    {"  "}
                    {new Date(data.date).toLocaleTimeString().substring(0, 5)}
                </Text>
                {/* <Text style={styles.timestamp}>
                    {time.toLocaleDateString()} {time.getHours()}:
                    {time.getMinutes()}
                </Text> */}
                {/* {console.log(time.getTime)} */}
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        // width: '90%',
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
        paddingHorizontal: 11,
        paddingVertical: 7,
    },
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
    details: {
        fontFamily: globalStyles.font.regular,
        fontSize: 16,
        lineHeight: 18,
        alignItems: "center",
        textAlign: "right",
        letterSpacing: 0.1,
        color: globalStyles.color.text,
        marginBottom: 15,
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
        //marginRight: 10,
    },
    info: {
        flexDirection: "row-reverse",
    },
});
