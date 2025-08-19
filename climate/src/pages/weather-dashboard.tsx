

// const WeatherDashboard = () => {
//   return (
//     <div>
//       <h1>Weather Dashboard</h1>
//     </div>
//   )
// }

// // export default WeatherDashboard






// import { Button } from '@/components/ui/button'
// import { RefreshCcw } from 'lucide-react'


// import { useGeolocation } from '@/hooks/use-geolocation'

// const WeatherDashboard = () => {
//   const { coordinates, error, isLoading, getLocation } = useGeolocation();
  
//   const handleRefresh = () => {
//     getLocation();
//     if(coordinates) {
//       console.log(`Current coordinates: Latitude ${coordinates.lat}, Longitude ${coordinates.lon}`);
//     }
//   };




//   return (
//     <div className="space-y-4">
//       <div className="flex items-center justify-between">
//       <h1 className="text-3xl font-bold tracking-tight">My Loction</h1>
//         <Button
//           variant="outline"
//           size={"icon"}
          
//         >
//           <RefreshCcw className='h-4 w-4' />
//         </Button>
//       </div>
//     </div>
//   )
// }

// export default WeatherDashboard





// import { Button } from '@/components/ui/button';
// import { RefreshCcw } from 'lucide-react';
// import { useGeolocation } from '@/hooks/use-geolocation';
// import WeatherSkeleton from '@/components/loading-skeleton';

// const WeatherDashboard = () => {
//   const { coordinates, error, isLoading, getLocation, locationLoading } = useGeolocation();

//   const handleRefresh = () => {
//     getLocation();
//     if (coordinates) {
//       console.log(
//         `Current coordinates: Latitude ${coordinates.lat}, Longitude ${coordinates.lon}`
//       );
//     }
//   };


//   if (locationLoading) {
//     return <WeatherSkeleton />;
//   }

//   return (
//     <div className="space-y-4">
//       <div className="flex items-center justify-between">
//         <h1 className="text-3xl font-bold tracking-tight">My Location</h1>
//         <Button
//           variant="outline"
//           size="icon"
//           onClick={handleRefresh}
//         >
//           <RefreshCcw className="h-4 w-4" />
//         </Button>
//       </div>

//       {isLoading && <p>Fetching location...</p>}
//       {error && <p className="text-red-500">{error}</p>}
//       {coordinates && (
//         <p>
//           Latitude: {coordinates.lat}, Longitude: {coordinates.lon}
//         </p>
//       )}
//     </div>
//   );
// };

// export default WeatherDashboard;


// import { useEffect } from 'react';
// import { Button } from '@/components/ui/button';
// import { AlertTriangle, MapPin, RefreshCcw } from 'lucide-react';
// import { useGeolocation } from '@/hooks/use-geolocation';
// import WeatherSkeleton from '@/components/loading-skeleton';
// import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';

// const WeatherDashboard = () => {
//   const { coordinates, error, isLoading, getLocation, locationLoading, locationError } = useGeolocation();

//   const handleRefresh = () => {
//     getLocation();
//   };

//   // Log coordinates whenever they change
//   useEffect(() => {
//     if (coordinates) {
//       console.log(`Current coordinates: Latitude ${coordinates.lat}, Longitude ${coordinates.lon}`);
//     }
//   }, [coordinates]);

//   if (locationLoading) {
//     return <WeatherSkeleton />;
//   }
//   if (locationError) {
//     return (
//       <Alert variant={"destructive"}>
//         <AlertTriangle className="h-4 w-4" />
//         <AlertTitle>Error location</AlertTitle>
//         <AlertDescription className="flex flex-col gap-4">
//           <p>{error}</p>
//           <Button onClick={getLocation} variant={"outline"} className='w-fit'>
//             <MapPin className="h-4 w-4 mr-2" />
//             Retry
//           </Button>
//         </AlertDescription>
//       </Alert>
//     )
//   }


