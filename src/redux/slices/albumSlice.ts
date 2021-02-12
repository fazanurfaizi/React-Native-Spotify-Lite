import { createSlice } from '@reduxjs/toolkit'
import { ofType } from 'redux-observable'
import { EMPTY, interval, Observable, of } from 'rxjs'
import { catchError, map, startWith, switchMap } from 'rxjs/operators'
import { AlbumType } from '@/models/SpotifyCommon'
import SpotifyApiService from '@/services/spotify/SpotifyApiService'
import { Action } from '../rootReducer'
import { hydrate, pushActionToRestart } from './globalSlice'
import { getPlaylistByIdSuccess, PlaylistDetailsType } from './playlistSlice'
import { redoLogin } from './userSlice'

type AlbumReducerType = {
    recentlyPlayedAlbums: AlbumType[]
}

const initialState: AlbumReducerType = {
    recentlyPlayedAlbums: []
}

const albumSlice = createSlice({
    initialState,
    name: "album",
    reducers: {
        getAlbumById: (state, _) => state,
        getAlbumError: (state) => state,
        getMultipleAlbums: (state, _) => state,
        getMultipleAlbumsError: (state) => state,
        getMultipleAlbumsSuccess: (state, action) => ({
            ...state,
            recentlyPlayedAlbums: action.payload
        }),
        getRecentlyPlayedTrackError: (state) => state
    }
})

const getAlbumByIdEpic = (action$: Observable<Action<any>>) => 
    action$.pipe(
        ofType(getAlbumById.type),
        switchMap(({ payload: id }) => 
            SpotifyApiService.getAlbum(id).pipe(
                map((res) => {
                    const tracks = res.tracks.items.map((track, i) => ({
                        name: track.name,
                        artistName: track.artists[i]?.name || res.artists[0].name
                    }))

                    const album: PlaylistDetailsType = {
                        name: res.name,
                        ownerName: res.artists[0].name,
                        tracks,
                        imageUrl: res.images[0].url,
                        id: res.id,
                        type: "ALBUM"
                    }

                    return getPlaylistByIdSuccess(album)
                }),
                catchError((err) => {
                    if(SpotifyApiService.sessionIsExpired(err)) {
                        return of(redoLogin(), pushActionToRestart(getAlbumById(id)))
                    }

                    // TODO: notify user of error
                    console.warn(err)
                    __DEV__ && console.tron(err.stack)
                    return of(getAlbumError.type)
                })
            )
        )
    )

const getMultipleAlbumsEpic = (action$: Observable<Action<any>>) => 
    action$.pipe(
        ofType(getMultipleAlbums.type),
        switchMap(({ payload: ids }) => 
            SpotifyApiService.getMultipleAlbums(ids).pipe(
                map((res) => {
                    // We want array of url strings
                    const albumImageUrls: AlbumType[] = res.albums.map((album) => ({
                        name: album.name,
                        imageUrl: album.images[0].url,
                        id: album.id
                    }))

                    return getMultipleAlbumsSuccess(albumImageUrls)
                }),
                catchError((err) => {
                    if(SpotifyApiService.sessionIsExpired(err)) {
                        return of(redoLogin(), pushActionToRestart(getMultipleAlbums(ids)))
                    }

                    console.warn(err)
                    __DEV__ && console.tron(err.stack)
                    return of(getMultipleAlbumsError())
                })
            )
        )
    )

const getRecentlyPlayedTracksEpic = (action$: Observable<Action<undefined>>) =>
    action$.pipe(
        ofType(hydrate.type),
        switchMap(() => interval(180 * 1000).pipe(startWith(EMPTY))),
        switchMap(() => 
            SpotifyApiService.getRecentlyPlayedTracks().pipe(
                map((res) => {
                    let commaList = ""
                    res.items.forEach((item) => {
                        const [, albumId] = item.track.album.href.split("album/")
                        if(!commaList.includes(albumId)) {
                            commaList = commaList.concat(albumId + ",")
                        }
                    })
                    // Remove last comma, else request fails
                    const commaListCommanRemoved = commaList.slice(0, commaList.length - 1)

                    return getMultipleAlbums(commaListCommanRemoved)
                }),
                catchError((err) => {
                    if(SpotifyApiService.sessionIsExpired(err)) {
                        // Dont do anything
                        return of({
                            type: "getRecentlyPlayedTracksEpic: catchError"
                        })
                    }

                    console.warn(err)
                    __DEV__ && console.tron(err.stack)

                    return of(getRecentlyPlayedTrackError())
                })                
            )
        )
    )

export const albumEpics = [
    getAlbumByIdEpic,
    getMultipleAlbumsEpic,
    getRecentlyPlayedTracksEpic
]

export const {
    getAlbumById,
    getAlbumError,
    getMultipleAlbums,
    getMultipleAlbumsError,
    getMultipleAlbumsSuccess,
    getRecentlyPlayedTrackError
} = albumSlice.actions

export default albumSlice.reducer