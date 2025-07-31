import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";

export async function registerRoutes(app: Express): Promise<Server> {
  
  // Categories endpoints
  app.get("/api/categories", async (req, res) => {
    try {
      const categories = await storage.getCategories();
      res.json(categories);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch categories" });
    }
  });

  // Products endpoints
  app.get("/api/products", async (req, res) => {
    try {
      const { category, filter } = req.query;
      
      let products;
      if (category && typeof category === "string") {
        products = await storage.getProductsByCategory(category);
      } else if (filter && typeof filter === "string") {
        products = await storage.getProductsByFilter(filter);
      } else {
        products = await storage.getProducts();
      }
      
      res.json(products);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch products" });
    }
  });

  // Deals endpoints
  app.get("/api/deals", async (req, res) => {
    try {
      const deals = await storage.getActiveDeals();
      res.json(deals);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch deals" });
    }
  });

  // Individual product endpoint
  app.get("/api/products/:id", (req, res) => {
    const productId = req.params.id;
    //const product = products.find(p => p.id === productId);
    storage.getProductById(productId).then(product => {
      if (!product) {
        return res.status(404).json({ error: "Product not found" });
      }
      res.json(product);
    }).catch(error => {
      res.status(500).json({ message: "Failed to fetch product" });
    });

  });  

  const httpServer = createServer(app);
  return httpServer;
}
