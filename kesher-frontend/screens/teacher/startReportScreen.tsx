import React, { useRef, useState } from "react";
import {
    StyleSheet,
    Text,
    View,
    TouchableOpacity,
    Modal,
    FlatList,
    ScrollView,
    TextInput,
} from "react-native";
import globalStyles from "../../assets/globalStyles";
import Icons from "../../assets/icons/icons";
import RoundButton from "../../components/buttons/roundButton";
import ChildTitle from "../../components/childTitle";
import ReportCategoryCard from "../../components/reportCategoryCard";
import { connect, useDispatch } from "react-redux";
import ReportsAndComments from "../../components/reportsAndComments";
import AddMessageButton from "../../components/buttons/addMessageButton";
import InputBar from "../../components/inputBar";

function StartReportScreen(props: any) {
    const [modalOpen, setModalOpen] = useState(false);
    const dispatch = useDispatch();
    const scrollViewRef = useRef();
    const [isVisible, setIsVisible] = useState(false);
    const [comment, setComment] = useState("");
    const [submitComment, setSubmitComment] = useState(false);

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
        dispatch({
            type: "SET_REPORT",
            data: {
                child_id: props.report.child_id,
                name: {
                    first: props.report.name.first,
                    last: props.report.name.last,
                },
                profilePic: props.report.profilePic,
                category: id,
            },
        });
        props.navigation.navigate("SubCategory");
        setModalOpen(false);
    };

    return (
        <View style={styles.container}>
            <ChildTitle />

            <ScrollView
                ref={scrollViewRef}
                onContentSizeChange={() =>
                    scrollViewRef.current.scrollToEnd({ animated: true })
                }
                style={styles.reportsAndComments}
            >
                <ReportsAndComments
                    child={props.report.child_id}
                    isVisible={isVisible}
                    setIsVisible={setIsVisible}
                    comment={comment}
                    setComment={setComment}
                    submitComment={submitComment}
                    setSubmitComment={setSubmitComment}
                />
            </ScrollView>

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

            {isVisible ? (
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
                            setSubmitComment(true);
                            setIsVisible(false);
                            setComment("");
                        }}
                    />
                </View>
            ) : null}
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
        paddingBottom: 50,
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
    const { report } = state;
    return { report };
};

export default connect(mapStateToProps)(StartReportScreen);
