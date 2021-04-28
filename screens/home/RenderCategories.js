import React, { useState, useContext } from 'react';
import {
    View,
    Text,
    FlatList,
    Image,
    TouchableOpacity,
    StyleSheet
} from 'react-native'
import { useTheme } from '@react-navigation/native'
import { AuthContext } from '../../navigation/authProvider'
import { COLORS } from '../../constants'


const RenderCategories = () => {

    const { colors } = useTheme()
    const { isDarkTheme, categories, onSelectCategory, selectedCatergory } = useContext(AuthContext)

    const renderItem = ({ item }) => {
        return (
            <TouchableOpacity
                style={{
                    backgroundColor: (selectedCatergory?.id == item.id) ? COLORS.primary : (isDarkTheme) ? colors.backdrop : COLORS.white,
                    ...styles.shadow,
                    ...styles.buttonsCategory
                }}
                onPress={() => onSelectCategory(item)}
            >
                {
                    isDarkTheme ?
                        <View
                            style={{
                                backgroundColor: (selectedCatergory?.id == item.id) ? colors.background : '#1F1F1F',
                                ...styles.containIcons
                            }}
                        >
                            <Image
                                source={item.icon}
                                resizeMode='contain'
                                style={styles.img}
                            />

                        </View>
                        :
                        <View
                            style={{
                                backgroundColor: (selectedCatergory?.id == item.id) ? COLORS.white : COLORS.lightGray,
                                ...styles.containIcons
                            }}
                        >
                            <Image
                                source={item.icon}
                                resizeMode='contain'
                                style={styles.img}
                            />

                        </View>
                }
                <Text
                    style={{
                        color: (selectedCatergory?.id == item.id) ? COLORS.white : COLORS.black,
                        ...styles.fonts
                    }}
                >
                    {item.name}
                </Text>
            </TouchableOpacity>
        )
    }

    return (
            <View style={styles.containerHero}>
                <Text style={[{ ...styles.hero }, {
                    color: colors.text
                }]}> Main </Text>
                <Text style={[{ ...styles.hero }, {
                    color: colors.text
                }]}> Categories </Text>

                <FlatList
                    data={categories.categoryData}
                    horizontal
                    showsHorizontalScrollIndicator={false}
                    keyExtractor={item => `${item.id}`}
                    renderItem={renderItem}
                    contentContainerStyle={{ paddingVertical: 20 }}
                />

            </View>

    );
}

const styles = StyleSheet.create({
    containIcons: {
        width: 50,
        height: 50,
        borderRadius: 25,
        alignItems: 'center',
        justifyContent: 'center',
    },
    containerHero: {
        paddingLeft: 20,
    },
    hero: {
        fontSize: 30,
        fontWeight: 'bold'
    },
    img: {
        width: 30,
        height: 30
    },
    fonts: {
        marginTop: 10,
        fontSize: 12,
    },
    buttonsCategory: {
        padding: 10,
        paddingBottom: 20,
        borderRadius: 30,
        alignItems: 'center',
        marginRight: 10,
    },
    shadow: {
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 3,
        },
        shadowOpacity: 0.1,
        textShadowRadius: 1,
        elevation: 1
    },
})

export default RenderCategories;
