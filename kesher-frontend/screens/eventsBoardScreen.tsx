import React, { useEffect, useState } from "react";
import {
    StyleSheet,
    Text,
    View,
    SectionList,
    TouchableOpacity,
    Modal,
    TextInput,
    Button,
} from "react-native";
import globalStyles from "../assets/globalStyles";
import Icons from "../assets/icons/icons";
import DateTimePickerModal from "react-native-modal-datetime-picker";
import { connect } from "react-redux";
import api from "../api";
import RoundButton from "../components/buttons/roundButton";
import EventsBoardDetails from "../components/eventsBoardDetails";

function EventsBoardScreen(props: any) {
    const role = props.user.role;
    const [modalOpen, setModalOpen] = useState(false);
    const [openItem, setOpenItem] = useState("");
    const [isStartDatePickerVisible, setStartDatePickerVisibility] =
        useState(false);
    const [isEndDatePickerVisible, setEndDatePickerVisibility] =
        useState(false);
    const [eventsData, setEventsData] = useState([
        { month: "ינואר", data: [] },
        { month: "פברואר", data: [] },
        { month: "מרץ", data: [] },
        { month: "אפריל", data: [] },
        { month: "מאי", data: [] },
        { month: "יוני", data: [] },
        { month: "יולי", data: [] },
        { month: "אוגוסט", data: [] },
        { month: "ספטמבר", data: [] },
        { month: "אוקטובר", data: [] },
        { month: "נובמבר", data: [] },
        { month: "דצמבר", data: [] },
    ]);

    const [newEvent, setNewEvent] = useState({
        title: "",
        details: "",
        startTime: new Date(),
        endTime: new Date(),
        creatorId: "",
    });

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
                role === "staff"
                    ? props.user.schools[0]
                    : props.user.children[0].school
            );

        addEventToState(eventsResponse.data.eventsBoard);
    };

    // ANCHOR
    useEffect(() => {
        getDataFromServer();
    }, []);

    const toggleItem = (key: string) => {
        if (key === openItem) {
            setOpenItem("");
        } else {
            setOpenItem(key);
        }
    };

    const handleInputChange = (item: string, input: string) => {
        if (item === "title") {
            setNewEvent((newEvent) => ({
                ...newEvent,
                title: input,
            }));
        }
        if (item === "details") {
            setNewEvent((newEvent) => ({
                ...newEvent,
                details: input,
            }));
        }
    };

    const handleStartTimeConfirm = (date: any) => {
        setNewEvent((newEvent) => ({
            ...newEvent,
            startTime: date,
        }));
        setStartDatePickerVisibility(false);
    };

    const handleEndTimeConfirm = (date: any) => {
        setNewEvent((newEvent) => ({
            ...newEvent,
            endTime: date,
        }));
        setEndDatePickerVisibility(false);
    };

    const handleSubmitForm = () => {
        setModalOpen(false);
        addEventToState([newEvent]);
        api.schools().addNewEvent(props.user.schools[0], newEvent);
    };

    return (
        <View style={styles.container}>
            <View style={styles.line}></View>

            <SectionList
                sections={eventsData}
                keyExtractor={(item, index) => item.title + index}
                renderSectionHeader={({ section }) => (
                    <View>
                        {section.data.length === 0 ? null : (
                            <View style={styles.monthItem}>
                                <View style={styles.circle}></View>
                                <Text style={styles.monthText}>
                                    {section.month}
                                </Text>
                            </View>
                        )}
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
                            <Text style={styles.time}>
                                {new Date(item.item.startTime)
                                    .toTimeString()
                                    .slice(0, 5)}{" "}
                                -{" "}
                                {new Date(item.item.endTime)
                                    .toTimeString()
                                    .slice(0, 5)}
                            </Text>
                            {openItem === item.item.title + item.index ? (
                                <Text style={styles.time}>
                                    {item.item.details}
                                </Text>
                            ) : // <EventsBoardDetails text={item.item.details} />
                            null}
                        </TouchableOpacity>
                    </View>
                )}
            />
            {role === "staff" ? (
                <View style={styles.button}>
                    <RoundButton
                        title="הוספת אירוע"
                        onPress={() => setModalOpen(true)}
                    />
                </View>
            ) : null}

            <Modal visible={modalOpen} animationType="slide" transparent={true}>
                <View style={styles.modalContent}>
                    <TouchableOpacity
                        onPress={() => setModalOpen(false)}
                        style={styles.x}
                    >
                        {Icons.x}
                    </TouchableOpacity>
                    <Text style={styles.title}>הכנס אירוע</Text>

                    <TextInput
                        style={styles.placeholder}
                        textAlign="right"
                        placeholder="כותרת"
                        onChangeText={(input) =>
                            handleInputChange("title", input)
                        }
                    />

                    <TextInput
                        style={styles.placeholder}
                        textAlign="right"
                        placeholder="תיאור"
                        onChangeText={(input) =>
                            handleInputChange("details", input)
                        }
                    />
                    <Button
                        title="בחר זמן התחלה"
                        onPress={() => setStartDatePickerVisibility(true)}
                    />
                    <Text>{newEvent.startTime.toLocaleString()}</Text>
                    <DateTimePickerModal
                        isVisible={isStartDatePickerVisible}
                        mode="datetime"
                        date={newEvent.startTime}
                        cancelTextIOS="ביטול"
                        confirmTextIOS="אישור"
                        minimumDate={new Date()}
                        onConfirm={handleStartTimeConfirm}
                        onCancel={() => setStartDatePickerVisibility(false)}
                    />

                    <Button
                        title="בחר זמן סיום"
                        onPress={() => setEndDatePickerVisibility(true)}
                    />

                    <Text>{newEvent.endTime.toLocaleString()}</Text>
                    <DateTimePickerModal
                        isVisible={isEndDatePickerVisible}
                        mode="datetime"
                        date={newEvent.startTime}
                        cancelTextIOS="ביטול"
                        confirmTextIOS="אישור"
                        minimumDate={new Date()}
                        onConfirm={handleEndTimeConfirm}
                        onCancel={() => setEndDatePickerVisibility(false)}
                    />

                    <Button
                        title="הוסף אירוע"
                        color={globalStyles.color.purple}
                        onPress={handleSubmitForm}
                    />
                </View>
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
        marginVertical: "50%",
        borderRadius: 24,
        padding: 20,
    },
    placeholder: {
        fontFamily: globalStyles.font.semiBold,
        fontSize: 14,
        lineHeight: 22,
        letterSpacing: 0.1,
        alignItems: "center",
        textAlign: "right",
        color: globalStyles.color.text,
        marginVertical: 3,
    },
    button: {
        position: "absolute",
        left: "10%",
        bottom: "10%",
    },
});

const mapStateToProps = (state: any) => {
    const { user } = state;
    return { user };
};

export default connect(mapStateToProps)(EventsBoardScreen);
