
import { useState } from "react";
import { ArrowLeft, ShoppingCart, Package, Clock } from "lucide-react";
import { useLocation } from "wouter";
import { Badge } from "@/components/ui/badge";
import { button } from "@/components/ui/button";

const recommendedProducts = [
  {
    id: "o1",
    title: "Men's Casual Stripe & ...",
    subtitle: "-50% New Great quality",
    price: "$6.40",
    originalPrice: "$12.80",
    image: "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?ixlib=rb-4.0.3&auto=format&fit=crop&w=200&h=200",
    badge: "Trends #SummerHoliday",
    rating: "#1 Bestseller"
  },
  {
    id: "o2",
    title: "Opulessa Summer Ou...",
    subtitle: "-50%",
    price: "$6.13",
    image: "https://images.unsplash.com/photo-1595777457583-95e059d581b8?ixlib=rb-4.0.3&auto=format&fit=crop&w=200&h=200",
    badge: "Trends Opulessa"
  }
];

export default function Orders() {
  const [, setLocation] = useLocation();
  const [cartCount] = useState(8);

  const handleBack = () => {
    setLocation("/profile");
  };

  const handleProductClick = (productId: string) => {
    setLocation(`/product/${productId}`);
  };

  const handleCartClick = (productId: string) => {
    setLocation(`/cart`);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white px-4 py-4 shadow-sm">
        <div className="flex items-center justify-between">
          <button onClick={handleBack} className="text-gray-700">
            <ArrowLeft className="h-6 w-6" />
          </button>
          <h1 className="text-lg font-semibold text-gray-900">Orders</h1>
          <div onClick={handleCartClick} className="relative">
            <ShoppingCart className="h-6 w-6 text-gray-700" />
            {cartCount > 0 && (
              <Badge className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center p-0">
                {cartCount}
              </Badge>
            )}
          </div>
        </div>
      </header>

      {/* Empty State */}
      <div className="flex flex-col items-center justify-center py-20">
        <div className="w-20 h-20 bg-gray-200 rounded-lg flex items-center justify-center mb-4">
          <div className="relative">
            <Package className="h-10 w-10 text-gray-400" />
            <Clock className="h-4 w-4 text-gray-400 absolute -bottom-1 -right-1" />
          </div>
        </div>
        <p className="text-gray-600 text-lg">It is empty here :-(</p>
      </div>

      {/* You May Also Like Section */}
      <div className="px-4 py-6">
        <div className="text-center mb-6">
          <div className="flex items-center justify-center space-x-2 text-gray-500 mb-4">
            <span className="text-sm">◆</span>
            <span className="text-sm font-medium">You May Also Like</span>
            <span className="text-sm">◆</span>
          </div>
        </div>

        {/* Product Grid */}
        <div className="grid grid-cols-2 gap-3">
          {recommendedProducts.map((product) => (
            <div 
              key={product.id} 
              className="bg-white rounded-lg overflow-hidden shadow-sm cursor-pointer"
              onClick={() => handleProductClick(product.id)}
            >
              <div className="relative">
                <img 
                  src={product.image} 
                  alt={product.title}
                  className="w-full h-32 object-cover"
                />
                <div className="absolute top-2 left-2">
                  <Badge className="bg-purple-500 text-white text-xs px-2 py-1">
                    Trends
                  </Badge>
                </div>
              </div>
              
              <div className="p-3">
                <div className="mb-2">
                  <Badge variant="secondary" className="text-xs mb-1">
                    {product.badge?.replace('Trends ', '') || '#SummerHoliday'}
                  </Badge>
                </div>
                
                <h3 className="text-sm font-medium text-gray-900 mb-1 line-clamp-1">
                  {product.title}
                </h3>
                
                {product.subtitle && (
                  <p className="text-xs text-gray-500 mb-2">{product.subtitle}</p>
                )}
                
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-1">
                    <span className="text-primary font-bold text-sm">{product.price}</span>
                    {product.originalPrice && (
                      <span className="text-gray-400 line-through text-xs">{product.originalPrice}</span>
                    )}
                  </div>
                  <button size="sm" variant="outline" className="h-6 px-2">
                    <ShoppingCart className="h-3 w-3" />
                  </button>
                </div>
                
                {product.rating && (
                  <div className="mt-2 text-xs text-orange-500">
                    {product.rating}
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
