import { useCallback, useEffect, useState } from 'react'
import ImageColors from 'react-native-image-colors'
import { from, of, Subscription, zip } from 'rxjs'
import { colors } from '@/themes'
import SpotifyApiService from '@/services/spotify/SpotifyApiService'
import { ProfileResponse } from '@/models/ProfileResponse'
import { AlbumType, Artist, SpotifyErrorResponse, Track } from '@/models/SpotifyCommon'
import { PlaylistDetailsType, TrackType, redoLogin } from '@/redux/slices'

type Props = {
    artistId: string | null
    profile: ProfileResponse | null
    redoLogin: typeof redoLogin
}

type ArtistDetails = PlaylistDetailsType & { relatedArtists: AlbumType[] }

const initialState = {
    dominantColor: colors.background,
    isLoading: true
}

const useArtistDetails = ({ artistId, profile, redoLogin }: Props) => {
    const [artistDetails, setArtistDetails] = useState<null | ArtistDetails>(null)
    const [{ isLoading, dominantColor }, setState] = useState(initialState) 

    const setDefaultColors = () => {
        setState({
            dominantColor: colors.tabBar,
            isLoading: false
        })
    }

    const handleGradientColor = useCallback(async (url: string | undefined) => {
        if(url) {
            try {
                const colors = await ImageColors.getColors(url, {
                    quality: "high"
                })

                if(colors.platform === "android") {
                    setState({
                        dominantColor: colors.average!,
                        isLoading: false
                    })
                } else {
                    setState({
                        dominantColor: colors.background!,
                        isLoading: false
                    })
                }
            } catch (error) {
                console.warn(error)
                setDefaultColors()
            }
        } else {
            setDefaultColors()
        }
    }, [])

    // fetch data
    useEffect(() => {
        let sub: Subscription | undefined

        const fetchData = () => {
            if(artistId) {
                const artist$ = SpotifyApiService.getArtist(artistId)
                const topTracks$ = SpotifyApiService.getArtistTopTracks(artistId, profile?.country!)
                const relatedArtists$ = SpotifyApiService.getRelatedArtists(artistId)

                sub = zip(artist$, topTracks$, relatedArtists$).subscribe(
                    ([artist, topTracks, relatedArtistsList]: [
                        Artist | SpotifyErrorResponse,
                        { tracks: Track[] } | SpotifyErrorResponse,
                        { artists: Artist[] } | SpotifyErrorResponse
                    ]) => {
                        if("error" in artist) {
                            throw artist.error.message
                        }
                        if("error" in topTracks) {
                            throw topTracks.error.message
                        }
                        if("error" in relatedArtistsList) {
                            throw relatedArtistsList.error.message
                        }

                        const tracks: TrackType[] = topTracks.tracks.map((item) => ({
                            artistName: item.artists[0].name ?? "No track returned by spotify :(",
                            name: item.name ?? "No track"
                        }))

                        const relatedArtists: AlbumType[] = relatedArtistsList.artists.map((artist) => ({
                            name: artist.name,
                            imageUrl: artist.images[0]?.url,
                            id: artist.id
                        }))

                        setArtistDetails({
                            imageUrl: artist.images[0].url,
                            name: artist.name,
                            ownerName: artist.name,
                            tracks,
                            relatedArtists,
                            id: artist.id,
                            followerCount: artist.followers.total,
                            type: "ALBUM"
                        })

                        from(handleGradientColor(artist.images[0]?.url)).subscribe()
                    },
                    (err) => {
                        if(SpotifyApiService.sessionIsExpired(err)) {
                            redoLogin()
                        } else {
                            console.warn(err)
                        }
                        return of()
                    }
                )
            }
        }

        if(!artistDetails) {
            fetchData()
        }

        return () => {
            if(sub) 
                sub.unsubscribe()
        }
    }, [artistId, artistDetails, profile, redoLogin, handleGradientColor])

    return { artistDetails, isLoading, dominantColor }
}

export default useArtistDetails