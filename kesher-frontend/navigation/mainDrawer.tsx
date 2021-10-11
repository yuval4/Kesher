import React, { useEffect, useState } from "react";
import HomeScreen from "../screens/parent/homeScreen";
import { createDrawerNavigator } from "@react-navigation/drawer";
import globalStyles from "../assets/globalStyles";
import DrawerIcons from "../assets/icons/drawerIcons";
import CoronaScreen from "../screens/parent/coronaScreen";
import SettingScreen from "../screens/settingScreen";
import DailyReportScreen from "../screens/parent/dailyReportScreen";
import ElwynScreen from "../screens/elwynScreen";
import TopTabs from "./topTabs";
import Header from "../components/header";
import EventsBoardScreen from "../screens/eventsBoardScreen";
import AddChildScreen from "../screens/teacher/addChildScreen";
import ErrorScreen from "../screens/ErrorScreen";
import CustomDrawer from "../components/customDrawer";
import { useAppSelector } from "../app/hooks";
import SchoolsListScreen from "../screens/admin/schoolsListScreen";
import AddNewSchoolScreen from "../screens/admin/addNewSchoolScreen";

const Drawer = createDrawerNavigator();
export default function MainDrawer(props: any) {
    const role = useAppSelector((state) => state.user.role);

    return (
        <Drawer.Navigator
            drawerContent={(props) => <CustomDrawer {...props} />}
            drawerStyle={{
                borderTopRightRadius: 40,
                borderBottomRightRadius: 40,
                width: "80%",
            }}
            screenOptions={{
                headerShown: true,
                header: () => <Header />,
            }}
            initialRouteName={"Home"}
            drawerContentOptions={{
                style: {
                    marginTop: -30,
                },
                labelStyle: {
                    fontFamily: globalStyles.font.semiBold,
                    fontSize: 20,
                    lineHeight: 24,
                    alignItems: "center",
                    textAlign: "right",
                    color: "#999999",
                },
                itemStyle: {
                    borderBottomWidth: 0.6,
                    borderBottomColor: "#C4C4C4",
                },
                activeTintColor: "white",
            }}
            sceneContainerStyle={{
                backgroundColor: globalStyles.backgroundColor,
            }}
        >
            {role === "Admin" && (
                <Drawer.Screen
                    name="AdminHome"
                    component={SchoolsListScreen}
                    options={{
                        title: "דף הבית",
                        drawerIcon: () => DrawerIcons.home,
                    }}
                />
            )}

            {role === "Parent" && (
                <Drawer.Screen
                    name="ParentHome"
                    component={HomeScreen}
                    options={{
                        title: "דף הבית",
                        drawerIcon: () => DrawerIcons.home,
                    }}
                />
            )}

            {role === "Teacher" && (
                <Drawer.Screen
                    name="ParentHome"
                    component={TopTabs}
                    options={{
                        title: "דף הבית",
                        drawerIcon: () => DrawerIcons.home,
                    }}
                />
            )}

            {role === "Parent" && (
                <Drawer.Screen
                    name="Corona"
                    component={CoronaScreen}
                    options={{
                        title: "הצהרת קורונה",
                        drawerIcon: () => DrawerIcons.corona,
                        header: () => <Header title="הצהרת קורונה" />,
                    }}
                />
            )}

            {role === "Teacher" && (
                <Drawer.Screen
                    name="AddChild"
                    component={AddChildScreen}
                    options={{
                        title: "הוספת ילד",
                        drawerIcon: () => DrawerIcons.plus,
                        header: () => <Header title="הוספת ילד" />,
                    }}
                />
            )}

            {role === "Admin" && (
                <Drawer.Screen
                    name="AddSchool"
                    component={AddNewSchoolScreen}
                    options={{
                        title: "הוספת מעון",
                        drawerIcon: () => DrawerIcons.plus,
                        header: () => <Header title="הוספת מעון" />,
                    }}
                />
            )}

            {role === "Parent" && (
                <Drawer.Screen
                    name="DailyReport"
                    component={DailyReportScreen}
                    options={{
                        title: "דיווח יומי",
                        drawerIcon: () => DrawerIcons.checklist,
                        header: () => <Header title="דיווח יומי" />,
                    }}
                />
            )}

            {(role === "Teacher" || role === "Parent") && (
                <Drawer.Screen
                    name="EventsBoard"
                    component={EventsBoardScreen}
                    options={{
                        title: "לוח מודעות",
                        drawerIcon: () => DrawerIcons.calender,
                        header: () => <Header title="לוח מודעות" />,
                    }}
                />
            )}

            <Drawer.Screen
                name="Settings"
                component={SettingScreen}
                options={{
                    title: "הגדרות",
                    drawerIcon: () => DrawerIcons.settings,
                    header: () => <Header title="הגדרות" />,
                }}
            />

            <Drawer.Screen
                name="Elwyn"
                component={ElwynScreen}
                options={{
                    title: "לאתר אלווין ",
                    drawerIcon: () => DrawerIcons.elwyn,
                    header: () => <Header title="לאתר אלווין" />,
                }}
            />
        </Drawer.Navigator>
    );
}
