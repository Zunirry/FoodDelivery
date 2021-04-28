import React, { useState, useEffect } from 'react'
import Storage from '../../../libs/AsyncStorage'

const useFavorites = (navigation) => {
    const [favorites, setFavorites] = useState([])
    const [keys, setKeys] = useState()
    console.log(
        keys, 'keys'
    );

    const getFavorites = async () => {
        try {
            const allKeys = await Storage.instance.getAllKeys()
            const keys = allKeys.filter((key) => key.includes("favorite-"))
            setKeys(keys)
            const favs = await Storage.instance.multiGet(keys)


            const favorites = favs.map(fav => JSON.parse(fav[1]))


            setFavorites( favorites )

        } catch(err){
            console.log("getFavorites err", err);
        }
    }

    useEffect(() => {
        navigation.addListener('focus', getFavorites);

        return () => {
            navigation.removeListener('focus', getFavorites);
        };

    }, [])

    return [
        favorites,
    ]
}

export default useFavorites;
