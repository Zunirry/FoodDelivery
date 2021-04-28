import React, { useEffect } from 'react'
import { createStackNavigator } from '@react-navigation/stack'
import Sign from '../screens/user/Sign'
import NewAcc from '../screens/user/NewAcc'
import { GoogleSignin } from '@react-native-community/google-signin';

const Stack = createStackNavigator();

const authStack = () => {

  useEffect(() =>{
    GoogleSignin.configure({
      // webClientId: 'Your id here',
    });
  }, [])


  return (
        <Stack.Navigator
          screenOptions={{
            headerShown: false,
          }}
        >
          <Stack.Screen name="Sign" component={Sign} />
          <Stack.Screen name="NewAcc" component={NewAcc} />

        </Stack.Navigator>
  );
}

export default authStack