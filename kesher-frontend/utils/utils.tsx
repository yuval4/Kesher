import { Platform } from "react-native";
import * as ImagePicker from "expo-image-picker";
import * as MediaLibrary from "expo-media-library";
import * as FileSystem from "expo-file-system";

const folderPath = FileSystem.documentDirectory + "images";

export const createImagesDirectory = async () => {
    const folderInfo = await FileSystem.getInfoAsync(folderPath);
    if (!folderInfo.exists) {
        await FileSystem.makeDirectoryAsync(folderPath);
    }
};

export const getMediaLibraryPermission = async () => {
    if (Platform.OS !== "web") {
        const imagePickerStatus =
            await ImagePicker.requestMediaLibraryPermissionsAsync();
        const mediaLibraryStatus = await MediaLibrary.requestPermissionsAsync();
        if (
            imagePickerStatus.status !== "granted" ||
            mediaLibraryStatus.status !== "granted"
        ) {
            alert("Sorry, we need permissions to make this work!");
        }
    }
};

export const saveImage = async (uri: string, imageName: string) => {
    try {
        const image = await FileSystem.downloadAsync(
            uri,
            folderPath + imageName
        );
        await MediaLibrary.saveToLibraryAsync(image.uri);
        alert("image was saved");
    } catch (err) {
        alert(err);
    }
};

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
