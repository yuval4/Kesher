import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { StyleSheet, Text, View } from "react-native";
import api from "../../api";
import { useAppSelector } from "../../app/hooks";
import HomeButton from "../../components/buttons/homeButton";
import CategoryReport from "../../components/categoryReport";
import OpenList from "../../components/openList";
import PersonalReportCard from "../../components/personalReportCard";
import ToBring from "../../components/toBring";

export default function HomeScreen({ navigation }: any) {
    const { t } = useTranslation();
    const currentChild = useAppSelector((state) => state.user.currentChild);
    const [latestReport, setLatestReport] = useState();

    useEffect(() => {
        const getReport = async () => {
            const response = await api
                .reports()
                .getAllChildLatestReport(currentChild._id);
            setLatestReport(response.data);
        };
        if (currentChild) {
            getReport();
        }
    }, [currentChild]);

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
            {latestReport &&
                (latestReport.mealReports.length > 0 ||
                    latestReport.activityReports.length > 0 ||
                    latestReport.healthReports.length > 0 ||
                    latestReport.bringReports.length > 0) && (
                    <View style={styles.latestReport}>
                        <PersonalReportCard info={{ date: latestReport.date }}>
                            {latestReport.mealReports.length > 0 && (
                                <CategoryReport
                                    report={latestReport.mealReports}
                                />
                            )}
                            {latestReport.activityReports.length > 0 && (
                                <CategoryReport
                                    report={latestReport.activityReports}
                                />
                            )}
                            {latestReport.healthReports.length > 0 && (
                                <CategoryReport
                                    report={latestReport.healthReports}
                                />
                            )}
                            {latestReport.bringReports.length > 0 && (
                                <ToBring bring={latestReport.bringReports} />
                            )}
                        </PersonalReportCard>
                    </View>
                )}
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
    latestReport: {
        width: "90%",
        paddingTop: 20,
    },
});
