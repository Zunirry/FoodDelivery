import React, { useContext } from 'react';
import {
    View,
    Text,
    TouchableOpacity,
    StyleSheet,
    FlatList,
    Image,
} from 'react-native'
import { useTheme } from '@react-navigation/native'
import { AuthContext } from '../../navigation/authProvider'
import { categoryData } from '../../categoryData'
import { icons, COLORS } from '../../constants'
import usePositionDevice from '../usePositionDevice'


const RenderRestaurantList = ({navigation}) => {

    const { colors } = useTheme()
    const { isDarkTheme, restaurant } = useContext(AuthContext)

    const [address, positionDevice] = usePositionDevice()

    function getCategoryByName(id) {
        const category = categoryData.filter(filter => filter.id == id)


        if (category.length > 0)

            return category[0].name

        return ""
    }


    const renderItem = ({ item }) => {

        return (
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

                    <View style={[isDarkTheme ? styles.restaurantTimeDark : styles.restaurantTime]}>
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

                    <Text style={[{ fontSize: 17 }, {
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
                                        <Text style={[{ fontSize: 15 }, {
                                            color: colors.text
                                        }]}>
                                            {getCategoryByName(categoryId)}
                                        </Text>
                                        <Text
                                            style={isDarkTheme ? styles.dotDark : styles.dot}
                                        >
                                            ·
                                    </Text>
                                    </View>
                                )
                            })
                        }

                        {
                            isDarkTheme ?
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
                                :
                                [1, 2, 3].map(priceRating => (
                                    <Text
                                        key={priceRating}
                                        style={{
                                            fontSize: 16,
                                            fontWeight: 'bold',
                                            color: (priceRating <= item.priceRating) ? COLORS.darkgray : COLORS.black
                                        }}
                                    >
                                        $
                                    </Text>
                                ))
                        }

                    </View>
                </View>

            </TouchableOpacity>
        )
    }
    return (

        <FlatList
            data={restaurant.restaurantData}
            keyExtractor={item => `${item.id}`}
            renderItem={renderItem}
        />
    )

}

const styles = StyleSheet.create({
    img: {
        width: 30,
        height: 30
    },
    fonts: {
        marginTop: 10,
        fontSize: 12,
    },
    containRestaurant: {
        marginBottom: 20,
        paddingLeft: 20,
        paddingRight: 20
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
        shadowColor: COLORS.white,
        shadowOffset: {
            width: 0,
            height: 3,
        },
        shadowOpacity: 0.1,
        textShadowRadius: 1,
        elevation: 1
    },
    star: {
        width: 20,
        height: 20,
        tintColor: COLORS.primary,
        marginRight: 10
    },
    dot: {
        fontSize: 18, 
        color: COLORS.darkgray,
        paddingLeft: 5, 
        paddingRight: 5 
    },
    dotDark: {
        fontSize: 18, 
        color: COLORS.lightGray5,
        paddingLeft: 5, 
        paddingRight: 5 
    }
})

export default RenderRestaurantList;
