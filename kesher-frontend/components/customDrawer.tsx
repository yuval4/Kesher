import * as React from "react";
import {
    View,
    Text,
    Image,
    TouchableOpacity,
    Button,
    StyleSheet,
} from "react-native";
import {
    DrawerContentScrollView,
    DrawerItemList,
} from "@react-navigation/drawer";
import globalStyles from "../assets/globalStyles";

export default function CustomDrawer(props: any) {
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
    title: {
        fontFamily: globalStyles.font.semiBold,
        fontSize: 24,
        lineHeight: 24,
        letterSpacing: 0.1,
        color: "white",
        textAlign: "center",
        alignItems: "center",
    },
    logo: {
        width: 108,
        height: 43.53,
    },
    text: {
        fontFamily: globalStyles.font.semiBold,
        fontSize: 16,
        lineHeight: 24,
        letterSpacing: 0.1,
        color: "white",
        textAlign: "center",
        alignItems: "center",
    },
    unvisibleText: {
        opacity: 0,
        fontSize: 16,
    },
});
