import React from 'react'
import { FlatList, View } from 'react-native'
import { TouchableOpacity } from 'react-native-gesture-handler'
import { colors }  from '@/themes'
import Playlist, { playlistStyle } from '@/components/playlist/Playlist'
import { SavedPlaylistsType } from '@/redux/slices'
import { PLAYER_HEIGHT } from '@/components/player/StickyPlayer'
import PlaylistFavRow from '@/components/favorite/PlaylistFavRow'

const ListOfPlaylists = ({
    currentUserPlaylists,
    savedTracksCount,
    username,
    onPlaylistPressed,
    onFavSongsPressed
}: {
    currentUserPlaylists: SavedPlaylistsType[]
    savedTracksCount: number | null
    username: string
    onPlaylistPressed: (id: string) => void
    onFavSongsPressed: () => void
}) => {
    return (
        <View
            style={{
                flex: 1,
                backgroundColor: colors.background
            }}
        >
            {Array.isArray(currentUserPlaylists) && (
                <FlatList
                    contentContainerStyle={{ paddingBottom: PLAYER_HEIGHT + 10 }}
                    ListHeaderComponent={
                        <TouchableOpacity
                            onPress={onFavSongsPressed}
                            style={{
                                marginLeft: playlistStyle.left,
                                marginVertical: playlistStyle.vertical,
                                marginBottom: -playlistStyle.vertical * 2
                            }}
                        >
                            <PlaylistFavRow savedTracksCount={savedTracksCount} />
                        </TouchableOpacity>
                    }
                    data={currentUserPlaylists}
                    renderItem={({ item }) => (
                        <Playlist
                            {...{
                                item,
                                username,
                                savedTracksCount: savedTracksCount,
                                onPlaylistPressed
                            }}
                        />
                    )}
                    keyExtractor={(_, index) => index.toString()}
                />
            )}
        </View>
    )
}

export default ListOfPlaylists
