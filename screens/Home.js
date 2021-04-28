import React, { useContext } from 'react'
import {
    View,
    StyleSheet,
} from 'react-native'
import { AuthContext } from '../navigation/authProvider'
import {  COLORS } from '../constants'
import RenderHeader from './home/RenderHeader'
import RenderCategories from './home/RenderCategories'
import RenderRestaurantList from './home/RenderRestaurantList'

const Home = ({ navigation }) => {

    const { isDarkTheme } = useContext(AuthContext)

    return (

        <View style={isDarkTheme ? styles.containerDark : styles.container}>
            <RenderHeader/>
            <RenderCategories/>
            <RenderRestaurantList navigation={navigation} />
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: COLORS.lightGray4
    },
    containerDark: {
        flex: 1,
        backgroundColor: '#111111'
    },
})

export default Home