import React, { useState } from "react";
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
import StartReportButton from "../components/buttons/startReportButton";
import DateTimePickerModal from "react-native-modal-datetime-picker";
import { connect } from "react-redux";

function EventsBoardScreen(props: any) {
    const [modalOpen, setModalOpen] = useState(false);
    const [openItem, setOpenItem] = React.useState("");
    const [isDatePickerVisible, setDatePickerVisibility] = useState(false);

    const [newEvent, setNewEvent] = React.useState({
        title: "",
        details: "",
        day: "",
        month: "",
        year: "",
        startTime: "",
        endTime: "",
    });

    //todo add logic and modal to add events
    const DATA = [
        {
            month: "ינואר",
            id: "1",
            data: [
                {
                    title: "חוג חיות",
                    details: "bla",
                    startTimeStamp: "1621373983072",
                    endTimestamp: "1621373983072",
                },
                {
                    title: "פעילות בגן",
                    details: "bla",
                    startTimeStamp: "456789",
                    endTimestamp: "1621373983072",
                },
                {
                    title: "ג'ימבורי",
                    details: "bla",
                    startTimeStamp: "456789",
                    endTimestamp: "1621373983072",
                },
            ],
        },
        {
            month: "פברואר",
            id: "2",
            data: [
                {
                    title: "יום הולדת לאיתמר",
                    details: "bla",
                    startTimeStamp: "1621373983072",
                    endTimestamp: "1621373983072",
                },
                {
                    title: "חופשת חנוכה",
                    details: "bla",
                    startTimeStamp: "456789",
                    endTimestamp: "1621373983072",
                },
                {
                    title: "חזרה מחופשת חנוכה",
                    details: "bla",
                    startTimeStamp: "456789",
                    endTimestamp: "1621373983072",
                },
            ],
        },
        // {
        //   title: 'מרץ',
        //   data: ["Water", "Coke", "Beer"]
        // },
        // {
        //   title: 'אפריל',
        //   data: ["Cheese Cake", "Ice Cream"]
        // }
    ];

    const getDay = (timestamp: string): number => {
        const day = new Date();
        return day.getDate();
    };

    const getHour = (timestamp: string): string => {
        const day = new Date();
        return day.toTimeString().slice(0, 5);
    };

    const toggleItem = (key: string) => {
        if (key === openItem) {
            setOpenItem("");
        } else {
            setOpenItem(key);
        }
    };

    // TODO set it all in the state or use formik or something
    const handleInputChange = (item: string, input: string) => {
        setNewEvent((newEvent) => ({
            ...newEvent,
            title: input,
        }));
        console.log(newEvent);
    };

    const handleTimePickerConfirm = (date: any) => {
        console.warn("A date has been picked: ", date);
        setDatePickerVisibility(false);
    };

    return (
        <View>
            <View style={styles.line}></View>

            <SectionList
                sections={DATA}
                keyExtractor={(item, index) => item.title + index}
                renderItem={(item) => (
                    <View style={styles.item}>
                        <View style={styles.dayCircle}>
                            <Text style={styles.day}>
                                {getDay(item.item.startTimeStamp)}
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
                                {getHour(item.item.startTimeStamp)} -{" "}
                                {getHour(item.item.startTimeStamp)}
                            </Text>
                            {openItem === item.item.title + item.index ? (
                                <Text style={styles.time}>
                                    {item.item.details}
                                </Text>
                            ) : null}
                        </TouchableOpacity>
                    </View>
                )}
                renderSectionHeader={({ section: { month } }) => (
                    <View style={styles.monthItem}>
                        <View style={styles.circle}></View>
                        <Text style={styles.monthText}>{month}</Text>
                    </View>
                )}
            />
            {props.user.role === "staff" ? (
                <StartReportButton onPress={() => setModalOpen(true)} />
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
                    {/* TODO  day, month, year, start time, endtime, title, description */}
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
                            handleInputChange("title", input)
                        }
                    />
                    <Button
                        title="בחר תארך התחלה"
                        onPress={() => setDatePickerVisibility(true)}
                    />
                    <DateTimePickerModal
                        isVisible={isDatePickerVisible}
                        mode="date"
                        onConfirm={handleTimePickerConfirm}
                        onCancel={() => setDatePickerVisibility(false)}
                    />
                </View>
            </Modal>
        </View>
    );
}

const styles = StyleSheet.create({
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
        marginHorizontal: "20%",
        marginVertical: "50%",
    },
    placeholder: {
        color: "pink",
    },
});

const mapStateToProps = (state: any) => {
    const { user } = state;
    return { user };
};

export default connect(mapStateToProps)(EventsBoardScreen);
