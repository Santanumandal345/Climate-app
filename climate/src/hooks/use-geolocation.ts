
// import { error } from 'console';
// import { get } from 'http';
// import { useState, useEffect } from 'react';
// import type { Coordinates } from '@/api/types';

// // Define the shape of the geolocation state
// interface GeolocationState {
//   coordinates: Coordinates | null;
//   error: string | null;
//   isLoading: boolean;
// }

// // Custom hook to get geolocation
// export function useGeolocation(): {
//   coordinates: Coordinates | null;
//   error: string | null;
//   isLoading: boolean;
//   getLocation: () => void;
// } {
//   const [locationData, setLocationData] = useState<GeolocationState>({
//     coordinates: null,
//     error: null,
//     isLoading: true,
//   });
//   // Function to get the current location
//   const getLocation = () => {
//     setLocationData((prev) => ({ ...prev, isLoading: true, error: null }));
//     if (!navigator.geolocation) {
//       setLocationData({
//         coordinates: null,
//         error: 'Geolocation is not supported by your browser.',
//         isLoading: false,
//       });
//       return;
//     }

//     navigator.geolocation.getCurrentPosition(
//     //sucess call back
//       (position) => {
//         setLocationData({
//           coordinates: {
//             lat: position.coords.latitude,
//             lon: position.coords.longitude,
//           },
//           error: null,
//           isLoading: false,
//         });
//       },

//       // error callback
//       (error) => {
//         let errorMessage: string;

//         //map browser geolocation error codes to user-friendly messages
//         switch (error.code) {
//           case error.PERMISSION_DENIED:
//             errorMessage = 'Location permission denied. Please allow access to your location.';
//             break;
//           case error.POSITION_UNAVAILABLE:
//             errorMessage = 'Location information is unavailable.';
//             break;
//           case error.TIMEOUT:
//             errorMessage = 'The request to get user location timed out.';
//             break;
//           default:
//             errorMessage = 'An unknown error occurred.';
//             // break;
//         }



//         setLocationData({
//           coordinates: null,
//           error: errorMessage,
//           isLoading: false,
//         });
//       },
//       // options for geolocation requests
//       { enableHighAccuracy: true, timeout: 5000, maximumAge: 0 }//try to get the most accurate location
//     );
//   };

//   // automatically get location on mount
//   useEffect(() => {
//     getLocation();
//   }, []);
// // return location data and refetch function
//   return {
//     ...locationData,//Coordinates,error,isLoading
//     getLocation,//allow refetching of location
//   };
// }

// import { useState, useEffect } from 'react';
// import type { Coordinates } from '@/api/types';

// interface GeolocationState {
//   coordinates: Coordinates | null;
//   error: string | null;
//   isLoading: boolean;
// }

// export function useGeolocation(): GeolocationState & { getLocation: () => void } {
//   const [locationData, setLocationData] = useState<GeolocationState>({
//     coordinates: null,
//     error: null,
//     isLoading: true,
//   });

//   const getLocation = () => {
//     setLocationData((prev) => ({ ...prev, isLoading: true, error: null }));

//     if (!navigator.geolocation) {
//       setLocationData({
//         coordinates: null,
//         error: 'Geolocation is not supported by your browser.',
//         isLoading: false,
//       });
//       return;
//     }

//     navigator.geolocation.getCurrentPosition(
//       (position) => {
//         setLocationData({
//           coordinates: {
//             lat: position.coords.latitude,
//             lon: position.coords.longitude,
//           },
//           error: null,
//           isLoading: false,
//         });
//       },
//       (error) => {
//         let errorMessage: string;

//         switch (error.code) {
//           case error.PERMISSION_DENIED:
//             errorMessage = 'Location permission denied. Please allow access to your location.';
//             break;
//           case error.POSITION_UNAVAILABLE:
//             errorMessage = 'Location information is unavailable.';
//             break;
//           case error.TIMEOUT:
//             errorMessage = 'The request to get user location timed out.';
//             break;
//           default:
//             errorMessage = 'An unknown error occurred.';
//         }

//         setLocationData({
//           coordinates: null,
//           error: errorMessage,
//           isLoading: false,
//         });
//       },
//       { enableHighAccuracy: true, timeout: 5000, maximumAge: 0 }
//     );
//   };

//   useEffect(() => {
//     getLocation();
//   }, []);

//   return { ...locationData, getLocation };
// }



// import { useState, useEffect } from 'react';
// import type { Coordinates } from '@/api/types';

