

import type { Coordinates } from "@/api/types";
import { weatherAPI } from "@/api/weather";
import { useQuery } from "@tanstack/react-query";

// Define stable query keys for React Query
export const WEATHER_KEY = {
  weather: (coords: Coordinates | null) =>
    ["weather", coords?.lat ?? 0, coords?.lon ?? 0] as const,
  forecast: (coords: Coordinates | null) =>
    ["forecast", coords?.lat ?? 0, coords?.lon ?? 0] as const,
  location: (coords: Coordinates | null) =>
    ["location", coords?.lat ?? 0, coords?.lon ?? 0] as const,
  search: (query: string) => ["location-search", query] as const,
} as const;

// Hook to fetch current weather
export function useWeatherQuery(coords: Coordinates | null) {
  return useQuery({
    queryKey: WEATHER_KEY.weather(coords),
    queryFn: () => weatherAPI.getCurrentWeather(coords!),
    enabled: !!coords,
  });
}

// Hook to fetch weather forecast
export function useForecastQuery(coords: Coordinates | null) {
  return useQuery({
    queryKey: WEATHER_KEY.forecast(coords),
    queryFn: () => weatherAPI.getForecast(coords!),
    enabled: !!coords,
  });
}

// Hook to perform reverse geocoding
export function useReverseGeocodeQuery(coords: Coordinates | null) {
  return useQuery({
    queryKey: WEATHER_KEY.location(coords),
    queryFn: () => weatherAPI.reverseGeocode(coords!),
    enabled: !!coords,
  });

}
export function useLocationSearchQuery(query: string) {
  return useQuery({
    queryKey: WEATHER_KEY.search(query),
    queryFn: () => weatherAPI.searchLocation(query),
    enabled: query.length >= 3,
  });
}




