import React, { useEffect } from "react";
import { StyleSheet, Text, View, FlatList } from "react-native";
import { connect, useDispatch } from "react-redux";
import AppLayout from "../../components/appLayout";
import SmallButton from "../../components/buttons/smallButton";
import SubCategoryButton from "../../components/buttons/subCategoryButton";
import ChildTitle from "../../components/childTitle";

function ReportSubCategoryScreen(props: any) {
    const [DATA, setDATA] = React.useState();
    const dispatch = useDispatch();

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
        },
        {
            id: "22",
            title: "ארוחת פרי",
        },
        {
            id: "23",
            title: "ארוחת צהריים",
        },
        {
            id: "24",
            title: "ארוחת מנחה",
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
        let categoryId = props.report.category;
        switch (categoryId) {
            case "1":
                return ACTIVITIES_DATA;
            case "2":
                return MEALS_DATA;
            case "3":
                return REQUEST_DATA;
            case "4":
                return TREATMENTS_DATA;
        }
    };

    // ANCHOR add "selected = false for each object" and set data in DATA
    useEffect(() => {
        let data = getData();
        let subCategories = [];
        if (data) {
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
    const selectedCategories = () => {
        let subCategories = [];
        for (let i = 0; i < DATA.length; i++) {
            if (DATA[i].selected === true) {
                subCategories.push({
                    id: DATA[i].id,
                    selected: DATA[i].selected,
                    title: DATA[i].title,
                });
            }
        }
        return subCategories;
    };

    // ANCHOR save data to Redux and navigte to the next screen.
    const handleSubmitAndNext = () => {
        dispatch({
            type: "SET_REPORT",
            data: {
                child_id: props.report.child_id,
                name: {
                    first: props.report.name.first,
                    last: props.report.name.last,
                },
                profilePic: props.report.profilePic,
                subCategories: selectedCategories(),
            },
        });
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
    },
    list: {
        paddingHorizontal: 25,
        marginTop: 30, //!
    },
    listView: {
        height: "80%",
    },
    button: {
        position: "absolute",
        left: 45,
        bottom: 100,
    },
});

const mapStateToProps = (state: any) => {
    const { report } = state;
    return { report };
};

export default connect(mapStateToProps)(ReportSubCategoryScreen);
