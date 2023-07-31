import React, { useState } from "react";
import { Pressable, StyleSheet, Text, View, useColorScheme, TextInput } from "react-native";
import Icon from 'react-native-vector-icons/Ionicons'
import MaterialIcons from 'react-native-vector-icons/MaterialIcons'
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'
import { SearchBox } from "../uiComponents/SearchBox";
import { Divider } from "react-native-paper";


export const SearchChats = ({style, closeSearch}) => {
    const isDarkMode = useColorScheme() === 'dark';

    const itemContainerStyle = [styles.itemsContainer, {backgroundColor: isDarkMode ? '#192228' : '#E4E5E4'}]

    const handleSearchValue = (value) => {

    }
    return (
        <View style={[styles.container, { backgroundColor: isDarkMode ? '#212C32' : 'white' }, style]}>
            <SearchBox closeSearch={closeSearch}/>
            <Divider/>
            <View style={styles.itemWrapper}>
                <View style={styles.searchItemContainer}>
                    <View style={itemContainerStyle}>
                        <MaterialIcons name='mark-chat-unread' size={15} style={styles.itemIcons} />
                        <Text>Unread</Text>
                    </View>
                    <View style={itemContainerStyle}>
                        <MaterialIcons name='photo' size={15} style={styles.itemIcons}/>
                        <Text>Photos</Text>
                    </View>
                    <View style={itemContainerStyle}>
                        <MaterialIcons name='videocam' size={15} style={styles.itemIcons}/>
                        <Text>Videos</Text>
                    </View>
                    <View style={itemContainerStyle}>
                        <MaterialIcons name='insert-link' size={15} style={styles.itemIcons}/>
                        <Text>Links</Text>
                    </View>
                </View>
                <View style={styles.searchItemContainer}>
                    <View style={itemContainerStyle}>
                        <MaterialIcons name='gif' size={30} style={styles.gifIcons}/>
                        <Text>GIF's</Text>
                    </View>
                    <View style={itemContainerStyle}>
                        <MaterialCommunityIcons name='headphones' size={15} style={styles.itemIcons}/>
                        <Text>Audio</Text>
                    </View>
                    <View style={itemContainerStyle}>
                        <MaterialCommunityIcons name='text-box' size={15} style={styles.itemIcons}/>
                        <Text>Documents</Text>
                    </View>
                    <View style={itemContainerStyle}>
                        <MaterialCommunityIcons name='equalizer' size={15} style={styles.itemIcons}/>
                        <Text>Polls</Text>
                    </View>
                </View>
            </View>
        </View>
    )
}


const styles = StyleSheet.create({
    container: {
        flex:0,
        height:130
    },
    iconsContainer: {
        flex: 0,
        flexDirection: 'row',
        alignSelf: 'flex-end',
        right: 10,
        top: 10,
    },
    itemWrapper:{
        flexDirection:'column',
    },
    icons: {
        justifyContent: 'center',
        alignItems: 'center',
        paddingLeft: 20,
        

    },
    backArrow: {
        position: 'absolute',
        left: 10,
        top: 8
    },
    inputContainer: {
        position: 'relative',
        left: 50,
        // flexDirection: 'column'
    },
    searchItemContainer: {
        position: 'relative',
        flex: 0,
        flexDirection: 'row',
        flexBasis: 40,
    },
    itemsContainer: {
        position: 'relative',
        justfyContent: 'center',
        alignSelf:'center',
        height: 27,
        marginVertical:5,
        borderRadius: 50,
        flexDirection: 'row',
        paddingHorizontal: 20,
        paddingTop: 4,
        marginRight: 5,
        left: 5,
    },
    itemIcons:{
        paddingRight:5,
        marginLeft:-10,
        paddingRight:5
    },
    gifIcons:{
        bottom: 6,
        marginLeft:-15
    }
});