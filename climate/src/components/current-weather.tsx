import type { GeocodingResponse, WeatherData } from "@/api/types";
import { Card, CardContent } from "./ui/card";
import { ArrowDown, Wind } from "lucide-react";

interface CurrentWeatherProps {
  data: WeatherData;
  locationName?: GeocodingResponse;
}

const CurrentWeather = ({ data, locationName }: CurrentWeatherProps) => {
  const {
    weather: [CurrentWeather],
    main: { temp, feels_like, temp_min, temp_max, humidity },
    wind: { speed },
  } = data;
  const formateTemp=(temp:number)=>`${Math.round(temp)}°`

  return (
    <Card className="overflow-hidden">
      <CardContent className="p-6">
        <div className="grid gap-6 md:grid-cols-2">
          <div className="space-y-4">
            <div className="space-y-2">
              <div className="flex items-center">
                <h2 className="text-2xl font-bold tracking-tight">
                  {locationName?.name}
                </h2>
                {locationName?.state && (
                  <span className="text-muted-foreground">
                    , {locationName.state}
                  </span>
                )}
              </div>
              <p className="text-sm text-muted-foreground">
                {locationName?.country}
              </p>
            </div>
            <div className="flex items-center gap-2">
              <p className="text-7xl front-bold tracking-tighter">
                {formateTemp(temp)}

              </p>
              <div className="space-y-1">
                <p className="text-sm font-medium">
                  Feels like{formateTemp(feels_like)}
                </p>
                <div className="flex gap-2 text-sm font-medium">
                  <span className="flex items-center  gap-1 text-blue-500">
                    <ArrowDown className="h-3 w-3 " />
                    {formateTemp(temp_min)}
                  </span>
                  <span className="flex items-center  gap-1 text-red-500">
                    <ArrowDown className="h-3 w-3 " />
                    {formateTemp(temp_max)}
                  </span>
                </div>
              
              </div>

            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="flex items-center gap-2">
                <Droplets className="h-4 h-4 text-blue-500" />
                <div className="space-y-0.5">
                  <p className="text-sm font-medium">Humidity</p>
                  <p className="text-sm text-muted-foreground">{humidity}%</p>

                </div>
              </div>
              <div className="fext items-center gap-2">
                <Wind className="h-4 w-4 text-blue-500" />
                <div className="text-sm font-medium">wind Speed</div>
                <div className="text-sm text-muted-foreground">{speed}m/s</div>
              </div>




            </div>

          </div>
        </div>



        <div className="flext flext-col items-center justify-center">
          <div className="relative flex aspect-square w-full max-w-[200px] items-center justify-center">
            <img
              src={`https://openweathermap.org/img/wn/${CurrentWeather.icon}@4px.png`}
              alt={"CurrentWeather.description"}
            />
            <div className="ab"
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

