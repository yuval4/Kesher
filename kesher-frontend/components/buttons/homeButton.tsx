import React from "react";
import { StyleSheet, Text, View, TouchableOpacity } from "react-native";
import globalStyles from "../../assets/globalStyles";
import HomeIcons from "../../assets/icons/homeIcons";

export default function HomeButton({
    text,
    onPress,
    icon,
}: {
    text: string;
    onPress: () => void;
    icon?: string;
}) {
    return (
        <View>
            <TouchableOpacity style={styles.container} onPress={onPress}>
                <View style={styles.inside}>
                    <Text style={styles.text}>{text}</Text>
                    <View style={styles.icon}>
                        {icon == "corona" ? HomeIcons.covid : null}
                        {icon == "report" ? HomeIcons.report : null}
                        {icon == "calender" ? HomeIcons.calender : null}
                    </View>
                    {/* <MaterialIcons style={styles.icon} name={icon} size={32} color="#804ED9" /> */}
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
        shadowOpacity: 0.15,
        shadowRadius: 5,
        elevation: 5,
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
    inside: {
        alignItems: "center",
        justifyContent: "center",
    },
    icon: {
        position: "absolute",
        right: 40,
    },
});
