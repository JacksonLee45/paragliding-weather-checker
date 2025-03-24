import React from 'react';
import { GoogleMap, useJsApiLoader, Marker } from '@react-google-maps/api';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/card';
import { MapPin, Loader2 } from 'lucide-react';

const apiKey = process.env.REACT_APP_GOOGLE_MAPS_API_KEY;

const MapView = ({ lat, lng }) => {
  // Use the useJsApiLoader hook to load the Google Maps script once
  const { isLoaded } = useJsApiLoader({
    id: 'google-map-script',
    googleMapsApiKey: apiKey
  });
  
  // Map container style
  const mapContainerStyle = {
    width: "100%",
    height: "100%",
    minHeight: "300px",
    borderRadius: "var(--radius)"
  };
  
  // Center coordinates
  const center = {
    lat: parseFloat(lat),
    lng: parseFloat(lng)
  };
  
  // Map options
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
    <Card className="w-full h-full">
      <CardHeader className="pb-2">
        <div className="flex items-center space-x-2">
          <MapPin className="h-5 w-5 text-amber-500" />
          <CardTitle>Location</CardTitle>
        </div>
      </CardHeader>
      <CardContent className="h-[calc(100%-4rem)]">
        {!isLoaded ? (
          // Show loading spinner while the map is loading
          <div className="h-full flex items-center justify-center">
            <Loader2 className="h-8 w-8 animate-spin text-primary mr-2" />
            <span>Loading map...</span>
          </div>
        ) : (
          // Render the map once the script is loaded
          <GoogleMap
            mapContainerStyle={mapContainerStyle}
            center={center}
            zoom={12}
            options={mapOptions}
          >
            <Marker position={center} />
          </GoogleMap>
        )}
      </CardContent>
    </Card>
  );
};

export default MapView;