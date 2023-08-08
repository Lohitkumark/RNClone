import React, { useEffect, useRef, useState } from "react";
import { StyleSheet, Text, View, TextInput, Keyboard, Image, Dimensions, Animated, Easing, Pressable, VirtualizedList, useColorScheme, KeyboardAvoidingView, Modal } from "react-native";
import Icon from 'react-native-vector-icons/Ionicons'
import MaterialIcon from 'react-native-vector-icons/MaterialIcons'
import FontAwesome from 'react-native-vector-icons/FontAwesome'
import IonIcons from 'react-native-vector-icons/Ionicons'
import MaterialCommunityIcon from 'react-native-vector-icons/MaterialCommunityIcons'
import { Chatbox } from "../uiComponents/ChatBox";
import { useDispatch, useSelector } from 'react-redux'
import { setChatMessages } from "../../redux/slices/chatSlice";
import { IconContainer } from "../uiComponents/IconContainer";


export const ChatsDetails = (props) => {
    const { navigation, route } = props
    const [messageInput, setMessageInput] = useState('')
    const [messageList, setMessageList] = useState([])
    const isDarkMode = useColorScheme() === 'dark';
    const [showMenu, setShowMenu] = useState(false)
    const [isKeyboardVisible, setKeyboardVisible] = useState(false);

    const width = Dimensions.get('window').width;

    const dispatch = useDispatch()

    useEffect(() => {
        const keyboardDidShowListener = Keyboard.addListener(
            'keyboardDidShow',
            () => {
                setKeyboardVisible(true);
            },
        );
        const keyboardDidHideListener = Keyboard.addListener(
            'keyboardDidHide',
            () => {
                setKeyboardVisible(false);
            },
        );

        return () => {
            keyboardDidHideListener.remove();
            keyboardDidShowListener.remove();
        };
    }, []);

    const { chatMessages } = useSelector((state) => state.chats)
    const handleMessageChange = (input) => {
        setMessageInput(input)
    }

    useEffect(() => {
        if (chatMessages.hasOwnProperty((route.params.phNumber))) {
            setMessageList(chatMessages[route.params.phNumber]);
        }
    }, [chatMessages])

    const handleSend = () => {
        if (messageInput === '') {
            return
        }
        const time = new Date().toLocaleTimeString([], { hour: '2-digit', minute: "2-digit", hour12: true })
        const data = {
            message: messageInput,
            number: route?.params?.phNumber,
            time: time,
            name: route?.params?.contact
        }
        dispatch(setChatMessages(data))
        setMessageInput('')
    }

    const handleOpenCamera = () => {
        navigation?.navigate('CameraScreen')
    }

    const slideIconAnim = useRef(new Animated.Value(0));

    useEffect(() => {
        Animated.timing(slideIconAnim.current, {
            toValue: messageInput === '' ? 0 : 12,
            duration: 150,
            useNativeDriver: true,
            easing: Easing.linear
        }).start();
    }, [messageInput])

    const getItemCount = () => messageList.length;

    const getItem = (messageList, index) => messageList[index];

    const linkItemsMenu = () => {
        return (
            <View style={{ height: 170, width: width - 10, backgroundColor: 'white', borderRadius: 10, position: 'absolute', bottom: 50 }}>
                <View style={{ alignSelf: 'center', top: 10 }}>
                    <View style={styles.iconContainer}>
                        <View>
                            <IconContainer style={[styles.icons, { backgroundColor: '#5E64CC' }]} >
                                <IonIcons name='document' color='white' size={20} style={{ alignSelf: 'center', top: 12 }} />
                            </IconContainer>
                            <Text style={{ position: 'absolute', alignSelf: 'center', bottom: -12, fontSize: 12 }}>Document</Text>
                        </View>
                        <View>
                            <IconContainer style={[styles.icons, { backgroundColor: '#EC3E7C' }]} >
                                <IonIcons name='camera' color='white' size={20} style={{ alignSelf: 'center', top: 12 }} />
                            </IconContainer>
                            <Text style={{ position: 'absolute', alignSelf: 'center', bottom: -12, fontSize: 12  }}>Camera</Text>
                        </View>
                        <View>
                            <IconContainer style={[styles.icons, { backgroundColor: '#BF56D1' }]} >
                                <MaterialIcon name='photo-size-select-actual' size={20} color='white' style={{ alignSelf: 'center', top: 12 }} />
                            </IconContainer>
                            <Text style={{ position: 'absolute', alignSelf: 'center', bottom: -12, fontSize: 12  }}>Gallery</Text>
                        </View>
                        <View>
                            <IconContainer style={[styles.icons, { backgroundColor: '#F1910A' }]} >
                                <MaterialIcon name='headset' size={20} color='white' style={{ alignSelf: 'center', top: 12 }} />
                            </IconContainer>
                            <Text style={{ position: 'absolute', alignSelf: 'center', bottom: -12, fontSize: 12  }}>Audio</Text>
                        </View>

                    </View>
                    <View style={styles.iconContainer}>
                        <View>
                            <IconContainer style={[styles.icons, { backgroundColor: '#029B53' }]} >
                                <MaterialIcon name='location-pin' size={20} color='white' style={{ alignSelf: 'center', top: 12 }} />
                            </IconContainer>
                            <Text style={{ position: 'absolute', alignSelf: 'center', bottom: -12, fontSize: 12  }}>Location</Text>
                        </View>
                        <View>
                            <IconContainer style={[styles.icons, { backgroundColor: '#05A596' }]} >
                                <View style={{
                                    position: 'absolute',
                                    width: 20,
                                    height: 20,
                                    backgroundColor: 'white',
                                    borderRadius: 50,
                                    marginRight: 15,
                                    top: 12,
                                    alignSelf: 'center'
                                }}>
                                    <FontAwesome name='rupee' size={12} color='#05A596' style={{ alignSelf: 'center', top: 5 }} />
                                </View>
                            </IconContainer>
                            <Text style={{ position: 'absolute', alignSelf: 'center', bottom: -12, fontSize: 12  }}>Payments</Text>
                        </View>
                        <View>
                            <IconContainer style={[styles.icons, { backgroundColor: '#0AABFC' }]} >
                                <MaterialIcon name='person' size={20} color='white' style={{ alignSelf: 'center', top: 12 }} />
                            </IconContainer>
                            <Text style={{ position: 'absolute', alignSelf: 'center', bottom: -12, fontSize: 12  }}>Contacts</Text>
                        </View>
                        <View>
                            <IconContainer style={[styles.icons, { backgroundColor: '#05A596' }]} >
                                <MaterialCommunityIcon name='poll' size={20} color='white' style={{ alignSelf: 'center', top: 12 }} />
                            </IconContainer>
                            <Text style={{ position: 'absolute', alignSelf: 'center', bottom: -12, fontSize: 12  }}>Poll</Text>
                        </View>
                    </View>

                </View>

            </View>
        )
    }

    const toggleMenu = () => {
        setShowMenu(!showMenu)
    }
    return (
        <View style={styles.container}>
            {!isDarkMode ? <Image style={styles.wallpaper} source={require('../assets/images/defaultWallpaper.png')} />
                : <Image style={styles.wallpaper} source={require('../assets/images/defaultDarkWallpaper.jpg')} />}
            <View style={styles.chatsWrapper}>
                <View style={styles.chatsContainer}>
                    <VirtualizedList
                        style={styles.list}
                        data={messageList}
                        getItemCount={getItemCount}
                        getItem={getItem}
                        keyExtractor={(item) => item.id}
                        renderItem={({ item }) =>
                            <Pressable>
                                <Chatbox style={[styles.Chatbox, { backgroundColor: isDarkMode ? '#018068' : '#D9FCD2' }]} message={item.message} time={item.time} messageType='right' />
                            </Pressable>
                        }
                    />
                </View>
            </View>
            <View style={[styles.inputContainer, { backgroundColor: isDarkMode ? '#212C32' : 'white' }]}>
                <Icon style={styles.emoji} name='happy-outline' size={22} />
                <TextInput style={styles.input} value={messageInput} onChangeText={(message) => handleMessageChange(message)} placeholder='Message' placeholderTextColor='grey' cursorColor='#018068'></TextInput>
                <Animated.View style={[styles.iconsContainer, { translateX: slideIconAnim.current }]}>
                    {messageInput === "" && <Pressable android_ripple='black'><MaterialIcon name='photo-camera' size={25} color='grey' onPress={handleOpenCamera} /></Pressable>}
                    {messageInput === "" && <View style={styles.currencyContainer}>
                        <FontAwesome name='rupee' size={12} color='white' style={{ alignSelf: 'center', top: 5 }} />
                    </View>}
                    <MaterialIcon style={styles.attachfile} name='attach-file' color='grey' size={25} rotate={90} onPress={() => toggleMenu()} />
                </Animated.View>
                {showMenu && linkItemsMenu()}
            </View>
            <Pressable style={styles.audio} onPress={() => handleSend()}>
                <MaterialIcon style={styles.audioIcon} name={messageInput === "" ? "mic" : "send"} color='white' size={25} />
            </Pressable>
        </View>
    )
}

