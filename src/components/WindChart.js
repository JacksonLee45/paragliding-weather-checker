import React from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import  { FaArrowUp } from "react-icons/fa";

const convertToMph = (value) => (value * 2.23694).toFixed(2);

const CustomToolTip = ({active, payload, label }) => {
    if (active && payload && payload.length){
        return (
            <div style={{
                backgroundColor: "rgba(0,0,0, 0.7)",
                color: '#fff',
                padding: "10px",
                borderRadius: "15px",
                fontSize: "14px"
            }}>
            <p><strong>{label}</strong></p>
            <p>Wind Speed: {payload[0].value} mph </p>
            <p>Wind Gust: {payload[1].value} mph </p>
            </div>
            );
        }
        return null;
    }

function WindChart({data}) {
    if (!data) return null;

    // Convert data values from m/s to mph
    const convertedData = data.map(item => ({
        ...item,
        windSpeed: parseFloat(convertToMph(item.windSpeed)),
        windGust: parseFloat(convertToMph(item.windGust))
    }));

    // Calculate the max value for the Y-axis domain
    const maxWindSpeed = Math.max(...convertedData.map(item => item.windSpeed));
    const maxWindGust = Math.max(...convertedData.map(item => item.windGust));
    const maxYValue = Math.max(maxWindSpeed, maxWindGust);
    
    const Arrow = ({x, y, direction }) => (
        <FaArrowUp 
            style={{
                position: "absolute",
                left: x - 8,
                top: y - 16,
                transform: 'rotate(${direction}deg)',
                fontSize: "16px",
                color: "#3498db"
            }}
        />
    )

    return (
        <ResponsiveContainer width="100%" height='100%'>
            <LineChart data={convertedData}>
                <CartesianGrid strokeDasharray="3 3"/>
                <XAxis dataKey="time" />
                <YAxis 
                    label={{ value: "Wind Speed (mph)", angle: -90, position: "insideLeft" }}
                    domain={[0, Math.ceil(maxYValue)]}/>            
                <Tooltip content={<CustomToolTip />} />
                <legend/>
                <Line type="monotone" dataKey="windGust" stroke="#8884d8" strokeWidth={2} name="Wind Speed" />
                <Line type="monotone" dataKey="windSpeed" stroke="#ff7300" strokeWidth={1} name="Wind Gust"/>
            </LineChart>
        </ResponsiveContainer>
    )
}

export default WindChart