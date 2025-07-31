
import { useState } from "react";
import { ArrowLeft, MoreHorizontal, ShoppingCart, Grid3X3 } from "lucide-react";
import { useLocation } from "wouter";
import { button } from "@/components/ui/button";

const recentlyViewedItems = [
  {
    date: "30 Jul",
    items: [
      {
        id: "1",
        image: "/api/placeholder/150/150",
        price: "$21.00",
        discount: "-30%",
        title: "Men's Casual Shoes"
      }
    ]
  },
  {
    date: "29 Jul",
    items: [
      {
        id: "2",
        image: "/api/placeholder/150/150",
        price: "$9.10",
        discount: "-9%",
        title: "Men's Graphic T-Shirt"
      },
      {
        id: "3",
        image: "/api/placeholder/150/150",
        price: "$15.40",
        discount: "-30%",
        title: "Women's Blazer"
      },
      {
        id: "4",
        image: "/api/placeholder/150/150",
        price: "$28.70",
        discount: "-43%",
        title: "Women's Boots"
      },
      {
        id: "5",
        image: "/api/placeholder/150/150",
        price: "$27.55",
        discount: "-49%",
        title: "Men's Casual Shoes"
      },
      {
        id: "6",
        image: "/api/placeholder/150/150",
        price: "$5.74",
        discount: "-13%",
        title: "Summer Shorts Set"
      },
      {
        id: "7",
        image: "/api/placeholder/150/150",
        price: "$2.46",
        discount: "-39%",
        title: "Lace Lingerie Set"
      },
      {
        id: "8",
        image: "/api/placeholder/150/150",
        price: "$15.99",
        discount: "-20%",
        title: "Women's Dress"
      },
      {
        id: "9",
        image: "/api/placeholder/150/150",
        price: "$12.99",
        discount: "-25%",
        title: "Men's Suit Set"
      }
    ]
  }
];

export default function RecentlyViewed() {
  const [, setLocation] = useLocation();
  const [cartCount] = useState(10);

  const handleBack = () => {
    setLocation("/profile");
  };

  const handleProductClick = (productId: string) => {
    setLocation(`/product/${productId}`);
  };

  const handleCartClick = () => {
    setLocation(`cart`);
  };
  
  const handleSelectItemsClick = () => {
    setLocation(`/history`); // to be implemented 
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white px-4 sticky py-3 flex items-center justify-between shadow-sm">
        <button onClick={handleBack} className="p-2 hover:bg-gray-100 rounded-full transition-colors">
          <ArrowLeft className="h-5 w-5 text-gray-700" />
        </button>
        <h1 className="text-lg font-bold text-gray-900">Recently Viewed</h1>
        <div className="flex items-center space-x-3">
          <button onClick={handleSelectItemsClick} className="p-2 hover:bg-gray-100 rounded-full transition-colors">
            <Grid3X3 className="h-5 w-5 text-gray-700" />
          </button>
          <div className="relative">
            <button onClick={handleCartClick} className="p-2 hover:bg-gray-100 rounded-full transition-colors">
              <ShoppingCart className="h-5 w-5 text-gray-700" />
            </button>
            {cartCount > 0 && (
              <div className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                {cartCount}
              </div>
            )}
          </div>
        </div>
      </header>

      {/* Content */}
      <div className="p-4">
        {recentlyViewedItems.map((section, sectionIndex) => (
          <div key={sectionIndex} className="mb-8">
            {/* Date Header */}
            <h2 className="text-lg font-bold text-gray-900 mb-4">{section.date}</h2>
            
            {/* Items Grid */}
            <div className="grid grid-cols-3 gap-3">
              {section.items.map((item, itemIndex) => (
                <div 
                  key={item.id} 
                  className="bg-white rounded-lg overflow-hidden shadow-sm cursor-pointer hover:shadow-md transition-shadow"
                  onClick={() => handleProductClick(item.id)}
                >
                  <div className="relative">
                    <img 
                      src={item.image} 
                      alt={item.title}
                      className="w-full aspect-square object-cover"
                    />
                    <button className="absolute bottom-2 right-2 w-6 h-6 bg-white rounded-full shadow-md flex items-center justify-center">
                      <span className="text-xs font-bold">1+</span>
                    </button>
                  </div>
                  <div className="p-2">
                    <div className="flex items-center space-x-2 mb-1">
                      <span className="text-sm font-bold text-red-500">{item.price}</span>
                      <span className="text-xs text-gray-500 bg-red-100 px-1 rounded">{item.discount}</span>
                    </div>
                    <button className="text-gray-400 hover:text-gray-600">
                      <MoreHorizontal className="h-4 w-4" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
