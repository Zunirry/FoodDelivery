import React from 'react'
import { createStackNavigator } from '@react-navigation/stack'
import { Home, OrderDelivery, Restaurant } from '../screens'
import Tabs from '../navigation/tabs'
import usePositionDevice  from '../screens/usePositionDevice'
import Loader from '../screens/LoadScreen'
import Pay from '../screens/cards/pay'



const Stack = createStackNavigator();

const appStack = () => {

  const [ address, positionDevice, readyPosition] = usePositionDevice()
  

  if(readyPosition === false){
    return <Loader />
  }
  return (
        <Stack.Navigator
          screenOptions={{
            headerShown: false,
          }}
        >
          <Stack.Screen name="Tabs" component={Tabs} />
          <Stack.Screen name="Home" component={Home} />
          <Stack.Screen name="Restaurant" component={Restaurant} />
          <Stack.Screen name="OrderDelivery" component={OrderDelivery} />
          <Stack.Screen name="Pay" component={Pay} />

        </Stack.Navigator>
  );
}

export default appStack