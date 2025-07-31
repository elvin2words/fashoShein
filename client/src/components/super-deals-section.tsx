import { useQuery } from "@tanstack/react-query";
import { ArrowRight } from "lucide-react";
import type { Product } from "@shared/schema";
import { useLocation } from "wouter";


export default function SuperDealsSection() {
  const [location, setLocation] = useLocation();
  

  const { data: products = [] } = useQuery<Product[]>({
    queryKey: ["/api/products"],
    select: (data) => data.filter(p => p.isOnSale).slice(0, 6),
  });

  const handleSuperDealsClick = () => {
    setLocation("/super-deals");
  };

  return (
    <div className="px-4 mb-6">
      <div className="bg-white rounded-lg shadow-sm border border-gray-100 p-4">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-bold text-gray-900">Super Deals</h3>
          <button onClick={handleSuperDealsClick} className="text-sm text-primary font-medium hover:underline">
            View All
          </button>
        </div>
        
        <div className="overflow-x-auto scroll-fade hide-scrollbar">
          <div className="flex space-x-4 pb-2 min-w-max">
            {products.map((product) => (
              <div key={product.id} className="product-card bg-white rounded-lg border border-gray-100 overflow-hidden min-w-40">
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
                </div>
                <div className="p-3">
                  <p className="text-xs text-gray-600 mb-1 line-clamp-1">{product.title}</p>
                  <div className="flex items-center space-x-1 mb-1">
                    <span className="text-sm font-bold text-gray-900">${product.price}</span>
                    {product.originalPrice && (
                      <span className="text-xs text-gray-400 line-through">${product.originalPrice}</span>
                    )}
                  </div>
                  <button className="w-full bg-primary text-white text-xs py-2 rounded-md font-medium hover:bg-primary/90 transition-colors">
                    Save big now!
                  </button>
                </div>
              </div>
            ))}
            
            {/* View More Card */}
            <div onClick={handleSuperDealsClick} className="bg-gray-50 rounded-lg border border-gray-200 min-w-40 flex items-center justify-center cursor-pointer hover:bg-gray-100 transition-colors">
              <div className="text-center p-6">
                <ArrowRight className="h-5 w-5 text-gray-400 mx-auto mb-2" />
                <p className="text-sm text-gray-600 font-medium">View More</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
