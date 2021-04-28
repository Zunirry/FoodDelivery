import React, {useContext} from 'react';
import {
    View,
    Image,
    TouchableOpacity,
    Text,
} from 'react-native'
import { COLORS, icons } from '../../constants'
import { useTheme } from '@react-navigation/native'
import { AuthContext } from '../../navigation/authProvider'


const RenderHeader = ({navigation, item, toggleFavorites, favorites}) => {

    console.log(navigation, 'navigation');
    console.log(item, 'item');

    const { isDarkTheme } = useContext(AuthContext)
    const { colors } = useTheme()

    return (
        <View
            style={{ flexDirection: 'row' }}
        >
            <TouchableOpacity
                style={{
                    width: 50,
                    paddingLeft: 20,
                    justifyContent: 'center',
                    paddingTop: 10
                }}
                onPress={() => navigation.goBack()}
            >

                <Image
                    source={icons.back}
                    resizeMode='contain'
                    tintColor={isDarkTheme ? '#ffffff' : '#333333'}
                    style={{
                        width: 50,
                        height: 30,
                    }}
                />
            </TouchableOpacity>

            <View
                style={{
                    flex: 1,
                    justifyContent: 'center',
                    alignItems: 'center'
                }}
            >
                <View
                    style={{
                        height: 50,
                        justifyContent: 'center',
                        alignItems: 'center',
                        paddingLeft: 20,
                        paddingRight: 20,
                        borderRadius: 30,
                        backgroundColor: isDarkTheme ? '#1F1F1F' : COLORS.lightGray3
                    }}
                >
                    <Text
                        style={[{ fontSize: 20 }, {
                            color: colors.text
                        }]}
                    >
                        {item.name}
                    </Text>
                </View>
            </View>

            <TouchableOpacity
                style={{
                    paddingRight: 20,
                    paddingTop: 10,
                    justifyContent: 'center',
                }}
                onPress={toggleFavorites}
            >
                <Image
                    source={icons.like}
                    resizeMode='contain'
                    style={{
                        height: 30,
                        width: 50,
                        tintColor: (favorites == true) ? COLORS.primary : COLORS.secondary
                    }}
                />

            </TouchableOpacity>

        </View>
    )
}

export default RenderHeader;
