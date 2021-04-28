import React, { useContext } from 'react';
import {
    View,
    Image,
    FlatList,
    TouchableOpacity,
    ActivityIndicator,
    StyleSheet,
    Text
} from 'react-native'
import { useTheme } from '@react-navigation/native'
import { AuthContext } from '../../navigation/authProvider'
import { icons, COLORS, SIZE } from '../../constants'

import FavoritesEmptyState from './FavoritesEmptyState'
import useFavorites from './hook/useFavorites'
import usePositionDevice from '../usePositionDevice'
import LoadScreen from '../LoadScreen'

const Favorites = ({ navigation }) => {

    const { colors } = useTheme()
    const { isDarkTheme } = useContext(AuthContext)


    const [address, positionDevice] = usePositionDevice()
    const [favorites] = useFavorites(navigation)

    console.log(positionDevice, 'positionDevice');

    function renderItem({ item }) {

        console.log(item, 'item');

        return (
            <>
                {
                    positionDevice !== null ?

                        <TouchableOpacity
                            style={styles.containRestaurant}
                            onPress={() => navigation.navigate('Restaurant', {
                                item,
                                positionDevice,
                                address
                            })}
                        >
                            <View>
                                <Image
                                    source={item.photo}
                                    resizeMode='cover'
                                    style={styles.imgRestaurant}
                                />

                                <View style={isDarkTheme ? styles.restaurantTimeDark : styles.restaurantTime}>
                                    <Text style={[{ fontSize: 16, fontWeight: 'bold' }, {
                                        color: colors.text
                                    }]}>

                                        {item.duration}

                                    </Text>
                                </View>
                            </View>

                            <Text style={[{ fontSize: 20, fontWeight: 'bold', marginTop: 7 }, {
                                color: colors.text
                            }]}>
                                {item.name}
                            </Text>

                            <View
                                style={{
                                    marginTop: 10,
                                    flexDirection: 'row'
                                }}
                            >
                                <Image
                                    source={icons.star}
                                    style={styles.star}
                                />

                                <Text
                                    style={[{ fontSize: 17 },
                                    {
                                        color: colors.text
                                    }]}>
                                    {item.rating}
                                </Text>

                                <View style={{ flexDirection: 'row', marginLeft: 10 }}>
                                    {
                                        item.categories.map(categoryId => {
                                            return (
                                                <View
                                                    style={{ flexDirection: 'row' }}
                                                    key={categoryId}
                                                >
                                                    <Text style={{ fontSize: 15 }}>
                                                        {/* {getCategoryByName(categoryId)} */}
                                                    </Text>
                                                    <Text
                                                        style={{ fontSize: 18, color: COLORS.darkgray, paddingLeft: 5, paddingRight: 5 }}
                                                    >
                                                        ·
                                            </Text>
                                                </View>
                                            )
                                        })
                                    }

                                    {
                                        [1, 2, 3].map(priceRating => (
                                            <Text
                                                key={priceRating}
                                                style={{
                                                    fontSize: 16,
                                                    fontWeight: 'bold',
                                                    color: (priceRating <= item.priceRating) ? COLORS.black : COLORS.darkgray
                                                }}
                                            >
                                                $
                                            </Text>
                                        ))
                                    }

                                </View>
                            </View>

                        </TouchableOpacity>
                        :
                        <ActivityIndicator size="large" color="#0000ff"/>
            }
            </>
        )
    }

    return (
        <View>
            {
                favorites.length === 0 ?
                    <FavoritesEmptyState />
                    :
                    null
            }
            {
                favorites.length > 0 ?
                    <FlatList
                        data={favorites}
                        renderItem={renderItem}

                    />
                    :
                    null
            }
        </View>
    );
}

const styles = StyleSheet.create({
    containRestaurant: {
        marginBottom: 20,
        paddingLeft: 20,
        paddingRight: 20,
        marginTop: 20
    },
    imgRestaurant: {
        width: '100%',
        height: 200,
        borderRadius: 30,
    },
    restaurantTime: {
        position: 'absolute',
        backgroundColor: COLORS.white,
        bottom: 0,
        borderTopRightRadius: 30,
        borderBottomLeftRadius: 30,
        height: 50,
        width: 100,
        justifyContent: 'center',
        alignItems: 'center',
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 3,
        },
        shadowOpacity: 0.1,
        textShadowRadius: 1,
        elevation: 1
    },
    restaurantTimeDark: {
        position: 'absolute',
        backgroundColor: '#000000',
        bottom: 0,
        borderTopRightRadius: 30,
        borderBottomLeftRadius: 30,
        height: 50,
        width: 100,
        justifyContent: 'center',
        alignItems: 'center',
    },
    star: {
        width: 20,
        height: 20,
        tintColor: COLORS.primary,
        marginRight: 10
    },
    shadow: {
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 3,
        },
        shadowOpacity: 0.1,
        textShadowRadius: 1,
        elevation: 1
    },
})

export default Favorites;
