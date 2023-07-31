import { StyleSheet, View } from "react-native"
import { Camera, useCameraDevices } from "react-native-vision-camera"

export const VissionCameraModule = ({ cameraRef, cameraType, flashMode, children, style }) => {
    const devices = useCameraDevices()
    const device = devices.back
    if (device == null) return
    return (
        <View style={styles.container}>
            <Camera
                ref={cameraRef}
                style={[styles.camera, style]}
                isActive={true}
                device={cameraType === 'back' ? devices.back : devices.front}
                photo={true}
                video={true}
                audio={true}
            />
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'black'
    },
    camera: {
        flex: 1,
        bottom: 110,
        // top: 20
    }
})