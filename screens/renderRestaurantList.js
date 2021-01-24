import React, {useState} from 'react'
import {
    TouchableOpacity,
    View,
    Text,
    Image,
    FlatList,
    StyleSheet
} from 'react-native'
import restaurantData from '../restaurantData'
import { COLORS, icons } from '../constants'
import { categoryData } from '../categoryData'

import usePositionDevice from './usePositionDevice'


const renderRestaurantList =  (navigation) =>{

    console.log(navigation,'navigation');
    const [restaurant, setRestaurant] = useState(restaurantData)
    const [categories, setCategories] = useState({ categoryData })
    const [address, positionDevice, readyPosition] = usePositionDevice()


    function getCategoryByName(id){
        const category = categoryData.filter(filter => filter.id == id)


        if(category.length > 0)

            return category[0].name

        return ""
    }


    const renderItem = ({ item }) => {

        return (
            <TouchableOpacity
                style={{
                    marginBottom: 20,
                    paddingLeft: 20,
                    paddingRight: 20
                }}
                onPress={() => navigation.navigate('Restaurant', {
                    item,
                    positionDevice,
                    address
                })}
            >
                <View>
                    <Image
                        source={item.photo}
                        resizeMode= 'cover'
                        style={{
                            width: '100%',
                            height: 200,
                            borderRadius: 30,

                        }}
                    />

                    <View
                        style={{
                            position: 'absolute',
                            backgroundColor: COLORS.white,
                            bottom: 0,
                            borderTopRightRadius: 30,
                            borderBottomLeftRadius: 30,
                            height: 50,
                            width: 100,
                            justifyContent: 'center',
                            alignItems: 'center',
                            ...styles.shadow

                        }}
                    >
                        <Text
                            style={{
                                fontSize: 16,
                                fontWeight: 'bold'
                            }}
                        >

                            {item.duration}

                        </Text>
                    </View>
                </View>

                <Text style={{ fontSize: 20, fontWeight: 'bold', marginTop: 7}}>
                    { item.name }
                </Text>

                <View
                    style={{
                        marginTop: 10,
                        flexDirection: 'row'
                    }}
                >
                    <Image
                        source={ icons.star }
                        style={{
                            width: 20,
                            height: 20,
                            tintColor: COLORS.primary,
                            marginRight: 10
                        }}
                    />

                    <Text style={{ fontSize: 17}}>
                        { item.rating }
                    </Text>

                    <View style={{ flexDirection: 'row', marginLeft: 10}}>
                        {
                            item.categories.map(categoryId => {
                                return (
                                    <View
                                        style={{ flexDirection: 'row'}}
                                        key={ categoryId }
                                    >
                                        <Text style={{fontSize: 15}}>
                                            {getCategoryByName(categoryId)}
                                        </Text>
                                        <Text
                                            style={{ fontSize: 18, color: COLORS.darkgray,  paddingLeft: 5, paddingRight: 5}}
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
        )
    }
    return (

        <FlatList
            data={ restaurant.restaurantData }
            keyExtractor={ item => `${item.id}`}
            renderItem={ renderItem }
        />
    )
}

const styles = StyleSheet.create({
    shadow: {
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 3,
        },
        shadowOpacity: 0.1,
        textShadowRadius: 1,
        elevation: 1
    }
})

export default renderRestaurantList