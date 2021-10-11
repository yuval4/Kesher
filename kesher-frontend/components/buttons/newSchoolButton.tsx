import React from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import globalStyles from "../../assets/globalStyles";
import { AntDesign } from "@expo/vector-icons";

export default function NewSchoolButton({
    text,
    onPress,
}: {
    text: string;
    onPress: () => void;
}) {
    return (
        <View>
            <TouchableOpacity style={styles.container} onPress={onPress}>
                <View style={styles.inside}>
                    <Text style={styles.text}>{text}</Text>
                    <View style={styles.icon}>
                        <AntDesign name="pluscircleo" size={24} color="white" />
                    </View>
                </View>
            </TouchableOpacity>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        width: 300,
        height: 60,
        backgroundColor: globalStyles.color.purple,
        borderRadius: 20,
        shadowOffset: {
            width: 3,
            height: 3,
        },
        shadowOpacity: 0.15,
        shadowRadius: 5,
        elevation: 5,
        marginBottom: 15,
        justifyContent: "center",
    },
    text: {
        color: "white",
        fontFamily: globalStyles.font.bold,
        fontSize: 20,
        lineHeight: 24,
        letterSpacing: 0.1,
    },
    inside: {
        alignItems: "center",
        justifyContent: "center",
    },
    icon: {
        position: "absolute",
        right: 40,
    },
});
