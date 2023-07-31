import { Alert, StyleSheet, View, Text, Image, useColorScheme } from "react-native"

export const ContactItem = ({ name }) => {
    const isDarkMode = useColorScheme() === 'dark';
    return (
        <View style={styles.contact}>
            <View style={styles.profileContainer}>
                <Image style={styles.profileIcon} source={require('../assets/images/defaultProfile.png')} />
            </View>
            <Text style={[styles.name, {color: isDarkMode ? 'white' : 'black'}]}>{name}</Text>
            <Text style={[styles.statusText, {color: isDarkMode ? 'white' : 'black'}]}>Status Text</Text>
        </View>
    )
}

const styles = StyleSheet.create({
    contact: {
        height: 60,

    },
    name: {
        fontWeight: 'bold',
        color: 'black',
        fontSize: 17,
        left: 70,
        top: 15
    },
    statusText: {
        color: 'black',
        fontSize: 13,
        left: 70,
        top: 15
    },
    profileContainer: {
        position: 'absolute',
        margin: 15,
        height: 40,
        borderRadius: 50,
        width: 40,
    },
    profileIcon: {
        position: 'relative',
        alignSelf: 'center',
        width: 40,
        height:40
    },
})