import React, { useEffect } from "react";
import {
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
    FlatList,
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
    const [addMessage, setAddMessage] = React.useState(false);
    const [activeComment, setActiveComment] = React.useState("1");

    useEffect(() => {
        const pit = api.reports().getAllChildReports(props.user.children[0]);
        console.log(pit);
    }, []);

    const DATA = [
        {
            recordId: "1",
            sender: "גננת",
            category: "ארוחת בוקר",
            value: "איתמר אכל לארוחת בוקר חביתה וגבינה",
            timestamp: 1617629677114,
        },
        {
            recordId: "2",
            sender: "גננת",
            category: "משחקים",
            value: "כל הכבוד",
            timestamp: 1617629677114,
        },
    ];

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
        <View style={styles.container}>
            <FlatList
                style={styles.list}
                data={DATA}
                keyExtractor={(item) => item.recordId}
                renderItem={(item) => (
                    <View style={styles.messages}>
                        <View style={styles.message}>
                            <PersonalReportCard data={item.item} />
                            <Text>{item.item.recordId}</Text>
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
                        {addMessage ? (
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
                        ) : null}
                        <AddMessageButton
                            onPress={() => {
                                setAddMessage(!addMessage);
                                setActiveComment(item.item.recordId);
                            }}
                        />
                    </View>
                )}
            />
        </View>
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
    input: {
        width: "90%",
    },
});

const mapStateToProps = (state: any) => {
    const { user } = state;
    return { user };
};

export default connect(mapStateToProps)(DailyReportScreen);