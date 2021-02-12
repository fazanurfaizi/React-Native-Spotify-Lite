import React from 'react'
import { ActivityIndicator, ViewStyle } from 'react-native'
import { colors } from '@/themes'

export const LoadingView = ({ viewStyle }: { viewStyle?: ViewStyle }) => {
    return (
        <ActivityIndicator
            animating
            size={50}
            color={colors.green}
            style={[
                {
                    flex: 1,
                    justifyContent: "center",
                    alignItems: "center"
                },
                viewStyle
            ]}
        />
    )
}

export default LoadingView
