import React from "react";
import { StyleSheet, Text, View, useColorScheme } from "react-native";


export const Calls = () => {
    const isDarkMode = useColorScheme() === 'dark';
    return (
        <View style={[styles.container, {backgroundColor: isDarkMode ? '#101B20' : 'white'}]}>
            <Text>Calls</Text>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex:1,
        alignItems:"center",
        justifyContent: "center"
    }
});