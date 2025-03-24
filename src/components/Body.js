import React, { useState } from 'react';
import axios from 'axios';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { Alert, AlertDescription, AlertTitle } from './ui/alert';
import { AlertCircle, Loader2 } from 'lucide-react';
import { Skeleton } from './ui/skeleton';
import WeatherForm from './WeatherForm';
import WeatherDisplay from './WeatherDisplay';
import CommonLocation from './CommonLocation';
import MapView from './MapView';
import WindChart from './WindChart';
import TemperatureChart from './TemperatureChart';

function Body() {
  const [weatherData, setWeatherData] = useState(null);
  const [isGoodForParagliding, setIsGoodForParagliding] = useState(null);
  const [coordinates, setCoordinates] = useState({ latitude: null, longitude: null });
  const [hourlyWindData, setHourlyWindData] = useState([]);
  const [hourlyTempData, setHourlyTempData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [activeTab, setActiveTab] = useState('wind');

  const apiGatewayUrl = process.env.REACT_APP_API_GATEWAY_URL;

  const handleSearch = async ({ latitude, longitude }) => {
    setLoading(true);
    setError(null);
    
    try {
      const location = latitude + '#' + longitude;

      const response = await axios.get(apiGatewayUrl, {
        params: {
          location: location
        }
      });
      
      const data = response.data;

      setWeatherData({
        lat: latitude,
        lon: longitude,
        location: data.location,
        temperature: data.temperature,
        wind_speed: data.wind_speed,
        wind_gust: data.wind_gust,
        wind_deg: data.wind_deg,
        condition: data.condition,
        uvi: data.uvi
      });

      setIsGoodForParagliding(data.isGoodForParagliding);
      setCoordinates({ latitude, longitude });

      // Format hourly wind data
      if (data.hourly) {
        const formattedWindData = data.hourly.map((entry) => ({
          time: new Date(entry.dt * 1000).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
          windSpeed: entry.wind_speed,
          windGust: entry.wind_gust || entry.wind_speed // Fallback if gust is not available
        }));
        setHourlyWindData(formattedWindData);

        // Format hourly temperature data
        const formattedTempData = data.hourly.map((entry) => ({
          time: new Date(entry.dt * 1000).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
          temperature: entry.temp
        }));
        setHourlyTempData(formattedTempData);
      }
    } catch (error) {
      console.error("Error fetching weather data:", error);
      setError("Failed to fetch weather data. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-[1fr,2fr] gap-6">
        <WeatherForm onSearch={handleSearch} />
        <CommonLocation onSelectLocation={handleSearch} />
      </div>

      {error && (
        <Alert variant="destructive">
          <AlertCircle className="h-4 w-4" />
          <AlertTitle>Error</AlertTitle>
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      )}

      {loading && (
        <div className="space-y-4">
          <div className="flex justify-center items-center py-8">
            <Loader2 className="h-8 w-8 animate-spin text-primary" />
            <span className="ml-2">Loading weather data...</span>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Skeleton className="h-[400px] w-full" />
            <Skeleton className="h-[400px] w-full" />
          </div>
          <Skeleton className="h-[350px] w-full" />
        </div>
      )}

      {!loading && coordinates.latitude && coordinates.longitude && weatherData && (
        <div className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6" style={{ minHeight: "450px" }}>
          <WeatherDisplay weatherData={weatherData} isGoodForParagliding={isGoodForParagliding} />
          <MapView lat={coordinates.latitude} lng={coordinates.longitude} />
        </div>

          <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="wind">Wind Forecast</TabsTrigger>
              <TabsTrigger value="temperature">Temperature Forecast</TabsTrigger>
            </TabsList>
            <TabsContent value="wind" className="mt-4">
              <WindChart data={hourlyWindData} />
            </TabsContent>
            <TabsContent value="temperature" className="mt-4">
              <TemperatureChart data={hourlyTempData} />
            </TabsContent>
          </Tabs>
        </div>
      )}
    </div>
  );
}

export default Body;