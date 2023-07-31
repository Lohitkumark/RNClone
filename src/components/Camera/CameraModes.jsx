import { Animated, Easing, Pressable, StyleSheet, Text, View } from "react-native"
import { IconContainer } from "../../uiComponents/IconContainer"
import { useEffect, useRef } from "react";

export const CameraModes = ({ handleMode, cameraMode, style }) => {

    const slideAnim = useRef(new Animated.Value(0));

    useEffect(() => {
        Animated.timing(slideAnim.current, {
            toValue: cameraMode === 'video' ? 80 : 0,
            duration: 100,
            useNativeDriver: true,
            easing: Easing.linear
        }).start();
    }, [cameraMode])
    return (
        <IconContainer style={[styles.modeContainer, style]} >
            <Animated.View style={[styles.modeWrapper, { translateX: slideAnim.current }]}>
                <View>
                    <Pressable style={styles.videoMode} onPress={() => handleMode('video')}>
                        <Text style={{ textAlign: 'center', color: 'white' }}>Video</Text>
                    </Pressable>
                </View>
                <View>
                    <Pressable style={styles.photoMode} onPress={() => handleMode('photo')}>
                        <Text style={{ textAlign: 'center', color: 'white' }}>Photo</Text >
                    </Pressable>
                </View>
            </Animated.View>
        </IconContainer>
    )
}

const styles = StyleSheet.create({
    modeContainer: {
        position: 'absolute',
        height: 30,
        width: 80,
        backgroundColor: 'rgba(100,120,100, 0.7)',
        alignSelf: 'center',
        borderRadius: 50,
        bottom: 60,
        paddingTop: 1
    },
    modeWrapper: {
        flexDirection: 'row',
        right: 60
    },
    photoMode: {
        position: 'absolute',
        // fontSize: 15,
        alignSelf: 'center',
        paddingTop: 3,
        left: 60,
        height: 30,
        width: 80,
    },
    videoMode: {
        position: 'absolute',
        // fontSize: 15,
        alignSelf: 'center',
        paddingTop: 3,
        left: -20,
        height: 30,
        width: 80,
    },

});