const width = Dimensions.get('window').width;
const height = Dimensions.get('window').height;

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    inputContainer: {
        position: 'absolute',
        width: width - 60,
        height: 40,
        borderRadius: 50,
        backgroundColor: 'white',
        bottom: 10,
        left: 5,
        paddingLeft: 30
    },
    chatsWrapper: {
        marginTop: 7,
        marginBottom: 53
    },
    input: {
        color: 'grey',
        // paddingLeft: 40,
    },
    emoji: {
        position: 'absolute',
        top: 7,
        left: 5
    },
    audio: {
        position: 'absolute',
        width: 40,
        height: 40,
        borderRadius: 50,
        backgroundColor: '#018068',
        alignSelf: 'flex-end',
        right: 0,
        bottom: 10,
        right: 5
    },
    audioIcon: {
        position: 'absolute',
        alignSelf: 'center',
        top: 7
    },
    iconsContainer: {
        position: 'absolute',
        alignSelf: 'flex-end',
        flex: 0,
        flexDirection: 'row-reverse',
        top: 8,
        right: 8,

    },
    attachfile: {
        transform: [{ rotate: '-40deg' }],
        paddingRight: 15,
        bottom: 6

    },
    currencyContainer: {
        position: 'relative',
        width: 20,
        height: 20,
        backgroundColor: 'grey',
        borderRadius: 50,
        marginRight: 15,
        top: 2
    },
    wallpaper: {
        position: 'absolute',
        alignSelf: 'center',
    },
    Chatbox: {
        alignSelf: 'flex-end',
        right: 20,
        // top: 30,
        marginBottom: 20,
    },
    iconContainer: {
        flexDirection: 'row',
        alignSelf: 'flex-start',
        marginBottom: 10
    },
    icons: {
        margin: 10,
        marginBottom: 5
    }
});