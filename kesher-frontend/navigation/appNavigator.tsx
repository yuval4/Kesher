import { NavigationContainer } from "@react-navigation/native";
import * as React from "react";
import MainDrawer from "./mainDrawer";
import LoginScreen from "../screens/loginScreen";
import { useSelector } from "react-redux";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default async function AppNavigator() {
    // ANCHOR checks if the user is logged in by getting their role.
    const token = await AsyncStorage.getItem("token");

    // const isLoggedIn = useSelector((state: any) => state.user);
    console.log(token);
    // const isLoggedIn = false;

    return (
        <NavigationContainer>
            {/* {isLoggedIn && <MainDrawer />}
            {!isLoggedIn && <LoginScreen />} */}
        </NavigationContainer>
    );
}
