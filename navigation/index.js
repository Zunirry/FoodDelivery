import React from 'react'
import AuthProvider from './authProvider'
import Routes from './routes'
import FlashMessage from "react-native-flash-message";

const Providers = () => {
 

  return (
      <AuthProvider>
        <Routes/>
        <FlashMessage position="top" />
      </AuthProvider>
  );
}

export default Providers