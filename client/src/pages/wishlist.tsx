
import { useState } from "react";
import { ArrowLeft, MoreHorizontal, ShoppingCart, Grid3X3, Heart, Filter, ChevronDown, Star, Plus, Trash2, Share2, MoreVertical } from "lucide-react";
import { cn } from "@/lib/utils";
// import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { useLocation } from "wouter";

const wishlistItems = [
  {
    id: "w1",
    title: "Non-slip Screwdriver Bits",
    price: "3.90",
    originalPrice: "5.90",
    discount: "33%",
    image: "https://images.unsplash.com/photo-1551028719-00167b16eac5?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&h=300",
    sales: "300+ Sold",
    rating: 4.5,
    inStock: true,
    isPriceCut: true,
    isBackInStock: false,
    isLowStock: false
  },
  {
    id: "w2",
    title: "Silver Chain Necklace",
    price: "2.00",
    originalPrice: "3.50",
    discount: "43%",
    image: "https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&h=300",
    sales: "100+ Sold",
    rating: 4.7,
    inStock: true,
    isPriceCut: true,
    isBackInStock: false,
    isLowStock: false
  },
  {
    id: "w3",
    title: "Blue Tool Set with Case",
    price: "13.12",
    originalPrice: "18.99",
    discount: "31%",
    image: "https://images.unsplash.com/photo-1530124566582-a618bc2615dc?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&h=300",
    sales: "100+ users gave 5 star",
    rating: 4.8,
    inStock: true,
    isPriceCut: false,
    isBackInStock: true,
    isLowStock: true,
    stockLeft: "Only 3 Left"
  },
  {
    id: "w4",
    title: "Black Luggage Set",
    price: "0.00",
    originalPrice: "89.99",
    discount: "100%",
    image: "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&h=300",
    sales: "Sold Out",
    rating: 4.3,
    inStock: false,
    isPriceCut: false,
    isBackInStock: false,
    isLowStock: false
  }
];

const recommendedItems = [
  {
    id: "r1",
    title: "Wireless Bluetooth Headphones",
    price: "9.90",
    originalPrice: "15.90",
    discount: "38%",
    image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&h=300",
    rating: 4.6
  },
  {
    id: "r2",
    title: "Minimalist Watch",
    price: "5.90",
    originalPrice: "12.90",
    discount: "54%",
    image: "https://images.unsplash.com/photo-1524592094714-0f0654e20314?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&h=300",
    rating: 4.4
  },
  {
    id: "r3",
    title: "USB Cable Set",
    price: "5.90",
    originalPrice: "8.90",
    discount: "34%",
    image: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&h=300",
    rating: 4.2
  }
];

const filterPills = [
  { id: "price-cut", label: "Price cut", active: false },
  { id: "low-in-stock", label: "Low in stock", active: false },
  { id: "back-in-stock", label: "Back in stock", active: false },
  { id: "new-arrivals", label: "New arrivals", active: false },
  { id: "trending", label: "Trending", active: false }
];

const boards = [
  {
    id: "b1",
    title: "Summer Essentials",
    itemCount: 12,
    coverImage: "https://images.unsplash.com/photo-1595777457583-95e059d581b8?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&h=300",
    isPublic: true
  },
  {
    id: "b2",
    title: "Tech Gadgets",
    itemCount: 8,
    coverImage: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&h=300",
    isPublic: false
  }
];

