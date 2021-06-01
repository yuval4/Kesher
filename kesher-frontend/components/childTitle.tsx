import React, { useEffect } from "react";
import { StyleSheet, Text, View, Image } from "react-native";
import { connect } from "react-redux";

function ChildTitle(props: any) {
    return (
        <View style={styles.container}>
            <Image
                style={styles.image}
                source={{ uri: props.report.profilePic }}
            />
            <Text style={styles.name}>
                {props.report.name.first} {props.report.name.last}
            </Text>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flexDirection: "row-reverse",
        alignItems: "center",
        marginTop: 30,
        marginRight: "15%",
    },
    name: {
        fontFamily: "Assistant-Bold",
        fontSize: 16,
        lineHeight: 24,
        textAlign: "right",
        letterSpacing: 0.1,
        color: "#804ED9",
        marginLeft: 5,
    },
    image: {
        borderRadius: 50,
        width: 68,
        height: 68,
        alignSelf: "center",
        marginLeft: 15,
    },
});

const mapStateToProps = (state: any) => {
    const { report } = state;
    return { report };
};

export default connect(mapStateToProps)(ChildTitle);
