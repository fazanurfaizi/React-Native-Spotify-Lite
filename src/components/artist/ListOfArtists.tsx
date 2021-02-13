import React from 'react'
import { FlatList, View } from 'react-native'
import { colors } from '@/themes'
import Artist from '@/components/artist/Artist'
import { AlbumType } from '@/models/SpotifyCommon'
import { PLAYER_HEIGHT } from '@/components/player/StickyPlayer'

const ListOfArtist = ({
    currentUserArtists,
    onArtistPressed
}: {
    currentUserArtists: AlbumType[]
    onArtistPressed: (id: string | undefined) => void
}) => {
    return (
        <View
            style={{
                flex: 1,
                backgroundColor: colors.background,
            }}>
            <FlatList
                contentContainerStyle={{ paddingBottom: PLAYER_HEIGHT + 10 }}
                data={currentUserArtists}
                renderItem={({ item }) => (
                    <Artist artist={item} onArtistPressed={onArtistPressed} />
                )}
                keyExtractor={(_, index) => index.toString()}
            />
        </View>
    )
}

export default ListOfArtist
