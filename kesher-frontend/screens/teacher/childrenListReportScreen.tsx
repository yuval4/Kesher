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
    const [DATA, setDATA] = useState([]);

    // ANCHOR getting the data from the server
    useEffect(() => {
        const getData = async () => {
            const childrenResponse = await api
                .schools()
                .getChildren(props.user.schools[0]);

            //ANCHOR update profile pic
            let childrenList = childrenResponse.data.children;
            childrenList.forEach((child: any) => {
                child.profilePic = `${api.URL}/${child.profilePic}`
                    .split(/\\/g)
                    .join("/");
            });

            setDATA(childrenList);
        };
        getData();
    }, []);

    // ANCHOR handle child press, navigae to the next screen and store it in redux
    const handlePress = (item: any) => {
        dispatch({
            type: "SET_REPORT",
            data: {
                child_id: item._id,
                name: { first: item.name.first, last: item.name.last },
                profilePic: item.profilePic,
            },
        });
        props.navigation.navigate("ReportStack");
    };

    return (
        <View style={styles.container}>
            <FlatList
                data={DATA}
                numColumns={3}
                style={styles.list}
                keyExtractor={(item) => item._id}
                renderItem={({ item }) => (
                    <View>
                        <TouchableOpacity
                            style={styles.item}
                            onPress={() => handlePress(item)}
                        >
                            <Image
                                style={styles.image}
                                source={{
                                    uri: item.profilePic,
                                }}
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
        marginTop: 20,
    },
    list: {
        alignSelf: "center",
    },
    item: {
        alignItems: "center",
        marginHorizontal: "4.5%",
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
