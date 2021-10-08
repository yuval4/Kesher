import React, { useLayoutEffect, useState, useEffect } from "react";
import LoginScreen from "./screens/loginScreen";
import AsyncStorage from "@react-native-async-storage/async-storage";
import api from "./api";
import { NavigationContainer } from "@react-navigation/native";
import MainDrawer from "./navigation/mainDrawer";
import IndexStack from "./navigation/indexStack";
import { createImagesDirectory } from "./utils/utils";
import { useAppDispatch, useAppSelector } from "./app/hooks";
import {
    setUser,
    updateCurrentChild,
    updateCurrentSchool,
} from "./features/user/user-slice";

export default function Index({ navigation }: any) {
    const dispatch = useAppDispatch();
    const user = useAppSelector((state) => state.user);

    useEffect(() => {
        createImagesDirectory();
    }, []);

    // ANCHOR get token from async storage. if doesnt exist, it takes the user to login screen
    // else, its get the user data from the server (with getMe) and store it in redux.
    useLayoutEffect(() => {
        const getData = async () => {
            try {
                const isToken = await AsyncStorage.getItem("token");
                if (isToken) {
                    let getMeRespones = await api.login().getMe();
                    dispatch(
                        setUser({
                            name: getMeRespones.data.name,
                            role: getMeRespones.data.role,
                            children: getMeRespones.data.children,
                            schools: getMeRespones.data.schools,
                        })
                    );
                    if (getMeRespones.data.role === "Parent") {
                        dispatch(
                            updateCurrentChild({
                                currentChild: getMeRespones.data.children[0],
                            })
                        );
                    } else if (getMeRespones.data.role === "Teacher") {
                        dispatch(
                            updateCurrentSchool({
                                currentSchool: getMeRespones.data.schools[0],
                            })
                        );
                    }
                }
            } catch (err) {
                console.log(err);
            }
        };

        getData();
    }, []);

    return (
        <NavigationContainer>
            {/* {token && <MainDrawer onLogout={setToken} />} */}
            {user.role && <IndexStack />}
            {!user.role && <LoginScreen />}
        </NavigationContainer>
    );
}
