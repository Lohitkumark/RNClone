import React from "react";
import { StyleSheet, Text, View, useColorScheme, Image } from "react-native";
import { AddStatusIcon } from "../uiComponents/AddStatusIcon";


export const Status = () => {
    const isDarkMode = useColorScheme() === 'dark';
    return (
        <View style={[styles.container, { backgroundColor: isDarkMode ? '#101B20' : 'white' }]}>
            <View style={{ flexDirection: 'row'}}>
                <AddStatusIcon />
                <View style={{ alignContent:'center', justifyContent:'center'}}>
                    <Text style={{fontSize:20}}>My status</Text>
                    <Text style={{fontSize:15}}>Tap to add status</Text>
                </View>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    profileContainer: {
        position: 'relative',
        margin: 15,
        height: 50,
        borderRadius: 50,
        width: 50,
    },
    profileIcon: {
        position: 'relative',
        alignSelf: 'center',
        width: 50,
        height: 50,
    },
});