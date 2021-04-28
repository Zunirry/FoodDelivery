import images from './constants/images'

export const restaurantData = [
    {
        id: 1,
        name: "Zunirry's Burger",
        rating: 4.8,
        categories: [5, 7],
        priceRating: 1,
        photo: images.burger_restaurant,
        duration: "30 - 45 min",
        location: {
            latitude: 20.67576058884362,
            longitude: -103.30162465978063,
        },
        courier: {
            avatar: images.avatar_1,
            name: "Amy"
        },
        menu: [
            {
                menuId: 1,
                name: "Crispy Chicken Burger",
                photo: images.crispy_chicken_burger,
                description: "Burger with crispy chicken, cheese and lettuce",
                calories: 200,
                price: 10
            },
            {
                menuId: 2,
                name: "Crispy Chicken Burger with Honey Mustard",
                photo: images.honey_mustard_chicken_burger,
                description: "Crispy Chicken Burger with Honey Mustard Coleslaw",
                calories: 250,
                price: 15
            },
            {
                menuId: 3,
                name: "Crispy Baked French Fries",
                photo: images.baked_fries,
                description: "Crispy Baked French Fries",
                calories: 194,
                price: 8
            }
        ]
    },
    {
        id: 2,
        name: "Zunirry's Pizza",
        rating: 4.8,
        categories: [2, 4, 6],
        priceRating: 3,
        photo: images.pizza_restaurant,
        duration: "15 - 20 min",
        location: {
            latitude: 20.702438373474504,
            longitude: -103.29206624398283, 
        },
        courier: {
            avatar: images.avatar_2,
            name: "Jackson"
        },
        menu: [
            {
                menuId: 4,
                name: "Hawaiian Pizza",
                photo: images.hawaiian_pizza,
                description: "Canadian bacon, homemade pizza crust, pizza sauce",
                calories: 250,
                price: 15
            },
            {
                menuId: 5,
                name: "Tomato & Basil Pizza",
                photo: images.pizza,
                description: "Fresh tomatoes, aromatic basil pesto and melted bocconcini",
                calories: 250,
                price: 20
            },
            {
                menuId: 6,
                name: "Tomato Pasta",
                photo: images.tomato_pasta,
                description: "Pasta with fresh tomatoes",
                calories: 100,
                price: 10
            },
            {
                menuId: 7,
                name: "Mediterranean Chopped Salad ",
                photo: images.salad,
                description: "Finely chopped lettuce, tomatoes, cucumbers",
                calories: 100,
                price: 10
            }
        ]
    },
    {
        id: 3,
        name: "Zunirry's Hotdogs",
        rating: 4.8,
        categories: [3],
        priceRating: 3,
        photo: images.hot_dog_restaurant,
        duration: "20 - 25 min",
        location: {
            latitude: 20.67425099986473,
            longitude: -103.42680020543197,
        },
        courier: {
            avatar: images.avatar_3,
            name: "James"
        },
        menu: [
            {
                menuId: 8,
                name: "Chicago Style Hot Dog",
                photo: images.chicago_hot_dog,
                description: "Fresh tomatoes, all beef hot dogs",
                calories: 100,
                price: 20
            }
        ]
    },
    {
        id: 4,
        name: "Zunirry's Sushi",
        rating: 4.8,
        categories: [8],
        priceRating: 3,
        photo: images.japanese_restaurant,
        duration: "10 - 15 min",
        location: {
            latitude: 20.714739028320583,
            longitude: -103.31912819271254,
        },
        courier: {
            avatar: images.avatar_4,
            name: "Ahmad"
        },
        menu: [
            {
                menuId: 9,
                name: "Sushi sets",
                photo: images.sushi,
                description: "Fresh salmon, sushi rice, fresh juicy avocado",
                calories: 100,
                price: 50
            }
        ]
    },
    {
        id: 5,
        name: "Zunirry's Cuisine",
        rating: 4.8,
        categories: [1, 2],
        priceRating: 1,
        photo: images.noodle_shop,
        duration: "15 - 20 min",
        location: {
            latitude: 20.699546398465586,
            longitude: -103.27794238002474,
        },
        courier: {
            avatar: images.avatar_4,
            name: "Muthu"
        },
        menu: [
            {
                menuId: 10,
                name: "Kolo Mee",
                photo: images.kolo_mee,
                description: "Noodles with char siu",
                calories: 200,
                price: 5
            },
            {
                menuId: 11,
                name: "Sarawak Laksa",
                photo: images.sarawak_laksa,
                description: "Vermicelli noodles, cooked prawns",
                calories: 300,
                price: 8
            },
            {
                menuId: 12,
                name: "Nasi Lemak",
                photo: images.nasi_lemak,
                description: "A traditional Malay rice dish",
                calories: 300,
                price: 8
            },
            {
                menuId: 13,
                name: "Nasi Briyani with Mutton",
                photo: images.nasi_briyani_mutton,
                description: "A traditional Indian rice dish with mutton",
                calories: 300,
                price: 8
            },

        ]
    },
    {

        id: 6,
        name: "Zunirry's Dessets",
        rating: 4.9,
        categories: [9, 10],
        priceRating: 1,
        photo: images.kek_lapis_shop,
        duration: "35 - 40 min",
        location: {
            latitude: 20.64103356267314,
            longitude: -103.31080862005133,
        },
        courier: {
            avatar: images.avatar_1,
            name: "Jessie"
        },
        menu: [
            {
                menuId: 12,
                name: "Teh C Peng",
                photo: images.teh_c_peng,
                description: "Three Layer Teh C Peng",
                calories: 100,
                price: 2
            },
            {
                menuId: 13,
                name: "ABC Ice Kacang",
                photo: images.ice_kacang,
                description: "Shaved Ice with red beans",
                calories: 100,
                price: 3
            },
            {
                menuId: 14,
                name: "Kek Lapis",
                photo: images.kek_lapis,
                description: "Layer cakes",
                calories: 300,
                price: 20
            }
        ]

    }


]

export default {
    restaurantData
}