import React, { useState } from 'react'
import {
    View,
    Text,
    TextInput,
    Image,
    TouchableOpacity,
    SafeAreaView,
    ActivityIndicator
} from 'react-native'
import { FlatList } from 'react-native-gesture-handler'
import { divide } from 'react-native-reanimated'
import { COLORS, icons } from '../constants'
import restaurantData from '../restaurantData'
import usePositionDevice from './usePositionDevice'


function Search({ navigation }) {

    const [restaurant, setRestaurant] = useState(restaurantData)
    const [address, positionDevice, readyPosition] = usePositionDevice()
    const [isLoading, setIsLoading] = useState(false)

    function renderInputSearch() {
        return (
            <View
                style={{
                    alignItems: 'center',
                }}
            >
                <View
                    style={{
                        flexDirection: 'row',
                        justifyContent: 'center',
                        alignItems: 'center',
                        paddingHorizontal: 10,
                        borderBottomWidth: 1,
                        marginTop: 5,
                    }}
                >
                    <TouchableOpacity
                        style={{
                            paddingRight: 20
                        }}
                    >
                        <Image
                            source={icons.loupe}
                            resizeMode='contain'
                            style={{
                                height: 20,
                                width: 20
                            }}
                        />
                    </TouchableOpacity>
                    <TextInput
                        placeholder="Type here your favorite restaurant"
                        style={{
                            height: 50,
                            width: '70%',
                            fontSize: 18,
                            justifyContent: 'center'
                        }}
                    >

                    </TextInput>

                </View>

            </View>

        )
    }

    function renderRandomRestaurant() {

        const renderItem = ({ item }) => {

            return (
                <TouchableOpacity
                    style={{
                        marginVertical: 10
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
                            resizeMode='cover'
                            style={{
                                width: '100%',
                                height: 200,
                                borderRadius: 30,

                            }}
                        />
                    </View>
                </TouchableOpacity>
            )
        }
        return (
            <View style={{ paddingHorizontal: 20, marginTop: 20 }}>
                <View>
                    <Text style={{ fontSize: 30, fontWeight: 'bold' }}> Most</Text>
                    <Text style={{ fontSize: 30, fontWeight: 'bold' }}> Popular</Text>
                </View>
                <FlatList
                    data={restaurant.restaurantData}
                    keyExtractor={item => `${item.id}`}
                    renderItem={renderItem}
                />

            </View>
        )
    }

    console.log(restaurant.restaurantData, 'restaurantSEARCH');

    if (restaurant.restaurantData <= 0) {
        return (
            <View style={{justifyContent: 'center', alignItems: 'center'}}>
                <ActivityIndicator size="large" color={COLORS.primary}
                    style={{
                        justifyContent: 'center',
                        marginTop: 10
                    }}
                />
            </View>
        )
    }
    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: COLORS.lightGray4 }}>
            {renderInputSearch()}
            {renderRandomRestaurant()}
        </SafeAreaView>
    )
}

export default Search