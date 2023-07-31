import { Pressable, StyleSheet, TouchableOpacity, View } from "react-native";
import { IconContainer } from "../../uiComponents/IconContainer";
import MaterialIcon from 'react-native-vector-icons/MaterialIcons';
import Icon from 'react-native-vector-icons/Ionicons'

export const CameraBottomIcons = ({ cameraMode, recording, changeType, startRecording, stopRecording, capturePhoto, style }) => {
    return (
        <View style={style}>
            <IconContainer style={styles.photoContainer}>
                <Pressable>
                    <View style={styles.photoIcon}>
                        <MaterialIcon name="photo" color='white' size={23} />
                    </View>
                </Pressable>
            </IconContainer>
            <IconContainer style={styles.flipContainer}>
                <Pressable onPress={changeType} >
                    <View style={styles.flipIcon}>
                        <MaterialIcon name="flip-camera-android" color='white' size={23} />
                    </View>
                </Pressable>
            </IconContainer>
            <View style={styles.captureContainer} >
                <MaterialIcon style={styles.captureIcon} name='panorama-fish-eye' size={80} color='white' />
                {cameraMode === 'photo' ?
                    <TouchableOpacity onPress={capturePhoto} >
                        <View style={styles.photoClickIcon}>
                            <MaterialIcon name="circle" color='white' size={45} />
                        </View>
                    </TouchableOpacity>
                    :
                    !recording ? <TouchableOpacity onPress={startRecording} >
                        <View style={styles.videoClickIcon} >
                            <MaterialIcon name="circle" color='white' size={32} />
                        </View>
                    </TouchableOpacity> :
                        <TouchableOpacity onPress={stopRecording} >
                            <View style={styles.recordingIcon} >
                                <Icon name="square" color='red' size={25} />
                            </View>
                        </TouchableOpacity>
                }
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    photoContainer: {
        position: 'absolute',
        left: 15,
    },
    flipContainer: {
        position: 'absolute',
        right: 15,
    },
    captureContainer: {
        position: 'absolute',
        alignSelf: 'center',
        width: 100,
        height: 64
    },
    captureIcon: {
        position: 'absolute',
        alignSelf: 'center',
        bottom: 0
    },
    photoClickIcon: {
        position: 'relative',
        alignSelf: 'center',
        top: 1
    },
    videoClickIcon: {
        position: 'absolute',
        alignSelf: 'center',
        top: 7
    },
    recordingIcon: {
        position: 'absolute',
        alignSelf: 'center',
        top: 10,
        paddingLeft:2
    },
    photoIcon: {
        position: 'relative',
        alignSelf: 'center',
        top:10
    },
    flipIcon: {
        position: 'relative',
        alignSelf: "center",
        top:10,

    },
});
