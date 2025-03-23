import React, { useState } from 'react';
import { Input } from '../components/ui/input';
import { Button } from '../components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/card';
import { ArrowUpCircle, ArrowDownCircle, ArrowRightCircle, ArrowLeftCircle } from 'lucide-react';

function WeatherForm({ onSearch }) {
  const [latitude, setLatitude] = useState('');
  const [longitude, setLongitude] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (latitude && longitude) {
      onSearch({ latitude, longitude });
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-center">Submit Coordinates</CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Input
              type="text"
              placeholder="Latitude"
              value={latitude}
              onChange={(e) => setLatitude(e.target.value)}
              className="text-center"
            />
            <div className="text-xs space-y-1 text-muted-foreground">
              <div className="flex items-center space-x-2">
                <ArrowUpCircle className="h-4 w-4" />
                <span>Positive values for the northern hemisphere</span>
              </div>
              <div className="flex items-center space-x-2">
                <ArrowDownCircle className="h-4 w-4" />
                <span>Negative values for the southern hemisphere</span>
              </div>
            </div>
          </div>

          <div className="space-y-2">
            <Input
              type="text"
              placeholder="Longitude"
              value={longitude}
              onChange={(e) => setLongitude(e.target.value)}
              className="text-center"
            />
            <div className="text-xs space-y-1 text-muted-foreground">
              <div className="flex items-center space-x-2">
                <ArrowRightCircle className="h-4 w-4" />
                <span>Positive values for the eastern hemisphere</span>
              </div>
              <div className="flex items-center space-x-2">
                <ArrowLeftCircle className="h-4 w-4" />
                <span>Negative values for the western hemisphere</span>
              </div>
            </div>
          </div>

          <Button type="submit" className="w-full">Submit</Button>
        </form>
      </CardContent>
    </Card>
  );
}

export default WeatherForm;