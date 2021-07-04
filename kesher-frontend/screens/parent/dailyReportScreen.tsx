import React from "react";
import { FlatList, StyleSheet, Text, View } from "react-native";
import { connect } from "react-redux";
import GradientVertical from "../../components/gradientVertical";
import ReportsAndComments from "../../components/reportsAndComments";

function DailyReportScreen(props: any) {
    return <ReportsAndComments child={props.user.children[0]._id} />;
    // return (
    //     <>
    //         <GradientVertical>
    //             {/* <Text>ok</Text> */}
    //             <ReportsAndComments child={props.user.children[0]._id} />
    //         </GradientVertical>
    //     </>
    // );
}

const mapStateToProps = (state: any) => {
    const { user } = state;
    return { user };
};

export default connect(mapStateToProps)(DailyReportScreen);
