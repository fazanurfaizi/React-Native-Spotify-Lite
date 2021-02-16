import React from 'react'
import { Text } from 'react-native'
import { createMaterialBottomTabNavigator } from 'react-navigation-material-bottom-tabs'
import { createStackNavigator, NavigationStackProp } from 'react-navigation-stack'
import UIHelper from '@/helpers/UIHelper'
import { colors } from '@/themes'
import ArtistDetails from '@/screens/artistDetails/ArtistDetails'
import Genre from '@/components/genre/Genre'
import Search from '@/components/search/Search'
import Explore from '@/screens/explore/Explore'
import SeeAll from '@/components/SeeAll/SeeAll'
import StickyPlayer from '@/components/player/StickyPlayer'
import ProctedRoute from '@/navigation/ProtectedRoute'
import TobTabsStack from '@/components/navigators/topTabs/TopTabsStack'
import FavoriteIcon from '@/components/icon/FavoritesIcon'
import HomeIcon from '@/components/icon/HomeIcon'
import SearchIcon from '@/components/icon/SearchIcon'
import Home from '@/screens/home/Home'
import PlaylistDetails from '@/screens/playlistDetails/PlaylistDetails'
import TopTabsStack from '@/components/navigators/topTabs/TopTabsStack'

const BAR_HEIGHT = UIHelper.isIphoneX() ? 78 : 58

const HomeLabel = () => <Text style={{ fontSize: 10 }}>Home</Text>
const SearchLabel = () => <Text style={{ fontSize: 10 }}>Search</Text>
const FavoriteLabel = () => <Text style={{ fontSize: 10 }}>Favorite</Text>

const createProtectedBottomTabsNav = () => {

    const BottomTabsNav = createMaterialBottomTabNavigator(
        {
            HomeStack: {
                screen: createStackNavigator(
                    {
                        Home,
                        PlaylistDetails,
                        ArtistDetails
                    },
                    {
                        headerMode: "none"
                    },
                ),
                navigationOptions: {
                    tabBarIcon: HomeIcon,
                    tabBarLabel: <HomeLabel />
                },
            },
            ExploreStack: {
                screen: createStackNavigator(
                    {
                        Explore,
                        Search,
                        Genre,
                        PlaylistDetails,
                        ArtistDetails,
                        SeeAll
                    },
                    {
                        headerMode: "none",                        
                    },
                ),
                navigationOptions: {
                    tabBarIcon: SearchIcon,
                    tabBarLabel: <SearchLabel />
                },
            },
            FavoritesStack: {
                screen: TopTabsStack,
                navigationOptions: {
                    tabBarIcon: FavoriteIcon,
                    tabBarLabel: <FavoriteLabel />
                },
            },
        },
        {
            initialRouteName: "HomeStack",
            barStyle: {
                backgroundColor: colors.tabBar,
                padding: 2,
                height: BAR_HEIGHT
            },
            activeColor: colors.white,
            inactiveColor: colors.itemInactive
        },
    )

    /**
     * this navigator will observe `authenticated` from redux store, and navigate to login screen if it is false
     */

    const ConnectedBottomTabsNav = ({
        navigation,
    }: {
        navigation: NavigationStackProp
    }) => {
        return (
            <ProctedRoute navigation={navigation}>
                <StickyPlayer barHeight={BAR_HEIGHT} />
                <BottomTabsNav navigation={navigation} />
            </ProctedRoute>
        )
    }

    ConnectedBottomTabsNav.router = BottomTabsNav.router

    return ConnectedBottomTabsNav
}

export default createProtectedBottomTabsNav
