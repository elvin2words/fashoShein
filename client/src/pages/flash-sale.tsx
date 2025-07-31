
import React, { useState, useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import { ArrowLeft, Grid3X3, List, ShoppingCart, Eye } from "lucide-react";
import { useLocation } from "wouter";
import type { Product } from "@shared/schema";
import { cn } from "@/lib/utils";
// import { button } from "@/components/ui/button";

export default function FlashSale() {
  const [location, setLocation] = useLocation();
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
  const [timeLeft, setTimeLeft] = useState({
    hours: 4,
    minutes: 0,
    seconds: 0,
    milliseconds: 0
  });

  const { data: products = [] } = useQuery<Product[]>({
    queryKey: ["/api/products"],
    select: (data) => data.filter(p => p.isOnSale),
  });

  const handleCartClick = () => {
    setLocation("/cart");
  };


  // Countdown timer effect
  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(prev => {
        if (prev.milliseconds > 0) {
          return { ...prev, milliseconds: prev.milliseconds - 1 };
        } else if (prev.seconds > 0) {
          return { ...prev, seconds: prev.seconds - 1, milliseconds: 99 };
        } else if (prev.minutes > 0) {
          return { ...prev, minutes: prev.minutes - 1, seconds: 59, milliseconds: 99 };
        } else if (prev.hours > 0) {
          return { ...prev, hours: prev.hours - 1, minutes: 59, seconds: 59, milliseconds: 99 };
        }
        return prev;
      });
    }, 10);

    return () => clearInterval(timer);
  }, []);

  const filters = [
    "Home Appliances",
    "Tools & Home Improvement",
    "Beauty & Personal Care",
    "Health & Household",
    "Sports & Outdoors",
    "Electronics",
    "Fashion"
  ];

  const handleBackClick = () => {
    setLocation("/");
  };

  const formatTime = (num: number) => num.toString().padStart(2, '0');

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-gradient-to-r from-yellow-400 to-orange-500 px-4 py-4">
        <div className="flex items-center justify-between mb-4">
          <button onClick={handleBackClick} className="text-white">
            <ArrowLeft className="h-6 w-6" />
          </button>
          <h1 className="text-white text-lg font-bold">Flash Sale</h1>
          <div className="flex items-center space-x-2">
            <button 
              onClick={() => setViewMode(viewMode === "grid" ? "list" : "grid")}
              className="text-white p-2"
            >
              {viewMode === "grid" ? <List className="h-5 w-5" /> : <Grid3X3 className="h-5 w-5" />}
            </button>
            <div onClick={handleCartClick} className="relative">
              <ShoppingCart className="h-6 w-6 text-white" />
              <div className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                3
              </div>
              <div className="absolute -top3 -right-0 bg-green-500 text-white text-xs rounded-full px-1">
                5%
              </div>
            </div>
          </div>
        </div>

        <div className="text-center">
          <div className="text-white text-sm opacity-90 mb-1">04:00 05/29</div>
          <div className="text-white text-sm font-medium mb-2">On Sale Now</div>
          
          {/* Countdown Timer */}
          <div className="flex justify-center items-center space-x-1 mb-2">
            <span className="text-white text-sm">Ends in</span>
            <div className="flex space-x-1">
              <div className="bg-black text-white px-2 py-1 rounded text-sm font-mono">
                {formatTime(timeLeft.hours)}
              </div>
              <span className="text-white">:</span>
              <div className="bg-black text-white px-2 py-1 rounded text-sm font-mono">
                {formatTime(timeLeft.minutes)}
              </div>
              <span className="text-white">:</span>
              <div className="bg-black text-white px-2 py-1 rounded text-sm font-mono">
                {formatTime(timeLeft.seconds)}
              </div>
              <span className="text-white">:</span>
              <div className="bg-black text-white px-2 py-1 rounded text-sm font-mono">
                {formatTime(timeLeft.milliseconds)}
              </div>
            </div>
          </div>
          
          <div className="text-white text-xs opacity-80">
            Limited purchase of 5 products
          </div>
        </div>
      </div>

      {/* Filter Row */}
      <div className="bg-white px-4 py-3 border-b border-gray-200">
        <div className="flex space-x-3 overflow-x-auto hide-scrollbar">
          {filters.map((filter, index) => (
            <button
              key={filter}
              className={cn(
                "whitespace-nowrap px-4 py-2 rounded-full text-sm font-medium transition-colors",
                index === 0 
                  ? "bg-primary text-white" 
                  : "bg-gray-100 text-gray-700 hover:bg-gray-200"
              )}
            >
              {filter}
            </button>
          ))}
        </div>
      </div>

      {/* Products Grid/List */}
      <div className="p-4">
        {viewMode === "grid" ? (
          <div className="grid grid-cols-2 gap-3">
            {products.map((product) => (
              <div key={product.id} className="bg-white rounded-lg shadow-sm border border-gray-100 overflow-hidden">
                <div className="relative">
                  <img 
                    src={product.imageUrl} 
                    alt={product.title}
                    className="w-full h-32 object-cover"
                  />
                  {product.discount && (
                    <div className="absolute top-2 left-2 bg-red-500 text-white text-xs px-2 py-1 rounded-full font-medium">
                      -{product.discount}%
                    </div>
                  )}
                  <button className="absolute top-2 right-2 text-gray-400 hover:text-red-500">
                    <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z" clipRule="evenodd" />
                    </svg>
                  </button>
                </div>
                <div className="p-3">
                  <p className="text-xs text-gray-600 mb-2 line-clamp-2">{product.title}</p>
                  <div className="flex items-center space-x-2 mb-2">
                    <span className="text-red-500 font-bold text-lg">${product.price}</span>
                    {product.originalPrice && (
                      <span className="text-gray-400 line-through text-sm">${product.originalPrice}</span>
                    )}
                  </div>
                  <div className="flex items-center justify-between text-xs text-gray-500">
                    <span>{Math.floor(Math.random() * 1000)}+ sold recently</span>
                    <div className="bg-red-100 text-red-600 px-2 py-1 rounded-full">
                      {product.discount}%
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="space-y-3">
            {products.map((product) => (
              <div key={product.id} className="bg-white rounded-lg shadow-sm border border-gray-100 overflow-hidden">
                <div className="flex">
                  <div className="relative w-24 h-24">
                    <img 
                      src={product.imageUrl} 
                      alt={product.title}
                      className="w-full h-full object-cover"
                    />
                    {product.discount && (
                      <div className="absolute top-1 left-1 bg-red-500 text-white text-xs px-1 py-0.5 rounded font-medium">
                        -{product.discount}%
                      </div>
                    )}
                  </div>
                  <div className="flex-1 p-3">
                    <p className="text-sm text-gray-800 mb-1 line-clamp-2">{product.title}</p>
                    <div className="flex items-center space-x-2 mb-1">
                      <span className="text-red-500 font-bold text-lg">${product.price}</span>
                      {product.originalPrice && (
                        <span className="text-gray-400 line-through text-sm">${product.originalPrice}</span>
                      )}
                      <div className="bg-red-100 text-red-600 px-2 py-1 rounded-full text-xs">
                        {product.discount}%
                      </div>
                    </div>
                    <div className="text-xs text-gray-500">
                      {Math.floor(Math.random() * 1000)}+ sold recently
                    </div>
                  </div>
                  <div className="p-3 flex items-center">
                    <button className="text-gray-400 hover:text-red-500">
                      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z" clipRule="evenodd" />
                      </svg>
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
