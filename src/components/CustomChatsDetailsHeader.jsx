const { View, StyleSheet, Pressable, Text, Image, TextInput, useColorScheme } = require("react-native");
import Icon from 'react-native-vector-icons/Ionicons'
import MaterialIcon from 'react-native-vector-icons/MaterialIcons'
import { useRoute } from '@react-navigation/native';

export const CustomChatsDetailsHeader = ({ navigation }) => {
    const route = useRoute()
    const isDarkMode = useColorScheme() === 'dark';
    
    return (
        <View style={{ height: 50, backgroundColor: isDarkMode ? '#212C32' : '#018068' }}>
            <Pressable onPress={() => navigation.navigate('WhatsApp')}>
                <Icon style={styles.backArrow} name='arrow-back-outline' size={30} color='white'></Icon>
            </Pressable>
            <Image style={styles.profileIcon} source={require('../assets/images/defaultProfile.png')} />
            <View style={styles.headerTitleContainer}>
                {/* <View style={styles.profileContainer}> */}
                {/* </View> */}
                <Text style={styles.tilte}>{route?.params ? route.params.contact : 'default'}</Text>
                <Text style={styles.subTitle}>Online</Text>
            </View>
            <View style={styles.iconsContainer}>
                <Icon
                    style={styles.icons}
                    size={23}
                    name="videocam"
                    color='white'
                    onPress={() => handlePress('menu')}
                />
                <MaterialIcon
                    style={styles.icons}
                    size={21}
                    name="call"
                    color='white'
                    onPress={() => handlePress('menu')}
                />
                <Icon
                    style={styles.icons}
                    size={20}
                    name="ellipsis-vertical"
                    color='white'
                    onPress={() => handlePress('menu')}
                />
            </View>

        </View>
    );
};

const styles = StyleSheet.create({
    iconsContainer: {
        flex: 0,
        flexDirection: 'row',
        alignSelf: 'flex-end',
        right: 10,
        top: 10
    },
    icons: {
        paddingLeft: 20,

    },
    backArrow: {
        position: 'absolute',
        left: 10,
        top: 8
    },
    headerTitleContainer: {
        position: 'absolute',
        left: 90,
    },
    tilte: {
        fontWeight: 'bold',
        fontSize: 20,
        color: 'white',
    },
    subTitle: {
        fontSize: 12,
        color: 'white'
    },
    profileIcon: {
        position: 'absolute',
        alignSelf: 'flex-start',
        width: 40,
        height: 40,
        left: 40,
        top: 3
    },

});