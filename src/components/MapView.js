import React from 'react'
import { GoogleMap, LoadScript, Marker } from "@react-google-maps/api";

const apiKey = process.env.REACT_APP_GOOGLE_MAPS_API_KEY;

const MapView = ({ lat, lng }) => {
    const mapContainerStyle = {
        width: "100%",
        height: "100%"
    };

    const center = {
        lat: parseFloat(lat),
        lng: parseFloat(lng)
    };

    const mapOptions = {
        mapTypeId: "hybrid",
        styles: [
            {
                featureType: "poi",
                elementType: "labels",
                stylers: [{ visibility: "off" }]
            },
            {
                featureType: "transit",
                elementType: "labels",
                stylers: [{ visibility: "off" }]
            },
            {
                featureType: "road",
                elementType: "labels",
                stylers: [{ visibility: "simplified" }]
            }
        ]
    };
    return (
        <LoadScript googleMapsApiKey={apiKey}>
            <GoogleMap 
                mapContainerStyle={mapContainerStyle} 
                center={center} 
                zoom={12}
                mapTypeId="satellite"
                options={mapOptions}
            >

                <Marker position={center} />

            </GoogleMap>
        </LoadScript>
    )
    
}

export default MapView