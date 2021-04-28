import React from 'react';
import {
    View,
    Text,
    TouchableOpacity,
    StyleSheet
} from 'react-native'


const emptyCard = () => {
    return (
        <View style={styles.container}>
            <Text style={styles.text}> You don't have any cards yet </Text>
        </View>
        
    );
}

const styles = StyleSheet.create({
    container: {
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: 50,
    },
    text: {
        color: '#ccc',
        fontWeight: 'bold',
        fontSize: 18,
        alignSelf: 'center'
    }
})

export default emptyCard;
