import React, { useEffect, useState } from "react";
import {
    StyleSheet,
    Text,
    View,
    TouchableOpacity,
    FlatList,
    Image,
} from "react-native";
import { connect, useDispatch } from "react-redux";
import globalStyles from "../assets/globalStyles";
import Icons from "../assets/icons/icons";

function OpenList(props: any) {
    const [isOpen, setIsOpen] = React.useState(false);
    const dispatch = useDispatch();

    const handleChangeChildPress = (child: any) => {
        let childrenList = props.user.children;
        childrenList.splice(childrenList.indexOf(child), 1);
        childrenList.unshift(child);
        // TODO chnage it to action (redux)
        dispatch({
            type: "SET_USER",
            data: {
                name: {
                    first: props.user.name.first,
                    last: props.user.name.last,
                },
                role: props.user.role,
                children: childrenList,
            },
        });
        setIsOpen(!isOpen);
    };

    if (props.user.children[0]) {
        return (
            <View style={styles.container}>
                <Image
                    style={styles.photo}
                    source={{
                        uri: props.user.children[0].profilePic,
                    }}
                />
                <TouchableOpacity
                    style={isOpen ? styles.openButton : styles.closeButton}
                    onPress={() => setIsOpen(!isOpen)}
                >
                    {/* <Text style={styles.text}>{data[index]}</Text> */}
                    <Text style={styles.text}>
                        {props.user.children[0].name.first}
                    </Text>
                    <View style={isOpen ? styles.arrowOpen : styles.arrow}>
                        {Icons.arrowDown}
                    </View>
                </TouchableOpacity>
                {isOpen ? (
                    <View style={styles.list}>
                        <FlatList
                            data={props.user.children}
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

const mapStateToProps = (state: any) => {
    const { user } = state;
    return { user };
};

export default connect(mapStateToProps)(OpenList);
