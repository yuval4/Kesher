import React from 'react'
import { StyleSheet, Text, View } from 'react-native'
import globalStyles from '../../assets/globalStyles';
import SmallButton from '../../components/buttons/smallButton';

export default function CoronaScreen() {
    const [isSent, setIsSent] = React.useState(false);

    return (
        <View style={styles.container}>
            {isSent ? 
                <View style={styles.sentTopBox}>
                    <Text style={styles.mainTitle}>הצהרת קורונה יומית</Text>
                    <Text style={styles.subTitle}>✔ תלמיד/ה עם הצהרת קורונה תקינה.</Text>
                    <Text style={styles.subTitle}>ההצהרה נשמרה לאחרונה ב30/3/2021</Text>
                    <Text style={styles.subTitle}>בשעה 7:50 על ידי מיכל נווה (איתמר נווה)</Text>
                </View>
            :
                <View style={styles.topBox}>
                    <Text style={styles.mainTitle}>הצהרת קורונה יומית</Text>
                    <Text style={styles.subTitle}>סטטוס הצהרת בריאות יומית להיום:</Text>
                    <Text style={styles.subTitle}>⚠ תלמיד/ה ללא הצהרת בריאות.</Text>
                </View>
        
        }
            
            <Text>hihhhhhhhhhhh</Text>
            <SmallButton text='אני מצהיר' onPress={() => setIsSent(!isSent)} />
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        alignItems: 'center',
    },
    topBox: {
        width: '90%',
        backgroundColor: globalStyles.color.lightPurple,
        borderWidth: 0.4,
        borderColor: globalStyles.color.mediumPurplel,
        borderRadius: 16,
        marginTop: 35,
        padding: 12
    },
    sentTopBox: {
        width: '90%',
        backgroundColor: '#FFEEB2',
        borderWidth: 0.4,
        borderColor: '#FFC800',
        borderRadius: 16,
        marginTop: 35,
        padding: 12
    },
    mainTitle: {
        fontFamily: globalStyles.font.semiBold,
        fontSize: 20,
        lineHeight: 24,
        alignItems: 'center',
        textAlign: 'center',
        letterSpacing: 3.6,
        color: globalStyles.color.purple
    },
    subTitle: {
        fontFamily: globalStyles.font.regular,
        fontSize: 16,
        lineHeight: 20,
        alignItems: 'center',
        textAlign: 'center',
        letterSpacing: 0.83,
        color: globalStyles.color.text,

    }
})
