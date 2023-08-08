import { useEffect, useRef, useState } from 'react';
import { StyleSheet, Text, View, PermissionsAndroid, Platform, Linking, Alert, Image, Dimensions, Pressable, TouchableOpacity, Button, StatusBar } from 'react-native';
import { request, PERMISSIONS, RESULTS } from 'react-native-permissions';
import Video from 'react-native-video';
import { useCamera } from 'react-native-camera-hooks'
import { CameraModule } from './CameraModule';
import { CameraTopIcons } from './CameraTopIcons';
import { CameraBottomIcons } from './CameraBottomIcons';
import { CameraModes } from './CameraModes';
import Icon from 'react-native-vector-icons/Ionicons'
import { VissionCameraModule } from './VissionCameraModule';


export const CameraScreen = ({ toggleCamera }) => {
    const [{ cameraRef }] = useCamera(null)
    const [cameraType, setCameraType] = useState('back')
    const [cameraMode, setCameraMode] = useState('photo')
    const [flashMode, setFlashMode] = useState('flash-off')
    const [recording, setRecording] = useState(false)
    const [photoPath, setPhotoPath] = useState(null)
    const [videoPath, setVideoPath] = useState(null)
    const video = useRef(null);
    const [status, setStatus] = useState({});

    const capturePhoto = async () => {
        try {
            const options = {
                qualityPrioritization: 'quality',
                flash: flashMode === 'flash-off' ? 'off' : flashMode === 'flash-on' ? 'on' : flashMode === 'flash-auto' ? 'auto' : null,
                enableAutoRedEyeReduction: true
            };
            const data = await cameraRef.current.takePhoto(options);
            setPhotoPath(`file://${data.path}`)
        } catch (error) {
            console.log('Error capturing picture:', error);
        }
    };

    const startRecording = async () => {
        try {
            const data = await cameraRef.current.startRecording({
                onRecordingFinished: (video) => setVideoPath(video.path),
                onRecordingError: (error) => console.error(error),
            });
            setRecording(true)

            // console.log(data.path, 'data');
        } catch (error) {
            alert('Error capturing video');
        }
    };

    const stopRecording = () => {
        setRecording(false)
        cameraRef.current.stopRecording()
    }

    const changeType = () => {
        if (cameraType === 'back') {
            setCameraType('front')
        } else {
            setCameraType('back')
        }
    }
    const checkPermitions = async () => {
        request(PERMISSIONS.ANDROID.CAMERA).then((res) => {
            if (res === 'blocked') {
                alert('Camera permissions denied, click ok to grant permissions')
                Linking.openSettings()
            }
        }).catch((error) => {
            alert(error)
        })
    }

    useEffect(() => {
        checkPermitions()
    }, [])

    const handleMode = (mode) => {
        if (mode === 'video') {
            setCameraMode(mode)
        } else {
            setCameraMode(mode)
        }
    }

    const handleFlashMode = (flashMode) => {
        if (flashMode === 'flash-off') {
            setFlashMode('flash-on')
        } else if (flashMode === 'flash-on') {
            setFlashMode('flash-auto')
        } else if (flashMode === 'flash-auto') {
            setFlashMode('flash-off')
        }
    }
    return (
        <View style={styles.container
        }>
            <StatusBar barStyle='black' backgroundColor='black'/>
            {(photoPath === null && videoPath === null) ? <View style={{ flex: 1 }}>
                {/* <CameraModule
                    cameraRef={cameraRef}
                    cameraType={cameraType}
                    flashMode={flashMode}
                    style={styles.camera}
                >
                </CameraModule> */}
                <VissionCameraModule
                    cameraRef={cameraRef}
                    cameraType={cameraType}
                    flashMode={flashMode}
                    style={styles.camera}
                />
                <CameraTopIcons
                    cameraMode={cameraMode}
                    recording={recording}
                    toggleCamera={toggleCamera}
                    flashMode={flashMode}
                    handleFlashMode={handleFlashMode}
                    style={styles.cameraTopIcons}
                />
                <CameraBottomIcons
                    cameraMode={cameraMode}
                    capturePhoto={capturePhoto}
                    startRecording={startRecording}
                    stopRecording={stopRecording}
                    changeType={changeType}
                    recording={recording}
                    style={styles.cameraBottomIcons}
                />

                <CameraModes handleMode={handleMode} cameraMode={cameraMode} style={styles.modeContainer} />
            </View> :
                <>

                    {photoPath && <View style={{ flex: 1 }}>
                        <Image source={{ uri: photoPath }} style={styles.imagePreview} />
                        <Pressable style={styles.closeIconStyle} onPress={() => setPhotoPath(null)}>
                            <Icon name="close-outline" color='white' size={30} />
                        </Pressable>
                    </View>}
                    <>
                        {videoPath &&
                            <View style={{ flex: 1, borderWidth: 1, borderColor: 'yellow' }}>
                                <Video
                                    ref={video}
                                    style={styles.backgroundVideo}
                                    source={{
                                        uri: videoPath,
                                    }}
                                    resizeMode='cover'
                                    // useNativeControls
                                    controls={true}
                                    onPlaybackStatusUpdate={status => setStatus(() => status)}
                                />
                                <Pressable style={styles.closeIconStyle} onPress={() => setVideoPath(null)}>
                                    <Icon name="close-outline" color='white' size={30} />
                                </Pressable>
                            </View>
                        }
                    </>
                </>
            }
        </View>

    );
}
const width = Dimensions.get('window').width;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'black',
    },
    imagePreview: {
        flex: 1,
        bottom: 110,
        position: 'relative'
    },
    closeIconStyle: {
        position: 'absolute',
        top: 10,
        left: 10,
        zIndex: 2,
    },
    buttonContainer: {
        position: 'relative',
        marginRight: 10,
        justifyContent: 'center'
    },
    camera: {
        flex: 1,
        justifyContent: 'flex-end',
        alignItems: 'center',
        position: 'relative',
    },
    cameraTopIcons: {
        top: 10,
    },
    modeContainer: {
        position: 'absolute',
        bottom: 70
    },
    cameraBottomIcons: {
        bottom: 180,
    },
    backgroundVideo: {
       flexGrow:1,
       marginBottom: 200,
        borderWidth: 1, borderColor: 'red',
    },
});
