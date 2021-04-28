import React, { useContext } from 'react';
import {
    View,
    Text,
    Image,
    TouchableOpacity,
    Dimensions,
} from 'react-native'
import { AuthContext } from '../../navigation/authProvider'
import { useTheme } from '@react-navigation/native'

import { COLORS, icons } from '../../constants'

const RenderOrder = ({getBasketItemCount, getSumOrder, navigation, address, positionDevice, item}) => {

    const windowWidth = Dimensions.get('window').width;
    const windowHeight = Dimensions.get('window').height;

    const { isDarkTheme } = useContext(AuthContext)
    const { colors } = useTheme()

    return (
        <View
            style={{
                backgroundColor: isDarkTheme ? '#000000' : COLORS.white,
                borderTopLeftRadius: 40,
                borderTopRightRadius: 40,
                borderColor: 'black',
                marginTop: 20
            }}
        >
            <View
                style={{
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    paddingHorizontal: 20,
                    paddingVertical: 20,
                    borderBottomColor: COLORS.lightGray2,
                    borderBottomWidth: 1
                }}
            >
                <Text style={[{ fontWeight: 'bold', fontSize: 20 }, {
                    color: colors.text
                }]}>{getBasketItemCount()} Items in cart </Text>
                <Text style={[{ fontWeight: 'bold', fontSize: 20 }, {
                    color: colors.text
                }]}> ${getSumOrder()} </Text>

            </View>

            <View
                style={{
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    paddingHorizontal: 20,
                    paddingVertical: 20,
                }}
            >
                <View
                    style={{ flexDirection: 'row' }}
                >

                    <Image
                        source={icons.pin}
                        resizeMode='contain'
                        style={{
                            height: 20,
                            width: 20,
                            tintColor: COLORS.darkgray
                        }}
                    />

                    <Text style={[{ fontWeight: 'bold', fontSize: 18 }, {
                        color: colors.text
                    }]} > Location </Text>
                </View>

                <View style={{ flexDirection: 'row', alignItems: 'center' }}>

                    <Image
                        source={icons.mastercard}
                        resizeMode='contain'
                        style={{
                            width: 20,
                            height: 20,
                            tintColor: COLORS.darkgray,
                        }}
                    />
                    <Text style={[{ fontWeight: 'bold', fontSize: 20, marginLeft: 10 }, {
                        color: colors.text
                    }]}>8888</Text>
                </View>
            </View>

            <View
                style={{
                    padding: 20,
                    alignItems: 'center',
                    justifyContent: 'center'
                }}
            >
                <TouchableOpacity
                    style={{
                        backgroundColor: COLORS.primary,
                        width: windowWidth * 0.8,
                        borderRadius: 30,
                        alignItems: 'center'
                    }}
                    onPress={() => navigation.navigate('OrderDelivery', {
                        restaurant: item,
                        positionDevice: positionDevice.position,
                        address
                    })}
                >
                    <Text style={{ fontSize: 20, color: COLORS.white, paddingVertical: 10 }}> Order </Text>
                </TouchableOpacity>

            </View>

        </View>
    );
}

export default RenderOrder;
