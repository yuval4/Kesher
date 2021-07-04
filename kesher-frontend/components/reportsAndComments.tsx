import React, { useEffect, useState } from "react";
import {
    StyleSheet,
    View,
    FlatList,
    TextInput,
    KeyboardAvoidingView,
    Platform,
    TouchableWithoutFeedback,
    Keyboard,
    ScrollView,
} from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import { Text } from "react-native-svg";
import { connect } from "react-redux";
import api from "../api";
import AddMessageButton from "./buttons/addMessageButton";
import PersonalReportCard from "./personalReportCard";
import PersonalCommentCard from "./presonalCommentCard";
import * as WebBrowser from "expo-web-browser";
import { LinearGradient } from "expo-linear-gradient";
import GradientVertical from "./gradientVertical";

function ReportsAndComments(props: any) {
    const [DATA, setDATA] = useState([]);
    const [addMessage, setAddMessage] = React.useState(false);
    const [activeComment, setActiveComment] = React.useState("");
    const [comment, setComment] = React.useState("");

    // NOTE need to fix it
    // const makeURLInTextToHyperLink = (text: string) => {
    //     const urlRegex = /(https?:\/\/[^\s]+)/g;
    //     return text.replace(urlRegex, (url: string) => {
    //         return (
    //             <TouchableOpacity
    //                 onPress={() =>
    //                     WebBrowser.openBrowserAsync(
    //                         "https://israelelwyn.org.il/he/"
    //                     )
    //                 }
    //             >
    //                 <Text>לחצו כאן</Text>
    //             </TouchableOpacity>
    //         );
    //     });
    // };

    // var text =
    //     "Find me at http://www.example.com and also at http://stackoverflow.com";
    // var html = makeURLInTextToHyperLink(text);

    // console.log(html);

    // ANCHOR get reports data from the server.
    const fetchChildReports = async () => {
        const response = await api.reports().getAllChildReports(props.child);
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
                    {/* <GradientVertical style={{ width: "100%" }}> */}
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
                    {/* </GradientVertical> */}
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
        paddingTop: 15,
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
