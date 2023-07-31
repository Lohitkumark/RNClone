import React from "react";
import { StyleSheet, Text, View, useColorScheme } from "react-native";
import Icon from 'react-native-vector-icons/Ionicons'


export const Chatbox = ({time, message, style, messageType}) => {
    const isDarkMode = useColorScheme() === 'dark';
    return (
        <View style={[styles.container, style]}>
            <View style={[styles.messageText]}>
                <Text style={{color: isDarkMode ? 'white' : 'grey'}}>{message}</Text>
                <Text style={[styles.time, {color: isDarkMode ? 'white' : 'grey'} ]}>{time}</Text>
                {messageType !== 'left' && <Icon name='checkmark-done-sharp' style={styles.checkIcon} color='rgb(82,189,234)' size={20}></Icon> }
            </View>
                <Icon style={messageType === 'left' ? [styles.tailLeft, {color: isDarkMode ? '#018068' : '#D9FCD2'}] : [styles.tailRight, {color: isDarkMode ? '#018068' : '#D9FCD2'}] } name='triangle' size={25} color='white'/>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        position:'relative',
        minHeight: 35,
        borderRadius: 15,
        backgroundColor: 'white',
    },
    messageText: {
        margin: 5,
        alignSelf: 'flex-end',
        justifyContent: 'center',
        paddingRight:90,
        paddingLeft:10,
        maxWidth:300,
    },
    checkIcon: {
        position:'absolute',
        alignSelf: 'flex-end',
        right:5,
        top:6
    },
    time:{
        position:'absolute',
        color:'grey',
        alignSelf: 'flex-end',
        right:30,
        top:7
    },
    tailRight:{
        position:'absolute',
        alignSelf:'flex-end',
        transform:[{rotate:'62deg'}],
        right:-10,
        bottom:17
    },
    tailLeft:{
        position:'absolute',
        alignSelf:'flex-start',
        transform:[{rotate:'-63deg'}],
        left:-10,
        bottom:16
    }
});