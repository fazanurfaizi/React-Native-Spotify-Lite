import React, { useContext } from 'react'
import { View, Text } from 'react-native'
import FastImage from 'react-native-fast-image'
import { connect, ConnectedProps } from 'react-redux'
import { NavigationContext } from 'react-navigation'
import AlbumItem from '@/components/album/AlbumItem'
import { albumDimensions, styles } from '@/themes'
import { setArtistId } from '@/redux/slices'
import { Routes } from '@/navigation/_routes'
import { TouchableOpacity } from 'react-native-gesture-handler'
import Animated from 'react-native-reanimated'
import UIHelper from '@/helpers/UIHelper'
import { RootStoreType } from '@/redux/rootReducer'

const TopArtists = ({
    userTopArtistsHeader,
    userTopArtists,
    setArtistId
}: ReduxProps) => {

    const scale = new Animated.Value(1)
    const navigation = useContext(NavigationContext)

    const onArtistsPressed = (id: string | undefined) => {
        if(id) {
            setArtistId(id)
            navigation.navigate(Routes.BottomTabs.HomeStack.ArtistDetails)
        }
    }

    return (
        <>
            <Text style={[styles.centeredText, styles.headerText, { marginTop: 22 }]}>
                Your top artist
            </Text>
            <Animated.View
                style={[
                    {
                        width: albumDimensions.ALBUM_DIMEN_FEATURED + 70,
                        alignSelf: "center",
                        transform: [{ scale }]
                    }
                ]}
            >
                <TouchableOpacity
                    onPressIn={() => Animated.timing(scale, UIHelper.btnScaleAnim.in).start()}
                    onPressOut={() => Animated.timing(scale, UIHelper.btnScaleAnim.out).start()}
                    onPress={() => onArtistsPressed(userTopArtistsHeader?.id)}
                >
                    <FastImage
                        source={{
                            uri: userTopArtistsHeader?.imageUrl ?? ""
                        }}
                        style={{
                            height: albumDimensions.ALBUM_DIMEN_FEATURED + 70,
                            width: albumDimensions.ALBUM_DIMEN_FEATURED + 70,
                            marginTop: 20
                        }}
                    />
                    <Text
                        numberOfLines={2}
                        style={[
                            styles.centeredText,
                            styles.albumText,
                            { marginBottom: 25, fontSize: 15 }
                        ]}
                    >
                        {userTopArtistsHeader?.name}
                    </Text>
                </TouchableOpacity>
            </Animated.View>
            <View style={styles.content}>
                {userTopArtists?.map(album => (
                    <AlbumItem
                        key={album.id}
                        {...{
                            album,
                            onPress: onArtistsPressed
                        }}
                    />
                ))}
            </View>
        </>
    )
}

const mapStateToProps = (state: RootStoreType) => ({
    userTopArtists: state.personalizationReducer.userTopArtists,
    userTopArtistsHeader: state.personalizationReducer.userTopArtistsHeader
})

const mapDispatchToProps = {
    setArtistId
}

const connector = connect(mapStateToProps, mapDispatchToProps)

type ReduxProps = ConnectedProps<typeof connector>

export default connector(TopArtists)