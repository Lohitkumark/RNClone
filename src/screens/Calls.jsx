import React from "react";
import { StyleSheet, Text, View, useColorScheme } from "react-native";
import { IconContainer } from "../uiComponents/IconContainer";
import LinkIcon from 'react-native-vector-icons/Fontisto'


export const Calls = () => {
    const isDarkMode = useColorScheme() === 'dark';
    return (
        <View style={[styles.container, { backgroundColor: isDarkMode ? '#101B20' : 'white' }]}>
            <View style={{ flexDirection: 'row' }}>
                <IconContainer style={styles.callLinkIcon}>
                    <LinkIcon style={styles.linkIcon} name='link' size={18} color='white' />
                </IconContainer>
                <View style={{ alignContent: 'center', justifyContent: 'center' }}>
                    <Text style={{ fontSize: 15, color: isDarkMode ? 'white' : 'black', fontWeight: 'bold' }}>Create call link</Text>
                    <Text style={{ fontSize: 10,color: isDarkMode ? 'white' : 'black' }}>Share a link for your Whatsapp call</Text>
                </View>
            </View>
            <Text style={{ margin: 15, marginTop: 0, fontSize:12, color: isDarkMode ? 'white' : 'black', fontWeight: 'bold' }}>Recent</Text>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    callLinkIcon: {
        margin: 15,
        backgroundColor: '#018068',
    },
    linkIcon: {
        alignSelf: 'center',
        top: 13,
    }
});