import React, { useEffect, useCallback } from 'react'
import { connect, ConnectedProps } from 'react-redux'
import { NavigationStackProp } from 'react-navigation-stack'
import { NavigationEvents } from 'react-navigation'
import ListOfAlbum from '@/components/album/ListOfAlbums'
import { RootStoreType } from '@/redux/rootReducer'
import { getCurrentUserSavedAlbums, getAlbumById } from '@/redux/slices'
import { Routes } from '@/navigation/_routes'

const FavoriteAlbums = ({
    getCurrentUserSavedAlbums,
    currentUserAlbums,
    getAlbumById,
    navigation
}: ReduxProps & { navigation: NavigationStackProp }) => {

    const fetchData = useCallback(() => {
        getCurrentUserSavedAlbums()
    }, [getCurrentUserSavedAlbums])

    useEffect(() => {
        fetchData()
    }, [fetchData])

    const onPlaylistPressed = (id: string) => {
        getAlbumById(id)
        navigation.navigate(Routes.BottomTabs.FavoritesStack.PlaylistDetails)
    }

    return (
        <>
            <NavigationEvents onWillFocus={fetchData} />   
            <ListOfAlbum
                currentUserAlbums={currentUserAlbums}
                onPlaylistPressed={onPlaylistPressed}
            />
        </>
    )
}

const mapStateToProps = (state: RootStoreType) => ({
    currentUserAlbums: state.libraryReducer.currentUserSavedAlbums
})

const mapDispatchToProps = {
    getCurrentUserSavedAlbums,
    getAlbumById
}

const connector = connect(mapStateToProps, mapDispatchToProps)

type ReduxProps = ConnectedProps<typeof connector>

export default connector(FavoriteAlbums)
