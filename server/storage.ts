import { type User, type InsertUser, type Category, type Product, type Deal, type InsertCategory, type InsertProduct, type InsertDeal } from "@shared/schema";
import { randomUUID } from "crypto";

export interface IStorage {
  getUser(id: string): Promise<User | undefined>;
  getUserByUsername(username: string): Promise<User | undefined>;
  createUser(user: InsertUser): Promise<User>;
  
  getCategories(): Promise<Category[]>;
  createCategory(category: InsertCategory): Promise<Category>;
  
  getProducts(): Promise<Product[]>;
  getProductsByCategory(categorySlug: string): Promise<Product[]>;
  getProductsByFilter(filter: string): Promise<Product[]>;
  createProduct(product: InsertProduct): Promise<Product>;
  
  getDeals(): Promise<Deal[]>;
  getActiveDeals(): Promise<Deal[]>;
  createDeal(deal: InsertDeal): Promise<Deal>;
}

export class MemStorage implements IStorage {
  private users: Map<string, User>;
  private categories: Map<string, Category>;
  private products: Map<string, Product>;
  private deals: Map<string, Deal>;

  constructor() {
    this.users = new Map();
    this.categories = new Map();
    this.products = new Map();
    this.deals = new Map();
    
    this.seedData();
  }

  private seedData() {
    // Seed categories
    const categoryData = [
      { name: "Women", slug: "women", imageUrl: "https://images.unsplash.com/photo-1594633313593-bab3825d0caf?ixlib=rb-4.0.3&auto=format&fit=crop&w=150&h=150", isActive: true },
      { name: "Curve", slug: "curve", imageUrl: "https://images.unsplash.com/photo-1580489944761-15a19d654956?ixlib=rb-4.0.3&auto=format&fit=crop&w=150&h=150", isActive: true },
      { name: "Kids", slug: "kids", imageUrl: "https://images.unsplash.com/photo-1503919005314-30d93d07d823?ixlib=rb-4.0.3&auto=format&fit=crop&w=150&h=150", isActive: true },
      { name: "Men", slug: "men", imageUrl: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&auto=format&fit=crop&w=150&h=150", isActive: true },
      { name: "Sports", slug: "sports", imageUrl: "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?ixlib=rb-4.0.3&auto=format&fit=crop&w=150&h=150", isActive: true },
      { name: "Jewelry", slug: "jewelry", imageUrl: "https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?ixlib=rb-4.0.3&auto=format&fit=crop&w=150&h=150", isActive: true },
      { name: "Tops", slug: "tops", imageUrl: "https://images.unsplash.com/photo-1445205170230-053b83016050?ixlib=rb-4.0.3&auto=format&fit=crop&w=150&h=150", isActive: true },
      { name: "Home", slug: "home", imageUrl: "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?ixlib=rb-4.0.3&auto=format&fit=crop&w=150&h=150", isActive: true },
      { name: "Home", slug: "home", imageUrl: "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?ixlib=rb-4.0.3&auto=format&fit=crop&w=150&h=150", isActive: true },
      { name: "Home", slug: "home", imageUrl: "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?ixlib=rb-4.0.3&auto=format&fit=crop&w=150&h=150", isActive: true },
      { name: "Home", slug: "home", imageUrl: "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?ixlib=rb-4.0.3&auto=format&fit=crop&w=150&h=150", isActive: true },
    ];
    
    categoryData.forEach(cat => {
      const id = randomUUID();
      this.categories.set(id, { ...cat, id });
    });

    // Seed products
    const womenCategory = Array.from(this.categories.values()).find(c => c.slug === "women");
    const menCategory = Array.from(this.categories.values()).find(c => c.slug === "men");
    const sportsCategory = Array.from(this.categories.values()).find(c => c.slug === "sports");
    
    const productData = [
      // For You products
      {
        title: "Elegant Summer Blouse",
        price: "22.99",
        imageUrl: "https://images.unsplash.com/photo-1551107696-a4b0c5a0d9a2?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&h=300",
        rating: "4.2",
        reviewCount: 85,
        categoryId: womenCategory?.id,
        tags: ["trending"],
        isTrending: true,
      },
      {
        title: "Classic Denim Jeans",
        price: "34.99",
        originalPrice: "41.99",
        imageUrl: "https://images.unsplash.com/photo-1541099649105-f69ad21f3246?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&h=300",
        rating: "4.8",
        reviewCount: 142,
        categoryId: womenCategory?.id,
        discount: 15,
        isOnSale: true,
      },
      {
        title: "Cozy Knit Sweater",
        price: "28.99",
        imageUrl: "https://images.unsplash.com/photo-1434389677669-e08b4cac3105?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&h=300",
        rating: "4.3",
        reviewCount: 67,
        categoryId: womenCategory?.id,
        tags: ["bestseller"],
        isBestSeller: true,
      },
      {
        title: "Designer Handbag",
        price: "29.99",
        originalPrice: "36.99",
        imageUrl: "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&h=300",
        rating: "4.5",
        reviewCount: 123,
        categoryId: womenCategory?.id,
        discount: 18,
        isOnSale: true,
      },
      // New In products
      {
        title: "Stylish Winter Jacket",
        price: "52.99",
        imageUrl: "https://images.unsplash.com/photo-1551028719-00167b16eac5?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&h=300",
        rating: "4.9",
        reviewCount: 203,
        categoryId: womenCategory?.id,
        tags: ["new"],
        isNew: true,
      },
      {
        title: "Men's Casual Shirt",
        price: "24.99",
        imageUrl: "https://images.unsplash.com/photo-1602810318383-e386cc2a3ccf?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&h=300",
        rating: "4.3",
        reviewCount: 89,
        categoryId: menCategory?.id,
        tags: ["new"],
        isNew: true,
      },
      {
        title: "Trendy Crop Top",
        price: "16.99",
        imageUrl: "https://images.unsplash.com/photo-1594633313593-bab3825d0caf?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&h=300",
        rating: "4.1",
        reviewCount: 56,
        categoryId: womenCategory?.id,
        tags: ["new"],
        isNew: true,
      },
      {
        title: "Modern Sneakers",
        price: "45.99",
        imageUrl: "https://images.unsplash.com/photo-1595950653106-6c9ebd614d3a?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&h=300",
        rating: "4.7",
        reviewCount: 178,
        categoryId: sportsCategory?.id,
        tags: ["new"],
        isNew: true,
      },
      // Deals products
      {
        title: "Athletic Sports Bra",
        price: "19.99",
        originalPrice: "24.99",
        imageUrl: "https://images.unsplash.com/photo-1506629905607-21d7d488ee17?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&h=300",
        rating: "4.1",
        reviewCount: 94,
        categoryId: sportsCategory?.id,
        discount: 20,
        tags: ["sport"],
        isOnSale: true,
      },
      {
        title: "Casual Summer Dress",
        price: "18.99",
        originalPrice: "24.99",
        imageUrl: "https://images.unsplash.com/photo-1595777457583-95e059d581b8?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&h=300",
        rating: "4.4",
        reviewCount: 78,
        categoryId: womenCategory?.id,
        discount: 24,
        isOnSale: true,
      },
      {
        title: "Running Sneakers",
        price: "39.99",
        originalPrice: "61.99",
        imageUrl: "https://images.unsplash.com/photo-1549298916-b41d501d3772?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&h=300",
        rating: "4.6",
        reviewCount: 234,
        categoryId: sportsCategory?.id,
        discount: 35,
        isOnSale: true,
      },
      {
        title: "Yoga Leggings",
        price: "22.99",
        originalPrice: "29.99",
        imageUrl: "https://images.unsplash.com/photo-1506629905607-21d7d488ee17?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&h=300",
        rating: "4.2",
        reviewCount: 145,
        categoryId: sportsCategory?.id,
        discount: 23,
        isOnSale: true,
      },
      // Bestsellers products
      {
        title: "Premium Wool Coat",
        price: "89.99",
        imageUrl: "https://images.unsplash.com/photo-1434389677669-e08b4cac3105?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&h=300",
        rating: "4.8",
        reviewCount: 267,
        categoryId: womenCategory?.id,
        tags: ["bestseller"],
        isBestSeller: true,
      },
      {
        title: "Classic White Sneakers",
        price: "32.99",
        imageUrl: "https://images.unsplash.com/photo-1549298916-b41d501d3772?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&h=300",
        rating: "4.9",
        reviewCount: 412,
        categoryId: sportsCategory?.id,
        tags: ["bestseller"],
        isBestSeller: true,
      },
      {
        title: "Elegant Evening Dress",
        price: "89.99",
        imageUrl: "https://images.unsplash.com/photo-1566479179817-c0dd2e0bc1e5?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&h=300",
        rating: "4.7",
        reviewCount: 356,
        categoryId: womenCategory?.id,
        tags: ["bestseller"],
        isBestSeller: true,
      },
      {
        title: "Men's Denim Jacket",
        price: "49.99",
        imageUrl: "https://images.unsplash.com/photo-1551028719-00167b16eac5?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&h=300",
        rating: "4.6",
        reviewCount: 198,
        categoryId: menCategory?.id,
        tags: ["bestseller"],
        isBestSeller: true,
      },
    ];

    productData.forEach(prod => {
      const id = randomUUID();
      this.products.set(id, {
        ...prod,
        id,
        createdAt: new Date(),
        originalPrice: prod.originalPrice || null,
        rating: prod.rating || null,
        reviewCount: prod.reviewCount || 0,
        categoryId: prod.categoryId || null,
        tags: prod.tags || null,
        discount: prod.discount || 0,
        isNew: prod.isNew || false,
        isBestSeller: prod.isBestSeller || false,
        isTrending: prod.isTrending || false,
        isOnSale: prod.isOnSale || false
      });
    });
  }

  async getUser(id: string): Promise<User | undefined> {
    return this.users.get(id);
  }

  async getUserByUsername(username: string): Promise<User | undefined> {
    return Array.from(this.users.values()).find(
      (user) => user.username === username,
    );
  }

  async createUser(insertUser: InsertUser): Promise<User> {
    const id = randomUUID();
    const user: User = { ...insertUser, id };
    this.users.set(id, user);
    return user;
  }

  async getCategories(): Promise<Category[]> {
    return Array.from(this.categories.values()).filter(cat => cat.isActive);
  }

  async createCategory(insertCategory: InsertCategory): Promise<Category> {
    const id = randomUUID();
    const category: Category = { 
      ...insertCategory, 
      id,
      isActive: insertCategory.isActive ?? true
    };
    this.categories.set(id, category);
    return category;
  }

  async getProducts(): Promise<Product[]> {
    return Array.from(this.products.values());
  }

  async getProductsByCategory(categorySlug: string): Promise<Product[]> {
    const category = Array.from(this.categories.values()).find(c => c.slug === categorySlug);
    if (!category) return [];
    
    return Array.from(this.products.values()).filter(product => product.categoryId === category.id);
  }

  async getProductsByFilter(filter: string): Promise<Product[]> {
    const products = Array.from(this.products.values());
    
    switch (filter) {
      case "new":
        return products.filter(p => p.isNew);
      case "deals":
        return products.filter(p => p.isOnSale);
      case "bestsellers":
        return products.filter(p => p.isBestSeller);
      case "for-you":
      default:
        // Return all products sorted by rating for "for you" or default
        return products.sort((a, b) => parseFloat(b.rating || "0") - parseFloat(a.rating || "0"));
    }
  }

  async createProduct(insertProduct: InsertProduct): Promise<Product> {
    const id = randomUUID();
    const product: Product = { 
      ...insertProduct, 
      id, 
      createdAt: new Date(),
      originalPrice: insertProduct.originalPrice || null,
      rating: insertProduct.rating || null,
      reviewCount: insertProduct.reviewCount || 0,
      categoryId: insertProduct.categoryId || null,
      tags: insertProduct.tags || null,
      discount: insertProduct.discount || 0,
      isNew: insertProduct.isNew || false,
      isBestSeller: insertProduct.isBestSeller || false,
      isTrending: insertProduct.isTrending || false,
      isOnSale: insertProduct.isOnSale || false
    };
    this.products.set(id, product);
    return product;
  }

  async getDeals(): Promise<Deal[]> {
    return Array.from(this.deals.values());
  }

  async getActiveDeals(): Promise<Deal[]> {
    return Array.from(this.deals.values()).filter(deal => deal.isActive);
  }

  async createDeal(insertDeal: InsertDeal): Promise<Deal> {
    const id = randomUUID();
    const deal: Deal = { 
      ...insertDeal, 
      id,
      isActive: insertDeal.isActive ?? true,
      endTime: insertDeal.endTime || null
    };
    this.deals.set(id, deal);
    return deal;
  }
}

export const storage = new MemStorage();
