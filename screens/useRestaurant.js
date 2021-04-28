import React, { useState, useEffect} from 'react'
import Storage from '../libs/AsyncStorage'
import { Alert } from 'react-native'


const useRestaurant = (item) => {

    const [restaurants, setRestaurants] = useState(item)
    const [favorites, setFavorites] = useState(false)

    const toggleFavorites = () => {
        if(favorites == true){
            removeFavorites()
        } else {
            addFavorites()
        }
    }

    const addFavorites = async() => {
        const rest = JSON.stringify(restaurants)
        const key = `favorite-${restaurants.id}`
        const stored = await Storage.instance.store(key, rest)

        if(stored){
            setFavorites(true)
        }
    }

    const removeFavorites = async() => {
        Alert.alert("Remove favorite", "Are you sure?", [
            {
                text: "cancel",
                onPress: () => { },
                style: "cancel"
            },
            {
                text: "Remove",
                onPress: async () => {
                    const key = `favorite-${restaurants.id}`

                    await Storage.instance.remove(key)
                    setFavorites(false)
                },
                style: "destructive"
            }
        ])
    }

    
    const getFavorite = async () => {

        setFavorites(true)

        try {
            const key = `favorite-${restaurants.id}`

            const favStr = await Storage.instance.get(key);

            if (favStr !== null) {
                setFavorites(true)
            } else {
                setFavorites(false)
            }

        } catch (err) {
            console.log("get favorites err", err);

            setFavorites(false)
        }
    }

    useEffect(() => {
        getFavorite()
    }, []);


    return [
        toggleFavorites,
        getFavorite,
        favorites,
        restaurants
    ]
}

export default useRestaurant;
