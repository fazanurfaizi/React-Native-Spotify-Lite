import React from 'react'
import { StyleSheet, Text, TouchableOpacity } from 'react-native'
import { colors } from '@/themes'

const BUTTON_HEIGHT = 50

const SpotifyButton = ({
    text,
    handlePress,
    color,
    textColor
}: {
    text: string
    handlePress: () => void
    color?: string
    textColor?: string
}) => {
    return (
        <TouchableOpacity
            style={[
                styles.button,
                {
                    backgroundColor: color || colors.white
                }
            ]}
            onPress={handlePress}
        >
            <Text style={[styles.btnText, { color: textColor }]}>
                {text}
            </Text>
        </TouchableOpacity>
    )
}

export default SpotifyButton

const styles = StyleSheet.create({
    button: {
        height: BUTTON_HEIGHT,
        justifyContent: "center",
        alignItems: "center",
        borderRadius: 32,
        paddingHorizontal: 38,
    },
    btnText: {
        fontSize: 14,
        letterSpacing: 2,
        fontWeight: "bold",
    },
})
