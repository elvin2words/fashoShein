
import { useState, useEffect } from "react";
import { useParams } from "wouter";
import { ChevronLeft, Search, MoreHorizontal, Heart, Star, TrendingUp, Users, ShoppingCart, ArrowUp, Filter, Share2, Eye, Clock } from "lucide-react";
import { cn } from "@/lib/utils";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { Card, CardContent } from "@/components/ui/card";
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Slider } from "@/components/ui/slider";
import ProductCard from "@/components/product-card";
import BottomNavigation from "@/components/bottom-navigation";
import { useLocation } from "wouter";

const brandData = {
  "sheglam": {
    id: "sheglam",
    name: "SHEGLAM",
    avatar: "https://images.unsplash.com/photo-1596462502278-27bfdc403348?ixlib=rb-4.0.3&auto=format&fit=crop&w=150&h=150",
    rating: 4.95,
    followers: "2.9M",
    items: "1.5K",
    isFollowing: false,
    badges: ["Trends", "Choices"],
    stats: {
      repurchase: "999K+",
      salesSurge: "+14%",
      followerSurge: "+25%"
    },
    description: "Premium, Innovative, Affordable & 100% CRUELTY FREE.",
    socialMedia: [
      { platform: "Instagram", handle: "@sheglam_official", followers: "2.1M" },
      { platform: "TikTok", handle: "@sheglam_official", followers: "1.8M" },
      { platform: "YouTube", handle: "SHEGLAM", followers: "890K" }
    ],
    banners: [
      "https://images.unsplash.com/photo-1596462502278-27bfdc403348?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=200",
      "https://images.unsplash.com/photo-1583394838336-acd977736f90?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=200",
      "https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=200"
    ],
    categories: [
      { name: "Face Makeup", icon: "🎨", image: "https://images.unsplash.com/photo-1596462502278-27bfdc403348?ixlib=rb-4.0.3&auto=format&fit=crop&w=100&h=100" },
      { name: "Lips", icon: "💋", image: "https://images.unsplash.com/photo-1583394838336-acd977736f90?ixlib=rb-4.0.3&auto=format&fit=crop&w=100&h=100" },
      { name: "Eyes", icon: "👁️", image: "https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?ixlib=rb-4.0.3&auto=format&fit=crop&w=100&h=100" },
      { name: "Tools", icon: "🖌️", image: "https://images.unsplash.com/photo-1487412947147-5cebf100ffc2?ixlib=rb-4.0.3&auto=format&fit=crop&w=100&h=100" }
    ]
  }
};

const searchSuggestions = ["Foundation", "Lipstick", "Eyeshadow", "Concealer", "Blush"];

const productFilters = {
  categories: ["Foundation", "Concealer", "Blush", "Highlighter", "Powder"],
  colors: [
    { name: "Multi", color: "bg-gradient-to-r from-red-500 to-blue-500" },
    { name: "Blue", color: "bg-blue-500" },
    { name: "White", color: "bg-white border" },
    { name: "Pink", color: "bg-pink-500" },
    { name: "Green", color: "bg-green-500" },
    { name: "Yellow", color: "bg-yellow-500" },
    { name: "Brown", color: "bg-yellow-800" },
    { name: "Purple", color: "bg-purple-500" },
    { name: "Khaki", color: "bg-yellow-600" },
    { name: "Orange", color: "bg-orange-500" }
  ]
};

const mockProducts = [
  {
    id: "1",
    title: "SHEGLAM Color Bloom Liquid Blush",
    price: "4.99",
    originalPrice: "6.99",
    discount: "25%",
    image: "https://images.unsplash.com/photo-1596462502278-27bfdc403348?ixlib=rb-4.0.3&auto=format&fit=crop&w=200&h=200",
    rating: 4.8,
    reviews: 1200,
    sold: "10K+",
    badges: ["Bestseller", "Choices"]
  },
  {
    id: "2",
    title: "SHEGLAM Press Refresh Setting Spray",
    price: "2.99",
    image: "https://images.unsplash.com/photo-1583394838336-acd977736f90?ixlib=rb-4.0.3&auto=format&fit=crop&w=200&h=200",
    rating: 4.9,
    reviews: 800,
    sold: "5K+",
    badges: ["New"]
  }
];

