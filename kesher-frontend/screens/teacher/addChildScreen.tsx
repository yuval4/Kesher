import { Formik } from "formik";
import React, { useEffect, useState } from "react";
import {
    StyleSheet,
    Text,
    View,
    TextInput,
    Image,
    ScrollView,
} from "react-native";
import api from "../../api";
import globalStyles from "../../assets/globalStyles";
import Icons from "../../assets/icons/icons";
import SmallButton from "../../components/buttons/smallButton";
import DateTimePickerModal from "react-native-modal-datetime-picker";
import { TouchableOpacity } from "react-native-gesture-handler";
import {
    createFormData,
    getMediaLibraryPermission,
    pickImage,
} from "../../utils/utils";
import { useAppSelector } from "../../app/hooks";

export default function AddChildScreen() {
    const [isDatePickerVisible, setDatePickerVisibility] = useState(false);
    const [image, setImage] = useState(null);
    const school = useAppSelector((state) => state.user.currentSchool);

    useEffect(() => {
        getMediaLibraryPermission();
    }, []);

    const handlePickImage = async () => {
        setImage(await pickImage());
    };

    return (
        <ScrollView contentContainerStyle={styles.container}>
            {/* TODO add another parent */}
            <Formik
                initialValues={{
                    childFirstName: "",
                    childLastName: "",
                    birthDate: new Date(),

                    firstParentFirstName: "",
                    firstParentLastName: "",
                    firstParentCity: "",
                    firstParentStreet: "",
                    firstParentNumber: "",
                    firstParentPhoneNumber: "",
                    firstParentEmail: "",

                    secondParentFirstName: "",
                    secondParentLastName: "",
                    secondParentCity: "",
                    secondParentStreet: "",
                    secondParentNumber: "",
                    secondParentPhoneNumber: "",
                    secondParentEmail: "",
                }}
                onSubmit={async (values) => {
                    values.school = school;
                    const childId = await api.children().createChild(
                        createFormData(image, {
                            childFirstName: values.childFirstName,
                            childLastName: values.childLastName,
                            birthDate: values.birthDate.toString(),
                            school: values.school,
                        })
                    );
                    await api
                        .schools()
                        .addChildToSchool(values.school, childId.data);

                    await api.parents().createParent(values, childId.data);

                    if (values.secondParentFirstName != "") {
                        if (values.secondParentCity != "") {
                            values.secondParentCity = values.firstParentCity;
                            values.secondParentStreet =
                                values.firstParentStreet;
                            values.secondParentNumber =
                                values.firstParentNumber;
                        }
                        await api.parents().createParent(values, childId.data);
                    }

                    await api.reports().createNewReport(childId.data);
                    alert("הפרטים הוכנסו");
                }}
            >
                {(props) => (
                    <View style={styles.container}>
                        <View style={styles.childBox}>
                            <TouchableOpacity
                                style={styles.box}
                                onPress={handlePickImage}
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
                        <ScrollView style={styles.scrollContainer}>
                            <View style={styles.titleView}>
                                {Icons.plus}
                                <Text style={styles.title}>
                                    עדכן/י פרטי ילד/ה
                                </Text>
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
                                    onCancel={() =>
                                        setDatePickerVisibility(false)
                                    }
                                />
                            </View>

                            <View style={styles.titleView}>
                                {Icons.plus}
                                <Text style={styles.title}>
                                    עדכן/י פרטי הורה
                                </Text>
                            </View>

                            <View style={styles.inputBox}>
                                <TextInput
                                    style={[styles.text, styles.divider]}
                                    placeholderTextColor="#C4C4C6"
                                    placeholder="שם פרטי"
                                    onChangeText={props.handleChange(
                                        "firstParentFirstName"
                                    )}
                                    value={props.values.firstParentFirstName}
                                />
                                <TextInput
                                    style={[styles.text, styles.divider]}
                                    placeholderTextColor="#C4C4C6"
                                    placeholder="שם משפחה"
                                    onChangeText={props.handleChange(
                                        "firstParentLastName"
                                    )}
                                    value={props.values.firstParentLastName}
                                />
                                <TextInput
                                    style={[styles.text, styles.divider]}
                                    placeholderTextColor="#C4C4C6"
                                    placeholder="עיר"
                                    onChangeText={props.handleChange(
                                        "firstParentCity"
                                    )}
                                    value={props.values.firstParentCity}
                                />
                                <TextInput
                                    style={[styles.text, styles.divider]}
                                    placeholderTextColor="#C4C4C6"
                                    placeholder="רחוב"
                                    onChangeText={props.handleChange(
                                        "firstParentStreet"
                                    )}
                                    value={props.values.firstParentStreet}
                                />
                                <TextInput
                                    style={[styles.text, styles.divider]}
                                    placeholderTextColor="#C4C4C6"
                                    placeholder="מספר בית"
                                    onChangeText={props.handleChange(
                                        "firstParentNumber"
                                    )}
                                    value={props.values.firstParentNumber}
                                    keyboardType="numeric"
                                />
                                <TextInput
                                    style={[styles.text, styles.divider]}
                                    placeholderTextColor="#C4C4C6"
                                    placeholder="מספר טלפון"
                                    onChangeText={props.handleChange(
                                        "firstParentPhoneNumber"
                                    )}
                                    value={props.values.firstParentPhoneNumber}
                                    keyboardType="numeric"
                                />
                                <TextInput
                                    style={styles.text}
                                    placeholderTextColor="#C4C4C6"
                                    placeholder="דואר אלקטרוני"
                                    onChangeText={props.handleChange(
                                        "firstParentEmail"
                                    )}
                                    value={props.values.firstParentEmail}
                                    keyboardType="email-address"
                                />
                            </View>

                            <View style={styles.titleView}>
                                {Icons.plus}
                                <Text style={styles.title}>
                                    עדכן/י פרטי הורה נוסף
                                </Text>
                            </View>

                            <View style={styles.inputBox}>
                                <TextInput
                                    style={[styles.text, styles.divider]}
                                    placeholderTextColor="#C4C4C6"
                                    placeholder="שם פרטי"
                                    onChangeText={props.handleChange(
                                        "secondParentFirstName"
                                    )}
                                    value={props.values.secondParentFirstName}
                                />
                                <TextInput
                                    style={[styles.text, styles.divider]}
                                    placeholderTextColor="#C4C4C6"
                                    placeholder="שם משפחה"
                                    onChangeText={props.handleChange(
                                        "secondParentLastName"
                                    )}
                                    value={props.values.secondParentLastName}
                                />
                                <TextInput
                                    style={[styles.text, styles.divider]}
                                    placeholderTextColor="#C4C4C6"
                                    placeholder="עיר"
                                    onChangeText={props.handleChange(
                                        "secondParentCity"
                                    )}
                                    value={props.values.secondParentCity}
                                />
                                <TextInput
                                    style={[styles.text, styles.divider]}
                                    placeholderTextColor="#C4C4C6"
                                    placeholder="רחוב"
                                    onChangeText={props.handleChange(
                                        "secondParentStreet"
                                    )}
                                    value={props.values.secondParentStreet}
                                />
                                <TextInput
                                    style={[styles.text, styles.divider]}
                                    placeholderTextColor="#C4C4C6"
                                    placeholder="מספר בית"
                                    onChangeText={props.handleChange(
                                        "secondParentNumber"
                                    )}
                                    value={props.values.secondParentNumber}
                                    keyboardType="numeric"
                                />
                                <TextInput
                                    style={[styles.text, styles.divider]}
                                    placeholderTextColor="#C4C4C6"
                                    placeholder="מספר טלפון"
                                    onChangeText={props.handleChange(
                                        "secondParentPhoneNumber"
                                    )}
                                    value={props.values.secondParentPhoneNumber}
                                    keyboardType="numeric"
                                />
                                <TextInput
                                    style={styles.text}
                                    placeholderTextColor="#C4C4C6"
                                    placeholder="דואר אלקטרוני"
                                    onChangeText={props.handleChange(
                                        "secondParentEmail"
                                    )}
                                    value={props.values.secondParentEmail}
                                    keyboardType="email-address"
                                />
                            </View>
                            <Text
                                style={styles.copy}
                                onPress={() => (
                                    props.setFieldValue(
                                        "secondParentCity",
                                        props.values.firstParentCity
                                    ),
                                    props.setFieldValue(
                                        "secondParentStreet",
                                        props.values.firstParentStreet
                                    ),
                                    props.setFieldValue(
                                        "secondParentNumber",
                                        props.values.firstParentNumber
                                    )
                                )}
                            >
                                העתק כתובת
                            </Text>

                            <SmallButton
                                style={styles.submitButton}
                                text="אישור"
                                onPress={props.handleSubmit}
                            />
                        </ScrollView>
                    </View>
                )}
            </Formik>
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
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
    date: {
        flexDirection: "row-reverse",
    },
    divider: {
        borderBottomWidth: 1,
        borderBottomColor: "#C4C4C6",
    },
    scrollContainer: {
        flex: 1,
        width: "100%",
        alignContent: "center",
    },
    copy: {
        fontFamily: globalStyles.font.regular,
        fontSize: 16,
        lineHeight: 24,
        letterSpacing: 0.1,
        textAlign: "right",
        alignItems: "center",
        color: globalStyles.color.text,
        opacity: 0.5,
        textDecorationLine: "underline",
        margin: 4,
        paddingRight: 10,
    },
    submitButton: {
        alignItems: "center",
    },
});
