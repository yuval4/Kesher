import React from "react";
import { useTranslation } from "react-i18next";
import { StyleSheet, Text, View } from "react-native";
import HomeButton from "../../components/buttons/homeButton";
import OpenList from "../../components/openList";

export default function HomeScreen({ navigation }: any) {
    const { t } = useTranslation();

    return (
        <View style={styles.container}>
            <View style={styles.OpenList}>
                <OpenList />
            </View>
            {/* <HomeButton
                text="הצהרת קורונה"
                onPress={() => navigation.navigate("Corona")}
                icon="corona"
            /> */}
            <HomeButton
                text={t("Daily Report")}
                onPress={() => navigation.navigate("DailyReport")}
                icon="report"
            />
            <HomeButton
                text={t("Events Board")}
                onPress={() => navigation.navigate("EventsBoard")}
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
