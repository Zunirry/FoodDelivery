import React, { useContext } from 'react';
import {
    View,
    Text,
    StyleSheet
} from 'react-native'
import { useTheme } from '@react-navigation/native'
import { AuthContext } from '../../navigation/authProvider'
import usePositionDevice from '../usePositionDevice'
import { COLORS } from '../../constants'

const RenderHeader = () => {

    const { colors } = useTheme()
    const { isDarkTheme } = useContext(AuthContext)

    const [address] = usePositionDevice()
    
    return (
        <View style={styles.containerHome}>
            <View style={styles.containerAddress}>
                <View style={isDarkTheme ? styles.addressDark : styles.address}>
                    <Text style={[{ fontSize: 14 }, {
                        color: colors.text
                    }]}> {address} </Text>
                </View>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    containerHome: {
        flexDirection: 'row',
        height: 50
    },
    containerAddress: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    address: {
        backgroundColor: COLORS.lightGray3,
        width: '70%',
        height: '100%',
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 30,
        paddingHorizontal: 10
    },
    addressDark: {
        backgroundColor: '#1F1F1F',
        width: '70%',
        height: '100%',
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 30,
        paddingHorizontal: 10
    },
})

export default RenderHeader;
