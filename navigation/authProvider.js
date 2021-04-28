import React, { createContext, useState, useEffect } from 'react';
import auth from '@react-native-firebase/auth'
import { GoogleSignin } from '@react-native-community/google-signin';
import { LoginManager, AccessToken } from 'react-native-fbsdk';
import { showMessage } from 'react-native-flash-message'

import { restaurantData  } from "../restaurantData"
import { categoryData  } from "../categoryData"


export const AuthContext = createContext()


const AuthProvider = ({ children }) => {

    //Dark theme
    const [isDarkTheme, setIsDarkTheme] = useState(true)
    
    //Login
    const [user, setUser] = useState(null)

    //Screen home
    const [restaurant, setRestaurant] = useState({ restaurantData })
    const [categories, setCategories] = useState({ categoryData })
    const [selectedCatergory, setSelectedCategory] = useState(null)

    return (
        <AuthContext.Provider
            value={{
                user,
                setUser,
                isDarkTheme,
                setIsDarkTheme,
                restaurant,
                categories,
                selectedCatergory,
                onSelectCategory: (restaurant) => {
                    const restaurantList = restaurantData.filter(filter => filter.categories.includes(restaurant.id))
                    setRestaurant({ restaurantData: restaurantList })
                    setSelectedCategory(restaurant)
                },
                toggleTheme: () => {
                    setIsDarkTheme(isDarkTheme => !isDarkTheme)
                },
                login: async (email, password) => {
                    try {
                        await auth().signInWithEmailAndPassword(email, password)
                    } catch (error) {
                        showMessage({
                            message: "Your email or password is wrong",
                            type: "danger",
                        })
                        console.error(error);
                    }
                },
                googleLogin: async () => {
                    try {
                        // Get the users ID token
                        const { idToken } = await GoogleSignin.signIn();

                        // Create a Google credential with the token
                        const googleCredential = auth.GoogleAuthProvider.credential(idToken);

                        // Sign-in the user with the credential
                        await auth().signInWithCredential(googleCredential);
                    } catch (error) {
                        console.log(error);
                    }
                },
                fbLogin: async () => {
                    try {
                        // Attempt login with permissions
                        const result = await LoginManager.logInWithPermissions(['public_profile', 'email']);

                        if (result.isCancelled) {
                            throw 'User cancelled the login process';
                        }

                        // Once signed in, get the users AccesToken
                        const data = await AccessToken.getCurrentAccessToken();

                        if (!data) {
                            throw 'Something went wrong obtaining access token';
                        }

                        // Create a Firebase credential with the AccessToken
                        const facebookCredential = auth.FacebookAuthProvider.credential(data.accessToken);

                        // Sign-in the user with the credential
                        await auth().signInWithCredential(facebookCredential);
                    } catch (error) {
                        console.log(error);
                    }
                },
                register: async (email, password) => {
                    try {
                        await auth().createUserWithEmailAndPassword(email, password)
                    } catch (error) {
                        showMessage({
                            message: "You email is already in use",
                            type: "danger",
                        })
                        console.log(error);
                    }
                },
                logout: async () => {
                    try {
                        await auth().signOut()
                    } catch (error) {
                        console.log(error);
                    }
                },
            }}
        >
            {children}

        </AuthContext.Provider>
    );
}

export default AuthProvider;
