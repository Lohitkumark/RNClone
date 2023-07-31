import React, { memo, useEffect, useState } from "react";
import { Alert, Linking, PermissionsAndroid, StyleSheet, Text, View, FlatList, NativeModules, ScrollView, Pressable, VirtualizedList, useColorScheme } from "react-native";
import { IconContainer } from "../uiComponents/IconContainer";
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'
import Icons from 'react-native-vector-icons/Ionicons'
import Contacts from 'react-native-contacts';
import { ContactItem } from "../components/ContactItem";
import _ from 'lodash'
import { CustomContactsHeader } from "../components/CustomContactsHeader";
import { useDispatch, useSelector } from 'react-redux'
import { setAllContacts } from "../../redux/slices/contactSlice";


const ContactsScreen = ({ navigation }) => {
    const [searchValue, setSearchValue] = useState('')
    const isDarkMode = useColorScheme() === 'dark';

    const dispatch = useDispatch()

    const { allContacts } = useSelector((state) => state.contacts)

    const [searchedContact, setSearchedContact] = useState([])

    useEffect(() => {
        setSearchedContact(allContacts)
    }, [allContacts])
    useEffect(() => {
        PermissionsAndroid.request(
            PermissionsAndroid.PERMISSIONS.READ_CONTACTS,
        ).then(res => {
            if (res === 'granted') {
                if (allContacts.length === 0) {
                    getContacts()
                }
            } else if (res === 'never_ask_again') {

                Alert.alert(
                    'AppName',
                    'You have to give permission to get contacts ',
                    [
                        {
                            text: 'Cancel',
                            style: 'cancel',
                        },
                        { text: 'Allow', onPress: () => Linking.openSettings() },
                    ],
                );
            }
        });
    }, [])

    const getContacts = async () => {
        try {
            const contactsList = await Contacts.getAll()
            const sortedList = _.sortBy(contactsList, [function (contact) { return contact.displayName; }])
            dispatch(setAllContacts(sortedList))
            // setAllContactsList(sortedList)
            // setSearchedContact(sortedList)
        } catch (error) {
            console.log(error, 'error');
        }
    }

    const handleSearchValue = (value) => {
        setSearchValue(value)
        searchContact(value)
    }

    const searchContact = (searchContact) => {
        const contact = allContacts?.filter((item) => {
            const formatPhoneNumber = (item?.phoneNumbers?.[0]?.number)?.split('').filter((item) => {
                return item !== '(' && item !== ')' && item !== " " && item !== "-"
            }).join('')
            return item.displayName.toLowerCase().includes(searchContact.toLowerCase()) || formatPhoneNumber?.includes(Number(searchContact))
        })
        setSearchedContact(contact)
    }

    const handleChat = (item) =>{
        console.log(item?.phoneNumbers?.[0]?.number);
        const formatPhoneNumber = (item?.phoneNumbers?.[0]?.number)?.split('').filter((item) => {
            return item !== '(' && item !== ')' && item !== " " && item !== "-"
        }).join('')
        navigation.navigate('ChatsDetail', {
            contact: item.displayName,
            phNumber: formatPhoneNumber
        })
    }

    const topContents = () => {
        return (
            <View>
                {searchValue === '' && <View>
                    <View>
                        <IconContainer style={styles.iconContainer}>
                            <MaterialCommunityIcons style={styles.icons} name='account-multiple' color='white' size={25} />
                        </IconContainer>
                        <Text style={[styles.label, {color: isDarkMode ? 'white' : 'black'}]} >New Group</Text>
                    </View>
                    <View>
                        <IconContainer style={styles.iconContainer}>
                            <MaterialCommunityIcons style={styles.icons} name='account-plus' color='white' size={25} />
                        </IconContainer>
                        <Text style={[styles.label, {color: isDarkMode ? 'white' : 'black'}]}>New Contact</Text>
                        <Icons style={styles.qrIcon} name='ios-qr-code-outline' color='grey' size={20} />
                    </View>
                    <View>
                        <IconContainer style={styles.iconContainer}>
                            <MaterialCommunityIcons style={styles.icons} name='account-group' color='white' size={25} />
                        </IconContainer>
                        <Text style={[styles.label, {color: isDarkMode ? 'white' : 'black'}]} >New Community</Text>
                    </View>
                </View>}
                <Text style={{  margin:15 }}>Contacts on WhatsApp</Text>
            </View>
        )
    }

    const getItemCount = () => searchedContact.length;

    const getItem = (searchedContact, index) => searchedContact[index];
    return (
        <View style={[styles.container, {backgroundColor: isDarkMode ? '#101B20' : 'white'}]}>
            <CustomContactsHeader navigation={navigation} searchContact={searchContact} handleSearchValue={handleSearchValue} searchValue={searchValue} />
            <View>
                <VirtualizedList
                    data={searchedContact}
                    getItemCount={getItemCount}
                    getItem={getItem}
                    keyExtractor={(item) => item?.phoneNumbers?.[0]?.number}
                    renderItem={({ item }) =>
                        <Pressable key={item?.phoneNumbers?.[0]?.number} onPress={()=> handleChat(item)}>
                            <ContactItem name={item.displayName} />
                        </Pressable>
                    }
                    ListHeaderComponent={topContents}
                />
            </View>
        </View>
    )
}

export default memo(ContactsScreen)
const styles = StyleSheet.create({
    container: {
        flex: 1
    },
    iconContainer: {
        alignSelf: 'flex-start',
        margin: 10,
        backgroundColor: '#018068'
    },
    icons: {
        alignSelf: 'center',
        top: 9
    },
    label: {
        position: 'absolute',
        top: 20,
        left: 70,
        fontWeight: 'bold',
        color: 'black'
    },
    qrIcon: {
        position: 'absolute',
        alignSelf: 'flex-end',
        top: 20,
        right: 10
    }
});