import React from "react";
import { Text, View, TextInput, StyleSheet } from "react-native";
import globalStyles from "../../assets/globalStyles";
import Icons from "../../assets/icons/icons";
import { Controller } from "react-hook-form";
import validator from "validator";

export default function NewUserForm({ control, errors, title, name }: any) {
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
                        minLength: 2,
                        maxLength: 100,
                        pattern: /^[א-ת]+$/,
                    }}
                    render={({ field: { onChange, value } }) => (
                        <TextInput
                            style={[styles.text, styles.divider]}
                            placeholderTextColor="#C4C4C6"
                            placeholder="עיר"
                            onChangeText={onChange}
                            value={value}
                        />
                    )}
                    name={`${name}City`}
                    defaultValue=""
                />
                <Controller
                    control={control}
                    rules={{
                        required: true,
                        minLength: 2,
                        maxLength: 100,
                        pattern: /^[א-ת]+$/,
                    }}
                    render={({ field: { onChange, value } }) => (
                        <TextInput
                            style={[styles.text, styles.divider]}
                            placeholderTextColor="#C4C4C6"
                            placeholder="רחוב"
                            onChangeText={onChange}
                            value={value}
                        />
                    )}
                    name={`${name}Street`}
                    defaultValue=""
                />
                <Controller
                    control={control}
                    rules={{
                        required: true,
                        minLength: 1,
                        maxLength: 100,
                        validate: (value) => !isNaN(value),
                    }}
                    render={({ field: { onChange, value } }) => (
                        <TextInput
                            style={[styles.text, styles.divider]}
                            placeholderTextColor="#C4C4C6"
                            placeholder="מספר"
                            onChangeText={onChange}
                            value={value}
                            keyboardType="numeric"
                        />
                    )}
                    name={`${name}Number`}
                    defaultValue=""
                />

                <Controller
                    control={control}
                    rules={{
                        required: true,
                        minLength: 10,
                        maxLength: 10,
                        validate: (value) => !isNaN(value),
                    }}
                    render={({ field: { onChange, value } }) => (
                        <TextInput
                            style={[styles.text, styles.divider]}
                            placeholderTextColor="#C4C4C6"
                            placeholder="מספר טלפון"
                            onChangeText={onChange}
                            value={value}
                            keyboardType="numeric"
                        />
                    )}
                    name={`${name}PhoneNumber`}
                    defaultValue=""
                />

                <Controller
                    control={control}
                    rules={{
                        required: true,
                        validate: (value) => validator.isEmail(value),
                    }}
                    render={({ field: { onChange, value } }) => (
                        <TextInput
                            style={styles.text}
                            placeholderTextColor="#C4C4C6"
                            placeholder="דואר אלקטרוני"
                            onChangeText={onChange}
                            value={value}
                            keyboardType="email-address"
                            autoCapitalize="none"
                        />
                    )}
                    name={`${name}Email`}
                    defaultValue=""
                />
            </View>

            {(errors[`${name}FirstName`] ||
                errors[`${name}LastName`] ||
                errors[`${name}City`] ||
                errors[`${name}Street`] ||
                errors[`${name}Number`] ||
                errors[`${name}PhoneNumber`] ||
                errors[`${name}Email`]) && (
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
