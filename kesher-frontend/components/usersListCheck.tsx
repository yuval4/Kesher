import React, { useEffect, useState } from "react";
import {
    FlatList,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from "react-native";
import api from "../api";
import UserCard from "./userCard";

export default function UsersListCheck({
    schoolId,
    choosenUserId,
    setChoosenUserId,
}: {
    schoolId: string;
    choosenUserId: string;
    setChoosenUserId: () => void;
}) {
    const [users, setUsers] = useState();

    useEffect(() => {
        const getUsers = async () => {
            const response = await api.users().getAllStaff();
            setUsers(response.data);
        };

        getUsers();
    }, [schoolId]);

    return (
        <View style={styles.container}>
            <FlatList
                data={users}
                style={styles.list}
                keyExtractor={(item, index) => index.toString()}
                renderItem={({ item }) => (
                    <TouchableOpacity
                        onPress={() => setChoosenUserId(item._id)}
                        style={item._id === choosenUserId && { borderWidth: 1 }}
                    >
                        <UserCard name={item.name} image={item.profilePic} />
                    </TouchableOpacity>
                )}
            />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        width: "92%",
    },
    list: {},
});
