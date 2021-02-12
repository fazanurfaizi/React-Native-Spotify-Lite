import React from 'react'
import { StyleSheet, Text } from 'react-native'
import { TouchableOpacity } from 'react-native-gesture-handler'
import Animated from 'react-native-reanimated'
import { AlbumType } from '@/models/SpotifyCommon'
import { colors } from '@/themes'
import { MARGIN_HORIZONTAL } from '@/components/search/ResultRow'
import UIHelper from '@/helpers/UIHelper'

const SeeAllBtn = React.memo(({
    type,
    data,
    handleSeeAll
}: {
    type: AlbumType["type"]
    data: AlbumType[]
    handleSeeAll: (data: AlbumType[], type: AlbumType["type"]) => void
}) => {

    const scale = new Animated.Value(1)

    return (
        <TouchableOpacity
            onPress={() => {
                handleSeeAll(data, type)
            }}
            onPressIn={() => {
                Animated.timing(scale, UIHelper.btnScaleAnim.in).start()
            }}
            onPressOut={() => {
                Animated.timing(scale, UIHelper.btnScaleAnim.out).start()
            }}
            style={styles.btnContainer}
        >
            <Animated.View
                style={[
                    {
                        transform: [{ scale }]
                    },
                    styles.container
                ]}
            >
                <Text style={styles.seeAll}>See all {type?.toLocaleLowerCase()}</Text>
            </Animated.View>
        </TouchableOpacity>
    )
})

const styles = StyleSheet.create({
    btnContainer: {
        marginVertical: 14,
    },
    
    container: {
        marginHorizontal: MARGIN_HORIZONTAL,
    },

    seeAll: {
        color: colors.darkWhite,
        letterSpacing: 0.8,
        fontSize: 16,
    },
})

SeeAllBtn.displayName = "SeeAllBtn"

export default SeeAllBtn