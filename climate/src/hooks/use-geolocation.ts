


import { useState, useEffect, useCallback } from "react";
import type { Coordinates } from "@/api/types";

interface GeolocationState {
  coordinates: Coordinates | null;
  error: string | null;
  isLoading: boolean;       // true when fetching location
  initialLoading: boolean;  // true only during first load
}

type GeolocationHook =
  | (GeolocationState & { hasCoordinates: false; locationLoading: boolean; getLocation: () => void })
  | (GeolocationState & { hasCoordinates: true; coordinates: Coordinates; locationLoading: boolean; getLocation: () => void });

export function useGeolocation(): GeolocationHook {
  const [locationData, setLocationData] = useState<GeolocationState>({
    coordinates: null,
    error: null,
    isLoading: false,
    initialLoading: true,
  });

  const getLocation = useCallback(() => {
    setLocationData((prev) => {
      if (prev.isLoading) return prev; // avoid duplicate calls
      return { ...prev, isLoading: true, error: null };
    });

    if (typeof navigator === "undefined" || !navigator.geolocation) {
      setLocationData({
        coordinates: null,
        error: "Geolocation is not supported by your browser.",
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
            errorMessage = "Location permission denied. Please allow access.";
            break;
          case error.POSITION_UNAVAILABLE:
            errorMessage = "Location information is unavailable.";
            break;
          case error.TIMEOUT:
            errorMessage = "The request to get user location timed out.";
            break;
          default:
            errorMessage = "An unknown error occurred.";
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
  }, []);

  useEffect(() => {
    getLocation();
  }, [getLocation]);

  return {
    ...locationData,
    hasCoordinates: locationData.coordinates != null,
    locationLoading: locationData.isLoading || locationData.initialLoading,
    getLocation,
  } as GeolocationHook;
}
