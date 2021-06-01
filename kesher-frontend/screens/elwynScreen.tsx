import React from 'react'
import { StyleSheet, Text, View, TouchableOpacity} from 'react-native'
import * as WebBrowser from 'expo-web-browser';
import globalStyles from '../assets/globalStyles';
import AppLayout from '../components/appLayout';


export default function ElwynScreen({ navigation }: any) {
    const handlePress = () => {
        WebBrowser.openBrowserAsync(
            'https://israelelwyn.org.il/he/'
          );
    }

    return (
        <View style={styles.container}>
            <TouchableOpacity onPress={handlePress}>
                <Text style={styles.button}>לחצו כאן</Text>
            </TouchableOpacity>
            <Text style={styles.text}>למעבר לאתר אלווין</Text>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        alignItems: 'center',
        justifyContent: 'center',
    },
    button: {
        fontFamily: globalStyles.font.bold,
        fontSize: 32,
        color: globalStyles.color.purple
    },
    text: {
        fontFamily: globalStyles.font.bold,
        fontSize: 32,
    }
})
