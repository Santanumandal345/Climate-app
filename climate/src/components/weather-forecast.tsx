



import type { ForecastData } from "@/api/types"
import { format } from "date-fns";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { ArrowDown, ArrowUp, Droplets, Wind } from "lucide-react";

interface WeatherForecastProps {
  data: ForecastData;
}

interface DailyForecast {
  date: number;
  temp_min: number;
  temp_max: number;
  humidity: number;
  wind: number;
  weather: {
    id: number;
    main: string;
    description: string;
    icon: string;
  };
}

const WeatherForecast = ({ data }: WeatherForecastProps) => {
  const dailyForecasts = data.list.reduce((acc, forecast) => {
    const date = format(new Date(forecast.dt * 1000), "yyyy-MM-dd");
    if (!acc[date]) {
      acc[date] = {
        temp_min: forecast.main.temp_min,
        temp_max: forecast.main.temp_max,
        humidity: forecast.main.humidity,
        wind: forecast.wind.speed,
        weather: forecast.weather[0],
        date: forecast.dt,
      };
    } else {
      acc[date].temp_min = Math.min(acc[date].temp_min, forecast.main.temp_min);
      acc[date].temp_max = Math.max(acc[date].temp_max, forecast.main.temp_max);
    }
    return acc;
  }, {} as Record<string, DailyForecast>);

  const nextFiveDays = Object.values(dailyForecasts)
    .sort((a, b) => a.date - b.date)
    .slice(1, 6);

  const formatTemperature = (temp: number) => `${Math.round(temp)}°`;

  return (
    <Card>
      <CardHeader>
        <CardTitle>5-Day Forecast</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="flex flex-col gap-4">
          {nextFiveDays.map((day) => (
            <div
              key={day.date}
              className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 rounded-lg border p-4"
            >
              {/* Date */}
              <p className="font-medium w-28">
                {format(new Date(day.date * 1000), "EEE, MMM d")}
              </p>

              {/* Weather description */}
              <p className="text-sm text-muted-foreground capitalize flex-1">
                {day.weather.description}
              </p>

              {/* Min/Max Temp */}
              <div className="flex gap-4">
                <span className="flex items-center text-blue-500">
                  <ArrowDown className="mr-1 h-4 w-4" />
                  {formatTemperature(day.temp_min)}
                </span>
                <span className="flex items-center text-red-500">
                  <ArrowUp className="mr-1 h-4 w-4" />
                  {formatTemperature(day.temp_max)}
                </span>
              </div>

              {/* Humidity */}
              <span className="flex items-center gap-1">
                <Droplets className="h-4 w-4 text-blue-500" />
                <span className="text-sm">{day.humidity}%</span>
              </span>

              {/* Wind */}
              <span className="flex items-center gap-1">
                <Wind className="h-4 w-4 text-blue-500" />
                <span className="text-sm">{day.wind} m/s</span>
              </span>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}

export default WeatherForecast;
