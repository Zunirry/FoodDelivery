import React, { useState, useContext } from 'react';
import {
    View,
    Text,
    StyleSheet,
    TextInput,
    TouchableOpacity,
    Image,
    Dimensions
} from 'react-native';
import { useTheme } from '@react-navigation/native'

import { COLORS, icons } from "../../constants";
import { AuthContext } from '../../navigation/authProvider';

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

const Sign = ({ navigation }) => {
    const { colors } = useTheme()
    const { isDarkTheme } = useContext(AuthContext)

    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    const { login, googleLogin, fbLogin } = useContext(AuthContext)


    return (
        <View style={styles.container}>


            <View style={styles.logo}>
                <Image
                    source={icons.delivery}
                    resizeMode='contain'
                    style={styles.logoImg}
                />
            </View>

            <View style={styles.mainContain}>
                <View style={isDarkTheme ? styles.boxDark : styles.box}>
                    <Text style={isDarkTheme ? styles.signTextDark : styles.signText}>Sign In</Text>
                    <TextInput
                        placeholder='Enter your email.'
                        placeholderTextColor={isDarkTheme ? '#cccccc' : '#333333'}
                        color={isDarkTheme ? '#cccccc' : '#333333'}
                        style={styles.input}
                        keyboardType='email-address'
                        onChangeText={(userEmail) => setEmail(userEmail)}
                    />

                    <TextInput
                        placeholder='Enter your password.'
                        placeholderTextColor={isDarkTheme ? '#cccccc' : '#333333'}
                        color={isDarkTheme ? '#cccccc' : '#333333'}
                        style={styles.input}
                        secureTextEntry={true}
                        onChangeText={(userPassword) => setPassword(userPassword)}
                    />

                    <TouchableOpacity
                        style={styles.button}
                        onPress={() => login(email, password)}
                    >
                        <Text style={styles.textButton}> Go!</Text>
                    </TouchableOpacity>

                    <Text style={{ marginVertical: 10, color: COLORS.darkgray }}> ──── Or sign in with ──── </Text>

                    <View style={styles.optsButtons}>

                        <TouchableOpacity
                            style={styles.faceButon}
                            onPress={() => fbLogin()}
                        >
                            <Image
                                source={icons.facebook}
                                resizeMode='contain'
                                style={styles.facebookGoogle}
                            />
                            <Text style={styles.textButton}> FaceBook </Text>
                        </TouchableOpacity>

                        <TouchableOpacity
                            style={styles.googleButon}
                            onPress={() => googleLogin()}
                        >
                            <Image
                                source={icons.google}
                                resizeMode='contain'
                                style={styles.facebookGoogle}
                            />
                            <Text style={styles.textButton}> Google </Text>
                        </TouchableOpacity>

                    </View>


                    <View style={styles.newAcc}>
                        <Text style={[{ fontSize: 12 }, {
                            color: colors.text
                        }]}> You dont have account?</Text>
                        <TouchableOpacity
                            onPress={() => navigation.navigate('NewAcc')}
                        >
                            <Text style={styles.textNewAcc}> New account</Text>
                        </TouchableOpacity>
                    </View>


                </View>

            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    logo: {
        top: windowHeight * 0.15,
        height: windowHeight * 0.01,
        alignItems: 'center'
    },
    logoImg: {
        width: 100,
        height: 100
    },
    mainContain: {
        marginTop: windowHeight * 0.4,
        alignItems: 'center',
        borderRadius: 25,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 4,
        },
        shadowOpacity: 0.32,
        shadowRadius: 5.46,

        elevation: 9,
    },
    box: {
        backgroundColor: COLORS.white,
        borderRadius: 25,
        height: windowHeight,
        width: '100%',
        alignItems: 'center',
    },
    boxDark: {
        backgroundColor: '#000000',
        borderRadius: 25,
        height: windowHeight,
        width: '100%',
        alignItems: 'center',
    },
    signText: {
        marginTop: 20,
        fontSize: 18,
        fontWeight: 'bold',
        color: '#333333'
    },
    signTextDark: {
        marginTop: 20,
        fontSize: 18,
        fontWeight: 'bold',
        color: '#ffffff'
    },
    input: {
        borderBottomWidth: 1,
        borderBottomColor: COLORS.lightGray5,
        marginBottom: 10,
    },
    newAcc: {
        marginTop: 30,
        flexDirection: 'row'
    },
    textNewAcc: {
        color: COLORS.primary,
        fontSize: 13
    },
    button: {
        height: 45,
        width: windowWidth * 0.8,
        backgroundColor: '#198754',
        borderRadius: 50,
        justifyContent: 'center',
        alignItems: 'center',
        marginVertical: 10

    },
    optsButtons: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        width: windowWidth * 0.8
    },
    facebookGoogle: {
        height: 20,
        width: 20,
        tintColor: COLORS.white,
        left: -10
    },
    faceButon: {
        flexDirection: 'row',
        height: 45,
        width: windowWidth * 0.38,
        borderRadius: 10,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#B6BDE5'
    },
    googleButon: {
        flexDirection: 'row',
        height: 45,
        width: windowWidth * 0.38,
        borderRadius: 10,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#D191A2'
    },
    textButton: {
        color: COLORS.white,
        fontWeight: 'bold',
    },
    back: {
        width: 30,
        height: 30
    }

})

export default Sign;
