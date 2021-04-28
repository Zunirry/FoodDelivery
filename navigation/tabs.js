import React, { useContext } from 'react'
import {
    View,
    Image,
    TouchableOpacity,
    StyleSheet
} from 'react-native'
import { createBottomTabNavigator, BottomTabBar } from '@react-navigation/bottom-tabs'
import { useTheme } from '@react-navigation/native'
import { AuthContext } from '../navigation/authProvider'
import Home from '../screens/Home'
import Search from '../screens/Search'
import Favorites from '../screens/favorites/Favorites'
import User from '../screens/user/User'

import { icons, COLORS } from '../constants'
import Svg, { Path } from 'react-native-svg'


const Tab = createBottomTabNavigator()

const TabBarCustomButton = ({ accessibilityState, children, onPress }) => {

    const { isDarkTheme } = useContext(AuthContext)
    const { colors } = useTheme()


    const isSelected = accessibilityState.selected
    if (isSelected) {
        return (
            <View style={styles.container}>
                <View style={{ flexDirection: 'row', position: 'absolute', top: 0 }}>
                    <View style={isDarkTheme ? styles.columnLeftDark : styles.columnLeft}></View>
                    <Svg
                        width={75}
                        height={60}
                        viewBox="0 0 75 61"
                    >

                        <Path
                            // This part is used to define the figure that will be around the button. In this case it is a moon
                            d="M75.2 0v61H0V0c4.1 0 7.4 3.1 7.9 7.1C10 21.7 22.5 33 37.7 33c15.2 0 27.7-11.3 29.7-25.9.5-4 3.9-7.1 7.9-7.1h-.1z"
                            // this is the color for the bar space below the circle
                            fill={isDarkTheme ? colors.backdrop : COLORS.white}
                        />

                    </Svg>

                    <View style={isDarkTheme ? styles.columnRightDark : styles.columnRight}></View>
                </View>

                <TouchableOpacity
                    style={isDarkTheme ? styles.flyDotDark : styles.flyDot}
                    onPress={onPress}
                >
                    {children}

                </TouchableOpacity>

            </View>
        )
    } else {
        return (
            <TouchableOpacity
                style={isDarkTheme ? styles.bottomBarDark : styles.bottomBar}
                activeOpacity={1}
                onPress={onPress}
            >
                {children}

            </TouchableOpacity>
        )
    }
}

const Tabs = () => {
    return (
        <Tab.Navigator
            tabBarOptions={{
                showLabel: false,
                style: {
                    borderTopWidth: 0,
                    backgroundColor: 'transparent',
                    elevation: 0
                }
            }}
        >
            <Tab.Screen
                name="Home"
                component={Home}
                options={{
                    tabBarIcon: ({ focused }) => (
                        <Image
                            source={icons.cutlery}
                            resizeMode="contain"
                            style={{
                                width: 25,
                                height: 25,
                                tintColor: focused ? COLORS.primary : COLORS.secondary
                            }}
                        />
                    ),
                    tabBarButton: (props) => (
                        <TabBarCustomButton
                            {...props}
                        />
                    )
                }}
            >
            </Tab.Screen>

            <Tab.Screen
                name="Search"
                component={Search}
                options={{
                    tabBarIcon: ({ focused }) => (
                        <Image
                            source={icons.loupe}
                            resizeMode="contain"
                            style={{
                                width: 25,
                                height: 25,
                                tintColor: focused ? COLORS.primary : COLORS.secondary
                            }}
                        />
                    ),
                    tabBarButton: (props) => (
                        <TabBarCustomButton
                            {...props}
                        />
                    )
                }}
            >
            </Tab.Screen>

            <Tab.Screen
                name="Like"
                component={Favorites}
                options={{
                    tabBarIcon: ({ focused }) => (
                        <Image
                            source={icons.like}
                            resizeMode="contain"
                            style={{
                                width: 25,
                                height: 25,
                                tintColor: focused ? COLORS.primary : COLORS.secondary
                            }}
                        />
                    ),
                    tabBarButton: (props) => (
                        <TabBarCustomButton
                            {...props}
                        />
                    )
                }}
            >
            </Tab.Screen>

            <Tab.Screen
                name="User"
                component={User}
                options={{
                    tabBarIcon: ({ focused }) => (
                        <Image
                            source={icons.user}
                            resizeMode="contain"
                            style={{
                                width: 25,
                                height: 25,
                                tintColor: focused ? COLORS.primary : COLORS.secondary
                            }}
                        />
                    ),
                    tabBarButton: (props) => (
                        <TabBarCustomButton
                            {...props}
                        />
                    )
                }}
            >
            </Tab.Screen>

        </Tab.Navigator>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center'
    },
    columnLeft: {
        flex: 1,
        backgroundColor: COLORS.white
    },
    columnLeftDark: {
        flex: 1,
        backgroundColor: '#000000'
    },
    columnRight: {
        flex: 1,
        backgroundColor: COLORS.white
    },
    columnRightDark: {
        flex: 1,
        backgroundColor: '#000000'
    },
    flyDot: {
        top: -22.5,
        justifyContent: 'center',
        alignItems: 'center',
        width: 50,
        height: 50,
        borderRadius: 25,
        backgroundColor: COLORS.white
    },
    flyDotDark: {
        top: -22.5,
        justifyContent: 'center',
        alignItems: 'center',
        width: 50,
        height: 50,
        borderRadius: 25,
        backgroundColor: '#000000'
    },
    bottomBar: {
        flex: 1,
        height: 60,
        backgroundColor: COLORS.white
    },
    bottomBarDark: {
        flex: 1,
        height: 60,
        backgroundColor: '#000000'
    }
})

export default Tabs