


// components/favorite-cities.tsx
import { useFavorites } from "@/hooks/use-favorite";
import { useNavigate } from "react-router-dom";
import { Button } from "./ui/button";

interface FavoriteCity {
  id: string;
  name: string;
  lat: number;
  lon: number;
  state?: string;
  country?: string;
}

export function FavoriteCities() {
  const { favorites, removeFavorite } = useFavorites();
  const navigate = useNavigate();

  if (favorites.length === 0) {
    return <p className="text-muted-foreground">No favorite cities yet.</p>;
  }

  return (
    <div className="space-y-4">
      <h2 className="text-2xl font-bold tracking-tight">Favorite Cities</h2>
      <div className="flex gap-4 flex-wrap">
        {favorites.map((city: FavoriteCity) => (
          <div
            key={city.id}
            className="relative flex min-w-[250px] items-center gap-3 rounded-lg border bg-card p-4 pr-8 shadow-sm transition-all hover:shadow-md cursor-pointer"
            onClick={() =>
              navigate(`/city/${city.name}?lat=${city.lat}&lon=${city.lon}`)
            }
          >
            <div className="flex flex-col">
              <span className="font-semibold">
                {city.name}
                {city.state ? `, ${city.state}` : ""}
              </span>
              <span className="text-sm text-muted-foreground">
                {city.country}
              </span>
            </div>
            <Button
              variant="ghost"
              size="icon"
              className="absolute right-1 top-1 h-6 rounded-full p-0 hover:text-destructive-foreground"
              onClick={(e) => {
                e.stopPropagation();
                removeFavorite.mutate(city.id);
              }}
            >
              ✕
            </Button>
          </div>
        ))}
      </div>
    </div>
  );
}
