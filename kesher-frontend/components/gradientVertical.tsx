import React from "react";
import { StyleSheet, Text, View, ScrollView } from "react-native";
import { LinearGradient } from "expo-linear-gradient";

export default function GradientVertical({ children, style }: any) {
    return (
        <View style={{ width: "100%" }}>
            <ScrollView style={[style, styles.container]}>
                {children}
            </ScrollView>
            <LinearGradient
                colors={["white", "transparent"]}
                style={styles.topGradient}
            />
            <LinearGradient
                colors={["white", "transparent"]}
                style={styles.bottomGradient}
            />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        // backgroundColor: "blue",
        // marginBottom: 100,
        // paddingBottom: 10,
        // height: "100%",
        // width: "100%",
    },
    topGradient: {
        position: "absolute",
        left: 0,
        right: 0,
        top: 0,
        height: "10%",
    },
    bottomGradient: {
        position: "absolute",
        left: 0,
        right: 0,
        bottom: 0,
        // bottom: "10%",
        transform: [{ rotate: "180deg" }],
        height: "13%",
    },
});