// interface GeolocationState {
//   coordinates: Coordinates | null;
//   error: string | null;
//   isLoading: boolean;       // true when fetching location
//   initialLoading: boolean;  // true only during first load
//   hasCoordinates: boolean;  // true if coordinates are available
// }

// export function useGeolocation(): GeolocationState & { getLocation: () => void } {
//   const [locationData, setLocationData] = useState<Omit<GeolocationState, 'hasCoordinates'>>({
//     coordinates: null,
//     error: null,
//     isLoading: false,
//     initialLoading: true,
//   });

//   const getLocation = () => {
//     // Avoid duplicate requests if already loading
//     if (locationData.isLoading) return;

//     setLocationData((prev) => ({
//       ...prev,
//       isLoading: true,
//       error: null,
//     }));

//     if (!navigator.geolocation) {
//       setLocationData({
//         coordinates: null,
//         error: 'Geolocation is not supported by your browser.',
//         isLoading: false,
//         initialLoading: false,
//       });
//       return;
//     }

//     navigator.geolocation.getCurrentPosition(
//       (position) => {
//         setLocationData({
//           coordinates: {
//             lat: position.coords.latitude,
//             lon: position.coords.longitude,
//           },
//           error: null,
//           isLoading: false,
//           initialLoading: false,
//         });
//       },
//       (error) => {
//         let errorMessage: string;

//         switch (error.code) {
//           case error.PERMISSION_DENIED:
//             errorMessage =
//               'Location permission denied. Please allow access to your location.';
//             break;
//           case error.POSITION_UNAVAILABLE:
//             errorMessage = 'Location information is unavailable.';
//             break;
//           case error.TIMEOUT:
//             errorMessage = 'The request to get user location timed out.';
//             break;
//           default:
//             errorMessage = 'An unknown error occurred.';
//         }

//         setLocationData({
//           coordinates: null,
//           error: errorMessage,
//           isLoading: false,
//           initialLoading: false,
//         });
//       },
//       { enableHighAccuracy: true, timeout: 5000, maximumAge: 0 }
//     );
//   };

//   useEffect(() => {
//     getLocation();
//     // eslint-disable-next-line react-hooks/exhaustive-deps
//   }, []);

//   return {
//     ...locationData,
//     hasCoordinates: locationData.coordinates != null,
//     getLocation,
//   };
// }
import { useState, useEffect } from 'react';
import type { Coordinates } from '@/api/types';

interface GeolocationState {
  coordinates: Coordinates | null;
  error: string | null;
  isLoading: boolean;       // true when fetching location
  initialLoading: boolean;  // true only during first load
  hasCoordinates: boolean;  // true if coordinates are available
  locationLoading: boolean; // alias for isLoading (for compatibility)
}

export function useGeolocation(): GeolocationState & { getLocation: () => void } {
  const [locationData, setLocationData] = useState<Omit<GeolocationState, 'hasCoordinates' | 'locationLoading'>>({
    coordinates: null,
    error: null,
    isLoading: false,
    initialLoading: true,
  });

  const getLocation = () => {
    if (locationData.isLoading) return;

    setLocationData((prev) => ({
      ...prev,
      isLoading: true,
      error: null,
    }));

    if (!navigator.geolocation) {
      setLocationData({
        coordinates: null,
        error: 'Geolocation is not supported by your browser.',
        isLoading: false,
        initialLoading: false,
      });
      return;
    }

    navigator.geolocation.getCurrentPosition(
      (position) => {
        setLocationData({
          coordinates: {
            lat: position.coords.latitude,
            lon: position.coords.longitude,
          },
          error: null,
          isLoading: false,
          initialLoading: false,
        });
      },
      (error) => {
        let errorMessage: string;

        switch (error.code) {
          case error.PERMISSION_DENIED:
            errorMessage = 'Location permission denied. Please allow access to your location.';
            break;
          case error.POSITION_UNAVAILABLE:
            errorMessage = 'Location information is unavailable.';
            break;
          case error.TIMEOUT:
            errorMessage = 'The request to get user location timed out.';
            break;
          default:
            errorMessage = 'An unknown error occurred.';
        }

        setLocationData({
          coordinates: null,
          error: errorMessage,
          isLoading: false,
          initialLoading: false,
        });
      },
      { enableHighAccuracy: true, timeout: 5000, maximumAge: 0 }
    );
  };

  useEffect(() => {
    getLocation();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return {
    ...locationData,
    hasCoordinates: locationData.coordinates != null,
    locationLoading: locationData.isLoading || locationData.initialLoading,
    getLocation,
  };
}
