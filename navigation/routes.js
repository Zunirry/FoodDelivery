import React, { useEffect, useState, useContext } from 'react'
import { createStackNavigator } from '@react-navigation/stack'
import {
  DefaultTheme as NavigationDefaultTheme,
  DarkTheme as NavigationDarkTheme,
  NavigationContainer
} from '@react-navigation/native'
import {
  Provider as PaperProvider,
  DefaultTheme as PaperDefaultTheme,
  DarkTheme as PaperDarkTheme
} from 'react-native-paper'
import { AuthContext } from './authProvider'
import auth from '@react-native-firebase/auth';
import AppStack from './appStack'
import AuthStack from './authStack'


const Stack = createStackNavigator();


const Providers = () => {
  const { isDarkTheme } = useContext(AuthContext)

  const CustomDefaultTheme = {
    ...NavigationDefaultTheme,
    ...PaperDefaultTheme,
    colors: {
      ...NavigationDefaultTheme.colors,
      ...PaperDefaultTheme.colors,
      background: '#F8F8F9',
      backdrop: '#000000',
      text: '#333333'
    }
  }

  const CustomDarkTheme = {
    ...NavigationDarkTheme,
    ...PaperDarkTheme,
    colors: {
      ...NavigationDarkTheme.colors,
      ...PaperDarkTheme.colors,
      background: '#111111',
      backdrop: '#000000',
      text: '#ffffff'
    }
  }

  const theme = isDarkTheme ? CustomDarkTheme : CustomDefaultTheme


  const { user, setUser } = useContext(AuthContext)
  const [initializing, setInitializing] = useState(true);

  function onAuthStateChanged(user) {
    setUser(user);
    if (initializing) setInitializing(false);
  }

  useEffect(() => {
    const subscriber = auth().onAuthStateChanged(onAuthStateChanged);
    return subscriber; // unsubscribe on unmount
  }, []);

  if (initializing) return null;



  return (
    <PaperProvider theme={theme}>
      <NavigationContainer theme={theme}>
        {user ? <AppStack /> : <AuthStack />}
      </NavigationContainer>
    </PaperProvider>
  );
}

export default Providers