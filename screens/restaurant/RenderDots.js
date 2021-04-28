import React from 'react';
import {
    View,
    Dimensions,
    Animated
} from 'react-native'
import { COLORS } from '../../constants'

const RenderDots = (item, scrollX) => {

    const windowWidth = Dimensions.get('window').width;

    const dotPosition = Animated.divide(scrollX, windowWidth)

    return (
        <View
            style={{
                flexDirection: 'row',
                justifyContent: 'center',
                alignItems: 'center',
                height: 10
            }}
        >
            {
                item.menu.map((item, index) => {
                    const opacity = dotPosition.interpolate({
                        inputRange: [index - 1, index, index + 1],
                        outputRange: [0.5, 1, 0.5],
                        extrapolate: "clamp"
                    })

                    const dotSize = dotPosition.interpolate({
                        inputRange: [index - 1, index, index + 1],
                        outputRange: [6.5, 10, 6.5],
                        extrapolate: "clamp"
                    })

                    const dotColor = dotPosition.interpolate({
                        inputRange: [index - 1, index, index + 1],
                        outputRange: [COLORS.darkgray, COLORS.primary, COLORS.darkgray],
                        extrapolate: "clamp"
                    })


                    return (
                        <Animated.View
                            key={index}
                            opacity={opacity}
                            style={{
                                borderRadius: 30,
                                marginHorizontal: 6,
                                width: dotSize,
                                height: dotSize,
                                backgroundColor: dotColor
                            }}
                        />
                    )
                })
            }
        </View>
    )
}

export default RenderDots;
