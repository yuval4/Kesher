import AsyncStorage from "@react-native-async-storage/async-storage";
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";
import {
    Keyboard,
    StyleSheet,
    Text,
    TouchableWithoutFeedback,
    View,
} from "react-native";
import SwitchSelector from "react-native-switch-selector";
import api from "../api";
import globalStyles from "../assets/globalStyles";
import SmallButton from "../components/buttons/smallButton";
import ResetPasswordForm from "../components/forms/resetPasswordForm";

export default function SettingScreen() {
    const { t, i18n } = useTranslation();
    const [language, setLanguage] = useState(0);
    const {
        control,
        handleSubmit,
        reset,
        formState: { errors },
    } = useForm();

    const options = [
        { label: "English", value: "en" },
        { label: "العربية", value: "ar" },
        { label: "עברית", value: "he" },
    ];

    useEffect(() => {
        getLanguage();
    }, []);

    const handleChangeLanguage = async (language: string) => {
        await AsyncStorage.setItem("language", language);
        i18n.changeLanguage(language);
    };

    const getLanguage = async () => {
        const lang = await AsyncStorage.getItem("language");
        const langIndex = options.findIndex((item) => item.value === lang);
        setLanguage(langIndex === -1 ? 0 : langIndex);
    };

    const handleChangePassword = async (data: any) => {
        //TODO
        // check the password is string enoght
        // check the old password matches the db
        // check the new passwords are the matches.
        // send the server the user_id, old password and new password, check the user and update.

        await api.users().changePassword(data);
        reset();
        alert(t("Password Changed Seccessfully"));
    };

    return (
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
            <View style={styles.container}>
                <Text style={styles.title}>{t("Reset Password")}</Text>
                <ResetPasswordForm control={control} errors={errors} />
                <SmallButton
                    text={t("Confirm")}
                    onPress={handleSubmit(handleChangePassword)}
                />
                <SwitchSelector
                    initial={language}
                    value={language}
                    onPress={handleChangeLanguage}
                    backgroundColor={globalStyles.color.purple}
                    borderColor={globalStyles.color.purple}
                    buttonColor="white"
                    selectedColor={globalStyles.color.text}
                    textColor="white"
                    selectedTextStyle={{
                        fontFamily: globalStyles.font.semiBold,
                    }}
                    textStyle={{ fontFamily: globalStyles.font.semiBold }}
                    height={50}
                    hasPadding
                    options={options}
                />
            </View>
        </TouchableWithoutFeedback>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        width: "90%",
        alignSelf: "center",
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
        paddingTop: 30,
        paddingBottom: 10,
    },
});
