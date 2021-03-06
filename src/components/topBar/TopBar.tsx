import React,{ ReactNode } from 'react'
import { View, Text } from 'react-native'
import { colors } from '@/themes'

const TopBar = ({
    title,
    children
}: {
    title: string
    children?: ReactNode
}) => {
    return (
        <View
            style={{
                top: 0,
                height: 56,
                width: "100%",
                backgroundColor: colors.tabBar,
                justifyContent: "center"
            }}
        >
            <Text
                style={{
                    color: "white",
                    alignSelf: "center",
                    fontSize: 16,
                    fontWeight: "bold"
                }}
            >
                {title}
            </Text>
            {children}
        </View>
    )
}

export default TopBar
