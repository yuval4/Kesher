import React, { useEffect, useState } from "react";
import {
    StyleSheet,
    Text,
    View,
    FlatList,
    TouchableOpacity,
    Image,
} from "react-native";
import { useDispatch } from "react-redux";
import { connect } from "react-redux";
import api from "../../api";
import globalStyles from "../../assets/globalStyles";

function ChildrenListReportScreen(props: any) {
    const dispatch = useDispatch();
    const [DATA, setDATA] = React.useState([]);

    // ANCHOR getting the data from the server
    useEffect(() => {
        const getData = async () => {
            const childrenResponse = await api
                .schools()
                .getChildren(props.user.schools[0]);
            setDATA(childrenResponse.data.children);
        };
        getData();
    }, []);

    // ANCHOR handle child press, navigae to the next screen and store it in redux
    const handlePress = (item: any) => {
        props.navigation.navigate("StartReport");
        dispatch({
            type: "SET_REPORT",
            data: {
                child_id: item._id,
                name: { first: item.name.first, last: item.name.last },
                profilePic: item.profilePic,
            },
        });
    };

    return (
        <View style={styles.container}>
            <FlatList
                data={DATA}
                numColumns={3}
                columnWrapperStyle={styles.column}
                keyExtractor={(item) => item._id}
                renderItem={({ item }) => (
                    <View>
                        <TouchableOpacity
                            style={styles.item}
                            onPress={() => handlePress(item)}
                        >
                            <Image
                                style={styles.image}
                                source={{ uri: item.profilePic }}
                            />
                            <Text style={styles.name}>
                                {item.name.first} {item.name.last}
                            </Text>
                        </TouchableOpacity>
                    </View>
                )}
            />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        alignContent: "center",
        marginHorizontal: 30,
        marginTop: 20,
    },
    column: {
        // justifyContent: 'center',
        // alignItems: 'center',
        justifyContent: "space-between",
    },
    item: {
        alignItems: "center",
        marginBottom: 25,
    },
    image: {
        borderRadius: 500,
        width: globalStyles.window.width * 0.22,
        height: globalStyles.window.width * 0.22,
    },
    name: {
        fontSize: 12,
        lineHeight: 16,
        alignItems: "center",
        textAlign: "center",
        letterSpacing: 0.1,
        color: globalStyles.color.text,
        fontFamily: globalStyles.font.bold,
        marginTop: 10,
    },
});

const mapStateToProps = (state: any) => {
    const { user } = state;
    return { user };
};

export default connect(mapStateToProps)(ChildrenListReportScreen);
