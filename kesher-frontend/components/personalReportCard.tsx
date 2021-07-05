import React, { useEffect, useState } from "react";
import { StyleSheet, Text, View, FlatList } from "react-native";
import globalStyles from "../assets/globalStyles";
import Icons from "../assets/icons/icons";

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
    const [toBrings, setToBrings] = useState();
    const [subReports, setSubReports] = useState();

    useEffect(() => {
        setToBrings(
            data.subReports.filter(
                (item: any) => item.category === "בבקשה לשלוח"
            )
        );
        setSubReports(
            data.subReports.filter(
                (item: any) => item.category != "בבקשה לשלוח"
            )
        );
    }, [data]);

    return (
        <View style={styles.container}>
            <FlatList
                data={subReports}
                keyExtractor={(item, index) => index.toString()}
                renderItem={({ item }) => (
                    <View>
                        <Text style={styles.title}>{item.name}</Text>
                        <Text style={styles.details}>{item.details}</Text>
                    </View>
                )}
            />

            <Text style={styles.title}>בבקשה לשלוח</Text>
            <FlatList
                data={toBrings}
                horizontal={true}
                keyExtractor={(item, index) => index.toString()}
                scrollEnabled={false}
                renderItem={({ item }) => (
                    <View style={styles.toBring}>
                        <View style={styles.vIcon}>{Icons.toBring}</View>

                        <Text style={styles.details}>{item.name}</Text>
                    </View>
                )}
            />

            <View style={styles.info}>
                <Text style={styles.author}></Text>
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
    toBring: {
        flexDirection: "row-reverse",
        alignItems: "center",
    },
    vIcon: {
        margin: 3.5,
        marginBottom: 15,
    },
});
