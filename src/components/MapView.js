import React from 'react';
import { GoogleMap, LoadScript, Marker } from '@react-google-maps/api';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/card';
import { MapPin } from 'lucide-react';

const apiKey = process.env.REACT_APP_GOOGLE_MAPS_API_KEY;

const MapView = ({ lat, lng }) => {
  // Map will take 100% of its container height
  const mapContainerStyle = {
    width: "100%",
    height: "100%",
    minHeight: "300px",
    borderRadius: "var(--radius)"
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
    <Card className="w-full h-full">
      <CardHeader className="pb-2">
        <div className="flex items-center space-x-2">
          <MapPin className="h-5 w-5 text-amber-500" />
          <CardTitle>Location</CardTitle>
        </div>
      </CardHeader>
      <CardContent className="h-[calc(100%-4rem)]"> {/* Subtract header height */}
        <LoadScript googleMapsApiKey={apiKey}>
          <GoogleMap
            mapContainerStyle={mapContainerStyle}
            center={center}
            zoom={12}
            options={mapOptions}
          >
            <Marker position={center} />
          </GoogleMap>
        </LoadScript>
      </CardContent>
    </Card>
  );
};

export default MapView;