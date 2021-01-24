import React, { useState, useEffect } from 'react'
import {
    View,
    Text,
    SafeAreaView,
    TouchableOpacity,
    FlatList,
    StyleSheet,
    Image,
} from 'react-native'

import { icons, COLORS, SIZE } from '../constants'
import { categoryData } from '../categoryData'
import { restaurantData } from '../restaurantData'
import renderRestaurantList from './renderRestaurantList'
import usePositionDevice  from './usePositionDevice'

const Home = ({ navigation }) => {
    const [categories, setCategories] = useState({ categoryData })
    const [ selectedCatergory, setSelectedCategory ] = useState(null)
    const [ restaurant, setRestaurant ] = useState({ restaurantData })

    const [ address, positionDevice, readyPosition] = usePositionDevice()

    
    function onSelectCategory(category){
        const restaurantList = restaurantData.filter( filter => filter.categories.includes(category.id))

        setRestaurant({restaurantData: restaurantList})

        setSelectedCategory(category)
    }


    function renderHeader(){
        return (
            <View style={{ flexDirection: 'row', height: 50}}>
                <TouchableOpacity
                    style={{
                        width: 50,
                        paddingLeft: 20,
                        justifyContent: 'center'
                    }}
                >

                    <Image
                        source={icons.nearby}
                        resizeMode='contain'
                        style={{
                            width: 30,
                            height: 30
                        }}
                    />

                </TouchableOpacity>

                <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center'}}>
                    <View style={{
                        backgroundColor: COLORS.lightGray3,
                        width: '70%',
                        height: '100%',
                        justifyContent: 'center',
                        alignItems: 'center',
                        borderRadius: 30,
                        paddingHorizontal: 10
                    }}>
                        <Text style={{ fontSize: 14}}> {address} </Text>
                    </View>
                </View>

                <TouchableOpacity
                    style={{
                        width: 50,
                        paddingRight: 20,
                        justifyContent: 'center'
                    }}
                >

                    <Image
                        source={icons.basket}
                        resizeMode='contain'
                        style={{
                            width: 30,
                            height: 30
                        }}
                    />

                </TouchableOpacity>

            </View>
        )
    }

    function renderMainCategories(){

        const renderItem = ({ item }) => {

            return (
                <TouchableOpacity
                    style={{
                        padding: 10,
                        paddingBottom: 20,
                        backgroundColor: (selectedCatergory?.id == item.id ) ? COLORS.primary : COLORS.white,
                        borderRadius: 30,
                        alignItems: 'center',
                        marginRight: 10,
                        ...styles.shadow
                    }}
                    onPress={ () => onSelectCategory(item) }
                >

                    <View
                        style={{
                            width: 50,
                            height: 50,
                            borderRadius: 25,
                            alignItems: 'center',
                            justifyContent: 'center',
                            backgroundColor:  (selectedCatergory?.id == item.id ) ? COLORS.white : COLORS.lightGray
                        }}
                    >
                        <Image
                            source={ item.icon }
                            resizeMode='contain'
                            style={{
                                width: 30,
                                height: 30
                            }}
                        />

                    </View>

                        <Text
                            style={{
                                marginTop: 10,
                                fontSize: 12,
                                color: (selectedCatergory?.id == item.id ) ? COLORS.white : COLORS.black
                            }}
                        >
                            {item.name}
                        </Text>
                </TouchableOpacity>
            )
        }

        return (
            <View style={{ paddingLeft: 20 }}>
                <Text style={{ fontSize: 30, fontWeight: 'bold'}}> Main </Text>
                <Text style={{ fontSize: 30, fontWeight: 'bold'}}> Categories </Text>

                <FlatList
                    data={categories.categoryData}
                    horizontal
                    showsHorizontalScrollIndicator={ false }
                    keyExtractor={item => `${item.id}`}
                    renderItem={ renderItem }
                    contentContainerStyle={{ paddingVertical: 20}}
                />

            </View>
        )
    }

  
    return (
        
        <SafeAreaView style={styles.container}>
                { renderHeader() }
                { renderMainCategories() }
                { renderRestaurantList(navigation)}
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: COLORS.lightGray4
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
    }
})

export default Home