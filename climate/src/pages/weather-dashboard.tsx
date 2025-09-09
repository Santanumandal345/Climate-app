

import CurrentWeather from "@/components/current-weather";
import HourlyTemperature from "@/components/hourly-temperature";
import WeatherSkeleton from "@/components/loading-skeleton";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import WeatherDetails from "@/components/weather-details";
import WeatherForecast from "@/components/weather-forecast";
import { useGeolocation } from "@/hooks/use-geolocation";
import {
  useForecastQuery,
  useReverseGeocodeQuery,
  useWeatherQuery,
} from "@/hooks/use-weather";
// import { useFavorites } from "@/hooks/use-favorites"; // ✅ import
import { AlertTriangle, MapPin, RefreshCw, Star } from "lucide-react";
import { toast } from "sonner";
import { Link } from "react-router-dom";
import { useFavorites } from "@/hooks/use-favorite";

const WeatherDashboard = () => {
  const {
    coordinates,
    error: locationError,
    isLoading: locationLoading,
    getLocation,
  } = useGeolocation();

  const weatherQuery = useWeatherQuery(coordinates);
  const forecastQuery = useForecastQuery(coordinates);
  const locationQuery = useReverseGeocodeQuery(coordinates);

  const { favorites, addFavorite, removeFavorite, isFavorite } = useFavorites();

  const handleRefresh = () => {
    getLocation();
    if (coordinates) {
      weatherQuery.refetch();
      forecastQuery.refetch();
      locationQuery.refetch();
    }
  };

  const handleToggleFavorite = () => {
    if (!coordinates || !locationName) return;

    const { lat, lon } = coordinates;
    if (isFavorite(lat, lon)) {
      removeFavorite.mutate(`${lat}-${lon}`);
      toast.success("Removed from favorites");
    } else {
      addFavorite.mutate({
        name: locationName.name,
        lat,
        lon,
        country: locationName.country,
        state: locationName.state,
      });
      toast.success("Added to favorites");
    }
  };

  if (locationLoading) {
    return <WeatherSkeleton />;
  }

  if (locationError) {
    return (
      <Alert variant="destructive">
        <AlertTriangle className="h-4 w-4" />
        <AlertTitle>Location Error</AlertTitle>
        <AlertDescription className="flex flex-col gap-4">
          <p>{locationError}</p>
          <Button onClick={getLocation} variant="outline" className="w-fit">
            <MapPin className="mr-2 h-4 w-4" />
            Enable Location
          </Button>
        </AlertDescription>
      </Alert>
    );
  }

  if (!coordinates) {
    return (
      <Alert variant="destructive">
        <AlertTitle>Location Required</AlertTitle>
        <AlertDescription className="flex flex-col gap-4">
          <p>Please enable location access to see your local weather</p>
          <Button onClick={getLocation} variant="outline" className="w-fit">
            <MapPin className="mr-2 h-4 w-4" />
            Enable Location
          </Button>
        </AlertDescription>
      </Alert>
    );
  }

  const locationName = locationQuery.data?.[0];

  if (weatherQuery.error || forecastQuery.error) {
    return (
      <Alert variant="destructive">
        <AlertTriangle className="h-4 w-4" />
        <AlertTitle>Error</AlertTitle>
        <AlertDescription className="flex flex-col gap-4">
          <p>Failed to fetch weather data. Please try again</p>
          <Button onClick={handleRefresh} variant="outline" className="w-fit">
            <RefreshCw className="mr-2 h-4 w-4" />
            Retry
          </Button>
        </AlertDescription>
      </Alert>
    );
  }

  if (!weatherQuery.data || !forecastQuery.data) {
    return <WeatherSkeleton />;
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold tracking-tight">My Location</h1>
        <div className="flex gap-2">
          <Button
            variant={isFavorite(coordinates.lat, coordinates.lon) ? "default" : "outline"}
            size="icon"
            onClick={handleToggleFavorite}
          >
            <Star
              className={`h-4 w-4 ${
                isFavorite(coordinates.lat, coordinates.lon)
                  ? "fill-yellow-400 text-yellow-400"
                  : ""
              }`}
            />
          </Button>
          <Button
            variant="outline"
            size="icon"
            onClick={handleRefresh}
            disabled={weatherQuery.isFetching || forecastQuery.isFetching}
          >
            <RefreshCw
              className={`h-4 w-4 ${weatherQuery.isFetching ? "animate-spin" : ""}`}
            />
          </Button>
        </div>
      </div>

      {/* Current and Hourly Forecast */}
      <div className="grid gap-6">
        <div className="flex flex-col lg:flex-row gap-4">
          <CurrentWeather data={weatherQuery.data} locationName={locationName} />
          <HourlyTemperature data={forecastQuery.data} />
        </div>
        <div className="grid gap-6 md:grid-cols-2 items-start">
          <WeatherDetails data={weatherQuery.data} />
          <WeatherForecast data={forecastQuery.data} />
        </div>
      </div>

      {/* Favorites Section */}
      {favorites.length > 0 && (
        <div>
          <h2 className="text-xl font-semibold mt-6">⭐ Favorite Cities</h2>
          <ul className="grid gap-3 mt-3 md:grid-cols-2 lg:grid-cols-3">
            {favorites.map((city: {
              id: string;
              name: string;
              lat: number;
              lon: number;
              country: string;
              state?: string;
            }) => (
              <li
                key={city.id}
                className="flex items-center justify-between rounded-lg border p-3 shadow-sm"
              >
                <div>
                  <p className="font-medium">{city.name}</p>
                  <p className="text-sm text-muted-foreground">
                    {city.state ? `${city.state}, ` : ""}
                    {city.country}
                  </p>
                </div>
                <div className="flex gap-2">
                  <Link
                    to={`/city/${city.name}?lat=${city.lat}&lon=${city.lon}`}
                  >
                    <Button size="sm" variant="outline">
                      View
                    </Button>
                  </Link>
                  <Button
                    size="sm"
                    variant="destructive"
                    onClick={() => removeFavorite.mutate(city.id)}
                  >
                    Remove
                  </Button>
                </div>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default WeatherDashboard;
