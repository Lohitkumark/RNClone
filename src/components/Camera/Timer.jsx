import React, { useState, useEffect, useRef } from 'react';
import { View, Text, StyleSheet } from 'react-native';

const RecordingTimer = ({ recording, style }) => {
    const [seconds, setSeconds] = useState(0);
    const [minutes, setMinutes] = useState(0);
    const timer = useRef()

    useEffect(() => {
        if (recording) {
            startRecording()
        } else {
            stopRecording()
        }
    }, [recording])

    const startRecording = () => {
        timer.current = setInterval(() => {
            setSeconds((prevSeconds) => {
                if (prevSeconds === 59) {
                    setMinutes((prevMinutes) => {
                        if (prevMinutes === 59) {
                            return 0;
                        }
                        return prevMinutes + 1;
                    });
                    return 0;
                }
                return prevSeconds + 1;
            });
        }, 1000);
    }

    const stopRecording = () => {
        setMinutes(0)
        setSeconds(0)
        return clearInterval(timer.current)
    }

    return (
        <View style={recording ? styles.recordingWrapper : styles.defaultWrapper}>
            <Text style={styles.timerText}>{`${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`}</Text>
        </View>
    );
};

const styles = StyleSheet.create({
    defaultWrapper: {
        position: 'absolute',
        alignSelf: 'center',
        backgroundColor: 'rgba(0,0,0,0.5)',
        height: 27,
        borderRadius: 50,
        // top: 30,
        width: 80,
    },
    recordingWrapper:{
        position: 'absolute',
        alignSelf: 'center',
        backgroundColor: 'red',
        height: 27,
        borderRadius: 50,
        // top: 30,
        width: 80
    },
    timerText: {
        position: 'absolute',
        fontSize: 18,
        color: 'white',
        alignSelf: 'center',
    },
});

export default RecordingTimer;