//     return (
//       <div className="space-y-4">
//         <div className="flex items-center justify-between">
//           <h1 className="text-3xl font-bold tracking-tight">My Location</h1>
//           <Button
//             variant="outline"
//             size="icon"
//             onClick={handleRefresh}
//             disabled={isLoading}
//           >
//             <RefreshCcw className={`h-4 w-4 ${isLoading ? 'animate-spin' : ''}`} />
//           </Button>
//         </div>

//         {isLoading && <p>Fetching location...</p>}
//         {error && <p className="text-red-500">{error}</p>}
//         {coordinates && (
//           <p>
//             Latitude: {coordinates.lat}, Longitude: {coordinates.lon}
//           </p>
//         )}
//       </div>
//     );
//   };


// export default WeatherDashboard;





// import { useEffect } from 'react';
// import { Button } from '@/components/ui/button';
// import { AlertTriangle, MapPin, RefreshCcw } from 'lucide-react';
// import { useGeolocation } from '@/hooks/use-geolocation';
// import WeatherSkeleton from '@/components/loading-skeleton';
// import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
// import { useForecastQuery, useReverseGeocodeQuery, useWeatherQuery } from '@/hooks/use-weather';

// const WeatherDashboard = () => {
//   const {
//     coordinates,
//     error,
//     isLoading,
//     getLocation,
//     locationLoading,
//     locationError,
//   } = useGeolocation();
//   const weatherQuery = useWeatherQuery(coordinates);
//   const locationQuery = useReverseGeocodeQuery(coordinates);
//   const forecastQuery = useForecastQuery(coordinates);
//   // console.log(locationQuery);

//   const handleRefresh = () => {
//     getLocation();
//     if (coordinates) {
//       weatherQuery.refetch();
//       locationQuery.refetch();
//       forecastQuery.refetch();
//     }
//   };

//   // Log coordinates whenever they change
//   useEffect(() => {
//     if (coordinates?.lat != null && coordinates?.lon != null) {
//       console.log(
//         `Current coordinates: Lat ${coordinates.lat}, Lon ${coordinates.lon}`
//       );
//     }
//   }, [coordinates]);

//   // Show skeleton while initial location is loading
//   if (locationLoading) {
//     return <WeatherSkeleton />;
//   }

//   // Show error alert if location detection fails
//   if (locationError) {
//     return (
//       <Alert variant="destructive">
//         <AlertTriangle className="h-4 w-4" />
//         <AlertTitle>Location Error</AlertTitle>
//         <AlertDescription className="flex flex-col gap-4">
//           <p>{error || 'Unable to detect your location.'}</p>
//           <Button onClick={getLocation} variant="outline" className="w-fit">
//             <MapPin className="h-4 w-4 mr-2" />
//             Retry
//           </Button>
//         </AlertDescription>
//       </Alert>
//     );
//   }


//   if (!coordinates) {
//     return (
//       <Alert variant={"destructive"}>
//         <AlertTitle>Location required</AlertTitle>
//         <AlertDescription className='flex flex-col gap-4'>
//           <p> Unable to retrieve your location. Please check your device settings.</p>
//           <Button onClick={getLocation} variant={"outline"} className='w-fit'>
//             <MapPin className="mr-2 h-4 w-4" />
//             Enable Location
//           </Button>
//         </AlertDescription>
//       </Alert>
//     );
//   }

//   return (
//     <div className="space-y-4">
//       <div className="flex items-center justify-between">
//         <h1 className="text-3xl font-bold tracking-tight">My Location</h1>
//         <Button
//           variant="outline"
//           size="icon"
//           onClick={handleRefresh}
//           disabled={isLoading}
//         >
//           <RefreshCcw className={`h-4 w-4 ${isLoading ? 'animate-spin' : ''}`} />
//         </Button>
//       </div>

//       {isLoading && <p>Fetching location...</p>}
//       {error && <p className="text-red-500">{error}</p>}
//       {coordinates?.lat != null && coordinates?.lon != null && (
//         <p>
//           Latitude: {coordinates.lat}, Longitude: {coordinates.lon}
//         </p>
//       )}
//     </div>
//   );
// };

