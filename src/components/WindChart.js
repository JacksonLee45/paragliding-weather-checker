import React, { useEffect, useRef } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from 'recharts';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/card';
import { Wind } from 'lucide-react';

const convertToMph = (value) => (value * 2.23694).toFixed(2);

const CustomTooltip = ({ active, payload, label }) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-background p-3 rounded-lg border shadow-md text-sm">
        <p className="font-medium mb-1">{label}</p>
        <p className="text-primary">Wind Speed: {payload[0].value} mph</p>
        <p className="text-destructive">Wind Gust: {payload[1].value} mph</p>
      </div>
    );
  }
  return null;
};

function WindChart({ data }) {
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
            <Wind className="h-5 w-5 text-primary" />
            <CardTitle>Wind Forecast</CardTitle>
          </div>
        </CardHeader>
        <CardContent>
          <div className="h-[350px] flex items-center justify-center">
            <p className="text-muted-foreground">No wind data available</p>
          </div>
        </CardContent>
      </Card>
    );
  }

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

  return (
    <Card className="w-full">
      <CardHeader className="pb-2">
        <div className="flex items-center space-x-2">
          <Wind className="h-5 w-5 text-primary" />
          <CardTitle>Wind Forecast</CardTitle>
        </div>
      </CardHeader>
      <CardContent>
        <div ref={chartContainerRef} className="h-[350px] w-full">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart 
              data={convertedData} 
              margin={{ top: 5, right: 20, left: 20, bottom: 30 }}
            >
              <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" opacity={0.3} />
              <XAxis 
                dataKey="time" 
                tick={{ fill: 'var(--muted-foreground)' }} 
                axisLine={{ stroke: 'var(--border)' }}
                height={50}
                angle={-45}
                textAnchor="end"
              />
              <YAxis 
                domain={[0, Math.ceil(maxYValue) + 1]}
                label={{ 
                  value: "Wind Speed (mph)", 
                  angle: -90, 
                  position: "insideLeft",
                  style: { fill: 'var(--muted-foreground)' }
                }}
                tick={{ fill: 'var(--muted-foreground)' }}
                axisLine={{ stroke: 'var(--border)' }}
                width={70}
              />
              <Tooltip content={<CustomTooltip />} />
              <Legend verticalAlign="top" height={36} />
              <Line 
                type="monotone" 
                dataKey="windSpeed" 
                name="Wind Speed" 
                stroke="var(--primary)" 
                strokeWidth={2} 
                dot={{ r: 4 }}
                isAnimationActive={true}
              />
              <Line 
                type="monotone" 
                dataKey="windGust" 
                name="Wind Gust" 
                stroke="var(--destructive)" 
                strokeWidth={2} 
                dot={{ r: 4 }}
                isAnimationActive={true}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
}

export default WindChart;