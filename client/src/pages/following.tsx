
import { useState } from "react";
import { ArrowLeft, ShoppingCart, Star } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useLocation } from "wouter";

const trendingStores = [
  {
    id: "1",
    name: "CasualTJcw...",
    price: "$2.00",
    image: "https://images.unsplash.com/photo-1566479179817-c0dd2e0bc1e5?ixlib=rb-4.0.3&auto=format&fit=crop&w=150&h=150"
  },
  {
    id: "2", 
    name: "halee",
    price: "$12.00",
    image: "https://images.unsplash.com/photo-1434389677669-e08b4cac3105?ixlib=rb-4.0.3&auto=format&fit=crop&w=150&h=150"
  },
  {
    id: "3",
    name: "SHEIN Lady",
    price: "$15.00", 
    image: "https://images.unsplash.com/photo-1551028719-00167b16eac5?ixlib=rb-4.0.3&auto=format&fit=crop&w=150&h=150"
  },
  {
    id: "4",
    name: "new world je...",
    price: "$2.00",
    image: "https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?ixlib=rb-4.0.3&auto=format&fit=crop&w=150&h=150"
  }
];

const followingBrands = [
  {
    id: "cozy-pixies",
    name: "Cozy Pixies",
    rating: 4.96,
    badge: "Trends",
    products: [
      {
        id: "cp1",
        image: "https://images.unsplash.com/photo-1551028719-00167b16eac5?ixlib=rb-4.0.3&auto=format&fit=crop&w=150&h=150",
        price: "$8.79"
      },
      {
        id: "cp2", 
        image: "https://images.unsplash.com/photo-1434389677669-e08b4cac3105?ixlib=rb-4.0.3&auto=format&fit=crop&w=150&h=150",
        price: "$3.99"
      },
      {
        id: "cp3",
        image: "https://images.unsplash.com/photo-1566479179817-c0dd2e0bc1e5?ixlib=rb-4.0.3&auto=format&fit=crop&w=150&h=150", 
        price: "$11.19"
      },
      {
        id: "cp4",
        image: "https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?ixlib=rb-4.0.3&auto=format&fit=crop&w=150&h=150",
        price: "$9.99"
      }
    ]
  },
  {
    id: "glamine", 
    name: "Glamine",
    rating: 4.92,
    badge: "Trends",
    products: [
      {
        id: "gl1",
        image: "https://images.unsplash.com/photo-1602810318383-e386cc2a3ccf?ixlib=rb-4.0.3&auto=format&fit=crop&w=150&h=150",
        price: "$17.00"
      },
      {
        id: "gl2",
        image: "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?ixlib=rb-4.0.3&auto=format&fit=crop&w=150&h=150",
        price: "$9.50"
      },
      {
        id: "gl3", 
        image: "https://images.unsplash.com/photo-1595777457583-95e059d581b8?ixlib=rb-4.0.3&auto=format&fit=crop&w=150&h=150",
        price: "$7.50"
      },
      {
        id: "gl4",
        image: "https://images.unsplash.com/photo-1571513722275-4b41940f54b8?ixlib=rb-4.0.3&auto=format&fit=crop&w=150&h=150",
        price: "$8.30"
      }
    ]
  },
  {
    id: "freya",
    name: "Freya", 
    rating: 4.97,
    badge: "Trends",
    products: [
      {
        id: "fr1",
        image: "https://images.unsplash.com/photo-1594633313593-bab3825d0caf?ixlib=rb-4.0.3&auto=format&fit=crop&w=150&h=150",
        price: "$12.50"
      },
      {
        id: "fr2",
        image: "https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?ixlib=rb-4.0.3&auto=format&fit=crop&w=150&h=150", 
        price: "$15.30"
      },
      {
        id: "fr3",
        image: "https://images.unsplash.com/photo-1549298916-b41d501d3772?ixlib=rb-4.0.3&auto=format&fit=crop&w=150&h=150",
        price: "$8.80"
      },
      {
        id: "fr4",
        image: "https://images.unsplash.com/photo-1602810318383-e386cc2a3ccf?ixlib=rb-4.0.3&auto=format&fit=crop&w=150&h=150",
        price: "$22.90"
      }
    ]
  }
];

const tabs = [
  { id: "following", label: "Following(1)" },
  { id: "browsed", label: "Browsed" },
  { id: "purchased", label: "Purchased" }
];

