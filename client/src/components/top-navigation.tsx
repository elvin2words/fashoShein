import { Search, Camera, Heart, Bell, Mail, Calendar } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { useLocation } from "wouter";
// import { button } from "@/components/ui/button";

interface TopNavigationProps {
  wishlistCount: number;
  notificationCount: number;
}

export default function TopNavigation({ wishlistCount, notificationCount }: TopNavigationProps) {
  const [, setLocation] = useLocation();
  const handleSearch = (query: string) => {
    // Implement search functionality here
    console.log("Searching for:", query);
    setLocation(`/search?query=${encodeURIComponent(query)}`);
  };
  const handleCameraSearch = () => {
    // Implement camera search functionality here
    console.log("Camera search initiated");
    setLocation("/visual-search");
  };
  const handleVoiceSearch = () => {
    // Implement voice search functionality here
    console.log("Voice search initiated");
  };
  const handleWishlistClick = () => {
    setLocation("/wishlist");
  };
  const handleNotificationsClick = () => {
    setLocation("/notifications");
  };
  const handleMailClick = () => {
    setLocation("/messages");
  };
  const handleCalendarClick = () => {
    setLocation("/calendar");
  };
  const handleSearchInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const query = event.target.value;
    handleSearch(query);
  };
  const handleSearchSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    const query = (event.target as HTMLFormElement).elements.namedItem("searchQuery") as HTMLInputElement;
    handleSearch(query.value);
  };
  const handleSearchKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter") {
      event.preventDefault();
      const query = (event.target as HTMLInputElement).value;
      handleSearch(query);
    }
  };

  return (
    <header className="bg-white sticky top-0 z-50 shadow-sm">
      <div className="flex items-center justify-between px-4 py-3">
        {/* Left Icons */}
        <div className="flex items-center space-x-4">
          {/* <button onClick={handleMailClick} className="text-gray-600 hover:text-primary transition-colors"> */}
          <button onClick={handleMailClick}>
            <Mail className="h-5 w-5" />
          </button>
          <button onClick={handleCalendarClick} className="text-gray-600 hover:text-primary transition-colors">
            <Calendar className="h-5 w-5" />
          </button>
        </div>
        
        {/* Search Bar */}
        <div className="flex-1 mx-4">
          <div className="relative">
            <input 
              type="text" 
              // onClick={handleSearch}
              placeholder="Search fashion & lifestyle..." 
              className="w-full bg-gray-100 rounded-full pl-4 pr-12 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-primary focus:bg-white transition-all"
            />
            <div className="absolute right-3 top-1/2 transform -translate-y-1/2 flex items-center space-x-2">
              <button onClick={handleCameraSearch} className="text-gray-400 hover:text-primary transition-colors">
                <Camera className="h-4 w-4" />
              </button>
              <button onClick={handleSearch} className="text-gray-400 hover:text-primary transition-colors">
                <Search className="h-4 w-4" />
              </button>
            </div>
          </div>
        </div>
        
        {/* Right Icons */}
        <div className="flex items-center space-x-4">
          <button onClick={handleWishlistClick} className="text-gray-600 hover:text-secondary transition-colors relative">
            <Heart className="h-5 w-5" />
            {wishlistCount > 0 && (
              <Badge className="absolute -top-1 -right-1 bg-secondary text-white text-xs rounded-full h-4 w-4 flex items-center justify-center p-0 border-0">
                {wishlistCount}
              </Badge>
            )}
          </button>
          <button onClick={handleNotificationsClick} className="text-gray-600 hover:text-accent transition-colors relative">
            <Bell className="h-5 w-5" />
            {notificationCount > 0 && (
              <Badge className="absolute -top-1 -right-1 bg-accent text-white text-xs rounded-full h-4 w-4 flex items-center justify-center p-0 border-0 badge-notification">
                {notificationCount}
              </Badge>
            )}
          </button>
        </div>
      </div>
    </header>
  );
}
