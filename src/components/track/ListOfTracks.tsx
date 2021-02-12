import React from 'react'
import { View } from 'react-native'
import { PlaylistDetailsType } from '@/redux/slices'
import { colors } from '@/themes'
import DownloadHeader from '@/components/header/DownloadHeader'
import Track from '@/components/track/Track'

const ListOfTracks = ({
    playlistDetails,
    showDownload
}: {
    playlistDetails: PlaylistDetailsType
    showDownload: boolean
}) => {
    return (
        <View
            style={{
                backgroundColor: colors.background
            }}
        >
            <View
                style={{
                    flex: 1,
                    marginHorizontal: 10
                }}
            >
                {showDownload && <DownloadHeader />}
                {Array.isArray(playlistDetails.tracks) &&
                    playlistDetails.tracks.map((track, index) => (
                        <Track key={index} title={track.name} artist={track.artistName} />
                    ))
                }
            </View>
        </View>
    )
}

export default ListOfTracks
