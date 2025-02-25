import React, { useState} from 'react';
import axios from 'axios'
import WeatherForm from './WeatherForm';
import WeatherDisplay from './WeatherDisplay';
import CommonLocation from './CommonLocation';
import MapView from './MapView';
import WindChart from './WindChart';
import TemperatureChart from './TemperatureChart';

function Body() {
    const [weatherData, setWeatherData] = useState(null);
    const [isGoodForParagliding, setIsGoodForParagliding] = useState(null);
    const [coordinates, setCoordinates] = useState({latitude: null, longitude: null });
    const [hourlyWindData, setHourlyWindData] = useState([]); 
    const [hourlyTempData, setHourlyTempData] = useState([]);  

    const apiGatewayUrl = process.env.REACT_APP_API_GATEWAY_URL;
    
    const handleSearch = async ({ latitude, longitude }) => {
        try {
    
            var location = latitude + '#' + longitude;
    
            const response = await axios.get(apiGatewayUrl,{
                params: {
                    location, location
                }
            });
            const data = response.data;
    
            setWeatherData({
                lat: data.lat,
                lon: data.lon,
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
    
            const formattedWindData = data.hourly.map((entry) => ({
                time: new Date(entry.dt * 1000).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit"}),
                windSpeed: entry.wind_speed,
                windGust: entry.wind_gust
            }));
            setHourlyWindData(formattedWindData);

            const formattedTempData = data.hourly.map((entry) => ({
                time: new Date(entry.dt * 1000).toLocaleTimeString([], {hour: "2-digit", minute: "2-digit"}),
                temperature: entry.temp
            }));

            setHourlyTempData(formattedTempData);

        }
        catch (error) {
            console.error("Error fetching weather data:", error);
        }
      };

      return (
        <div>
            <div className="container">
                <WeatherForm onSearch={handleSearch} />      
                <CommonLocation />
            </div>

            {coordinates.latitude && coordinates.longitude && (
                <div>
                    <div className="container" style={{marginbottom:'20px'}}> 
                            <div className="custom-border" style={{width: '500px', height: '100%'}}>
                                <WeatherDisplay weatherData={weatherData} isGoodForParagliding={isGoodForParagliding} />
                            </div>

                            <div>                        
                                <div className="custom-border" style={{width: '400px', height: '100%'}}>  
                                    <MapView lat={coordinates.latitude} lng={coordinates.longitude} />          
                                </div>  
                            </div>
                    </div>
                    <div className="container">
                        <div className="custom-border" style={{width: '1000px', height: '400px'}}>
                            <WindChart data={hourlyWindData}/>
                        </div>
                    </div>

                    <div className="container">
                        <div className="custom-border" style={{width: '100%', height: '400px'}}>
                            <TemperatureChart data={hourlyTempData}/>
                        </div>
                    </div>
                </div>
            )}

        </div>
      );
}

export default Body