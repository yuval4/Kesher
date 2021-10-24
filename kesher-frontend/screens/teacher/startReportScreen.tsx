import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import {
    Button,
    Modal,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from "react-native";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import globalStyles from "../../assets/globalStyles";
import Icons from "../../assets/icons/icons";
import RoundButton from "../../components/buttons/roundButton";
import ChildTitle from "../../components/childTitle";
import ReportCategoryCard from "../../components/reportCategoryCard";
import ReportsAndComments from "../../components/reportsAndComments";
import { updateCategory } from "../../features/report/report-slice";

export default function StartReportScreen({ navigation }: any) {
    const { t } = useTranslation();
    const child = useAppSelector((state) => state.report);
    const dispatch = useAppDispatch();
    const [modalOpen, setModalOpen] = useState(false);

    const handleCategoryPress = (category: string) => {
        dispatch(updateCategory({ category: category }));
        navigation.navigate("SubCategory");
        setModalOpen(false);
    };

    return (
        <View style={styles.container}>
            <ChildTitle />
            <View style={styles.reportsAndComments}>
                <ReportsAndComments childId={child.child_id} />
            </View>
            <View style={styles.button}>
                <RoundButton
                    title={t("Start Report")}
                    onPress={() => setModalOpen(true)}
                />
            </View>
            <Modal visible={modalOpen} animationType="slide" transparent={true}>
                <View style={styles.modalContent}>
                    <TouchableOpacity
                        onPress={() => setModalOpen(false)}
                        style={styles.x}
                    >
                        {Icons.x}
                    </TouchableOpacity>

                    <Text style={styles.modalTitle}>
                        {t("Choose Report Type")}
                    </Text>
                    <View style={styles.row}>
                        <ReportCategoryCard
                            item={{
                                report: t("Today's Activities"),
                                imgUrl: require("../../assets/images/play.png"),
                            }}
                            onPress={() => handleCategoryPress("activities")}
                        />
                        <ReportCategoryCard
                            item={{
                                report: t("Meals"),
                                imgUrl: require("../../assets/images/food.png"),
                            }}
                            onPress={() => handleCategoryPress("meals")}
                        />
                    </View>
                    <View style={styles.row}>
                        <ReportCategoryCard
                            item={{
                                report: t("Please Bring"),
                                imgUrl: require("../../assets/images/toSend.png"),
                            }}
                            onPress={() => handleCategoryPress("brings")}
                        />
                        <ReportCategoryCard
                            item={{
                                report: t("Health Care Treatments"),
                                imgUrl: require("../../assets/images/health.png"),
                            }}
                            onPress={() => handleCategoryPress("health")}
                        />
                    </View>
                </View>
            </Modal>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    reportsAndComments: {
        flex: 1,
        marginTop: 30,
    },
    modalView: {
        justifyContent: "flex-end",
    },
    modalContent: {
        alignItems: "center",
        backgroundColor: "#F7F7F7",
        height: "70%",
        marginTop: "auto",
        borderTopLeftRadius: 40,
        borderTopRightRadius: 40,
        shadowOffset: {
            width: 0,
            height: 1,
        },
        shadowOpacity: 0.2,
        shadowRadius: 10,
        elevation: 15,
    },
    x: {
        position: "absolute",
        right: "7%",
        top: "5%",
    },
    modalTitle: {
        fontFamily: globalStyles.font.bold,
        fontSize: 24,
        lineHeight: 24,
        alignItems: "center",
        textAlign: "center",
        letterSpacing: 0.1,
        marginTop: 55,
        marginBottom: 35,
        color: globalStyles.color.text,
    },
    row: {
        flexDirection: "row",
    },
    button: {
        position: "absolute",
        left: 40,
        bottom: 50,
    },
});
