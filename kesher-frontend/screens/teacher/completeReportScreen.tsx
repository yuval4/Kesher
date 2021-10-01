import React, { useEffect, useState } from "react";
import { StyleSheet, Text, View, FlatList, TextInput } from "react-native";
import api from "../../api";
import { useAppSelector } from "../../app/hooks";
import globalStyles from "../../assets/globalStyles";
import Icons from "../../assets/icons/icons";
import SmallButton from "../../components/buttons/smallButton";
import ChildTitle from "../../components/childTitle";

export default function CompleteReportScreen(props: any) {
    const [subCategories, setSubCategories] = React.useState([]);
    const report = useAppSelector((state) => state.report);

    // ANCHOR get data from redux (the subcategories)
    useEffect(() => {
        const data = report.subCategories;
        setSubCategories([...data]);
    }, []);

    // ANCHOR handle input changes
    const handleInput = (item: any, input: string) => {
        setSubCategories((currentSubCategories) =>
            currentSubCategories.map((category) => {
                if (category.id === item.id) {
                    category.report_value = input;
                }
                return category;
            })
        );
    };

    // ANCHOR submit the form
    const handleSubmit = () => {
        api.reports().addSubReportToReport(report.child_id, subCategories);
        props.navigation.goBack();
        props.navigation.goBack();
    };

    return (
        <View style={styles.container}>
            <ChildTitle />
            <View style={styles.reportBox}>
                {report.category === "בבקשה לשלוח" ? (
                    <View>
                        <Text style={styles.title}>בבקשה לשלוח</Text>
                        <FlatList
                            data={subCategories}
                            horizontal={true}
                            keyExtractor={(item, index) => index.toString()}
                            scrollEnabled={false}
                            renderItem={({ item }) => (
                                <View style={styles.toBring}>
                                    <View style={styles.vIcon}>
                                        {Icons.toBring}
                                    </View>

                                    <Text style={styles.placeholder}>
                                        {item.title}
                                    </Text>
                                </View>
                            )}
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
                                        {item.title}
                                    </Text>
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
                            </View>
                        )}
                    />
                )}
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
    toBring: {
        flexDirection: "row-reverse",
        alignItems: "center",
    },
    vIcon: {
        margin: 3.5,
    },
});

const mapStateToProps = (state: any) => {
    const { report } = state;
    return { report };
};
