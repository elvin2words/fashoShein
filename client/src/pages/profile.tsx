import { useState } from "react";
import { Edit, Camera, Settings, Gift, Wallet, ArrowUp, Star, Heart, Clock, Package, Truck, RotateCcw, MessageCircle, CheckCircle, FileText, Share } from "lucide-react";
import { cn } from "@/lib/utils";
import { useLocation } from "wouter";
// import { button } from "@/components/ui/button";
import BottomNavigation from "@/components/bottom-navigation";


const orderTabs = [
  { id: "unpaid", label: "Unpaid", icon: Package, count: 2, handler:"handleUnpaidClick"  },
  { id: "processing", label: "Processing", icon: Clock, count: 1, handler:"handleProcessingClick"  },
  { id: "shipped", label: "Shipped", icon: Truck, count: 3, handler:"handleShippedClick"  },
  { id: "review", label: "Review", icon: Star, count: 5, handler:"handleReviewsClick"  },
  { id: "returns", label: "Returns", icon: RotateCcw, count: 0, handler:"handleReturnsClick"  },
];

const userStats = [
  { id: "coupons", label: "Coupons", value: "12", icon: Gift, handler:"handleCouponsClick" },
  { id: "points", label: "Points", value: "2,480", icon: Star, handler:"handlePointsClick"  },
  { id: "wallet", label: "Wallet", value: "$0.00", icon: Wallet, handler:"handleWalletClick"  },
  { id: "gift-card", label: "Gift Card", value: "$25.00", icon: Gift, handler:"handleGiftcardClick"  },
];

const serviceOptions = [
  { id: "customer-service", label: "Customer Service", icon: MessageCircle, handler:"handleCustomerServiceClick"  },
  { id: "check-in", label: "Check In", icon: CheckCircle, handler:"handleCheckInClick"  },
  { id: "survey", label: "Survey Centre", icon: FileText, handler:"handleSurveyCentreClick"  },
  { id: "share-earn", label: "Share & Earn", icon: Share, handler:"handleShareAndEarnClick"  },
];

const wishlistItems = [
  {
    id: "w1",
    title: "Vintage Denim Jacket",
    price: "45.99",
    image: "https://images.unsplash.com/photo-1551028719-00167b16eac5?ixlib=rb-4.0.3&auto=format&fit=crop&w=100&h=100"
  },
  {
    id: "w2", 
    title: "Floral Summer Dress",
    price: "29.99",
    image: "https://images.unsplash.com/photo-1595777457583-95e059d581b8?ixlib=rb-4.0.3&auto=format&fit=crop&w=100&h=100"
  },
  {
    id: "w3",
    title: "Boho Statement Earrings",
    price: "12.99",
    image: "https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?ixlib=rb-4.0.3&auto=format&fit=crop&w=100&h=100"
  }
];

const followingBrands = [
  {
    id: "f1",
    name: "SHEIN Lady",
    image: "https://images.unsplash.com/photo-1566479179817-c0dd2e0bc1e5?ixlib=rb-4.0.3&auto=format&fit=crop&w=100&h=100"
  },
  {
    id: "f2",
    name: "new world jewelry", 
    image: "https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?ixlib=rb-4.0.3&auto=format&fit=crop&w=100&h=100"
  }
];

const historyItems = [
  {
    id: "h1",
    title: "Casual White Sneakers",
    price: "39.99",
    image: "https://images.unsplash.com/photo-1549298916-b41d501d3772?ixlib=rb-4.0.3&auto=format&fit=crop&w=100&h=100"
  }
];

