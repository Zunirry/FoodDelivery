import React from 'react'
import { View, Text, StyleSheet } from 'react-native'
import { useTheme } from '@react-navigation/native'


const favoritesEmptyState = () => {

    const { colors } = useTheme()

    return (
        <View style={styles.container}>
            <Text style={[{...styles.text}, {
                color: colors.text
            }]}> You don't have any favorite yet </Text>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        top: 100,
        alignItems: 'center',
        justifyContent: 'center'
    },
    text: {
        color: '#333333',
        fontWeight: 'bold',
        fontSize: 18,
        alignSelf: 'center'
    }
})

export default favoritesEmptyState 