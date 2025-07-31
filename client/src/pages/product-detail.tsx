import { useState, useEffect } from "react";
import { ArrowLeft, Search, Camera, ShoppingCart, Share, MoreVertical, Heart, Plus, Minus, ChevronRight, Star, ThumbsUp, Flag } from "lucide-react";
import { cn } from "@/lib/utils";
// import { button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useLocation, useRoute } from "wouter";
import { useQuery } from "@tanstack/react-query";
import type { Product } from "@shared/schema";

const productImages = [
  "https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=400",
  "https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=400",
  "https://images.unsplash.com/photo-1506630448388-4e683c67ddb0?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=400",
  "https://images.unsplash.com/photo-1573408301185-9146fe634ad0?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=400"
];

const colorOptions = [
  { name: "Rose Gold", color: "#E8B4A0", image: "https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?ixlib=rb-4.0.3&auto=format&fit=crop&w=50&h=50" },
  { name: "Silver", color: "#C0C0C0", image: "https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?ixlib=rb-4.0.3&auto=format&fit=crop&w=50&h=50" },
  { name: "Gold", color: "#FFD700", image: "https://images.unsplash.com/photo-1506630448388-4e683c67ddb0?ixlib=rb-4.0.3&auto=format&fit=crop&w=50&h=50" },
];

const sizeOptions = ["One Size", "Small", "Medium", "Large"];

const reviews = [
  {
    id: "1",
    username: "f***a",
    rating: 5,
    date: "2024-01-15",
    text: "Beautiful earrings! The quality is amazing and they look exactly like the pictures. Shipping was fast too.",
    helpful: 12
  },
  {
    id: "2", 
    username: "m***e",
    rating: 4,
    date: "2024-01-10",
    text: "Pretty nice for the price. The color is slightly different from what I expected but still beautiful.",
    helpful: 8
  },
  {
    id: "3",
    username: "s***h",
    rating: 5,
    date: "2024-01-08", 
    text: "Love these! They're lightweight and comfortable to wear all day. Will definitely repurchase.",
    helpful: 15
  }
];

const recommendedProducts = [
  {
    id: "rec1",
    title: "Vintage Chain Bracelet",
    price: "18.99",
    originalPrice: "25.99",
    discount: "27%",
    image: "https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?ixlib=rb-4.0.3&auto=format&fit=crop&w=150&h=150",
    rating: 4.5
  },
  {
    id: "rec2",
    title: "Delicate Ring Set",
    price: "14.99", 
    originalPrice: "22.99",
    discount: "35%",
    image: "https://images.unsplash.com/photo-1506630448388-4e683c67ddb0?ixlib=rb-4.0.3&auto=format&fit=crop&w=150&h=150",
    rating: 4.7
  }
];

const recommendationFilters = ["All", "Best Sellers", "New Arrivals", "Under $20", "Trending"];

const sections = [
  { id: "goods", label: "Goods" },
  { id: "reviews", label: "Reviews" },
  { id: "recommendations", label: "Recommendations" }
];

