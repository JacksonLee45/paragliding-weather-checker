import React from 'react'
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

const convertToFahrenheit = (value) => ((value - 273.15) * (9/5) + 32).toFixed(2);

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
            <p>Temperature: {payload[0].value} *F </p>
            </div>
            );
        }
    return null;
}


function TemperatureChart({data}) {
    if (!data) return null;

    const convertedData = data.map(item => ({
        ...item,
        temperature: parseFloat(convertToFahrenheit(item.temperature))
    }));
    const maxTemp = Math.max(...convertedData.map(item => item.temperature))
    const minTemp = Math.min(...convertedData.map(item => item.temperature))

    return (
        <ResponsiveContainer width="100%" height='100%'>
            <LineChart data={convertedData}>
                <CartesianGrid strokeDasharray="3 3"/>
                <XAxis dataKey="time" />
                <YAxis 
                    label={{ value: "Temperature (*F)", angle: -90, position: "insideLeft" }}
                    domain={[Math.floor(minTemp), Math.ceil(maxTemp)]} />              
                <Tooltip content={<CustomToolTip />} />
                <legend/>
                <Line type="monotone" dataKey="temperature" stroke="#8884d8" strokeWidth={2} name="Temperature" />
            </LineChart>
        </ResponsiveContainer>
    )
}

export default TemperatureChart