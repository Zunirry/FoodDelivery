import React, { useContext } from 'react';
import {
    View,
    Text,
    Image,
    TouchableOpacity,
    Animated,
    Dimensions,
    StyleSheet
} from 'react-native'
import { AuthContext } from '../../navigation/authProvider'
import { useTheme } from '@react-navigation/native'
import { COLORS, icons } from '../../constants'


const RenderInfo = ({ scrollX, item, getOrderNum, editOrder }) => {


    const windowWidth = Dimensions.get('window').width;
    const windowHeight = Dimensions.get('window').height;

    const { isDarkTheme } = useContext(AuthContext)
    const { colors } = useTheme()


    return (
        <Animated.ScrollView
            horizontal
            pagingEnabled
            scrollEventThrottle={16}
            snapToAlignment='center'
            showsHorizontalScrollIndicator={false}
            onScroll={Animated.event(
                [{
                    nativeEvent: {
                        contentOffset: {
                            x: scrollX
                        }
                    }
                }],
                { useNativeDriver: false }
            )}
        >
            {
                item.menu.map(food => (
                    <View
                        key={food.menuId}
                        style={{
                            alignItems: 'center'
                        }}
                    >
                        <View style={{ height: windowHeight * 0.35 }}>
                            <Image
                                source={food.photo}
                                resizeMode='cover'
                                style={{
                                    height: '100%',
                                    width: windowWidth
                                }}
                            />
                            <View
                                style={{
                                    position: 'absolute',
                                    flexDirection: 'row',
                                    justifyContent: 'center',
                                    width: windowWidth,
                                    height: 50,
                                    bottom: - 30
                                }}
                            >
                                <TouchableOpacity
                                    style={{
                                        backgroundColor: isDarkTheme ? '#000000' : COLORS.white,
                                        alignItems: 'center',
                                        justifyContent: 'center',
                                        width: 50,
                                        borderTopLeftRadius: 25,
                                        borderBottomLeftRadius: 25
                                    }}
                                    onPress={() => editOrder("-", food.menuId, food.price)}
                                >
                                    <Text style={[{ fontWeight: 'bold', fontSize: 30 }, {
                                        color: colors.text
                                    }]}> - </Text>
                                </TouchableOpacity>

                                <View
                                    style={{
                                        width: 50,
                                        backgroundColor: isDarkTheme ? '#000000' : COLORS.white,
                                        justifyContent: 'center',
                                        alignItems: 'center'
                                    }}
                                >
                                    <Text style={[{ fontSize: 22, fontWeight: 'bold' }, {
                                        color: colors.text
                                    }]}> {getOrderNum(food.menuId)} </Text>
                                </View>

                                <TouchableOpacity
                                    style={{
                                        backgroundColor: isDarkTheme ? '#000000' : COLORS.white,
                                        alignItems: 'center',
                                        justifyContent: 'center',
                                        width: 50,
                                        borderTopRightRadius: 25,
                                        borderBottomRightRadius: 25
                                    }}
                                    onPress={() => editOrder("+", food.menuId, food.price)}
                                >

                                    <Text style={[{ fontWeight: 'bold', fontSize: 30 }, {
                                        color: colors.text
                                    }]}> + </Text>

                                </TouchableOpacity>

                            </View>
                        </View>

                        <View
                            style={{
                                width: windowWidth,
                                alignItems: 'center',
                                marginTop: 35

                            }}
                        >
                            <Text
                                style={[{
                                    fontSize: 18,
                                    fontWeight: 'bold',
                                    marginVertical: 10,
                                    textAlign: 'center',
                                    color: '#333333'
                                }, {
                                    color: colors.text
                                }]}>
                                {food.name} - ${food.price.toFixed(2)}
                            </Text>
                            <Text style={[{ fontSize: 16, }, {
                                color: colors.text
                            }]}>
                                {food.description}
                            </Text>
                        </View>

                        <View
                            style={{
                                flexDirection: 'row',
                                marginTop: 10
                            }}
                        >
                            <Image
                                source={icons.fire}
                                style={{
                                    width: 20,
                                    height: 20,
                                    marginRight: 10
                                }}
                            />
                            <Text style={{ color: COLORS.darkgray, fontSize: 16, fontWeight: 'bold' }}> {food.calories.toFixed(2)} cal </Text>

                        </View>


                    </View>
                ))
            }
        </Animated.ScrollView>
    )
}

export default RenderInfo;
