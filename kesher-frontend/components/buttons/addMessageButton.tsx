import React from "react";
import { StyleSheet, TouchableOpacity, View } from "react-native";
import Icons from "../../assets/icons/icons";

export default function AddMessageButton({ onPress }: { onPress: () => void }) {
    return (
        <View>
            <TouchableOpacity style={styles.addmsg} onPress={onPress}>
                {Icons.messege}
            </TouchableOpacity>
        </View>
    );
}

const styles = StyleSheet.create({
    addmsg: {
        margin: 8,
        alignSelf: "flex-end",
    },
});
