import React, { useEffect, useCallback } from 'react'
import { connect, ConnectedProps } from 'react-redux'
import { NavigationStackProp } from 'react-navigation-stack'
import { NavigationEvents } from 'react-navigation'
import ListOfArtists from '@/components/artist/ListOfArtists'
import { setArtistId, getCurrentUserSavedArtists } from '@/redux/slices'
import { Routes } from '@/navigation/_routes'
import { RootStoreType } from '@/redux/rootReducer'

const FavoriteArtists = ({
    getCurrentUserSavedArtists,
    currentUserArtists,
    navigation,
    setArtistId
}: ReduxProps & { navigation: NavigationStackProp }) => {

    const fetchData = useCallback(() => {
        getCurrentUserSavedArtists()
    }, [getCurrentUserSavedArtists])

    useEffect(() => {
        fetchData()
    }, [fetchData])

    const onArtisPressed = (id: string | undefined) => {
        if(id) {
            setArtistId(id)
            navigation.navigate(Routes.BottomTabs.FavoritesStack.ArtistDetails)
        }
    }

    return (
        <>
            <NavigationEvents onWillFocus={fetchData} />   
            <ListOfArtists
                currentUserArtists={currentUserArtists}
                onArtistPressed={onArtisPressed}
            />
        </>
    )
}

const mapStateToProps = (state: RootStoreType) => ({
    currentUserArtists: state.followReducer.currentUserSavedArtists
})

const mapDispatchToProps = {
    getCurrentUserSavedArtists,
    setArtistId: setArtistId
}

const connector = connect(mapStateToProps, mapDispatchToProps)

type ReduxProps = ConnectedProps<typeof connector>

export default connector(FavoriteArtists)