export default function Following() {
  const [, setLocation] = useLocation();
  const [activeTab, setActiveTab] = useState("following");
  const [cartCount] = useState(1);

  const handleBack = () => {
    setLocation("/profile");
  };

  const handleProductClick = (productId: string) => {
    setLocation(`/product/${productId}`);
  };

  const handleTrendsClick = () => {
    setLocation(`/trends`);
  };  

  const handleBrandClick = (brandId: string) => {
    setLocation(`/brand/${brandId}`);
  };

  const handleCartClick = () => {
    setLocation(`cart`);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white px-4 py-3 flex items-center justify-between shadow-sm">
        <button onClick={handleBack} className="p-2 hover:bg-gray-100 rounded-full transition-colors">
          <ArrowLeft className="h-5 w-5 text-gray-700" />
        </button>
        <h1 className="text-lg font-bold text-gray-900">Following</h1>
        <div onClick={handleCartClick} className="relative">
          <button className="p-2 hover:bg-gray-100 rounded-full transition-colors">
            <ShoppingCart className="h-5 w-5 text-gray-700" />
          </button>
          {cartCount > 0 && (
            <div className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
              {cartCount}
            </div>
          )}
        </div>
      </header>

      {/* Trends Store Section */}
      <div className="mx-4 mt-4 p-4 bg-gradient-to-r from-purple-400 to-purple-600 rounded-lg text-white">
        <div onClick={handleTrendsClick} className="flex items-center justify-between mb-3">
          <div>
            <h2 className="text-lg font-bold">Trends Store</h2>
            <p className="text-sm opacity-90">🛍️ 1000+ Stores to explore</p>
          </div>
          <button className="text-sm font-medium hover:underline">
            View More &gt;
          </button>
        </div>
        
        <div className="grid grid-cols-4 gap-3">
          {trendingStores.map((store) => (
            // <div onClick={handleBrandClick} key={store.id} className="bg-white/90 rounded-lg p-2 text-center">
            <div onClick={() => handleBrandClick(brand.id)} key={store.id} className="bg-white/90 rounded-lg p-2 text-center">
              <img 
                src={store.image} 
                alt={store.name}
                className="w-full h-16 object-cover rounded-md mb-1"
              />
              <p className="text-xs font-medium text-gray-900 truncate">{store.name}</p>
              <p className="text-xs font-bold text-gray-900">{store.price}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Tabs */}
      <div className="bg-white mx-4 mt-4 rounded-lg overflow-hidden shadow-sm">
        <div className="flex border-b border-gray-200">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={cn(
                "flex-1 py-3 px-4 text-sm font-medium transition-colors",
                activeTab === tab.id
                  ? "text-purple-600 border-b-2 border-purple-600 bg-purple-50"
                  : "text-gray-600 hover:bg-gray-50"
              )}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Tab Content */}
        <div className="p-4">
          {activeTab === "following" && (
            <div className="space-y-6">
              {followingBrands.map((brand) => (
                <div key={brand.id} className="border-b border-gray-100 pb-6 last:border-b-0">
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center space-x-3">
                      <div className="w-8 h-8 bg-purple-500 rounded-full flex items-center justify-center">
                        <span className="text-white text-xs font-bold">
                          {brand.name.charAt(0)}
                        </span>
                      </div>
                      <div>
                        <div className="flex items-center space-x-2">
                          <h3 className="font-bold text-gray-900">{brand.name}</h3>
                          <Badge variant="secondary" className="bg-purple-100 text-purple-700 text-xs">
                            {brand.badge}
                          </Badge>
                        </div>
                        <div className="flex items-center space-x-1">
                          <Star className="h-3 w-3 text-yellow-400 fill-current" />
                          <span className="text-xs text-gray-600">{brand.rating}</span>
                        </div>
                      </div>
                    </div>
                    <Button variant="outline" size="sm" className="bg-black text-white hover:bg-gray-800">
                      Follow
                    </Button>
                  </div>
                  
                  <div className="grid grid-cols-4 gap-2">
                    {brand.products.map((product) => (
                      <button
                        key={product.id}
                        onClick={() => handleProductClick(product.id)}
                        className="text-left hover:opacity-80 transition-opacity"
                      >
                        <img 
                          src={product.image} 
                          alt="Product"
                          className="w-full aspect-square object-cover rounded-md mb-1"
                        />
                        <p className="text-xs font-bold text-gray-900">{product.price}</p>
                      </button>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          )}
          
          {activeTab === "browsed" && (
            <div className="text-center py-8 text-gray-500">
              <p>No browsed items yet</p>
            </div>
          )}
          
          {activeTab === "purchased" && (
            <div className="text-center py-8 text-gray-500">
              <p>You currently haven't made a purchase in any store.</p>
            </div>
          )}
        </div>
      </div>

      {/* You May Also Like Section */}
      <div className="px-4 py-6">
        <div className="text-center mb-4">
          <h2 className="text-lg font-bold text-gray-900">—— You May Also Like ——</h2>
        </div>
        
        <div className="space-y-6">
          {followingBrands.slice(0, 2).map((brand) => (
            <div key={`suggested-${brand.id}`} className="bg-white rounded-lg p-4 shadow-sm">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center space-x-3">
                  <div className="w-8 h-8 bg-purple-500 rounded-full flex items-center justify-center">
                    <span className="text-white text-xs font-bold">
                      {brand.name.charAt(0)}
                    </span>
                  </div>
                  <div>
                    <div className="flex items-center space-x-2">
                      <h3 className="font-bold text-gray-900">{brand.name}</h3>
                      <Badge variant="secondary" className="bg-purple-100 text-purple-700 text-xs">
                        {brand.badge}
                      </Badge>
                    </div>
                    <div className="flex items-center space-x-1">
                      <Star className="h-3 w-3 text-yellow-400 fill-current" />
                      <span className="text-xs text-gray-600">{brand.rating}</span>
                    </div>
                  </div>
                </div>
                <Button variant="outline" size="sm">
                  Follow
                </Button>
              </div>
              
              <div className="grid grid-cols-4 gap-2">
                {brand.products.map((product) => (
                  <button
                    key={product.id}
                    onClick={() => handleProductClick(product.id)}
                    className="text-left hover:opacity-80 transition-opacity"
                  >
                    <img 
                      src={product.image} 
                      alt="Product"
                      className="w-full aspect-square object-cover rounded-md mb-1"
                    />
                    <p className="text-xs font-bold text-gray-900">{product.price}</p>
                  </button>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
