import React from 'react';
import { GoogleMap, LoadScript, Marker } from '@react-google-maps/api';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/card';
import { MapPin } from 'lucide-react';

const apiKey = process.env.REACT_APP_GOOGLE_MAPS_API_KEY;

const MapView = ({ lat, lng }) => {
  const mapContainerStyle = {
    width: '100%',
    height: '300px',
    borderRadius: 'var(--radius)'
  };

  const center = {
    lat: parseFloat(lat),
    lng: parseFloat(lng)
  };

  const mapOptions = {
    mapTypeId: 'hybrid',
    styles: [
      {
        featureType: 'poi',
        elementType: 'labels',
        stylers: [{ visibility: 'off' }]
      },
      {
        featureType: 'transit',
        elementType: 'labels',
        stylers: [{ visibility: 'off' }]
      },
      {
        featureType: 'road',
        elementType: 'labels',
        stylers: [{ visibility: 'simplified' }]
      }
    ]
  };

  return (
    <Card className="w-full">
      <CardHeader className="pb-2">
        <div className="flex items-center space-x-2">
          <MapPin className="h-5 w-5 text-primary" />
          <CardTitle>Location</CardTitle>
        </div>
      </CardHeader>
      <CardContent>
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