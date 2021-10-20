import React, { useState } from "react";
import {
    Text,
    View,
    TextInput,
    StyleSheet,
    TouchableOpacity,
    Switch,
} from "react-native";
import globalStyles from "../../assets/globalStyles";
import Icons from "../../assets/icons/icons";
import { Controller } from "react-hook-form";
import DateTimePickerModal from "react-native-modal-datetime-picker";
import NewEventIcon from "../../assets/icons/newEventIcon";

export default function AddEventForm({ control, errors, title }: any) {
    const [isStartDatePickerVisible, setStartDatePickerVisibility] =
        useState(false);
    const [isEndDatePickerVisible, setEndDatePickerVisibility] =
        useState(false);
    const [isFullDay, setIsFullDay] = useState(true);
    const toggleSwitch = () => setIsFullDay((previousState) => !previousState);

    return (
        <View>
            <View style={styles.titleView}>
                <NewEventIcon />

                <Text style={styles.title}>{title}</Text>
            </View>
            <View style={styles.box}>
                <Controller
                    control={control}
                    rules={{
                        required: true,
                    }}
                    render={({ field: { onChange, value } }) => (
                        <TextInput
                            style={[styles.text, styles.divider]}
                            placeholderTextColor="#C4C4C6"
                            placeholder="כותרת האירוע"
                            onChangeText={onChange}
                            value={value}
                        />
                    )}
                    name="title"
                    defaultValue=""
                />

                <Controller
                    control={control}
                    render={({ field: { onChange, value } }) => (
                        <TextInput
                            style={[styles.text, styles.divider]}
                            placeholderTextColor="#C4C4C6"
                            placeholder="תיאור"
                            onChangeText={onChange}
                            value={value}
                            multiline
                        />
                    )}
                    name="details"
                    defaultValue=""
                />

                <View style={[styles.setTime, styles.divider]}>
                    <Text style={styles.text}>יום שלם</Text>
                    <Switch
                        trackColor={{
                            false: "#767577",
                            true: globalStyles.color.mediumPurplel,
                        }}
                        thumbColor="#f4f3f4"
                        ios_backgroundColor="#3e3e3e"
                        onValueChange={toggleSwitch}
                        value={isFullDay}
                    />
                </View>

                <Controller
                    control={control}
                    rules={{
                        required: true,
                    }}
                    render={({ field: { onChange, value } }) => (
                        <View>
                            <TouchableOpacity
                                onPress={() =>
                                    setStartDatePickerVisibility(true)
                                }
                                style={styles.setTime}
                            >
                                <Text style={styles.text}>התחלה</Text>
                                {value && (
                                    <Text style={styles.text}>
                                        {value.toLocaleDateString()}
                                        {"     "}
                                        {value
                                            .toLocaleTimeString()
                                            .substring(0, 5)}
                                    </Text>
                                )}
                            </TouchableOpacity>
                            <DateTimePickerModal
                                isVisible={isStartDatePickerVisible}
                                mode={isFullDay ? "date" : "datetime"}
                                date={value}
                                cancelTextIOS="ביטול"
                                confirmTextIOS="אישור"
                                minimumDate={new Date()}
                                onConfirm={(date) => {
                                    setStartDatePickerVisibility(false);
                                    onChange(date);
                                }}
                                onCancel={() =>
                                    setStartDatePickerVisibility(false)
                                }
                            />
                        </View>
                    )}
                    name="startTime"
                />
                {!isFullDay && (
                    <Controller
                        control={control}
                        rules={{
                            required: true,
                        }}
                        render={({ field: { onChange, value } }) => (
                            <View>
                                <TouchableOpacity
                                    onPress={() =>
                                        setEndDatePickerVisibility(true)
                                    }
                                    style={styles.setTime}
                                >
                                    <Text style={styles.text}>סיום</Text>
                                    {value && (
                                        <Text style={styles.text}>
                                            {value.toLocaleDateString()}
                                            {"     "}
                                            {value
                                                .toLocaleTimeString()
                                                .substring(0, 5)}
                                        </Text>
                                    )}
                                </TouchableOpacity>
                                <DateTimePickerModal
                                    isVisible={isEndDatePickerVisible}
                                    mode="datetime"
                                    date={value}
                                    cancelTextIOS="ביטול"
                                    confirmTextIOS="אישור"
                                    minimumDate={new Date()}
                                    onConfirm={(date) => {
                                        setEndDatePickerVisibility(false);
                                        onChange(date);
                                    }}
                                    onCancel={() =>
                                        setEndDatePickerVisibility(false)
                                    }
                                />
                            </View>
                        )}
                        name="endTime"
                    />
                )}
            </View>

            {(errors.title ||
                errors.details ||
                errors.startTime ||
                errors.endTime) && (
                <Text style={styles.text}>אחד הפרטים שגוי</Text>
            )}
        </View>
    );
}

const styles = StyleSheet.create({
    titleView: {
        alignSelf: "flex-end",
        marginBottom: 10,
        marginHorizontal: "5%",
        alignItems: "center",
    },
    title: {
        color: globalStyles.color.text,
        fontFamily: globalStyles.font.semiBold,
        fontSize: 20,
        lineHeight: 24,
        letterSpacing: 0.1,
        textAlign: "right",
        alignItems: "center",
        display: "flex",
        paddingTop: 15,
    },
    box: {
        borderWidth: 1,
        borderColor: "#C4C4C6",
        borderRadius: 12,
    },
    text: {
        fontFamily: globalStyles.font.regular,
        fontSize: 16,
        lineHeight: 24,
        letterSpacing: 0.1,
        textAlign: "right",
        alignItems: "center",
        display: "flex",
        color: globalStyles.color.text,
        padding: 8,
    },
    divider: {
        borderBottomWidth: 1,
        borderBottomColor: "#C4C4C6",
    },
    setTime: {
        flexDirection: "row-reverse",
    },
});
