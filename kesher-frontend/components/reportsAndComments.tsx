import React, { useEffect, useState } from "react";
import {
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
    FlatList,
    TextInput,
    KeyboardAvoidingView,
    Platform,
    TouchableWithoutFeedback,
    Keyboard,
} from "react-native";
import { connect } from "react-redux";
import api from "../api";
import AddMessageButton from "./buttons/addMessageButton";
import PersonalReportCard from "./personalReportCard";
import PersonalCommentCard from "./presonalCommentCard";

function ReportsAndComments(props: any) {
    const [DATA, setDATA] = useState([]);
    const [addMessage, setAddMessage] = React.useState(false);
    const [activeComment, setActiveComment] = React.useState("");
    const [comment, setComment] = React.useState("");

    // ANCHOR get reports data from the server.
    const fetchChildReports = async () => {
        const response = await api
            .reports()
            .getAllChildReports(props.user.children[0]._id);
        setDATA(response.data);
    };

    useEffect(() => {
        fetchChildReports();
    }, [props.user]);

    const submitMessage = () => {
        api.reports()
            .addCommentToReport(activeComment, comment)
            .then(() => fetchChildReports());

        setAddMessage(false);
        setComment("");
    };

    return (
        <KeyboardAvoidingView
            behavior={Platform.OS === "ios" ? "padding" : "height"}
            style={styles.container}
        >
            <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
                <View style={styles.container}>
                    <FlatList
                        style={styles.list}
                        data={DATA}
                        keyExtractor={(item, index) => index.toString()}
                        renderItem={(item) =>
                            item.item.subReports.length === 0 ? null : (
                                <View style={styles.messages}>
                                    <View style={styles.message}>
                                        <PersonalReportCard data={item.item} />
                                        <FlatList
                                            style={styles.commentList}
                                            data={item.item.comments}
                                            keyExtractor={(commentData) =>
                                                commentData._id
                                            }
                                            renderItem={(commentData) => (
                                                <View style={styles.comment}>
                                                    <PersonalCommentCard
                                                        data={commentData.item}
                                                    />
                                                </View>
                                            )}
                                        />

                                        <AddMessageButton
                                            onPress={() => {
                                                setAddMessage(!addMessage);
                                                setActiveComment(item.item._id);
                                            }}
                                        />
                                    </View>
                                </View>
                            )
                        }
                    />
                    {addMessage ? (
                        <View style={styles.inputBar}>
                            <TextInput
                                style={styles.input}
                                onChangeText={setComment}
                                value={comment}
                                multiline
                                placeholder="כתב/י כאן..."
                            />
                            <AddMessageButton onPress={submitMessage} />
                        </View>
                    ) : null}
                </View>
            </TouchableWithoutFeedback>
        </KeyboardAvoidingView>
    );
}

const styles = StyleSheet.create({
    container: {
        paddingTop: 20,
        alignItems: "center",
        width: "100%",
        flex: 1,
    },
    list: {
        width: "100%",
    },
    messages: {
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
    },
    inputBar: {
        width: "100%",
        bottom: 0,
        paddingBottom: 20,
        backgroundColor: "#F6F6F6",
        flexDirection: "row",
        justifyContent: "center",
        paddingHorizontal: 25,
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

const mapStateToProps = (state: any) => {
    const { user } = state;
    return { user };
};

export default connect(mapStateToProps)(ReportsAndComments);
