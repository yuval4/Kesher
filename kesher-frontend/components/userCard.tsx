import React from "react";
import { Image, StyleSheet, Text, View } from "react-native";
import globalStyles from "../assets/globalStyles";

export default function UserCard({
    name,
    image,
}: {
    name: { first: string; last: string };
    image?: string;
}) {
    return (
        <View style={styles.container}>
            <Image
                style={styles.image}
                source={
                    image
                        ? { uri: image }
                        : require("../assets/images/user.png")
                }
            />
            <Text style={styles.name}>
                {name.first} {name.last}
            </Text>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: globalStyles.color.lightPurple + "7F",
        height: 50,
        alignItems: "center",
        flexDirection: "row-reverse",
        marginBottom: 8,
    },
    name: {
        color: globalStyles.color.text,
        fontSize: 14,
        fontFamily: globalStyles.font.semiBold,
        alignSelf: "center",
    },
    image: {
        width: 40,
        height: 40,
        borderRadius: 25,
        marginLeft: 20,
        marginRight: 10,
    },
});
