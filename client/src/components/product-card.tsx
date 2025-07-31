import { Heart, Star, Clock } from "lucide-react";
import { useState } from "react";
import { cn } from "@/lib/utils";
import type { Product } from "@shared/schema";
import { Badge } from "@/components/ui/badge";
import { useLocation } from "wouter";

interface ProductCardProps {
  product: Product;
}

export default function ProductCard({ product }: ProductCardProps) {
  const [isWishlisted, setIsWishlisted] = useState(false);
  const [, setLocation] = useLocation();

  const toggleWishlist = (e: React.MouseEvent) => {
    e.stopPropagation();
    setIsWishlisted(!isWishlisted);
  };

  const handleProductClick = () => {
    setLocation(`/product/${product.id}`);
  };

  const renderStars = (rating: string) => {
    const numRating = parseFloat(rating);
    const stars = [];
    for (let i = 1; i <= 5; i++) {
      stars.push(
        <Star
          key={i}
          className={cn(
            "h-3 w-3",
            i <= numRating ? "text-yellow-400 fill-current" : "text-gray-300"
          )}
        />
      );
    }
    return stars;
  };

  const getProductTag = () => {
    if (product.isNew) return { text: "New", color: "bg-secondary bg-opacity-10 text-secondary" };
    if (product.isBestSeller) return { text: "Best Seller", color: "bg-green-100 text-green-600" };
    if (product.isTrending) return { text: "Trending", color: "bg-primary bg-opacity-10 text-primary" };
    if (product.tags?.includes("premium")) return { text: "Premium", color: "bg-secondary bg-opacity-10 text-secondary" };
    if (product.tags?.includes("sport")) return { text: "Sport", color: "bg-primary bg-opacity-10 text-primary" };
    return null;
  };

  const tag = getProductTag();

  return (
    <div 
      onClick={handleProductClick}
      className="product-card bg-white rounded-lg shadow-sm border border-gray-100 overflow-hidden cursor-pointer hover:shadow-md transition-shadow"
    >
      <div className="relative">
        <img 
          src={product.imageUrl} 
          alt={product.title}
          className="w-full h-40 object-cover"
        />
        <button 
          onClick={toggleWishlist}
          className="absolute top-2 right-2 bg-white bg-opacity-80 p-1.5 rounded-full hover:bg-opacity-100 transition-all"
        >
          <Heart 
            className={cn(
              "h-4 w-4 transition-colors",
              isWishlisted ? "text-secondary fill-current" : "text-gray-400"
            )}
          />
        </button>
        {product.discount && (
          <div className="absolute top-2 left-2 bg-red-500 text-white text-xs px-2 py-1 rounded-full font-medium">
            -{product.discount}%
          </div>
        )}
      </div>
      
      <div className="p-3">
        <p className="text-sm text-gray-800 mb-1 line-clamp-2">{product.title}</p>
        
        <div className="flex items-center space-x-1 mb-2">
          <div className="flex">
            {renderStars(product.rating || "0")}
          </div>
          <span className="text-xs text-gray-500">({product.rating})</span>
        </div>
        
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-1">
            <span className="text-primary font-bold text-sm">${product.price}</span>
            {product.originalPrice && (
              <span className="text-gray-400 line-through text-xs">${product.originalPrice}</span>
            )}
          </div>
          
          {product.isOnSale && product.discount ? (
            <div className="flex items-center space-x-1 text-accent text-xs">
              <Clock className="h-3 w-3" />
              <span>2h left</span>
            </div>
          ) : tag ? (
            <Badge className={cn("text-xs px-2 py-1 rounded-full border-0", tag.color)}>
              {tag.text}
            </Badge>
          ) : null}
        </div>
      </div>
    </div>
  );
}
