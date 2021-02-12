import { createSlice } from '@reduxjs/toolkit'
import { ofType } from 'redux-observable'
import { Observable, of } from 'rxjs'
import { catchError, map, switchMap } from 'rxjs/operators'
import SpotifyApiService from '@/services/spotify/SpotifyApiService'
import { AlbumType } from '@/models/SpotifyCommon'
import { Action } from '../rootReducer'
import { pushActionToRestart } from './globalSlice'
import { redoLogin } from './userSlice'

type FollowReducerType = {
    currentUserSavedArtists: AlbumType[]
}

const initialState: FollowReducerType = {
    currentUserSavedArtists: []
}

const followSlice = createSlice({
    name: "follow",
    initialState,
    reducers: {
        getCurrentUserSavedArtists: state => state,
        getCurrentUserSavedArtistsError: state => state,
        getCurrentUserSavedArtistsSuccess: (state, action) => ({
            ...state,
            currentUserSavedArtists: action.payload
        })
    }
})

const getCurrentUserSavedArtistsEpic = (action$: Observable<Action<any>>) =>
    action$.pipe(
        ofType(getCurrentUserSavedArtists.type),
        switchMap(() => 
            SpotifyApiService.getCurrentUserSavedArtists().pipe(
                map(res => {
                    const data: AlbumType[] = res.artists.items.map(item => {
                        return {
                            imageUrl: (item.images[0] && item.images[0].url) || null,
                            name: item.name,
                            id: item.id
                        }
                    })

                    return getCurrentUserSavedArtistsSuccess(data)
                }),
                catchError(err => {
                    if(SpotifyApiService.sessionIsExpired(err)) {
                        return of(redoLogin(), pushActionToRestart(getCurrentUserSavedArtists()))
                    }

                    console.warn(err)
                    __DEV__ && console.tron(err.stack)

                    return of(getCurrentUserSavedArtistsError())
                })
            )
        )
    )

export const followEpics = [
    getCurrentUserSavedArtistsEpic
]

export const {
    getCurrentUserSavedArtists,
    getCurrentUserSavedArtistsError,
    getCurrentUserSavedArtistsSuccess
} = followSlice.actions

export default followSlice.reducer