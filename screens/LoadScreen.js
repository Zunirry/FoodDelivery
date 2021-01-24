import React from 'react'
import {
    View,
    Text,
    Image,
    Dimensions,
    ActivityIndicator
} from 'react-native'
import { COLORS, icons } from '../constants'

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

function LoadScreen() {
    return (
        <View style={{
            flex: 1, justifyContent: 'center',
            alignItems: 'center',
            backgroundColor: COLORS.lightGray5
        }}
        >
            <View
                style={{
                    justifyContent: 'center',
                    alignItems: 'center'
                }}
            >
                <Image
                    source={icons.delivery}
                    style={{
                        width: 80,
                        height: 80
                    }}
                />

                <Text
                    style={{
                        fontSize: 30,
                        fontWeight: 'bold',
                        fontStyle: 'italic',
                        color: COLORS.white
                    }}
                >
                    Food Delivery
                    </Text>

                    <ActivityIndicator size="large" color={COLORS.primary}
                        style={{
                            marginTop: 10
                        }}
                    />
            </View>

        </View>


    )
}

export default LoadScreen