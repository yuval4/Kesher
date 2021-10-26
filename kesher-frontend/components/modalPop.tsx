import React from "react";
import { Modal, StyleSheet, Text, View } from "react-native";

export default function ModalPop({ visible, children }) {
    const [showModal, setShowModal] = React.useState(visible);

    const toggleModal = () => {
        if (visible) {
            setShowModal(true);
        } else {
            setTimeout(() => setShowModal(false), 200);
        }
    };

    React.useEffect(() => {
        toggleModal();
    }, [visible]);
    return (
        <Modal transparent visible={showModal}>
            <View style={styles.modalBackGround}>
                <View style={[styles.modalContainer]}>{children}</View>
            </View>
        </Modal>
    );
}

const styles = StyleSheet.create({
    modalBackGround: {
        flex: 1,
        backgroundColor: "rgba(0,0,0,0.5)",
        justifyContent: "center",
        alignItems: "center",
    },
    modalContainer: {
        width: "90%",
        backgroundColor: "#F6F6F9",
        paddingHorizontal: 20,
        paddingVertical: 30,
        borderRadius: 20,
        elevation: 20,
    },
});
