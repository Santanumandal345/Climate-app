// import { Coordinates } from './../api/types';
// import type { Coordinates } from "@/api/types"
// import { weatherAPI } from "@/api/weather"
// import { useQuery } from "@tanstack/react-query"
// // define query keys generator functions for diffrent weather related requests, These functions create unique keys for react quary catching system


// export const WEATHER_KEY = {
//     weather: (coords: Coordinates) => ['weather', coords] as const,
//     forecast: (coords: Coordinates) => ['forecast', coords] as const,
//     location: (coords: Coordinates) => ['location', coords] as const,
// }

// // hook to fetch weather data based on given coordinates
// export function useWeatherQuery(Coordinates: Coordinates | null) {
//     return useQuery({
//         //generate a unique key for the query,if no "coordinates" use dummy{lat: 0, lon: 0 },just to maintain the query structure
//         queryKey: WEATHER_KEY.weather(Coordinates ?? { lat: 0, lon: 0 }),
//         //Fetch function :call weatherAPI.getCurrentWeather
//         queryFn: () =>
//             Coordinates ? weatherAPI.getCurrentWeather(Coordinates) : null,
//         //only run the query if Coordinates is not null
//         enabled: !!Coordinates,
//     });
// }
// // hook to perform weather forecast query

// export function useForecastQuery(Coordinates: Coordinates | null) {
//     return useQuery({
//         queryKey: WEATHER_KEY.forecast(Coordinates ?? { lat: 0, lon: 0 }),
//         queryFn: () =>
//             Coordinates ? weatherAPI.getForecast(Coordinates) : null,
//         enabled: !!Coordinates,
//     });
// }

// /// hook to perform reverse geocoding query
// export function useReverseGeocodeQuery(Coordinates: Coordinates | null) {
//     return useQuery({
//         queryKey: WEATHER_KEY.location(Coordinates ?? { lat: 0, lon: 0 }),
//         queryFn: () =>
//             Coordinates ? weatherAPI.reverseGeocode(Coordinates) : null,
//         enabled: !!Coordinates,
//     });
// }
import type { Coordinates } from "@/api/types";
import { weatherAPI } from "@/api/weather";
import { useQuery } from "@tanstack/react-query";

// Define unique keys for React Query
export const WEATHER_KEY = {
  weather: (coords: Coordinates | null) => ["weather", coords ?? { lat: 0, lon: 0 }] as const,
  forecast: (coords: Coordinates | null) => ["forecast", coords ?? { lat: 0, lon: 0 }] as const,
  location: (coords: Coordinates | null) => ["location", coords ?? { lat: 0, lon: 0 }] as const,
};

// Hook to fetch current weather
export function useWeatherQuery(coords: Coordinates | null) {
  return useQuery({
    queryKey: WEATHER_KEY.weather(coords),
    queryFn: () =>
      coords ? weatherAPI.getCurrentWeather(coords) : Promise.resolve(null),
    enabled: !!coords,
  });
}

// Hook to fetch weather forecast
export function useForecastQuery(coords: Coordinates | null) {
  return useQuery({
    queryKey: WEATHER_KEY.forecast(coords),
    queryFn: () =>
      coords ? weatherAPI.getForecast(coords) : Promise.resolve(null),
    enabled: !!coords,
  });
}

// Hook to perform reverse geocoding
export function useReverseGeocodeQuery(coords: Coordinates | null) {
  return useQuery({
    queryKey: WEATHER_KEY.location(coords),
    queryFn: () =>
      coords ? weatherAPI.reverseGeocode(coords) : Promise.resolve(null),
    enabled: !!coords,
  });
}
