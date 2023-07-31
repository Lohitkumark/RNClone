import React from "react";
import { Pressable, StyleSheet, Text, View, useColorScheme, TextInput } from "react-native";
import Icon from 'react-native-vector-icons/Ionicons'


export const SearchBox = ({closeSearch, style}) => {
    const isDarkMode = useColorScheme() === 'dark';

    const handleSearchValue = (value) => {

    }
    return (
        <View style={[styles.container, style, { backgroundColor: isDarkMode ? '#212C32' : 'white' }]}>
            <Pressable onPress={() => { closeSearch(); handleSearchValue('') }}>
                <Icon style={styles.backArrow} name='arrow-back-outline' size={30} color='grey'></Icon>
            </Pressable>
            <View style={styles.inputContainer}>
                <TextInput placeholder='Search...' onChangeText={(value) => handleSearchValue(value)} autoFocus={true} />
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flexDirection:'row',
        height: 50
    },
    backArrow: {
        position: 'absolute',
        left: 10,
        top: 8
    },
    inputContainer: {
        position: 'relative',
        left: 50,
    },
});