import { Dimensions, StyleSheet, TouchableOpacity, View } from "react-native"
import Icon from 'react-native-vector-icons/Ionicons'
import MaterialIcon from 'react-native-vector-icons/MaterialIcons'
import RecordingTimer from "./Timer"
import { useNavigation } from "@react-navigation/native"

export const CameraTopIcons = ({ cameraMode, flashMode, recording, toggleCamera, handleFlashMode, style }) => {
    const Navigation = useNavigation()
    return (
        <View style={[styles.container, style]}>
            <View style={styles.closeIcon} >
                <TouchableOpacity onPress={() => Navigation.goBack()} >
                    <Icon name="close-outline" color='white' size={30} />
                </TouchableOpacity>
            </View>
            <View style={styles.flashIcon}>
                <TouchableOpacity onPress={() => handleFlashMode(flashMode)} >
                    <MaterialIcon name={flashMode} color='white' size={30} />
                </TouchableOpacity>
            </View>
            {cameraMode === 'video' && <RecordingTimer recording={recording} />}
        </View>
    )
}
const width = Dimensions.get('window').width; //full width

const styles = StyleSheet.create({
    container: {
        width: width,
        position: 'absolute'
    },
    closeIcon: {
        position: 'absolute',
        left: 10,
    },
    flashIcon: {
        position: 'absolute',
        right: 10,
    },
});