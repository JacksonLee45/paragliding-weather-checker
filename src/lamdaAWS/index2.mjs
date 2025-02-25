//this file gets zipped with node_modules and uploaded to AWS Lambda
//this file has TWO Parameters - LAT and LON - Couldn't figure out a CORS error when I went to
//NOTE: Currently Boulder is hardcoded - change this later on

import axios from 'axios';

export const handler = async (event) => {
  const { latitude, longitude } = event.queryStringParameters || {};

  if(!latitude || !longitude){
    return {
      statusCode: 400,
      body: JSON.stringify({error: "latitude & longitude is required."})
    };
  }

  try{
    const API_KEY = ''; //https://home.openweathermap.org/api_keys
    const LON = '-105.299';   // 40.056134, -105.299974 Boulder Paragliding Launch Hardcoded
    const LAT = '40.056';

    // TODO: Remove hardcoded API and LON/LAT variables
    const weatherResponse = await axios.get('https://api.openweathermap.org/data/3.0/onecall?lat=40.056&lon=-105.299&appid={API_KEY}'); //console.log('URL: https://api.openweathermap.org/data/3.0/onecall?lat={LAT}&lon={LON}&exclude={part}&appid={API_KEY}')
    const weatherData = weatherResponse.data;                                                                                                                  //const weatherResponse = await axios.get('https://api.openweathermap.org/data/3.0/onecall?lat=40.056&lon=-105.299&appid={API_KEY}');//'https://api.weatherapi.com/v1/current.json?key=${API_KEY}&q=${location}');

    const temperature = (weatherData.current.temp - 273.15) * (9/5) + 32; //Convert from Kelven to Fahrenheit
    const wind_speed = weatherData.current.wind_speed ?? '' ;
    const wind_deg = weatherData.current.wind_deg ?? '';
    const wind_gust = weatherData.current.wind_gust ?? '';
    const condition = weatherData.summary ?? '';

    const isGoodForParagliding = (
      wind_speed <= 6 && // Ideal wind speed range in m/s (converts to ~13mph)
      temperature >= 50 && temperature <= 100 && // Ideal temperature range in Celcius
      !condition.toLowerCase().includes("rain") && !condition.toLowerCase("storm") // No rain or storms
    );

    const response = {
      temperature: temperature,
      wind_speed: wind_speed,
      wind_deg: wind_deg,
      wind_gust: wind_gust,
      condition: condition,
      isGoodForParagliding: isGoodForParagliding
    };

    return {
      statusCode: 200,
      Headers: { "Access-Control-Allow-Origin"  : "*", 
      "Access-Control-Allow-Methods": "OPTIONS,POST,GET"
      },
      body: JSON.stringify(response)
    }
  } catch (error) {
    console.error("Error fetching weather data:", error);
    return {
      statusCode: 500,
      body: JSON.stringify({error: "Failed to retrieve weather data in Lambda."})
    };
  }
};
