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

import InputBar from "../../components/inputBar";
import PersonalReportCard from "../../components/personalReportCard";
import PersonalCommentCard from "../../components/presonalCommentCard";
import api from "../../api";
import { connect } from "react-redux";
import AddMessageButton from "../../components/buttons/addMessageButton";

const TryAndDelete = () => {
    const [comment, setComment] = React.useState("");
    const [addMessage, setAddMessage] = React.useState(false);

    return (
        <KeyboardAvoidingView
            behavior={Platform.OS === "ios" ? "padding" : "height"}
            style={styles.container}
        >
            <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
                <View>
                    <AddMessageButton
                        onPress={() => setAddMessage(!addMessage)}
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
                        </View>
                    ) : null}
                </View>
            </TouchableWithoutFeedback>
        </KeyboardAvoidingView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    inputBar: {
        width: "100%",
        height: 80,
        position: "absolute",
        bottom: 0,
        backgroundColor: "#F6F6F6",
        flexDirection: "row",
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

export default TryAndDelete;
