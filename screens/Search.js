import React, { useState, useContext } from 'react'
import {
    View,
    Text,
    TextInput,
    Image,
    TouchableOpacity,
    SafeAreaView,
    StyleSheet
} from 'react-native'
import { useTheme } from '@react-navigation/native'
import { AuthContext } from '../navigation/authProvider'
import { FlatList } from 'react-native-gesture-handler'
import { COLORS, icons } from '../constants'
import restaurantData from '../restaurantData'
import usePositionDevice from './usePositionDevice'


function Search({ navigation }) {

    const { isDarkTheme } = useContext(AuthContext)
    const { colors } = useTheme()


    const [restaurant, setRestaurant] = useState(restaurantData)
    const [address, positionDevice] = usePositionDevice(null)
    const [search, setSearch] = useState('')


    function updateSearch(search) {
        setSearch(search)
        const searchRes = restaurant.restaurantData.filter(query => query.name.toLowerCase().includes(search.toLowerCase()))

        if (search.length > 0) {
            setRestaurant({ restaurantData: searchRes })
        } else {
            setRestaurant(restaurantData)
        }

    }

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
                        borderColor: isDarkTheme ? '#cccccc' : '#333333',
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
                            tintColor={isDarkTheme ? '#cccccc' : '#333333'}
                            style={{
                                height: 20,
                                width: 20
                            }}
                        />
                    </TouchableOpacity>
                    <TextInput
                        placeholder="Type here your favorite restaurant"
                        color={isDarkTheme ? '#cccccc' : '#333333'}
                        placeholderTextColor={isDarkTheme ? '#cccccc' : '#333333'}
                        style={{
                            height: 50,
                            width: '70%',
                            fontSize: 16,
                            justifyContent: 'center'
                        }}
                        onChangeText={updateSearch}
                        value={search}
                    />


                </View>


            </View>

        )
    }


    function renderRandomRestaurant() {


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
            )
        }
        return (
            <View style={{ paddingLeft: 20 }}>
                <View style={{ marginVertical: 20 }}>
                    <Text style={isDarkTheme ? styles.titleDark : styles.title}> Most</Text>
                    <Text style={isDarkTheme ? styles.titleDark  : styles.title}> Popular</Text>
                </View>
                <FlatList
                    data={restaurant.restaurantData}
                    keyExtractor={item => `${item.id}`}
                    renderItem={renderItem}
                />

            </View>
        )
    }

    return (
        <SafeAreaView style={isDarkTheme ? styles.containerDark : styles.container}>
            {renderInputSearch()}
            {renderRandomRestaurant()}
        </SafeAreaView>
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
    containRestaurant: {
        marginBottom: 20,
        paddingRight: 20,
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
    title: {
        fontSize: 30,
        fontWeight: 'bold',
        color: '#333333'
    },
    titleDark: {
        fontSize: 30,
        fontWeight: 'bold',
        color: COLORS.white
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


export default Search