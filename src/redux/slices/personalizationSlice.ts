import { createSlice } from '@reduxjs/toolkit'
import { ofType } from 'redux-observable'
import { Observable, of } from 'rxjs'
import { catchError, map, switchMap } from 'rxjs/operators'
import { AlbumType } from '@/models/SpotifyCommon'
import SpotifyApiService from '@/services/spotify/SpotifyApiService'
import { Action } from '../rootReducer'
import { hydrate } from './globalSlice'

type PersonalizationReducerType = {
    userTopArtists: AlbumType[]
    userTopArtistsHeader: AlbumType | null
}

const initialState: PersonalizationReducerType = {
    userTopArtists: [],
    userTopArtistsHeader: null
}

const personalizationSlice = createSlice({
    name: "personalization",
    initialState,
    reducers: {
        getUserTopArtists: state => state,
        getUserTopArtistsSucces: (state, action) => ({
            ...state,
            userTopArtists: action.payload.data,
            userTopArtistsHeader: action.payload.header
        }),
        getUserTopArtistsError: (state) => state
    }
})

const getCurrentUserTopArtistsEpic = (action$: Observable<Action<any>>) =>
    action$.pipe(
        ofType(hydrate.type),
        switchMap(() => 
            SpotifyApiService.getCurrentUserTopArtists().pipe(
                map(res => {
                    const artists: AlbumType[] = res.items.map(item => {
                        return {
                            name: item.name,
                            imageUrl: item.images[0].url,
                            id: item.id
                        }
                    })

                    const data = artists.slice(1, artists.length)
                    const header = artists[0]

                    return getUserTopArtistsSucces({ data, header })
                }),
                catchError(err => {
                    if(SpotifyApiService.sessionIsExpired(err)) {
                        return of({
                            type: "getCurrentUserTopArtistsEpic: catchError"
                        })
                    }

                    console.warn(err)
                    __DEV__ && console.tron(err.stack)

                    return of(getUserTopArtistsError())
                })
            )
        )
    )

export const personalizationEpics = [
    getCurrentUserTopArtistsEpic
]

export const {
    getUserTopArtists,
    getUserTopArtistsError,
    getUserTopArtistsSucces
} = personalizationSlice.actions

export default personalizationSlice.reducer