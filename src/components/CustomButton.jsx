import React from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";


export const CustomButton = ({ children, onPress, buttonStyle, textStyle}) => {
    return (
        <View style={[styles.container, buttonStyle]}>
            <Pressable android_ripple={{ color: 'rgba(0,0,0,0.5)' }} style={[styles.pressable, buttonStyle ]} onPress={onPress}>
                <Text style={[styles.text, textStyle]}>{children}</Text>
            </Pressable>
        </View>
    )
}

const styles = StyleSheet.create({
    container: { 
        alignSelf: 'center',
        width: 350,
        borderRadius: 50,
        overflow: 'hidden'
    },
    pressable: {
        height: 40,
        width: 350,
        borderRadius: 50,
        backgroundColor: '#018068',
        paddingHorizontal: 10,
        paddingVertical: 10,

    },
    text: {
        color: 'white',
        alignSelf: 'center',
        fontSize: 15
    },
});