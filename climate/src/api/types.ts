// // import { ForecastData } from './types';
// export interface Coordinates {
//     lat: number;
//     lon: number;
// }
    
// export interface WeatherCondition {
//     id: number;
//     main: string;
//     description: string;
//     icon: string;
// }
// export interface WeatherData {
//     coord: Coordinates;
//     weather: WeatherCondition[];
//     base: string;
//     main: {
//         temp: number;
//         feels_like: number;
//         temp_min: number;
//         temp_max: number;
//         pressure: number;
//         humidity: number;
//     };
//     visibility: number;
//     wind: {
//         speed: number;
//         deg: number;
//     };
//     clouds: {
//         all: number;
//     };
//     dt: number;
//     sys: {
//         type: number;
//         id: number;
//         country: string;
//         sunrise: number;
//         sunset: number;
//     };
//     timezone: number;
//     id: number;
//     name: string;
//     cod: number;
// }




// export interface ForecastData {

//     list: Array<{
//         dt: number;
//         main: WeatherData['main'];
//         weather: WeatherData['weather'];
//         wind: WeatherData['wind'];
//         dt_txt: string;
//         // clouds: WeatherData['clouds'];
//         // visibility: WeatherData['visibility'];
//     }>;
//     city: {
       
//         name: string;
//         country: string;
//         sunrise: number;
//         sunset: number;
//     };
// }



// export interface GeocodingResponse {
//     name: string;
//     local_names: Record<string, string>;
//     country: string;
//     lat: number;
//     lon: number;
//     state?: string;
// }


// types.ts

// ====================
// Core Types
// ====================

export interface Coordinates {
  lat: number;
  lon: number;
}

export interface WeatherCondition {
  id: number;
  main: string;
  description: string;
  icon: string;
}

// ====================
// Current Weather Data
// ====================

export interface WeatherData {
  coord: Coordinates;
  weather: WeatherCondition[];
  base: string;
  main: {
    temp: number;
    feels_like: number;
    temp_min: number;
    temp_max: number;
    pressure: number;
    humidity: number;
    sea_level?: number; // sometimes included
    grnd_level?: number; // sometimes included
  };
  visibility: number;
  wind: {
    speed: number;
    deg: number;
    gust?: number;
  };
  clouds: {
    all: number;
  };
  dt: number;
  sys: {
    type?: number;
    id?: number;
    country: string;
    sunrise: number;
    sunset: number;
  };
  timezone: number;
  id: number;
  name: string;
  cod: number;
}

// ====================
// Forecast Data
// ====================

export interface ForecastData {
  list: Array<{
    dt: number;
    main: {
      temp: number;
      feels_like: number;
      temp_min: number;
      temp_max: number;
      pressure: number;
      humidity: number;
      sea_level?: number;
      grnd_level?: number;
    };
    weather: WeatherCondition[];
    wind: {
      speed: number;
      deg: number;
      gust?: number;
    };
    clouds?: {
      all: number;
    };
    visibility?: number;
    dt_txt: string;
  }>;
  city: {
    name: string;
    country: string;
    sunrise: number;
    sunset: number;
  };
}

// ====================
// Geocoding Response
// ====================

export interface GeocodingResponse {
  name: string;
  local_names?: Record<string, string>;
  country: string;
  lat: number;
  lon: number;
  state?: string;
}
