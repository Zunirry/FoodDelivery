import React, { useState, useContext } from 'react'
import {
    View,
    Text,
    StyleSheet,
    SafeAreaView,
    TouchableOpacity,
    Image,
    Animated,
} from 'react-native'
import { AuthContext } from '../navigation/authProvider'
import { useTheme } from '@react-navigation/native'
import { icons, COLORS } from '../constants'
import useRestaurant from './useRestaurant'
import RenderFoodInfo from './restaurant/RenderInfo'
import renderDots from './restaurant/RenderDots'
import RenderOrder from './restaurant/RenderOrder'
import RenderHeader from './restaurant/RenderHeader'



const Restaurant = ({ route, navigation }) => {

    const { isDarkTheme } = useContext(AuthContext)
    const { colors } = useTheme()



    const { item, positionDevice, address } = route.params
    const scrollX = new Animated.Value(0)

    console.log(positionDevice, 'positionDevice');

    const [orderItems, setOrderItems] = useState([])
    const [toggleFavorites, getFavorite, favorites, restaurants] = useRestaurant(item)


    function editOrder(action, menuId, price) {

        const orderList = orderItems.slice()
        const item = orderList.filter(filter => filter.menuId == menuId)

        if (action == "+") {

            if (item.length > 0) {

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
            if (item.length > 0) {
                if (item[0]?.qty > 0) {
                    const newNum = item[0].qty - 1
                    item[0].qty = newNum
                    item[0].total = item[0].qty * price
                }
            }

            setOrderItems(orderList)
        }
    }

    function getOrderNum(menuId) {
        const orderItem = orderItems.filter(filter => filter.menuId == menuId)

        if (orderItem.length > 0) {
            return orderItem[0].qty
        }

        return 0
    }

    function getBasketItemCount() {
        const itemCount = orderItems.reduce((a, b) => a + (b.qty || 0), 0)

        return itemCount
    }

    function getSumOrder() {
        const total = orderItems.reduce((a, b) => a + (b.total || 0), 0)

        return total.toFixed(2)
    }

    function renderHeader() {
        return (
            <RenderHeader
                navigation={navigation}
                item={item}
                toggleFavorites={toggleFavorites}
                favorites={favorites}
            />
        )
    }

    function renderFoodInfo() {
        return (
            <RenderFoodInfo
                item={item}
                scrollX={scrollX}
                getOrderNum={getOrderNum}
                editOrder={editOrder}
            />
        )
    }

    function renderOrder() {
        return (
            <>
                {
                    renderDots(item, scrollX)
                }
                <RenderOrder
                    getBasketItemCount={getBasketItemCount}
                    getSumOrder={getSumOrder}
                    navigation={navigation}
                    item={item}
                    positionDevice={positionDevice}
                    address={address}
                />
            </>
        )
    }


    return (
        <SafeAreaView style={isDarkTheme ? styles.containerDark : styles.container}>
            { renderHeader()}
            { renderFoodInfo()}
            { renderOrder()}
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: COLORS.lightGray2
    },
    containerDark: {
        flex: 1,
        backgroundColor: '#111111'
    }
})

export default Restaurant