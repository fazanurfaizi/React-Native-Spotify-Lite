import React from 'react'
import { SafeAreaView } from 'react-navigation'
import { MaterialTopTabBar } from 'react-navigation-tabs'

const SafeMaterialTobTabBar = (props: any) => {
    return (
        <SafeAreaView>
            <MaterialTopTabBar {...props} />
        </SafeAreaView>
    )
}

export default SafeMaterialTobTabBar