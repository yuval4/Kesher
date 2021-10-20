import React, { useEffect } from "react";
import { useTranslation } from "react-i18next";
import { StyleSheet, Text, View, FlatList } from "react-native";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import SmallButton from "../../components/buttons/smallButton";
import SubCategoryButton from "../../components/buttons/subCategoryButton";
import ChildTitle from "../../components/childTitle";
import {
    updateCategory,
    updateSubCategories,
} from "../../features/report/report-slice";

export default function ReportSubCategoryScreen(props: any) {
    const { t } = useTranslation();
    const [DATA, setDATA] = React.useState();
    const dispatch = useAppDispatch();
    const reportCategory = useAppSelector((state) => state.report.category);

    const ACTIVITIES_DATA = [
        {
            id: "11",
            title: "מפגשים",
        },
        {
            id: "12",
            title: "מפגשים ליד שולחן",
        },
        {
            id: "13",
            title: "משחק במרחב",
        },
        {
            id: "14",
            title: "חצר / ג׳ימבורי",
        },
        {
            id: "15",
            title: "פעילות יצירה",
        },
        {
            id: "16",
            title: "מיומנויות מחיי היומיום",
        },
    ];

    const MEALS_DATA = [
        {
            id: "21",
            title: "ארוחת בוקר",
            details: "",
        },
        {
            id: "22",
            title: "ארוחת פרי",
            details: "",
        },
        {
            id: "23",
            title: "ארוחת צהריים",
            details: "",
        },
        {
            id: "24",
            title: "ארוחת מנחה",
            details: "",
        },
    ];

    const REQUEST_DATA = [
        {
            id: "31",
            title: "סדין למיטה",
        },
        {
            id: "32",
            title: "בגדי החלפה",
        },
        {
            id: "33",
            title: "חיתולים",
        },
        {
            id: "34",
            title: "מגבונים",
        },
        {
            id: "35",
            title: "אחר",
        },
    ];

    const TREATMENTS_DATA = [
        {
            id: "41",
            title: "פיזיותרפיה",
        },
        {
            id: "42",
            title: "קלינאי תקשורת",
        },
        {
            id: "43",
            title: "ריפוי בעיסוק",
        },
        {
            id: "44",
            title: "טיפול רגשי",
        },
    ];

    const getData = () => {
        let categoryId = reportCategory;

        switch (categoryId) {
            case "activities":
                return ACTIVITIES_DATA;
            case "meals":
                return MEALS_DATA;
            case "brings":
                return REQUEST_DATA;
            case "health":
                return TREATMENTS_DATA;
        }
    };

    // ANCHOR add "selected = false" for each object and set data in DATA
    useEffect(() => {
        let data = getData();
        let subCategories = [];
        if (data) {
            // data.forEach((subCategory, index) => {
            //     subCategories.push({
            //         id: subCategory[index],
            //         selected: false,
            //         title: subCategory[index].title,
            //     });
            // });
            for (let i = 0; i < data.length; i++) {
                subCategories.push({
                    id: data[i].id,
                    selected: false,
                    title: data[i].title,
                });
            }
        }

        setDATA(subCategories);
    }, []);

    // ANCHOR change the "selected" value of the pressed item.
    const handleItemPress = ({
        item,
    }: {
        item: { title: string; selected: boolean; id: string };
    }) => {
        let temp = DATA;
        item.selected = !item.selected;
        temp[(parseInt(item.id) % 10) - 1] = item;
        setDATA([...temp]);
    };

    // ANCHOR creates a new list with only the selected categories.
    const selectedCategories = (category: string) => {
        let subCategories = [];
        for (let i = 0; i < DATA.length; i++) {
            if (DATA[i].selected === true) {
                subCategories.push({
                    id: DATA[i].id,
                    selected: DATA[i].selected,
                    title: DATA[i].title,
                    category,
                });
            }
        }
        return subCategories;
    };

    // ANCHOR save data to Redux and navigte to the next screen.
    const handleSubmitAndNext = () => {
        let category = "";
        switch (reportCategory) {
            case "activities":
                category = "activitysReports";
                break;
            case "meals":
                category = "mealReports";
                break;
            case "brings":
                category = "bringReports";
                break;
            case "health":
                category = "healthReports";
                break;
        }
        dispatch(
            updateSubCategories({
                subCategories: selectedCategories(category),
            })
        );
        //needed?
        dispatch(
            updateCategory({
                category: category,
            })
        );
        props.navigation.navigate("CompleteReport");
    };

    return (
        <View style={styles.container}>
            <ChildTitle />
            <View style={styles.listView}>
                <FlatList
                    style={styles.list}
                    data={DATA}
                    keyExtractor={(item) => item.id}
                    scrollEnabled={false}
                    renderItem={({ item }) => (
                        <SubCategoryButton
                            text={item.title}
                            picked={item.selected}
                            onPress={() => handleItemPress({ item })}
                        />
                    )}
                />
            </View>

            <View style={styles.button}>
                <SmallButton text="בחר" onPress={handleSubmitAndNext} />
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        alignItems: "center",
        flex: 1,
    },
    list: {
        paddingHorizontal: 25,
        paddingTop: 30,
    },
    listView: {
        height: "80%",
    },
    button: {
        position: "absolute",
        left: "12%",
        bottom: "4%",
    },
});