const suggestedProducts = [
  {
    id: "s1",
    title: "Trendy Crop Top",
    price: "19.99",
    originalPrice: "29.99",
    discount: "33%",
    image: "https://images.unsplash.com/photo-1571513722275-4b41940f54b8?ixlib=rb-4.0.3&auto=format&fit=crop&w=150&h=150",
    rating: 4.5,
    reviews: "1.2k",
    isHotDeal: true
  },
  {
    id: "s2",
    title: "Elegant Midi Skirt",
    price: "34.99", 
    originalPrice: "49.99",
    discount: "30%",
    image: "https://images.unsplash.com/photo-1594633313593-bab3825d0caf?ixlib=rb-4.0.3&auto=format&fit=crop&w=150&h=150",
    rating: 4.3,
    reviews: "856",
    isHotDeal: false
  },
  {
    id: "s3",
    title: "Cozy Knit Sweater",
    price: "42.99",
    originalPrice: "59.99", 
    discount: "28%",
    image: "https://images.unsplash.com/photo-1434389677669-e08b4cac3105?ixlib=rb-4.0.3&auto=format&fit=crop&w=150&h=150",
    rating: 4.7,
    reviews: "2.1k",
    isHotDeal: true
  },
  {
    id: "s4",
    title: "Classic Leather Handbag",
    price: "89.99",
    originalPrice: "129.99",
    discount: "31%",
    image: "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?ixlib=rb-4.0.3&auto=format&fit=crop&w=150&h=150",
    rating: 4.6,
    reviews: "654",
    isHotDeal: false
  }
];

