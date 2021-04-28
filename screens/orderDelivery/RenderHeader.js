import React, { useContext } from 'react';
import {
    View,
    Image,
    Text,
    Dimensions,
    StyleSheet
} from 'react-native'
import { AuthContext } from '../../navigation/authProvider'
import { COLORS, icons } from '../../constants'
import { useTheme } from '@react-navigation/native'

const RenderHeader = ({duration, address}) => {

    const windowWidth = Dimensions.get('window').width;
    const windowHeight = Dimensions.get('window').height;

    const { isDarkTheme } = useContext(AuthContext)
    const { colors } = useTheme()
    

    return (


        
        <View style={styles.container}>
            <View
                style={{
                    flexDirection: 'row',
                    alignItems: 'center',
                    width: windowWidth * 0.9,
                    paddingVertical: 10,
                    paddingHorizontal: 20,
                    borderRadius: 30,
                    backgroundColor: isDarkTheme ? '#000000' : COLORS.white,
                    ...styles.shadow
                }}
            >
                <Image
                    source={icons.red_pin}
                    style={{
                        width: 30,
                        height: 30,
                        paddingRight: 10
                    }}
                />

                <View style={{ flex: 1 }}>
                    <Text style={[{ fontSize: 18, fontWeight: 'bold' }, {
                        color: colors.text
                    }]}> 
                        {address}
                    </Text>
                </View>
                <Text style={{ fontSize: 25, color: COLORS.lightGray5, paddingRight: 10 }}> | </Text>
                <Text style={[{ fontSize: 16, fontWeight: 'bold' }, {
                    color: colors.text
                }]}>
                    {Math.ceil(duration)} 
                    mins
                </Text>
            </View>
        </View>

    );
}

const styles = StyleSheet.create({
    container: {
        position: 'absolute',
        top: 40,
        left: 0,
        right: 0,
        height: 50,
        alignItems: 'center',
        justifyContent: 'center',
    },

})

export default RenderHeader;
