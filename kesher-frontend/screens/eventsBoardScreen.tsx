import React, { useEffect, useState } from "react";
import {
    StyleSheet,
    Text,
    View,
    SectionList,
    TouchableOpacity,
    Modal,
    TouchableWithoutFeedback,
    Keyboard,
} from "react-native";
import globalStyles from "../assets/globalStyles";
import Icons from "../assets/icons/icons";
import api from "../api";
import RoundButton from "../components/buttons/roundButton";
import EventsBoardDetails from "../components/eventsBoardDetails";
import { useAppSelector } from "../app/hooks";
import AddEventForm from "../components/forms/addEventForm";
import { useForm } from "react-hook-form";
import SubmitButton from "../components/buttons/submitButton";
import { useTranslation } from "react-i18next";

export default function EventsBoardScreen() {
    const { t } = useTranslation();
    const user = useAppSelector((state) => state.user);
    const {
        control,
        reset,
        handleSubmit,
        formState: { errors },
    } = useForm();
    const [modalOpen, setModalOpen] = useState(false);
    const [openItem, setOpenItem] = useState("");

    const [eventsData, setEventsData] = useState([
        { month: "January", data: [] },
        { month: "February", data: [] },
        { month: "March", data: [] },
        { month: "April", data: [] },
        { month: "May", data: [] },
        { month: "June", data: [] },
        { month: "July", data: [] },
        { month: "August", data: [] },
        { month: "September", data: [] },
        { month: "October", data: [] },
        { month: "November", data: [] },
        { month: "December", data: [] },
    ]);

    // ANCHOR get list of events and add them to thier place in the eventsData.
    const addEventToState = (events: any) => {
        const temp = [...eventsData];
        events.forEach((event: any) => {
            temp[new Date(event.startTime).getMonth()].data.push(event);
        });

        temp.forEach((month) => {
            month.data.sort((a, b) => (a.startTime > b.startTime ? 1 : -1));
        });

        setEventsData([...temp]);
    };

    // ANCHOR get data from server and set it in eventsData array
    const getDataFromServer = async () => {
        const eventsResponse = await api
            .schools()
            .getSchoolEvents(
                user.role === "Teacher"
                    ? user.currentSchool._id
                    : user.currentChild.school
            );
        addEventToState(eventsResponse.data.eventsBoard);
    };

    // ANCHOR
    useEffect(() => {
        getDataFromServer();
    }, [user]);

    const toggleItem = (key: string) => {
        if (key === openItem) {
            setOpenItem("");
        } else {
            setOpenItem(key);
        }
    };
    const handleSubmitForm = async (data: any) => {
        setModalOpen(false);
        addEventToState([data]);
        await api.schools().addNewEvent(user.currentSchool._id, data);
        reset();
    };

    return (
        <View style={styles.container}>
            <View style={styles.line}></View>

            <SectionList
                sections={eventsData}
                keyExtractor={(item, index) => item.title + index}
                renderSectionHeader={({ section: { month } }) => (
                    <View>
                        {/* {data.length === 0 ? null : ( */}
                        <View style={styles.monthItem}>
                            <View style={styles.circle}></View>
                            <Text style={styles.monthText}>{t(month)}</Text>
                        </View>
                        {/* )} */}
                    </View>
                )}
                renderItem={(item) => (
                    <View style={styles.item}>
                        <View style={styles.dayCircle}>
                            <Text style={styles.day}>
                                {new Date(item.item.startTime).getDate()}
                            </Text>
                        </View>
                        <TouchableOpacity
                            style={styles.content}
                            onPress={() =>
                                toggleItem(item.item.title + item.index)
                            }
                        >
                            <Text style={styles.title}>{item.item.title}</Text>

                            {item.item.endTime && (
                                <Text style={styles.time}>
                                    {new Date(item.item.startTime)
                                        .toTimeString()
                                        .slice(0, 5)}{" "}
                                    -{" "}
                                    {new Date(item.item.endTime)
                                        .toTimeString()
                                        .slice(0, 5)}
                                </Text>
                            )}

                            {openItem === item.item.title + item.index && (
                                <Text style={styles.time}>
                                    {item.item.details}
                                </Text>
                            )}
                        </TouchableOpacity>
                    </View>
                )}
            />

            {user.role === "Teacher" && (
                <View style={styles.button}>
                    <RoundButton
                        title={t("Add event")}
                        onPress={() => setModalOpen(true)}
                    />
                </View>
            )}

            <Modal visible={modalOpen} animationType="slide" transparent={true}>
                <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
                    <View style={styles.modalContent}>
                        <TouchableOpacity
                            onPress={() => setModalOpen(false)}
                            style={styles.x}
                        >
                            {Icons.x}
                        </TouchableOpacity>

                        <AddEventForm
                            control={control}
                            errors={errors}
                            title={t("New Event")}
                        />
                        <View style={styles.submitButton}>
                            <SubmitButton
                                text={t("Add")}
                                onPress={handleSubmit(handleSubmitForm)}
                            />
                        </View>
                    </View>
                </TouchableWithoutFeedback>
            </Modal>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    line: {
        borderWidth: 2,
        borderColor: globalStyles.color.purple,
        position: "absolute",
        height: globalStyles.window.height,
        right: 35,
    },
    content: {
        marginRight: 20,
    },
    circle: {
        width: 16,
        height: 16,
        backgroundColor: globalStyles.color.purple,
        borderRadius: 50,
        marginLeft: 26,
    },
    monthItem: {
        flexDirection: "row-reverse",
        alignItems: "center",
        marginTop: 10,
        right: 30,
    },
    item: {
        flexDirection: "row-reverse",
        marginVertical: 15,
        right: 22,
    },
    monthText: {
        fontFamily: globalStyles.font.semiBold,
        fontSize: 20,
        lineHeight: 22,
        letterSpacing: 0.1,
        alignItems: "center",
        textAlign: "right",
        color: globalStyles.color.purple,
    },
    title: {
        fontFamily: globalStyles.font.semiBold,
        fontSize: 20,
        lineHeight: 22,
        letterSpacing: 0.1,
        alignItems: "center",
        textAlign: "right",
        color: globalStyles.color.text,
    },
    day: {
        fontFamily: globalStyles.font.semiBold,
        fontSize: 20,
        lineHeight: 22,
        letterSpacing: 0.1,
        textAlign: "center",
        color: globalStyles.color.purple,
    },
    dayCircle: {
        borderColor: globalStyles.color.purple,
        borderWidth: 2,
        borderRadius: 30,
        height: 30,
        width: 30,
        backgroundColor: "white",
        justifyContent: "center",
        alignItems: "center",
    },
    time: {
        fontFamily: globalStyles.font.semiBold,
        fontSize: 18,
        lineHeight: 22,
        letterSpacing: 0.1,
        alignItems: "center",
        textAlign: "right",
        color: globalStyles.color.text,
    },
    modalContent: {
        backgroundColor: "white",
        marginHorizontal: "10%",
        // marginTop: "30%",
        marginTop: 100,
        borderRadius: 24,
        padding: 20,
        shadowOffset: {
            width: 5,
            height: 5,
        },
        shadowOpacity: 0.5,
        shadowRadius: 15,
        elevation: 10,
    },
    button: {
        position: "absolute",
        left: "10%",
        bottom: "10%",
    },
    submitButton: {
        alignSelf: "center",
        paddingTop: 30,
    },
});
