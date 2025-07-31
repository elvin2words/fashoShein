import { useState } from "react";
import { MoreHorizontal, Share2, Settings, Heart, ArrowUp, Tag, ShoppingCart, Plus, Minus, ChevronDown, Star } from "lucide-react";
import { cn } from "@/lib/utils";
// import { button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import BottomNavigation from "@/components/bottom-navigation";
import ProductOptionsModal from "@/components/product-options-modal";
import { useLocation } from "wouter";


const cartFilterTabs = [
  { id: "all", label: "All" },
  { id: "almost-out", label: "Almost out of stock" },
  { id: "content", label: "Content" },
];

const recommendationFilters = [
  { id: "all", label: "All" },
  { id: "hot-deals", label: "Hot Deals" },
  { id: "frequent-favorites", label: "Frequent Favorites" },
  { id: "trending", label: "Trending" },
];

const cartItems = [
  {
    id: "1",
    title: "Elegant Summer Blouse",
    store: "SHEIN Lady",
    image: "https://images.unsplash.com/photo-1595777457583-95e059d581b8?ixlib=rb-4.0.3&auto=format&fit=crop&w=150&h=150",
    color: "White",
    size: "M",
    originalPrice: "29.99",
    discountPrice: "22.99",
    discount: "23%",
    quantity: 2,
    sales: "45k",
    likes: "2.1k",
    reviews: "892",
    currentStat: "sales"
  },
  {
    id: "2",
    title: "Minimalist Chain Necklace",
    store: "new world jewelry",
    image: "https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?ixlib=rb-4.0.3&auto=format&fit=crop&w=150&h=150",
    color: "Gold",
    size: "One Size",
    originalPrice: "15.99",
    discountPrice: "8.99",
    discount: "44%",
    quantity: 1,
    sales: "123k",
    likes: "5.2k",
    reviews: "1.5k",
    currentStat: "likes"
  },
  {
    id: "3",
    title: "Casual Denim Jacket",
    store: "CasualDiffBautify",
    image: "https://images.unsplash.com/photo-1551028719-00167b16eac5?ixlib=rb-4.0.3&auto=format&fit=crop&w=150&h=150",
    color: "Blue",
    size: "L",
    originalPrice: "45.99",
    discountPrice: "35.99",
    discount: "22%",
    quantity: 1,
    sales: "67k",
    likes: "3.8k",
    reviews: "2.1k",
    currentStat: "reviews"
  }
];

const recommendedProducts = [
  {
    id: "rec1",
    title: "Vintage Crossbody Bag",
    price: "24.99",
    originalPrice: "39.99",
    discount: "38%",
    image: "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?ixlib=rb-4.0.3&auto=format&fit=crop&w=150&h=150",
    rating: 4.5,
    reviews: "1.2k",
    isHotDeal: true
  },
  {
    id: "rec2", 
    title: "Boho Statement Earrings",
    price: "12.99",
    originalPrice: "19.99",
    discount: "35%",
    image: "https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?ixlib=rb-4.0.3&auto=format&fit=crop&w=150&h=150",
    rating: 4.7,
    reviews: "856",
    isHotDeal: false
  },
  {
    id: "rec3",
    title: "Soft Knit Cardigan", 
    price: "28.99",
    originalPrice: "42.99",
    discount: "33%",
    image: "https://images.unsplash.com/photo-1434389677669-e08b4cac3105?ixlib=rb-4.0.3&auto=format&fit=crop&w=150&h=150",
    rating: 4.3,
    reviews: "654",
    isHotDeal: true
  },
  {
    id: "rec4",
    title: "Trendy Ankle Boots",
    price: "49.99",
    originalPrice: "79.99", 
    discount: "38%",
    image: "https://images.unsplash.com/photo-1543163521-1bf539c55dd2?ixlib=rb-4.0.3&auto=format&fit=crop&w=150&h=150",
    rating: 4.6,
    reviews: "2.3k",
    isHotDeal: false
  }
];

