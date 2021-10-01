import React, { useState } from "react";
import {
    StyleSheet,
    Text,
    View,
    TouchableOpacity,
    FlatList,
    Image,
} from "react-native";
import api from "../api";
import { useAppDispatch, useAppSelector } from "../app/hooks";
import globalStyles from "../assets/globalStyles";
import Icons from "../assets/icons/icons";
import { updateCurrentChild } from "../features/user/user-slice";

export default function OpenList() {
    const [isOpen, setIsOpen] = useState(false);
    const user = useAppSelector((state) => state.user);
    const dispatch = useAppDispatch();

    const handleChangeChildPress = (child: any) => {
        dispatch(
            updateCurrentChild({
                currentChild: child,
            })
        );
        setIsOpen(!isOpen);
    };

    if (user.currentChild) {
        return (
            <View style={styles.container}>
                <Image
                    style={styles.photo}
                    source={{
                        uri: `${api.URL}/${user.currentChild.profilePic}`
                            .split(/\\/g)
                            .join("/"),
                    }}
                />
                <TouchableOpacity
                    style={isOpen ? styles.openButton : styles.closeButton}
                    onPress={() => setIsOpen(!isOpen)}
                >
                    {/* <Text style={styles.text}>{data[index]}</Text> */}
                    <Text style={styles.text}>
                        {user.currentChild.name.first}
                    </Text>
                    <View style={isOpen ? styles.arrowOpen : styles.arrow}>
                        {Icons.arrowDown}
                    </View>
                </TouchableOpacity>
                {isOpen ? (
                    <View style={styles.list}>
                        <FlatList
                            data={user.children}
                            keyExtractor={(item, index) => index.toString()}
                            renderItem={(item) => (
                                <TouchableOpacity
                                    onPress={() =>
                                        handleChangeChildPress(item.item)
                                    }
                                >
                                    <Text style={styles.text}>
                                        {item.item.name.first}
                                    </Text>
                                </TouchableOpacity>
                            )}
                        />
                    </View>
                ) : null}
            </View>
        );
    } else {
        return null;
    }
}

const styles = StyleSheet.create({
    container: {
        alignItems: "center",
    },
    closeButton: {
        height: 36,
        width: 100,
        backgroundColor: globalStyles.color.purple,
        borderRadius: 16,
        justifyContent: "center",
        flexDirection: "row-reverse",
        shadowOffset: {
            width: 0,
            height: 1,
        },
        shadowOpacity: 0.3,
        shadowRadius: 10,
        elevation: 7,
    },
    photo: {
        width: 75,
        height: 75,
        borderRadius: 100,
        marginBottom: 12,
        marginTop: 24,
    },
    openButton: {
        height: 36,
        width: 100,
        backgroundColor: globalStyles.color.purple,
        borderTopRightRadius: 16,
        borderTopLeftRadius: 16,
        justifyContent: "center",
        flexDirection: "row-reverse",
        shadowOffset: {
            width: 0,
            height: 1,
        },
        shadowOpacity: 0.3,
        shadowRadius: 10,
    },
    list: {
        width: 100,
        backgroundColor: globalStyles.color.purple,
        borderBottomLeftRadius: 16,
        borderBottomRightRadius: 16,
        justifyContent: "center",
    },
    text: {
        fontFamily: globalStyles.font.bold,
        fontSize: 16,
        lineHeight: 24,
        alignItems: "center",
        textAlign: "center",
        letterSpacing: 0.1,
        color: "white",
        paddingVertical: 7,
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
