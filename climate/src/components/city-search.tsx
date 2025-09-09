

import { Clock, Loader2, Search, Star } from "lucide-react";
import { Button } from "./ui/button";
import {
  Command,
  CommandDialog,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandEmpty,
  CommandList,
  CommandSeparator,
} from "./ui/command";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useLocationSearchQuery } from "@/hooks/use-weather";
import { useSearchHistory } from "@/hooks/use-search-history";
import { format } from "date-fns";
import { useFavorites } from "@/hooks/use-favorite";

export function CitySearch() {
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");
  const navigate = useNavigate();

  const { data: locations = [], isLoading } = useLocationSearchQuery(
    query.length > 2 ? query : ""
  );
  const { favorites } = useFavorites();
  const { history, addToHistory } = useSearchHistory();

  const handleSelect = (cityData: string) => {
    const [lat, lon, name, country] = cityData.split("|");
    addToHistory.mutate({
      query,
      name,
      lat: parseFloat(lat),
      lon: parseFloat(lon),
      country,
    });
    setOpen(false);
    navigate(`/city/${name}?lat=${lat}&lon=${lon}`);
  };

  return (
    <>
      <Button
        variant="outline"
        className="relative w-full justify-start text-sm"
        onClick={() => setOpen(true)}
      >
        <Search className="mr-2 h-4 w-4" />
        Search Cities...
      </Button>

      <CommandDialog open={open} onOpenChange={setOpen}>
        <Command>
          <CommandInput
            placeholder="Search cities..."
            value={query}
            onValueChange={setQuery}
          />

          <CommandList>
            {/* Recent searches */}
            {query.length === 0 && history.length > 0 && (
              <>
                <CommandSeparator />
                <CommandGroup heading="Recent Searches">
                  {history.map((item) => (
                    <CommandItem
                      key={item.id}
                      value={`${item.lat}|${item.lon}|${item.name}|${item.country}`}
                      onSelect={handleSelect}
                    >
                      <Clock className="mr-2 h-4 w-4 text-muted-foreground" />
                      <span>{item.name}</span>
                      {item.state && (
                        <span className="text-sm text-muted-foreground">
                          , {item.state}
                        </span>
                      )}
                      <span className="text-sm text-muted-foreground">
                        , {item.country}
                      </span>
                      <span className="ml-auto text-xs text-muted-foreground">
                        {format(new Date(item.searchedAt), "MMM d, h:mm a")}
                      </span>
                    </CommandItem>
                  ))}
                </CommandGroup>
              </>
            )}

            {/* Loading state */}
            {isLoading && (
              <div className="flex items-center justify-center p-4">
                <Loader2 className="h-4 w-4 animate-spin" />
              </div>
            )}

            {/* Favorites */}
            {favorites.length > 0 && (
              <>
                <CommandSeparator />
                <CommandGroup heading="Favorites">
                  {favorites.map((city) => (
                    <CommandItem
                      key={city.id}
                      value={`${city.lat}|${city.lon}|${city.name}|${city.country}`}
                      onSelect={handleSelect}
                    >
                      <Star className="mr-2 h-4 w-4 text-yellow-500" />
                      <span>{city.name}</span>
                      {city.state && (
                        <span className="text-sm text-muted-foreground">
                          , {city.state}
                        </span>
                      )}
                      <span className="text-sm text-muted-foreground">
                        , {city.country}
                      </span>
                    </CommandItem>
                  ))}
                </CommandGroup>
              </>
            )}

            {/* Empty state */}
            {!isLoading && query.length > 2 && locations.length === 0 && (
              <CommandEmpty>No results found.</CommandEmpty>
            )}

            {/* Suggestions */}
            {locations.length > 0 && (
              <>
                <CommandSeparator />
                <CommandGroup heading="Suggestions">
                  {locations.slice(0, 5).map((location) => (
                    <CommandItem
                      key={`${location.lat}-${location.lon}`}
                      value={`${location.lat}|${location.lon}|${location.name}|${location.country}`}
                      onSelect={handleSelect}
                    >
                      <Search className="mr-2 h-4 w-4" />
                      <span>{location.name}</span>
                      {location.state && (
                        <span className="text-sm text-muted-foreground">
                          , {location.state}
                        </span>
                      )}
                      <span className="text-sm text-muted-foreground">
                        , {location.country}
                      </span>
                    </CommandItem>
                  ))}
                  {locations.length > 5 && (
                    <div className="px-4 py-2 text-xs text-muted-foreground">
                      Showing 5 of {locations.length} results...
                    </div>
                  )}
                </CommandGroup>
              </>
            )}
          </CommandList>
        </Command>
      </CommandDialog>
    </>
  );
}

export default CitySearch;
