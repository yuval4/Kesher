import React from "react";
import { StyleSheet, Text, View, TouchableOpacity, Image } from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import globalStyles from "../../assets/globalStyles";

export default function SubCategoryButton({
    text,
    picked,
    onPress,
}: {
    text: string;
    picked: boolean;
    onPress: () => void;
}) {
    return (
        <View>
            <TouchableOpacity
                style={picked ? styles.pickedContainer : styles.container}
                onPress={onPress}
            >
                <View style={styles.inside}>
                    <Text style={picked ? styles.pickedText : styles.text}>
                        {text}
                    </Text>
                </View>
            </TouchableOpacity>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        width: 300,
        height: 60,
        backgroundColor: globalStyles.color.lightPurple,
        borderRadius: 20,
        shadowOffset: {
            width: 3,
            height: 3,
        },
        marginHorizontal: 4,
        shadowOpacity: 0.15,
        shadowRadius: 5,
        elevation: 4,
        marginBottom: 15,
        justifyContent: "center",
    },
    pickedContainer: {
        width: 300,
        height: 60,
        backgroundColor: globalStyles.color.purple,
        borderRadius: 20,
        shadowColor: "#000",
        shadowOffset: {
            width: 3,
            height: 3,
        },
        shadowOpacity: 0.15,
        shadowRadius: 5,
        elevation: 4,
        marginBottom: 15,
        justifyContent: "center",
    },
    text: {
        color: globalStyles.color.purple,
        fontFamily: globalStyles.font.bold,
        fontSize: 20,
        lineHeight: 24,
        letterSpacing: 0.1,
    },
    pickedText: {
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
});
