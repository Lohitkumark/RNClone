import React from "react";
import { StyleSheet, Text, View, useColorScheme, Image } from "react-native";
import CircleAdd from 'react-native-vector-icons/Ionicons'


export const AddStatusIcon = () => {
    return (
        <View>
            <View style={styles.profileContainer}>
                <Image style={styles.profileIcon} source={require('../assets/images/defaultProfile.png')} />
                <View>
                    
                </View>
                <CircleAdd style={styles.plusIcon}  color='#018068' name='add-circle' size={30}/>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
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
    plusIcon:{
        position:'absolute',
        bottom: -5,
        right:-5,
        borderColor:'red',
        borderWidth:1,
        borderRadius:30,
        width:30,
        height:30,

    }
});