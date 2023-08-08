import { useState } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { StatusBar, StyleSheet, View, useColorScheme } from "react-native";
import { StackNavigation } from "./navigators/StackNavigation";
import { CameraScreen } from "./components/Camera/CameraScreen";
import { Colors } from "react-native/Libraries/NewAppScreen";

export const Routing = () => {
    const isDarkMode = useColorScheme() === 'dark';
    const [camera, setCamera] = useState(false)
  
    const backgroundStyle = {
      backgroundColor: isDarkMode ? '#212C32' : camera ? 'black' : '#018068',
    };
  
    const toggleCamera = () => {
      setCamera(!camera)
    }
    return (
        <View style={styles.container}>
            <StatusBar
                barStyle={isDarkMode || camera ? 'light-content' : 'dark-content'}
                backgroundColor={backgroundStyle.backgroundColor}
            />
                <NavigationContainer>
                    <StackNavigation toggleCamera={toggleCamera} />
                </NavigationContainer>
        </View>
    );
}

const styles = StyleSheet.create({
    container:{
        flex: 1
    }
})