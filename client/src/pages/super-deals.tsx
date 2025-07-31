import { useState, useEffect } from "react";
import { ArrowLeft, Heart, Search, Grid3X3, List, ArrowUp, ShoppingCart, Star } from "lucide-react";
import { useLocation } from "wouter";
import { useQuery } from "@tanstack/react-query";
import { cn } from "@/lib/utils";
import type { Product } from "@shared/schema";
// import { button } from "@/components/ui/button";

export default function SuperDeals() {
  const [, setLocation] = useLocation();
  const [searchQuery, setSearchQuery] = useState("");
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
  const [activeFilter, setActiveFilter] = useState("for-you");
  const [showScrollTop, setShowScrollTop] = useState(false);
  const [timeLeft, setTimeLeft] = useState({
    hours: 5,
    minutes: 8,
    seconds: 42
  });

  const { data: products = [] } = useQuery<Product[]>({
    queryKey: ["/api/products"],
    select: (data) => data.filter(p => p.isOnSale),
  });

  const { data: flashSaleProducts = [] } = useQuery<Product[]>({
    queryKey: ["/api/products"],
    select: (data) => data.filter(p => p.isOnSale && p.discount && p.discount > 20).slice(0, 12),
  });

  const filters = [
    { id: "for-you", label: "For You" },
    { id: "women-clothing", label: "Women Clothing" },
    { id: "curve", label: "Curve" },
    { id: "kids", label: "Kids" },
    { id: "shoes", label: "Shoes" },
    { id: "men-clothing", label: "Men Clothing" },
    { id: "home", label: "Home" },
    { id: "beauty", label: "Beauty" },
  ];

  const getFilteredProducts = () => {
    let filtered = products;

    if (searchQuery) {
      filtered = filtered.filter(p => 
        p.title.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    switch (activeFilter) {
      case "women-clothing":
        return filtered.filter(p => p.categoryId === "women");
      case "men-clothing":
        return filtered.filter(p => p.categoryId === "men");
      case "kids":
        return filtered.filter(p => p.categoryId === "kids");
      case "home":
        return filtered.filter(p => p.categoryId === "home");
      default:
        return filtered;
    }
  };

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(prev => {
        if (prev.seconds > 0) {
          return { ...prev, seconds: prev.seconds - 1 };
        } else if (prev.minutes > 0) {
          return { ...prev, minutes: prev.minutes - 1, seconds: 59 };
        } else if (prev.hours > 0) {
          return { ...prev, hours: prev.hours - 1, minutes: 59, seconds: 59 };
        }
        return prev;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      setShowScrollTop(window.scrollY > 400);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <div className="min-h-screen bg-gray-50 pb-20">
      {/* Header */}
      <div className="bg-red-500 text-white px-4 py-3">
        <div className="flex items-center justify-between mb-3">
          <button 
            onClick={() => setLocation("/")}
            className="p-1"
          >
            <ArrowLeft className="h-6 w-6" />
          </button>
          <div className="flex-1 px-3">
            <h1 className="text-lg font-bold">Super Deals to Hot Deals</h1>
          </div>
          <button 
            onClick={() => setLocation("/wishlist")}
            className="p-1"
          >
            <Heart className="h-6 w-6" />
          </button>
        </div>

        {/* Search Bar */}
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
          <input
            type="text"
            placeholder="Search Super Deal Items"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-2 rounded-md text-gray-900 placeholder-gray-400"
          />
        </div>
      </div>

      {/* Flash Sale Section */}
      <div onClick={() => setLocation("/flash-sale")} className="bg-white mx-4 mt-4 rounded-lg border border-gray-200 overflow-hidden">
        <div onClick={() => setLocation("/flash-sale")}  className="bg-gradient-to-r from-orange-400 to-red-500 text-white px-4 py-2 flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <span className="text-sm font-bold">⚡ Flash Sale</span>
          </div>
          <div className="text-sm font-medium">
            Ends in {String(timeLeft.hours).padStart(2, '0')}:
            {String(timeLeft.minutes).padStart(2, '0')}:
            {String(timeLeft.seconds).padStart(2, '0')}
          </div>
        </div>

        <div className="p-3">
          <div className="flex space-x-3 overflow-x-auto hide-scrollbar">
            {flashSaleProducts.map((product) => (
              <div 
                key={product.id} 
                onClick={() => setLocation(`/product/${product.id}`)}
                className="min-w-20 cursor-pointer"
              >
                <div className="relative">
                  <img 
                    src={product.imageUrl} 
                    alt={product.title}
                    className="w-20 h-20 object-cover rounded-md"
                  />
                  {product.discount && (
                    <div className="absolute -top-1 -right-1 bg-red-500 text-white text-xs px-1.5 py-0.5 rounded-full font-bold">
                      -{product.discount}%
                    </div>
                  )}
                </div>
                <div className="mt-1 text-center">
                  <div className="text-xs font-bold text-red-500">${product.price}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Filters */}
      <div className="px-4 mt-4">
        <div className="flex space-x-3 overflow-x-auto hide-scrollbar">
          {filters.map((filter) => (
            <button
              key={filter.id}
              onClick={() => setActiveFilter(filter.id)}
              className={cn(
                "px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-colors",
                activeFilter === filter.id
                  ? "bg-red-500 text-white"
                  : "bg-white text-gray-700 border border-gray-200"
              )}
            >
              {filter.label}
            </button>
          ))}
        </div>
      </div>

      {/* View Toggle */}
      <div className="px-4 mt-4 flex justify-end">
        <div className="flex bg-white rounded-md border border-gray-200 overflow-hidden">
          <button
            onClick={() => setViewMode("grid")}
            className={cn(
              "p-2",
              viewMode === "grid" ? "bg-red-500 text-white" : "text-gray-600"
            )}
          >
            <Grid3X3 className="h-4 w-4" />
          </button>
          <button
            onClick={() => setViewMode("list")}
            className={cn(
              "p-2",
              viewMode === "list" ? "bg-red-500 text-white" : "text-gray-600"
            )}
          >
            <List className="h-4 w-4" />
          </button>
        </div>
      </div>

      {/* Products Grid */}
      <div className="px-4 mt-4">
        <div className={cn(
          viewMode === "grid" 
            ? "grid grid-cols-2 gap-4" 
            : "space-y-4"
        )}>
          {getFilteredProducts().map((product) => (
            <div 
              key={product.id}
              onClick={() => setLocation(`/product/${product.id}`)}
              className={cn(
                "bg-white rounded-lg border border-gray-200 overflow-hidden cursor-pointer hover:shadow-md transition-shadow",
                viewMode === "list" ? "flex" : ""
              )}
            >
              <div className={cn(
                "relative",
                viewMode === "list" ? "w-24 h-24" : "w-full h-40"
              )}>
                <img 
                  src={product.imageUrl} 
                  alt={product.title}
                  className="w-full h-full object-cover"
                />
                {product.discount && (
                  <div className="absolute top-2 left-2 bg-red-500 text-white text-xs px-2 py-1 rounded-full font-bold">
                    -{product.discount}%
                  </div>
                )}
              </div>

              <div className={cn(
                "p-3",
                viewMode === "list" ? "flex-1" : ""
              )}>
                <h3 className={cn(
                  "font-medium text-gray-900 mb-1",
                  viewMode === "list" ? "text-sm line-clamp-2" : "text-sm line-clamp-2"
                )}>
                  {product.title}
                </h3>

                <div className="flex items-center space-x-1 mb-2">
                  <Star className="h-3 w-3 text-yellow-400 fill-current" />
                  <span className="text-xs text-gray-600">{product.rating}</span>
                  <span className="text-xs text-gray-400">({product.reviewCount})</span>
                </div>

                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-1">
                    <span className="text-red-500 font-bold text-sm">${product.price}</span>
                    {product.originalPrice && (
                      <span className="text-xs text-gray-400 line-through">${product.originalPrice}</span>
                    )}
                  </div>
                  {viewMode === "list" && (
                    <button size="sm" className="bg-red-500 hover:bg-red-600 text-xs">
                      Add
                    </button>
                  )}
                </div>

                {viewMode === "grid" && (
                  <button className="w-full mt-2 bg-red-500 hover:bg-red-600 text-xs">
                    Add to Cart
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Floating Action buttons */}
      {showScrollTop && (
        <button
          onClick={scrollToTop}
          className="fixed bottom-24 right-4 bg-white border border-gray-200 text-gray-600 p-3 rounded-full shadow-lg hover:bg-gray-50 transition-colors z-10"
        >
          <ArrowUp className="h-5 w-5" />
        </button>
      )}

      <button
        onClick={() => setLocation("/cart")}
        className="fixed bottom-24 right-16 bg-red-500 text-white p-3 rounded-full shadow-lg hover:bg-red-600 transition-colors z-10"
      >
        <ShoppingCart className="h-5 w-5" />
      </button>
    </div>
  );
}