import React, { useState } from "react";
import { FlatList, StyleSheet, Text, View } from "react-native";
import { useAppSelector } from "../../app/hooks";
import GradientVertical from "../../components/gradientVertical";
import ReportsAndComments from "../../components/reportsAndComments";

export default function DailyReportScreen() {
    const child = useAppSelector((state) => state.user.currentChild);

    return <ReportsAndComments child={child._id} />;
    // return (
    //     <>
    //         <GradientVertical>
    //             {/* <Text>ok</Text> */}
    //             <ReportsAndComments child={props.user.children[0]._id} />
    //         </GradientVertical>
    //     </>
    // );
}
