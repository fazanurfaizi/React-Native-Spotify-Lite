import React from 'react'
import { StyleSheet, View, ViewStyle } from 'react-native'
import { colors } from '@/themes'

const DotsView = ({
    color,
    containerStyle
}: {
    color?: string,
    containerStyle?: ViewStyle
}) => {

    const bgColor = color ? color : colors.grey

    return (
        <View style={[{ flexDirection: "column" }, containerStyle]}>
            <View
                style={[
                    styles.dot,
                    {
                        marginBottom: 5.5,
                        backgroundColor: bgColor,
                    },
                ]}
            />
            <View
                style={[
                    styles.dot,
                    {
                        marginBottom: 5.5,
                        backgroundColor: bgColor,
                    },
                ]}
            />
            <View
                style={[
                    styles.dot,
                    {
                        backgroundColor: bgColor,
                    },
                ]}
            />
        </View>
    )
}

export default DotsView

const styles = StyleSheet.create({
    dot: {
        height: 2.5,
        width: 2.5,
        borderRadius: 2,
    },
})