// export default WeatherDashboard;



// import { useEffect } from 'react';
// import { Button } from '@/components/ui/button';
// import { AlertTriangle, MapPin, RefreshCcw } from 'lucide-react';
// import { useGeolocation } from '@/hooks/use-geolocation';
// import WeatherSkeleton from '@/components/loading-skeleton';
// import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
// import {
//   useForecastQuery,
//   useReverseGeocodeQuery,
//   useWeatherQuery,
// } from '@/hooks/use-weather';

// const WeatherDashboard = () => {
//   const {
//     coordinates,
//     error,
//     isLoading,
//     getLocation,
//     locationLoading,
//     locationError,
//   } = useGeolocation();

//   const weatherQuery = useWeatherQuery(coordinates);
//   const locationQuery = useReverseGeocodeQuery(coordinates);
//   const forecastQuery = useForecastQuery(coordinates);
//  / console. // console.log('Weather Query:', weatherQuery);
//   // console.log('Location Query:', locationQuery);
//   /log('Forecast Query:', forecastQuery);

//   const handleRefresh = () => {
//     getLocation(); // Only get location — refetch happens in useEffect
//   };

//   // Whenever coordinates change, log and refetch
//   useEffect(() => {
//     if (coordinates?.lat != null && coordinates?.lon != null) {
//       console.log(
//         `Current coordinates: Latitude ${coordinates.lat}, Longitude ${coordinates.lon}`
//       );
//       weatherQuery.refetch();
//       locationQuery.refetch();
//       forecastQuery.refetch();
//     }
//   }, [coordinates]);

//   // Show skeleton while getting location initially
//   if (locationLoading) {
//     return <WeatherSkeleton />;
//   }

//   // Show error if location detection fails
//   if (locationError) {
//     return (
//       <Alert variant="destructive">
//         <AlertTriangle className="h-4 w-4" />
//         <AlertTitle>Location Error</AlertTitle>
//         <AlertDescription className="flex flex-col gap-4">
//           <p>{error || 'Unable to detect your location.'}</p>
//           <Button onClick={getLocation} variant="outline" className="w-fit">
//             <MapPin className="h-4 w-4 mr-2" />
//             Retry
//           </Button>
//         </AlertDescription>
//       </Alert>
//     );
//   }

//   if (!coordinates) {
//     return (
//       <Alert variant="destructive">
//         <AlertTitle>Location required</AlertTitle>
//         <AlertDescription className="flex flex-col gap-4">
//           <p>
//             Unable to retrieve your location. Please check your device settings.
//           </p>
//           <Button onClick={getLocation} variant="outline" className="w-fit">
//             <MapPin className="mr-2 h-4 w-4" />
//             Enable Location
//           </Button>
//         </AlertDescription>
//       </Alert>
//     );
//   }
//   const locationName = locationQuery.data?.[0];
//   if (weatherQuery.error|| forecastQuery.error) {
//     return (
//       <Alert variant="destructive">
//         <AlertTriangle className="h-4 w-4" />
//         <AlertTitle>Error</AlertTitle>
//         <AlertDescription className="flex flex-col gap-4">
//           <p>
//             Failed to fetch weather data. Please try again.
//           </p>
//           <Button onClick={handleRefresh} variant="outline" className="w-fit">
//             <RefreshCcw className="mr-2 h-4 w-4" />
//             Retry
//           </Button>
//         </AlertDescription>
//       </Alert>
//     );
//   }
//   return (
//     <div className="space-y-4">
//       <div className="flex items-center justify-between">
//         <h1 className="text-3xl font-bold tracking-tight">My Location</h1>
//         <Button
//           variant="outline"
//           size="icon"
//           onClick={handleRefresh}
//           disabled={weatherQuery.isFetching || forecastQuery.isFetching}
//         >
//           <RefreshCcw
//             className={`h-4 w-4 ${weatherQuery.isFetching ? 'animate-spin' : ''}`}
//           />
//         </Button>
//       </div>


