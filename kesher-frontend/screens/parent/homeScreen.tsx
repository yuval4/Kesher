import React from "react";
import { StyleSheet, Text, View, Image } from "react-native";
import HomeButton from "../../components/buttons/homeButton";
import OpenList from "../../components/openList";

export default function HomeScreen({ navigation }: any) {
    return (
        <View style={styles.container}>
            <Image
                style={styles.photo}
                source={{
                    uri: "https://i.pravatar.cc/300/",
                }}
            />
            <View style={styles.OpenList}>
                <OpenList />
            </View>
            <HomeButton
                text="הצהרת קורונה"
                onPress={() => navigation.navigate("Corona")}
                icon="corona"
            />
            <HomeButton
                text="דיווח יומי"
                onPress={() => navigation.navigate("DailyReport")}
                icon="report"
            />
            <HomeButton
                text="לוח מודעות"
                onPress={() => alert("hah")}
                icon="calender"
            />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        alignItems: "center",
        justifyContent: "center",
    },
    photo: {
        width: 75,
        height: 75,
        borderRadius: 100,
        marginBottom: 12,
        marginTop: 24,
    },
    OpenList: {
        marginBottom: 40,
    },
});
