import React from 'react'
import { ScrollView, StatusBar, View } from 'react-native'
import MaterialCommunityIcon from 'react-native-vector-icons/MaterialCommunityIcons'
import { colors, styles } from '@/themes'
import TopBar from '@/components/topBar/TopBar'
import FeaturedPlaylists from '@/components/playlist/FeaturedPlaylists'
import RecentlyPlayed from '@/components/playlist/RecentlyPlayed'
import TopArtists from '@/components/artist/TopArtists'
import { SafeAreaView, NavigationEvents } from 'react-navigation'
import { PLAYER_HEIGHT } from '@/components/player/StickyPlayer'

const Home = () => {
    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: colors.tabBar }}>
            <NavigationEvents
                onWillFocus={() => {
                    StatusBar.setBarStyle("light-content")
                }}
            />
            <View style={styles.container}>
                <StatusBar
                    backgroundColor={colors.background}
                    barStyle="light-content"
                />
                <TopBar title="Home">
                    <MaterialCommunityIcon
                        name="setting-outline"
                        size={24}
                        color={colors.itemInactive}
                        style={{ position: "absolute", right: 10 }}
                    />
                </TopBar>
                <ScrollView
                    style={{ width: "100%" }}
                    contentContainerStyle={{ paddingBottom: PLAYER_HEIGHT }}
                    showsVerticalScrollIndicator={false}
                >
                    <RecentlyPlayed />
                    <FeaturedPlaylists />
                    <TopArtists />
                </ScrollView>
            </View>
        </SafeAreaView>
    )
}

export default Home
