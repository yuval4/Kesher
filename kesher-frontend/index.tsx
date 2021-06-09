import React, { useEffect, useState } from "react";
import { StyleSheet, Text, View } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import Navigation from "./navigation";
import LoginScreen from "./screens/loginScreen";
import AsyncStorage from "@react-native-async-storage/async-storage";
import api from "./api";
import AppNavigator from "./navigation/appNavigator";
import { NavigationContainer } from "@react-navigation/native";
import MainDrawer from "./navigation/mainDrawer";

export default function Index({ navigation }: any) {
    // const isLogin = useSelector((state: any) => state.auth);
    const isLogin = false;
    const dispatch = useDispatch();
    console.log(isLogin);
    // ANCHOR get token from async storage. if doesnt exist, it takes the user to login screen
    // else, its get the user data from the server (with getMe) and store it in redux.
    const getData = async () => {
        try {
            const token = await AsyncStorage.getItem("token");
            if (token) {
                let getMeRespones = await api.login().getMe();
                console.log(getMeRespones.data);
                await dispatch({
                    type: "SET_USER",
                    data: {
                        name: {
                            first: getMeRespones.data.name.first,
                            last: getMeRespones.data.name.last,
                        },
                        role: getMeRespones.data.role,
                        children: getMeRespones.data.children,
                        schools: getMeRespones.data.schools,
                    },
                });
            }
        } catch (err) {
            console.log(err);
        }
    };

    useEffect(() => {
        getData();
    }, []);

    // return isLogin ? navigation.navigate("Root") : navigation.navigate("Login");
    // return <Navigation />;
    return (
        <NavigationContainer>
            {console.log(isLogin)}
            {!isLogin && <MainDrawer />}
            {isLogin && <LoginScreen />}
        </NavigationContainer>
    );
    // return isLogin ? (
    //     <SettingScreen />
    // ) : (
    //     <LoginScreen onPress={() => setIsLogin(true)} />
    // );
}
