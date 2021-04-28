import React, { useContext } from 'react';
import {
    View,
    Text,
    Image,
    StyleSheet,
    Dimensions,
    TouchableOpacity,
} from 'react-native';
import { 
    List, 
    Switch, 
    useTheme as usePaperTheme
} from 'react-native-paper';
import { useTheme } from '@react-navigation/native'
import img from '../../constants/images'
import { COLORS } from '../../constants'
import { AuthContext } from '../../navigation/authProvider';


const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;


const User = ({navigation}) => {
    const { user, logout, toggleTheme } = useContext(AuthContext)
    const { colors } = useTheme()

    const paperTheme = usePaperTheme()


    return (
        <View style={styles.container}>
            <View style={styles.containUser}>
                <View style={styles.photo}>
                    <Image
                        source={img.avatar_1}
                        resizeMode='contain'
                        style={styles.imgUser}
                    />
                </View>
                <Text 
                    style={[styles.userText, {
                        color: colors.text
                    }]}> 
                    Hello {user.displayName ? user.displayName : 'Friend'}!
                </Text>
            </View>
            <View>
            <List.Item
                title="Dark Mode"
                left={() => {}}
                right={() => <Switch value={paperTheme.dark} onValueChange={() => toggleTheme()} />}
                />
            </View>

            <View 
                style={[{...styles.options}, {
                    backgroundColor: colors.background,
            }]}>
                <TouchableOpacity
                    style={{... styles.addPay, ...styles.shadow}}
                    onPress={() => navigation.navigate('Pay')}
                >
                    <Text style={styles.optionText}> Add Credit Card</Text>
                </TouchableOpacity>
                <TouchableOpacity 
                    style={{...styles.signOut, ...styles.shadow}}
                    onPress={() => logout()}
                >
                    <Text style={styles.optionText}> Log Out</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        marginHorizontal: 20,
    },
    shadow: {
        shadowColor: "#000",
        shadowOffset: {
            width: 1,
            height: 1,
        },
        shadowOpacity: 0.22,
        shadowRadius: 2.22,

        elevation: 3,
    },
    containUser: {
        justifyContent: 'center',
        alignItems: 'center',
    },
    photo: {
        marginVertical: 20,
        borderWidth: 5,
        borderColor: COLORS.white,
        borderRadius: 45,
        height: 90,
        width: 90,
        alignItems: 'center',
        justifyContent: 'center',
    },
    imgUser: {
        height: 50,
        width: 50,
    },
    userText: {
        fontWeight: 'bold',
        fontSize: 22
    },
    signOut: {
        backgroundColor: '#dc3545',
        borderRadius: 10,
        width: windowWidth * 0.3,
        height: windowHeight / 15,
        alignItems: 'center',
        justifyContent: 'center'
    },
    addPay: {
        backgroundColor: '#198754',
        borderRadius: 10,
        width: windowWidth * 0.3,
        height: windowHeight / 15,
    },
    options: {
        paddingVertical: 20,
        top: windowHeight * 0.25,
        height: windowHeight * 0.25,
        backgroundColor: COLORS.white,
        borderRadius: 20,
        paddingHorizontal: 30,
        justifyContent: 'space-between',
        alignItems: 'center'
    },
    optionText: {
        fontSize: 16,
        paddingBottom: 20,
        color: COLORS.white,
        fontWeight: 'bold',
        textAlign: 'center'
    },
    shadowLight: {
        shadowColor: "#3C3939",
        shadowOffset: {
            width: 0,
            height: 5,
        },
        shadowOpacity: 0.36,
        shadowRadius: 6.68,

        elevation: 11,
    }
})

export default User;
