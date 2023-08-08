import React, { useEffect, useState } from "react";
import { StyleSheet, Text, View, Pressable, Image, VirtualizedList, useColorScheme } from "react-native";
import Icon from 'react-native-vector-icons/Ionicons'
import { useDispatch, useSelector } from 'react-redux'


export const Chats = ({ navigation }) => {
    const [chatList, setChatList] = useState([])
    const isDarkMode = useColorScheme() === 'dark';

    const { chatMessages } = useSelector((state) => state.chats)

    useEffect(() => {
        setChatList(Object.values(chatMessages))
    }, [chatMessages])

    const getItemCount = () => chatList.length;

    const getItem = (chatList, index) => chatList[index];

    const handleChat = (item) => {
        navigation.navigate('ChatsDetail', {
            contact: item?.[0]?.name,
            phNumber: item?.[0]?.number
        })
    }

    return (
        <View style={[styles.container, {backgroundColor: isDarkMode ? '#101B20' : 'white'}]}>
            <VirtualizedList
                data={chatList}
                getItemCount={getItemCount}
                getItem={getItem}
                keyExtractor={(item) => item?.id}
                renderItem={({ item }) =>
                    <Pressable android_ripple={{ color: 'rgba(0,0,0,0.5)' }} onPress={()=>handleChat(item)}>
                        <View style={styles.messageContainer}>
                            <View style={styles.profileContainer}>
                                <Image style={styles.profileIcon} source={require('../assets/images/defaultProfile.png')} />
                            </View>
                            <Text style={[styles.chatName, {color: isDarkMode ? 'white' : 'black'}]}>{item?.[0]?.name}</Text>
                            <View style={styles.messageTextContainer}>
                                <Icon name='checkmark-done-sharp' style={{ paddingRight: 2 }} color='rgb(82,189,234)' size={20}></Icon>
                                <Text style={[styles.messageText, {color: isDarkMode ? 'white' : 'black'}]}>{(item[item.length - 1]?.message)}</Text>
                            </View>
                            <Text style={styles.chatTime}>{(item[item.length - 1]?.time)}</Text>
                        </View>
                    </Pressable>
                }
            />
        </View>
    )
}


const styles = StyleSheet.create({
    container: {
        flex: 1,
        porition: 'relative',
    },
    messageContainer: {
        position: 'relative',
        height: 80,
    },
    profileContainer: {
        position: 'absolute',
        margin: 15,
        height: 50,
        borderRadius: 50,
        width: 50,
    },
    profileIcon: {
        position: 'relative',
        alignSelf: 'center',
        width: 50,
        height: 50
    },
    chatName: {
        position: 'absolute',
        margin: 20,
        left: 60,
        fontWeight: 'bold',
        color: 'black'
    },
    chatTime:{
        position:'relative',
        alignSelf:"flex-end",
        top:20,
        right:10
    },
    messageText: {
        position: 'relative',
        flex: 0,
        color: 'black',
        
    },
    messageTextContainer: {
        position: "absolute",
        flex: 0,
        flexDirection: 'row',
        margin: 40,
        left: 40,
        
    }
});