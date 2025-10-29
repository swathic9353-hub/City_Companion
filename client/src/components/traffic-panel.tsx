import { useQuery } from "@tanstack/react-query";
import { type TrafficUpdate, type City } from "@shared/schema";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { TrendingUp, Clock } from "lucide-react";

interface TrafficPanelProps {
  city: City;
}

export function TrafficPanel({ city }: TrafficPanelProps) {
  const { data: trafficUpdates = [], isLoading } = useQuery<TrafficUpdate[]>({
    queryKey: ["/api/traffic", city],
  });

  if (isLoading) {
    return (
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <TrendingUp className="w-5 h-5" />
            Traffic Updates
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="h-24 bg-muted rounded-md animate-pulse" />
        </CardContent>
      </Card>
    );
  }

  if (!trafficUpdates.length) return null;

  const getStatusColor = (status: TrafficUpdate["status"]) => {
    switch (status) {
      case "low":
        return "bg-green-500/10 text-green-700 dark:text-green-400 border-green-500/20";
      case "moderate":
        return "bg-yellow-500/10 text-yellow-700 dark:text-yellow-400 border-yellow-500/20";
      case "heavy":
        return "bg-red-500/10 text-red-700 dark:text-red-400 border-red-500/20";
    }
  };

  const getStatusLabel = (status: TrafficUpdate["status"]) => {
    switch (status) {
      case "low":
        return "Light Traffic";
      case "moderate":
        return "Moderate Traffic";
      case "heavy":
        return "Heavy Traffic";
    }
  };

  return (
    <Card data-testid="card-traffic-updates">
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-xl">
          <TrendingUp className="w-5 h-5" />
          Live Traffic Updates
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {trafficUpdates.map((update) => (
            <div
              key={update.id}
              className="p-4 rounded-md border bg-card"
              data-testid={`card-traffic-route-${update.id}`}
            >
              <div className="flex items-start justify-between gap-2 mb-3">
                <h4 className="font-medium" data-testid={`text-route-name-${update.id}`}>
                  {update.routeName}
                </h4>
                <Badge
                  variant="outline"
                  className={getStatusColor(update.status)}
                  data-testid={`badge-traffic-status-${update.id}`}
                >
                  {getStatusLabel(update.status)}
                </Badge>
              </div>
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <Clock className="w-4 h-4" />
                <span data-testid={`text-eta-${update.id}`}>ETA: {update.eta}</span>
              </div>
              <p className="text-xs text-muted-foreground mt-2" data-testid={`text-last-updated-${update.id}`}>
                Updated {update.lastUpdated}
              </p>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