export default function Profile() {
  const [location, setLocation] = useLocation();
  const [showScrollTop, setShowScrollTop] = useState(false);
  const [cartCount] = useState(3);
  
  const userName = "young_mazwi";
  const userInitials = userName.charAt(0).toUpperCase();

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleProfileEdit = () => {
    setLocation("/my-profile");
  };

  const handleCouponsClick = () => {
    setLocation("/coupons");
  };

  const handlePointsClick = () => {
    setLocation("/points");
  };

  const handleWalletClick = () => {
    setLocation("/wallet");
  };
  
  const handleGiftcardClick = () => {
    setLocation("/gift-card");
  };

  const handleSettingsClick = () => {
    setLocation("/settings");
  };

  const handleScannerClick = () => {
    setLocation("/qr-scanner");
  };
    
  const handleOrdersClick = () => {
    setLocation("/orders");
  };
  
  const handleUnpaidClick = () => {
    setLocation("/orders/unpaid");
  };
  
  const handleProcessingClick = () => {
    setLocation("/orders/processing");
  };
  
  const handleShippedClick = () => {
    setLocation("/orders/shipped");
  };  

  const handleReviewsClick = () => {
    setLocation("/orders/reviews");
  };  

  const handleReturnsClick = () => {
    setLocation("/orders/returns");
  };  
    
  const handleWishlistClick = () => {
    setLocation("/wishlist");
  };  
  
  const handleFollowingClick = () => {
    setLocation("/following");
  };  
  
  const handleHistoryClick = () => {
    setLocation("/recently-viewed");
  };  
  
  const handleCustomerServiceClick = () => {
    setLocation("/customer-service");
  }; 
  
  const handleCheckInClick = () => {
    setLocation("/checkin");
  }; 
  
  const handleSurveyCentreClick = () => {
    setLocation("/survey");
  }; 
  
  const handleShareAndEarnClick = () => {
    setLocation("/share-earn");
  }; 

  const handlers: Record<string, () => void> = {
    handleCouponsClick,
    handlePointsClick,
    handleWalletClick,
    handleGiftcardClick,
    handleUnpaidClick,
    handleProcessingClick,
    handleShippedClick,
    handleReviewsClick,
    handleReturnsClick,
    handleCustomerServiceClick,
    handleCheckInClick,
    handleSurveyCentreClick,
    handleShareAndEarnClick,
  };

  return (
    <div className="min-h-screen bg-gray-50 pb-20">
      {/* Header */}
      <header className="bg-white p-4 shadow-sm">
        <div className="flex items-center justify-between">
          {/* Left - Avatar and Profile Info */}
          <div onClick={handleProfileEdit} className="flex items-center space-x-3">
            <div className="w-12 h-12 bg-primary rounded-full flex items-center justify-center">
              <span className="text-white font-bold text-lg">{userInitials}</span>
            </div>
            <div>
              <h1 className="font-bold text-gray-900 text-lg">{userName}</h1>
              <button className="flex items-center space-x-1 text-gray-500 text-sm hover:text-primary transition-colors">
                <span>My Profile Edit</span>
                <Edit className="h-3 w-3" />
              </button>
            </div>
          </div>
          
          {/* Right - Camera and Settings */}
          <div className="flex items-center space-x-4">
            <button onClick={handleScannerClick} className="text-gray-600 hover:text-primary transition-colors">
              <Camera className="h-5 w-5" />
            </button>
            <button onClick={handleSettingsClick} className="text-gray-600 hover:text-primary transition-colors">
              <Settings className="h-5 w-5" />
            </button>
          </div>
        </div>
      </header>

      {/* User Stats */}
      <div className="bg-white mx-4 mt-4 rounded-lg p-4 shadow-sm">
        <div className="grid grid-cols-4 gap-4">
          {userStats.map((stat) => {
            const Icon = stat.icon;
            return (
              <button onClick={handlers[stat.handler]} key={stat.id} className="flex flex-col items-center space-y-2 hover:bg-gray-50 p-2 rounded-lg transition-colors">
                <Icon className="h-5 w-5 text-primary" />
                <div className="text-center">
                  <div className="font-bold text-sm text-gray-900">{stat.value}</div>
                  <div className="text-xs text-gray-500">{stat.label}</div>
                </div>
              </button>
            );
          })}
        </div>
      </div>

      {/* My Orders */}
      <div onClick={handleOrdersClick} className="bg-white mx-4 mt-4 rounded-lg p-4 shadow-sm">
        <h2 className="font-bold text-gray-900 mb-3">My Orders</h2>
        <div className="grid grid-cols-5 gap-2">
          {orderTabs.map((tab) => {
            const Icon = tab.icon;
            return (
              <button onClick={handlers[tab.handler]} key={tab.id} className="flex flex-col items-center space-y-2 hover:bg-gray-50 p-2 rounded-lg transition-colors">
                <div className="relative">
                  <Icon className="h-5 w-5 text-gray-600" />
                  {tab.count > 0 && (
                    <div className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                      {tab.count}
                    </div>
                  )}
                </div>
                <span className="text-xs text-gray-700">{tab.label}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Wishlist, Following & History */}
      <div className="bg-white mx-4 mt-4 rounded-lg p-4 shadow-sm">
        <div className="space-y-4">
          {/* Wishlist */}
          <div onClick={handleWishlistClick}>
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center space-x-2">
                <Heart className="h-5 w-5 text-red-500" />
                <span className="font-medium text-gray-900">Wishlist</span>
              </div>
              <span className="text-xs text-gray-500">{wishlistItems.length} items</span>
            </div>
            <div className="flex space-x-2 overflow-x-auto hide-scrollbar">
              {/* To add each product click handling */}
              {wishlistItems.map((item) => (
                <div key={item.id} className="flex-shrink-0 w-16">
                  <img 
                    src={item.image} 
                    alt={item.title}
                    className="w-16 h-16 object-cover rounded-lg"
                  />
                  <p className="text-xs text-gray-600 mt-1 line-clamp-2">{item.title}</p>
                  <p className="text-xs text-primary font-bold">${item.price}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Following */}
          <div onClick={handleFollowingClick}>
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center space-x-2">
                <Star className="h-5 w-5 text-yellow-500" />
                <span className="font-medium text-gray-900">Following</span>
              </div>
              <span className="text-xs text-gray-500">{followingBrands.length} brands</span>
            </div>
            <div className="flex space-x-2">
              {/* To add handlicng of each brand click */}
              {followingBrands.map((brand) => (
                <div key={brand.id} className="flex-shrink-0 w-16">
                  <img 
                    src={brand.image} 
                    alt={brand.name}
                    className="w-16 h-16 object-cover rounded-lg"
                  />
                  <p className="text-xs text-gray-600 mt-1 text-center line-clamp-2">{brand.name}</p>
                </div>
              ))}
            </div>
          </div>

          {/* History */}
          <div onClick={handleHistoryClick}>
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center space-x-2">
                <Clock className="h-5 w-5 text-gray-500" />
                <span className="font-medium text-gray-900">History</span>
              </div>
              <span className="text-xs text-gray-500">{historyItems.length} item</span>
            </div>
            <div className="flex space-x-2">
              {historyItems.map((item) => (
                <div key={item.id} className="flex-shrink-0 w-16">
                  <img 
                    src={item.image} 
                    alt={item.title}
                    className="w-16 h-16 object-cover rounded-lg"
                  />
                  <p className="text-xs text-gray-600 mt-1 line-clamp-2">{item.title}</p>
                  <p className="text-xs text-primary font-bold">${item.price}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="flex flex-col md:flex-row gap-4">
          {/* Wishlist */}
          <div onClick={handleWishlistClick} className="bg-white rounded-lg p-4 shadow-sm flex-1">
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center space-x-2">
                <Heart className="h-5 w-5 text-red-500" />
                <span className="font-medium text-gray-900">Wishlist</span>
              </div>
              <span className="text-xs text-gray-500">{wishlistItems.length} items</span>
            </div>
            <div className="flex space-x-2 overflow-x-auto hide-scrollbar">
              {wishlistItems.map((item) => (
                <div key={item.id} className="flex-shrink-0 w-16">
                  <img
                    src={item.image}
                    alt={item.title}
                    className="w-16 h-16 object-cover rounded-lg"
                  />
                  <p className="text-xs text-gray-600 mt-1 line-clamp-2">{item.title}</p>
                  <p className="text-xs text-primary font-bold">${item.price}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Following */}
          <div onClick={handleFollowingClick} className="bg-white rounded-lg p-4 shadow-sm flex-1">
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center space-x-2">
                <Star className="h-5 w-5 text-yellow-500" />
                <span className="font-medium text-gray-900">Following</span>
              </div>
              <span className="text-xs text-gray-500">{followingBrands.length} brands</span>
            </div>
            <div className="flex space-x-2">
              {followingBrands.map((brand) => (
                <div key={brand.id} className="flex-shrink-0 w-16">
                  <img
                    src={brand.image}
                    alt={brand.name}
                    className="w-16 h-16 object-cover rounded-lg"
                  />
                  <p className="text-xs text-gray-600 mt-1 text-center line-clamp-2">{brand.name}</p>
                </div>
              ))}
            </div>
          </div>

          {/* History */}
          <div onClick={handleHistoryClick} className="bg-white rounded-lg p-4 shadow-sm flex-1">
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center space-x-2">
                <Clock className="h-5 w-5 text-gray-500" />
                <span className="font-medium text-gray-900">History</span>
              </div>
              <span className="text-xs text-gray-500">{historyItems.length} item</span>
            </div>
            <div className="flex space-x-2">
              {historyItems.map((item) => (
                <div key={item.id} className="flex-shrink-0 w-16">
                  <img
                    src={item.image}
                    alt={item.title}
                    className="w-16 h-16 object-cover rounded-lg"
                  />
                  <p className="text-xs text-gray-600 mt-1 line-clamp-2">{item.title}</p>
                  <p className="text-xs text-primary font-bold">${item.price}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

<div className="flex gap-3 px-4 mt-4">
  {/* Wishlist */}
  <div
    onClick={handleWishlistClick}
    className="bg-white rounded-lg p-4 shadow-sm flex-1 min-w-0"
  >
    <div className="flex items-center justify-between mb-3">
      <div className="flex items-center space-x-2">
        <Heart className="h-5 w-5 text-red-500" />
        <span className="font-medium text-gray-900">Wishlist</span>
      </div>
      <span className="text-xs text-gray-500">{wishlistItems.length} items</span>
    </div>
    <div className="flex space-x-2 overflow-x-auto hide-scrollbar">
      {wishlistItems.map((item) => (
        <div key={item.id} className="flex-shrink-0 w-16">
          <img
            src={item.image}
            alt={item.title}
            className="w-16 h-16 object-cover rounded-lg"
          />
          <p className="text-xs text-gray-600 mt-1 line-clamp-2">{item.title}</p>
          <p className="text-xs text-primary font-bold">${item.price}</p>
        </div>
      ))}
    </div>
  </div>

  {/* Following */}
  <div
    onClick={handleFollowingClick}
    className="bg-white rounded-lg p-4 shadow-sm flex-1 min-w-0"
  >
    <div className="flex items-center justify-between mb-3">
      <div className="flex items-center space-x-2">
        <Star className="h-5 w-5 text-yellow-500" />
        <span className="font-medium text-gray-900">Following</span>
      </div>
      <span className="text-xs text-gray-500">{followingBrands.length} brands</span>
    </div>
    <div className="flex space-x-2 overflow-x-auto hide-scrollbar">
      {followingBrands.map((brand) => (
        <div key={brand.id} className="flex-shrink-0 w-16">
          <img
            src={brand.image}
            alt={brand.name}
            className="w-16 h-16 object-cover rounded-lg"
          />
          <p className="text-xs text-gray-600 mt-1 text-center line-clamp-2">{brand.name}</p>
        </div>
      ))}
    </div>
  </div>

  {/* History */}
  <div
    onClick={handleHistoryClick}
    className="bg-white rounded-lg p-4 shadow-sm flex-1 min-w-0"
  >
    <div className="flex items-center justify-between mb-3">
      <div className="flex items-center space-x-2">
        <Clock className="h-5 w-5 text-gray-500" />
        <span className="font-medium text-gray-900">History</span>
      </div>
      <span className="text-xs text-gray-500">{historyItems.length} item</span>
    </div>
    <div className="flex space-x-2 overflow-x-auto hide-scrollbar">
      {historyItems.map((item) => (
        <div key={item.id} className="flex-shrink-0 w-16">
          <img
            src={item.image}
            alt={item.title}
            className="w-16 h-16 object-cover rounded-lg"
          />
          <p className="text-xs text-gray-600 mt-1 line-clamp-2">{item.title}</p>
          <p className="text-xs text-primary font-bold">${item.price}</p>
        </div>
      ))}
    </div>
  </div>
</div>

      </div>

      {/* Customer Service & Survey Center */}
      <div className="bg-white mx-4 mt-4 rounded-lg p-4 shadow-sm">
        <div className="grid grid-cols-4 gap-4">
          {serviceOptions.map((option) => {
            const Icon = option.icon;
            return (
              <button onClick={handlers[option.handler]} key={option.id} className="flex flex-col items-center space-y-2 hover:bg-gray-50 p-3 rounded-lg transition-colors">
                <Icon className="h-6 w-6 text-primary" />
                <span className="text-xs text-gray-700 text-center">{option.label}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Suggested Products */}
      <div className="px-4 py-4">
        <h2 className="text-lg font-bold text-gray-900 mb-4">Suggested for You</h2>
        <div className="grid grid-cols-2 gap-3">
          {suggestedProducts.map((product) => (
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
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-1">
                    <span className="text-primary font-bold text-sm">${product.price}</span>
                    <span className="text-gray-400 line-through text-xs">${product.originalPrice}</span>
                  </div>
                  <span className="bg-red-100 text-red-600 text-xs px-1 rounded">{product.discount} off</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Scroll to Top button */}
      {showScrollTop && (
        <button
          onClick={scrollToTop}
          className="fixed bottom-24 right-4 bg-primary text-white p-3 rounded-full shadow-lg hover:bg-primary/90 transition-all z-40"
        >
          <ArrowUp className="h-5 w-5" />
        </button>
      )}

      <BottomNavigation cartCount={cartCount} />
    </div>
  );
}