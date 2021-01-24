import React, { useEffect, useState } from 'react'
import { createStackNavigator } from '@react-navigation/stack'
import { NavigationContainer } from '@react-navigation/native'
import { Home, OrderDelivery, Restaurant } from './screens'
import Tabs from './navigation/tabs'
import Loader from './screens/LoadScreen'

import usePositionDevice  from './screens/usePositionDevice'



const Stack = createStackNavigator();

function App() {

  const [ address, positionDevice, readyPosition] = usePositionDevice()
  if(readyPosition === false){
    return <Loader />
  }
  return (
      <NavigationContainer>
        <Stack.Navigator
          screenOptions={{
            headerShown: false,
          }}
        >
          <Stack.Screen name="Home" component={Tabs} />
          <Stack.Screen name="Restaurant" component={Restaurant} />
          <Stack.Screen name="OrderDelivery" component={OrderDelivery} />
        </Stack.Navigator>
      </NavigationContainer>
  );
}

export default App