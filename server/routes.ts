import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";

export async function registerRoutes(app: Express): Promise<Server> {
  // Get all locations for a city
  app.get("/api/locations/:city", async (req, res) => {
    try {
      const city = req.params.city as "bangalore" | "mangalore";
      
      if (city !== "bangalore" && city !== "mangalore") {
        return res.status(400).json({ error: "Invalid city" });
      }

      const locations = await storage.getLocationsByCity(city);
      res.json(locations);
    } catch (error) {
      console.error("Error fetching locations:", error);
      res.status(500).json({ error: "Failed to fetch locations" });
    }
  });

  // Get locations by city and category
  app.get("/api/locations/:city/:category", async (req, res) => {
    try {
      const city = req.params.city as "bangalore" | "mangalore";
      const category = req.params.category as "shopping" | "dining" | "events" | "hospitals" | "bus-timing" | "schools";
      
      if (city !== "bangalore" && city !== "mangalore") {
        return res.status(400).json({ error: "Invalid city" });
      }

      const validCategories = ["shopping", "dining", "events", "hospitals", "bus-timing", "schools"];
      if (!validCategories.includes(category)) {
        return res.status(400).json({ error: "Invalid category" });
      }

      const locations = await storage.getLocationsByCityAndCategory(city, category);
      res.json(locations);
    } catch (error) {
      console.error("Error fetching locations by category:", error);
      res.status(500).json({ error: "Failed to fetch locations" });
    }
  });

  // Get traffic updates for a city
  app.get("/api/traffic/:city", async (req, res) => {
    try {
      const city = req.params.city as "bangalore" | "mangalore";
      
      if (city !== "bangalore" && city !== "mangalore") {
        return res.status(400).json({ error: "Invalid city" });
      }

      const trafficUpdates = await storage.getTrafficUpdates(city);
      res.json(trafficUpdates);
    } catch (error) {
      console.error("Error fetching traffic updates:", error);
      res.status(500).json({ error: "Failed to fetch traffic updates" });
    }
  });

  const httpServer = createServer(app);

  return httpServer;
}
