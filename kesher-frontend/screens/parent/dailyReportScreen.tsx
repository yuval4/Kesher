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
} from "react-native";
import AddMessageButton from "../../components/buttons/addMessageButton";
import InputBar from "../../components/inputBar";
import PersonalReportCard from "../../components/personalReportCard";
import PersonalCommentCard from "../../components/presonalCommentCard";
import { Formik } from "formik";
import AppLayout from "../../components/appLayout";
import api from "../../api";
import { connect } from "react-redux";

function DailyReportScreen(props: any) {
    const [DATA, setDATA] = useState([]);
    const [addMessage, setAddMessage] = React.useState(false);
    const [activeComment, setActiveComment] = React.useState("1");
    const [comment, setComment] = React.useState("");

    useEffect(() => {
        const fetchChildReports = async () => {
            const response = await api
                .reports()
                .getAllChildReports(props.user.children[0]);
            setDATA(response.data);
        };
        fetchChildReports();
    }, []);
    console.log(props.user);
    const [comments, setComments] = React.useState([
        {
            recordId: "1",
            sender: "גננת",
            value: "אחת",
            relateId: "2",
            timestamp: 1617629677114,
        },
        {
            recordId: "2",
            sender: "גננת",
            value: "שתיים",
            relateId: "2",
            timestamp: 1617629677114,
        },
    ]);

    return (
        <KeyboardAvoidingView
            behavior={Platform.OS === "ios" ? "padding" : "height"}
            style={styles.container}
        >
            {/* <View style={styles.container}> */}
            <FlatList
                style={styles.list}
                data={DATA}
                keyExtractor={(item, index) => index.toString()}
                renderItem={(item) => (
                    <View style={styles.messages}>
                        <View style={styles.message}>
                            <PersonalReportCard data={item.item.subReports} />
                        </View>
                        <FlatList
                            style={styles.commentList}
                            data={comments}
                            keyExtractor={(comment) => comment.recordId}
                            renderItem={(comment) =>
                                comment.item.relateId.toString() ===
                                item.item.recordId ? (
                                    <View style={styles.comment}>
                                        <PersonalCommentCard
                                            data={comment.item}
                                        />
                                        <Text>{comment.item.relateId}</Text>
                                    </View>
                                ) : null
                            }
                        />
                        {/* {addMessage ? (
                            <Formik
                                initialValues={{
                                    recordId: "1", //! need to change to uniqe id
                                    sender: "",
                                    value: "",
                                    relateId: "",
                                    timestamp: 1617629677114,
                                }}
                                onSubmit={(values, actions) => {
                                    actions.resetForm();
                                    values.timestamp = new Date().getTime();
                                    values.relateId = activeComment;
                                    setComments((comments) => [
                                        ...comments,
                                        values,
                                    ]);
                                    setAddMessage(!addMessage);
                                    console.log(comments);
                                }}
                            >
                                {(props) => (
                                    <View style={styles.input}>
                                        <InputBar
                                            onChangeText={props.handleChange(
                                                "value"
                                            )}
                                            value={props.values.value}
                                            onPress={props.handleSubmit}
                                        />
                                    </View>
                                )}
                            </Formik>
                        ) : null} */}
                        <AddMessageButton
                            onPress={() => {
                                setAddMessage(!addMessage);
                                setActiveComment(item.item.recordId);
                            }}
                        />
                    </View>
                )}
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
                    <AddMessageButton
                        onPress={() => {
                            setAddMessage(!addMessage);
                        }}
                    />
                </View>
            ) : null}
            {/* </View> */}
        </KeyboardAvoidingView>
    );
}

const styles = StyleSheet.create({
    container: {
        paddingTop: 20,
        alignItems: "center",
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
        width: "90%",
    },
    comment: {
        paddingBottom: 4,
    },
    inputBar: {
        backgroundColor: "gray",
        flexDirection: "row",
        paddingHorizontal: 25,
        paddingVertical: 5,
    },
    input: {
        width: "100%",
        borderRadius: 15,
        backgroundColor: "white",
        textAlign: "right",
        paddingRight: 7,
    },
});

const mapStateToProps = (state: any) => {
    const { user } = state;
    return { user };
};

export default connect(mapStateToProps)(DailyReportScreen);
