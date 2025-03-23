import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Thermometer, Wind, Compass, Zap, Sun, Info } from 'lucide-react';

function WeatherDisplay({ weatherData, isGoodForParagliding }) {
  if (!weatherData) return null;

  return (
    <Card className="w-full">
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle>Weather Conditions</CardTitle>
          {isGoodForParagliding !== null && (
            <Badge variant={isGoodForParagliding ? "success" : "destructive"}>
              {isGoodForParagliding ? "Good for paragliding" : "Not suitable for paragliding"}
            </Badge>
          )}
        </div>
        <div className="text-sm text-muted-foreground">
          Coordinates: {weatherData.lat}, {weatherData.lon}
        </div>
      </CardHeader>
      <CardContent>
        <div className="grid gap-4">
          <div className="flex items-center gap-4 p-2 rounded-lg border">
            <Info className="h-5 w-5 text-muted-foreground" />
            <div className="flex-1">
              <div className="text-sm font-medium">Summary</div>
              <div className="text-lg">{weatherData.condition}</div>
            </div>
          </div>
          
          <div className="flex items-center gap-4 p-2 rounded-lg border">
            <Thermometer className="h-5 w-5 text-primary" />
            <div className="flex-1">
              <div className="text-sm font-medium">Temperature</div>
              <div className="text-lg">{Math.round(weatherData.temperature)}°F</div>
            </div>
          </div>
          
          <div className="flex items-center gap-4 p-2 rounded-lg border">
            <Wind className="h-5 w-5 text-primary" />
            <div className="flex-1">
              <div className="text-sm font-medium">Wind Speed</div>
              <div className="text-lg">{weatherData.wind_speed} mph</div>
            </div>
          </div>
          
          <div className="flex items-center gap-4 p-2 rounded-lg border">
            <Compass className="h-5 w-5 text-primary" />
            <div className="flex-1">
              <div className="text-sm font-medium">Wind Direction</div>
              <div className="text-lg">{weatherData.wind_deg}°</div>
            </div>
          </div>
          
          <div className="flex items-center gap-4 p-2 rounded-lg border">
            <Zap className="h-5 w-5 text-primary" />
            <div className="flex-1">
              <div className="text-sm font-medium">Wind Gust</div>
              <div className="text-lg">{weatherData.wind_gust} mph</div>
            </div>
          </div>
          
          {weatherData.uvi && (
            <div className="flex items-center gap-4 p-2 rounded-lg border">
              <Sun className="h-5 w-5 text-primary" />
              <div className="flex-1">
                <div className="text-sm font-medium">UV Index</div>
                <div className="text-lg">{weatherData.uvi}</div>
              </div>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
}

export default WeatherDisplay;