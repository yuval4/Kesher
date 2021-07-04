import React from "react";
import {
    Button,
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
import { useDispatch } from "react-redux";

export default function LoginScreen(props: any) {
    const [email, setEmail] = React.useState("");
    const [password, setPassword] = React.useState("");
    const dispatch = useDispatch();

    //  ANCHOR get token and set it in the async storage.
    const storeData = async (token: any) => {
        try {
            await AsyncStorage.setItem("token", token);
            props.onLogin(token);
        } catch (err) {
            alert(err);
        }
    };

    //  ANCHOR handle parent log in. get token from the server and store it in async storage.
    //  get data from the server about the user(getMe) and sets it in redux. navigate to the app.
    //  if user doesnt found or there is another problem (eg internet connection), alert will be shown and password field get delitted.
    const handleParentLoginRequest = async () => {
        try {
            let response = await api
                .login()
                .login({ email, password, role: "parent" });
            storeData(response.data);

            let getMeRespones = await api.login().getMe();
            dispatch({
                type: "SET_USER",
                data: {
                    name: {
                        first: getMeRespones.data.name.first,
                        last: getMeRespones.data.name.last,
                    },
                    role: getMeRespones.data.role,
                    children: getMeRespones.data.children,
                },
            });
        } catch (err) {
            if (err.message === "Request failed with status code 401") {
                alert("שם משתמש או סיסמה שגויים");
            } else {
                alert(err);
            }
            setPassword("");
        }

        Keyboard.dismiss;
    };

    //  ANCHOR same as parent but for staff's users.
    const handleStaffLoginRequest = async () => {
        try {
            let response = await api
                .login()
                .login({ email, password, role: "staff" });

            storeData(response.data);
            let getMeRespones = await api.login().getMe();
            dispatch({
                type: "SET_USER",
                data: {
                    name: {
                        first: getMeRespones.data.name.first,
                        last: getMeRespones.data.name.last,
                    },
                    role: getMeRespones.data.role,
                    schools: getMeRespones.data.schools,
                },
            });
        } catch (err) {
            if (err.message === "Request failed with status code 401") {
                alert("שם משתמש או סיסמה שגויים");
            } else {
                alert(err);
            }
            setPassword("");
        }

        Keyboard.dismiss;
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
                                placeholder="דואר אלקטרוני"
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
                                placeholder="סיסמה"
                            />

                            <Text
                                style={styles.loginButton}
                                onPress={handleParentLoginRequest}
                            >
                                הורה
                            </Text>
                            <Text
                                style={styles.loginButton}
                                onPress={handleStaffLoginRequest}
                            >
                                צוות
                            </Text>
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
