import { DrawerItem } from '@react-navigation/drawer';
import React, {useState} from 'react'
import { StyleSheet, Text, View, TouchableOpacity, FlatList } from 'react-native'
import globalStyles from '../assets/globalStyles';
import Icons from '../assets/icons/icons';

export default function OpenList() {
    const [index, setIndex] = React.useState(0)
    const [isOpen, setIsOPen] = React.useState(false)
    
    const data = ['איתמר', 'דני', 'הילה'];

    return (
        <View>
            <TouchableOpacity style={isOpen ? styles.openButton : styles.closeButton} onPress={() => setIsOPen(!isOpen)}>
                <Text style={styles.text}>{data[index]}</Text>
                <View style={isOpen ? styles.arrowOpen : styles.arrow}>
                    {Icons.arrowDown}
                </View>
            </TouchableOpacity>
            {isOpen ? 
                <View style={styles.list}>
                    <FlatList
                        data={data}
                        keyExtractor={(index) => index}
                        renderItem={(item) => (
                            <TouchableOpacity onPress={() => {setIndex(item.index); setIsOPen(!isOpen);}}>
                                <Text style={styles.text}>{item.item}</Text>
                            </TouchableOpacity>
                        )}
                    />
                </View>
            : null}
        </View>
    )
}

const styles = StyleSheet.create({
    closeButton: {
        height: 36,
        width: 100,
        backgroundColor: globalStyles.color.purple,
        borderRadius: 16,
        justifyContent: 'center',
        flexDirection: 'row-reverse',
        shadowOffset: {
            width: 0,
            height: 1,
        },
        shadowOpacity: 0.3,
        shadowRadius: 10,
    },
    openButton: {
        height: 36,
        width: 100,
        backgroundColor: globalStyles.color.purple,
        borderTopRightRadius: 16,
        borderTopLeftRadius: 16,
        justifyContent: 'center',
        flexDirection: 'row-reverse',
        shadowOffset: {
            width: 0,
            height: 1,
        },
        shadowOpacity: 0.3,
        shadowRadius: 10,
    },
    list: {
        width: 100,
        backgroundColor: globalStyles.color.purple,
        borderBottomLeftRadius: 16,
        borderBottomRightRadius: 16,
        justifyContent: 'center',
    },
    text: {
        fontFamily: globalStyles.font.bold,
        fontSize: 16,
        lineHeight: 24,
        alignItems: 'center',
        textAlign: 'center',
        letterSpacing: 0.1,
        color: 'white',
        paddingVertical: 7,
    },
    arrowOpen: {
        transform: [{ rotate: '180deg'}],
        justifyContent: 'center',
        marginRight: 10,
        marginLeft: -5,
    },
    arrow: {
        justifyContent: 'center',
        marginRight: 10,
        marginLeft: -5,
    }
})
