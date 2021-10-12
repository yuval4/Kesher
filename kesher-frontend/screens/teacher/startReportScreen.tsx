import React, { useEffect } from "react";
import { Button, StyleSheet, Text, View } from "react-native";
import api from "../../api";
import { useAppSelector } from "../../app/hooks";

export default function StartReportScreen() {
    const child = useAppSelector((state) => state.report);

    useEffect(() => {
        const getReports = async () => {
            const reports = await api
                .reports()
                .getAllChildReports(child.child_id);
            console.log(reports.data);
        };
        getReports();
    }, []);

    const handleStartReport = () => {
        console.log("object");
    };

    return (
        <View>
            <Text></Text>
            <Button title="start meal report" onPress={handleStartReport} />
        </View>
    );
}

const styles = StyleSheet.create({});
