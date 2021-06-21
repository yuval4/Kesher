import { Formik } from "formik";
import React from "react";
import { StyleSheet, Text, View, TextInput } from "react-native";
import { connect } from "react-redux";
import api from "../../api";
import globalStyles from "../../assets/globalStyles";
import SmallButton from "../../components/buttons/smallButton";

function AddChildScreen(props: any) {
    return (
        <View>
            <Text style={styles.title}>הוספת ילד חדש</Text>

            {/* TODO add another parent */}
            <Formik
                initialValues={{
                    parentFirstName: "",
                    parentLastName: "",
                    city: "",
                    street: "",
                    number: "",
                    phoneNumber: "",
                    email: "",
                    childFirstName: "",
                    childLastName: "",
                    day: "",
                    month: "",
                    year: "",
                }}
                onSubmit={async (values) => {
                    values.school = props.user.schools[0];
                    const childId = await api.children().createChild(values);
                    await api
                        .schools()
                        .addChildToSchool(values.school, childId.data);
                    await api.parents().createParent(values, childId.data);
                    alert("הפרטים הוכנסו");
                }}
            >
                {(props) => (
                    <View>
                        <Text style={styles.subTitle}>פרטי הורה </Text>

                        <TextInput
                            style={globalStyles.input}
                            placeholder="שם פרטי"
                            onChangeText={props.handleChange("parentFirstName")}
                            value={props.values.parentFirstName}
                        />

                        <TextInput
                            style={globalStyles.input}
                            placeholder="שם משפחה"
                            onChangeText={props.handleChange("parentLastName")}
                            value={props.values.parentLastName}
                        />

                        <TextInput
                            style={globalStyles.input}
                            placeholder="עיר"
                            onChangeText={props.handleChange("city")}
                            value={props.values.city}
                        />

                        <TextInput
                            style={globalStyles.input}
                            placeholder="רחוב"
                            onChangeText={props.handleChange("street")}
                            value={props.values.street}
                        />

                        <TextInput
                            style={globalStyles.input}
                            placeholder="מספר"
                            onChangeText={props.handleChange("number")}
                            value={props.values.number}
                            keyboardType="numeric"
                        />

                        <TextInput
                            style={globalStyles.input}
                            placeholder="מספר טלפון"
                            onChangeText={props.handleChange("phoneNumber")}
                            value={props.values.phoneNumber}
                        />

                        <TextInput
                            style={globalStyles.input}
                            placeholder="מייל"
                            onChangeText={props.handleChange("email")}
                            value={props.values.email}
                        />

                        <Text style={styles.subTitle}>פרטי הילד</Text>

                        <TextInput
                            style={globalStyles.input}
                            placeholder="שם פרטי"
                            onChangeText={props.handleChange("childFirstName")}
                            value={props.values.childFirstName}
                        />

                        <TextInput
                            style={globalStyles.input}
                            placeholder="שם משפחה"
                            onChangeText={props.handleChange("childLastName")}
                            value={props.values.childLastName}
                        />

                        <TextInput
                            style={globalStyles.input}
                            placeholder="יום"
                            onChangeText={props.handleChange("day")}
                            value={props.values.day}
                            keyboardType="numeric"
                        />

                        <TextInput
                            style={globalStyles.input}
                            placeholder="חודש"
                            onChangeText={props.handleChange("month")}
                            value={props.values.month}
                            keyboardType="numeric"
                        />

                        <TextInput
                            style={globalStyles.input}
                            placeholder="שנה"
                            onChangeText={props.handleChange("year")}
                            value={props.values.year}
                            keyboardType="numeric"
                        />

                        <SmallButton
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
    title: {
        color: globalStyles.color.purple,
        fontFamily: globalStyles.font.bold,
        fontSize: 16,
        textAlign: "center",
        alignItems: "center",
    },
    subTitle: {
        color: globalStyles.color.text,
        fontFamily: globalStyles.font.semiBold,
    },
    input: {},
});

const mapStateToProps = (state: any) => {
    const { user } = state;
    return { user };
};

export default connect(mapStateToProps)(AddChildScreen);
