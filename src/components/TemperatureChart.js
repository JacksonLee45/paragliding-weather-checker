import React, { useEffect, useRef } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/card';
import { Thermometer } from 'lucide-react';

const convertToFahrenheit = (value) => ((value - 273.15) * (9/5) + 32).toFixed(2);

const CustomTooltip = ({ active, payload, label }) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-background p-3 rounded-lg border shadow-md text-sm">
        <p className="font-medium mb-1">{label}</p>
        <p className="text-amber-500">Temperature: {payload[0].value}°F</p>
      </div>
    );
  }
  return null;
};

function TemperatureChart({ data }) {
  const chartContainerRef = useRef(null);
  
  useEffect(() => {
    if (chartContainerRef.current) {
      // Force a resize event when the component mounts or updates
      window.dispatchEvent(new Event('resize'));
    }
  }, [data, chartContainerRef]);

  if (!data || data.length === 0) {
    return (
      <Card className="w-full">
        <CardHeader className="pb-2">
          <div className="flex items-center space-x-2">
          <Thermometer className="h-5 w-5 text-amber500" />
            <CardTitle>Temperature Forecast</CardTitle>
          </div>
        </CardHeader>
        <CardContent>
          <div className="h-[350px] flex items-center justify-center">
            <p className="text-muted-foreground">No temperature data available</p>
          </div>
        </CardContent>
      </Card>
    );
  }

  const convertedData = data.map(item => ({
    ...item,
    temperature: parseFloat(convertToFahrenheit(item.temperature))
  }));
  
  const maxTemp = Math.max(...convertedData.map(item => item.temperature));
  const minTemp = Math.min(...convertedData.map(item => item.temperature));

  return (
    <Card className="w-full">
      <CardHeader className="pb-2">
        <div className="flex items-center space-x-2">
        <Thermometer className="h-5 w-5 text-amber-500" />
          <CardTitle>Temperature Forecast</CardTitle>
        </div>
      </CardHeader>
      <CardContent>
        <div ref={chartContainerRef} className="h-[350px] w-full">
        <ResponsiveContainer width="100%" height='100%'>
            <LineChart data={convertedData}>
                <CartesianGrid strokeDasharray="3 3" opacity={0.3}/>
                <XAxis dataKey="time" angle={-45} height={65} textAnchor="end" />
                <YAxis 
                    label={{ value: "Temperature (°F)", angle: -90, position: "insideLeft" }}
                    domain={[Math.floor(minTemp), Math.ceil(maxTemp)]} />              
                <Tooltip content={<CustomTooltip />} />
                <legend/>
                <Line type="natural" dataKey="temperature" stroke="#ffffff" strokeWidth={2} name="Temperature" />
            </LineChart>
        </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
}

export default TemperatureChart;