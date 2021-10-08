import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { useAppSelector } from "../../app/hooks";

export default function SchoolDetailsScreen() {
    const school = useAppSelector((state) => state.user.currentSchool);

    return (
        <View>
            <Text>SchoolDetails</Text>

            <Text>name: {school.name}</Text>
        </View>
    );
}

const styles = StyleSheet.create({});