//       { }
//       <div className='grid gap-6'>
//         <div>
//           { }
//           <CurrentWeather    data={weatherQuery.data} locationName={locationName}/>
//         </div>
//       </div>

      

//       {isLoading && <p>Fetching location...</p>}
//       {error && <p className="text-red-500">{error}</p>}
//       {coordinates?.lat != null && coordinates?.lon != null && (
//         <p>
//           Latitude: {coordinates.lat}, Longitude: {coordinates.lon}
//         </p>
//       )}
//     </div>
//   );
// };

// export default WeatherDashboard;




import { useEffect } from "react";
import { Button } from "@/components/ui/button";
import { AlertTriangle, MapPin, RefreshCcw } from "lucide-react";
import { useGeolocation } from "@/hooks/use-geolocation";
import WeatherSkeleton from "@/components/loading-skeleton";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import {
  useForecastQuery,
  useReverseGeocodeQuery,
  useWeatherQuery,
} from "@/hooks/use-weather";
import CurrentWeather from "@/components/current-weather";

const WeatherDashboard = () => {
  const {
    coordinates,
    error,
    isLoading,
    initialLoading,
    hasCoordinates,
    getLocation,
  } = useGeolocation();

  const weatherQuery = useWeatherQuery(coordinates);
  const locationQuery = useReverseGeocodeQuery(coordinates);
  const forecastQuery = useForecastQuery(coordinates);
   console.log('Weather Query:', weatherQuery);
 console.log('Location Query:', locationQuery);
  console.log('Forecast Query:', forecastQuery);


  const handleRefresh = () => {
    getLocation(); // Only get location — refetch happens in useEffect
  };

  // Refetch when coordinates change
  useEffect(() => {
    if (coordinates?.lat != null && coordinates?.lon != null) {
      console.log(
        `Current coordinates: Latitude ${coordinates.lat}, Longitude ${coordinates.lon}`
      );
      weatherQuery.refetch();
      locationQuery.refetch();
      forecastQuery.refetch();
    }
  }, [coordinates]);

  if(locationLoding){
    return <WeatherSkeleton />;
  }

  // Error: location detection failed
  if (error) {
    return (
      <Alert variant="destructive">
        <AlertTriangle className="h-4 w-4" />
        <AlertTitle>Location Error</AlertTitle>
        <AlertDescription className="flex flex-col gap-4">
          <p>{error || "Unable to detect your location."}</p>
          <Button onClick={getLocation} variant="outline" className="w-fit">
            <MapPin className="h-4 w-4 mr-2" />
            Retry
          </Button>
        </AlertDescription>
      </Alert>
    );
  }

  // No coordinates available
  if (!hasCoordinates) {
    return (
      <Alert variant="destructive">
        <AlertTitle>Location required</AlertTitle>
        <AlertDescription className="flex flex-col gap-4">
          <p>
            Unable to retrieve your location. Please check your device settings.
          </p>
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
          <p>Failed to fetch weather data. Please try again.</p>
          <Button onClick={handleRefresh} variant="outline" className="w-fit">
            <RefreshCcw className="mr-2 h-4 w-4" />
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
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold tracking-tight">My Location</h1>
        <Button
          variant="outline"
          size="icon"
          onClick={handleRefresh}
          disabled={weatherQuery.isFetching || forecastQuery.isFetching}
        >
          <RefreshCcw
            className={`h-4 w-4 ${
              weatherQuery.isFetching ? "animate-spin" : ""
            }`}
          />
        </Button>
      </div>

      <div className="grid gap-6">
        <div>
          {weatherQuery.data && (
            <CurrentWeather
              data={weatherQuery.data}
              locationName={locationName}
            />
          )}
        </div>
      </div>

      {isLoading && !initialLoading && <p>Updating location...</p>}
      {coordinates?.lat != null && coordinates?.lon != null && (
        <p>
          Latitude: {coordinates.lat}, Longitude: {coordinates.lon}
        </p>
      )}
    </div>
  );
};

export default WeatherDashboard;
