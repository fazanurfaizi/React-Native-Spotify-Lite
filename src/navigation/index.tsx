import React from 'react'
import { createAppContainer } from 'react-navigation'
import { createStackNavigator } from 'react-navigation-stack'
import Login from '@/screens/auth/Login'
import createProtectedBottomTabsNav from '@/components/navigators/bottomTabs/createProtectedBottomTabsNav'
import { Transition } from 'react-native-reanimated'
import createAnimatedSwitchNavigator from 'react-navigation-animated-switch'

export default createAppContainer(
    createAnimatedSwitchNavigator(
        {
            BottomTabs: createProtectedBottomTabsNav(),
            LoginStack: createStackNavigator({ Login }, { headerMode: "none" })
        },
        {
            initialRouteName: "LoginStack",
            transition: (
                <Transition.Together>
                    <Transition.Out
                        type="slide-left"
                        durationMs={400}
                        interpolation="easeIn"
                    />
                    <Transition.In type="slide-right" durationMs={400} />
                </Transition.Together>
            )
        }
    )
)