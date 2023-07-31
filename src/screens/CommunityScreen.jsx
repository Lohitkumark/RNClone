import React from "react";
import { StyleSheet, Text, View, Image, ScrollView, useColorScheme } from "react-native";
import { CustomButton } from "../components/CustomButton";


export const CommunityScreen = () => {
    const isDarkMode = useColorScheme() === 'dark';

    return (
        <ScrollView style={[styles.container, {backgroundColor: isDarkMode ? '#101B20' : 'white'}]}>
            <View >
                <Image style={styles.communityImage} source={require('../assets/images/community.png')} />
                <Text style={[styles.title,{color: isDarkMode ? 'white' : 'black'}]}>Introducing Communities</Text>
                <Text style={[styles.content, {color: isDarkMode ? 'white' : 'black'}]}>Easily organize your related groups and send announcements. Now, your communities, like neighborhoods or schools, can have their own space.</Text>
                <CustomButton children='Start Your Community' buttonStyle={styles.button} ></CustomButton>
            </View>
        </ScrollView>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        position: 'relative',
        // alignSelf: 'center',

    },
    communityImage: {
        width: 200,
        height: 120,
        alignSelf: 'center',
        marginTop: 30,
    },
    title: {
        fontWeight: 'bold',
        fontSize: 20,
        alignSelf: 'center',
        marginTop: 30,
        color: 'black'
    },
    content: {
        alignSelf: 'center',
        textAlign: 'center',
        marginBottom: 50,
        margin: 10,
        color: 'black'
    },
    button: {
        width: 350,
        height: 40
    }

});