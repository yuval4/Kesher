import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import api from "../../api";
import { useAppSelector } from "../../app/hooks";
import globalStyles from "../../assets/globalStyles";
import Icons from "../../assets/icons/icons";
import SubmitButton from "../../components/buttons/submitButton";
import NewUserForm from "../../components/forms/newUserForm";
import ModalPop from "../../components/modalPop";
import UsersList from "../../components/usersList";
import UsersListCheck from "../../components/usersListCheck";

export default function SchoolDetailsScreen() {
    const { t } = useTranslation();
    const school = useAppSelector((state) => state.user.currentSchool);
    const {
        control,
        reset,
        handleSubmit,
        formState: { errors },
    } = useForm();
    const [visible, setVisible] = useState(false);
    const [modalOption, setModalOption] = useState("");
    const [choosenUserId, setChoosenUserId] = useState("");

    const handleFormSubmit = async (data: any) => {
        await api.users().createNewTeacher({
            fisrtName: data.teacherFirstName,
            lastName: data.teacherLastName,
            city: data.teacherCity,
            street: data.teacherStreet,
            number: data.teacherNumber,
            email: data.teacherEmail,
            phoneNumber: data.teacherPhoneNumber,
            schoolId: school._id,
        });

        alert(t("Staff Was Added Seccessfully"));
        setVisible(false);
        reset();
    };

    const handleExistingUserSubmit = async () => {
        await api.users().addSchoolToUser(school._id, choosenUserId);
        alert(t("Staff Was Added Seccessfully"));
        setVisible(false);
    };

    return (
        <View style={styles.container}>
            <Text style={styles.schoolName}>{school.name}</Text>
            <UsersList schoolId={school._id} />
            <TouchableOpacity
                style={styles.addNewStaffView}
                onPress={() => {
                    setVisible(true);
                    setModalOption("New");
                }}
            >
                {Icons.plus}
                <Text style={styles.addNewStaff}>{t("Add Staff")}</Text>
            </TouchableOpacity>

            <TouchableOpacity
                style={styles.addNewStaffView}
                onPress={() => {
                    setVisible(true);
                    setModalOption("Exist");
                }}
            >
                {Icons.plus}
                <Text style={styles.addNewStaff}>
                    {t("Add Existing Staff")}
                </Text>
            </TouchableOpacity>

            <ModalPop visible={visible}>
                <TouchableOpacity
                    style={styles.header}
                    onPress={() => setVisible(false)}
                >
                    {Icons.x}
                </TouchableOpacity>
                {modalOption === "New" && (
                    <View>
                        <NewUserForm
                            control={control}
                            errors={errors}
                            title={t("Staff's Details")}
                            name={t("teacher")}
                        />
                        <View style={styles.button}>
                            <SubmitButton
                                text={t("Done")}
                                onPress={handleSubmit(handleFormSubmit)}
                            />
                        </View>
                    </View>
                )}
                {modalOption === "Exist" && (
                    <View>
                        <UsersListCheck
                            schoolId={school._id}
                            choosenUserId={choosenUserId}
                            setChoosenUserId={setChoosenUserId}
                        />

                        <View style={styles.button}>
                            <SubmitButton
                                text={t("Done")}
                                onPress={handleExistingUserSubmit}
                            />
                        </View>
                    </View>
                )}
            </ModalPop>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: "center",
    },
    schoolName: {
        color: globalStyles.color.text,
        fontSize: 20,
        fontFamily: globalStyles.font.semiBold,
        paddingTop: 30,
        paddingBottom: 17,
    },
    addNewStaffView: {
        flexDirection: "row-reverse",
        alignSelf: "flex-end",
        marginBottom: 10,
        // marginTop: 20,
        marginHorizontal: "5%",
        alignItems: "center",
    },
    addNewStaff: {
        color: globalStyles.color.text,
        fontFamily: globalStyles.font.semiBold,
        fontSize: 20,
        textAlign: "right",
        alignItems: "center",
        display: "flex",
        marginRight: 6,
    },
    button: {
        alignItems: "center",
        marginTop: 40,
    },
    header: {
        width: "100%",
    },
});
