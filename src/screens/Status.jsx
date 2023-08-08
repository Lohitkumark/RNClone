import React from "react";
import { StyleSheet, Text, View, useColorScheme, Image } from "react-native";
import { AddStatusIcon } from "../uiComponents/AddStatusIcon";
import StatusMenuIcon from "react-native-vector-icons/Ionicons"


export const Status = () => {
    const isDarkMode = useColorScheme() === 'dark';
    return (
        <View style={[styles.container, { backgroundColor: isDarkMode ? '#101B20' : 'white' }]}>
            <View style={{ flexDirection: 'row' }}>
                <AddStatusIcon />
                <View style={{ alignContent: 'center', justifyContent: 'center' }}>
                    <Text style={{ fontSize: 15, color: isDarkMode ? 'white' : 'black', fontWeight:'bold' }}>My status</Text>
                    <Text style={{ fontSize: 10, color: isDarkMode ? 'white' : 'black' }}>Tap to add status</Text>
                </View>
                <StatusMenuIcon name="ellipsis-horizontal" size={25} style={styles.menu}/>
            </View>
            <Text style={{ margin: 15, marginTop: 0, color: isDarkMode ? 'white' : 'black', fontSize:12, fontWeight:'bold' }}>Recent updates</Text>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    menu:{
        position:"absolute",
        right:15,
        alignSelf:'center'
    }
});