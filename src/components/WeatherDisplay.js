import React from 'react'

function WeatherDisplay({weatherData, isGoodForParagliding}) {
    if (!weatherData) return null;

    return (                
        <div>
            <div style={{textAlign: "center"}}>
                <h4>Coordinates: &lt;{weatherData.lat}, {weatherData.lon}&gt;</h4>
            </div>
            <table class="table table-dark table-bordered">
                <tbody>
                    <tr>
                        <th scope="row">Conditions</th>
                        <td>{isGoodForParagliding ? "Good" : "Not suitable"}</td>
                    </tr>
                    <tr>
                        <th scope="row">Summary</th>
                        <td>{weatherData.condition}</td>                        
                    </tr>    
                    <tr>
                        <th scope="row">Temperature</th>
                        <td>{weatherData.temperature}*F</td>                        
                    </tr> 
                    <tr>
                        <th scope="row">Wind Speed</th>
                        <td>{weatherData.wind_speed} mph</td>                        
                    </tr> 
                    <tr>
                        <th scope="row">Wind Direction</th>
                        <td>{weatherData.wind_deg}*</td>                        
                    </tr>
                    <tr>
                        <th scope="row">Wind Gust</th>
                        <td>{weatherData.wind_gust} mph</td>                                                
                    </tr>
                    <tr>
                        <th scope="row">UV Index</th>
                        <td>{weatherData.uvi}</td>                                                
                    </tr>    
                </tbody>
            </table>
        </div>
    );
}

export default WeatherDisplay