import { Platform } from "react-native";
import * as ImagePicker from "expo-image-picker";

export const createFormData = (photo, body) => {
    const data = new FormData();

    data.append("photo", {
        name: "image",
        uri: photo.uri,
    });

    Object.keys(body).forEach((key) => {
        data.append(key, body[key]);
    });

    return data;
};

export const getMediaLibraryPermission = async () => {
    if (Platform.OS !== "web") {
        const { status } =
            await ImagePicker.requestMediaLibraryPermissionsAsync();
        if (status !== "granted") {
            alert("Sorry, we need camera roll permissions to make this work!");
        }
    }
};

export const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
        allowsEditing: true,
        aspect: [3, 3],
        quality: 1,
        base64: false,
    });

    if (!result.cancelled) {
        return result;
    }
};
