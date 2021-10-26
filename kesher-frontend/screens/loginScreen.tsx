import React, { useState } from "react";
import {
    TouchableOpacity,
    ImageBackground,
    KeyboardAvoidingView,
    StyleSheet,
    Platform,
    TextInput,
    View,
    Keyboard,
    TouchableWithoutFeedback,
    Text,
} from "react-native";
import api from "../api";
import globalStyles from "../assets/globalStyles";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useAppDispatch } from "../app/hooks";
import {
    setUser,
    updateCurrentChild,
    updateCurrentSchool,
} from "../features/user/user-slice";
import { useTranslation } from "react-i18next";

export default function LoginScreen() {
    const { t } = useTranslation();
    const [email, setEmail] = React.useState("");
    const [password, setPassword] = React.useState("");
    const dispatch = useAppDispatch();
    const [tryLoginCounter, setTryLoginCounter] = useState(0);

    //  ANCHOR handle parent log in. get token from the server and store it in async storage.
    //  get data from the server about the user(getMe) and sets it in redux. navigate to the app.
    //  if user doesnt found or there is another problem (eg internet connection), alert will be shown and password field get delitted.
    const handleLoginRequest = async () => {
        setTryLoginCounter(tryLoginCounter + 1);
        try {
            let response = await api.login().login({ email, password });
            await AsyncStorage.setItem("token", response.data);
            let getMeRespones = await api.login().getMe();

            dispatch(
                setUser({
                    name: getMeRespones.data.name,
                    role: getMeRespones.data.role,
                    children: getMeRespones.data.children,
                    schools: getMeRespones.data.schools,
                })
            );
            if (getMeRespones.data.role === "Parent") {
                dispatch(
                    updateCurrentChild({
                        currentChild: getMeRespones.data.children[0],
                    })
                );
            } else if (
                getMeRespones.data.role === "Teacher" ||
                getMeRespones.data.role === "Admin"
            ) {
                dispatch(
                    updateCurrentSchool({
                        currentSchool: getMeRespones.data.schools[0],
                    })
                );
            }
        } catch (err: any) {
            if (err.message === "Request failed with status code 401") {
                alert(t("Incorrect Username Or Password"));
            } else {
                alert(err);
                console.log(err);
            }
            setPassword("");
        }
        Keyboard.dismiss;
    };

    const setTimer = () => {
        setInterval(() => {
            setTryLoginCounter(0);
        }, 1000 * 60);
    };

    return (
        <KeyboardAvoidingView
            behavior={Platform.OS === "ios" ? "padding" : "height"}
            style={styles.container}
        >
            <ImageBackground
                source={require("../assets/images/splash.png")}
                style={styles.image}
            >
                <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
                    <View style={styles.inner}>
                        <View style={styles.form}>
                            <TextInput
                                style={styles.input}
                                onChangeText={setEmail}
                                value={email}
                                textContentType="username"
                                placeholderTextColor="#8A8D90"
                                placeholder={t("Email")}
                                keyboardType="email-address"
                                autoCapitalize="none"
                            />
                            <TextInput
                                style={styles.input}
                                onChangeText={setPassword}
                                value={password}
                                textContentType="password"
                                secureTextEntry={true}
                                placeholderTextColor="#8A8D90"
                                placeholder={t("password")}
                            />

                            {tryLoginCounter > 4 ? (
                                <View>
                                    {setTimer()}
                                    <Text style={styles.loginButton}>
                                        {t("Try Again Later")}
                                    </Text>
                                </View>
                            ) : (
                                <TouchableOpacity onPress={handleLoginRequest}>
                                    <Text style={styles.loginButton}>
                                        {t("login")}
                                    </Text>
                                </TouchableOpacity>
                            )}
                        </View>
                    </View>
                </TouchableWithoutFeedback>
            </ImageBackground>
        </KeyboardAvoidingView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    image: {
        flex: 1,
        resizeMode: "cover",
        alignItems: "center",
    },
    form: {
        width: "100%",
        top: "27%",
        alignItems: "center",
    },
    input: {
        height: 48,
        width: 310,
        color: globalStyles.color.purple,
        margin: 12,
        backgroundColor: "white",
        borderRadius: 24,
        textAlign: "center",
        fontFamily: globalStyles.font.semiBold,
        shadowOffset: {
            width: 0,
            height: 3,
        },
        shadowOpacity: 0.2,
        shadowRadius: 36,
    },
    inner: {
        flex: 1,
        justifyContent: "space-around",
    },
    loginButton: {
        color: "white",
        letterSpacing: 0.1,
        textAlign: "center",
        alignItems: "center",
        lineHeight: 24,
        fontSize: 16,
        fontFamily: globalStyles.font.semiBold,
        marginTop: 5,
        textDecorationLine: "underline",
    },
});
