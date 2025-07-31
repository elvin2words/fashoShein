import { useQuery } from "@tanstack/react-query";
import { Flame } from "lucide-react";
import type { Product } from "@shared/schema";

const trendingStores = [
  {
    id: "1",
    name: "Summer Vibes",
    description: "Trendy summer outfits",
    imageUrl: "https://images.unsplash.com/photo-1551107696-a4b0c5a0d9a2?ixlib=rb-4.0.3&auto=format&fit=crop&w=150&h=150",
    isHot: true
  },
  {
    id: "2", 
    name: "Urban Style",
    description: "Street fashion essentials",
    imageUrl: "https://images.unsplash.com/photo-1445205170230-053b83016050?ixlib=rb-4.0.3&auto=format&fit=crop&w=150&h=150",
    isHot: true
  },
  {
    id: "3",
    name: "Minimalist",
    description: "Clean & simple designs", 
    imageUrl: "https://images.unsplash.com/photo-1434389677669-e08b4cac3105?ixlib=rb-4.0.3&auto=format&fit=crop&w=150&h=150",
    isHot: false
  },
  {
    id: "4",
    name: "Boho Chic",
    description: "Bohemian fashion trends",
    imageUrl: "https://images.unsplash.com/photo-1595777457583-95e059d581b8?ixlib=rb-4.0.3&auto=format&fit=crop&w=150&h=150",
    isHot: true
  }
];

export default function TrendsStore() {
  return (
    <div>
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center space-x-2">
          <Flame className="h-5 w-5 text-accent" />
          <h3 className="text-lg font-bold text-gray-900">Trends Store</h3>
        </div>
        <button className="text-sm text-primary font-medium hover:underline">
          View All
        </button>
      </div>
      
      <div className="grid grid-cols-2 gap-3">
        {trendingStores.map((store) => (
          <div key={store.id} className="bg-white rounded-lg shadow-sm border border-gray-100 overflow-hidden cursor-pointer hover:shadow-md transition-shadow">
            <div className="relative aspect-square">
              <img 
                src={store.imageUrl} 
                alt={store.name}
                className="w-full h-full object-cover"
              />
              {store.isHot && (
                <div className="absolute top-2 left-2 bg-accent text-white text-xs px-2 py-1 rounded-full font-medium flex items-center space-x-1">
                  <Flame className="h-3 w-3" />
                  <span>HOT</span>
                </div>
              )}
            </div>
            <div className="p-3">
              <h4 className="text-sm font-semibold text-gray-900 mb-1">{store.name}</h4>
              <p className="text-xs text-gray-600">{store.description}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}