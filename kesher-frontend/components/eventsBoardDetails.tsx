import React from "react";
import { StyleSheet, Text, View } from "react-native";
import globalStyles from "../assets/globalStyles";
import Svg, { G, Path, Defs } from "react-native-svg";

export default function EventsBoardDetails({ text }: any) {
    return (
        <View style={styles.container}>
            <Text style={styles.text}>{text}</Text>
            {/* <Svg width={339} height={91} viewBox="0 0 339 91" fill="none">
                <Path
                    d="M302.116 14.581c10.132 0 18.346 7.796 18.346 17.412V61.17c-.006 1.492-.006 1.82-.006 1.82s-.185 5.15.209 7.59c.197 1.226.958 2.232 1.666 2.93.362.357.105 1.011-.412.936-1.541-.224-3.84-.79-5.848-2.217-1.073-.763-1.029-1.966-.467-3.256-3.352 3.448-8.154 5.608-13.488 5.608H32.846c-10.132 0-18.346-7.795-18.346-17.41V31.992c0-9.616 8.214-17.412 18.346-17.412h269.27z"
                    stroke="#804ED9"
                    strokeWidth={0.4}
                    fill="#F0E8FF"
                />
            </Svg> */}
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: globalStyles.color.lightPurple,
        borderWidth: 0.4,
        borderColor: globalStyles.color.purple,
        borderRadius: 16,
        alignItems: "center",
        paddingHorizontal: 8,
        paddingVertical: 8,
        width: "100%",
        position: "absolute",
        // justifyContent: "center",
        // box-shadow: 1px 1px 15px rgba(0, 0, 0, 0.1);
    },
    text: {
        fontFamily: globalStyles.font.regular,
        fontSize: 16,
        lineHeight: 18,
        alignItems: "center",
        letterSpacing: 0.1,
        color: globalStyles.color.text,
        textAlign: "right",
    },
});
