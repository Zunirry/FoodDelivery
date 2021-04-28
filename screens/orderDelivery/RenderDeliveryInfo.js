import React, { useContext } from 'react';
import {
    View,
    Text,
    Image,
    Dimensions,
    TouchableOpacity,
    Linking,
    StyleSheet
} from 'react-native'
import { AuthContext } from '../../navigation/authProvider'
import { useTheme } from '@react-navigation/native'

import { COLORS, icons } from '../../constants'

const RenderDeliveryInfo = ({navigation, restaurant}) => {

    console.log(navigation, 'navigation');

    const windowWidth = Dimensions.get('window').width;
    const windowHeight = Dimensions.get('window').height;

    const { isDarkTheme } = useContext(AuthContext)
    const { colors } = useTheme()

    return (
        <View
            style={{
                position: 'absolute',
                bottom: 50,
                left: 0,
                right: 0,
                justifyContent: 'center',
                alignItems: 'center'
            }}
        >
            <View
                style={{
                    width: windowWidth * 0.9,
                    paddingVertical: 30,
                    paddingHorizontal: 20,
                    borderRadius: 30,
                    backgroundColor: isDarkTheme ? '#000000' : COLORS.white,
                    ...styles.shadow
                }}
            >
                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                    <Image
                        source={restaurant.courier.avatar}
                        style={{
                            width: 50,
                            height: 50,
                            borderRadius: 25
                        }}
                    />
                    <View style={{ flex: 1, marginLeft: 10 }}>
                        <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                            <Text style={[{ fontSize: 20, fontWeight: 'bold' }, {
                                color: colors.text
                            }]}> {restaurant.courier.name} </Text>
                            <View style={{ flexDirection: 'row' }}>
                                <Image
                                    source={icons.star}
                                    style={{
                                        width: 20,
                                        height: 20,
                                        tintColor: COLORS.primary
                                    }}
                                />
                                <Text style={[{ fontSize: 16 }, {
                                    color: colors.text
                                }]}> {restaurant.rating}</Text>
                            </View>
                        </View>

                        <Text style={{ fontSize: 14, color: COLORS.darkgray }}>{restaurant.name}</Text>
                    </View>
                </View>

                <View style={{ flexDirection: 'row', marginTop: 20, justifyContent: 'space-between' }}>
                    <TouchableOpacity
                        style={{
                            height: 50,
                            width: windowWidth / 2.6,
                            backgroundColor: COLORS.primary,
                            justifyContent: 'center',
                            alignItems: 'center',
                            borderRadius: 10
                        }}
                        onPress={() => Linking.openURL(`tel:3324558934`)}
                    >
                        <Text style={{ color: COLORS.white, fontSize: 18, fontWeight: 'bold' }}> Call </Text>
                    </TouchableOpacity>

                    <TouchableOpacity
                        style={{
                            height: 50,
                            width: windowWidth / 2.6,
                            backgroundColor: COLORS.secondary,
                            justifyContent: 'center',
                            alignItems: 'center',
                            borderRadius: 10
                        }}
                        onPress={() => navigation.goBack()}
                    >
                        <Text style={{ color: COLORS.white, fontSize: 18, fontWeight: 'bold' }}> Cancel </Text>
                    </TouchableOpacity>
                </View>

            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    shadow: {
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 5,
        },
        shadowOpacity: 0.36,
        shadowRadius: 6.68,

        elevation: 11,
    }
})

export default RenderDeliveryInfo;
