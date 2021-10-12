import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import {
    StyleSheet,
    View,
    KeyboardAvoidingView,
    Platform,
    TouchableWithoutFeedback,
    Keyboard,
    ScrollView,
    Text,
    Switch,
} from "react-native";
import NewUserForm from "../../components/forms/newUserForm";
import SubmitButton from "../../components/buttons/submitButton";
import api from "../../api";
import NewChildForm from "../../components/forms/newChildForm";
import {
    createFormData,
    getMediaLibraryPermission,
    pickImage,
} from "../../utils/utils";
import { useAppSelector } from "../../app/hooks";
import globalStyles from "../../assets/globalStyles";
import ChildPhotoBox from "../../components/childPhotoBox";

export default function AddChildScreen() {
    const {
        control,
        reset,
        handleSubmit,
        getValues,
        setValue,
        formState: { errors },
    } = useForm();
    const [image, setImage] = useState(null);
    const school = useAppSelector((state) => state.user.currentSchool);
    const [isTwoParents, setIsTwoParents] = useState(false);

    useEffect(() => {
        getMediaLibraryPermission();
    }, []);

    const handlePickImage = async () => {
        setImage(await pickImage());
    };

    const handleFormSubmit = async (data: any) => {
        const childId = await api.children().createNewChild(
            createFormData(image, {
                firstName: data.childFirstName,
                LastName: data.childLastName,
                birthDate: data.childBirthDate.toString(),
                school: school._id,
            })
        );
        await api.schools().addChildToSchool(school._id, childId.data);

        await api.users().createNewParent({
            fisrtName: data.firstParentFirstName,
            lastName: data.firstParentLastName,
            city: data.firstParentCity,
            street: data.firstParentStreet,
            number: data.firstParentNumber,
            email: data.firstParentEmail,
            phoneNumber: data.firstParentPhoneNumber,
            childId: childId.data,
        });

        if (isTwoParents) {
            await api.users().createNewParent({
                fisrtName: data.secondParentFirstName,
                lastName: data.secondParentLastName,
                city: data.secondParentCity,
                street: data.secondParentStreet,
                number: data.secondParentNumber,
                email: data.secondParentEmail,
                phoneNumber: data.secondParentPhoneNumber,
                childId: childId.data,
            });
        }
        alert("הפרטים הוכנסו");
        reset();
        setImage(null);
    };

    return (
        <KeyboardAvoidingView
            behavior={Platform.OS === "ios" ? "padding" : "height"}
            style={styles.container}
        >
            <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
                <ScrollView>
                    <ChildPhotoBox image={image} onPress={handlePickImage} />
                    <NewChildForm
                        control={control}
                        errors={errors}
                        title="פרטי ילד/ה"
                        name="child"
                    />

                    <NewUserForm
                        control={control}
                        errors={errors}
                        title="פרטי הורה"
                        name="firstParent"
                    />
                    <View style={styles.switch}>
                        <Switch
                            trackColor={{
                                false: "#767577",
                                true: globalStyles.color.mediumPurplel,
                            }}
                            thumbColor="#f4f3f4"
                            ios_backgroundColor="#3e3e3e"
                            onValueChange={setIsTwoParents}
                            value={isTwoParents}
                        />
                    </View>

                    {isTwoParents && (
                        <View>
                            <NewUserForm
                                control={control}
                                errors={errors}
                                title="פרטי הורה נוסף"
                                name="secondParent"
                            />

                            <Text
                                style={styles.copy}
                                onPress={() => {
                                    setValue(
                                        "secondParentCity",
                                        getValues("firstParentCity")
                                    );
                                    setValue(
                                        "secondParentStreet",
                                        getValues("firstParentStreet")
                                    );
                                    setValue(
                                        "secondParentNumber",
                                        getValues("firstParentNumber")
                                    );
                                }}
                            >
                                העתק כתובת
                            </Text>
                        </View>
                    )}

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
        // paddingTop: 60,
    },
    button: {
        alignItems: "center",
        marginTop: 40,
        marginBottom: 60,
    },
    switch: {
        alignSelf: "flex-end",
        padding: 20,
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
});
