import { type Location } from "@shared/schema";
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Phone, Navigation, Star, MapPin, Clock, Wifi, Accessibility } from "lucide-react";
import { useState } from "react";

interface LocationCardProps {
  location: Location;
}

export function LocationCard({ location }: LocationCardProps) {
  const [showFullDescription, setShowFullDescription] = useState(false);

  const handleCall = () => {
    window.location.href = `tel:${location.phone}`;
  };

  const handleNavigate = () => {
    window.open(
      `https://www.google.com/maps/search/?api=1&query=${location.latitude},${location.longitude}`,
      "_blank"
    );
  };

  const getAmenityIcon = (amenity: string) => {
    const lower = amenity.toLowerCase();
    if (lower.includes("wifi")) return <Wifi className="w-3 h-3" />;
    if (lower.includes("parking")) return <span className="text-xs">P</span>;
    if (lower.includes("wheelchair") || lower.includes("accessible")) return <Accessibility className="w-3 h-3" />;
    return null;
  };

  return (
    <Card className="flex flex-col h-full overflow-hidden hover-elevate" data-testid={`card-location-${location.id}`}>
      <div className="relative h-48 bg-muted overflow-hidden">
        {location.imageUrl ? (
          <img
            src={location.imageUrl}
            alt={location.name}
            className="w-full h-full object-cover"
            data-testid={`img-location-${location.id}`}
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-primary/20 to-primary/5">
            <MapPin className="w-16 h-16 text-primary/40" />
          </div>
        )}
        {location.isOpen !== undefined && (
          <Badge
            variant={location.isOpen ? "default" : "secondary"}
            className="absolute top-3 right-3"
            data-testid={`badge-status-${location.id}`}
          >
            {location.isOpen ? "Open Now" : "Closed"}
          </Badge>
        )}
      </div>

      <CardHeader className="space-y-2 pb-4">
        <div className="flex items-start justify-between gap-2">
          <h3 className="font-semibold text-lg leading-tight" data-testid={`text-location-name-${location.id}`}>
            {location.name}
          </h3>
          <div className="flex items-center gap-1 flex-shrink-0">
            <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
            <span className="font-medium text-sm" data-testid={`text-rating-${location.id}`}>
              {location.rating.toFixed(1)}
            </span>
          </div>
        </div>
        <p className="text-sm text-muted-foreground" data-testid={`text-reviews-${location.id}`}>
          {location.reviewCount} reviews
        </p>
      </CardHeader>

      <CardContent className="flex-1 space-y-3 pb-4">
        <div className="flex items-start gap-2 text-sm">
          <MapPin className="w-4 h-4 text-muted-foreground flex-shrink-0 mt-0.5" />
          <span className="text-muted-foreground line-clamp-2" data-testid={`text-address-${location.id}`}>
            {location.address}
          </span>
        </div>

        <div className="flex items-center gap-2 text-sm">
          <Clock className="w-4 h-4 text-muted-foreground flex-shrink-0" />
          <span className="text-muted-foreground" data-testid={`text-hours-${location.id}`}>
            {location.hours}
          </span>
        </div>

        <div>
          <p 
            className={`text-sm text-foreground ${!showFullDescription ? 'line-clamp-2' : ''}`}
            data-testid={`text-description-${location.id}`}
          >
            {location.description}
          </p>
          {location.description.length > 100 && (
            <button
              onClick={() => setShowFullDescription(!showFullDescription)}
              className="text-sm text-primary hover:underline mt-1"
              data-testid={`button-read-more-${location.id}`}
            >
              {showFullDescription ? "Read less" : "Read more"}
            </button>
          )}
        </div>

        {location.amenities.length > 0 && (
          <div className="flex flex-wrap gap-2">
            {location.amenities.slice(0, 3).map((amenity, index) => (
              <Badge
                key={index}
                variant="secondary"
                className="text-xs"
                data-testid={`badge-amenity-${location.id}-${index}`}
              >
                {getAmenityIcon(amenity)}
                <span className="ml-1">{amenity}</span>
              </Badge>
            ))}
          </div>
        )}
      </CardContent>

      <CardFooter className="gap-2 pt-4 border-t flex-wrap">
        <Button
          variant="default"
          className="flex-1"
          onClick={handleNavigate}
          data-testid={`button-navigate-${location.id}`}
        >
          <Navigation className="w-4 h-4 mr-2" />
          Navigate
        </Button>
        <Button
          variant="outline"
          className="flex-1"
          onClick={handleCall}
          data-testid={`button-call-${location.id}`}
        >
          <Phone className="w-4 h-4 mr-2" />
          Call
        </Button>
      </CardFooter>
    </Card>
  );
}
