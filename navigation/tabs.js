import React from 'react'
import {
    View,
    Image,
    TouchableOpacity,
} from 'react-native'
import { createBottomTabNavigator, BottomTabBar } from '@react-navigation/bottom-tabs'
import  Home  from '../screens/Home'
import  Search  from '../screens/Search'

import { icons, COLORS } from '../constants'
import Svg, { Path } from 'react-native-svg'

// para lograr el efecto primero se la barra de navegacion, despues en las propiedades de cada icono (Tab.Screen) le añadimos una funcion para pasarle las propiedades que necesitamos para darle forma
// Ahora manejamos la funcion haciendo una condicion y si esta se cumple tenemos que darle forma que queremos a la barra de navegacion, en este caso primero ponemos que el icono quede centrado
// Despues hacemos que sea tipo grid y en los espacios agregamos un borde blanco para rellenar y la parte de SVG sera para darle la forma que queremos en su atributo de d="..."

const Tab = createBottomTabNavigator()
const TabBarCustomButton = ({accessibilityState, children, onPress}) => {

    const isSelected = accessibilityState.selected
    if(isSelected){
        return (
            <View style={{ flex: 1, alignItems: 'center'}}>
                <View style={{ flexDirection: 'row', position: 'absolute', top: 0}}>
                    <View style={{ flex: 1, backgroundColor: COLORS.white }}></View>
                    <Svg
                        width={75}
                        height={60}
                        viewBox="0 0 75 61"
                    >

                        <Path
                            // This part is used to define the figure that will be around the button. In this case it is a moon
                            d="M75.2 0v61H0V0c4.1 0 7.4 3.1 7.9 7.1C10 21.7 22.5 33 37.7 33c15.2 0 27.7-11.3 29.7-25.9.5-4 3.9-7.1 7.9-7.1h-.1z"
                            // this is the color for the bar space below the circle
                            fill={COLORS.white}
                        />

                    </Svg>

                    <View style={{ flex: 1, backgroundColor: COLORS.white}}></View>
                </View>

                <TouchableOpacity
                style={{
                    top: -22.5,
                    justifyContent: 'center',
                    alignItems: 'center',
                    width: 50,
                    height: 50,
                    borderRadius: 25,
                    backgroundColor: COLORS.white
                    
                }}
                onPress={ onPress }
            >
                {children}
                
            </TouchableOpacity>

            </View>
        )
    } else {
        return (
            <TouchableOpacity
                style={{
                    flex: 1,
                    height: 60,
                    backgroundColor: COLORS.white
                }}
                activeOpacity={1}
                onPress={ onPress }
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
                component={ Home }
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
                component={ Search }
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
                component={ Home }
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
                component={ Home }
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

export default Tabs