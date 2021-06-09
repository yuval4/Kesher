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
import AddMessageButton from "../../components/buttons/addMessageButton";
import InputBar from "../../components/inputBar";
import PersonalReportCard from "../../components/personalReportCard";
import PersonalCommentCard from "../../components/presonalCommentCard";
import api from "../../api";
import { connect } from "react-redux";
import Icons from "../../assets/icons/icons";

function DailyReportScreen(props: any) {
    const [DATA, setDATA] = useState([]);
    const [addMessage, setAddMessage] = React.useState(false);
    const [activeComment, setActiveComment] = React.useState("");
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

    const [comments, setComments] = React.useState([
        {
            recordId: "1",
            sender: "גננת",
            value: "אחת",
            relateId: "60b6484b75b3759190e171f5",
            timestamp: 1617629677114,
        },
        {
            recordId: "2",
            sender: "גננת",
            value: "שתיים",
            relateId: "60b7f26152683269bce0ab7d",
            timestamp: 1617629677114,
        },
    ]);

    const submitMessage = () => {
        api.reports().addCommentToReport(activeComment, comment);
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
                                            data={comments}
                                            keyExtractor={(comment) =>
                                                comment.recordId
                                            }
                                            renderItem={(comment) =>
                                                comment.item.relateId.toString() ===
                                                item.item._id ? (
                                                    <View
                                                        style={styles.comment}
                                                    >
                                                        {console.log(
                                                            comment.item
                                                        )}
                                                        <PersonalCommentCard
                                                            data={comment.item}
                                                        />
                                                    </View>
                                                ) : null
                                            }
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

        // <KeyboardAvoidingView
        //     behavior={Platform.OS === "ios" ? "padding" : "height"}
        //     style={styles.container}
        // >
        //     {/* <View style={styles.container}> */}
        //     <FlatList
        //         style={styles.list}
        //         data={DATA}
        //         initialScrollIndex={DATA.length - 1}
        //         keyExtractor={(item, index) => index.toString()}
        //         renderItem={(item) => (
        //             <View style={styles.messages}>
        //                 <View style={styles.message}>
        //                     <PersonalReportCard data={item.item.subReports} />
        //                 </View>

        //                 <AddMessageButton
        //                     onPress={() => {
        //                         setAddMessage(!addMessage);
        //                         setActiveComment(item.item.recordId);
        //                     }}
        //                 />
        //             </View>
        //         )}
        //     />

        //     {addMessage ? (
        //         <View style={styles.inputBar}>
        //             <TextInput
        //                 style={styles.input}
        //                 onChangeText={setComment}
        //                 value={comment}
        //                 multiline
        //                 placeholder="כתב/י כאן..."
        //             />
        //             <AddMessageButton
        //                 onPress={() => {
        //                     setAddMessage(!addMessage);
        //                 }}
        //             />
        //         </View>
        //     ) : null}
        //     {/* </View> */}
        // </KeyboardAvoidingView>
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

export default connect(mapStateToProps)(DailyReportScreen);
