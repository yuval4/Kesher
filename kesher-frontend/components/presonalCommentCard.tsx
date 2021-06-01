import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import globalStyles from '../assets/globalStyles';

export default function PersonalCommentCard({ data }: { data: { value: string, sender: string, timestamp: number} }) {
    const time = new Date(data.timestamp)

    return (
        <View style={styles.container}>
            <Text style={styles.details}>{data.value}</Text>

            <View style={styles.info}>
                <Text style={styles.author}>{data.sender}</Text>
                <Text style={styles.timestamp}>{time.toLocaleDateString()}  {time.getHours()}:{time.getMinutes()}</Text>
            </View>
        </View>
    )
}


const styles = StyleSheet.create({
    container: {
        // width: '90%',
        backgroundColor: globalStyles.color.mediumPurplel,
        borderWidth: 0.4,
        borderColor: globalStyles.color.purple,
        borderRadius: 16,
        shadowOffset: {
            width: 1,
            height: 2,
        },
        shadowOpacity: 0.15,
        shadowRadius: 3,
        paddingHorizontal: 11,
        paddingVertical: 7
    },
    details: {
        fontFamily: globalStyles.font.regular,
        fontSize: 16,
        lineHeight: 18,
        alignItems: 'center',
        textAlign: 'right',
        letterSpacing: 0.1,
        color: globalStyles.color.text,
        marginBottom: 7,
    },
    timestamp: {
        fontFamily: globalStyles.font.regular,
        fontSize: 16,
        lineHeight: 18,
        textAlign: 'right',
        letterSpacing: 0.1,
        color: globalStyles.color.text,
        opacity: 0.55,
        position: 'absolute',
        right: 0,
    },
    author: {
        fontFamily: globalStyles.font.regular,
        fontSize: 16,
        lineHeight: 18,
        textAlign: 'right',
        letterSpacing: 0.1,
        color: globalStyles.color.text,
        opacity: 0.55,
        //marginRight: 10,
    },
    info: {
        flexDirection: 'row-reverse',

    }
})
