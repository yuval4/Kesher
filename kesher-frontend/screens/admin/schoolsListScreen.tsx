import React from "react";
import {
    FlatList,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from "react-native";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import globalStyles from "../../assets/globalStyles";
import HomeButton from "../../components/buttons/homeButton";
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
        <View>
            <FlatList
                data={schoolsList}
                numColumns={3}
                style={styles.list}
                keyExtractor={(item, index) => index.toString()}
                ListHeaderComponent={
                    <SchoolItemButton
                        schoolName="הוספת מעון חדש"
                        onPress={handleAddSchoolPress}
                    />
                }
                renderItem={({ item }) => (
                    <View style={styles.item}>
                        <SchoolItemButton
                            schoolName={item.name}
                            onPress={() => handleSchoolPress(item)}
                        />
                    </View>
                )}
            />
        </View>
    );
}

const styles = StyleSheet.create({
    list: {
        width: "100%",
    },
    item: {
        alignItems: "center",
        marginHorizontal: "4.5%",
    },
});
