import React from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from 'recharts';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
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
  if (!data || data.length === 0) return null;

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
        <div className="h-[350px]">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={convertedData} margin={{ top: 5, right: 20, left: 0, bottom: 5 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" opacity={0.3} />
              <XAxis 
                dataKey="time" 
                tick={{ fill: 'var(--muted-foreground)' }} 
                axisLine={{ stroke: 'var(--border)' }}
              />
              <YAxis 
                domain={[0, Math.ceil(maxYValue)]}
                label={{ 
                  value: "Wind Speed (mph)", 
                  angle: -90, 
                  position: "insideLeft",
                  style: { fill: 'var(--muted-foreground)' }
                }}
                tick={{ fill: 'var(--muted-foreground)' }}
                axisLine={{ stroke: 'var(--border)' }}
              />
              <Tooltip content={<CustomTooltip />} />
              <Legend />
              <Line 
                type="monotone" 
                dataKey="windSpeed" 
                name="Wind Speed" 
                stroke="var(--primary)" 
                strokeWidth={2} 
                dot={{ r: 4 }}
              />
              <Line 
                type="monotone" 
                dataKey="windGust" 
                name="Wind Gust" 
                stroke="var(--destructive)" 
                strokeWidth={2} 
                dot={{ r: 4 }}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
}

export default WindChart;