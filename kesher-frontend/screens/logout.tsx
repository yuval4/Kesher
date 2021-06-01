import React from "react";
import { StyleSheet, Text, View } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default async function Logout({ navigation }: any) {
    // TODO navigate back to the login screen
    // navigation.navigate("Login");

    try {
        await AsyncStorage.removeItem("token");
    } catch (err) {
        alert(err);
    }
    //TODO delete async storage and redux and go to loginScreen
    return (
        <View>
            <Text></Text>
        </View>
    );
}
