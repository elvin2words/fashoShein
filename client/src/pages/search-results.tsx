
import { useState, useEffect } from "react";
import { ArrowLeft, Camera, Search as SearchIcon, Heart, Grid, Filter, ChevronDown } from "lucide-react";
import { useLocation } from "wouter";
import { Badge } from "@/components/ui/badge";
// import { button } from "@/components/ui/button";

const categoryFilters = [
  { id: "boot", label: "Boot", image: "https://images.unsplash.com/photo-1544966503-7cc5ac882d5d?ixlib=rb-4.0.3&auto=format&fit=crop&w=50&h=50" },
  { id: "claquett", label: "Claquett", image: "https://images.unsplash.com/photo-1560769629-975ec94e6a86?ixlib=rb-4.0.3&auto=format&fit=crop&w=50&h=50" },
  { id: "cuir", label: "Cuir", image: "https://images.unsplash.com/photo-1549298916-b41d501d3772?ixlib=rb-4.0.3&auto=format&fit=crop&w=50&h=50" },
  { id: "blue", label: "Blue", image: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?ixlib=rb-4.0.3&auto=format&fit=crop&w=50&h=50" },
  { id: "collection", label: "Collection", image: "https://images.unsplash.com/photo-1533867617858-e7b97e060509?ixlib=rb-4.0.3&auto=format&fit=crop&w=50&h=50" }
];

const sortOptions = ["Recommend", "Most Popular", "Price ↑", "Filter ↓"];
const filterOptions = ["Category ↓", "Size ↓", "Color ↓", "Material ↓", "Detail"];

const searchResults = [
  {
    id: "sr1",
    title: "Men's Summer Running...",
    subtitle: "#1 Bestseller in Brown Men...",
    price: "$16.80",
    originalPrice: "$24.00",
    image: "https://images.unsplash.com/photo-1549298916-b41d501d3772?ixlib=rb-4.0.3&auto=format&fit=crop&w=200&h=200",
    badge: "Trends #FreshySneaker",
    rating: 4.8,
    sold: "1 other sellers"
  },
  {
    id: "sr2", 
    title: "2025 Men's New S...",
    subtitle: "#1 Bestseller in Men Sneaker...",
    price: "$15.60",
    originalPrice: "$22.99",
    image: "https://images.unsplash.com/photo-1560769629-975ec94e6a86?ixlib=rb-4.0.3&auto=format&fit=crop&w=200&h=200",
    badge: "Trends #StrongySneaker",
    rating: 4.7,
    sold: "3 other sellers"
  },
  {
    id: "sr3",
    title: "Men's Summer...",
    subtitle: "#1 Bestseller in Spring/Summ...",
    price: "$14.99",
    originalPrice: "$19.99", 
    image: "https://images.unsplash.com/photo-1544966503-7cc5ac882d5d?ixlib=rb-4.0.3&auto=format&fit=crop&w=200&h=200",
    badge: "High Repeat Customers",
    sold: "3 other sellers"
  },
  {
    id: "sr4",
    title: "Size Plus 38+ Sold",
    subtitle: "#1 Bestseller in Letter Men...",
    price: "$15.42",
    originalPrice: "$20.99",
    image: "https://images.unsplash.com/photo-1533867617858-e7b97e060509?ixlib=rb-4.0.3&auto=format&fit=crop&w=200&h=200",
    badge: "Trends #GreatySneaker",
    rating: 4.9,
    sold: "High Repeat Customers"
  },
  {
    id: "sr5",
    title: "High-End M...",
    subtitle: "#1 Bestseller in Size on Men...",
    price: "$11.18",
    originalPrice: "$15.99",
    image: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?ixlib=rb-4.0.3&auto=format&fit=crop&w=200&h=200",
    badge: "22022311 -31%",
    sold: "800+ sold"
  }
];

export default function SearchResults() {
  const [, setLocation] = useLocation();
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedSort, setSelectedSort] = useState("Recommend");

  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const query = urlParams.get('q') || '';
    setSearchQuery(query);
  }, []);

  const handleBack = () => {
    setLocation("/search");
  };

  const handleSearch = () => {
    if (searchQuery.trim()) {
      // Update URL and perform search
      window.history.replaceState({}, '', `/search-results?q=${encodeURIComponent(searchQuery)}`);
    }
  };

  const handleProductClick = (productId: string) => {
    setLocation(`/product/${productId}`);
  };

  const handleVisualSearch = () => {
    setLocation("/visual-search");
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header with Search */}
      <header className="bg-white px-4 py-4 shadow-sm">
        <div className="flex items-center space-x-3">
          <button onClick={handleBack} className="text-gray-700">
            <ArrowLeft className="h-6 w-6" />
          </button>
          
          <div className="flex-1 relative">
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-gray-100 rounded-full pl-4 pr-16 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-primary focus:bg-white transition-all"
              onKeyPress={(e) => e.key === 'Enter' && handleSearch()}
            />
            <div className="absolute right-3 top-1/2 transform -translate-y-1/2 flex items-center space-x-2">
              <button 
                onClick={handleVisualSearch}
                className="text-gray-400 hover:text-primary transition-colors"
              >
                <Camera className="h-4 w-4" />
              </button>
              <button 
                onClick={handleSearch}
                className="bg-black text-white rounded-full p-1.5 hover:bg-gray-800 transition-colors"
              >
                <SearchIcon className="h-3 w-3" />
              </button>
            </div>
          </div>
          
          <button className="text-gray-700">
            <Heart className="h-6 w-6" />
          </button>
        </div>
      </header>

      {/* Category Filters */}
      <div className="bg-white px-4 py-3 border-b">
        <div className="flex space-x-3 overflow-x-auto hide-scrollbar">
          {categoryFilters.map((filter) => (
            <button
              key={filter.id}
              className="flex flex-col items-center space-y-1 min-w-0 flex-shrink-0"
            >
              <div className="w-12 h-12 rounded-full overflow-hidden bg-gray-100">
                <img
                  src={filter.image}
                  alt={filter.label}
                  className="w-full h-full object-cover"
                />
              </div>
              <span className="text-xs text-gray-600">{filter.label}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Sort and Filter Bar */}
      <div className="bg-white px-4 py-3 border-b">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <button className="flex items-center space-x-1 text-sm text-gray-700">
              <span>{selectedSort}</span>
              <ChevronDown className="h-4 w-4" />
            </button>
          </div>
          
          <div className="flex items-center space-x-4">
            {filterOptions.map((filter) => (
              <button key={filter} className="flex items-center space-x-1 text-sm text-gray-700">
                <span>{filter}</span>
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Results Grid */}
      <div className="px-4 py-4">
        <div className="grid grid-cols-2 gap-3">
          {searchResults.map((product) => (
            <div 
              key={product.id} 
              className="bg-white rounded-lg overflow-hidden shadow-sm cursor-pointer"
              onClick={() => handleProductClick(product.id)}
            >
              <div className="relative">
                <img 
                  src={product.image} 
                  alt={product.title}
                  className="w-full h-32 object-cover"
                />
                <div className="absolute top-2 left-2">
                  <Badge className="bg-purple-500 text-white text-xs px-2 py-1">
                    Trends
                  </Badge>
                </div>
              </div>
              
              <div className="p-3">
                <div className="mb-2">
                  <Badge variant="secondary" className="text-xs mb-1">
                    {product.badge?.replace('Trends ', '') || '#SummerHoliday'}
                  </Badge>
                </div>
                
                <h3 className="text-sm font-medium text-gray-900 mb-1 line-clamp-1">
                  {product.title}
                </h3>
                
                {product.subtitle && (
                  <p className="text-xs text-gray-500 mb-2 line-clamp-1">
                    {product.subtitle}
                  </p>
                )}
                
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center space-x-1">
                    <span className="text-primary font-bold text-sm">{product.price}</span>
                    {product.originalPrice && (
                      <span className="text-gray-400 line-through text-xs">{product.originalPrice}</span>
                    )}
                  </div>
                  <button size="sm" variant="outline" className="h-6 px-2">
                    <Grid className="h-3 w-3" />
                  </button>
                </div>
                
                <div className="text-xs text-orange-500">
                  {product.sold}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
