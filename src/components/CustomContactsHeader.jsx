import { View, StyleSheet, Pressable, Text, TextInput, useColorScheme } from "react-native"
import { useState } from 'react';
import Icon from 'react-native-vector-icons/Ionicons'
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'
import AsyncStorage from '@react-native-async-storage/async-storage';

export const CustomContactsHeader = ({ navigation, handleSearchValue, searchValue }) => {
    const [allContactsCount, setAllContactsCount] = useState('')
    const [showSearchInput, setShowSearchInput] = useState(false)
    const [keyType, setKeyType] = useState(true)
    const isDarkMode = useColorScheme() === 'dark';
    AsyncStorage.getItem('allContactsCount').then(item => {
        const count = JSON.parse(item);
        setAllContactsCount(count?.allContactsCount)
    });

    const handlePress = (value) => {
        if (value === 'search') {
            console.log('search');
            setShowSearchInput(true)
        } else if (value === 'menu') {
            console.log('menu');
        }
    }

    const togglekeyboard = () => {
        setKeyType(prevKeyType => !prevKeyType);
    }

    return (
        showSearchInput ?
            <View style={{ height: 50, backgroundColor: isDarkMode ? '#212C32' : '#018068' }}>
                <Pressable onPress={() => { setShowSearchInput(false); setKeyType(true); handleSearchValue('') }}>
                    <Icon style={styles.backArrow} name='arrow-back-outline' size={30} color='grey'></Icon>
                </Pressable>
                <View style={styles.headerTitleContainer}>
                    <TextInput placeholder='Search name or number' value={searchValue} onChangeText={(value) => handleSearchValue(value)} autoFocus={true} keyboardType={!keyType ? 'phone-pad' : 'default'} />
                </View>
                <Pressable style={styles.iconsContainer}>
                    <MaterialCommunityIcons
                        style={styles.icons}
                        size={22}
                        name="dialpad"
                        color='grey'
                        onPress={togglekeyboard}
                    />
                </Pressable>
            </View>
            :
            <View style={{ height: 50, backgroundColor: isDarkMode ? '#212C32' : '#018068' }}>
                <Pressable onPress={() => navigation.navigate('WhatsApp')}>
                    <Icon style={styles.backArrow} name='arrow-back-outline' size={30} color='white'></Icon>
                </Pressable>
                <View style={styles.headerTitleContainer}>
                    <Text style={styles.tilte}>Select Contact</Text>
                    <Text style={styles.subTitle}>{allContactsCount} contacts</Text>
                </View>
                <View style={styles.iconsContainer}>
                    <Pressable android_ripple={{ color:'white'}}>
                        <Icon
                            style={styles.icons}
                            size={25}
                            name="search"
                            color="white"
                            onPress={() => handlePress('search')}
                        />
                    </Pressable>
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
        top: 10,
    },
    icons: {
        justifyContent: 'center',
        alignItems: 'center',
        paddingLeft: 20

    },
    backArrow: {
        position: 'absolute',
        left: 10,
        top: 8
    },
    headerTitleContainer: {
        position: 'absolute',
        left: 50,
    },
    tilte: {
        fontWeight: 'bold',
        fontSize: 20,
        color: 'white'
    },
    subTitle: {
        fontSize: 12,
        color: 'white'
    }
});