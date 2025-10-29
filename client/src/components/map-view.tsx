import { type Location, type City } from "@shared/schema";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { MapPin, ExternalLink } from "lucide-react";

interface MapViewProps {
  locations: Location[];
  city: City;
}

export function MapView({ locations, city }: MapViewProps) {
  const cityCoordinates = {
    bangalore: { lat: 12.9716, lng: 77.5946, name: "Bangalore" },
    mangalore: { lat: 12.9141, lng: 74.8560, name: "Mangalore" },
  };

  const centerCoords = cityCoordinates[city];

  const openInGoogleMaps = () => {
    if (locations.length > 0) {
      const location = locations[0];
      window.open(
        `https://www.google.com/maps/search/?api=1&query=${location.latitude},${location.longitude}`,
        "_blank"
      );
    } else {
      window.open(
        `https://www.google.com/maps/search/?api=1&query=${centerCoords.lat},${centerCoords.lng}`,
        "_blank"
      );
    }
  };

  return (
    <Card data-testid="card-map-view">
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-xl">
          <MapPin className="w-5 h-5" />
          Location Map
          {locations.length > 0 && (
            <span className="text-sm font-normal text-muted-foreground">
              ({locations.length} locations)
            </span>
          )}
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="relative w-full h-96 bg-gradient-to-br from-blue-50 to-blue-100 dark:from-blue-950 dark:to-blue-900 rounded-md flex flex-col items-center justify-center p-8 text-center">
          <MapPin className="w-20 h-20 text-primary mb-4" />
          <h3 className="text-2xl font-semibold mb-2">
            {locations.length > 0 ? locations[0].name : centerCoords.name}
          </h3>
          {locations.length > 0 ? (
            <>
              <p className="text-muted-foreground mb-1">
                {locations[0].address}
              </p>
              <p className="text-sm text-muted-foreground mb-6">
                Coordinates: {locations[0].latitude.toFixed(4)}, {locations[0].longitude.toFixed(4)}
              </p>
              {locations.length > 1 && (
                <p className="text-sm text-muted-foreground mb-6">
                  + {locations.length - 1} more location{locations.length > 2 ? 's' : ''} in this category
                </p>
              )}
            </>
          ) : (
            <p className="text-muted-foreground mb-6">
              City center location
            </p>
          )}
          <Button
            onClick={openInGoogleMaps}
            size="lg"
            data-testid="button-open-maps"
          >
            <ExternalLink className="w-4 h-4 mr-2" />
            Open in Google Maps
          </Button>
          <p className="text-xs text-muted-foreground mt-4">
            View {locations.length > 0 ? 'all locations' : 'this area'} on Google Maps for navigation
          </p>
        </div>
      </CardContent>
    </Card>
  );
}
