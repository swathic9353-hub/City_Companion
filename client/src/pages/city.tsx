import { useState } from "react";
import { useParams } from "wouter";
import { useQuery } from "@tanstack/react-query";
import { type Location, type City, type Category, categoryLabels, categories } from "@shared/schema";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Search, Map, ArrowLeft, Navigation } from "lucide-react";
import { LocationCard } from "@/components/location-card";
import { TrafficPanel } from "@/components/traffic-panel";
import { MapView } from "@/components/map-view";
import { useLocation } from "wouter";

export default function CityPage() {
  const { cityId } = useParams<{ cityId: string }>();
  const [, setLocation] = useLocation();
  const [selectedCategory, setSelectedCategory] = useState<Category>("shopping");
  const [searchQuery, setSearchQuery] = useState("");
  const [showMap, setShowMap] = useState(false);

  const { data: locations = [], isLoading } = useQuery<Location[]>({
    queryKey: ["/api/locations", cityId, selectedCategory],
  });

  const { data: allLocations = [] } = useQuery<Location[]>({
    queryKey: ["/api/locations", cityId],
  });

  const filteredLocations = searchQuery
    ? allLocations.filter(
        (loc) =>
          loc.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
          loc.address.toLowerCase().includes(searchQuery.toLowerCase()) ||
          loc.description.toLowerCase().includes(searchQuery.toLowerCase())
      )
    : locations;

  const cityName = cityId === "bangalore" ? "Bangalore" : "Mangalore";

  return (
    <div className="min-h-screen bg-background">
      <header className="sticky top-0 z-40 bg-background/95 backdrop-blur border-b">
        <div className="max-w-7xl mx-auto px-4 md:px-6 py-4">
          <div className="flex items-center gap-4 mb-4">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setLocation("/")}
              data-testid="button-back"
            >
              <ArrowLeft className="w-5 h-5" />
            </Button>
            <div className="flex-1">
              <h1 className="text-2xl md:text-3xl font-bold" data-testid="text-city-name">
                {cityName}
              </h1>
              <p className="text-sm text-muted-foreground">
                Explore the best places in the city
              </p>
            </div>
            <Button
              variant={showMap ? "default" : "outline"}
              size="icon"
              onClick={() => setShowMap(!showMap)}
              data-testid="button-toggle-map"
            >
              {showMap ? <Navigation className="w-5 h-5" /> : <Map className="w-5 h-5" />}
            </Button>
          </div>

          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
            <Input
              type="search"
              placeholder="Search locations, addresses..."
              className="pl-10"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              data-testid="input-search"
            />
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 md:px-6 py-6">
        <Tabs value={selectedCategory} onValueChange={(v) => setSelectedCategory(v as Category)}>
          <div className="mb-6 overflow-x-auto">
            <TabsList className="inline-flex w-full md:w-auto min-w-full md:min-w-0 gap-2" data-testid="tabs-categories">
              {categories.map((category) => (
                <TabsTrigger
                  key={category}
                  value={category}
                  className="flex-shrink-0"
                  data-testid={`tab-${category}`}
                >
                  {categoryLabels[category]}
                </TabsTrigger>
              ))}
            </TabsList>
          </div>

          {showMap && (
            <div className="mb-6">
              <MapView 
                locations={filteredLocations} 
                city={cityId as City}
              />
            </div>
          )}

          <div className="mb-6">
            <TrafficPanel city={cityId as City} />
          </div>

          {categories.map((category) => (
            <TabsContent key={category} value={category} className="mt-0">
              {isLoading ? (
                <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
                  {[...Array(6)].map((_, i) => (
                    <div
                      key={i}
                      className="h-80 bg-card rounded-md animate-pulse"
                      data-testid={`skeleton-location-${i}`}
                    />
                  ))}
                </div>
              ) : searchQuery && filteredLocations.length === 0 ? (
                <div className="text-center py-16" data-testid="text-no-results">
                  <Search className="w-16 h-16 mx-auto text-muted-foreground mb-4" />
                  <h3 className="text-xl font-semibold mb-2">No results found</h3>
                  <p className="text-muted-foreground">
                    Try adjusting your search terms
                  </p>
                </div>
              ) : filteredLocations.length === 0 ? (
                <div className="text-center py-16" data-testid="text-no-locations">
                  <Map className="w-16 h-16 mx-auto text-muted-foreground mb-4" />
                  <h3 className="text-xl font-semibold mb-2">No locations yet</h3>
                  <p className="text-muted-foreground">
                    Check back soon for updates
                  </p>
                </div>
              ) : (
                <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
                  {filteredLocations.map((location) => (
                    <LocationCard key={location.id} location={location} />
                  ))}
                </div>
              )}
            </TabsContent>
          ))}
        </Tabs>
      </div>
    </div>
  );
}
