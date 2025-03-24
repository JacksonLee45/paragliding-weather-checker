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
            <Thermometer className="h-5 w-5 text-amber-500" />
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
                domain={[Math.floor(minTemp - 2), Math.ceil(maxTemp + 2)]}
                label={{
                  value: "Temperature (°F)",
                  angle: -90,
                  position: "insideLeft",
                  style: { fill: 'var(--muted-foreground)' }
                }}
                tick={{ fill: 'var(--muted-foreground)' }}
                axisLine={{ stroke: 'var(--border)' }}
                width={70}
              />
              <Tooltip content={<CustomTooltip />} />
              <Line
                type="monotone"
                dataKey="temperature"
                name="Temperature"
                stroke="var(--amber-500)"
                strokeWidth={2}
                dot={{ r: 4, stroke: 'var(--amber-500)', fill: 'var(--amber-500)' }}
                activeDot={{ r: 6, stroke: 'var(--amber-600)', fill: 'var(--amber-600)' }}
                isAnimationActive={true}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
}

export default TemperatureChart;