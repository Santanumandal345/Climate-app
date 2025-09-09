


// components/favorite-button.tsx
import type { WeatherData } from "@/api/types";
import { Button } from "./ui/button";
import { toast } from "sonner";
import { Star } from "lucide-react";
import { useFavorites } from "@/hooks/use-favorite";

interface FavoriteButtonProps {
  data: WeatherData & { name: string; state?: string };
}

export function FavoriteButton({ data }: FavoriteButtonProps) {
  const { addFavorite, removeFavorite, isFavorite } = useFavorites();
  const id = `${data.coord.lat}-${data.coord.lon}`;
  const currentlyFavorite = isFavorite(data.coord.lat, data.coord.lon);

  const handleToggleFavorite = () => {
    if (currentlyFavorite) {
      removeFavorite.mutate(id);
      toast.error(`Removed ${data.name} from favorites`);
    } else {
      addFavorite.mutate({
        name: data.name,
        lat: data.coord.lat,
        lon: data.coord.lon,
        country: data.sys.country,
        state: data.state, // 👈 save state if present
      });
      toast.success(`Added ${data.name} to favorites`);
    }
  };

  return (
    <Button
      variant={currentlyFavorite ? "default" : "outline"}
      size="icon"
      onClick={handleToggleFavorite}
      className={currentlyFavorite ? "bg-yellow-500 hover:bg-yellow-500" : ""}
    >
      <Star
        className={`h-4 w-4 ${currentlyFavorite ? "fill-current" : ""}`}
      />
    </Button>
  );
}
