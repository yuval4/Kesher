import React from "react";
import { StyleSheet, Text, View, Image, TouchableOpacity } from "react-native";
// import Food from '../assets/icons/food.js';
//import Svg, { SvgUri } from 'react-native-svg';
// import SvgUri from 'react-native-svg-uri';

export default function ReportCategoryCard({
    item,
    onPress,
}: {
    item: { report: string; imgUrl: number };
    onPress: () => void;
}) {
    return (
        <View>
            <TouchableOpacity onPress={onPress}>
                <View style={styles.container}>
                    <Image style={styles.image} source={item.imgUrl} />
                    <View style={styles.textView}>
                        <Text style={styles.text}>{item.report}</Text>
                    </View>
                </View>
            </TouchableOpacity>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        width: 160,
        height: 180,
        backgroundColor: "#FFFFFF",
        shadowOffset: {
            width: 0,
            height: 4,
        },
        shadowOpacity: 0.1,
        shadowRadius: 25,
        elevation: 6,
        borderRadius: 16,
        alignItems: "center",
        borderWidth: 1,
        borderColor: "#E2E2E2",
        margin: 8,
        padding: 7,
    },
    image: {
        height: 112,
        width: 150,
    },
    text: {
        fontFamily: "Assistant-SemiBold",
        fontSize: 20,
        lineHeight: 20,
        textAlign: "center",
        letterSpacing: 0.1,
        color: "#3A3A35",
        width: "85%",
        marginTop: 15,
    },
    textView: {
        width: "100%",
        justifyContent: "center",
        alignItems: "center",
    },
});
