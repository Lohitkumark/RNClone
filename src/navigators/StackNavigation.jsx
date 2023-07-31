import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Icon from 'react-native-vector-icons/Ionicons'
import { TabNavigation } from './TabNavigation';
import { Dimensions, Modal, StyleSheet, View, useColorScheme } from 'react-native';
import { useState } from 'react';
import ContactsScreen from '../screens/ContactsScreen';
import { ChatsDetails } from '../screens/ChatsDetail';
import { CustomChatsDetailsHeader } from '../components/CustomChatsDetailsHeader';
import { MenuComponent } from '../uiComponents/MenuComponent';
import { Menu, PaperProvider } from 'react-native-paper';
import { SearchChats } from '../components/SearchChats';
import { SearchBox } from '../uiComponents/SearchBox';


const Stack = createNativeStackNavigator();

export const StackNavigation = ({ toggleCamera }) => {
    const [activeTab, setActiveTab] = useState("")
    const isDarkMode = useColorScheme() === 'dark';
    const [visible, setVisible] = useState(false);
    const [showSearch, setShowSearch] = useState(false)
    const [menuAnchor, setMenuAnchor] = useState({ x: 0, y: 0 })
    const width = Dimensions.get('window').width;

    const openMenu = () => setVisible(true);

    const closeMenu = () => setVisible(false);

    const openSearch = () => setShowSearch(true);

    const closeSearch = () => setShowSearch(false);

    const handlePress = (type, event) => {
        if (type === 'search') {
            openSearch()
        } else if (type === 'menu') {
            const anchor = {
                x: width,
                y: 0,
            };
            setMenuAnchor(anchor);
            openMenu();
        }
    }

    const searchContent = () => {
        if(activeTab === 'Chats') {
            return (
                <SearchChats openSearch={openSearch} closeSearch={closeSearch} style={styles.search} />
            )
        } else if(activeTab === 'Status') {
            return (
                <SearchBox style={styles.search} closeSearch={closeSearch}/>
            )
        } else if(activeTab === 'Calls') {
            return (
                <SearchBox style={styles.search} closeSearch={closeSearch}/>
            )
        }
    }

    const menuItems = () => {
        if (activeTab === 'Community') {
            return (
                <View>
                    <Menu.Item style={styles.menuItem} title='Settings' />
                </View>
            )
        } else if (activeTab === 'Chats') {
            return (
                <View>
                    <Menu.Item onPress={() => alert('pressed')} title='New group' />
                    <Menu.Item title='New broadcast' />
                    <Menu.Item title='Linked devices' />
                    <Menu.Item title='Stared messages' />
                    <Menu.Item title='Payments' />
                    <Menu.Item title='Settings' />
                </View>
            )
        } else if (activeTab === 'Status') {
            return (
                <View>
                    <Menu.Item title='Status privacy' />
                    <Menu.Item title='Settings' />
                </View>
            )
        } else if (activeTab === 'Calls') {
            return (
                <View>
                    <Menu.Item title='Clear call log' />
                    <Menu.Item title='Settings' />
                </View>
            )
        }
    }

    return (
        <View style={styles.container}>
            <Stack.Navigator style={styles.stackNavigator} screenOptions={{
                headerShown: (activeTab === 'Status' && showSearch ) ? false : (activeTab === 'Calls' && showSearch ) ? false : true,
                headerMode: 'screen',
                headerTintColor: isDarkMode ? 'grey' : 'white',
                headerStyle: {
                    backgroundColor: isDarkMode ? '#212C32' : '#018068', elevation: 0,
                    borderWidth: 1,
                    borderColor: 'red'
                },
                headerShadowVisible: false,


            }}>

                <Stack.Screen name="WhatsApp" children={() =>
                    <TabNavigation showSearch={showSearch} closeSearch={closeSearch} setActiveTab={setActiveTab} activeTab={activeTab} />
                } options={({ navigation, route }) => ({
                    headerRight: () => (
                        <>
                            <Icon
                                style={styles.icons}
                                size={25}
                                name="camera-outline"
                                color={isDarkMode ? 'grey' : 'white'}
                                onPress={() => toggleCamera()}
                            />

                            {activeTab !== "Community" && <Icon
                                style={styles.icons}
                                size={25}
                                name="search"
                                color={isDarkMode ? 'grey' : 'white'}
                                onPress={() => handlePress('search')}
                            />}
                            <Icon
                                style={styles.icons}
                                size={20}
                                name="ellipsis-vertical"
                                color={isDarkMode ? 'grey' : 'white'}
                                onPress={() => handlePress('menu')}
                            />
                        </>
                    )
                })}
                />
                <Stack.Screen name="Contacts" component={ContactsScreen} options={{ headerShown: false }} />
                <Stack.Screen name='ChatsDetail' component={ChatsDetails} options={{ header: ({ navigation }) => <CustomChatsDetailsHeader navigation={navigation} /> }} />
            </Stack.Navigator>
            {showSearch && searchContent()}
            <View style={styles.menuContainer}>
                <MenuComponent
                    style={styles.menuContainer}
                    visible={visible}
                    menuAnchor={menuAnchor}
                    openMenu={openMenu}
                    closeMenu={closeMenu}
                >
                    {menuItems()}
                </MenuComponent>
            </View>
        </View>
    )
}

const width = Dimensions.get('window').width;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        position: 'relative',
    },
    icons: {
        paddingLeft: 20
    },
    menuContainer: {
        position: 'absolute'
    },
    search: {
        position: 'absolute',
        width: width,
        elevation: 20
    }
});