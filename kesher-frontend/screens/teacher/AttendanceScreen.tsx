import React, { useEffect, useState } from "react";
import {
    StyleSheet,
    Text,
    View,
    FlatList,
    TouchableOpacity,
    Image,
} from "react-native";
import globalStyles from "../../assets/globalStyles";
import Icons from "../../assets/icons/icons";
import api from "../../api";
import { useAppSelector } from "../../app/hooks";

export default function AttendanceScreen(props: any) {
    const [DATA, setDATA] = useState([]);
    const school = useAppSelector((state) => state.user.currentSchool);

    // ANCHOR get data from server about the children in the school
    // and their attendance and merge them together.
    useEffect(() => {
        const getData = async () => {
            if (school === {} || !school) {
                return;
            }
            const childrenResponse = await api
                .schools()
                .getChildren(school._id);

            let ids: Array<string> = [];
            childrenResponse.data.children.forEach((child: any) => {
                ids.push(child._id);
            });

            let attendanceResponse = await api
                .reports()
                .getChildrenAttendance(ids);

            let dataObject: any = [];

            childrenResponse.data.children.forEach((child: any) => {
                child.attendance = attendanceResponse.data.find(
                    (report: any) => report.child === child._id
                ).attendance;
                dataObject.push(child);
                child.profilePic = `${api.URL}/${child.profilePic}`
                    .split(/\\/g)
                    .join("/");
            });
            setDATA(dataObject);
        };

        // if (school) {
        getData();
        // }
    }, [school]);

    // ANCHOR get the pressed item and toggle it's attendance in DATA
    // and send to the server change the child daily attendace.
    const handleDATAChange = (item: { _id: string; attendance: boolean }) => {
        let children = DATA.map(
            (child: { _id: string; attendance: boolean }) => {
                if (child._id === item._id) {
                    child.attendance = !child.attendance;
                    api.reports().updateChildAttendance(
                        child._id,
                        child.attendance
                    );
                }
                return child;
            }
        );
        setDATA(children);
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
                            onPress={() => handleDATAChange(item)}
                        >
                            <Image
                                style={
                                    item.attendance
                                        ? [styles.image, styles.selected]
                                        : styles.image
                                }
                                source={{
                                    uri:
                                        item.profilePic ??
                                        "../../assets/images/user.png",
                                }}
                            />
                            <View style={styles.selectedV}>
                                {item.attendance ? Icons.v : null}
                            </View>
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
    selected: {
        opacity: 0.6,
        borderWidth: 3,
        borderColor: globalStyles.color.purple,
    },
    selectedV: {
        position: "absolute",
        justifyContent: "center",
        height: globalStyles.window.width * 0.22,
        alignItems: "center",
    },
});
