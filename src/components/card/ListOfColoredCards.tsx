import React from 'react'
import { StyleSheet, ScrollView, View } from 'react-native'
import { colors } from '@/themes'
import ColoredCard from './ColoredCard'
import { PLAYER_HEIGHT } from '@/components/player/StickyPlayer'

const ListOfColoredCards = ({
    categoriesForCountry,
    onGenrePressed
}: {
    categoriesForCountry: {
        name: string
        id: string
    }[]
    onGenrePressed: (id: string, title: string) => void
}) => {
    return (
        <View style={styles.container}>
            <ScrollView
                overScrollMode="never"
                contentContainerStyle={styles.scrollViewContent}
            >
                {categoriesForCountry.map((item, index) => (
                    <ColoredCard
                        item={item}
                        index={index}
                        key={item.name}
                        onPress={() => onGenrePressed(item.id, item.name)}
                    />
                ))}
            </ScrollView>
        </View>
    )
}

export default ListOfColoredCards

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: colors.background,
        width: "100%",
    },
    scrollViewContent: {
        marginTop: 16,
        flexDirection: "row",
        justifyContent: "space-evenly",
        flexWrap: "wrap",
        paddingBottom: 16 + PLAYER_HEIGHT,
    }
})
