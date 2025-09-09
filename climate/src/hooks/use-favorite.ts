

import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { useLocalStorage } from "./use-local-storage";

export interface FavoriteCity {
  id: string;
  name: string; // City name
  lat: number; // Latitude
  lon: number; // Longitude
  country: string; // Country code
  state?: string; // Optional state/region
  addedAt: number; // Timestamp when added
}

export function useFavorites() {
  const [favorites, setFavorites] = useLocalStorage<FavoriteCity[]>(
    "favorites",
    []
  );
  const queryClient = useQueryClient();

  // Store favorites in React Query for reactivity
  const favoritesQuery = useQuery({
    queryKey: ["favorites"],
    queryFn: () => favorites,
    initialData: favorites,
    staleTime: Infinity,
  });

  // Add favorite
  const addFavorite = useMutation({
    mutationFn: async (
      city: Omit<FavoriteCity, "id" | "addedAt">
    ): Promise<FavoriteCity[]> => {
      const newFavorite: FavoriteCity = {
        ...city,
        id: `${city.lat}-${city.lon}`,
        addedAt: Date.now(),
      };

      const exists = favorites.some((fav) => fav.id === newFavorite.id);
      if (exists) return favorites;

      const newFavorites = [...favorites, newFavorite];
      setFavorites(newFavorites);
      return newFavorites;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["favorites"] });
    },
  });

  // Remove favorite
  const removeFavorite = useMutation({
    mutationFn: async (cityId: string): Promise<FavoriteCity[]> => {
      const newFavorites = favorites.filter((city) => city.id !== cityId);
      setFavorites(newFavorites);
      return newFavorites;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["favorites"] });
    },
  });

  // Utility: check if a city is already favorite
  const isFavorite = (lat: number, lon: number) =>
    favorites.some((city) => city.lat === lat && city.lon === lon);

  return {
    favorites: favoritesQuery.data || [],
    addFavorite,
    removeFavorite,
    isFavorite,
  };
}
