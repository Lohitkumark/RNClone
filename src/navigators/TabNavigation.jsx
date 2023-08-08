import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import React, { useEffect, useRef } from "react";
import { Animated, Dimensions, Easing, Pressable, StyleSheet, Text, TouchableOpacity, View, useColorScheme } from "react-native";
import { Status } from "../screens/Status";
import { Chats } from "../screens/Chats";
import { Calls } from "../screens/Calls";
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'
import { CommunityScreen } from "../screens/CommunityScreen";
import MaterialCommunityIcon from 'react-native-vector-icons/MaterialCommunityIcons';
import { useNavigation } from "@react-navigation/native";
import MaterialIcon from 'react-native-vector-icons/MaterialIcons';

const Tab = createMaterialTopTabNavigator();


export const TabNavigation = ({ setActiveTab, activeTab, showSearch, closeSearch }) => {
    const navigation = useNavigation()
    const isDarkMode = useColorScheme() === 'dark';
    const width = Dimensions.get('window').width;

    const slideIconAnim = useRef(new Animated.Value(0));

    useEffect(() => {
        Animated.timing(slideIconAnim.current, {
            toValue: activeTab === 'Status' ? 0 : 55,
            duration: 150,
            useNativeDriver: true,
            easing: Easing.linear
        }).start();
    }, [activeTab])

    return (
        <View style={{ flex: 1}}>
            <Tab.Navigator initialRouteName="Chats" screenOptions={{
                tabBarAndroidRipple: { borderless: false },
                tabBarActiveTintColor: isDarkMode ? '#018068' : 'white',
                tabBarInactiveTintColor: isDarkMode ? 'grey' : '#DFE0DD',
                tabBarStyle: {
                    backgroundColor: isDarkMode ? '#212C32' : '#018068',
                    elevation: 50,
                    paddingTop:  showSearch && activeTab === 'Chats' ? 25 : 0,

                },
                tabBarItemStyle: {
                    width:'auto',
                    justifyContent: 'center',
                },
            }} style={styles.container}>
                <Tab.Screen name="Community" component={CommunityScreen} listeners={{
                    focus: e => {
                        setActiveTab("Community")
                        closeSearch()
                    }

                }} options={{
                    tabBarLabel: () => null,
                    tabBarIcon: () => (
                        <Icon name="account-group"
                            color={
                                (activeTab === 'Community' && isDarkMode) ? '#018068' :
                                    (activeTab !== 'Community' && isDarkMode) ? 'grey' :
                                        (activeTab === 'Community' && !isDarkMode) ? 'white' :
                                            (activeTab !== 'Community' && !isDarkMode) ? '#DFE0DD' : null
                            }
                            size={23}
                        />
                    ),
                    tabBarIconStyle: {
                        width:28,
                    },
                    tabBarIndicatorStyle: {
                        backgroundColor: isDarkMode ? '#018068' : 'white',
                        width: 1
                    },
                }} />
                <Tab.Screen name="Chats" style={{ width: 10 }} component={Chats} listeners={{
                    focus: e => {
                        setActiveTab("Chats")
                        closeSearch()
                    }
                }} options={{
                    tabBarLabelStyle: {
                        fontWeight: 'bold',
                        textTransform: 'none',
                        width:(width - 120)/3,
                        margin:0,

                    },
                    tabBarIndicatorStyle: {
                        backgroundColor: isDarkMode ? '#018068' : 'white',
                        width: 1
                    },
                }} />
                <Tab.Screen name="Status" component={Status} listeners={{
                    focus: e => {
                        setActiveTab("Status")
                        closeSearch()
                    }
                }} options={{
                    tabBarLabelStyle: {
                        fontWeight: 'bold',
                        textTransform: 'none',
                        width:(width - 120)/3,
                        margin:0,
                    },
                    tabBarIndicatorStyle: {
                        backgroundColor: isDarkMode ? '#018068' : 'white',
                        width: 1
                    },
                }} />
                <Tab.Screen name="Calls" component={Calls} listeners={{
                    focus: e => {
                        setActiveTab("Calls")
                        closeSearch()
                    }
                }} options={{
                    tabBarLabelStyle: {
                        fontWeight: 'bold',
                        textTransform: 'none',
                        width:(width - 120)/3,
                        margin:0,
                    },
                    tabBarIndicatorContainerStyle:{
                        padding:0
                    },
                    tabBarIndicatorStyle: {
                        backgroundColor: isDarkMode ? '#018068' : 'white',
                        width: 1,
                    },
                }} />
            </Tab.Navigator>
            {activeTab !== 'Community' && <View style={{ position: 'absolute', alignSelf: 'flex-end', bottom: 5 }} >
                {activeTab === 'Chats' ?
                    <Pressable style={styles.messageIconWrapper} onPress={() => navigation.navigate('Contacts')}>
                        <MaterialCommunityIcon name='android-messages' size={23} style={styles.messageIcon} color={isDarkMode ? 'black' : 'white'} />
                    </Pressable>
                    : activeTab === 'Status' ?
                        <View style={styles.messageIconWrapper}>
                            <MaterialCommunityIcon name='camera' size={23} style={styles.statusIcon} color={isDarkMode ? 'black' : 'white'} onPress={()=>navigation.navigate('CameraScreen')}/>
                        </View>
                        : activeTab === 'Calls' ?
                            <View style={styles.messageIconWrapper}>
                                <MaterialCommunityIcon name='phone-plus' size={23} color={isDarkMode ? 'black' : 'white'} style={styles.callsIcon} onPress={()=>navigation.navigate('Contacts')}/>
                            </View> : null}
                <Animated.View style={[styles.editIconWrapper, { translateY: slideIconAnim.current }, { backgroundColor: isDarkMode ? '#212C32' : '#D8D8D9' }]}>
                    <MaterialIcon name='edit' color={isDarkMode ? 'white' : 'grey'} size={20} style={styles.editIcon} />
                </Animated.View>
            </View>}
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        elevation: 0, // Add Android shadow
    },
    people: {
        flex: 1

    },
    messageIconWrapper: {
        position: "absolute",
        bottom: 20,
        width: 50,
        height: 50,
        borderRadius: 15,
        alignSelf: 'flex-end',
        backgroundColor: '#018068',
        right: 20,
        zIndex: 3,
    },
    editIconWrapper: {
        position: "relative",
        bottom: 85,
        width: 40,
        height: 40,
        borderRadius: 12,
        alignSelf: 'flex-end',
        right: 25,
        zIndex: 1
    },
    messageIcon: {
        position: 'absolute',
        alignSelf: 'center',
        top: 13,
        transform: [{ rotateY: '180deg' }]

    },
    statusIcon: {
        position: 'absolute',
        alignSelf: 'center',
        top: 13,

    },
    callsIcon: {
        position: 'absolute',
        alignSelf: 'center',
        top: 13,

    },
    editIcon: {
        position: 'absolute',
        alignSelf: 'center',
        top: 10,

    },
});