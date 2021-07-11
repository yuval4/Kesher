import React from "react";
import { StyleSheet, Text, View } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function Logout(props: any) {
    const { onLogout } = props.route.params;

    // ANCHOR remove the token from the async storgae
    const logout = async () => {
        try {
            await AsyncStorage.removeItem("token");
            onLogout(null);
        } catch (err) {
            alert(err);
        }
    };

    return (
        <View>
            {logout()}
            <Text></Text>
        </View>
    );
}