export default function ProductDetail() {
  const [, setLocation] = useLocation();
  const [match, params] = useRoute("/product/:productId");
  const productId = params?.productId;
  
  const { data: product, isLoading, error } = useQuery<Product>({
    queryKey: ["/api/products", productId],
    queryFn: () => fetch(`/api/products/${productId}`).then(res => res.json()),
    enabled: !!productId,
  });
  
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [selectedColor, setSelectedColor] = useState(colorOptions[0]);
  const [selectedSize, setSelectedSize] = useState(sizeOptions[0]);
  const [quantity, setQuantity] = useState(1);
  const [activeSection, setActiveSection] = useState("goods");
  const [showStickyNav, setShowStickyNav] = useState(false);
  const [isWishlisted, setIsWishlisted] = useState(false);
  const [activeRecommendationFilter, setActiveRecommendationFilter] = useState("All");

  const cartCount = 3;
  const discountBadge = "20% OFF";

  // Show loading state
  if (isLoading) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="animate-spin inline-block w-8 h-8 border-2 border-primary border-t-transparent rounded-full"></div>
      </div>
    );
  }

  // Show error state
  if (error || !product) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-xl font-bold text-gray-900 mb-2">Product Not Found</h2>
          <p className="text-gray-600 mb-4">The product you're looking for doesn't exist.</p>
          <button onClick={() => setLocation("/")}>Go Home</button>
        </div>
      </div>
    );
  }

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY;
      setShowStickyNav(scrollPosition > 400);
      
      // Update active section based on scroll position
      const goodsSection = document.getElementById("goods-section");
      const reviewsSection = document.getElementById("reviews-section");
      const recommendationsSection = document.getElementById("recommendations-section");
      
      if (recommendationsSection && scrollPosition >= recommendationsSection.offsetTop - 100) {
        setActiveSection("recommendations");
      } else if (reviewsSection && scrollPosition >= reviewsSection.offsetTop - 100) {
        setActiveSection("reviews");
      } else {
        setActiveSection("goods");
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(`${sectionId}-section`);
    if (element) {
      element.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Top Navigation */}
      <header className="sticky top-0 z-50 bg-white shadow-sm">
        <div className="flex items-center justify-between px-4 py-3">
          <button 
            onClick={() => setLocation("/")}
            className="text-gray-600 hover:text-gray-900 transition-colors"
          >
            <ArrowLeft className="h-5 w-5" />
          </button>
          
          <div className="flex-1 mx-4 relative">
            <div className="relative">
              <input 
                type="text" 
                placeholder="Search..." 
                className="w-full bg-gray-100 rounded-full pl-4 pr-16 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary focus:bg-white transition-all"
              />
              <button className="absolute right-8 top-1/2 transform -translate-y-1/2 text-gray-400">
                <Camera className="h-4 w-4" />
              </button>
              <button className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400">
                <Search className="h-4 w-4" />
              </button>
            </div>
          </div>
          
          <div className="flex items-center space-x-3">
            <div className="relative">
              <ShoppingCart className="h-5 w-5 text-gray-600" />
              <Badge className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center p-0">
                {cartCount}
              </Badge>
              <Badge className="absolute -bottom-2 -right-1 bg-orange-500 text-white text-xs px-1 rounded">
                {discountBadge}
              </Badge>
            </div>
            
            <button className="text-gray-600 hover:text-gray-900 transition-colors">
              <Share className="h-4 w-4" />
            </button>
            
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <button className="text-gray-600 hover:text-gray-900 transition-colors">
                  <MoreVertical className="h-4 w-4" />
                </button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuItem>Favorite</DropdownMenuItem>
                <DropdownMenuItem>Share</DropdownMenuItem>
                <DropdownMenuItem>Report</DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
      </header>

      {/* Sticky Section Navigation */}
      {showStickyNav && (
        <nav className="sticky top-16 z-40 bg-white border-b border-gray-200">
          <div className="flex justify-around px-4 py-2">
            {sections.map((section) => (
              <button
                key={section.id}
                onClick={() => scrollToSection(section.id)}
                className={cn(
                  "pb-2 px-4 text-sm transition-colors",
                  activeSection === section.id
                    ? "text-primary border-b-2 border-primary font-semibold"
                    : "text-gray-600 hover:text-primary"
                )}
              >
                {section.label}
              </button>
            ))}
          </div>
        </nav>
      )}

      {/* Image Carousel */}
      <div className="relative bg-gray-50">
        <div className="relative h-96 overflow-hidden">
          <img 
            src={product.imageUrl || productImages[currentImageIndex]} 
            alt={product.title}
            className="w-full h-full object-cover"
          />
          <div className="absolute bottom-4 right-4 bg-black bg-opacity-50 text-white text-xs px-2 py-1 rounded">
            {currentImageIndex + 1}/{productImages.length}
          </div>
        </div>
        
        {/* Image Navigation Dots */}
        <div className="absolute bottom-2 left-1/2 transform -translate-x-1/2 flex space-x-2">
          {productImages.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentImageIndex(index)}
              className={cn(
                "w-2 h-2 rounded-full transition-all",
                index === currentImageIndex ? "bg-white" : "bg-white opacity-50"
              )}
            />
          ))}
        </div>
      </div>

      {/* Product Details */}
      <div id="goods-section" className="px-4 py-4">
        {/* Price Section */}
        <div className="mb-4">
          <div className="flex items-center space-x-2 mb-2">
            <span className="text-2xl font-bold text-primary">${product.price}</span>
            {product.originalPrice && (
              <span className="text-gray-400 line-through">${product.originalPrice}</span>
            )}
            {product.discount && (
              <span className="bg-red-100 text-red-600 text-sm px-2 py-1 rounded">-{product.discount}%</span>
            )}
          </div>
          {product.originalPrice && (
            <p className="text-green-600 text-sm">
              ${(parseFloat(product.price) * 0.7).toFixed(2)} with selected cart items
            </p>
          )}
        </div>

        {/* Store Banner */}
        <div className="bg-gradient-to-r from-purple-100 to-pink-100 rounded-lg p-3 mb-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-purple-500 rounded-full flex items-center justify-center">
                <span className="text-white text-xs font-bold">NW</span>
              </div>
              <div>
                <p className="font-semibold text-gray-900">new world jewelry</p>
                <div className="flex space-x-2">
                  <Star className="h-3 w-3 text-yellow-400 fill-current" />
                  <span className="text-xs text-gray-600">4.8 • Hot Store</span>
                </div>
              </div>
            </div>
            <ChevronRight className="h-4 w-4 text-gray-400" />
          </div>
        </div>

        {/* Product Title */}
        <h1 className="text-lg font-bold text-gray-900 mb-4">
          {product.title}
        </h1>

        {/* Color Selection */}
        <div className="mb-4">
          <h3 className="font-medium text-gray-900 mb-2">Color: {selectedColor.name}</h3>
          <div className="flex space-x-2">
            {colorOptions.map((color) => (
              <button
                key={color.name}
                onClick={() => setSelectedColor(color)}
                className={cn(
                  "relative w-12 h-12 rounded-lg border-2 overflow-hidden",
                  selectedColor.name === color.name ? "border-primary" : "border-gray-200"
                )}
              >
                <img 
                  src={color.image} 
                  alt={color.name}
                  className="w-full h-full object-cover"
                />
              </button>
            ))}
          </div>
        </div>

        {/* Size Selection */}
        <div className="mb-4">
          <h3 className="font-medium text-gray-900 mb-2">Size: {selectedSize}</h3>
          <div className="flex flex-wrap gap-2">
            {sizeOptions.map((size) => (
              <button
                key={size}
                onClick={() => setSelectedSize(size)}
                className={cn(
                  "px-4 py-2 border rounded-lg text-sm transition-colors",
                  selectedSize === size
                    ? "border-primary bg-primary text-white"
                    : "border-gray-300 text-gray-700 hover:border-gray-400"
                )}
              >
                {size}
              </button>
            ))}
          </div>
        </div>

        {/* Quantity */}
        <div className="mb-4">
          <h3 className="font-medium text-gray-900 mb-2">Quantity</h3>
          <div className="flex items-center space-x-3">
            <button
              onClick={() => setQuantity(Math.max(1, quantity - 1))}
              className="w-8 h-8 rounded-full border border-gray-300 flex items-center justify-center"
            >
              <Minus className="h-4 w-4" />
            </button>
            <span className="font-medium text-lg w-8 text-center">{quantity}</span>
            <button
              onClick={() => setQuantity(quantity + 1)}
              className="w-8 h-8 rounded-full border border-gray-300 flex items-center justify-center"
            >
              <Plus className="h-4 w-4" />
            </button>
          </div>
        </div>

        {/* Product Measurements */}
        <div className="mb-6 p-3 bg-gray-50 rounded-lg">
          <div className="flex items-center justify-between">
            <span className="font-medium text-gray-900">Product Measurements</span>
            <button className="text-primary text-sm hover:underline">Size Guide</button>
          </div>
          <div className="mt-2 text-sm text-gray-600">
            <p>Chain Length: 16" + 2" extender</p>
            <p>Pendant Size: 0.5" x 0.3"</p>
            <p>Weight: 8g</p>
          </div>
        </div>
      </div>

      {/* Reviews Section */}
      <div id="reviews-section" className="px-4 py-4 border-t border-gray-200">
        <h2 className="text-lg font-bold text-gray-900 mb-4">Reviews</h2>
        
        {/* Overall Rating */}
        <div className="mb-4 p-4 bg-gray-50 rounded-lg">
          <div className="flex items-center space-x-4 mb-3">
            <div className="text-3xl font-bold text-gray-900">4.7</div>
            <div>
              <div className="flex space-x-1 mb-1">
                {[1, 2, 3, 4, 5].map((star) => (
                  <Star key={star} className="h-4 w-4 text-yellow-400 fill-current" />
                ))}
              </div>
              <p className="text-sm text-gray-600">Based on 89 reviews</p>
            </div>
          </div>
          
          {/* Quality Indicators */}
          <div className="space-y-2">
            <div className="flex justify-between text-sm">
              <span>Will Repurchase</span>
              <span className="text-green-600">89%</span>
            </div>
            <div className="flex justify-between text-sm">
              <span>Fast Logistics</span>
              <span className="text-green-600">92%</span>
            </div>
            <div className="flex justify-between text-sm">
              <span>Good Quality</span>
              <span className="text-green-600">95%</span>
            </div>
          </div>
        </div>

        {/* Individual Reviews */}
        <div className="space-y-4">
          {reviews.map((review) => (
            <div key={review.id} className="border-b border-gray-100 pb-4">
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center space-x-2">
                  <span className="font-medium text-gray-900">{review.username}</span>
                  <div className="flex space-x-1">
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
              <p className="text-gray-700 text-sm mb-2">{review.text}</p>
              <div className="flex items-center justify-between">
                <button className="flex items-center space-x-1 text-gray-500 hover:text-primary transition-colors">
                  <ThumbsUp className="h-3 w-3" />
                  <span className="text-xs">Helpful ({review.helpful})</span>
                </button>
                <button className="text-gray-400 hover:text-gray-600 transition-colors">
                  <MoreVertical className="h-3 w-3" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Store Section */}
      <div className="px-4 py-4 border-t border-gray-200">
        <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
          <div className="flex items-center space-x-3">
            <div className="w-12 h-12 bg-purple-500 rounded-full flex items-center justify-center">
              <span className="text-white font-bold">NW</span>
            </div>
            <div>
              <h3 className="font-bold text-gray-900">new world jewelry</h3>
              <p className="text-xs text-gray-600">4.8★ • 1.2M followers • Active seller</p>
            </div>
          </div>
          <ChevronRight className="h-4 w-4 text-gray-400" />
        </div>
        
        <div className="flex space-x-3 mt-3">
          <button variant="outline" className="flex-1">Follow</button>
          <button variant="outline" className="flex-1">All Items</button>
        </div>
      </div>

      {/* Recommendations Section */}
      <div id="recommendations-section" className="px-4 py-4 border-t border-gray-200">
        <h2 className="text-lg font-bold text-gray-900 mb-4">You May Also Like</h2>
        
        {/* Recommendation Filters */}
        <div className="flex space-x-2 mb-4 overflow-x-auto hide-scrollbar">
          {recommendationFilters.map((filter) => (
            <button
              key={filter}
              onClick={() => setActiveRecommendationFilter(filter)}
              className={cn(
                "px-3 py-1.5 rounded-full text-sm font-medium whitespace-nowrap transition-colors",
                activeRecommendationFilter === filter
                  ? "bg-primary text-white"
                  : "bg-gray-100 text-gray-600 hover:bg-gray-200"
              )}
            >
              {filter}
            </button>
          ))}
        </div>
        
        {/* Recommended Products */}
        <div className="grid grid-cols-2 gap-3">
          {recommendedProducts.map((recProduct) => (
            <div 
              key={recProduct.id} 
              onClick={() => setLocation(`/product/${recProduct.id}`)}
              className="bg-white rounded-lg border border-gray-200 overflow-hidden cursor-pointer hover:shadow-md transition-shadow"
            >
              <img 
                src={recProduct.image} 
                alt={recProduct.title}
                className="w-full h-32 object-cover"
              />
              <div className="p-3">
                <h3 className="text-sm font-medium text-gray-900 mb-1 line-clamp-2">{recProduct.title}</h3>
                <div className="flex items-center space-x-1 mb-2">
                  <Star className="h-3 w-3 text-yellow-400 fill-current" />
                  <span className="text-xs text-gray-600">{recProduct.rating}</span>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-1">
                    <span className="text-primary font-bold text-sm">${recProduct.price}</span>
                    <span className="text-gray-400 line-through text-xs">${recProduct.originalPrice}</span>
                  </div>
                  <span className="bg-red-100 text-red-600 text-xs px-1 rounded">{recProduct.discount} off</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Sticky Bottom Bar */}
      <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 px-4 py-3 z-50">
        <div className="flex items-center space-x-3">
          <button
            onClick={() => setIsWishlisted(!isWishlisted)}
            className={cn(
              "p-3 rounded-full transition-colors",
              isWishlisted ? "bg-red-50 text-red-500" : "bg-gray-100 text-gray-600"
            )}
          >
            <Heart className={cn("h-5 w-5", isWishlisted && "fill-current")} />
          </button>
          
          <button className="flex-1 relative">
            Add to Cart
            <span className="absolute -top-1 -right-1 bg-orange-500 text-white text-xs px-1 rounded">
              -9%
            </span>
          </button>
        </div>
      </div>
    </div>
  );
}