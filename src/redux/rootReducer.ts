import AsyncStorage from '@react-native-community/async-storage'
import { combineReducers } from 'redux'
import { persistReducer } from 'redux-persist'
import globalReducer from './slices/globalSlice'
import browseReducer from './slices/browseSlice'
import playlistReducer from './slices/playlistSlice'
import searchReducer from './slices/searchSlice'
import userReducer from './slices/userSlice'
import albumReducer from './slices/albumSlice'
import libraryReducer from './slices/librarySlice'
import personalizationReducer from './slices/personalizationSlice'
import followReducer from './slices/followSlice'
import artistReducer from './slices/artistSlice'

// Redux persist
const rootPersistConfig = {
    key: "root",
    storage: AsyncStorage,
    blacklist: [
        "globalReducer",
        "browseReducer",
        "playlistReducer",
        "artistReducer",
        "searchReducer"
    ]
}

// Global Reducer
const globalReducerPersistConfig = {
    key: "globalReducer",
    storage: AsyncStorage,
    blacklist: ["actionToRestart"]
}

const persistedGlobalReducer = persistReducer(
    globalReducerPersistConfig,
    globalReducer
)

// browseReducer
const browseReducerPersistConfig = {
    key: "browseReducer",
    storage: AsyncStorage,
    blacklist: [
        "genrePlaylist",
        "genreDetails"
    ]
}

const persistedBrowseReducer = persistReducer(
    browseReducerPersistConfig,
    browseReducer
)

// playlistReducer
const playlistReducerPersistConfig = {
    key: "playlistReducer",
    storage: AsyncStorage,
    blacklist: ["playlistDetails"]
}

const persistedPlaylistReducer = persistReducer(
    playlistReducerPersistConfig,
    playlistReducer
)

// SearchReducer
const searchReducerPersistConfig = {
    key: "searchReducer",
    storage: AsyncStorage,
    whitelist: ["queryHistory"]
}

const persistedSearchReducer = persistReducer(
    searchReducerPersistConfig,
    searchReducer
)

const rootReducer = combineReducers({
    userReducer,
    globalReducer: persistedGlobalReducer,
    albumReducer,
    libraryReducer,
    browseReducer: persistedBrowseReducer,
    personalizationReducer,
    followReducer,
    playlistReducer: persistedPlaylistReducer,
    artistReducer,
    searchReducer: persistedSearchReducer
})

export type RootStoreType = ReturnType<typeof rootReducer>

export type DispatchFun<P> = ({ type, payload }: Action<P>) => void
export type Action<P> = {type: string, payload?: P}

export default persistReducer(rootPersistConfig, rootReducer)