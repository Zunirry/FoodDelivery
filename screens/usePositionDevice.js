import { useEffect, useState } from 'react'
import { Alert } from 'react-native'
import Geolocation from '@react-native-community/geolocation';

const usePositionDevice = () => {

    const [readyPosition, setReadyPosition] = useState(false)
    const [positionDevice, setPositionDevice] = useState(null)
    const [address, setAddress] = useState(null)

    useEffect(() => {
            const getCurrentPosition = () => {
                Geolocation.getCurrentPosition(
                        (position) => {
                        const initialPosition = JSON.stringify(position);
                        setPositionDevice({ position });
                        setReadyPosition(true)
                    },
                    error => Alert.alert('An error has occurred, please reload the app!'),
                    { enableHighAccuracy: true, timeout: 20000, maximumAge: 1000 },
                );
            }
            
            getCurrentPosition()
    
            if(readyPosition == true){
                fetchUrl()
            }
            
    
        },[Geolocation, readyPosition])


    const fetchUrl = async () => {
        const response = await fetch(`https://maps.googleapis.com/maps/api/geocode/json?latlng=${positionDevice.position.coords.latitude},${positionDevice.position.coords.longitude}&key=AIzaSyAFwVQg_APUr-9mdD5HwJIvoaG0dqr_WUo`)
        const streetName = await response.json()
        setAddress(streetName.results[0].address_components[1].short_name);
    }
    return [
        address,
        positionDevice,
        readyPosition
    ]
}

export default usePositionDevice