import { useQuery } from "@tanstack/react-query";
import type { Category } from "@shared/schema";

interface CategoryPicksProps {
  activeCategory: string;
}

export default function CategoryPicks({ activeCategory }: CategoryPicksProps) {
  const { data: categories = [] } = useQuery<Category[]>({
    queryKey: ["/api/categories"],
  });

  // Filter categories based on active category
  const filteredCategories = categories.filter(cat => {
    if (activeCategory === "all") return true;
    return cat.slug === activeCategory;
  });

  return (
    <div>
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-bold text-gray-900">Picks for You</h3>
        <button className="text-sm text-primary font-medium hover:underline">
          View All
        </button>
      </div>
      
      <div className="grid grid-cols-3 gap-3">
        {categories.slice(0, 9).map((category) => (
          <div key={category.id} className="bg-white rounded-lg shadow-sm border border-gray-100 overflow-hidden cursor-pointer hover:shadow-md transition-shadow">
            <div className="aspect-square">
              <img 
                src={category.imageUrl} 
                alt={category.name}
                className="w-full h-full object-cover"
              />
            </div>
            <div className="p-2 text-center">
              <p className="text-xs font-medium text-gray-700">{category.name}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}