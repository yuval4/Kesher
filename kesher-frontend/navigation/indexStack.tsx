import React, { useEffect } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import ReportSubCategoryScreen from "../screens/teacher/reportSubCategoryScreen";
import StartReportScreen from "../screens/teacher/startReportScreen";
import CompleteReportScreen from "../screens/teacher/completeReportScreen";
import ChildrenListReportScreen from "../screens/teacher/childrenListReportScreen";
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
