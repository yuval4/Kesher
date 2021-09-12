import React, { useEffect, useState } from "react";
import { StyleSheet, View } from "react-native";
import api from "../../api";
import {
    createFormData,
    getMediaLibraryPermission,
    pickImage,
} from "../../utils/utils";
import { MaterialIcons } from "@expo/vector-icons";
import globalStyles from "../../assets/globalStyles";

export default function UploadImage() {
    useEffect(() => {
        getMediaLibraryPermission();
    }, []);

    const handleSendPhoto = async () => {
        const pickedPhoto = await pickImage();

        if (pickedPhoto) {
            await api
                .reports()
                .uploadImage(createFormData(pickedPhoto, { date: new Date() }));
        }
    };

    return (
        <View>
            <MaterialIcons
                name="add-to-photos"
                size={24}
                color={globalStyles.color.purple}
                onPress={handleSendPhoto}
            />
        </View>
    );
}

const styles = StyleSheet.create({});
