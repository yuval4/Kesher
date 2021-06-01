import { StatusBar } from "expo-status-bar";
import React, { useEffect, useState } from "react";
import AppLoading from "expo-app-loading";
import Navigation from "./navigation";
import * as Font from "expo-font";
import AsyncStorage from "@react-native-async-storage/async-storage";

import { createStore } from "redux";
import { Provider, useDispatch } from "react-redux";
import Reducer from "./reducer";
import LoginScreen from "./screens/loginScreen";
import api from "./api";
import { NavigationContainer } from "@react-navigation/native";
import MainDrawer from "./navigation/mainDrawer";
import RootNavigator from "./navigation/index";
import LoginNavigation from "./navigation/loginStack";
import Index from "./index";

const store = createStore(Reducer);

const getFonts = () =>
    Font.loadAsync({
        "Assistant-SemiBold": require("./assets/fonts/Assistant-SemiBold.ttf"),
        "Assistant-Bold": require("./assets/fonts/Assistant-Bold.ttf"),
        "Assistant-Regular": require("./assets/fonts/Assistant-Regular.ttf"),
    });

export default function App() {
    const [fontsLoaded, setFontsLoaded] = useState(false);
    const [isLogin, setIsLogin] = useState(false);
    // const dispatch = useDispatch();

    // const getData = async () => {
    //     try {
    //         const token = await AsyncStorage.getItem("token");
    //         if (token) {
    //             setIsLogin(true);
    //             api.login().getMe(token);
    //         } else {
    //             setIsLogin(false);
    //         }
    //     } catch (err) {
    //         console.log(err);
    //     }
    // };

    // useEffect(() => {
    //     // TODO get data from server insted of those values
    //     getData();

    //     // dispatch({
    //     //   type: "SET_USER",
    //     //   data: {
    //     //       name: {
    //     //           first: getMeRespones.data.name.first,
    //     //           last: getMeRespones.data.name.last,
    //     //       },
    //     //       role: getMeRespones.data.role,
    //     //       children: getMeRespones.data.children,
    //     //   },
    //     // });
    // }, []);

    if (fontsLoaded) {
        return (
            <Provider store={store}>
                {/* <NavigationContainer> */}
                {/* <MainDrawer /> */}
                <Index />
                {/* {isLogin ? <Navigation /> : <LoginScreen />} */}
                {/* <LoginScreen /> */}
                {/* <Navigation /> */}
                {/* </NavigationContainer> */}
            </Provider>
        );
    } else {
        return (
            <AppLoading
                startAsync={getFonts}
                onFinish={() => setFontsLoaded(true)}
                onError={() => console.error("Error loading assets")}
            />
        );
    }
}
