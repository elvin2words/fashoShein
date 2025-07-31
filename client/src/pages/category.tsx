import { useState } from "react";
import { Search, Camera, Heart } from "lucide-react";
import { cn } from "@/lib/utils";
import CategorySidebar from "@/components/category-sidebar";
import CategoryPicks from "@/components/category-picks";
import TrendsStore from "@/components/trends-store";
import YouMayLike from "@/components/you-may-like";
import BottomNavigation from "@/components/bottom-navigation";
import { Button } from "@/components/ui/button";


const mainCategories = [
  "All", "Women", "Curve", "Men", "Kids", "Home"
];

export default function Category() {
  const [activeCategory, setActiveCategory] = useState("all");
  const [activeSidebarFilter, setActiveSidebarFilter] = useState("justforyou");
  const [cartCount] = useState(3);

  return (
    <div className="min-h-screen bg-gray-50 pb-20">
      {/* Top Navigation */}
      <header className="bg-white sticky top-0 z-50 shadow-sm">
        <div className="flex items-center justify-between px-4 py-3">
          {/* Left - Messages icon */}
          <Button className="text-gray-600 hover:text-primary transition-colors">
            <div className="w-6 h-6 bg-primary bg-opacity-10 rounded-full flex items-center justify-center">
              <span className="text-primary text-xs font-bold">M</span>
            </div>
          </Button>
          
          {/* Center - Search Bar */}
          <div className="flex-1 mx-4">
            <div className="relative">
              <input 
                type="text" 
                placeholder="Search categories..." 
                className="w-full bg-gray-100 rounded-full pl-4 pr-12 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-primary focus:bg-white transition-all"
              />
              <div className="absolute right-3 top-1/2 transform -translate-y-1/2 flex items-center space-x-2">
                <Button className="text-gray-400 hover:text-primary transition-colors">
                  <Camera className="h-4 w-4" />
                </Button>
                <Button className="text-gray-400 hover:text-primary transition-colors">
                  <Search className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </div>
          
          {/* Right - Wishlist */}
          <Button className="text-gray-600 hover:text-secondary transition-colors">
            <Heart className="h-5 w-5" />
          </Button>
        </div>
      </header>

      {/* Category Tabs */}
      <div className="bg-white border-b border-gray-200">
        <div className="overflow-x-auto hide-scrollbar">
          <div className="flex justify-around px-4 py-3 min-w-max">
            {mainCategories.map((category) => (
              <Button
                key={category}
                onClick={() => setActiveCategory(category.toLowerCase())}
                className={cn(
                  "pb-2 px-2 whitespace-nowrap text-sm transition-colors flex-1 text-center",
                  activeCategory === category.toLowerCase()
                    ? "text-primary border-b-2 border-primary font-semibold"
                    : "text-gray-600 hover:text-primary"
                )}
              >
                {category}
              </Button>
            ))}
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex">
        {/* Left Sidebar */}
        <CategorySidebar 
          activeCategory={activeCategory}
          activeFilter={activeSidebarFilter}
          onFilterChange={setActiveSidebarFilter}
        />
        
        {/* Right Content */}
        <div className="flex-1 p-4 space-y-6">
          <CategoryPicks activeCategory={activeCategory} />
          <TrendsStore />
          <YouMayLike />
        </div>
      </div>

      <BottomNavigation cartCount={cartCount} />
    </div>
  );
}