const mockReviews = [
  {
    id: "1",
    user: "f***g",
    rating: 5,
    date: "07/30/2025",
    comment: "Sales surge 15%, Is good😍 Easy to blend👍 Loved the packaging😍😍💗💗",
    images: ["https://images.unsplash.com/photo-1596462502278-27bfdc403348?ixlib=rb-4.0.3&auto=format&fit=crop&w=100&h=100"],
    productTitle: "SHEGLAM Just Blushed 9-Pan Eyeshadow Palette",
    productPrice: "$3.99"
  },
  {
    id: "2",
    user: "h***f",
    rating: 5,
    date: "07/30/2025",
    comment: "Amazing quality and colors! Perfect for everyday looks.",
    images: [],
    productTitle: "SHEGLAM Color Bloom Liquid Blush",
    productPrice: "$4.99"
  }
];

export default function BrandShop() {
  const params = useParams();
  const brandId = params.brandId || "sheglam";
  const brand = brandData[brandId as keyof typeof brandData] || brandData.sheglam;
  
  const [, setLocation] = useLocation();
  const [activeTab, setActiveTab] = useState("home");
  const [searchQuery, setSearchQuery] = useState("");
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [isFollowing, setIsFollowing] = useState(brand.isFollowing);
  const [showScrollTop, setShowScrollTop] = useState(false);
  const [showBrandDetail, setShowBrandDetail] = useState(false);
  const [showFilter, setShowFilter] = useState(false);
  const [cartCount] = useState(3);
  const [selectedFilters, setSelectedFilters] = useState({
    category: "",
    color: "",
    priceRange: [0, 50]
  });
  const [itemFilters, setItemFilters] = useState({
    recommend: true,
    mostPopular: false,
    price: false
  });
  const [reviewFilters, setReviewFilters] = useState({
    all: true,
    withPicture: false,
    fiveStar: false,
    fourStar: false
  });

  const tabs = [
    { id: "home", label: "Home" },
    { id: "item", label: "Item" },
    { id: "promo", label: "Promo" },
    { id: "review", label: "Review" }
  ];

  const filteredSuggestions = searchSuggestions.filter(suggestion =>
    suggestion.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleBack = () => {
    setLocation("/trends");
  };

  const handleSearch = () => {
    // Handle search functionality
  };

  const handleFollowToggle = () => {
    setIsFollowing(!isFollowing);
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  useEffect(() => {
    const handleScroll = () => {
      setShowScrollTop(window.scrollY > 300);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const DropdownMenu = () => (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant="ghost" size="icon" className="text-gray-600">
          <MoreHorizontal className="h-5 w-5" />
        </Button>
      </SheetTrigger>
      <SheetContent>
        <SheetHeader>
          <SheetTitle>Menu</SheetTitle>
        </SheetHeader>
        <div className="space-y-4 mt-6">
          <Button variant="outline" className="w-full justify-start" onClick={() => setIsFollowing(!isFollowing)}>
            <Users className="h-4 w-4 mr-2" />
            {isFollowing ? "Unfollow" : "Follow"}
          </Button>
          <Button variant="outline" className="w-full justify-start" onClick={() => setLocation("/wishlist")}>
            <Heart className="h-4 w-4 mr-2" />
            Wishlist
          </Button>
          <Button variant="outline" className="w-full justify-start">
            <Clock className="h-4 w-4 mr-2" />
            Recently Viewed
          </Button>
          <Button variant="outline" className="w-full justify-start">
            <Share2 className="h-4 w-4 mr-2" />
            Share
          </Button>
        </div>
      </SheetContent>
    </Sheet>
  );

  const BrandDetailModal = () => (
    <Dialog open={showBrandDetail} onOpenChange={setShowBrandDetail}>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle className="flex items-center space-x-3">
            <img src={brand.avatar} alt={brand.name} className="w-12 h-12 rounded-full" />
            <div>
              <div className="flex items-center space-x-2">
                <span className="font-bold">{brand.name}</span>
                {brand.badges.map((badge) => (
                  <Badge key={badge} variant="secondary" className="text-xs">{badge}</Badge>
                ))}
              </div>
            </div>
          </DialogTitle>
        </DialogHeader>
        <div className="space-y-6">
          <div className="grid grid-cols-3 gap-4 text-center">
            <div>
              <div className="text-2xl font-bold">{brand.rating}</div>
              <div className="text-sm text-gray-500">Rating</div>
            </div>
            <div>
              <div className="text-2xl font-bold">{brand.items}</div>
              <div className="text-sm text-gray-500">Items</div>
            </div>
            <div>
              <div className="text-2xl font-bold">{brand.followers}</div>
              <div className="text-sm text-gray-500">Followers</div>
            </div>
          </div>
          
          <div>
            <h4 className="font-semibold mb-2">Data Tags</h4>
            <div className="space-y-2">
              <div className="flex items-center space-x-2 text-sm">
                <Users className="h-4 w-4 text-orange-500" />
                <span>{brand.stats.repurchase} repurchase</span>
              </div>
              <div className="flex items-center space-x-2 text-sm">
                <TrendingUp className="h-4 w-4 text-orange-500" />
                <span>Sales Surge {brand.stats.salesSurge}</span>
              </div>
              <div className="flex items-center space-x-2 text-sm">
                <TrendingUp className="h-4 w-4 text-orange-500" />
                <span>Follower Surge {brand.stats.followerSurge}</span>
              </div>
            </div>
          </div>

          <div>
            <h4 className="font-semibold mb-2">About This Store</h4>
            <p className="text-sm text-gray-600">{brand.description}</p>
          </div>

          <Button 
            className="w-full bg-purple-500 hover:bg-purple-600 text-white"
            onClick={() => setLocation("/trends")}
          >
            <div className="flex items-center space-x-2">
              <img src="https://images.unsplash.com/photo-1441986300917-64674bd600d8?ixlib=rb-4.0.3&auto=format&fit=crop&w=50&h=50" alt="Trends Store" className="w-6 h-6 rounded" />
              <span>Explore More Trends Store</span>
            </div>
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );

  const FilterDrawer = () => (
    <Sheet open={showFilter} onOpenChange={setShowFilter}>
      <SheetContent side="bottom" className="h-[80vh]">
        <SheetHeader>
          <SheetTitle>Filter</SheetTitle>
        </SheetHeader>
        <div className="space-y-6 mt-6">
          <div>
            <h3 className="font-semibold mb-3">Category</h3>
            <div className="grid grid-cols-3 gap-2">
              {productFilters.categories.map((category) => (
                <Button
                  key={category}
                  variant={selectedFilters.category === category ? "default" : "outline"}
                  size="sm"
                  onClick={() => setSelectedFilters(prev => ({ ...prev, category }))}
                >
                  {category}
                </Button>
              ))}
            </div>
          </div>

          <div>
            <h3 className="font-semibold mb-3">Color</h3>
            <div className="grid grid-cols-4 gap-3">
              {productFilters.colors.map((color) => (
                <div key={color.name} className="text-center">
                  <button
                    className={cn(
                      "w-12 h-12 rounded-full mb-1",
                      color.color,
                      selectedFilters.color === color.name && "ring-2 ring-primary"
                    )}
                    onClick={() => setSelectedFilters(prev => ({ ...prev, color: color.name }))}
                  />
                  <span className="text-xs">{color.name}</span>
                </div>
              ))}
            </div>
          </div>

          <div>
            <h3 className="font-semibold mb-3">Price Range (USD)</h3>
            <div className="px-2">
              <Slider
                value={selectedFilters.priceRange}
                onValueChange={(value) => setSelectedFilters(prev => ({ ...prev, priceRange: value }))}
                max={100}
                step={1}
                className="w-full"
              />
              <div className="flex justify-between text-sm text-gray-500 mt-2">
                <span>US${selectedFilters.priceRange[0]}</span>
                <span>US${selectedFilters.priceRange[1]}</span>
              </div>
            </div>
          </div>

          <div className="flex space-x-4 pt-4">
            <Button variant="outline" className="flex-1" onClick={() => setSelectedFilters({ category: "", color: "", priceRange: [0, 50] })}>
              Clear
            </Button>
            <Button className="flex-1" onClick={() => setShowFilter(false)}>
              Done
            </Button>
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );

  return (
    <div className="min-h-screen bg-gray-50 pb-20">
      {/* Header */}
      <header className="bg-white sticky top-0 z-50 shadow-sm">
        <div className="flex items-center justify-between px-4 py-3">
          <button onClick={handleBack} className="text-gray-600 hover:text-primary transition-colors">
            <ChevronLeft className="h-5 w-5" />
          </button>
          
          <div className="flex-1 mx-4 relative">
            <div className="relative">
              <input 
                type="text" 
                placeholder={`Search ${brand.name}...`}
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                onFocus={() => setShowSuggestions(true)}
                onBlur={() => setTimeout(() => setShowSuggestions(false), 200)}
                className="w-full bg-gray-100 rounded-full pl-4 pr-10 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-primary focus:bg-white transition-all"
              />
              <button 
                onClick={handleSearch}
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-primary transition-colors"
              >
                <Search className="h-4 w-4" />
              </button>
            </div>
            
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
          
          <DropdownMenu />
        </div>
      </header>

      {/* Brand Card */}
      <div className="bg-white mx-4 mt-4 rounded-lg shadow-sm border border-gray-100 overflow-hidden">
        <div className="p-4" onClick={() => setShowBrandDetail(true)}>
          <div className="flex items-start justify-between mb-3">
            <div className="flex items-center space-x-3">
              <img src={brand.avatar} alt={brand.name} className="w-12 h-12 rounded-full" />
              <div>
                <div className="flex items-center space-x-2">
                  <h2 className="text-lg font-bold text-gray-900">{brand.name}</h2>
                  {brand.badges.map((badge) => (
                    <Badge key={badge} variant="secondary" className="text-xs">{badge}</Badge>
                  ))}
                </div>
                <div className="flex items-center space-x-4 mt-1">
                  <div className="flex items-center space-x-1">
                    <Star className="h-3 w-3 text-yellow-400 fill-current" />
                    <span className="text-sm text-gray-600">{brand.rating}</span>
                  </div>
                  <span className="text-sm text-gray-600">{brand.followers} Followers</span>
                </div>
              </div>
            </div>
            
            <Button
              variant={isFollowing ? "outline" : "default"}
              size="sm"
              onClick={(e) => {
                e.stopPropagation();
                handleFollowToggle();
              }}
            >
              {isFollowing ? "Following" : "Follow"}
            </Button>
          </div>

          <div className="flex items-center justify-around py-3 border-t border-gray-100">
            <div className="flex items-center space-x-1 text-sm text-gray-600">
              <Users className="h-4 w-4 text-orange-500" />
              <span>{brand.stats.repurchase} repurchase</span>
            </div>
            <div className="flex items-center space-x-1 text-sm text-gray-600">
              <TrendingUp className="h-4 w-4 text-orange-500" />
              <span>Sales surge {brand.stats.salesSurge}</span>
            </div>
            <div className="flex items-center space-x-1 text-sm text-gray-600">
              <TrendingUp className="h-4 w-4 text-orange-500" />
              <span>Follower surge {brand.stats.followerSurge}</span>
            </div>
          </div>

          <div className="pt-3 border-t border-gray-100">
            <Button 
              variant="outline" 
              className="w-full text-purple-600 border-purple-200 hover:bg-purple-50"
              onClick={(e) => {
                e.stopPropagation();
                setLocation("/trends");
              }}
            >
              This store is selected as a "Trends Store"
            </Button>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="bg-white mx-4 mt-4 rounded-lg shadow-sm border border-gray-100">
        <div className="flex justify-around p-1">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={cn(
                "flex-1 py-3 px-4 text-sm font-medium transition-colors rounded-lg",
                activeTab === tab.id
                  ? "bg-gray-100 text-primary"
                  : "text-gray-600 hover:text-primary"
              )}
            >
              {tab.label}
            </button>
          ))}
        </div>
      </div>

      {/* Tab Content */}
      <div className="px-4 mt-4 space-y-4">
        {/* Home Tab */}
        {activeTab === "home" && (
          <div className="space-y-6">
            {/* Banner Carousel */}
            <Card>
              <CardContent className="p-0">
                <Carousel className="w-full">
                  <CarouselContent>
                    {brand.banners.map((banner, index) => (
                      <CarouselItem key={index}>
                        <img 
                          src={banner} 
                          alt={`Banner ${index + 1}`}
                          className="w-full h-48 object-cover rounded-lg"
                        />
                      </CarouselItem>
                    ))}
                  </CarouselContent>
                  <CarouselPrevious className="left-2" />
                  <CarouselNext className="right-2" />
                </Carousel>
              </CardContent>
            </Card>

            {/* Shop by Category */}
            <div>
              <h3 className="text-lg font-bold mb-4">Shop by Category</h3>
              <div className="grid grid-cols-4 gap-3">
                {brand.categories.map((category) => (
                  <div key={category.name} className="text-center">
                    <div className="bg-white rounded-lg shadow-sm border p-3 mb-2">
                      <img 
                        src={category.image} 
                        alt={category.name}
                        className="w-full aspect-square object-cover rounded"
                      />
                    </div>
                    <span className="text-xs text-gray-600">{category.name}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Follow Us */}
            <div>
              <h3 className="text-lg font-bold mb-4">Follow Us</h3>
              <div className="space-y-3">
                {brand.socialMedia.map((social) => (
                  <div key={social.platform} className="bg-white rounded-lg shadow-sm border p-3 flex items-center justify-between">
                    <div>
                      <div className="font-medium">{social.platform}</div>
                      <div className="text-sm text-gray-600">{social.handle}</div>
                    </div>
                    <div className="text-sm text-gray-500">{social.followers}</div>
                  </div>
                ))}
              </div>
            </div>

            {/* Best Selling */}
            <div>
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-bold">Best Selling</h3>
                <Button variant="ghost" size="sm">View More &gt;</Button>
              </div>
              <div className="overflow-x-auto">
                <div className="flex space-x-3 pb-2">
                  {mockProducts.map((product) => (
                    <div key={product.id} className="flex-shrink-0 w-48">
                      <ProductCard {...product} />
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Recommended Products */}
            <div>
              <h3 className="text-lg font-bold mb-4">Recommended</h3>
              <div className="grid grid-cols-2 gap-3">
                {mockProducts.map((product) => (
                  <ProductCard key={product.id} {...product} />
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Item Tab */}
        {activeTab === "item" && (
          <div className="space-y-4">
            {/* Category Filters */}
            <div className="overflow-x-auto">
              <div className="flex space-x-2 pb-2">
                {brand.categories.map((category) => (
                  <div key={category.name} className="flex items-center space-x-2 bg-white rounded-full px-3 py-2 border flex-shrink-0">
                    <img src={category.image} alt={category.name} className="w-6 h-6 rounded-full" />
                    <span className="text-sm">{category.name}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Secondary Filters */}
            <div className="flex items-center space-x-2 overflow-x-auto pb-2">
              <Button 
                variant={itemFilters.recommend ? "default" : "outline"} 
                size="sm"
                onClick={() => setItemFilters(prev => ({ ...prev, recommend: !prev.recommend }))}
              >
                Recommend
              </Button>
              <Button 
                variant={itemFilters.mostPopular ? "default" : "outline"} 
                size="sm"
                onClick={() => setItemFilters(prev => ({ ...prev, mostPopular: !prev.mostPopular }))}
              >
                Most Popular
              </Button>
              <Button 
                variant={itemFilters.price ? "default" : "outline"} 
                size="sm"
                onClick={() => setItemFilters(prev => ({ ...prev, price: !prev.price }))}
              >
                Price ↑
              </Button>
              <Button 
                variant="outline" 
                size="sm"
                onClick={() => setShowFilter(true)}
              >
                <Filter className="h-4 w-4 mr-1" />
                Filter
              </Button>
            </div>

            {/* Products Grid */}
            <div className="grid grid-cols-2 gap-3">
              {mockProducts.map((product) => (
                <ProductCard key={product.id} {...product} />
              ))}
            </div>
          </div>
        )}

        {/* Promo Tab */}
        {activeTab === "promo" && (
          <div className="space-y-6">
            {/* Promotion Banners */}
            <div className="grid grid-cols-2 gap-3">
              <div className="bg-gradient-to-r from-orange-400 to-red-500 text-white p-4 rounded-lg">
                <div className="text-2xl font-bold">30%OFF</div>
                <div className="text-sm">Orders $15+</div>
              </div>
              <div className="bg-gradient-to-r from-red-500 to-pink-500 text-white p-4 rounded-lg">
                <div className="text-2xl font-bold">25%OFF</div>
                <div className="text-sm">Limited time</div>
              </div>
            </div>

            {/* Flash Sale */}
            <div className="bg-white rounded-lg shadow-sm border p-4">
              <div className="flex items-center justify-between mb-3">
                <h3 className="text-lg font-bold">⚡ Flash Sale</h3>
                <div className="text-sm text-red-500">Ends in 11:14:22</div>
              </div>
              <div className="overflow-x-auto">
                <div className="flex space-x-3 pb-2">
                  {mockProducts.map((product) => (
                    <div key={product.id} className="flex-shrink-0 w-32">
                      <img src={product.image} alt={product.title} className="w-full aspect-square object-cover rounded-lg mb-2" />
                      <div className="text-xs font-medium text-red-500">${product.price}</div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Discount Filters */}
            <div className="flex space-x-2 overflow-x-auto pb-2">
              <Button variant="outline" size="sm">From 50% off</Button>
              <Button variant="outline" size="sm">Up to 50% off</Button>
            </div>

            {/* Discounted Products */}
            <div className="grid grid-cols-2 gap-3">
              {mockProducts.map((product) => (
                <ProductCard key={product.id} {...product} />
              ))}
            </div>
          </div>
        )}

        {/* Review Tab */}
        {activeTab === "review" && (
          <div className="space-y-4">
            {/* Review Filters */}
            <div className="overflow-x-auto">
              <div className="flex space-x-2 pb-2">
                <Button 
                  variant={reviewFilters.all ? "default" : "outline"} 
                  size="sm"
                  onClick={() => setReviewFilters(prev => ({ ...prev, all: !prev.all }))}
                >
                  All(1000+)
                </Button>
                <Button 
                  variant={reviewFilters.withPicture ? "default" : "outline"} 
                  size="sm"
                  onClick={() => setReviewFilters(prev => ({ ...prev, withPicture: !prev.withPicture }))}
                >
                  📷 With Picture(1000+)
                </Button>
                <Button 
                  variant={reviewFilters.fiveStar ? "default" : "outline"} 
                  size="sm"
                  onClick={() => setReviewFilters(prev => ({ ...prev, fiveStar: !prev.fiveStar }))}
                >
                  5 ⭐ (1000+)
                </Button>
                <Button 
                  variant={reviewFilters.fourStar ? "default" : "outline"} 
                  size="sm"
                  onClick={() => setReviewFilters(prev => ({ ...prev, fourStar: !prev.fourStar }))}
                >
                  4 ⭐ (800+)
                </Button>
              </div>
            </div>

            {/* Reviews List */}
            <div className="space-y-4">
              {mockReviews.map((review) => (
                <div key={review.id} className="bg-white rounded-lg shadow-sm border p-4">
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center space-x-2">
                      <span className="font-medium text-sm">{review.user}</span>
                      <div className="flex">
                        {[1, 2, 3, 4, 5].map((star) => (
                          <Star 
                            key={star} 
                            className={cn(
                              "h-3 w-3",
                              star <= review.rating ? "text-yellow-400 fill-current" : "text-gray-300"
                            )} 
                          />
                        ))}
                      </div>
                    </div>
                    <span className="text-xs text-gray-500">{review.date}</span>
                  </div>
                  
                  <p className="text-sm text-gray-700 mb-3">{review.comment}</p>
                  
                  {review.images.length > 0 && (
                    <div className="flex space-x-2 mb-3">
                      {review.images.map((image, index) => (
                        <img 
                          key={index}
                          src={image} 
                          alt="Review" 
                          className="w-16 h-16 object-cover rounded"
                        />
                      ))}
                    </div>
                  )}
                  
                  <div className="flex items-center justify-between pt-3 border-t border-gray-100">
                    <div className="flex items-center space-x-2">
                      <img 
                        src={mockProducts[0].image} 
                        alt={review.productTitle}
                        className="w-8 h-8 object-cover rounded"
                      />
                      <div>
                        <div className="text-xs text-gray-600">{review.productTitle}</div>
                        <div className="text-xs font-medium text-primary">{review.productPrice}</div>
                      </div>
                    </div>
                    <Button size="sm" variant="outline">
                      <ShoppingCart className="h-3 w-3" />
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Floating Cart Button */}
      <button 
        onClick={() => setLocation("/cart")}
        className="fixed bottom-24 right-4 bg-primary text-white p-4 rounded-full shadow-lg hover:bg-primary/90 transition-all z-40"
      >
        <ShoppingCart className="h-5 w-5" />
        {cartCount > 0 && (
          <Badge className="absolute -top-2 -right-2 bg-red-500 text-white text-xs min-w-[20px] h-5 rounded-full flex items-center justify-center">
            {cartCount}
          </Badge>
        )}
      </button>

      {/* Scroll to Top Button */}
      {showScrollTop && (
        <button
          onClick={scrollToTop}
          className="fixed bottom-24 left-4 bg-white text-gray-600 p-3 rounded-full shadow-lg hover:bg-gray-50 transition-all z-40 border"
        >
          <ArrowUp className="h-5 w-5" />
        </button>
      )}

      <BrandDetailModal />
      <FilterDrawer />
      <BottomNavigation cartCount={cartCount} />
    </div>
  );
}
