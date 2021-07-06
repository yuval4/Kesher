import React, { useLayoutEffect, useState } from "react";
import { useDispatch } from "react-redux";
import LoginScreen from "./screens/loginScreen";
import AsyncStorage from "@react-native-async-storage/async-storage";
import api from "./api";
import { NavigationContainer } from "@react-navigation/native";
import MainDrawer from "./navigation/mainDrawer";
import IndexStack from "./navigation/indexStack";

export default function Index({ navigation }: any) {
    const dispatch = useDispatch();
    const [token, setToken] = useState<string | null>(null);

    // ANCHOR get token from async storage. if doesnt exist, it takes the user to login screen
    // else, its get the user data from the server (with getMe) and store it in redux.
    useLayoutEffect(() => {
        const getData = async () => {
            try {
                const isToken = await AsyncStorage.getItem("token");
                setToken(isToken);
                if (isToken) {
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

        getData();
    }, []);

    return (
        <NavigationContainer>
            {/* {token && <MainDrawer onLogout={setToken} />} */}
            {token && <IndexStack onLogout={setToken} />}
            {!token && <LoginScreen onLogin={setToken} />}
        </NavigationContainer>
    );
}
