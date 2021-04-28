import React, { useContext } from 'react';
import {
    View,
    Text,
    TouchableOpacity,
    Dimensions,
    StyleSheet
} from 'react-native'
import { COLORS } from '../../constants'
import { useTheme } from '@react-navigation/native'
import { AuthContext } from '../../navigation/authProvider'

const RenderZoomButtons = ({zoomIn, zoomOut}) => {

    const windowWidth = Dimensions.get('window').width;
    const windowHeight = Dimensions.get('window').height;

    const { isDarkTheme } = useContext(AuthContext)
    const { colors } = useTheme()

    

    return (
        <View
            style={{
                position: 'absolute',
                bottom: windowHeight * 0.35,
                right: 20,
                width: 60,
                height: 130,
                justifyContent: 'space-between'
            }}

        >
            <TouchableOpacity
                style={{
                    width: 60,
                    height: 60,
                    borderRadius: 30,
                    backgroundColor: isDarkTheme ? '#000000' : COLORS.white,
                    alignItems: 'center',
                    justifyContent: 'center',
                    ...styles.shadow
                }}
                onPress={() => zoomIn()}
            >
                <Text style={[{ fontWeight: 'bold', fontSize: 30 }, {
                    color: colors.text
                }]}> + </Text>
            </TouchableOpacity>

            <TouchableOpacity
                style={{
                    width: 60,
                    height: 60,
                    borderRadius: 30,
                    backgroundColor: isDarkTheme ? '#000000' : COLORS.white,
                    alignItems: 'center',
                    justifyContent: 'center',
                    ...styles.shadow
                }}
                onPress={() => zoomOut()}

            >
                <Text style={[{ fontWeight: 'bold', fontSize: 30 }, {
                    color: colors.text
                }]}> - </Text>
            </TouchableOpacity>
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

export default RenderZoomButtons;
