import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from './ui/table';
import { Button } from './ui/button';
import { Copy } from 'lucide-react';
import { useToast } from './ui/use-toast';

function CommonLocation({ onSelectLocation }) {
  const { toast } = useToast();
  
  const locations = [
    { location: 'Boulder, CO', name: 'North Boulder Launch', lat: '40.0562', lng: '-105.299' },
    { location: 'Golden, CO', name: 'Lookout Mountain', lat: '39.7461', lng: '-105.240' },
    { location: 'Grand Junction, CO', name: 'Otto\'s Ridge', lat: '39.2777', lng: '-108.994' },
    { location: 'Dominical, CR', name: 'Dominical Launch', lat: '9.23883', lng: '-83.8177' },
    { location: 'Torrey Pines, CA', name: 'TP Gliderport', lat: '32.8899', lng: '-117.251' }
  ];

  const copyCoordinates = (lat, lng) => {
    navigator.clipboard.writeText(`${lat}, ${lng}`);
    toast({
      description: 'Coordinates copied to clipboard',
    });
  };

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle className="text-center">Common Launch Locations</CardTitle>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Location</TableHead>
              <TableHead>Launch Name</TableHead>
              <TableHead>Latitude</TableHead>
              <TableHead>Longitude</TableHead>
              <TableHead className="w-[100px]"></TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {locations.map((loc, index) => (
              <TableRow key={index}>
                <TableCell>{loc.location}</TableCell>
                <TableCell>{loc.name}</TableCell>
                <TableCell>{loc.lat}</TableCell>
                <TableCell>{loc.lng}</TableCell>
                <TableCell>
                  <div className="flex gap-2">
                    <Button 
                      variant="outline" 
                      size="icon" 
                      onClick={() => copyCoordinates(loc.lat, loc.lng)}
                      title="Copy coordinates"
                    >
                      <Copy className="h-4 w-4" />
                    </Button>
                    <Button 
                      size="sm"
                      onClick={() => onSelectLocation && onSelectLocation({ latitude: loc.lat, longitude: loc.lng })}
                    >
                      Use
                    </Button>
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
}

export default CommonLocation;