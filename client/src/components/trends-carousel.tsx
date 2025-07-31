import { useState, useEffect } from "react";
import { TrendingUp, Users, Clock } from "lucide-react";
import { cn } from "@/lib/utils";

const carouselFrames = [
  {
    id: 1,
    hashtag: "#My Favorite Dress",
    description: "Trending summer styles",
    backgroundImage: "https://images.unsplash.com/photo-1595777457583-95e059d581b8?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=200",
    backgroundColor: "from-pink-400 to-purple-500",
    trendValue: "+24%",
    products: [
      {
        id: "1",
        title: "Floral Summer Dress",
        price: "29.99",
        image: "https://images.unsplash.com/photo-1595777457583-95e059d581b8?ixlib=rb-4.0.3&auto=format&fit=crop&w=150&h=150",
        storeTag: "SHEIN Lady"
      },
      {
        id: "2", 
        title: "Elegant Midi Dress",
        price: "34.99",
        image: "https://images.unsplash.com/photo-1566479179817-c0dd2e0bc1e5?ixlib=rb-4.0.3&auto=format&fit=crop&w=150&h=150",
        storeTag: "Fashion Store"
      }
    ]
  },
  {
    id: 2,
    hashtag: "#Minimalist Style",
    description: "Clean & simple fashion",
    backgroundImage: "https://images.unsplash.com/photo-1434389677669-e08b4cac3105?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=200",
    backgroundColor: "from-gray-400 to-blue-500",
    trendValue: "+18%",
    products: [
      {
        id: "3",
        title: "Basic White Tee",
        price: "19.99",
        image: "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?ixlib=rb-4.0.3&auto=format&fit=crop&w=150&h=150",
        storeTag: "Minimal Co"
      },
      {
        id: "4",
        title: "Simple Black Jeans", 
        price: "39.99",
        image: "https://images.unsplash.com/photo-1541099649105-f69ad21f3246?ixlib=rb-4.0.3&auto=format&fit=crop&w=150&h=150",
        storeTag: "Urban Basics"
      }
    ]
  },
  {
    id: 3,
    hashtag: "#Vintage Vibes",
    description: "Retro fashion revival",
    backgroundImage: "https://images.unsplash.com/photo-1445205170230-053b83016050?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=200",
    backgroundColor: "from-amber-400 to-orange-500",
    trendValue: "+31%",
    products: [
      {
        id: "5",
        title: "Vintage Denim Jacket",
        price: "49.99",
        image: "https://images.unsplash.com/photo-1551028719-00167b16eac5?ixlib=rb-4.0.3&auto=format&fit=crop&w=150&h=150",
        storeTag: "Retro Store"
      },
      {
        id: "6",
        title: "Classic Leather Bag",
        price: "59.99", 
        image: "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?ixlib=rb-4.0.3&auto=format&fit=crop&w=150&h=150",
        storeTag: "Vintage Co"
      }
    ]
  }
];

export default function TrendsCarousel() {
  const [currentFrame, setCurrentFrame] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentFrame((prev) => (prev + 1) % carouselFrames.length);
    }, 6000);
    
    return () => clearInterval(timer);
  }, []);

  const frame = carouselFrames[currentFrame];

  return (
    <div className="relative mx-4 my-4 rounded-xl overflow-hidden shadow-lg">
      <div className={cn("bg-gradient-to-r", frame.backgroundColor, "relative h-64")}>
        {/* Background Image Overlay */}
        <div 
          className="absolute inset-0 bg-cover bg-center opacity-20"
          style={{ backgroundImage: `url(${frame.backgroundImage})` }}
        />
        
        {/* Content */}
        <div className="relative p-6 h-full flex flex-col">
          {/* Header */}
          <div className="flex items-center justify-between mb-3">
            <div>
              <h2 className="text-white text-xl font-bold">{frame.hashtag}</h2>
              <p className="text-white text-sm opacity-90">{frame.description}</p>
            </div>
            <div className="flex items-center space-x-2 bg-black bg-opacity-20 rounded-full px-3 py-1">
              <TrendingUp className="h-4 w-4 text-white" />
              <span className="text-white text-sm font-semibold">{frame.trendValue}</span>
            </div>
          </div>
          
          {/* Product Cards */}
          <div className="flex-1 flex items-end">
            <div className="flex space-x-3 w-full">
              {frame.products.map((product) => (
                <div key={product.id} className="bg-white rounded-lg overflow-hidden shadow-md flex-1">
                  <img 
                    src={product.image} 
                    alt={product.title}
                    className="w-full h-20 object-cover"
                  />
                  <div className="p-2">
                    <p className="text-xs text-gray-700 mb-1 line-clamp-1">{product.title}</p>
                    <div className="flex items-center justify-between">
                      <span className="text-primary font-bold text-sm">${product.price}</span>
                      <span className="text-xs bg-gray-100 text-gray-600 px-2 py-1 rounded-full">
                        {product.storeTag}
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
      
      {/* Pagination Dots */}
      <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2">
        {carouselFrames.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentFrame(index)}
            className={cn(
              "w-2 h-2 rounded-full transition-all",
              index === currentFrame ? "bg-white" : "bg-white opacity-50"
            )}
          />
        ))}
      </div>
    </div>
  );
}