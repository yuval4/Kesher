import React, { useEffect, useState } from "react";
import { StyleSheet, Text, View, FlatList, TextInput } from "react-native";
import { connect } from "react-redux";
import api from "../../api";
import globalStyles from "../../assets/globalStyles";
import SmallButton from "../../components/buttons/smallButton";
import ChildTitle from "../../components/childTitle";

function CompleteReportScreen(props: any) {
    const [subCategories, setSubCategories] = React.useState([]);

    // ANCHOR get data from redux (the subcategories)
    useEffect(() => {
        const data = props.report.subCategories;
        let temp: {
            subcategory_id: any;
            title: any;
            report_value: string;
            category: string;
        }[] = [];

        data.forEach((subCategory: any) => {
            console.log(subCategory);
            temp.push({
                subcategory_id: subCategory.id,
                title: subCategory.title,
                category: subCategory.category,
                report_value: "",
            });
        });

        setSubCategories(temp);
    }, []);

    // ANCHOR handle input changes
    const handleInput = (item: any, input: string) => {
        let temp = subCategories;
        item.report_value = input;
        temp[(parseInt(item.id) % 10) - 1] = item;
        setSubCategories([...temp]);
    };

    // ANCHOR submit the form
    const handleSubmit = () => {
        api.reports().addSubReportToReport(
            props.report.child_id,
            subCategories
        );
        props.navigation.goBack();
        props.navigation.goBack();
        props.navigation.goBack();
    };

    return (
        <View style={styles.container}>
            <ChildTitle />
            <View style={styles.reportBox}>
                <FlatList
                    data={subCategories}
                    keyExtractor={(item) => item.subcategory_id}
                    scrollEnabled={false}
                    renderItem={({ item }) => (
                        <View>
                            <Text style={styles.title}>{item.title}</Text>
                            <TextInput
                                style={styles.placeholder}
                                multiline
                                placeholderTextColor={
                                    globalStyles.color.mediumPurplel
                                }
                                textAlign="right"
                                placeholder="פרט/י כאן..."
                                onChangeText={(input) =>
                                    handleInput(item, input)
                                }
                            />
                        </View>
                    )}
                />
            </View>
            <SmallButton
                text="סיימתי"
                style={styles.button}
                onPress={handleSubmit}
            />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        alignContent: "center",
        alignItems: "center",
    },
    reportBox: {
        backgroundColor: globalStyles.color.lightPurple,
        borderColor: globalStyles.color.purple,
        borderRadius: 16,
        borderWidth: 0.4,
        shadowOffset: {
            width: 1,
            height: 1,
        },
        shadowOpacity: 0.1,
        shadowRadius: 8,
        padding: 9,
        width: "90%",
        marginTop: 30,
    },
    title: {
        fontFamily: globalStyles.font.semiBold,
        fontSize: 16,
        lineHeight: 18,
        alignItems: "center",
        textAlign: "right",
        letterSpacing: 0.1,
        color: globalStyles.color.purple,
        marginBottom: 3,
    },
    placeholder: {
        fontFamily: globalStyles.font.regular,
        fontSize: 16,
        lineHeight: 18,
        alignItems: "center",
        textAlign: "right",
        letterSpacing: 0.1,
        color: globalStyles.color.text,
        marginBottom: 10,
    },
    button: {
        marginTop: 30,
    },
});

const mapStateToProps = (state: any) => {
    const { report } = state;
    return { report };
};

export default connect(mapStateToProps)(CompleteReportScreen);
