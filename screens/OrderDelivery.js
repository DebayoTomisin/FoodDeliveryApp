import React, {useState, useRef, useEffect } from 'react'
import { View, Text, Image, TouchableOpacity } from 'react-native'
import { COLORS, FONTS, icons, SIZES, GOOGLE_API_KEY } from "../constants"
import MapView, { PROVIDER_GOOGLE, Marker } from 'react-native-maps';
import MapViewDirections from 'react-native-maps-directions';
// import MapViewDirections from "react-native-maps-directions";


const OrderDelivery = ({route, navigation}) =>
{
    const mapView = useRef()

    const [resturant, setResturant] = useState(null)
    const [streetName, setStreetName] = useState("")
    const [fromLocation, setFromLocation] = useState(null)
    const [toLocation, setToLocation] = useState(null)
    const [region, setRegion] = useState(null)

    const [duration, setDuration] = useState(0)
    const [isReady, setIsReady] = useState(false)
    const [angle, setAngle] = useState(0)

    useEffect(() => {
        let { resturant, currentLocation} = route.params

        let fromLoc = currentLocation.gps
        let toLoc = resturant.location
        let street = currentLocation.streetName

        let mapRegion = {
            latitude: (fromLoc.latitude + toLoc.latitude) / 2,
            longitde: (fromLoc.longitde + toLoc.longitde) / 2,
            latitudeDelta: Math.abs(fromLoc.latitude - toLoc.latitude) * 2,
            longitdeDelta: Math.abs(fromLoc.longitde - toLoc.longitde) * 2,
        }

        setResturant(resturant)
        setStreetName(street)
        setFromLocation(fromLoc)
        setToLocation(toLoc)
        setRegion(mapRegion)
    }, [])

    function calculateAngles(coordinates) {
        let startLat = coordinates[0]["latitude"]
        let startLng = coordinates[0]["longitude"]
        let endat = coordinates[1]["latitude"]
        let endLng = coordinates[1]["longitude"]

        let dx = endat - startLat
        let dy = endLng - startLng
        return Math.atan2(dy, dx) * 100 / Math.PI
    }

    function zoomIn () {
        let newRegion = {
            latitude: region.latitude,
            longitde: region.longitde,
            latitudeDelta: region.latitude / 2,
            longitdeDelta: region.longitde / 2,
        }

        setRegion(newRegion)
        mapView.current.animateToRegion(newRegion, 200)
    }

    function zoomOut() {
        let newRegion = {
            latitude: region.latitude,
            longitde: region.longitde,
            latitudeDelta: region.latitude * 2,
            longitdeDelta: region.longitde * 2,
        }

        setRegion(newRegion)
        mapView.current.animateToRegion(newRegion, 200)
    }

    function renderMap () {
        const destinationMarker = () => (
            <Marker coordinate={toLocation}>
                <View style={{
                    height: 40,
                    width: 40,
                    borderRadius: 20,
                    alignItems: 'center',
                    justifyContent: 'center',
                    backgroundColor: COLORS.white
                }}>
                    <View style={{
                        height: 30,
                        width: 30,
                        borderRadius: 15,
                        alignItems: 'center',
                        justifyContent: "center",
                        backgroundColor: COLORS.primary,
                    }}>
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
                coordinate={fromLocation}
                anchor={{ x: 0.5, y: 0.5 }}
                flat={true}
                rotation= {angle}
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
            <View style={{ flex: 1 }}>
                <MapView 
                    ref={mapView}
                    provider={PROVIDER_GOOGLE}
                    initialRegion={region}
                    style={{ flex: 1 }}
                >
                    {/* <MapViewDirections /> */}
                    {destinationMarker ()}
                    {carIcon ()}
                </MapView>
            </View>
        )
    }
    
    return(
        <View style={{ flex: 1 }}>
            {renderMap()}
        </View>
    )
}

export default OrderDelivery
