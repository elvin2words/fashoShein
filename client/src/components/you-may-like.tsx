import { useQuery } from "@tanstack/react-query";
import { Star } from "lucide-react";
import type { Product } from "@shared/schema";
import { Link } from "react-router-dom"; // Import Link

export default function YouMayLike() {
  const { data: products = [] } = useQuery<Product[]>({
    queryKey: ["/api/products"],
    select: (data) => data.slice(0, 6)
  });

  return (
    <div>
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-bold text-gray-900">You May Also Like</h3>
        <button className="text-sm text-primary font-medium hover:underline">
          View All
        </button>
      </div>

      <div className="grid grid-cols-2 gap-3">
        {products.map((product) => (
          <Link to={`/products/${product.id}`} key={product.id}> {/* Wrap with Link */}
            <div className="bg-white rounded-lg shadow-sm border border-gray-100 overflow-hidden cursor-pointer hover:shadow-md transition-shadow">
              <div className="relative aspect-square">
                <img 
                  src={product.imageUrl} 
                  alt={product.title}
                  className="w-full h-full object-cover"
                />
                {product.discount && (
                  <div className="absolute top-2 left-2 bg-red-500 text-white text-xs px-2 py-1 rounded-full font-medium">
                    -{product.discount}%
                  </div>
                )}
              </div>
              <div className="p-3">
                <h4 className="text-sm font-medium text-gray-900 mb-1 line-clamp-2">{product.title}</h4>
                <div className="flex items-center space-x-1 mb-2">
                  <div className="flex">
                    {Array.from({ length: 5 }, (_, i) => (
                      <Star
                        key={i}
                        className={`h-3 w-3 ${
                          i < Math.floor(parseFloat(product.rating || "0"))
                            ? "text-yellow-400 fill-current"
                            : "text-gray-300"
                        }`}
                      />
                    ))}
                  </div>
                  <span className="text-xs text-gray-500">({product.rating})</span>
                </div>
                <div className="flex items-center space-x-1">
                  <span className="text-primary font-bold text-sm">${product.price}</span>
                  {product.originalPrice && (
                    <span className="text-gray-400 line-through text-xs">${product.originalPrice}</span>
                  )}
                </div>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}