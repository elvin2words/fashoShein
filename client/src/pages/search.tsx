
import { useState } from "react";
import { ArrowLeft, Camera, Search as SearchIcon, Trash2 } from "lucide-react";
import { useLocation } from "wouter";
import { Badge } from "@/components/ui/badge";
// import { button } from "@/components/ui/button";

const recentSearches = [
  "Shoes For Men",
  "Brown Boots"
];

const trendingKeywords = [
  "SS25 Trends Keywords",
  "Sneakers For Men",
  "Shoes Men",
  "Black Dress Shoes"
];

const discoveryTags = [
  "Plain Dress Shoes",
  "Fabric Men Suits",
  "More"
];

export default function Search() {
  const [, setLocation] = useLocation();
  const [searchQuery, setSearchQuery] = useState("");

  const handleBack = () => {
    setLocation("/");
  };

  const handleSearch = () => {
    if (searchQuery.trim()) {
      setLocation(`/search-results?q=${encodeURIComponent(searchQuery)}`);
    }
  };

  const handleRecentSearch = (query: string) => {
    setLocation(`/search-results?q=${encodeURIComponent(query)}`);
  };

  const handleVisualSearch = () => {
    setLocation("/visual-search");
  };

  const clearRecentSearches = () => {
    // Clear recent searches logic here
    console.log("Clear recent searches");
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
              placeholder="Search fashion & lifestyle..."
              className="w-full bg-gray-100 rounded-full pl-4 pr-16 py-2.5 text-sm focus:outline-buttonne focus:ring-2 focus:ring-primary focus:bg-white transition-all"
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
        </div>
      </header>

      <div className="px-4 py-6">
        {/* Recently Searched */}
        <div className="mb-6">
          <div className="flex items-center justify-between mb-3">
            <h2 className="text-lg font-semibold text-gray-900">Recently Searched</h2>
            <button 
              onClick={clearRecentSearches}
              className="text-gray-400 hover:text-gray-600"
            >
              <Trash2 className="h-4 w-4" />
            </button>
          </div>
          
          <div className="flex flex-wrap gap-2">
            {recentSearches.map((search, index) => (
              <button
                key={index}
                onClick={() => handleRecentSearch(search)}
                className="bg-white px-3 py-2 rounded-full text-sm text-gray-700 border border-gray-200 hover:bg-gray-50 transition-colors"
              >
                {search}
              </button>
            ))}
          </div>
        </div>

        {/* Search Discovery */}
        <div>
          <h2 className="text-lg font-semibold text-gray-900 mb-3">Search Discovery</h2>
          
          <div className="space-y-3">
            {/* Trending Keywords */}
            <div className="flex flex-wrap gap-2">
              {trendingKeywords.map((keyword, index) => (
                <button
                  key={index}
                  onClick={() => handleRecentSearch(keyword)}
                  className="flex items-center space-x-1 bg-white px-3 py-2 rounded-full text-sm border border-gray-200 hover:bg-gray-50 transition-colors"
                >
                  <span className="text-orange-500">🔥</span>
                  <span className="text-gray-700">{keyword}</span>
                </button>
              ))}
            </div>

            {/* Discovery Tags */}
            <div className="flex flex-wrap gap-2">
              {discoveryTags.map((tag, index) => (
                <button
                  key={index}
                  onClick={() => handleRecentSearch(tag)}
                  className="bg-white px-3 py-2 rounded-full text-sm text-gray-700 border border-gray-200 hover:bg-gray-50 transition-colors"
                >
                  {tag}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
