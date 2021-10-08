import React from "react";
import { StyleSheet, Text, TextInput, View } from "react-native";
import { Formik } from "formik";
import Icons from "../../assets/icons/icons";
import globalStyles from "../../assets/globalStyles";
import SmallButton from "../../components/buttons/smallButton";
import api from "../../api";

export default function AddNewSchoolScreen() {
    return (
        <View style={styles.container}>
            <Formik
                initialValues={{
                    schoolName: "",
                    schoolCity: "",
                    schoolStreet: "",
                    schoolNumber: "",

                    teacherFirstName: "",
                    teacherLastName: "",
                    teacherCity: "",
                    teacherStreet: "",
                    teacherNumber: "",
                    teacherPhoneNumber: "",
                    teacherEmail: "",
                }}
                onSubmit={async (values) => {
                    const schoolId = await api
                        .schools()
                        .createNewSchool(values);
                    await api.users().createNewTeacher(values, schoolId);

                    // values.school = school;
                    // const childId = await api.children().createChild(
                    //     createFormData(image, {
                    //         childFirstName: values.childFirstName,
                    //         childLastName: values.childLastName,
                    //         birthDate: values.birthDate.toString(),
                    //         school: values.school,
                    //     })
                    // );
                    // await api
                    //     .schools()
                    //     .addChildToSchool(values.school, childId.data);

                    // await api.parents().createParent(values, childId.data);

                    // if (values.secondParentFirstName != "") {
                    //     if (values.secondParentCity != "") {
                    //         values.secondParentCity = values.firstParentCity;
                    //         values.secondParentStreet =
                    //             values.firstParentStreet;
                    //         values.secondParentNumber =
                    //             values.firstParentNumber;
                    //     }
                    //     await api.parents().createParent(values, childId.data);
                    // }

                    // await api.reports().createNewReport(childId.data);
                    alert("הפרטים הוכנסו");
                }}
            >
                {(props) => (
                    <View style={{ width: "100%" }}>
                        <View style={styles.titleView}>
                            {Icons.plus}
                            <Text style={styles.title}>הוספת מעון חדש</Text>
                        </View>
                        <View style={styles.inputBox}>
                            <TextInput
                                style={[styles.text, styles.divider]}
                                placeholderTextColor="#C4C4C6"
                                placeholder="שם המעון"
                                onChangeText={props.handleChange("schoolName")}
                                value={props.values.schoolName}
                            />
                            <TextInput
                                style={[styles.text, styles.divider]}
                                placeholderTextColor="#C4C4C6"
                                placeholder="עיר"
                                onChangeText={props.handleChange("schoolCity")}
                                value={props.values.schoolCity}
                            />
                            <TextInput
                                style={[styles.text, styles.divider]}
                                placeholderTextColor="#C4C4C6"
                                placeholder="רחוב"
                                onChangeText={props.handleChange(
                                    "schoolStreet"
                                )}
                                value={props.values.schoolStreet}
                            />
                            <TextInput
                                style={styles.text}
                                placeholderTextColor="#C4C4C6"
                                placeholder="מספר בית"
                                onChangeText={props.handleChange(
                                    "schoolNumber"
                                )}
                                value={props.values.schoolNumber}
                                keyboardType="numeric"
                            />
                        </View>

                        <View style={styles.titleView}>
                            {Icons.plus}
                            <Text style={styles.title}>הוספת גננת</Text>
                        </View>
                        <View style={styles.inputBox}>
                            <TextInput
                                style={[styles.text, styles.divider]}
                                placeholderTextColor="#C4C4C6"
                                placeholder="שם פרטי"
                                onChangeText={props.handleChange(
                                    "teacherFirstName"
                                )}
                                value={props.values.teacherFirstName}
                            />
                            <TextInput
                                style={[styles.text, styles.divider]}
                                placeholderTextColor="#C4C4C6"
                                placeholder="שם משפחה"
                                onChangeText={props.handleChange(
                                    "teacherLastName"
                                )}
                                value={props.values.teacherLastName}
                            />
                            <TextInput
                                style={[styles.text, styles.divider]}
                                placeholderTextColor="#C4C4C6"
                                placeholder="עיר"
                                onChangeText={props.handleChange("teacherCity")}
                                value={props.values.teacherCity}
                            />
                            <TextInput
                                style={[styles.text, styles.divider]}
                                placeholderTextColor="#C4C4C6"
                                placeholder="רחוב"
                                onChangeText={props.handleChange(
                                    "teacherStreet"
                                )}
                                value={props.values.teacherStreet}
                            />

                            <TextInput
                                style={[styles.text, styles.divider]}
                                placeholderTextColor="#C4C4C6"
                                placeholder="מספר בית"
                                onChangeText={props.handleChange(
                                    "teacherNumber"
                                )}
                                value={props.values.teacherNumber}
                                keyboardType="numeric"
                            />
                            <TextInput
                                style={[styles.text, styles.divider]}
                                placeholderTextColor="#C4C4C6"
                                placeholder="מספר טלפון"
                                onChangeText={props.handleChange(
                                    "teacherPhoneNumber"
                                )}
                                value={props.values.teacherPhoneNumber}
                                keyboardType="numeric"
                            />
                            <TextInput
                                style={styles.text}
                                placeholderTextColor="#C4C4C6"
                                placeholder="דואר אלקטרוני"
                                onChangeText={props.handleChange(
                                    "teacherEmail"
                                )}
                                value={props.values.teacherEmail}
                                keyboardType="email-address"
                            />
                        </View>

                        <SmallButton
                            style={styles.submitButton}
                            text="אישור"
                            onPress={props.handleSubmit}
                        />
                    </View>
                )}
            </Formik>
        </View>
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
    divider: {
        borderBottomWidth: 1,
        borderBottomColor: "#C4C4C6",
    },

    submitButton: {
        alignItems: "center",
    },
});
