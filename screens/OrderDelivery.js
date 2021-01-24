import React, { useState, useRef } from 'react'
import {
    View,
    Text,
    Image,
    Dimensions,
    StyleSheet
} from 'react-native'
import MapView from 'react-native-maps'
import MapViewDirections from 'react-native-maps-directions'
import { Marker } from 'react-native-maps';
import { COLORS, icons } from '../constants'
import GOOGLE_MAPS_APIKEY from './maps'
import { TouchableOpacity } from 'react-native-gesture-handler';

const OrderDelivery = ({ route, navigation }) => {
    console.log(route, 'routeDelivery');
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
    
    console.log(region, 'Region out zoom');
    
    // useEffect(() => {
    //     const Mapregion = {
    //         latitude: originLatitude,
    //         longitude: originLongitude,
    //         latitudeDelta: 0.04,
    //         longitudeDelta: 0.05,
    //     }
        
    //     setRegion(Mapregion)
    // }, [])

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


    function zoomIn(){
        const newRegion = {
            latitude: region.latitude,
            longitude: region.longitude,
            latitudeDelta: region.latitudeDelta / 2,
            longitudeDelta: region.longitudeDelta / 2,
        }
        setRegion(newRegion)
        mapView.current.animateToRegion(newRegion, 200)

    }

    function zoomOut(){
        const newRegion = {
            latitude: region.latitude,
            longitude: region.longitude,
            latitudeDelta: region.latitudeDelta * 2,
            longitudeDelta: region.longitudeDelta * 2,
        }
        setRegion(newRegion)
        mapView.current.animateToRegion(newRegion, 200)
    }

    function renderMap() {

        const destinationMarker = () => (

            <Marker
                coordinate={{
                    latitude: region.latitude, longitude: region.longitude
                }}
            >
                <View
                    style={{
                        height: 40,
                        width: 40,
                        borderRadius: 20,
                        alignItems: 'center',
                        justifyContent: 'center',
                        backgroundColor: COLORS.white
                    }}
                >
                    <View
                        style={{
                            height: 30,
                            width: 30,
                            borderRadius: 15,
                            alignItems: 'center',
                            justifyContent: 'center',
                            backgroundColor: COLORS.primary
                        }}
                    >
                        <Image
                            source={icons.pin}
                            style={{
                                width: 25,
                                height: 25,
                                tintColor: COLORS.white
                            }}
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
                    style={{
                        width: 40,
                        height: 40,
                    }}
                />
            </Marker>
        )

        return (
            <MapView
                ref={mapView}
                initialRegion={region}
                style={{
                    flex: 1
                }}
            >
                <MapViewDirections
                    origin={origin}
                    destination={destination}
                    apikey={GOOGLE_MAPS_APIKEY}
                    strokeWidth={5}
                    strokeColor={COLORS.primary}
                    optimizeWaypoints={true}
                    onReady={result => {
                        setDuration(result.duration)
                        console.log(result, 'result MapView Dir');
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
                    }}
                />
                {destinationMarker()}
                {carIcon()}
            </MapView>
        )
    }

    function renderDestinationHeader() {
        console.log(duration, 'duration');
        return (
            <View
                style={{
                    position: 'absolute',
                    top: 40,
                    left: 0,
                    right: 0,
                    height: 50,
                    alignItems: 'center',
                    justifyContent: 'center',

                }}
            >
                <View
                    style={{
                        flexDirection: 'row',
                        alignItems: 'center',
                        width: windowWidth * 0.9,
                        paddingVertical: 10,
                        paddingHorizontal: 20,
                        borderRadius: 30,
                        backgroundColor: COLORS.white,
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
                        <Text style={{ fontSize: 18, fontWeight: 'bold' }}> {address}</Text>
                    </View>
                    <Text style={{ fontSize: 25, color: COLORS.lightGray5, paddingRight: 10 }}> | </Text>
                    <Text style={{ fontSize: 16, fontWeight: 'bold' }}>{Math.ceil(duration)} mins</Text>
                </View>
            </View>

        )
    }

    function renderDeliveryInfo() {
        return (
            <View
                style={{
                    position: 'absolute',
                    bottom: 50,
                    left: 0,
                    right: 0,
                    justifyContent: 'center',
                    alignItems: 'center'
                }}
            >
                <View
                    style={{
                        width: windowWidth * 0.9,
                        paddingVertical: 30,
                        paddingHorizontal: 20,
                        borderRadius: 30,
                        backgroundColor: COLORS.white,
                        ...styles.shadow
                    }}
                >
                    <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                        <Image
                            source={restaurant.courier.avatar}
                            style={{
                                width: 50,
                                height: 50,
                                borderRadius: 25
                            }}
                        />
                        <View style={{ flex: 1, marginLeft: 10 }}>
                            <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                                <Text style={{ fontSize: 20, fontWeight: 'bold' }}> {restaurant.courier.name} </Text>
                                <View style={{ flexDirection: 'row' }}>
                                    <Image
                                        source={icons.star}
                                        style={{
                                            width: 20,
                                            height: 20,
                                            tintColor: COLORS.primary
                                        }}
                                    />
                                    <Text style={{ fontSize: 16 }}> {restaurant.rating}</Text>
                                </View>
                            </View>

                            <Text style={{ fontSize: 14, color: COLORS.darkgray }}>{restaurant.name}</Text>
                        </View>
                    </View>

                    <View style={{ flexDirection: 'row', marginTop: 20, justifyContent: 'space-between' }}>
                        <TouchableOpacity
                            style={{
                                height: 50,
                                width: windowWidth / 2.6,
                                backgroundColor: COLORS.primary,
                                justifyContent: 'center',
                                alignItems: 'center',
                                borderRadius: 10
                            }}
                        >
                            <Text style={{ color: COLORS.white, fontSize: 18, fontWeight: 'bold' }}> Call </Text>
                        </TouchableOpacity>

                        <TouchableOpacity
                            style={{
                                height: 50,
                                width: windowWidth / 2.6,
                                backgroundColor: COLORS.secondary,
                                justifyContent: 'center',
                                alignItems: 'center',
                                borderRadius: 10
                            }}
                            onPress={() => navigation.goBack()}
                        >
                            <Text style={{ color: COLORS.white, fontSize: 18, fontWeight: 'bold' }}> Cancel </Text>
                        </TouchableOpacity>
                    </View>

                </View>
            </View>
        )
    }

    function renderZoomButtons() {
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
                        backgroundColor: COLORS.white,
                        alignItems: 'center',
                        justifyContent: 'center',
                        ...styles.shadow
                    }}
                    onPress={() => zoomIn()}
                >
                    <Text style={{ fontWeight: 'bold', fontSize: 30 }}> + </Text>
                </TouchableOpacity>

                <TouchableOpacity
                    style={{
                        width: 60,
                        height: 60,
                        borderRadius: 30,
                        backgroundColor: COLORS.white,
                        alignItems: 'center',
                        justifyContent: 'center',
                        ...styles.shadow
                    }}
                    onPress={() => zoomOut()}

                >
                    <Text style={{ fontWeight: 'bold', fontSize: 30 }}> - </Text>
                </TouchableOpacity>
            </View>

        )
    }

    return (
        <View style={{ flex: 1 }}>
            {renderMap()}
            {renderDestinationHeader()}
            {renderDeliveryInfo()}
            {renderZoomButtons()}
        </View>
    )
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

export default OrderDelivery