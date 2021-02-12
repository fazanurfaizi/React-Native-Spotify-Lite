import { useEffect, useState } from 'react'
import SpotifyHttpException from '@/exceptions/SpotifyHttpException'
import SpotifyApiService from '@/services/spotify/SpotifyApiService'
import SpotifyEndpoints from '@/services/spotify/SpotifyEndpoints'

interface Props {
    id: string
}

const useSavedTrack = ({ id }: Props) => {
    const [isSaved, setIsSaved] = useState<boolean | undefined>(undefined)

    useEffect(() => {
        (async () => {
            try {
                const [res] = await SpotifyApiService.getSavedStateForTracks(id)

                if(typeof res === "boolean") {
                    setIsSaved(res)
                } else {
                    setIsSaved(undefined)
                    throw new SpotifyHttpException(
                        "success",
                        "not a boolean: " + JSON.stringify(res),
                        SpotifyEndpoints.getSavedStateForTracks(id)
                    )
                }
            } catch (error) {
                console.warn(error)
            }
        })()
    }, [id])

    return isSaved
}

export default useSavedTrack