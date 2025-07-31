
import { useState, useRef, useEffect } from "react";
import { ChevronLeft, X, Flashlight, RotateCcw, Camera, ChevronDown, ChevronUp, Filter, Folder } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useLocation } from "wouter";

const filterCategories = [
  "All", "Women Clothing", "Men Clothing", "Kids", "Consumer Electronics", 
  "Hobbies", "Home & Kitchen", "Beauty", "Sports"
];

const sortOptions = [
  "Recommend", "Most Popular", "Price Low to High", "Price High to Low", "New Arrivals"
];

const sizeOptions = [
  "One-Size", "100PCS", "22*9cm", "3pcs Set"
];

const albumFolders = [
  { name: "All Pictures", count: 36434, image: "https://images.unsplash.com/photo-1441986300917-64674bd600d8?ixlib=rb-4.0.3&auto=format&fit=crop&w=50&h=50" },
  { name: "C1.1qalInc", count: 23, image: "https://images.unsplash.com/photo-1560472354-b33ff0c44a43?ixlib=rb-4.0.3&auto=format&fit=crop&w=50&h=50" },
  { name: "Expert RAW", count: 69, image: "https://images.unsplash.com/photo-1516035069371-29a1b244cc32?ixlib=rb-4.0.3&auto=format&fit=crop&w=50&h=50" },
  { name: "Interview Prep", count: 43, image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&auto=format&fit=crop&w=50&h=50" },
  { name: "My Data", count: 270, image: "https://images.unsplash.com/photo-1518186285589-2f7649de83e0?ixlib=rb-4.0.3&auto=format&fit=crop&w=50&h=50" },
  { name: "Job apps", count: 87, image: "https://images.unsplash.com/photo-1586717791821-3f44a563fa4c?ixlib=rb-4.0.3&auto=format&fit=crop&w=50&h=50" },
  { name: "My Companies Logos", count: 30, image: "https://images.unsplash.com/photo-1560472355-536de3962603?ixlib=rb-4.0.3&auto=format&fit=crop&w=50&h=50" },
];

const sampleResults = [
  {
    id: "vs1",
    title: "Manfinity VCAY Red Formal Suit",
    price: "35.28",
    image: "https://images.unsplash.com/photo-1594938298603-c8148c4dae35?ixlib=rb-4.0.3&auto=format&fit=crop&w=150&h=150",
    discount: "58%",
    originalPrice: "84.00",
    isEstimated: true,
    badge: "Choices"
  },
  {
    id: "vs2", 
    title: "Manfinity Men Red Business Suit",
    price: "43.40",
    image: "https://images.unsplash.com/photo-1507591064344-4c6ce005b128?ixlib=rb-4.0.3&auto=format&fit=crop&w=150&h=150",
    discount: "30%",
    originalPrice: "62.00",
    isEstimated: true,
    badge: null
  },
  {
    id: "vs3",
    title: "Manfinity VCAY Formal Suit Set",
    price: "23.10",
    image: "https://images.unsplash.com/photo-1617127365659-c47fa864d8bc?ixlib=rb-4.0.3&auto=format&fit=crop&w=150&h=150",
    discount: "58%",
    originalPrice: "55.00",
    isEstimated: true,
    badge: null
  },
  {
    id: "vs4",
    title: "Manfinity Premium Red Suit",
    price: "31.36",
    image: "https://images.unsplash.com/photo-1594938298603-c8148c4dae35?ixlib=rb-4.0.3&auto=format&fit=crop&w=150&h=150",
    discount: "44%",
    originalPrice: "56.00",
    isEstimated: true,
    badge: "Trends"
  }
];

const detectedFilters = [
  { id: "red", label: "Red", color: "#DC2626" },
  { id: "formal", label: "Formal" },
  { id: "suit", label: "Suit" },
  { id: "blazer", label: "Blazer" },
  { id: "menswear", label: "Men's Wear" }
];

export default function VisualSearch() {
  const [, setLocation] = useLocation();
  const [isScanning, setIsScanning] = useState(false);
  const [showResults, setShowResults] = useState(false);
  const [showFilters, setShowFilters] = useState(false);
  const [albumExpanded, setAlbumExpanded] = useState(false);
  const [selectedFolder, setSelectedFolder] = useState("All Pictures");
  const [selectedSort, setSelectedSort] = useState("Recommend");
  const [flashlightOn, setFlashlightOn] = useState(false);
  const [detectedObject, setDetectedObject] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);

  // Simulate camera stream
  useEffect(() => {
    const startCamera = async () => {
      try {
        const stream = await navigator.mediaDevices.getUserMedia({ 
          video: { facingMode: 'environment' } 
        });
        if (videoRef.current) {
          videoRef.current.srcObject = stream;
        }
      } catch (error) {
        console.log("Camera access denied or not available");
      }
    };

    startCamera();
    
    return () => {
      if (videoRef.current?.srcObject) {
        const tracks = (videoRef.current.srcObject as MediaStream).getTracks();
        tracks.forEach(track => track.stop());
      }
    };
  }, []);

  const handleCapture = () => {
    setIsScanning(true);
    setDetectedObject(true);
    
    // Simulate scanning process
    setTimeout(() => {
      setIsScanning(false);
      setShowResults(true);
    }, 2000);
  };

  const handleProductClick = (productId: string) => {
    setLocation(`/product/${productId}`);
  };

  return (
    <div className="h-screen bg-black text-white relative overflow-hidden">
      {/* Camera Background with simulated stream */}
      <video
        ref={videoRef}
        autoPlay
        playsInline
        muted
        className="absolute inset-0 w-full h-full object-cover"
      />
      
      {/* Animated dots overlay */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[...Array(15)].map((_, i) => (
          <div
            key={i}
            className="absolute w-2 h-2 bg-white rounded-full opacity-60 animate-pulse"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 2}s`,
              animationDuration: `${2 + Math.random() * 2}s`
            }}
          />
        ))}
      </div>

      {/* Top Header */}
      <div className="absolute top-0 left-0 right-0 z-50 bg-transparent">
        <div className="flex items-center justify-between px-4 py-4 pt-8">
          <Button 
            onClick={() => setLocation('/')}
            className="w-10 h-10 rounded-full bg-black/50 flex items-center justify-center backdrop-blur-sm"
          >
            <ChevronLeft className="h-6 w-6 text-white" />
          </Button>
          
          <h1 className="text-lg font-semibold text-white">Visual Search</h1>
          
          <div className="flex items-center space-x-2">
            <Button 
              onClick={() => setFlashlightOn(!flashlightOn)}
              className={cn(
                "w-10 h-10 rounded-full flex items-center justify-center backdrop-blur-sm",
                flashlightOn ? "bg-yellow-500/70" : "bg-black/50"
              )}
            >
              <Flashlight className="h-5 w-5 text-white" />
            </Button>
            <Button className="w-10 h-10 rounded-full bg-black/50 flex items-center justify-center backdrop-blur-sm">
              <RotateCcw className="h-5 w-5 text-white" />
            </Button>
          </div>
        </div>
      </div>

      {/* Detection Frame */}
      {detectedObject && (
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
          <div className="relative w-64 h-80 border-4 border-white rounded-lg">
            <div className="absolute -top-2 -left-2 w-4 h-4 border-t-4 border-l-4 border-white"></div>
            <div className="absolute -top-2 -right-2 w-4 h-4 border-t-4 border-r-4 border-white"></div>
            <div className="absolute -bottom-2 -left-2 w-4 h-4 border-b-4 border-l-4 border-white"></div>
            <div className="absolute -bottom-2 -right-2 w-4 h-4 border-b-4 border-r-4 border-white"></div>
            {isScanning && (
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="w-3/4 h-1 bg-white/80 animate-pulse"></div>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Center Instructions */}
      {!showResults && !detectedObject && (
        <div className="absolute inset-0 flex flex-col items-center justify-center text-center px-8">
          <div className="mb-8">
            <p className="text-lg text-white/90 mb-2">Aim at the product to identify</p>
            <p className="text-lg text-white/90">automatically</p>
          </div>
          
          <Button 
            onClick={handleCapture}
            className="w-20 h-20 rounded-full bg-white/20 border-4 border-white flex items-center justify-center backdrop-blur-sm hover:bg-white/30 transition-colors"
          >
            <Camera className="h-8 w-8 text-white" />
          </Button>
        </div>
      )}

      {/* Detected Product Filters (Floating Pills) */}
      {detectedObject && !isScanning && (
        <div className="absolute top-24 left-4 right-4 z-40">
          <div className="flex flex-wrap gap-2">
            {detectedFilters.map((filter) => (
              <Badge
                key={filter.id}
                className="bg-white/90 text-black hover:bg-white px-3 py-1 text-sm"
                style={filter.color ? { backgroundColor: filter.color, color: 'white' } : {}}
              >
                {filter.label}
              </Badge>
            ))}
          </div>
        </div>
      )}

      {/* Bottom Album Panel */}
      <div className={cn(
        "absolute bottom-0 left-0 right-0 bg-white/95 backdrop-blur-md rounded-t-3xl transition-all duration-300",
        albumExpanded ? "h-[70vh]" : "h-32"
      )}>
        {/* Album Header */}
        <div 
          className="flex items-center justify-between p-4 cursor-pointer"
          onClick={() => setAlbumExpanded(!albumExpanded)}
        >
          <div className="flex items-center space-x-3">
            <Folder className="h-5 w-5 text-gray-600" />
            <span className="font-medium text-gray-900">Pick from Album</span>
          </div>
          <div className="flex items-center space-x-2">
            <span className="text-sm text-gray-500">
              {albumExpanded ? "Fold" : "Unfold"}
            </span>
            {albumExpanded ? (
              <ChevronDown className="h-4 w-4 text-gray-500" />
            ) : (
              <ChevronUp className="h-4 w-4 text-gray-500" />
            )}
          </div>
        </div>

        {/* Album Content */}
        {albumExpanded && (
          <div className="px-4 pb-4 h-full overflow-y-auto">
            {/* Folder Selector */}
            <div className="mb-4">
              <select
                value={selectedFolder}
                onChange={(e) => setSelectedFolder(e.target.value)}
                className="w-full p-2 border border-gray-200 rounded-lg bg-white text-gray-900"
              >
                {albumFolders.map((folder) => (
                  <option key={folder.name} value={folder.name}>
                    {folder.name} ({folder.count})
                  </option>
                ))}
              </select>
            </div>

            {/* Album Grid */}
            <div className="grid grid-cols-4 gap-2">
              {[...Array(16)].map((_, i) => (
                <div key={i} className="aspect-square rounded-lg overflow-hidden bg-gray-200">
                  <img
                    src={`https://images.unsplash.com/photo-${1500000000000 + i}?ixlib=rb-4.0.3&auto=format&fit=crop&w=100&h=100`}
                    alt={`Gallery item ${i + 1}`}
                    className="w-full h-full object-cover cursor-pointer hover:opacity-80 transition-opacity"
                    onClick={() => {
                      setDetectedObject(true);
                      setIsScanning(true);
                      setTimeout(() => {
                        setIsScanning(false);
                        setShowResults(true);
                      }, 1500);
                    }}
                  />
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Results Panel */}
      {showResults && (
        <div className="absolute inset-0 bg-white z-50">
          {/* Results Header */}
          <div className="bg-white px-4 py-3 border-b border-gray-200">
            <div className="flex items-center justify-between mb-3">
              <Button onClick={() => setShowResults(false)}>
                <ChevronLeft className="h-6 w-6 text-gray-600" />
              </Button>
              <Button onClick={() => setLocation('/')}>
                <X className="h-6 w-6 text-gray-600" />
              </Button>
            </div>

            {/* Filter Pills */}
            <div className="flex items-center space-x-2 overflow-x-auto scrollbar-hide mb-3">
              {filterCategories.map((category) => (
                <Badge
                  key={category}
                  variant={category === "All" ? "default" : "outline"}
                  className="whitespace-nowrap text-sm px-3 py-1"
                >
                  {category}
                </Badge>
              ))}
              <Button
                variant="outline"
                size="sm"
                onClick={() => setShowFilters(!showFilters)}
                className="flex items-center space-x-1 whitespace-nowrap"
              >
                <Filter className="h-4 w-4" />
                <span>Filter</span>
                <Badge className="bg-red-500 text-white text-xs rounded-full h-4 w-4 flex items-center justify-center p-0">
                  1
                </Badge>
              </Button>
            </div>
          </div>

          {/* Filter Modal */}
          {showFilters && (
            <div className="absolute inset-0 bg-white z-60 overflow-y-auto">
              <div className="px-4 py-4">
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-lg font-semibold">Filters</h2>
                  <Button variant="ghost" onClick={() => setShowFilters(false)}>
                    <X className="h-5 w-5" />
                  </Button>
                </div>

                {/* Sort Section */}
                <div className="mb-6">
                  <h3 className="font-medium mb-3">Sort</h3>
                  <div className="grid grid-cols-2 gap-2">
                    {sortOptions.map((option) => (
                      <Button
                        key={option}
                        onClick={() => setSelectedSort(option)}
                        className={cn(
                          "p-2 rounded-lg border text-sm",
                          selectedSort === option
                            ? "border-primary bg-primary/5 text-primary"
                            : "border-gray-200 text-gray-600"
                        )}
                      >
                        {option}
                      </Button>
                    ))}
                  </div>
                </div>

                {/* Size Section */}
                <div className="mb-6">
                  <h3 className="font-medium mb-3">Size</h3>
                  <div className="grid grid-cols-2 gap-2">
                    {sizeOptions.map((size) => (
                      <Button
                        key={size}
                        className="p-2 rounded-lg border border-gray-200 text-sm text-gray-600 hover:border-primary hover:text-primary transition-colors"
                      >
                        {size}
                      </Button>
                    ))}
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="flex space-x-3 mt-8">
                  <Button variant="outline" className="flex-1">
                    Clear
                  </Button>
                  <Button className="flex-1" onClick={() => setShowFilters(false)}>
                    Done
                  </Button>
                </div>
              </div>
            </div>
          )}

          {/* Results Grid */}
          <div className="p-4 grid grid-cols-2 gap-3">
            {sampleResults.map((product) => (
              <div
                key={product.id}
                className="bg-white rounded-lg shadow-sm overflow-hidden cursor-pointer hover:shadow-md transition-shadow"
                onClick={() => handleProductClick(product.id)}
              >
                <div className="relative">
                  <img
                    src={product.image}
                    alt={product.title}
                    className="w-full h-40 object-cover"
                  />
                  {product.badge && (
                    <Badge className="absolute top-2 left-2 bg-blue-500 text-white text-xs">
                      {product.badge}
                    </Badge>
                  )}
                  <div className="absolute top-2 right-2 bg-red-500 text-white text-xs px-1 py-0.5 rounded">
                    -{product.discount}
                  </div>
                </div>
                <div className="p-3">
                  <h3 className="text-sm font-medium text-gray-900 mb-2 line-clamp-2">
                    {product.title}
                  </h3>
                  <div className="flex items-center space-x-2">
                    <span className="text-red-500 font-bold text-lg">${product.price}</span>
                    <span className="text-gray-400 line-through text-sm">${product.originalPrice}</span>
                  </div>
                  {product.isEstimated && (
                    <p className="text-xs text-gray-500 mt-1">Estimated</p>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Scanning Overlay */}
      {isScanning && (
        <div className="absolute inset-0 bg-black/70 flex items-center justify-center z-40">
          <div className="text-center">
            <div className="w-16 h-16 border-4 border-white border-t-transparent rounded-full animate-spin mb-4"></div>
            <p className="text-white text-lg">Scanning...</p>
          </div>
        </div>
      )}
    </div>
  );
}
