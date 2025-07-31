import { cn } from "@/lib/utils";

interface CategorySidebarProps {
  activeCategory: string;
  activeFilter: string;
  onFilterChange: (filter: string) => void;
}

const getFiltersForCategory = (category: string) => {
  const baseFilters = [
    { id: "justforyou", label: "Just For You" },
    { id: "newin", label: "New In" },
    { id: "sale", label: "Sale" },
  ];

  switch (category) {
    case "women":
      return [
        ...baseFilters,
        { id: "womenclothing", label: "Women Clothing" },
        { id: "beachwear", label: "Beachwear" },
        { id: "dresses", label: "Dresses" },
        { id: "tops", label: "Tops" },
        { id: "bottoms", label: "Bottoms" },
      ];
    case "curve":
      return [
        ...baseFilters,
        { id: "curvedresses", label: "Curve Dresses" },
        { id: "curvetops", label: "Curve Tops" },
        { id: "curvebottoms", label: "Curve Bottoms" },
      ];
    case "men":
      return [
        ...baseFilters,
        { id: "menclothing", label: "Men Clothing" },
        { id: "shirts", label: "Shirts" },
        { id: "pants", label: "Pants" },
        { id: "jackets", label: "Jackets" },
      ];
    case "kids":
      return [
        ...baseFilters,
        { id: "kidsclothing", label: "Kids Clothing" },
        { id: "boysclothing", label: "Boys Clothing" },
        { id: "girlsclothing", label: "Girls Clothing" },
        { id: "babyclothing", label: "Baby Clothing" },
      ];
    case "home":
      return [
        ...baseFilters,
        { id: "homekitchen", label: "Home & Kitchen" },
        { id: "homedecor", label: "Home Decor" },
        { id: "bedding", label: "Bedding" },
        { id: "bath", label: "Bath" },
      ];
    default:
      return [
        ...baseFilters,
        { id: "womenclothing", label: "Women Clothing" },
        { id: "beachwear", label: "Beachwear" },
        { id: "curve", label: "Curve" },
        { id: "kids", label: "Kids" },
        { id: "menclothing", label: "Men Clothing" },
        { id: "shoes", label: "Shoes" },
        { id: "jewelry", label: "Jewelry & Accessories" },
        { id: "homekitchen", label: "Home & Kitchen" },
      ];
  }
};

export default function CategorySidebar({ activeCategory, activeFilter, onFilterChange }: CategorySidebarProps) {
  const filters = getFiltersForCategory(activeCategory);

  return (
    <div className="w-32 bg-white border-r border-gray-200 min-h-screen">
      <div className="p-2 space-y-1 overflow-y-auto hide-scrollbar">
        {filters.map((filter) => (
          <button
            key={filter.id}
            onClick={() => onFilterChange(filter.id)}
            className={cn(
              "w-full text-left px-2 py-3 text-xs rounded-lg transition-colors",
              activeFilter === filter.id
                ? "bg-primary bg-opacity-10 text-primary font-medium"
                : "text-gray-600 hover:bg-gray-50 hover:text-primary"
            )}
          >
            {filter.label}
          </button>
        ))}
      </div>
    </div>
  );
}