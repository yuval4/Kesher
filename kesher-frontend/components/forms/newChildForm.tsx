import React, { useState } from "react";
import {
    Text,
    View,
    TextInput,
    StyleSheet,
    TouchableOpacity,
} from "react-native";
import globalStyles from "../../assets/globalStyles";
import Icons from "../../assets/icons/icons";
import { Controller } from "react-hook-form";
import DateTimePickerModal from "react-native-modal-datetime-picker";

export default function NewChildForm({ control, errors, title, name }: any) {
    const [isDatePickerVisible, setDatePickerVisibility] = useState(false);

    return (
        <View>
            <View style={styles.titleView}>
                {Icons.plus}
                <Text style={styles.title}>{title}</Text>
            </View>
            <View style={styles.inputBox}>
                <Controller
                    control={control}
                    rules={{
                        required: true,
                        minLength: 2,
                        pattern: /^[א-ת]+$/,
                    }}
                    render={({ field: { onChange, value } }) => (
                        <TextInput
                            style={[styles.text, styles.divider]}
                            placeholderTextColor="#C4C4C6"
                            placeholder="שם פרטי"
                            onChangeText={onChange}
                            value={value}
                        />
                    )}
                    name={`${name}FirstName`}
                    defaultValue=""
                />

                <Controller
                    control={control}
                    rules={{
                        required: true,
                        minLength: 2,
                        pattern: /^[א-ת]+$/,
                    }}
                    render={({ field: { onChange, value } }) => (
                        <TextInput
                            style={[styles.text, styles.divider]}
                            placeholderTextColor="#C4C4C6"
                            placeholder="שם משפחה"
                            onChangeText={onChange}
                            value={value}
                        />
                    )}
                    name={`${name}LastName`}
                    defaultValue=""
                />

                <Controller
                    control={control}
                    rules={{
                        required: true,
                    }}
                    render={({ field: { onChange, value } }) => (
                        <View>
                            <TouchableOpacity
                                onPress={() => setDatePickerVisibility(true)}
                            >
                                <Text style={styles.text}>תאריך לידה</Text>
                                {value && (
                                    <Text style={styles.text}>
                                        {new Date(
                                            value.toString()
                                        ).toLocaleDateString()}
                                    </Text>
                                )}
                            </TouchableOpacity>

                            <DateTimePickerModal
                                isVisible={isDatePickerVisible}
                                mode="date"
                                date={value}
                                cancelTextIOS="ביטול"
                                confirmTextIOS="אישור"
                                maximumDate={new Date()}
                                onConfirm={(date) => {
                                    setDatePickerVisibility(false);
                                    onChange(date);
                                }}
                                onCancel={() => setDatePickerVisibility(false)}
                            />
                        </View>
                    )}
                    name={`${name}BirthDate`}
                />
            </View>

            {(errors[`${name}FirstName`] ||
                errors[`${name}LastName`] ||
                errors[`${name}BirthDate`]) && (
                <Text style={styles.text}>אחד הפרטים שגוי</Text>
            )}
        </View>
    );
}

const styles = StyleSheet.create({
    titleView: {
        flexDirection: "row-reverse",
        alignSelf: "flex-end",
        marginBottom: 10,
        marginTop: 20,
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
        marginRight: 6,
    },
    inputBox: {
        width: "90%",
        backgroundColor: "white",
        borderRadius: 12,
        alignSelf: "center",
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
    submitButton: {
        alignItems: "center",
    },
});
