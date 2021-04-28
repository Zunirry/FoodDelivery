import React, {useContext} from 'react'
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  StyleSheet,
  Dimensions
} from 'react-native'
import { AuthContext } from '../../navigation/authProvider'
import EmptyCard from './components/emptyCard'
import { useTheme } from '@react-navigation/native'
import LinearGradient from 'react-native-linear-gradient'
import { icons, COLORS } from '../../constants'
import useNewCard from './hook/useNewCard'
import CardView from './cardView'

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height
const Pay = ({ navigation }) => {

  const { colors } = useTheme()
  const { isDarkTheme } = useContext(AuthContext)

  const [handleCardPayPress, removeCards, newCard ] = useNewCard(navigation)


  return (
    <View style={styles.container}>
      <View style={styles.back}>
        <TouchableOpacity
          onPress={() => navigation.goBack()}
        >
          <Image
            source={icons.back}
            tintColor={isDarkTheme ? '#ffffff' : '#333333'}
            resizeMode='contain'
            style={styles.backButton}
          />
        </TouchableOpacity>
        <Text style={isDarkTheme ? styles.titleDark : styles.title}> Payment Details </Text>

      </View>

      <View>

        {newCard !== null ?
          <>
            <View style={styles.textRow}>
              <Text style={isDarkTheme ? styles.cardDark : styles.card}>Card</Text>
              <Text style={styles.details}>Details</Text>

            </View>
            <CardView item={newCard} />
          </>
          :
          <EmptyCard />
        }

      </View>

      <View style={styles.newCard}>
        {
          newCard !== null ?
            <LinearGradient
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 0 }}
              colors={['#F74B58', '#FFAA5B']}
              style={styles.buttonDelete}

            >
              <TouchableOpacity
                onPress={() => removeCards()}
              >
                <Text style={styles.buttonText}>
                  Delete Card
                </Text>
              </TouchableOpacity>
            </LinearGradient>
            :
            <LinearGradient
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 0 }}
              colors={['#366AFF', '#43C3FF']}
              style={styles.button}

            >
              <TouchableOpacity
                style={styles.shadow}
                onPress={() => handleCardPayPress()}
              >
                <Text style={styles.buttonText}>
                  Add new card
                </Text>
              </TouchableOpacity>
            </LinearGradient>

        }


      </View>

    </View >
  )
}

export default Pay




const styles = StyleSheet.create({
  container: {
    marginHorizontal: 20,
    flex: 1,
  },
  back: {
    flexDirection: 'row',
    marginVertical: 20,
  },
  backButton: {
    width: 25,
    height: 25
  },
  title: {
    paddingLeft: windowWidth * 0.2,
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 10,
    color: '#333333'
  },
  titleDark: {
    paddingLeft: windowWidth * 0.2,
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 10,
    color: '#ffffff'
  },
  card: {
    fontSize: 30, 
    fontWeight: 'bold',
    color: 'black'
  },
  details: {
    paddingLeft: 20,
    fontSize: 30, 
    fontWeight: 'bold',
    marginBottom: 40,
    color: COLORS.darkgray
  },
  cardDark: {
    fontSize: 30, 
    fontWeight: 'bold',
    color: '#ffffff'
  },
  newCard: {
    marginTop: 100,
    alignItems: 'center',
    justifyContent: 'center'
  },
  button: {
    borderRadius: 5,
    width: windowWidth * 0.9,
    height: 40,
    alignItems: 'center',
    justifyContent: 'center',
    top: windowHeight * 0.45

  },
  buttonDelete: {
    borderRadius: 5,
    width: windowWidth * 0.9,
    height: 40,
    alignItems: 'center',
    justifyContent: 'center',
    top: windowHeight * 0.2
  },
  buttonText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: COLORS.white,
  },


})
