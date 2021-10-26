import * as React from "react";
import { View, Text, Image, TouchableOpacity, StyleSheet } from "react-native";
import {
    DrawerContentScrollView,
    DrawerItemList,
} from "@react-navigation/drawer";
import globalStyles from "../assets/globalStyles";
import { useAppDispatch, useAppSelector } from "../app/hooks";
import { resetUser } from "../features/user/user-slice";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useTranslation } from "react-i18next";
import SchoolSelector from "./schoolSelector";

export default function CustomDrawer(props: any) {
    const { t } = useTranslation();
    const role = useAppSelector((state) => state.user.role);
    const dispatch = useAppDispatch();

    const handleLogout = async () => {
        await AsyncStorage.removeItem("token");
        props.navigation.closeDrawer();
        dispatch(resetUser());
    };

    return (
        <View style={{ flex: 1 }}>
            <View style={styles.container}>
                <Image
                    style={styles.logo}
                    source={require("../assets/images/header_logo.png")}
                />
            </View>
            <DrawerContentScrollView scrollEnabled={false} {...props}>
                <DrawerItemList {...props} />
                {role === "Teacher" && <SchoolSelector />}

                <TouchableOpacity
                    style={styles.itemContainer}
                    onPress={handleLogout}
                >
                    <Text style={styles.item}>{t("Logout")}</Text>
                </TouchableOpacity>
            </DrawerContentScrollView>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: globalStyles.color.purple,
        height: 90,
        justifyContent: "space-between",
        paddingHorizontal: 20,
        alignItems: "center",
        flexDirection: "row",
        paddingTop: 30,
    },
    logo: {
        width: 108,
        height: 43.53,
    },
    item: {
        fontFamily: globalStyles.font.semiBold,
        fontSize: 20,
        lineHeight: 24,
        alignItems: "center",
        textAlign: "right",
        color: "#999999",
    },
    itemContainer: {
        paddingHorizontal: 50,
        marginVertical: "70%",
    },
});
