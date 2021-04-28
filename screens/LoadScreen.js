import React from 'react'
import {
    View,
    Text,
    Image,
    StyleSheet
} from 'react-native'
import { COLORS } from '../constants'
import LottieView from 'lottie-react-native';


function LoadScreen() {
    return (
        <>
            <View style={styles.container}>
                <Text style={styles.title}>
                    Food Delivery
                </Text>
            </View>
            <LottieView source={require('../constants/lottie.json')} autoPlay loop />
        </>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1, 
        backgroundColor: COLORS.lightGray5,
        alignItems: 'center',
    },
    title: {
        color: COLORS.white,
        top: 200,
        fontWeight: 'bold',
        fontSize: 30,
        fontStyle: 'italic',
    }
})

export default LoadScreen