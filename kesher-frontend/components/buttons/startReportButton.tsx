import React from 'react'
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native'
import globalStyles from '../../assets/globalStyles'
import Icons from '../../assets/icons/icons'
// import icons from '../assets/icons/icons';

export default function StartReportButton({ onPress }: {onPress: () => void}) {
    return (
        <View style={styles.container}>
            <TouchableOpacity onPress={onPress}>
                {Icons.textBubble}
                <View style={styles.title}>
                    <Text style={styles.text}>התחל</Text>
                    <Text style={styles.text}>דיווח</Text>
                </View>
            </TouchableOpacity>
            
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        width: 76,
        height: 76,
        backgroundColor: globalStyles.color.mediumPurplel,
        shadowOffset: {
            width: 1,
            height: 2,
        },
        shadowOpacity: 0.2,
        shadowRadius: 10,
        borderRadius: 50,
        justifyContent: 'center',
        alignItems: 'center',
    },
    text: {
        fontFamily: globalStyles.font.semiBold,
        fontSize: 12,
        lineHeight: 12,
        alignItems: 'center',
        textAlign: 'center',
        letterSpacing: 0.1,
        color: globalStyles.color.text,
    },
    title: {
        marginTop: 3,
    }
})
