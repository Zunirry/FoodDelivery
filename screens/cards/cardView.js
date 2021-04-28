import React from 'react';
import {
    ImageBackground,
    TouchableOpacity,
    View,
    Image,
    Text,
    Dimensions,
    StyleSheet
} from 'react-native'
import { icons, COLORS } from '../../constants'

import images from '../../constants/images'
const windowWidth = Dimensions.get('window').width;


const cardView = ({ item }) => {
    return (
        <View style={{ ...styles.cardContainer, ...styles.shadow }}>

            <ImageBackground
                source={images.orange}
                style={styles.background}
                imageStyle={{ borderRadius: 20 }}
            >

                <View>
                    {item.card.brand === 'visa' &&
                        <Image
                            source={icons.visa}
                            resizeMode='contain'
                            style={styles.visa}
                        />
                    }
                </View>

                <Text style={styles.cardNumber}>Card number</Text>
                <View style={styles.cardRow}>
                    <Text style={styles.dotOfCard}>····  ····  ····  </Text>
                    <Text style={styles.last4}>{`${item.card.last4}`}</Text>
                </View>
                <View style={styles.expiry}>
                    <Text style={styles.expiryText}> Expiry year</Text>
                    <Text style={styles.expiryText}> {item.card.expYear} </Text>
                </View>


            </ImageBackground>
        </View>
    );
}

const styles = StyleSheet.create({
    cardRow: {
        flexDirection: 'row',
        alignItems: 'center'
    },
    dotOfCard: {
        fontSize: 45,
        fontWeight: 'bold',
        color: COLORS.white
    },
    last4: {
        fontSize: 18,
        fontWeight: 'bold',
        color: COLORS.white
    },
    background: {
        resizeMode: 'contain',
        flex: 1,
        paddingHorizontal: 20
    },
    expiry: {
        marginBottom: 15
    },
    expiryText: {
        color: COLORS.white,
        fontWeight: 'bold'
    },
    cardContainer: {
        borderRadius: 10,
        borderWidth: 0,
        width: windowWidth * 0.9,
        height: 200,
    },
    visa: {
        width: 40,
        height: 40,
        marginVertical: 10,
    },
    cardNumber: {
        fontSize: 18,
        fontWeight: 'bold',
        color: COLORS.white,
        bottom: -5,
    },
    shadow: {
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 5,
        },
        shadowOpacity: 0.36,
        shadowRadius: 6.68,

        elevation: 11,
    }
})

export default cardView;
