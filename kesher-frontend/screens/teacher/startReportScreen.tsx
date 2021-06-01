import iconSet from "@expo/vector-icons/build/Fontisto";
import React, { useState } from "react";
import {
    StyleSheet,
    Text,
    View,
    TouchableOpacity,
    Button,
    Modal,
    Dimensions,
    FlatList,
} from "react-native";
import globalStyles from "../../assets/globalStyles";
import Icons from "../../assets/icons/icons";
import StartReportButton from "../../components/buttons/startReportButton";
import ChildTitle from "../../components/childTitle";
import ReportCategoryCard from "../../components/reportCategoryCard";
import { connect, useDispatch } from "react-redux";

function StartReportScreen(props: any) {
    const [modalOpen, setModalOpen] = useState(false);
    const dispatch = useDispatch();

    const DATA = [
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
            <StartReportButton onPress={() => setModalOpen(true)} />

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
                        data={DATA}
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
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        alignItems: "center",
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
        padding: 25,
        top: -25,
        left: -10,
    },
});

const mapStateToProps = (state: any) => {
    const { report } = state;
    return { report };
};

export default connect(mapStateToProps)(StartReportScreen);
