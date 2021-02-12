import React from 'react'
import { StyleSheet, Text, View, Switch } from 'react-native'
import { colors } from '@/themes'

const DownloadHeader = () => {
    return (
        <View style={styles.container}>
            <Text style={styles.download}>Download</Text>
            <Switch
                value={false}
                style={{ marginRight: 10 }}
                onValueChange={() => {
                    return
                }}
                thumbColor={colors.grey}
                trackColor={{ false: colors.darkGrey, true: "green" }}
            />
        </View>
    )
}

export default DownloadHeader

const styles = StyleSheet.create({
    container: {
        flexDirection: "row",
        marginBottom: 10,
    },
    download: {
        flex: 1,
        color: colors.darkWhite,
        fontSize: 16,
        fontWeight: "bold",
        letterSpacing: 1,
    },
})
