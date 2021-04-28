import React, { useState, useRef } from 'react'
import {
    View,
    Image,
    Dimensions,
    StyleSheet
} from 'react-native'
import MapView from 'react-native-maps'
import MapViewDirections from 'react-native-maps-directions'
import { Marker } from 'react-native-maps';
import { COLORS, icons } from '../constants'
import GOOGLE_MAPS_APIKEY from './maps'
import RenderDestinationHeader from './orderDelivery/RenderHeader'
import RenderDeliveryInfo from './orderDelivery/RenderDeliveryInfo'
import RenderZoomButtons from './orderDelivery/RenderZoomButtons'

const OrderDelivery = ({ route, navigation }) => {


    const mapView = useRef()

    const windowWidth = Dimensions.get('window').width;
    const windowHeight = Dimensions.get('window').height;


    const { restaurant, address } = route.params
    const { positionDevice } = route.params

    const [positionRestaurant, setPositionRestaurant] = useState(restaurant)
    const [duration, setDuration] = useState(0)
    const [isReady, setIsReady] = useState(false)
    const [angle, setAngle] = useState(0)
    const [region, setRegion] = useState({
        latitude: positionDevice.coords.latitude,
        longitude: positionDevice.coords.longitude,
        latitudeDelta: Math.abs(positionDevice.coords.latitude - positionRestaurant.location.latitude) * 2,
        longitudeDelta: Math.abs(positionDevice.coords.longitude - positionRestaurant.location.longitude) * 2,
    })


    const originLatitude = positionDevice.coords.latitude
    const originLongitude = positionDevice.coords.longitude
    const restauranLatitude = positionRestaurant.location.latitude
    const restaurantLongitude = positionRestaurant.location.longitude

    const origin = { latitude: restauranLatitude, longitude: restaurantLongitude }
    const destination = { latitude: originLatitude, longitude: originLongitude }



    function calculateAngle(coordinates) {
        //formule

        let startLat = coordinates[0]["latitude"]
        let startLng = coordinates[0]["longitude"]
        let endLat = coordinates[1]["latitude"]
        let endLng = coordinates[1]["longitude"]
        let dx = endLat - startLat
        let dy = endLng - startLng

        return Math.atan2(dy, dx) * 180 / Math.PI
    }


    function zoomIn() {
        const newRegion = {
            latitude: region.latitude,
            longitude: region.longitude,
            latitudeDelta: region.latitudeDelta / 2,
            longitudeDelta: region.longitudeDelta / 2,
        }
        setRegion(newRegion)
        mapView.current.animateToRegion(newRegion, 200)

    }

    function zoomOut() {
        const newRegion = {
            latitude: region.latitude,
            longitude: region.longitude,
            latitudeDelta: region.latitudeDelta * 2,
            longitudeDelta: region.longitudeDelta * 2,
        }
        setRegion(newRegion)
        mapView.current.animateToRegion(newRegion, 200)
    }

    function onReady(result) {
        setDuration(result.duration)

        if (!isReady) {
            // Fit route into maps
            mapView.current.fitToCoordinates(result.coordinates, {
                edgePadding: {
                    right: (windowWidth / 5),
                    bottom: (windowHeight / 1),
                    left: (windowWidth / 5),
                    top: (windowHeight / 2)
                }
            })


            // car angle
            if (result.coordinates.length >= 2) {
                const angle = calculateAngle(result.coordinates)
                setAngle(angle)
            }

            setIsReady(true)
        }
    }

    function renderMap() {
        const destinationMarker = () => (
            <Marker
                coordinate={{
                    latitude: region.latitude, longitude: region.longitude
                }}
            >
                <View
                    style={styles.destinationBorder}
                >
                    <View
                        style={styles.destinationArrow}
                    >
                        <Image
                            source={icons.pin}
                            style={styles.pin}
                        />

                    </View>
                </View>
            </Marker>
        )

        const carIcon = () => (
            <Marker
                coordinate={{
                    latitude: restauranLatitude,
                    longitude: restaurantLongitude
                }}
                anchor={{ x: 0.5, y: 0.5 }}
                flat={true}
                rotation={angle}
            >
                <Image
                    source={icons.car}
                    style={styles.img}
                />
            </Marker>
        )

        return (
            <MapView
                ref={mapView}
                initialRegion={region}
                style={{ flex: 1 }}
            >
                <MapViewDirections
                    origin={origin}
                    destination={destination}
                    apikey={GOOGLE_MAPS_APIKEY}
                    strokeWidth={5}
                    strokeColor={COLORS.primary}
                    optimizeWaypoints={true}
                    onReady={(result) => onReady(result)}
                />
                {destinationMarker()}
                {carIcon()}
            </MapView>
        )
    }


    return (
        <View style={{ flex: 1 }}>
            {renderMap()}
            <RenderDestinationHeader duration={duration} address={address} />
            <RenderDeliveryInfo restaurant={restaurant} navigation={navigation} />
            <RenderZoomButtons zoomIn={zoomIn} zoomOut={zoomOut} />
        </View>
    )
}

const styles = StyleSheet.create({
    destinationBorder: {
        height: 40,
        width: 40,
        borderRadius: 20,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: COLORS.white
    },
    destinationArrow: {
        height: 30,
        width: 30,
        borderRadius: 15,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: COLORS.primary
    },
    pin: {
        width: 25,
        height: 25,
        tintColor: COLORS.white
    },
    img: {
        width: 40,
        height: 40,
    }
})

export default OrderDelivery