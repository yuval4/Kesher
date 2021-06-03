import {
    NavigationContainer,
    DefaultTheme,
    DarkTheme,
} from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import * as React from "react";
import MainDrawer from "./mainDrawer";
import LinkingConfiguration from "./LinkingConfiguration";
import LoginScreen from "../screens/loginScreen";
import LoginNavigation from "./loginStack";
import Index from "../index";
import { connect } from "react-redux";
import AsyncStorage from "@react-native-async-storage/async-storage";

const IndexStack = createStackNavigator();

function Navigation(props: any) {
    const token = AsyncStorage.getItem("token");
    return (
        <NavigationContainer>
            <Stack.Navigator
                screenOptions={{ headerShown: false, gestureEnabled: false }}
            >
                {/* {token ? (
                    <IndexStack.Screen name="Root" component={RootNavigator} />
                ) : null} */}

                {/* <IndexStack.Screen name="Login" component={LoginScreen} /> */}

                <IndexStack.Screen name="Root" component={RootNavigator} />
                {/* <IndexStack.Screen name="Login" component={LoginScreen} /> */}

                {/* <IndexStack.Screen name="Login" component={LoginScreen} /> */}
            </Stack.Navigator>
        </NavigationContainer>
    );
}

// A root stack navigator is often used for displaying modals on top of all other content
// Read more here: https://reactnavigation.org/docs/modal
const Stack = createStackNavigator();

function RootNavigator() {
    return (
        <Stack.Navigator screenOptions={{ headerShown: false }}>
            {/* <Stack.Screen name="Attendance" component={AttendanceScreen} /> */}

            <Stack.Screen name="Root" component={MainDrawer} />
            {/* <Stack.Screen name="ReportStack" component={ReportStack} /> */}
            {/* <Stack.Screen name="Login" component={LoginScreen} /> */}
        </Stack.Navigator>
    );
}

const mapStateToProps = (state: any) => {
    const { user } = state;
    return { user };
};

export default connect(mapStateToProps)(Navigation);
