import React, { useEffect, useState } from "react";
import {
    FlatList,
    KeyboardAvoidingView,
    Platform,
    StyleSheet,
    Text,
    View,
} from "react-native";
import api from "../api";
import { getMediaLibraryPermission } from "../utils/utils";
import AddMessageButton from "./buttons/addMessageButton";
import CategoryReport from "./categoryReport";
import InputBar from "./inputBar";
import PersonalReportCard from "./personalReportCard";
import PersonalCommentCard from "./presonalCommentCard";
import ToBring from "./toBring";
import { useFocusEffect } from "@react-navigation/native";

export default function ReportsAndComments({ childId }: any) {
    const [reports, setReports] = useState();
    const [isVisible, setIsVisible] = useState(false);
    const [currentComment, setCurrentComment] = useState("");
    const [comment, setComment] = useState("");

    const getReports = async () => {
        const response = await api.reports().getAllChildReports(childId);
        setReports(response.data);
    };
    useEffect(() => {
        getMediaLibraryPermission();
    }, []);

    // useEffect(() => {
    //     getReports();
    // }, [childId]);

    const handleSubmitComment = async () => {
        setIsVisible(false);
        await api
            .reports()
            .addCommentToReport(currentComment, comment)
            .then(() => getReports());
    };

    useFocusEffect(
        React.useCallback(() => {
            getReports();
        }, [childId])
    );

    return (
        <KeyboardAvoidingView
            keyboardVerticalOffset={210}
            behavior={Platform.OS === "ios" ? "padding" : "height"}
            style={{ flex: 1 }}
        >
            <View style={{ flex: 1 }}>
                <FlatList
                    style={styles.list}
                    data={reports}
                    inverted
                    keyExtractor={(item) => item._id}
                    renderItem={({ item }) => (
                        <View>
                            {(item.mealReports.length > 0 ||
                                item.activityReports.length > 0 ||
                                item.healthReports.length > 0 ||
                                item.bringReports.length > 0) && (
                                <View>
                                    <PersonalReportCard
                                        info={{ date: item.date }}
                                    >
                                        {item.mealReports.length > 0 && (
                                            <CategoryReport
                                                report={item.mealReports}
                                            />
                                        )}
                                        {item.activityReports.length > 0 && (
                                            <CategoryReport
                                                report={item.activityReports}
                                            />
                                        )}
                                        {item.healthReports.length > 0 && (
                                            <CategoryReport
                                                report={item.healthReports}
                                            />
                                        )}
                                        {item.bringReports.length > 0 && (
                                            <ToBring
                                                bring={item.bringReports}
                                            />
                                        )}
                                    </PersonalReportCard>

                                    {item.comments?.map(
                                        (commentData: any, index: string) => {
                                            return (
                                                <View
                                                    key={index}
                                                    style={styles.comment}
                                                >
                                                    <PersonalCommentCard
                                                        data={commentData}
                                                    />
                                                </View>
                                            );
                                        }
                                    )}

                                    <View style={styles.addMessageButton}>
                                        <AddMessageButton
                                            onPress={() => {
                                                setIsVisible(!isVisible);
                                                setCurrentComment(item._id);
                                            }}
                                        />
                                    </View>
                                </View>
                            )}
                        </View>
                    )}
                />
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
        </KeyboardAvoidingView>
    );
}

const styles = StyleSheet.create({
    list: {
        width: "92%",
        alignSelf: "center",
    },
    inputBar: {
        // position: "absolute",
        width: "100%",
        // bottom: 0,
        // paddingTop: 10,
    },
    comment: {
        marginBottom: 4,
        marginTop: 8,
    },
});
