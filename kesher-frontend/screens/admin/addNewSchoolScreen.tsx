import React from "react";
import { useForm, Controller } from "react-hook-form";
import {
    StyleSheet,
    View,
    KeyboardAvoidingView,
    Platform,
    TouchableWithoutFeedback,
    Keyboard,
    ScrollView,
} from "react-native";
import NewSchoolForm from "../../components/forms/newSchoolForm";
import NewUserForm from "../../components/forms/newUserForm";
import SubmitButton from "../../components/buttons/submitButton";
import api from "../../api";

export default function AddNewSchoolScreen() {
    const {
        control,
        reset,
        handleSubmit,
        formState: { errors },
    } = useForm();

    const handleFormSubmit = async (data: any) => {
        const schoolId = await api.schools().createNewSchool({
            name: data.schoolName,
            city: data.schoolCity,
            street: data.schoolStreet,
            number: data.schoolNumber,
        });

        await api.users().addSchoolToUser(schoolId.data);

        await api.users().createNewTeacher({
            fisrtName: data.teacherFirstName,
            lastName: data.teacherLastName,
            city: data.teacherCity,
            street: data.teacherStreet,
            number: data.teacherNumber,
            email: data.teacherEmail,
            phoneNumber: data.teacherPhoneNumber,
            schoolId: schoolId.data,
        });

        alert("הפרטים הוכנסו");
        reset();
    };

    return (
        <KeyboardAvoidingView
            behavior={Platform.OS === "ios" ? "padding" : "height"}
            style={styles.container}
        >
            <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
                <ScrollView>
                    <NewSchoolForm
                        control={control}
                        errors={errors}
                        title="הוספת מעון חדש"
                        name="school"
                    />
                    <NewUserForm
                        control={control}
                        errors={errors}
                        title="פרטי מנהל/ת מעון"
                        name="teacher"
                    />
                    <View style={styles.button}>
                        <SubmitButton
                            text="אישור"
                            onPress={handleSubmit(handleFormSubmit)}
                        />
                    </View>
                </ScrollView>
            </TouchableWithoutFeedback>
        </KeyboardAvoidingView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#F6F6F9",
    },
    button: {
        alignItems: "center",
        marginTop: 40,
        marginBottom: 60,
    },
});
