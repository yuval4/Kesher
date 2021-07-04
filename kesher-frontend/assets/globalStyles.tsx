import { Dimensions } from "react-native";

const globalStyles = {
    color: {
        text: "#3A3A35",
        purple: "#804ED9",
        mediumPurplel: "#A683E4",
        lightPurple: "#F0E8FF",
        messageboxPurple: "#B097DC",
    },

    font: {
        regular: "Assistant-Regular",
        semiBold: "Assistant-SemiBold",
        bold: "Assistant-Bold",
    },
    backgroundColor: "#fff",
    window: {
        height: Dimensions.get("window").height,
        width: Dimensions.get("window").width,
    },
};

export default globalStyles;
