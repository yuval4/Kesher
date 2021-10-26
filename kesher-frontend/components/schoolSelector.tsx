import React, { useState } from "react";
import { StyleSheet, Text, View, TouchableOpacity } from "react-native";
import { useAppDispatch, useAppSelector } from "../app/hooks";
import globalStyles from "../assets/globalStyles";
import Icons from "../assets/icons/icons";
import { updateCurrentSchool } from "../features/user/user-slice";

export default function SchoolSelector() {
    const [isOpen, setIsOpen] = useState(false);
    const user = useAppSelector((state) => state.user);
    const dispatch = useAppDispatch();

    const handleChangeSchoolPress = (school: any) => {
        dispatch(
            updateCurrentSchool({
                currentSchool: school,
            })
        );
        setIsOpen(!isOpen);
    };

    if (user.currentSchool) {
        return (
            <View style={styles.container}>
                <TouchableOpacity
                    style={styles.button}
                    onPress={() => setIsOpen(!isOpen)}
                >
                    <Text style={styles.text}>{user.currentSchool.name}</Text>
                    <View style={isOpen ? styles.arrowOpen : styles.arrow}>
                        {Icons.grayArrowDown}
                    </View>
                </TouchableOpacity>
                {isOpen && (
                    <View style={styles.list}>
                        {user.schools?.map((item: any, index: any) => {
                            return (
                                <View style={styles.list} key={index}>
                                    <TouchableOpacity
                                        onPress={() =>
                                            handleChangeSchoolPress(item)
                                        }
                                    >
                                        <Text style={styles.text}>
                                            {item.name}
                                        </Text>
                                    </TouchableOpacity>
                                </View>
                            );
                        })}
                    </View>
                )}
            </View>
        );
    } else {
        return null;
    }
}

const styles = StyleSheet.create({
    container: {
        alignItems: "center",
        paddingTop: 7,
    },
    button: {
        flexDirection: "row-reverse",
    },
    list: {
        width: "100%",
        paddingTop: 5,
        alignItems: "center",
    },
    text: {
        fontFamily: globalStyles.font.semiBold,
        fontSize: 20,
        lineHeight: 24,
        alignItems: "center",
        textAlign: "right",
        color: "#999999",
    },
    arrowOpen: {
        transform: [{ rotate: "180deg" }],
        justifyContent: "center",
        marginRight: 10,
        marginLeft: -5,
    },
    arrow: {
        justifyContent: "center",
        marginRight: 10,
        marginLeft: -5,
    },
});
