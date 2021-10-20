import React from "react";
import { StyleSheet, Text, View, Image } from "react-native";
import { useAppSelector } from "../app/hooks";

export default function ChildTitle() {
    const child = useAppSelector((state) => state.report);

    return (
        <View style={styles.container}>
            <Image style={styles.image} source={{ uri: child.profilePic }} />
            <Text style={styles.name}>
                {child.name?.first} {child.name?.last}
            </Text>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flexDirection: "row-reverse",
        alignItems: "center",
        marginTop: 20,
        marginRight: "15%",
        alignSelf: "center",
    },
    name: {
        fontFamily: "Assistant-Bold",
        fontSize: 16,
        lineHeight: 24,
        textAlign: "right",
        letterSpacing: 0.1,
        color: "#804ED9",
        marginLeft: 5,
    },
    image: {
        borderRadius: 50,
        width: 68,
        height: 68,
        alignSelf: "center",
        marginLeft: 15,
    },
});
