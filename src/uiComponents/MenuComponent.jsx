import { StyleSheet, Text, View, useColorScheme } from "react-native";
import { Menu, Divider, PaperProvider, Button } from 'react-native-paper';


export const MenuComponent = ({ visible, style, menuAnchor, closeMenu, children }) => {
    const isDarkMode = useColorScheme() === 'dark';

    return (
        <View style={style}>
            <Menu
                contentStyle={isDarkMode ? styles.menuContentDark : styles.menuContent}
                visible={visible}
                onDismiss={closeMenu}
                anchor={menuAnchor}
                children={children}>
                {/* <Menu.Item style={styles.menuItem} title='New group' />
                    <Menu.Item style={styles.menuItem} title='New broadcast' />
                    <Menu.Item style={styles.menuItem} title='Linked devices' />
                    <Menu.Item style={styles.menuItem} title='Stared messages' />
                    <Menu.Item style={styles.menuItem} title='Payments' />
                    <Menu.Item style={styles.menuItem} title='Settings' /> */}
            </Menu>
        </View>
    )
}

const styles = StyleSheet.create({
    menuContent: {
        backgroundColor: 'white',
        borderRadius: 5
    },
    menuContentDark: {
        backgroundColor: '#212C32',
        borderRadius: 5
    }
});