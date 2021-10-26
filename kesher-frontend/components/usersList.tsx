import React, { useEffect, useState } from "react";
import { FlatList, StyleSheet, Text, View } from "react-native";
import api from "../api";
import UserCard from "./userCard";

export default function UsersList({ schoolId }: { schoolId: string }) {
    const [users, setUsers] = useState();

    useEffect(() => {
        const getUsers = async () => {
            const response = await api.users().getStaffsBySchoolId(schoolId);
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
                    <UserCard name={item.name} image={item.profilePic} />
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
