import { useState } from "react";
import { Search, Heart, ChevronLeft, TrendingUp, ArrowUp } from "lucide-react";
import { cn } from "@/lib/utils";
import TrendsCarousel from "@/components/trends-carousel";
import TrendsBrandCollection from "@/components/trends-brand-collection";
import BottomNavigation from "@/components/bottom-navigation";
// import { button } from "@/components/ui/button";
import { useLocation } from "wouter";

const trendsTabs = [
  { id: "recommend", label: "Recommend" },
  { id: "following", label: "Following" },
  { id: "browsed", label: "Browsed" },
];

const searchSuggestions = [
  "Summer dresses",
  "Vintage jewelry",
  "Minimalist style",
  "Korean fashion",
  "Boho accessories"
];

export default function Trends() {
  const [location, setLocation] = useLocation();
  const [activeTab, setActiveTab] = useState("recommend");
  const [searchQuery, setSearchQuery] = useState("");
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [showScrollTop, setShowScrollTop] = useState(false);
  const [cartCount] = useState(3);

  const filteredSuggestions = searchSuggestions.filter(suggestion =>
    suggestion.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleWishlistClick = () => {
    setLocation("/wishlist");
  };

  return (
    <div className="min-h-screen bg-gray-50 pb-20">
      {/* Header */}
      <header className="bg-white sticky top-0 z-50 shadow-sm">
        <div className="flex items-center justify-between px-4 py-3">
          {/* Left - Back arrow and Trends Store */}
          <div className="flex items-center space-x-3">
            <button className="text-gray-600 hover:text-primary transition-colors">
              <ChevronLeft className="h-5 w-5" />
            </button>
            <h1 className="text-lg font-bold text-gray-900">Trends Store</h1>
          </div>
          
          {/* Center - Search Bar */}
          <div className="flex-1 mx-4 relative">
            <div className="relative">
              <input 
                type="text" 
                placeholder="Search trends..." 
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                onFocus={() => setShowSuggestions(true)}
                onBlur={() => setTimeout(() => setShowSuggestions(false), 200)}
                className="w-full bg-gray-100 rounded-full pl-4 pr-10 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-primary focus:bg-white transition-all"
              />
              <button className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-primary transition-colors">
                <Search className="h-4 w-4" />
              </button>
            </div>
            
            {/* Search Suggestions */}
            {showSuggestions && searchQuery && (
              <div className="absolute top-full left-0 right-0 bg-white border border-gray-200 rounded-lg shadow-lg mt-1 z-10">
                {filteredSuggestions.map((suggestion, index) => (
                  <button
                    key={index}
                    onClick={() => {
                      setSearchQuery(suggestion);
                      setShowSuggestions(false);
                    }}
                    className="w-full text-left px-4 py-2 hover:bg-gray-50 transition-colors text-sm"
                  >
                    {suggestion}
                  </button>
                ))}
              </div>
            )}
          </div>
          
          {/* Right - Wishlist */}
          <button  onClick={handleWishlistClick} className="text-gray-600 hover:text-secondary transition-colors">
            <Heart className="h-5 w-5" />
          </button>
        </div>
      </header>

      {/* Carousel Section */}
      <TrendsCarousel />

      {/* Tabs */}
      <div className="bg-white border-b border-gray-200">
        <div className="overflow-x-auto hide-scrollbar">
          <div className="flex justify-around px-4 py-3 min-w-max">
            {trendsTabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={cn(
                  "pb-2 px-4 whitespace-nowrap text-sm transition-colors flex-1 text-center",
                  activeTab === tab.id
                    ? "text-primary border-b-2 border-primary font-semibold"
                    : "text-gray-600 hover:text-primary"
                )}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Brand Collections */}
      <div className="px-4 py-4 space-y-4">
        <TrendsBrandCollection activeTab={activeTab} />
      </div>

      {/* Scroll to Top button */}
      {showScrollTop && (
        <button
          onClick={scrollToTop}
          className="fixed bottom-24 right-4 bg-primary text-white p-3 rounded-full shadow-lg hover:bg-primary/90 transition-all z-40"
        >
          <ArrowUp className="h-5 w-5" />
        </button>
      )}

      <BottomNavigation cartCount={cartCount} />
    </div>
  );
}