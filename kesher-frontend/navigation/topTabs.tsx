import React from "react";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import AttendanceScreen from "../screens/teacher/AttendanceScreen";
import globalStyles from "../assets/globalStyles";
import ChildrenListReportScreen from "../screens/teacher/childrenListReportScreen";
import { useTranslation } from "react-i18next";

const TopTab = createMaterialTopTabNavigator();

export default function TopTabs() {
    const { t } = useTranslation();

    return (
        <TopTab.Navigator
            tabBarOptions={{
                activeTintColor: "white",
                inactiveTintColor: globalStyles.color.lightPurple,
                labelStyle: {
                    fontFamily: globalStyles.font.semiBold,
                    fontSize: 22,
                    marginTop: -11,
                },
                indicatorStyle: { backgroundColor: globalStyles.color.purple },
                style: {
                    backgroundColor: globalStyles.color.mediumPurplel,
                    height: 35,
                },
            }}
            sceneContainerStyle={{
                backgroundColor: globalStyles.backgroundColor,
            }}
            initialRouteName={t("Daily Report")}
        >
            {/* <TopTab.Screen name="דיווח יומי" component={ReportStack} /> */}
            <TopTab.Screen
                name={t("Daily Report")}
                component={ChildrenListReportScreen}
            />
            <TopTab.Screen
                name={t("Attendance Update")}
                component={AttendanceScreen}
            />
        </TopTab.Navigator>
    );
}
