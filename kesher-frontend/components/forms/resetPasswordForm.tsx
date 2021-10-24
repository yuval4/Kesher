import React from "react";
import { Text, View, TextInput, StyleSheet } from "react-native";
import globalStyles from "../../assets/globalStyles";
import { Controller } from "react-hook-form";
import { useTranslation } from "react-i18next";

export default function ResetPasswordForm({ control, errors }: any) {
    const { t } = useTranslation();

    return (
        <View>
            <View style={styles.inputBox}>
                <Controller
                    control={control}
                    rules={{
                        required: true,
                    }}
                    render={({ field: { onChange, value } }) => (
                        <TextInput
                            style={styles.text}
                            placeholderTextColor="#C4C4C6"
                            placeholder={t("Old Password")}
                            textContentType="password"
                            secureTextEntry={true}
                            onChangeText={onChange}
                            value={value}
                        />
                    )}
                    name="oldPassword"
                    defaultValue=""
                />
                <View style={styles.newPasswordView}>
                    <Controller
                        control={control}
                        rules={{
                            required: true,
                        }}
                        render={({ field: { onChange, value } }) => (
                            <TextInput
                                style={styles.text}
                                placeholderTextColor="#C4C4C6"
                                placeholder={t("New Password")}
                                textContentType="newPassword"
                                secureTextEntry={true}
                                onChangeText={onChange}
                                value={value}
                            />
                        )}
                        name="newPassword"
                        defaultValue=""
                    />

                    <Controller
                        control={control}
                        rules={{
                            required: true,
                        }}
                        render={({ field: { onChange, value } }) => (
                            <TextInput
                                style={styles.text}
                                placeholderTextColor="#C4C4C6"
                                placeholder={t("New Password Again")}
                                textContentType="newPassword"
                                secureTextEntry={true}
                                onChangeText={onChange}
                                value={value}
                            />
                        )}
                        name="newPasswordAgain"
                        defaultValue=""
                    />
                </View>
            </View>

            {(errors.oldPassword ||
                errors.newPassword ||
                errors.newPasswordAgain) && (
                <Text style={styles.text}>אחד הפרטים שגוי</Text>
            )}
        </View>
    );
}

const styles = StyleSheet.create({
    inputBox: {
        // width: "90%",
        // alignSelf: "center",
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
        borderRadius: 12,
        borderWidth: 1,
        borderColor: "#C4C4C6",
        marginBottom: 7,
    },
    newPasswordView: {
        marginTop: 7,
    },
});
