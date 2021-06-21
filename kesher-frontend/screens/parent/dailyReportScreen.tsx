import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { connect } from "react-redux";
import ReportsAndComments from "../../components/reportsAndComments";

function DailyReportScreen(props: any) {
    return <ReportsAndComments child={props.user.children[0]._id} />;
}

const mapStateToProps = (state: any) => {
    const { user } = state;
    return { user };
};

export default connect(mapStateToProps)(DailyReportScreen);
