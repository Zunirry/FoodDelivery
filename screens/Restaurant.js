import React, { useState } from 'react'
import {
    View,
    Text,
    StyleSheet,
    SafeAreaView,
    TouchableOpacity,
    Image,
    Animated,
    Dimensions 
} from 'react-native'
import { icons, COLORS } from '../constants'

import usePositionDevice from './usePositionDevice'


const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;


const Restaurant = ({ route, navigation }) => {
    
    const { item } = route.params
    console.log(route, 'ROUTE');
    const scrollX = new Animated.Value(0)

    const [orderItems, setOrderItems] = useState([])
    const [ address, positionDevice, readyPosition] = usePositionDevice()

    console.log(positionDevice, 'positionDeviceRestaurant');

    function editOrder(action, menuId, price){

        const orderList = orderItems.slice()
        const item = orderList.filter( filter => filter.menuId == menuId)

        if(action == "+"){

            if(item.length > 0){

                const newNum = item[0].qty + 1
                item[0].qty = newNum
                item[0].total = item[0].qty * price

            } else {

                const newItem = {
                    menuId: menuId,
                    qty: 1,
                    price: price,
                    total: price
                }

                orderList.push(newItem)
            }
            
            setOrderItems(orderList)

        } else {
            if(item.length > 0){
                if(item[0]?.qty > 0){
                    const newNum = item[0].qty - 1
                    item[0].qty = newNum
                    item[0].total = item[0].qty * price
                }
            }
            
            setOrderItems(orderList)
        }
    }

    function getOrderNum(menuId){
        const orderItem = orderItems.filter(filter => filter.menuId == menuId)

        if(orderItem.length > 0){
            return orderItem[0].qty
        }
        
        return 0
    }

    function getBasketItemCount(){
        const itemCount = orderItems.reduce( (a,b) => a + (b.qty || 0), 0)

        return itemCount
    }

    function getSumOrder(){
        const total = orderItems.reduce( (a,b) => a + (b.total || 0), 0)

        return total.toFixed(2)
    }

    function renderHeader(){

        return(
            <View
                style={{ flexDirection: 'row'}}
            >
                <TouchableOpacity
                    style={{
                        width: 50,
                        paddingLeft: 20,
                        justifyContent: 'center',
                        paddingTop: 10
                    }}
                    onPress={() => navigation.goBack()}
                >

                    <Image
                        source={icons.back}
                        resizeMode='contain'
                        style={{
                            width: 50,
                            height: 30,
                        }}
                    />
                </TouchableOpacity>

                <View
                    style={{ 
                        flex: 1,
                        justifyContent: 'center', 
                        alignItems: 'center'
                    }}
                >
                    <View 
                        style={{
                            height: 50,
                            justifyContent: 'center',
                            alignItems: 'center',
                            paddingLeft: 20,
                            paddingRight: 20,
                            borderRadius: 30,
                            backgroundColor: COLORS.lightGray3
                        }}
                    >
                        <Text
                            style={{
                                fontSize: 20
                            }}
                        >
                            {item.name}
                        </Text>
                    </View>
                </View>

                <TouchableOpacity
                    style={{
                        paddingRight: 20,
                        paddingTop: 10,
                        justifyContent: 'center'
                    }}
                >
                    <Image
                        source={icons.list}
                        resizeMode='contain'
                        style={{
                            height: 30,
                            width: 50,
                        }}
                    />

                </TouchableOpacity>


            </View>
        )
    }

    function renderFoodInfo(){
        return(
            <Animated.ScrollView
                horizontal
                pagingEnabled
                scrollEventThrottle={16}
                snapToAlignment='center'
                showsHorizontalScrollIndicator={false}
                onScroll={Animated.event(
                    [{ nativeEvent: {
                         contentOffset: {
                           x: scrollX
                         }
                       }
                     }],
                     { useNativeDriver: false}
                  )}
            >
                {
                    item.menu.map(food => (
                        <View
                            key={food.menuId}
                            style={{
                                alignItems: 'center'
                            }}
                        >
                            <View style={{ height: windowHeight * 0.35}}>
                                <Image
                                    source={food.photo}
                                    resizeMode='cover'
                                    style={{
                                        height: '100%',
                                        width: windowWidth
                                    }}
                                />
                                <View
                                    style={{
                                        position: 'absolute',
                                        flexDirection: 'row',
                                        justifyContent: 'center',
                                        width: windowWidth,
                                        height: 50,
                                        bottom: - 30
                                    }}
                                >
                                    <TouchableOpacity
                                        style={{
                                            backgroundColor: COLORS.white,
                                            alignItems: 'center',
                                            justifyContent: 'center',
                                            width: 50,
                                            borderTopLeftRadius: 25,
                                            borderBottomLeftRadius: 25
                                        }}
                                        onPress={() => editOrder("-", food.menuId, food.price)}
                                    >
                                        <Text style={{ fontWeight: 'bold', fontSize: 30 }}> - </Text>
                                    </TouchableOpacity>

                                    <View
                                        style={{
                                            width: 50,
                                            backgroundColor: COLORS.white,
                                            justifyContent: 'center',
                                            alignItems: 'center'
                                        }}
                                    >
                                        <Text style={{ fontSize: 22, fontWeight: 'bold'}}> { getOrderNum(food.menuId) } </Text>
                                    </View>

                                    <TouchableOpacity
                                        style={{
                                            backgroundColor: COLORS.white,
                                            alignItems: 'center',
                                            justifyContent: 'center',
                                            width: 50,
                                            borderTopRightRadius: 25,
                                            borderBottomRightRadius: 25
                                        }}
                                        onPress={() => editOrder("+", food.menuId, food.price) }
                                    >

                                        <Text style={{ fontWeight:'bold', fontSize: 30 }}> + </Text>

                                    </TouchableOpacity>

                                </View>
                            </View>

                            <View
                                style={{
                                    width: windowWidth,
                                    alignItems: 'center',
                                    marginTop: 35

                                }}
                            >
                                <Text 
                                    style={{ 
                                        fontSize: 18, 
                                        fontWeight: 'bold',
                                        marginVertical: 10,
                                        textAlign: 'center'
                                    }}>
                                    {food.name} - ${food.price.toFixed(2)}
                                </Text>
                                <Text style={{ fontSize: 16, }}>
                                    {food.description}
                                </Text>
                            </View>

                            <View
                                style={{
                                    flexDirection: 'row',
                                    marginTop: 10
                                }}
                            >
                                <Image
                                    source={icons.fire}
                                    style={{
                                        width: 20,
                                        height: 20,
                                        marginRight: 10
                                    }}
                                />
                                <Text style={{ color: COLORS.darkgray, fontSize: 16, fontWeight: 'bold'}}> { food.calories.toFixed(2) } cal </Text>

                            </View>
                            
                        
                        </View>
                    ))
                }
            </Animated.ScrollView>
        )
    }

    function renderDots(){

        const dotPosition = Animated.divide(scrollX, windowWidth)

        return (
            <View
                style={{
                    flexDirection: 'row',
                    justifyContent: 'center',
                    alignItems: 'center',
                    height: 10
                }}
            >
                {
                    item.menu.map( (item, index) => {
                        const opacity = dotPosition.interpolate({
                            inputRange: [index - 1, index, index + 1],
                            outputRange: [0.5, 1, 0.5],
                            extrapolate: "clamp"
                        })

                        const dotSize = dotPosition.interpolate({
                            inputRange: [index - 1, index, index + 1],
                            outputRange: [ 6.5, 10, 6.5],
                            extrapolate: "clamp"
                        })

                        const dotColor = dotPosition.interpolate({
                            inputRange: [index - 1, index, index + 1],
                            outputRange: [COLORS.darkgray, COLORS.primary, COLORS.darkgray],
                            extrapolate: "clamp"
                        })


                        return (
                            <Animated.View
                                key={ index }
                                opacity={ opacity }
                                style={{
                                    borderRadius: 30,
                                    marginHorizontal: 6,
                                    width: dotSize,
                                    height: dotSize,
                                    backgroundColor: dotColor
                                }}
                            />
                        )
                    })
                }
            </View>
        )


    }


    function renderOrder(){
        return(
            <View>
                {
                    renderDots()
                }
                <View
                    style={{
                        backgroundColor: COLORS.white,
                        borderTopLeftRadius: 40,
                        borderTopRightRadius: 40,
                        borderColor: 'black',
                        marginTop: 20
                    }}
                >
                    <View
                        style={{
                            flexDirection: 'row',
                            justifyContent: 'space-between',
                            paddingHorizontal: 20,
                            paddingVertical: 20,
                            borderBottomColor: COLORS.lightGray2,
                            borderBottomWidth: 1
                        }}
                    >
                        <Text style={{ fontWeight: 'bold', fontSize: 20}}>{getBasketItemCount()} Items in cart </Text>
                        <Text style={{ fontWeight: 'bold', fontSize: 20}}> ${getSumOrder() } </Text>
                        
                    </View>

                    <View 
                        style={{
                            flexDirection: 'row',
                            justifyContent: 'space-between',
                            paddingHorizontal: 20,
                            paddingVertical: 20,
                        }}z
                    >
                        <View
                            style={{ flexDirection: 'row'}}
                        >

                        <Image
                            source={icons.pin}
                            resizeMode='contain'
                            style={{
                                height: 20,
                                width: 20,
                                tintColor: COLORS.darkgray
                            }}
                        />

                        <Text style={{ fontWeight: 'bold', fontSize: 18 }} > Location </Text>
                        </View>

                        <View style={{ flexDirection: 'row', alignItems: 'center'}}>
                            
                            <Image
                                source={icons.mastercard}
                                resizeMode='contain'
                                style={{
                                    width: 20,
                                    height: 20,
                                    tintColor: COLORS.darkgray,
                                }}
                            />
                            <Text style={{ fontWeight: 'bold', fontSize: 20, marginLeft: 10 }}>8888</Text>
                        </View>
                    </View>
                    
                    <View
                        style={{
                            padding: 20,
                            alignItems: 'center',
                            justifyContent: 'center'
                        }}
                    >
                        <TouchableOpacity
                            style={{
                                backgroundColor: COLORS.primary,
                                width: windowWidth * 0.8,
                                borderRadius: 30,
                                alignItems: 'center'
                            }}
                            onPress={() => navigation.navigate('OrderDelivery', {
                                restaurant: item,
                                positionDevice: positionDevice,
                                address
                            })}
                        >
                            <Text style={{ fontSize: 20, color: COLORS.white, paddingVertical: 10}}> Order </Text>
                        </TouchableOpacity>

                    </View>

                </View>
            </View>
        )
    }





    return (
        <SafeAreaView style={styles.container}>
            { renderHeader() }
            { renderFoodInfo() }
            { renderOrder() }
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: COLORS.lightGray2
    }
})

export default Restaurant