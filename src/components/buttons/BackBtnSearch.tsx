import React from 'react'
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'
import { TextStyle } from 'react-native'

const BackBtnSearch = ({
    tintColor,
    textStyle,
    onPress,
    size
}: {
    tintColor: string
    textStyle?: TextStyle
    onPress?: () => void
    size?: number
}) => {
    return (
        <Icon
            onPress={onPress}
            style={[textStyle]}
            name="arrow-left"
            size={size || 26}
            color={tintColor}
        />
    )
}

export default BackBtnSearch
