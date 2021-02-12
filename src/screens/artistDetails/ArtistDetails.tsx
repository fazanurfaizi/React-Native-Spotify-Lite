import React, { useRef, useState } from 'react'
import { 
    StyleSheet, 
    Text, 
    View,
    ActivityIndicator,
    StatusBar,
    ScrollView
} from 'react-native'
import LinearGradient from 'react-native-linear-gradient'
import Animated from 'react-native-reanimated'
import { NavigationEvents, SafeAreaView } from 'react-navigation'
import { NavigationStackProp } from 'react-navigation-stack'
import { connect, ConnectedProps } from 'react-redux'
import ArtistCover from '@/components/artist/ArtistCover'
import DetailsCover from '@/components/cover/DetailsCover'
import ListOfTracks from '@/components/track/ListOfTracks'
import PlaylistHeaderControl from '@/components/playlist/PlaylistHeaderControl'
import PlaylistTitle from '@/components/playlist/PlaylistTitle'
import ShuffleButton from '@/components/buttons/ShuffleButton'
import UIHelper from '@/helpers/UIHelper'
import usePlaylistAnim from '@/hooks/usePlaylistAnim'
import useArtistDetails from '@/hooks/useArtistDetails'
import { colors } from '@/themes'
import { RootStoreType } from '@/redux/rootReducer'
import { setArtistId, redoLogin } from '@/redux/slices'
import { Routes } from '@/navigation/_routes'

const LoadingView = () => (
    <ActivityIndicator
        size={50}
        color={colors.green}
        style={{
            flex: 1,
            justifyContent: "center",
            alignItems: "center"
        }}
    />
)

const ArtistDetails = ({
    artistId,
    setArtistId,
    navigation,
    profile,
    redoLogin
}: ReduxProps & { navigation: NavigationStackProp}) => {

    const offsetY = useRef(new Animated.Value(0)).current
    const { heightAnim, opacityAnim, translateAnim } = usePlaylistAnim(offsetY)
    const [scrollViewHeight, setScrollViewHeight] = useState<number>(100)
    const { isLoading, dominantColor, artistDetails } = useArtistDetails({
        artistId,
        profile,
        redoLogin
    })

    const goToArtist = (id: string) => {
        setArtistId(id)
        navigation.navigate(Routes.BottomTabs.HomeStack.ArtistDetails)
    }

    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: colors.background }}>
            <NavigationEvents onWillFocus={() => StatusBar.setBarStyle("light-content")} />
            <PlaylistHeaderControl
                id={artistId}
                goBack={() => navigation.goBack()}
                isLoading={isLoading}
                itemType="ARTIST"
            />
            {isLoading ? (
                <LoadingView />
            ) : (
                <>
                    <PlaylistTitle name={artistDetails?.name} />
                    <Animated.View
                        style={[
                            styles.gradientContainer,
                            {
                                height: Animated.concat(heightAnim, "%"),
                                opacity: opacityAnim
                            }
                        ]}
                    >
                        <LinearGradient
                            start={{ x: 0, y: 0 }}
                            end={{ x: 0, y: 0.7 }}
                            colors={[dominantColor, colors.background]}
                            style={styles.gradient}
                        />
                    </Animated.View>
                    <View style={styles.coverContainer}>
                        <DetailsCover
                            coverShape="CIRCLE"
                            offsetY={offsetY}
                            name={artistDetails?.name}
                            imageUrl={artistDetails?.imageUrl}
                            artistName={artistDetails?.ownerName}
                            username={profile?.display_name}
                        />
                    </View>
                    <ShuffleButton offsetY={offsetY} />
                    <Animated.ScrollView
                        onLayout={(e) => setScrollViewHeight(e.nativeEvent.layout.height)}
                        bounces={false}
                        decelerationRate={0.994}
                        overScrollMode="never"
                        onScroll={UIHelper.onScroll({ y: offsetY })}
                        showsHorizontalScrollIndicator={false}
                        scrollEventThrottle={1}
                        style={[{ transform: [{ translateY: translateAnim }] }]}
                        contentContainerStyle={[
                            styles.scrollContent,
                            {
                                paddingBottom: scrollViewHeight * 0.85
                            }
                        ]}
                    >
                        {artistDetails && (
                            <ListOfTracks
                                playlistDetails={artistDetails}
                                showDownload={false}
                            />
                        )}
                        <Text style={[styles.relatedArtists]}>Related artists</Text>
                        {artistDetails && (
                            <ScrollView
                                horizontal
                                style={{
                                    marginTop: 12
                                }}
                                contentContainerStyle={{
                                    paddingBottom: 30
                                }}
                                showsHorizontalScrollIndicator={false}
                            >
                                {artistDetails.relatedArtists.map((artist) => (
                                    <ArtistCover
                                        coverShape="CIRCLE"
                                        key={artist.id}
                                        onPress={() => goToArtist(artist.id)}
                                        album={{
                                            id: artist.id,
                                            name: artist.name,
                                            imageUrl: artist.imageUrl
                                        }}
                                    />
                                ))}
                            </ScrollView>
                        )}
                    </Animated.ScrollView>
                </>                
            )}
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    gradientContainer: {
        alignSelf: "center",
        alignItems: "center",
        ...StyleSheet.absoluteFillObject,
    },
    gradient: {
        alignSelf: "center",
        alignItems: "center",
        ...StyleSheet.absoluteFillObject,
    },
    coverContainer: {
        ...StyleSheet.absoluteFillObject,
        marginTop: UIHelper.isIphoneX() ? -10 : -50,
        top: 100,
    },
    scrollContent: {
        marginTop: 360,
        zIndex: 5,
    },
    relatedArtists: {
        alignSelf: "center",
        color: "white",
        fontWeight: "bold",
        fontSize: 18.5,
        marginTop: 24,
    }
})

const mapStateToProps = (state: RootStoreType) => ({
    artistId: state.artistReducer.artistId,
    profile: state.userReducer.profile
})

const mapDispatchToProps = {
    setArtistId,
    redoLogin
}

const connector = connect(mapStateToProps, mapDispatchToProps)

type ReduxProps = ConnectedProps<typeof connector>

export default connector(ArtistDetails)