import { z } from "zod";

export const cities = ["bangalore", "mangalore"] as const;
export type City = typeof cities[number];

export const categories = [
  "shopping",
  "dining",
  "events",
  "hospitals",
  "bus-timing",
  "schools"
] as const;
export type Category = typeof categories[number];

export const categoryLabels: Record<Category, string> = {
  shopping: "Shopping",
  dining: "Dining",
  events: "Events",
  hospitals: "Hospitals",
  "bus-timing": "Bus Timing",
  schools: "Schools & Colleges"
};

export interface Location {
  id: string;
  name: string;
  category: Category;
  city: City;
  address: string;
  phone: string;
  hours: string;
  description: string;
  rating: number;
  reviewCount: number;
  latitude: number;
  longitude: number;
  imageUrl?: string;
  amenities: string[];
  isOpen?: boolean;
}

export interface TrafficUpdate {
  id: string;
  city: City;
  routeName: string;
  status: "low" | "moderate" | "heavy";
  eta: string;
  lastUpdated: string;
}

export const locationSchema = z.object({
  id: z.string(),
  name: z.string(),
  category: z.enum(categories),
  city: z.enum(cities),
  address: z.string(),
  phone: z.string(),
  hours: z.string(),
  description: z.string(),
  rating: z.number().min(0).max(5),
  reviewCount: z.number(),
  latitude: z.number(),
  longitude: z.number(),
  imageUrl: z.string().optional(),
  amenities: z.array(z.string()),
  isOpen: z.boolean().optional(),
});

export const trafficUpdateSchema = z.object({
  id: z.string(),
  city: z.enum(cities),
  routeName: z.string(),
  status: z.enum(["low", "moderate", "heavy"]),
  eta: z.string(),
  lastUpdated: z.string(),
});

export type InsertLocation = z.infer<typeof locationSchema>;
export type InsertTrafficUpdate = z.infer<typeof trafficUpdateSchema>;
