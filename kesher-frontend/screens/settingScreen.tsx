import AsyncStorage from "@react-native-async-storage/async-storage";
import React from "react";
import { useTranslation } from "react-i18next";
import { StyleSheet, Text, TextInput, View } from "react-native";
import SwitchSelector from "react-native-switch-selector";
import globalStyles from "../assets/globalStyles";

export default function SettingScreen() {
    const { t, i18n } = useTranslation();

    const options = [
        { label: "English", value: "en" },
        // { label: "01:30", value: "ar" },
        { label: "עברית", value: "he" },
    ];

    const handleChangeLanguage = async (language: string) => {
        await AsyncStorage.setItem("language", language);
        i18n.changeLanguage(language);
    };

    const getLanguage = async () => {
        const lang = await AsyncStorage.getItem("language");
        options.findIndex((item, index) => {
            if (item.value == lang) {
                return index;
            }
        });
        return 0;
    };

    return (
        <View style={styles.container}>
            <SwitchSelector
                // initial={getLanguage}
                // initial={0}
                onPress={handleChangeLanguage}
                backgroundColor={globalStyles.color.purple}
                borderColor={globalStyles.color.purple}
                buttonColor="white"
                selectedColor={globalStyles.color.text}
                textColor="white"
                selectedTextStyle={{ fontFamily: globalStyles.font.semiBold }}
                textStyle={{ fontFamily: globalStyles.font.semiBold }}
                height={50}
                hasPadding
                options={options}
            />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center",
    },
});
