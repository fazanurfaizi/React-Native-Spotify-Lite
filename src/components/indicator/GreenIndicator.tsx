import React from 'react'
import { View, ActivityIndicator } from 'react-native'
import { colors } from '@/themes'

const GreenIndicator = () => {
    return (
        <View
            style={{
                width: "100%",
                height: "100%",
                justifyContent: "center",
                top: 0,
                left: 0,
                backgroundColor: colors.background
            }}
        >
            <ActivityIndicator size={60} color={colors.green} />
        </View>
    )
}

export default GreenIndicator
