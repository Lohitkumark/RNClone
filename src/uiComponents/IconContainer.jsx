import { StyleSheet, View } from "react-native"

export const IconContainer = ({children, style}) => {
    return (
        <View style={[styles.container, style]}>
            {children}
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        // position: "absolute",
        backgroundColor: 'rgba(0,0,0,0.5);',
        borderRadius: 50,
        height: 45,
        width: 45,
        alignSelf: 'flex-start',
    },
})