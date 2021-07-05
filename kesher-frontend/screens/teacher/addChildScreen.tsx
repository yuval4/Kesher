import { Formik } from "formik";
import React, { useEffect, useState } from "react";
import {
    StyleSheet,
    Text,
    View,
    TextInput,
    Image,
    ScrollView,
    Platform,
} from "react-native";
import { connect } from "react-redux";
import api from "../../api";
import globalStyles from "../../assets/globalStyles";
import Icons from "../../assets/icons/icons";
import SmallButton from "../../components/buttons/smallButton";
import DateTimePickerModal from "react-native-modal-datetime-picker";
import * as ImagePicker from "expo-image-picker";
import { TouchableOpacity } from "react-native-gesture-handler";

function AddChildScreen(props: any) {
    const [isDatePickerVisible, setDatePickerVisibility] = useState(false);
    const [image, setImage] = useState(null);

    useEffect(() => {
        (async () => {
            if (Platform.OS !== "web") {
                const { status } =
                    await ImagePicker.requestMediaLibraryPermissionsAsync();
                if (status !== "granted") {
                    alert(
                        "Sorry, we need camera roll permissions to make this work!"
                    );
                }
            }
        })();
    }, []);

    const createFormData = (photo: any) => {
        const data = new FormData();

        data.append("photo", {
            name: photo.fileName,
            type: photo.type,
            uri:
                Platform.OS === "ios"
                    ? photo.uri.replace("file://", "")
                    : photo.uri,
        });

        return data;
    };

    // const dataForm = new FormData();
    const pickImage = async () => {
        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            allowsEditing: true,
            noData: true,
            aspect: [3, 3],
            quality: 1,
        });
        console.log(result);
        if (!result.cancelled) {
            setImage(result);
        }
    };

    return (
        <ScrollView contentContainerStyle={styles.container}>
            {/* TODO add another parent */}
            <Formik
                initialValues={{
                    childFirstName: "",
                    childLastName: "",
                    // profilePic: "",
                    birthDate: new Date(),
                    parentFirstName: "",
                    parentLastName: "",
                    city: "",
                    street: "",
                    number: "",
                    phoneNumber: "",
                    email: "",
                }}
                onSubmit={async (values) => {
                    values.school = props.user.schools[0];
                    values.image = createFormData(image);
                    const childId = await api.children().createChild(values);
                    await api
                        .schools()
                        .addChildToSchool(values.school, childId.data);
                    await api.parents().createParent(values, childId.data);
                    alert("הפרטים הוכנסו");
                }}
            >
                {(props) => (
                    <View style={styles.container}>
                        <View style={styles.childBox}>
                            <TouchableOpacity
                                style={styles.box}
                                onPress={pickImage}
                            >
                                <Image
                                    source={
                                        image
                                            ? { uri: image.uri }
                                            : require("../../assets/images/user.png")
                                    }
                                    style={styles.image}
                                />

                                <Text style={styles.childName}>
                                    הוספת תמונה
                                </Text>
                            </TouchableOpacity>
                        </View>
                        <View style={styles.titleView}>
                            {Icons.plus}
                            <Text style={styles.title}>עדכן/י פרטי ילד/ה</Text>
                        </View>
                        <View style={styles.inputBox}>
                            <TextInput
                                style={[styles.text, styles.divider]}
                                placeholderTextColor="#C4C4C6"
                                placeholder="שם פרטי"
                                onChangeText={props.handleChange(
                                    "childFirstName"
                                )}
                                value={props.values.childFirstName}
                            />
                            <TextInput
                                style={[styles.text, styles.divider]}
                                placeholderTextColor="#C4C4C6"
                                placeholder="שם משפחה"
                                onChangeText={props.handleChange(
                                    "childLastName"
                                )}
                                value={props.values.childLastName}
                            />
                            <View style={styles.date}>
                                <Text
                                    onPress={() =>
                                        setDatePickerVisibility(true)
                                    }
                                    style={styles.text}
                                >
                                    תאריך לידה
                                </Text>
                                <Text style={styles.text}>
                                    {new Date(
                                        props.values.birthDate.toString()
                                    ).toLocaleDateString()}
                                </Text>
                            </View>

                            <DateTimePickerModal
                                isVisible={isDatePickerVisible}
                                mode="date"
                                date={props.values.birthDate}
                                cancelTextIOS="ביטול"
                                confirmTextIOS="אישור"
                                maximumDate={new Date()}
                                // onConfirm={props.handleChange("birthDate")}
                                onConfirm={(date) => {
                                    props.values.birthDate = date;
                                    setDatePickerVisibility(false);
                                    props.handleChange("birthDate");
                                }}
                                onCancel={() => setDatePickerVisibility(false)}
                            />
                        </View>

                        <View style={styles.titleView}>
                            {Icons.plus}
                            <Text style={styles.title}>עדכן/י פרטי הורה</Text>
                        </View>

                        <View style={styles.inputBox}>
                            <TextInput
                                style={[styles.text, styles.divider]}
                                placeholderTextColor="#C4C4C6"
                                placeholder="שם פרטי"
                                onChangeText={props.handleChange(
                                    "parentFirstName"
                                )}
                                value={props.values.parentFirstName}
                            />
                            <TextInput
                                style={[styles.text, styles.divider]}
                                placeholderTextColor="#C4C4C6"
                                placeholder="שם משפחה"
                                onChangeText={props.handleChange(
                                    "parentLastName"
                                )}
                                value={props.values.parentLastName}
                            />
                            <TextInput
                                style={[styles.text, styles.divider]}
                                placeholderTextColor="#C4C4C6"
                                placeholder="עיר"
                                onChangeText={props.handleChange("city")}
                                value={props.values.city}
                            />
                            <TextInput
                                style={[styles.text, styles.divider]}
                                placeholderTextColor="#C4C4C6"
                                placeholder="רחוב"
                                onChangeText={props.handleChange("street")}
                                value={props.values.street}
                            />
                            <TextInput
                                style={[styles.text, styles.divider]}
                                placeholderTextColor="#C4C4C6"
                                placeholder="מספר בית"
                                onChangeText={props.handleChange("number")}
                                value={props.values.number}
                                keyboardType="numeric"
                            />
                            <TextInput
                                style={[styles.text, styles.divider]}
                                placeholderTextColor="#C4C4C6"
                                placeholder="מספר טלפון"
                                onChangeText={props.handleChange("phoneNumber")}
                                value={props.values.phoneNumber}
                                keyboardType="numeric"
                            />
                            <TextInput
                                style={styles.text}
                                placeholderTextColor="#C4C4C6"
                                placeholder="דואר אלקטרוני"
                                onChangeText={props.handleChange("email")}
                                value={props.values.email}
                                keyboardType="email-address"
                            />
                        </View>

                        <SmallButton
                            text="אישור"
                            onPress={props.handleSubmit}
                        />
                    </View>
                )}
            </Formik>
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    container: {
        alignItems: "center",
        paddingTop: 30,
        width: "100%",
        backgroundColor: "#F6F6F9",
    },
    childBox: {
        height: 96,
        width: "90%",
        borderRadius: 12,
        shadowOffset: {
            width: 0,
            height: 0,
        },
        shadowOpacity: 0.2,
        shadowRadius: 20,
        elevation: 4,
        backgroundColor: "white",
    },
    box: {
        top: -40,
    },
    image: {
        borderRadius: 50,
        width: 80,
        height: 80,
        alignSelf: "center",
    },
    childName: {
        fontFamily: globalStyles.font.semiBold,
        fontSize: 16,
        lineHeight: 24,
        letterSpacing: 0.1,
        textAlign: "center",
        alignItems: "center",
        display: "flex",
    },
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
    subTitle: {
        color: globalStyles.color.text,
        fontFamily: globalStyles.font.semiBold,
    },
    inputBox: {
        width: "90%",
        backgroundColor: "white",
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
    date: {
        flexDirection: "row-reverse",
    },
    divider: {
        borderBottomWidth: 1,
        borderBottomColor: "#C4C4C6",
    },
});

const mapStateToProps = (state: any) => {
    const { user } = state;
    return { user };
};

export default connect(mapStateToProps)(AddChildScreen);
