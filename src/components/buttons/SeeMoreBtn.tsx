import React from 'react'
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native'
import { colors } from '@/themes'

const SeeMoreBtn = ({
    onPress,
    isVisible
}: {
    onPress: () => void
    isVisible: boolean
}) => {
    return (
        <View style={[styles.container, { opacity: isVisible ? 1 : 0 }]}>
            <TouchableOpacity style={styles.button} onPress={onPress}>
                <Text style={styles.btnText}>SEE MORE</Text>
            </TouchableOpacity>
        </View>
    )
}

export default SeeMoreBtn

const styles = StyleSheet.create({
    container: {
        marginTop: 30,
        alignItems: "center",
        height: 32,
    },
    button: {
        width: 144,
        height: 32,
        backgroundColor: colors.background,
        borderColor: colors.grey,
        borderWidth: 1,
        justifyContent: "center",
        alignItems: "center",
        borderRadius: 32,
    },
    btnText: {
        color: colors.white,
        fontSize: 16,
        letterSpacing: 1.8,
        fontWeight: "bold",
    }
})
