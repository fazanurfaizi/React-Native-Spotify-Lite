import { createStackNavigator } from 'react-navigation-stack'
import { createMaterialTopTabNavigator } from 'react-navigation-tabs'
import { colors } from '@/themes'
import ArtistDetails from '@/screens/artistDetails/ArtistDetails'
import FavoriteAlbums from '@/screens/favorites/FavoriteAlbums'
import FavoriteArtists from '@/screens/favorites/FavoriteArtists'
import FavoritePlaylists from '@/screens/favorites/FavoritePlaylists'
import PlaylistDetails from '@/screens/playlistDetails/PlaylistDetails'
import SafeMaterialTopTabBar from '@/navigation/SafeMaterialTopTabBar'

/**
 * Favorite tabs
 */
const TopTabsStack = createStackNavigator(
    {
        TopTabsNav: createMaterialTopTabNavigator(
            {
                FavoritePlaylists: {
                    screen: FavoritePlaylists,
                    navigationOptions: {
                        title: "Playlists"
                    },
                },
                FavoriteArtists: {
                    screen: FavoriteArtists,
                    navigationOptions: {
                        title: "Artists"
                    },
                },
                FavoriteAlbums: {
                    screen: FavoriteAlbums,
                    navigationOptions: {
                        title: "Albums"
                    },
                },
            },
            {
                tabBarComponent: SafeMaterialTopTabBar,
                tabBarOptions: {
                    upperCaseLabel: false,
                    labelStyle: {
                        fontSize: 15.5
                    },
                    activeTintColor: colors.white,
                    inactiveTintColor: colors.itemInactive,
                    style: {
                        backgroundColor: colors.tabBar,
                        elevation: 0,
                        marginEnd: 100,
                    },
                    contentContainerStyle: {
                        height: 55,
                    },
                    indicatorStyle: {
                        backgroundColor: "#1ED760",
                    },
                },
                style: {
                    backgroundColor: colors.tabBar
                },
            },
        ),
        PlaylistDetails,
        ArtistDetails,
    },
    {
        headerMode: "none",
    }
)

export default TopTabsStack