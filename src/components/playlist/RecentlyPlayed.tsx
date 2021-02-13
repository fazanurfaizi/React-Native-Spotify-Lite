import React, { useContext } from 'react'
import { View, Text, ScrollView } from 'react-native'
import { NavigationContext } from 'react-navigation'
import { connect, ConnectedProps } from 'react-redux'
import { getAlbumById } from '@/redux/slices'
import { Routes } from '@/navigation/_routes'
import ArtistCover from '@/components/artist/ArtistCover'
import { albumDimensions, styles } from '@/themes'
import { RootStoreType } from '@/redux/rootReducer'

const RecentlyPlayed = ({
    getAlbumById,
    recentlyPlayedAlbums 
}: ReduxProps) => {

    const navigation = useContext(NavigationContext)

    const onAlbumPressed = (id: string) => {
        getAlbumById(id)
        navigation.navigate(Routes.BottomTabs.HomeStack.PlaylistDetails)
    }

    return (
        <>
            <Text
                style={[
                    styles.centeredText,
                    styles.headerText,
                    { fontSize: 18.5, marginTop: 22, marginBottom: 10 }
                ]}
            >
                Recently Played
            </Text>
            <ScrollView
                overScrollMode="never"
                style={{ height: albumDimensions.ROW_SCROLLVIEW_HEIGHT }}
                horizontal
                showsHorizontalScrollIndicator={false}
            >
                <View style={styles.rowScrollContainer}>
                    {Array.isArray(recentlyPlayedAlbums.map(album => (
                        <ArtistCover
                            coverShape="SQUARE"
                            key={album.id}
                            album={album}
                            onPress={onAlbumPressed}
                        />
                    )))}
                </View>
            </ScrollView>
        </>
    )
}

const mapStateToProps = (state: RootStoreType) => ({
    recentlyPlayedAlbums: state.albumReducer.recentlyPlayedAlbums
})

const mapDispatchToProps = {
    getAlbumById
}

const connector = connect(mapStateToProps, mapDispatchToProps)

type ReduxProps = ConnectedProps<typeof connector>

export default connector(RecentlyPlayed)