import React, { useEffect, useState } from 'react'
import { Alert } from 'react-native'
import Storage from '../../../libs/AsyncStorage'
import stripe from 'tipsi-stripe'
import { showMessage } from 'react-native-flash-message'

stripe.setOptions({
    publishableKey: 'pk_test_51INQWZATpJ4FgQVa4RC5YHeBPmAieT9KsHNyzfETs8Eah044BTHZcC6aEkzWKCmjhmVMJ0gbtjfcNPUbVd3e9OQQ00LMzZsAWC'
})


const useNewCard = (navigation) => {



    const [state, setState] = useState({
        loading: false,
        paymentMethod: null,
        cards: false
    })

    const [newCard, setNewCard] = useState(null)

    const handleCardPayPress = async () => {
        try {
            setState({ loading: true, paymentMethod: null, cards: false })
            const paymentMethod = await stripe.paymentRequestWithCardForm()

            setState({ loading: false, paymentMethod, cards: true })

            const card = JSON.stringify(paymentMethod)
            const key = `card-@card:key`

            const stored = await Storage.instance.store(key, card)
            navigation.goBack()
            showMessage({
                message: "You card are saved.",
                type: "success",
            })

        } catch (error) {
            console.log(error, 'ERROR');
            setState({ loading: false })
        }

        
    }


    const removeCards = async () => {
        Alert.alert("Remove Card", "Are you sure?", [
            {
                text: "cancel",
                onPress: () => { },
                style: "cancel"
            },
            {
                text: "Remove",
                onPress: async () => {
                    const key = `card-@card:key`

                    await Storage.instance.remove(key)
                    setState({ cards: false })
                    navigation.goBack()
                    showMessage({
                        message: "You card was deleted.",
                        type: "info",
                    })

                },
                style: "destructive"
            }
        ])
    }


    const getCard = async () => {
        try {
            const key = `card-@card:key`
            const favStr = await Storage.instance.get(key);
            if (favStr) {
                setNewCard(JSON.parse(favStr))
            }

        } catch (err) {
            console.log("get favorites err", err);

            setFavorites(false)
        }
    }


    useEffect(() => {
        getCard()
    }, [])


    return [
        handleCardPayPress,
        removeCards,
        newCard,
        getCard
    ]

}

export default useNewCard

