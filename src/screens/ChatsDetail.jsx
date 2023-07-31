import React, { useEffect, useRef, useState } from "react";
import { StyleSheet, Text, View, TextInput, Image, Dimensions, Animated, Easing, Pressable, VirtualizedList, useColorScheme } from "react-native";
import Icon from 'react-native-vector-icons/Ionicons'
import MaterialIcon from 'react-native-vector-icons/MaterialIcons'
import FontAwesome from 'react-native-vector-icons/FontAwesome'
import { Chatbox } from "../uiComponents/ChatBox";
import { useDispatch, useSelector } from 'react-redux'
import { setChatMessages } from "../../redux/slices/chatSlice";


export const ChatsDetails = ({ navigation, route }) => {
    const [messageInput, setMessageInput] = useState('')
    const [messageList, setMessageList] = useState([])
    const isDarkMode = useColorScheme() === 'dark';

    const dispatch = useDispatch()

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
                                <Chatbox style={[styles.Chatbox, {backgroundColor: isDarkMode ? '#018068' : '#D9FCD2'}]} message={item.message} time={item.time} messageType='right' />
                            </Pressable>
                        }
                    />
                </View>
            </View>
            <View style={[styles.inputContainer, {backgroundColor: isDarkMode ? '#212C32' : 'white'}]}>
                <Icon style={styles.emoji} name='happy-outline' size={22} />
                <TextInput style={styles.input} value={messageInput} onChangeText={(message) => handleMessageChange(message)} placeholder='Message' placeholderTextColor='grey' cursorColor='#018068'></TextInput>
                <Animated.View style={[styles.iconsContainer, { translateX: slideIconAnim.current }]}>
                    {messageInput === "" && <MaterialIcon name='photo-camera' size={25} color='grey' />}
                    {messageInput === "" && <View style={styles.currencyContainer}>
                        <FontAwesome name='rupee' size={12} color='white' style={{ alignSelf: 'center', top: 5 }} />
                    </View>}
                    <MaterialIcon style={styles.attachfile} name='attach-file' color='grey' size={25} rotate={90} />
                </Animated.View>
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
        paddingLeft:30
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
});