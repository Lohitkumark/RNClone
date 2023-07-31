import { StyleSheet, View } from "react-native"
import { RNCamera } from "react-native-camera"

export const CameraModule = ({cameraRef, cameraType, flashMode, children, style}) => {
    return (
        <View style={styles.container}>
            <RNCamera
                ref={cameraRef}
                style={[styles.camera, style]}
                type={cameraType === 'back' ? RNCamera.Constants.Type.back : RNCamera.Constants.Type.front}
                flashMode={flashMode === 'flash-off' ? RNCamera.Constants.FlashMode.off : flashMode === 'flash-on' ? RNCamera.Constants.FlashMode.on : flashMode === 'flash-auto' ? RNCamera.Constants.FlashMode.auto : null}
                androidCameraPermissionOptions={{
                    title: 'Permission to use camera',
                    message: 'We need your permission to use your camera',
                    buttonPositive: 'Ok',
                    buttonNegative: 'Cancel',
                }}
                androidRecordAudioPermissionOptions={{
                    title: 'Permission to use audio recording',
                    message: 'We need your permission to use your audio',
                    buttonPositive: 'Ok',
                    buttonNegative: 'Cancel',
                }}
            >{children}</RNCamera>
        </View>
    )
}

const styles = StyleSheet.create({
    container:{
        flex:1,
        backgroundColor:'black'
    },
    camera:{
        flex:1,
        bottom:110,
        // top: 20
    }
})