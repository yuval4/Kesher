import React, { useEffect } from "react";
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
import { connect } from "react-redux";
import Logout from "../screens/logout";
import ErrorScreen from "../screens/ErrorScreen";
import CustomDrawer from "../components/customDrawer";

const Drawer = createDrawerNavigator();
function MainDrawer(props: any) {
    const [role, setRole] = React.useState("");

    useEffect(() => {
        setRole(props.user.role);
    }, [props.user]);

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

                // swipeEnabled: false,
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
                backgroundColor: "white",
            }}
        >
            <Drawer.Screen
                name="Home"
                component={
                    role === "staff"
                        ? TopTabs
                        : role === "parent"
                        ? HomeScreen
                        : ErrorScreen
                }
                options={{
                    title: "דף הבית",
                    drawerIcon: () => DrawerIcons.home,
                }}
            />

            {role === "parent" ? (
                <Drawer.Screen
                    name="Corona"
                    component={CoronaScreen}
                    options={{
                        title: "הצהרת קורונה",
                        drawerIcon: () => DrawerIcons.corona,
                        header: () => <Header title="הצהרת קורונה" />,
                    }}
                />
            ) : null}

            {role === "staff" ? (
                <Drawer.Screen
                    name="AddChild"
                    component={AddChildScreen}
                    options={{
                        title: "הוספת ילד",
                        drawerIcon: () => DrawerIcons.plus,
                        header: () => <Header title="הוספת ילד" />,
                    }}
                />
            ) : null}

            {role === "parent" ? (
                <Drawer.Screen
                    name="DailyReport"
                    component={DailyReportScreen}
                    options={{
                        title: "דיווח יומי",
                        drawerIcon: () => DrawerIcons.checklist,
                        header: () => <Header title="דיווח יומי" />,
                    }}
                />
            ) : null}

            {/* //! eventbord should be here */}
            <Drawer.Screen
                name="EventsBoard"
                component={EventsBoardScreen}
                options={{
                    title: "לוח מודעות",
                    drawerIcon: () => DrawerIcons.calender,
                    header: () => <Header title="לוח מודעות" />,
                }}
            />

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

            <Drawer.Screen
                name="Logout"
                component={Logout}
                initialParams={{ onLogout: props.onLogout }}
                options={{
                    title: "התנתק",
                    // drawerIcon: () => DrawerIcons.elwyn,
                }}
            />
        </Drawer.Navigator>
    );
}

const mapStateToProps = (state: any) => {
    const { user } = state;
    return { user };
};

export default connect(mapStateToProps)(MainDrawer);
