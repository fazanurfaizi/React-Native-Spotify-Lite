import { useState, useRef, useEffect, useCallback } from 'react'
import { useDispatch } from 'react-redux'
import { redoLogin } from '@/redux/slices'
import SpotifyAsyncStorageService from '@/services/asyncstorage/SpotifyAsyncStoreService'
import SpotifyApiService from '@/services/spotify/SpotifyApiService'

const POLLING_PERIOD_SECONDS = 10

const initialTrackState = {
    currentProgressPct: 0,
    intervalAmountPct: 0,
    title: "",
    artist: "",
    isPlaying: false,
    isSaved: false,
    id: ""
}

const useCurrentPlayingTrack = () => {
    const [trackState, setTrackState] = useState(initialTrackState)
    const isFirstRender = useRef(true)

    const dispatch = useDispatch()

    useEffect(() => {
        const getLastPlayedTrack = async () => {
            const trackData = await SpotifyAsyncStorageService.getTrackData()

            if(trackData) {
                setTrackState(JSON.parse(trackData))
            }
        }

        getLastPlayedTrack()
    }, [])

    const getTrackData = useCallback(async () => {
        try {
            const trackData = await SpotifyApiService.getPlayingTrack()

            if(typeof trackData === "object" && "item" in trackData && trackData.item) {
                const [isSaved] = await SpotifyApiService.getSavedStateForTracks(trackData.item.id)
                const currentProgressPct = (trackData.progress_ms / trackData.item.duration_ms) * 100
                const intervalAmountPct = ((POLLING_PERIOD_SECONDS * 1000) / trackData.item.duration_ms) * 100

                if(trackState.currentProgressPct != currentProgressPct) {
                    // if track is not paused
                    const newState = {
                        currentProgressPct,
                        intervalAmountPct,
                        title: trackData.item.name,
                        artist: trackData.item.artists[0].name,
                        isPlaying: trackData.is_playing,
                        isSaved: isSaved,
                        id: trackData.item.id
                    }

                    setTrackState(newState)

                    await SpotifyAsyncStorageService.putTrackData(JSON.stringify({ ...newState, isPlaying: false }))
                }
            } else {
                // paused
                setTrackState((state) => ({
                    ...state,
                    isPlaying: false
                }))
            }
        } catch (error) {
            if(SpotifyApiService.sessionIsExpired(error)) {
                dispatch(redoLogin())
            } else {
                console.warn(error)
            }
        }
    }, [trackState.currentProgressPct, dispatch])

    useEffect(() => {
        if (isFirstRender.current) {
            getTrackData()
            isFirstRender.current = false
        }
    
        const fetchInterval = setInterval(
            getTrackData,
            POLLING_PERIOD_SECONDS * 1000,
        )
    
        return () => {
            clearInterval(fetchInterval)
        }
    }, [getTrackData, trackState.currentProgressPct, trackState.title, dispatch])

    return {
        trackState,
        getTrackData
    }
}

export default useCurrentPlayingTrack