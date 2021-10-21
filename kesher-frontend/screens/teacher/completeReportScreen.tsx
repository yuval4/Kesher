import React, { useEffect, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { StyleSheet, Text, View, FlatList, TextInput } from "react-native";
import api from "../../api";
import { useAppSelector } from "../../app/hooks";
import globalStyles from "../../assets/globalStyles";
import Icons from "../../assets/icons/icons";
import SmallButton from "../../components/buttons/smallButton";
import ChildTitle from "../../components/childTitle";
import ToBring from "../../components/toBring";

export default function CompleteReportScreen(props: any) {
    const { t } = useTranslation();
    const [subCategories, setSubCategories] = useState([]);
    const report = useAppSelector((state) => state.report);
    const {
        control,
        reset,
        handleSubmit,
        formState: { errors },
    } = useForm();

    // ANCHOR get data from redux (the subcategories)
    useEffect(() => {
        if (!report) {
            return;
        }
        const data = report.subCategories;
        setSubCategories([...data]);
    }, [report]);

    // ANCHOR submit the form
    const handleReportSubmit = async (data: object) => {
        let subCat = JSON.parse(JSON.stringify(subCategories));
        console.log(subCat);
        let reports = subCat.map((subCategory) => {
            subCategory["details"] = data[subCategory.id];
            return subCategory;
        });

        await api.reports().addSubReportToReport(report.child_id, reports);
        props.navigation.goBack();
        props.navigation.goBack();
        reset();
    };

    return (
        <View style={styles.container}>
            <ChildTitle />
            <View style={styles.reportBox}>
                {report.category === "bringReports" ? (
                    <View>
                        <ToBring
                            bring={subCategories.map((item) => ({
                                category: item.title,
                            }))}
                        />
                    </View>
                ) : (
                    <FlatList
                        data={subCategories}
                        keyExtractor={(item, index) => index.toString()}
                        scrollEnabled={false}
                        renderItem={({ item }) => (
                            <View>
                                <View>
                                    <Text style={styles.title}>
                                        {t(item.title)}
                                    </Text>

                                    <Controller
                                        control={control}
                                        rules={{
                                            required: true,
                                        }}
                                        render={({
                                            field: { onChange, value },
                                        }) => (
                                            <TextInput
                                                style={styles.placeholder}
                                                textAlign="right"
                                                multiline
                                                placeholderTextColor={
                                                    globalStyles.color
                                                        .mediumPurplel
                                                }
                                                placeholder={t(
                                                    "Enter Details Here"
                                                )}
                                                onChangeText={onChange}
                                                value={value}
                                            />
                                        )}
                                        name={item.id}
                                        defaultValue=""
                                    />
                                </View>
                            </View>
                        )}
                    />
                )}
            </View>
            <SmallButton
                text={t("Done")}
                style={styles.button}
                onPress={handleSubmit(handleReportSubmit)}
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
        elevation: 3,
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
        // marginBottom: 10,
    },
    button: {
        marginTop: 30,
    },
});