export default function Cart() {
  const [location, setLocation] = useLocation();
  const [selectAll, setSelectAll] = useState(true);
  const [selectedItems, setSelectedItems] = useState<string[]>(cartItems.map(item => item.id));
  const [activeFilter, setActiveFilter] = useState("all");
  const [activeRecommendationFilter, setActiveRecommendationFilter] = useState("all");
  const [showScrollTop, setShowScrollTop] = useState(false);
  const [showProductOptions, setShowProductOptions] = useState<string | null>(null);
  const [quantities, setQuantities] = useState<{[key: string]: number}>(
    cartItems.reduce((acc, item) => ({ ...acc, [item.id]: item.quantity }), {})
  );

  const cartCount = cartItems.length;
  const totalItems = Object.values(quantities).reduce((sum, qty) => sum + qty, 0);
  
  const subtotal = cartItems
    .filter(item => selectedItems.includes(item.id))
    .reduce((sum, item) => sum + (parseFloat(item.discountPrice) * quantities[item.id]), 0);
  
  const totalSavings = cartItems
    .filter(item => selectedItems.includes(item.id))
    .reduce((sum, item) => sum + ((parseFloat(item.originalPrice) - parseFloat(item.discountPrice)) * quantities[item.id]), 0);

  const handleSelectAll = () => {
    if (selectAll) {
      setSelectedItems([]);
    } else {
      setSelectedItems(cartItems.map(item => item.id));
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

  const updateQuantity = (itemId: string, newQuantity: number) => {
    if (newQuantity > 0) {
      setQuantities(prev => ({ ...prev, [itemId]: newQuantity }));
    }
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const getFilteredRecommendations = () => {
    switch (activeRecommendationFilter) {
      case "hot-deals":
        return recommendedProducts.filter(product => product.isHotDeal);
      case "frequent-favorites":
        return recommendedProducts.filter(product => product.rating >= 4.5);
      case "trending":
        return recommendedProducts.filter(product => parseInt(product.reviews.replace('k', '000').replace('.', '')) > 1000);
      default:
        return recommendedProducts;
    }
  };

  const handleManageClick = () => {
    setLocation("/"); // Manage Items Logic
  };

  
  const handleWishlistClick = () => {
    setLocation("/wishlist");
  };

  const handleShare = () => {
    setLocation("/"); // sharing logic
  };

  const handleCouponsClick = () => {
    setLocation("/coupons"); // sharing logic
  };

  return (
    <div className="min-h-screen bg-gray-50 pb-32">
      {/* Header */}
      <header className="bg-white sticky top-0 z-50 shadow-sm">
        <div className="flex items-center justify-between px-4 py-3">
          {/* Left - Select All */}
          <button
            onClick={handleSelectAll}
            className={cn(
              "w-6 h-6 rounded border-2 flex items-center justify-center transition-colors",
              selectAll ? "bg-primary border-primary" : "border-gray-300" // change to ticks
            )}
          >
            {selectAll && <div className="w-3 h-3 bg-white rounded-full" />}
          </button>
          
          {/* Center - Cart Title */}
          <h1 className="text-lg font-bold text-gray-900">
            Cart ({totalItems})
          </h1>
          
          {/* Right - More Options */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <button className="text-gray-600 hover:text-gray-900 transition-colors">
                <MoreHorizontal className="h-5 w-5" />
              </button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem onClick={handleShare}>
                <Share2 className="h-4 w-4 mr-2" />
                Share
              </DropdownMenuItem>
              <DropdownMenuItem onClick={handleManageClick}>
                <Settings className="h-4 w-4 mr-2" />
                Manage
              </DropdownMenuItem>
              <DropdownMenuItem onClick={handleWishlistClick}>
                <Heart className="h-4 w-4 mr-2" />
                Wishlist
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
        
        {/* Filter Pills */}
        <div className="px-4 pb-3">
          <div className="flex space-x-2 overflow-x-auto justify-center hide-scrollbar">
            {cartFilterTabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveFilter(tab.id)}
                className={cn(
                  "px-3 py-1.5 rounded-full text-sm font-medium whitespace-nowrap transition-colors",
                  activeFilter === tab.id
                    ? "bg-primary text-white"
                    : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                )}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>
      </header>

      {/* Cart Items */}
      <div className="px-4 py-4 space-y-4">
        {cartItems.map((item) => (
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
              <img 
                src={item.image} 
                alt={item.title}
                className="w-20 h-20 object-cover rounded-lg"
              />
              
              {/* Product Details */}
              <div className="flex-1">
                <h3 className="font-medium text-gray-900 text-sm mb-1">{item.title}</h3>
                <p className="text-gray-500 text-xs mb-2">{item.store}</p>
                
                {/* Product Options button */}
                <button 
                  onClick={() => setShowProductOptions(item.id)}
                  className="flex items-center space-x-1 text-xs text-gray-600 border border-gray-200 rounded px-2 py-1 mb-2"
                >
                  <span>{item.color}, {item.size}</span>
                  <ChevronDown className="h-3 w-3" />
                </button>
                
                {/* Dynamic Stats */}
                <div className="text-xs text-gray-500 mb-2">
                  {item.currentStat === "sales" && `${item.sales} sold`}
                  {item.currentStat === "likes" && `${item.likes} likes`}
                  {item.currentStat === "reviews" && `${item.reviews} reviews`}
                </div>
                
                {/* Price and Quantity */}
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <span className="text-primary font-bold text-sm">${item.discountPrice}</span>
                    <span className="text-gray-400 line-through text-xs">${item.originalPrice}</span>
                    <span className="bg-red-100 text-red-600 text-xs px-1 rounded">{item.discount} off</span>
                  </div>
                  
                  {/* Quantity Controls */}
                  <div className="flex items-center space-x-2">
                    <button
                      onClick={() => updateQuantity(item.id, quantities[item.id] - 1)}
                      className="w-6 h-6 rounded-full border border-gray-300 flex items-center justify-center"
                    >
                      <Minus className="h-3 w-3" />
                    </button>
                    <span className="text-sm font-medium w-6 text-center">{quantities[item.id]}</span>
                    <button
                      onClick={() => updateQuantity(item.id, quantities[item.id] + 1)}
                      className="w-6 h-6 rounded-full border border-gray-300 flex items-center justify-center"
                    >
                      <Plus className="h-3 w-3" />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Add-on Banner */}
      <div className="mx-4 mb-4 bg-gradient-to-r from-purple-500 to-pink-500 rounded-lg p-4 text-white">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm font-medium">Buy 1 more to enjoy add on item</p>
            <p className="text-xs opacity-90">Get exclusive deals on your next purchase</p>
          </div>
          <button size="sm" variant="secondary" className="text-purple-600">
            Shop Now
          </button>
        </div>
      </div>

      {/* You May Like Section */}
      <div className="px-4 pb-4">
        <h2 className="text-lg font-bold text-gray-900 mb-3">You May Like to Fill It With</h2>
        
        {/* Recommendation Filters */}
        <div className="flex space-x-2 mb-4 overflow-x-auto hide-scrollbar">
          {recommendationFilters.map((filter) => (
            <button
              key={filter.id}
              onClick={() => setActiveRecommendationFilter(filter.id)}
              className={cn(
                "px-3 py-1.5 rounded-full text-sm font-medium whitespace-nowrap transition-colors",
                activeRecommendationFilter === filter.id
                  ? "bg-primary text-white"
                  : "bg-gray-100 text-gray-600 hover:bg-gray-200"
              )}
            >
              {filter.label}
            </button>
          ))}
        </div>
        
        {/* Recommended Products Grid */}
        <div className="grid grid-cols-2 gap-3">
          {getFilteredRecommendations().map((product) => (
            <div key={product.id} className="bg-white rounded-lg overflow-hidden shadow-sm">
              <div className="relative">
                <img 
                  src={product.image} 
                  alt={product.title}
                  className="w-full h-32 object-cover"
                />
                {product.isHotDeal && (
                  <div className="absolute top-2 left-2 bg-red-500 text-white text-xs px-2 py-1 rounded">
                    Hot Deal
                  </div>
                )}
              </div>
              <div className="p-3">
                <h3 className="text-sm font-medium text-gray-900 mb-1 line-clamp-2">{product.title}</h3>
                <div className="flex items-center space-x-1 mb-2">
                  <Star className="h-3 w-3 text-yellow-400 fill-current" />
                  <span className="text-xs text-gray-600">{product.rating}</span>
                  <span className="text-xs text-gray-400">({product.reviews})</span>
                </div>
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center space-x-1">
                    <span className="text-primary font-bold text-sm">${product.price}</span>
                    <span className="text-gray-400 line-through text-xs">${product.originalPrice}</span>
                  </div>
                  <span className="bg-red-100 text-red-600 text-xs px-1 rounded">{product.discount} off</span>
                </div>
                <button size="sm" className="w-full">
                  <ShoppingCart className="h-3 w-3 mr-1" />
                  Add to Cart
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Floating Action buttons */}
      <div className="fixed left-4 bottom-36 flex flex-col space-y-3">
        {/* Coupon button */}
        <button onClick={handleCouponsClick} className="bg-orange-500 text-white p-3 rounded-full shadow-lg hover:bg-orange-600 transition-colors">
          <Tag className="h-5 w-5" />
        </button>
        
        {/* Scroll to Top */}
        {showScrollTop && (
          <button
            onClick={scrollToTop}
            className="bg-gray-600 text-white p-3 rounded-full shadow-lg hover:bg-gray-700 transition-colors"
          >
            <ArrowUp className="h-5 w-5" />
          </button>
        )}
      </div>

      {/* Sticky Footer */}
      <div className="fixed bottom-16 left-0 right-0 bg-white border-t border-gray-200 px-4 py-3">
        <div className="flex items-center justify-between mb-2">
          <div>
            <p className="text-sm text-gray-600">
              Subtotal: <span className="font-bold text-gray-900">${subtotal.toFixed(2)}</span>
            </p>
            <p className="text-xs text-green-600">
              You saved: ${totalSavings.toFixed(2)}
            </p>
          </div>
          <button 
            size="lg" 
            disabled={selectedItems.length === 0}
            className="bg-blue-500 px-8 text-white p-2 rounded-full shadow-lg hover:bg-blue-600 transition-colors"
          >
            Checkout ({selectedItems.length})
          </button>
        </div>
      </div>

      <BottomNavigation cartCount={cartCount} />
      
      {/* Product Options Modal */}
      {showProductOptions && (
        <ProductOptionsModal
          isOpen={!!showProductOptions}
          onClose={() => setShowProductOptions(null)}
          product={cartItems.find(item => item.id === showProductOptions)!}
        />
      )}
    </div>
  );
}