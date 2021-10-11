import React from "react";
import { FlatList, StyleSheet, View } from "react-native";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import NewSchoolButton from "../../components/buttons/newSchoolButton";
import SchoolItemButton from "../../components/buttons/schoolItemButton";
import { updateCurrentSchool } from "../../features/user/user-slice";

export default function SchoolsListScreen({ navigation }: any) {
    const dispatch = useAppDispatch();
    const schoolsList = useAppSelector((state) => state.user.schools);

    const handleSchoolPress = (currentSchool: any) => {
        dispatch(updateCurrentSchool({ currentSchool: currentSchool }));
        navigation.navigate("SchoolDetails");
    };

    const handleAddSchoolPress = () => {
        navigation.navigate("AddSchool");
    };

    return (
        <View style={styles.container}>
            <FlatList
                data={schoolsList}
                numColumns={3}
                style={styles.list}
                keyExtractor={(item, index) => index.toString()}
                renderItem={({ item }) => (
                    <View style={styles.item}>
                        <SchoolItemButton
                            schoolName={item.name}
                            onPress={() => handleSchoolPress(item)}
                        />
                    </View>
                )}
            />
            <View style={styles.button}>
                <NewSchoolButton
                    text="הוספת מעון חדש"
                    onPress={handleAddSchoolPress}
                />
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignContent: "center",
        marginTop: 25,
    },
    list: {
        alignSelf: "center",
    },
    item: {
        alignItems: "center",
        paddingHorizontal: "4.5%",
        paddingBottom: 20,
    },
    button: {
        alignItems: "center",
        paddingBottom: 30,
    },
});
