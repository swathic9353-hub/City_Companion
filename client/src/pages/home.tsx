import { useLocation } from "wouter";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { MapPin, TrendingUp } from "lucide-react";

interface CityCardProps {
  name: string;
  cityId: string;
  description: string;
  locationCount: number;
  imageGradient: string;
}

function CityCard({ name, cityId, description, locationCount, imageGradient }: CityCardProps) {
  const [, setLocation] = useLocation();

  return (
    <Card 
      className="overflow-hidden cursor-pointer hover-elevate active-elevate-2 group"
      onClick={() => setLocation(`/city/${cityId}`)}
      data-testid={`card-city-${cityId}`}
    >
      <div className="relative h-72 md:h-96">
        <div className={`absolute inset-0 ${imageGradient}`} />
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/40 to-transparent" />
        <CardContent className="relative h-full flex flex-col justify-end p-6 md:p-8 text-white">
          <Badge 
            variant="secondary" 
            className="mb-4 w-fit bg-white/20 backdrop-blur-sm text-white border-white/30"
            data-testid={`badge-location-count-${cityId}`}
          >
            <MapPin className="w-3 h-3 mr-1" />
            {locationCount} Locations
          </Badge>
          <h2 className="text-4xl md:text-5xl font-bold mb-2" data-testid={`text-city-name-${cityId}`}>
            {name}
          </h2>
          <p className="text-lg text-white/90 mb-4" data-testid={`text-city-description-${cityId}`}>
            {description}
          </p>
          <div className="flex items-center gap-2 text-sm text-white/80">
            <TrendingUp className="w-4 h-4" />
            <span>Real-time updates available</span>
          </div>
        </CardContent>
      </div>
    </Card>
  );
}

export default function Home() {
  const cities = [
    {
      name: "Bangalore",
      cityId: "bangalore",
      description: "The Silicon Valley of India with vibrant culture and modern amenities",
      locationCount: 60,
      imageGradient: "bg-gradient-to-br from-blue-600 via-purple-600 to-pink-600"
    },
    {
      name: "Mangalore",
      cityId: "mangalore",
      description: "Coastal paradise with rich heritage and serene beaches",
      locationCount: 60,
      imageGradient: "bg-gradient-to-br from-teal-600 via-cyan-600 to-blue-600"
    }
  ];

  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-7xl mx-auto px-4 md:px-6 py-12 md:py-16">
        <div className="text-center mb-12 md:mb-16">
          <h1 className="text-4xl md:text-5xl font-bold mb-4 text-foreground" data-testid="text-app-title">
            Your City Companion
          </h1>
          <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto" data-testid="text-app-subtitle">
            Discover the best places in your city. Shopping, dining, events, healthcare, transportation, and education - all in one place.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-6 md:gap-8">
          {cities.map((city) => (
            <CityCard key={city.cityId} {...city} />
          ))}
        </div>

        <div className="mt-16 grid sm:grid-cols-2 md:grid-cols-3 gap-6">
          <Card className="p-6" data-testid="card-feature-categories">
            <div className="text-primary mb-3">
              <MapPin className="w-8 h-8" />
            </div>
            <h3 className="font-semibold text-lg mb-2">6 Categories</h3>
            <p className="text-sm text-muted-foreground">
              Comprehensive coverage of shopping, dining, events, hospitals, bus timing, and schools
            </p>
          </Card>
          <Card className="p-6" data-testid="card-feature-locations">
            <div className="text-primary mb-3">
              <TrendingUp className="w-8 h-8" />
            </div>
            <h3 className="font-semibold text-lg mb-2">120+ Locations</h3>
            <p className="text-sm text-muted-foreground">
              Curated selection of top places across both cities
            </p>
          </Card>
          <Card className="p-6 sm:col-span-2 md:col-span-1" data-testid="card-feature-updates">
            <div className="text-primary mb-3">
              <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
              </svg>
            </div>
            <h3 className="font-semibold text-lg mb-2">Live Traffic Updates</h3>
            <p className="text-sm text-muted-foreground">
              Real-time traffic information and navigation assistance
            </p>
          </Card>
        </div>
      </div>
    </div>
  );
}
