import { Menu } from "lucide-react";
import { cn } from "@/lib/utils";
import { useLocation } from "wouter";


interface CategoryTabsProps {
  activeCategory: string;
  onCategoryChange: (category: string) => void;
}

const categories = [
  "All", "Women", "Curve", "Men", "Kids", "Shoes", "Jewelry & Accs", "Electronics", "Sports"
];

export default function CategoryTabs({ activeCategory, onCategoryChange }: CategoryTabsProps) {
  const [, setLocation] = useLocation();

  const handleMenuClick = () => {
    setLocation("/category");
  };

  return (
    <div className="bg-white border-b border-gray-200">
      <div className="flex items-center">
        <div className="flex-1 overflow-x-auto scroll-fade hide-scrollbar">
          <div className="flex space-x-6 px-4 py-3 min-w-max">
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => onCategoryChange(category.toLowerCase())}
                className={cn(
                  "pb-2 whitespace-nowrap text-sm transition-colors",
                  activeCategory === category.toLowerCase()
                    ? "text-primary border-b-2 border-primary font-semibold"
                    : "text-gray-600 hover:text-primary"
                )}
              >
                {category}
              </button>
            ))}
          </div>
        </div>
        <button onClick={handleMenuClick} className="px-4 py-3 text-gray-600 hover:text-primary transition-colors border-l border-gray-200">
          <Menu className="h-5 w-5" />
        </button>
      </div>
    </div>
  );
}
