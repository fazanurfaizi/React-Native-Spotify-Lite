import React from 'react'
import { StyleSheet, Text, View } from 'react-native'
import FastImage from 'react-native-fast-image'
import { colors, coverImages } from '@/themes'
import { playlistStyle } from '@/components/playlist/Playlist'

const PlaylistFavRow = ({
    savedTracksCount
}: {
    savedTracksCount: number | null
}) => {
    return (
        <View style={styles.favRow}>
            <FastImage source={coverImages.savedTracks} style={styles.cover} />
            <View style={styles.favRowText}>
                <Text style={styles.playlistTitle}>Favorite Songs</Text>
                <Text style={styles.playlistOwner}>
                    {(savedTracksCount && savedTracksCount + " favorite songs") || ""}
                </Text>
            </View>
        </View>
    )
}

export default PlaylistFavRow

const styles = StyleSheet.create({
    cover: {
        height: 50,
        width: 50,
    },
    favRow: {
        flexDirection: "row",
        flexBasis: "100%",
        marginBottom: 20,
    },
    favRowText: {
        marginLeft: playlistStyle.rowTextLeft,
        justifyContent: "center",
    },
    playlistTitle: {
        color: colors.white,
        textAlignVertical: "center",
        fontSize: playlistStyle.titleFontSize,
    },
    playlistOwner: {
        color: colors.grey,
        textAlignVertical: "center",
    },
})
