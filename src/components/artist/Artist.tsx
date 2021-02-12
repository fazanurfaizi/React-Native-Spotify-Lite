import React from 'react'
import { StyleSheet, Text, View } from 'react-native'
import Cover from '@/components/cover/Cover'
import CoverBlank from '@/components/cover/CoverBlank'
import { colors } from '@/themes'
import { AlbumType } from '@/models/SpotifyCommon'
import { TouchableOpacity } from 'react-native-gesture-handler'

const Artist = ({
    artist,
    onArtistPressed
}: {
    artist: AlbumType,
    onArtistPressed: (id: string | undefined) => void
}) => {
    return (
        <TouchableOpacity
            onPress={() => onArtistPressed(artist.id)}
            style={styles.flatListContainer}
        >
            {artist.imageUrl ? (
                <Cover uri={artist.imageUrl} />
            ) : (
                <CoverBlank styles={[styles.cover]} />
            )}
            <View style={styles.rowText}>
                <Text style={styles.artistTitle} numberOfLines={1}>
                    {artist.name}
                </Text>
            </View>
        </TouchableOpacity>
    )
}

export default Artist

const styles = StyleSheet.create({
    flatListContainer: {
        marginLeft: 15,
        marginVertical: 10,
        flex: 1,
        flexDirection: "row",
        maxWidth: "77%",
    },
    artistTitle: {
        color: colors.white,
        textAlignVertical: "center",
        fontSize: 16,
    },
    artistOwner: {
        color: colors.grey,
        textAlignVertical: "center",
    },
    cover: {
        height: 50,
        width: 50,
    },
    lineBreak: { flexBasis: "100%" },
    rowText: {
        marginLeft: 10,
        justifyContent: "center",
    },
    favRowText: {
        marginLeft: 10,
        justifyContent: "center",
        marginBottom: 15,
    },
})
