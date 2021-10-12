import React, { useEffect, useState } from "react";
import {
    StyleSheet,
    View,
    Text,
    Image,
    KeyboardAvoidingView,
    Platform,
    TouchableWithoutFeedback,
    Keyboard,
    ScrollView,
    RefreshControl,
} from "react-native";
import { FlatList } from "react-native-gesture-handler";
import api from "../api";
import { useAppSelector } from "../app/hooks";
import { getMediaLibraryPermission } from "../utils/utils";
import AddMessageButton from "./buttons/addMessageButton";
import PersonalReportCard from "./personalReportCard";
import PersonalCommentCard from "./presonalCommentCard";

export default function ReportsAndComments(props: any) {
    const [DATA, setDATA] = useState([]);
    const [refreshing, setRefreshing] = useState(false);

    // ANCHOR get reports data from the server.
    const fetchChildReports = async () => {
        const response = await api.reports().getAllChildReports(props.child);
        setDATA(response.data);
    };

    useEffect(() => {
        getMediaLibraryPermission();
    }, []);

    useEffect(() => {
        fetchChildReports();
    }, [props.child]);

    useEffect(() => {
        if (props.submitComment === true) {
            submitMessage();
            props.setSubmitComment(false);
            props.setComment("");
        }
    }, [props.submitComment]);

    const submitMessage = () => {
        api.reports()
            .addCommentToReport(props.activeComment, props.comment)
            .then(() => fetchChildReports());
    };

    const onRefresh = React.useCallback(() => {
        setRefreshing(true);
        setTimeout(() => {
            setRefreshing(false);
        }, 1500);
    }, []);

    return (
        <KeyboardAvoidingView
            behavior={Platform.OS === "ios" ? "padding" : "height"}
            style={styles.container}
        >
            <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
                {/* <ScrollView
                    style={styles.scrollContainer}
                    refreshControl={
                        <RefreshControl
                            refreshing={refreshing}
                            onRefresh={onRefresh}
                        />
                    }
                > */}
                <View>
                    <FlatList
                        style={styles.list}
                        data={DATA}
                        inverted
                        keyExtractor={(item, index) => index.toString()}
                        renderItem={({ item }) => {
                            return item.subReports.length === 0 ? null : (
                                <View
                                    style={styles.messagesContainer}
                                    key={item}
                                >
                                    <View style={styles.message}>
                                        <PersonalReportCard data={item} />
                                    </View>
                                    {item.comments.map(
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
                                                props.setIsVisible(
                                                    !props.isVisible
                                                );
                                                props.setActiveComment(
                                                    item._id
                                                );
                                                // item._id;
                                            }}
                                        />
                                    </View>
                                </View>
                            );
                        }}
                    />
                </View>
            </TouchableWithoutFeedback>
        </KeyboardAvoidingView>
    );
}
const styles = StyleSheet.create({
    container: {
        paddingTop: 15,
        // alignItems: "center",
        width: "100%",
        flex: 1,
    },
    list: {
        width: "100%",
    },
    messagesContainer: {
        alignItems: "center",
    },
    message: {
        paddingBottom: 7,
        width: "90%",
    },
    commentList: {
        width: "100%",
    },
    comment: {
        marginBottom: 4,
        marginTop: 8,
        width: "90%",
    },
    addMessageButton: {
        alignSelf: "flex-end",
        marginRight: "4%",
    },
});
