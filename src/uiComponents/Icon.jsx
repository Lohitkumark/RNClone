import { View, TouchableOpacity } from "react-native"
import Icon from 'react-native-vector-icons'

export const Icon = ({name, color, size}) => {
    return (
        <View style={styles.closeIcon} >
            <TouchableOpacity onPress={() => toggleCamera()} >
                <Icon name={name} color={color} size={size} />
            </TouchableOpacity>
        </View>
    )
}