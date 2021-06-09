import { DrawerActions } from "@react-navigation/routers";
import React from "react";
import { StyleSheet, Text, View, FlatList } from "react-native";
import globalStyles from "../assets/globalStyles";

export default function PersonalReportCard({
    data,
}: {
    data: {
        date: Date;
        name: string;
        creator: string;
        details: String;
        subReports: any;
    };
}) {
    return (
        <View style={styles.container}>
            <FlatList
                // style={styles.list}
                data={data.subReports}
                keyExtractor={(item, index) => index.toString()}
                renderItem={(item) => (
                    <View>
                        <Text style={styles.title}>{item.item.name}</Text>
                        <Text style={styles.details}>{item.item.details}</Text>
                    </View>
                )}
            />

            <View style={styles.info}>
                <Text style={styles.author}>I need to add a name here</Text>
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
