import { Sparkles, ShoppingBag } from "lucide-react";
import { useState, useEffect } from "react";
import { cn } from "@/lib/utils";

const bannerContent = [
  {
    title: "Spring Collection 2024",
    description: "Discover trending styles up to 70% off",
    buttonText: "Shop Now"
  },
  {
    title: "Summer Essentials", 
    description: "New arrivals perfect for the season",
    buttonText: "Explore"
  },
  {
    title: "Flash Sale Alert",
    description: "Limited time offers on bestsellers",
    buttonText: "Save Now"
  }
];

export default function HeroBanner() {
  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % bannerContent.length);
    }, 5000);
    
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="bg-gradient-to-br from-primary via-secondary to-accent relative overflow-hidden">
      <div className="relative h-48 flex items-center justify-center">
        {/* Carousel Content */}
        <div className="text-center text-white px-6">
          <h2 className="text-2xl font-bold mb-2">{bannerContent[currentSlide].title}</h2>
          <p className="text-sm opacity-90 mb-4">{bannerContent[currentSlide].description}</p>
          <button className="bg-white text-primary px-6 py-2 rounded-full font-semibold text-sm hover:bg-gray-100 transition-colors">
            {bannerContent[currentSlide].buttonText}
          </button>
        </div>
        
        {/* Decorative Elements */}
        <div className="absolute top-4 right-4 text-white opacity-20">
          <Sparkles className="h-8 w-8" />
        </div>
        <div className="absolute bottom-4 left-4 text-white opacity-20">
          <ShoppingBag className="h-6 w-6" />
        </div>
      </div>
      
      {/* Pagination Dots */}
      <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2">
        {bannerContent.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentSlide(index)}
            className={cn(
              "w-2 h-2 rounded-full transition-all",
              index === currentSlide ? "bg-white" : "bg-white opacity-50"
            )}
          />
        ))}
      </div>
    </div>
  );
}