export default function Wishlist() {
  const [, setLocation] = useLocation();
  const [activeTab, setActiveTab] = useState("items");
  const [selectedItems, setSelectedItems] = useState<string[]>([]);
  const [selectAll, setSelectAll] = useState(false);
  const [activeFilters, setActiveFilters] = useState<string[]>([]);
  const [sortBy, setSortBy] = useState("newest");
  const [categoryFilter, setCategoryFilter] = useState("all");
  const [statusFilter, setStatusFilter] = useState("all");
  const [showCreateBoard, setShowCreateBoard] = useState(false);
  const [newBoardName, setNewBoardName] = useState("");

  const cartCount = 3;
  const discountActive = true;

  const handleBack = () => {
    setLocation("/");
  };

  const handleSelectAll = () => {
    if (selectAll) {
      setSelectedItems([]);
    } else {
      setSelectedItems(wishlistItems.map(item => item.id));
    }
    setSelectAll(!selectAll);
  };

  const handleItemSelect = (itemId: string) => {
    if (selectedItems.includes(itemId)) {
      setSelectedItems(selectedItems.filter(id => id !== itemId));
    } else {
      setSelectedItems([...selectedItems, itemId]);
    }
  };

  const toggleFilter = (filterId: string) => {
    if (activeFilters.includes(filterId)) {
      setActiveFilters(activeFilters.filter(id => id !== filterId));
    } else {
      setActiveFilters([...activeFilters, filterId]);
    }
  };

  const getFilteredItems = () => {
    let filtered = [...wishlistItems];
    
    if (activeFilters.includes("price-cut")) {
      filtered = filtered.filter(item => item.isPriceCut);
    }
    if (activeFilters.includes("low-in-stock")) {
      filtered = filtered.filter(item => item.isLowStock);
    }
    if (activeFilters.includes("back-in-stock")) {
      filtered = filtered.filter(item => item.isBackInStock);
    }
    
    return filtered;
  };

  const handleCreateBoard = () => {
    if (newBoardName.trim()) {
      // Add board creation logic here
      setNewBoardName("");
      setShowCreateBoard(false);
    }
  };

  const handleCartClick = () => {
    setLocation("/cart");
  };

  const renderStars = (rating: number) => {
    const stars = [];
    for (let i = 1; i <= 5; i++) {
      stars.push(
        <Star
          key={i}
          className={cn(
            "h-3 w-3",
            i <= rating ? "text-yellow-400 fill-current" : "text-gray-300"
          )}
        />
      );
    }
    return stars;
  };

  return (
    <div className="min-h-screen bg-gray-50 pb-20">
      {/* Header */}
      <header className="bg-white sticky top-0 z-50 shadow-sm">
        <div className="flex items-center justify-between px-4 py-3">
          {/* Back button */}
          <button 
            onClick={handleBack}
            className="text-gray-600 hover:text-gray-900 transition-colors"
          >
            <ArrowLeft className="h-5 w-5" />
          </button>
          
          {/* Title */}
          <h1 className="text-lg font-bold text-gray-900">Wishlist</h1>
          
          {/* Right Icons */}
          <div className="flex items-center space-x-3">
            {activeTab === "items" && (
              <button
                onClick={handleSelectAll}
                className={cn(
                  "w-5 h-5 rounded border-2 flex items-center justify-center transition-colors",
                  selectAll ? "bg-primary border-primary" : "border-gray-300"
                )}
              >
                {selectAll && <div className="w-2 h-2 bg-white rounded-sm" />}
              </button>
            )}
            
            <div className="relative">
              <button onClick={handleCartClick} className="text-gray-600 hover:text-gray-900 transition-colors">
                <ShoppingCart className="h-5 w-5" />
              </button>
              {cartCount > 0 && (
                <Badge className="absolute -top-2 -right-2 h-4 w-4 p-0 text-xs bg-red-500 text-white rounded-full flex items-center justify-center">
                  {cartCount}
                </Badge>
              )}
              {discountActive && (
                <div className="absolute -bottom-1 -right-1 w-2 h-2 bg-orange-500 rounded-full"></div>
              )}
            </div>
          </div>
        </div>
        
        {/* Tabs */}
        <div className="border-b border-gray-200">
          <div className="flex px-4">
            <button
              onClick={() => setActiveTab("items")}
              className={cn(
                "pb-3 px-2 text-sm font-medium transition-colors flex-1 text-center relative",
                activeTab === "items"
                  ? "text-primary border-b-2 border-primary"
                  : "text-gray-600 hover:text-primary"
              )}
            >
              Items ({wishlistItems.length})
            </button>
            <button
              onClick={() => setActiveTab("boards")}
              className={cn(
                "pb-3 px-2 text-sm font-medium transition-colors flex-1 text-center relative",
                activeTab === "boards"
                  ? "text-primary border-b-2 border-primary"
                  : "text-gray-600 hover:text-primary"
              )}
            >
              Boards
            </button>
          </div>
        </div>
      </header>

      {/* Items Tab Content */}
      {activeTab === "items" && (
        <div>
          {/* Filter Controls */}
          <div className="bg-white border-b border-gray-200 px-4 py-3">
            <div className="flex items-center space-x-3 mb-3">
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <button className="flex items-center space-x-1 text-sm text-gray-600 border border-gray-200 rounded px-3 py-1.5">
                    <span>Sort</span>
                    <ChevronDown className="h-3 w-3" />
                  </button>
                </DropdownMenuTrigger>
                <DropdownMenuContent>
                  <DropdownMenuItem onClick={() => setSortBy("newest")}>Newest</DropdownMenuItem>
                  <DropdownMenuItem onClick={() => setSortBy("price-low")}>Price: Low to High</DropdownMenuItem>
                  <DropdownMenuItem onClick={() => setSortBy("price-high")}>Price: High to Low</DropdownMenuItem>
                  <DropdownMenuItem onClick={() => setSortBy("popular")}>Most Popular</DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>

              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <button className="flex items-center space-x-1 text-sm text-gray-600 border border-gray-200 rounded px-3 py-1.5">
                    <span>Category</span>
                    <ChevronDown className="h-3 w-3" />
                  </button>
                </DropdownMenuTrigger>
                <DropdownMenuContent>
                  <DropdownMenuItem onClick={() => setCategoryFilter("all")}>All Categories</DropdownMenuItem>
                  <DropdownMenuItem onClick={() => setCategoryFilter("fashion")}>Fashion</DropdownMenuItem>
                  <DropdownMenuItem onClick={() => setCategoryFilter("electronics")}>Electronics</DropdownMenuItem>
                  <DropdownMenuItem onClick={() => setCategoryFilter("tools")}>Tools</DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>

              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <button className="flex items-center space-x-1 text-sm text-gray-600 border border-gray-200 rounded px-3 py-1.5">
                    <span>Status</span>
                    <ChevronDown className="h-3 w-3" />
                  </button>
                </DropdownMenuTrigger>
                <DropdownMenuContent>
                  <DropdownMenuItem onClick={() => setStatusFilter("all")}>All Items</DropdownMenuItem>
                  <DropdownMenuItem onClick={() => setStatusFilter("in-stock")}>In Stock</DropdownMenuItem>
                  <DropdownMenuItem onClick={() => setStatusFilter("out-of-stock")}>Out of Stock</DropdownMenuItem>
                  <DropdownMenuItem onClick={() => setStatusFilter("low-stock")}>Low Stock</DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>

              <button className="flex items-center space-x-1 text-sm text-gray-600 border border-gray-200 rounded px-3 py-1.5">
                <Filter className="h-3 w-3" />
                <span>Filter</span>
              </button>
            </div>

            {/* Filter Pills */}
            <div className="flex space-x-2 overflow-x-auto hide-scrollbar">
              {filterPills.map((filter) => (
                <button
                  key={filter.id}
                  onClick={() => toggleFilter(filter.id)}
                  className={cn(
                    "px-3 py-1.5 rounded-full text-sm font-medium whitespace-nowrap transition-colors",
                    activeFilters.includes(filter.id)
                      ? "bg-primary text-white"
                      : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                  )}
                >
                  {filter.label}
                </button>
              ))}
            </div>
          </div>

          {/* Wishlist Items */}
          <div className="p-4 space-y-4">
            {getFilteredItems().map((item) => (
              <div key={item.id} className="bg-white rounded-lg p-4 shadow-sm">
                <div className="flex space-x-3">
                  {/* Select Checkbox */}
                  <button
                    onClick={() => handleItemSelect(item.id)}
                    className={cn(
                      "w-5 h-5 rounded border-2 flex items-center justify-center mt-1 transition-colors",
                      selectedItems.includes(item.id) ? "bg-primary border-primary" : "border-gray-300"
                    )}
                  >
                    {selectedItems.includes(item.id) && (
                      <div className="w-2 h-2 bg-white rounded-sm" />
                    )}
                  </button>
                  
                  {/* Product Image */}
                  <div className="relative">
                    <img 
                      src={item.image} 
                      alt={item.title}
                      className="w-20 h-20 object-cover rounded-lg"
                    />
                    {!item.inStock && (
                      <div className="absolute inset-0 bg-black bg-opacity-50 rounded-lg flex items-center justify-center">
                        <span className="text-white text-xs font-medium">Sold Out</span>
                      </div>
                    )}
                  </div>
                  
                  {/* Product Details */}
                  <div className="flex-1">
                    <h3 className="font-medium text-gray-900 text-sm mb-1">{item.title}</h3>
                    
                    <div className="flex items-center space-x-1 mb-2">
                      <div className="flex">
                        {renderStars(item.rating)}
                      </div>
                    </div>
                    
                    <p className="text-xs text-gray-500 mb-2">{item.sales}</p>
                    
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-2">
                        <span className="text-primary font-bold text-sm">${item.price}</span>
                        {item.originalPrice && parseFloat(item.originalPrice) > 0 && (
                          <span className="text-gray-400 line-through text-xs">${item.originalPrice}</span>
                        )}
                        {item.discount && (
                          <span className="bg-red-100 text-red-600 text-xs px-1 rounded">{item.discount} off</span>
                        )}
                      </div>
                      
                      {item.stockLeft && (
                        <span className="text-orange-500 text-xs">{item.stockLeft}</span>
                      )}
                    </div>
                    
                    {!item.inStock && (
                      <div className="mt-2 space-y-2">
                        <button size="sm" variant="outline" className="w-full">
                          Find Similar
                        </button>
                        <button size="sm" variant="outline" className="w-full text-red-600 border-red-200">
                          <Trash2 className="h-3 w-3 mr-1" />
                          Delete
                        </button>
                      </div>
                    )}
                  </div>
                  
                  {/* More Options */}
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <button className="text-gray-400 hover:text-gray-600 transition-colors">
                        <MoreVertical className="h-4 w-4" />
                      </button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuItem>
                        <Share2 className="h-4 w-4 mr-2" />
                        Share
                      </DropdownMenuItem>
                      <DropdownMenuItem>
                        <Plus className="h-4 w-4 mr-2" />
                        Add to Board
                      </DropdownMenuItem>
                      <DropdownMenuItem className="text-red-600">
                        <Trash2 className="h-4 w-4 mr-2" />
                        Remove
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>
              </div>
            ))}
          </div>

          {/* You May Also Like */}
          <div className="px-4 pb-4">
            <h2 className="text-lg font-bold text-gray-900 mb-4">You May Also Like</h2>
            <div className="grid grid-cols-3 gap-3">
              {recommendedItems.map((item) => (
                <div key={item.id} className="bg-white rounded-lg overflow-hidden shadow-sm">
                  <img 
                    src={item.image} 
                    alt={item.title}
                    className="w-full h-24 object-cover"
                  />
                  <div className="p-2">
                    <h3 className="text-xs font-medium text-gray-900 mb-1 line-clamp-2">{item.title}</h3>
                    <div className="flex items-center space-x-1 mb-1">
                      <div className="flex">
                        {renderStars(item.rating)}
                      </div>
                    </div>
                    <div className="flex items-center space-x-1">
                      <span className="text-primary font-bold text-xs">${item.price}</span>
                      <span className="text-gray-400 line-through text-xs">${item.originalPrice}</span>
                    </div>
                    <button size="sm" className="w-full mt-2 text-xs">
                      <ShoppingCart className="h-3 w-3 mr-1" />
                      Add
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Boards Tab Content */}
      {activeTab === "boards" && (
        <div className="p-4">
          {/* Boards Description */}
          <div className="bg-white rounded-lg p-4 mb-4 text-center">
            <div className="mb-3">
              <Grid3X3 className="h-8 w-8 text-primary mx-auto mb-2" />
            </div>
            <h3 className="font-bold text-gray-900 mb-2">Organize Your Style</h3>
            <p className="text-sm text-gray-600 mb-4">
              Create boards to manage your favorite items, classify your own styles, and share with friends.
            </p>
            <button 
              onClick={() => setShowCreateBoard(true)}
              className="w-full"
            >
              <Plus className="h-4 w-4 mr-2" />
              Create Board
            </button>
          </div>

          {/* Existing Boards */}
          <div className="grid grid-cols-2 gap-4">
            {boards.map((board) => (
              <div key={board.id} className="bg-white rounded-lg overflow-hidden shadow-sm">
                <div className="relative aspect-square">
                  <img 
                    src={board.coverImage} 
                    alt={board.title}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-black bg-opacity-20 flex items-center justify-center">
                    <span className="text-white font-medium">{board.itemCount} items</span>
                  </div>
                  {board.isPublic && (
                    <div className="absolute top-2 right-2 bg-green-500 text-white text-xs px-2 py-1 rounded">
                      Public
                    </div>
                  )}
                </div>
                <div className="p-3">
                  <h3 className="font-medium text-gray-900 text-sm">{board.title}</h3>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Create Board Modal */}
      <Dialog open={showCreateBoard} onOpenChange={setShowCreateBoard}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Create New Board</DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <Input
              placeholder="Board name"
              value={newBoardName}
              onChange={(e) => setNewBoardName(e.target.value)}
            />
            <div className="flex space-x-3">
              <button 
                variant="outline" 
                onClick={() => setShowCreateBoard(false)}
                className="flex-1"
              >
                Cancel
              </button>
              <button 
                onClick={handleCreateBoard}
                className="flex-1"
                disabled={!newBoardName.trim()}
              >
                Create
              </button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
