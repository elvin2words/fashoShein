import { useQuery } from "@tanstack/react-query";
import { User, Star, Tag, Flame } from "lucide-react";
import { cn } from "@/lib/utils";
import type { Product } from "@shared/schema";
import ProductCard from "./product-card";

interface ProductFeedProps {
  activeCategory: string;
  activeFilter: string;
  onFilterChange: (filter: string) => void;
}

const filterPills = [
  { id: "for-you", label: "For You", icon: User },
  { id: "new", label: "New In", icon: Star },
  { id: "deals", label: "Deals", icon: Tag },
  { id: "bestsellers", label: "Bestsellers", icon: Flame },
];

export default function ProductFeed({ activeCategory, activeFilter, onFilterChange }: ProductFeedProps) {
  const { data: products = [], isLoading } = useQuery<Product[]>({
    queryKey: ["/api/products", { 
      category: activeCategory === "all" ? undefined : activeCategory,
      filter: activeFilter 
    }],
  });

  return (
    <div className="px-4">
      {/* Filter Pills */}
      <div className="flex space-x-3 mb-4 overflow-x-auto scroll-fade hide-scrollbar">
        {filterPills.map((filter) => {
          const Icon = filter.icon;
          return (
            <button
              key={filter.id}
              onClick={() => onFilterChange(filter.id)}
              className={cn(
                "px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap flex items-center space-x-2 transition-colors",
                activeFilter === filter.id
                  ? "bg-primary text-white"
                  : "bg-gray-100 text-gray-700 hover:bg-gray-200"
              )}
            >
              <Icon className="h-3 w-3" />
              <span>{filter.label}</span>
            </button>
          );
        })}
      </div>
      
      {/* Product Grid */}
      <div className="grid grid-cols-2 gap-4">
        {products.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
      
      {/* Load More Indicator */}
      {isLoading && (
        <div className="text-center py-8">
          <div className="animate-spin inline-block w-6 h-6 border-2 border-primary border-t-transparent rounded-full"></div>
          <p className="text-sm text-gray-500 mt-2">Loading more products...</p>
        </div>
      )}
    </div>
  );
}
