import React, { useState } from "react";
import {
    StyleSheet,
    Text,
    View,
    TouchableOpacity,
    Modal,
    FlatList,
} from "react-native";
import globalStyles from "../../assets/globalStyles";
import Icons from "../../assets/icons/icons";
import RoundButton from "../../components/buttons/roundButton";
import ChildTitle from "../../components/childTitle";
import ReportCategoryCard from "../../components/reportCategoryCard";
import ReportsAndComments from "../../components/reportsAndComments";
import InputBar from "../../components/inputBar";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { updateCategory } from "../../features/report/report-slice";

export default function StartReportScreen(props: any) {
    const [modalOpen, setModalOpen] = useState(false);
    const dispatch = useAppDispatch();
    const report = useAppSelector((state) => state.report);
    const [isVisible, setIsVisible] = useState(false);
    const [comment, setComment] = useState("");
    const [submitComment, setSubmitComment] = useState(false);
    const [activeComment, setActiveComment] = useState("");

    const CATEGORIES = [
        {
            id: "1",
            title: "פעילויות שהתקיימו בגן",
            imgUrl: require("../../assets/images/play.png"),
        },
        {
            id: "2",
            title: "ארוחות",
            imgUrl: require("../../assets/images/food.png"),
        },
        {
            id: "3",
            title: "בבקשה לשלוח",
            imgUrl: require("../../assets/images/toSend.png"),
        },
        {
            id: "4",
            title: "טיפולי מקצועות הבריאות",
            imgUrl: require("../../assets/images/health.png"),
        },
    ];

    const handlePress = (id: string) => {
        dispatch(updateCategory({ category: id }));
        props.navigation.navigate("SubCategory");
        setModalOpen(false);
    };

    return (
        <View style={styles.container}>
            <ChildTitle />

            <View style={styles.reportsAndComments}>
                <ReportsAndComments
                    child={report.child_id}
                    isVisible={isVisible}
                    setIsVisible={setIsVisible}
                    comment={comment}
                    setComment={setComment}
                    submitComment={submitComment}
                    setSubmitComment={setSubmitComment}
                    activeComment={activeComment}
                    setActiveComment={setActiveComment}
                />
            </View>
            <View style={styles.button}>
                <RoundButton
                    title="התחל דיווח"
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

                    <Text style={styles.modalTitle}>בחר דיווח</Text>
                    <FlatList
                        style={styles.list}
                        data={CATEGORIES}
                        numColumns={2}
                        keyExtractor={(item) => item.id}
                        scrollEnabled={false}
                        renderItem={({ item }) => (
                            <ReportCategoryCard
                                item={item}
                                onPress={() => handlePress(item.id)}
                            />
                        )}
                    />
                </View>
            </Modal>

            {isVisible && (
                <View style={styles.inputBar}>
                    <InputBar
                        onChangeText={setComment}
                        value={comment}
                        onSendTextPress={() => {
                            setSubmitComment(true);
                            setIsVisible(false);
                        }}
                        activeComment={activeComment}
                    />
                </View>
            )}
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        alignItems: "center",
    },
    button: {
        position: "absolute",
        left: "10%",
        bottom: "10%",
    },
    reportsAndComments: {
        width: "100%",
        height: "90%",
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
    list: {
        padding: 20,
        top: -25,
        left: -10,
    },
    inputBar: {
        position: "absolute",
        width: "100%",
        bottom: 0,
        paddingBottom: 40,
        justifyContent: "center",
        backgroundColor: "white",
        paddingVertical: 5,
    },
    input: {
        width: "100%",
        borderRadius: 16,
        borderColor: "#8E8E93",
        backgroundColor: "white",
        textAlign: "right",
        paddingRight: 7,
    },
});
