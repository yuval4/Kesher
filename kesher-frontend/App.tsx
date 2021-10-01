import React, { useState } from "react";
import AppLoading from "expo-app-loading";
import * as Font from "expo-font";
import { Provider } from "react-redux";
import Index from "./index";
import { store } from "./app/store";

const getFonts = () =>
    Font.loadAsync({
        "Assistant-SemiBold": require("./assets/fonts/Assistant-SemiBold.ttf"),
        "Assistant-Bold": require("./assets/fonts/Assistant-Bold.ttf"),
        "Assistant-Regular": require("./assets/fonts/Assistant-Regular.ttf"),
    });

export default function App() {
    const [fontsLoaded, setFontsLoaded] = useState(false);

    if (fontsLoaded) {
        return (
            <Provider store={store}>
                {/* <NavigationContainer> */}
                {/* <MainDrawer /> */}
                {/* <TryAndDelete /> */}
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
