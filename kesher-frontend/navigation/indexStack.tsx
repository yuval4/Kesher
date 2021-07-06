import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import Header from "../components/header";
import globalStyles from "../assets/globalStyles";
import ReportStack from "./reportStack";
import mainDrawer from "./mainDrawer";

const Stack = createStackNavigator();
export default function IndexStack(props: any) {
    return (
        <Stack.Navigator
            screenOptions={{
                cardStyle: { backgroundColor: globalStyles.backgroundColor },
                headerShown: true,
                header: () => <Header />,
            }}
        >
            <Stack.Screen
                name="Drawer"
                component={mainDrawer}
                options={{ headerShown: false }}
            />
            <Stack.Screen name="ReportStack" component={ReportStack} />
        </Stack.Navigator>
    );
}
