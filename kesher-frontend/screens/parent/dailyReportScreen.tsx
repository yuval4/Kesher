import React, { useState } from "react";
import { FlatList, StyleSheet, Text, View } from "react-native";
import api from "../../api";
import { useAppSelector } from "../../app/hooks";
import InputBar from "../../components/inputBar";
import ReportsAndComments from "../../components/reportsAndComments";

export default function DailyReportScreen() {
    const child = useAppSelector((state) => state.user.currentChild);
    const [isVisible, setIsVisible] = useState(false);
    const [comment, setComment] = useState("");
    const [currentComment, setCurrentComment] = useState("");

    const handleSubmitComment = async () => {
        setIsVisible(false);
        await api.reports().addCommentToReport(currentComment, comment);
        // .then(() => fetchChildReports());
    };
    return (
        <View style={{ flex: 1 }}>
            {/* <ReportsAndComments
                childId={child._id}
                isVisible={isVisible}
                setIsVisible={setIsVisible}
                setCurrentComment={setCurrentComment}
            /> */}
            <ReportsAndComments childId={child._id} />
            {isVisible && (
                <View style={styles.inputBar}>
                    <InputBar
                        onChangeText={setComment}
                        value={comment}
                        onSendTextPress={handleSubmitComment}
                        currentComment={currentComment}
                    />
                </View>
            )}
        </View>
    );
}

const styles = StyleSheet.create({});
