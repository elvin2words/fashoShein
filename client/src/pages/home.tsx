import TopNavigation from "@/components/top-navigation";
import CategoryTabs from "@/components/category-tabs";
import HeroBanner from "@/components/hero-banner";
import DualActionBanner from "@/components/dual-action-banner";
import CircularCategoryGrid from "@/components/circular-category-grid";
import SuperDealsSection from "@/components/super-deals-section";
import ProductFeed from "@/components/product-feed";
import BottomNavigation from "@/components/bottom-navigation";
import { useState } from "react";
import { useLocation } from "wouter";


export default function Home() {
  const [activeCategory, setActiveCategory] = useState("all");
  const [activeFilter, setActiveFilter] = useState("for-you");
  const [cartCount, setCartCount] = useState(3);
  const [wishlistCount, setWishlistCount] = useState(3);
  const [notificationCount, setNotificationCount] = useState(5);
  const [, setLocation] = useLocation();

  return (
    <div className="min-h-screen bg-gray-50 pb-20">
      <TopNavigation 
        wishlistCount={wishlistCount}
        notificationCount={notificationCount}
      />
      <CategoryTabs 
        activeCategory={activeCategory}
        onCategoryChange={setActiveCategory}
      />
      <HeroBanner />
      
      <DualActionBanner />
      <CircularCategoryGrid />
      <SuperDealsSection />
      <ProductFeed 
        activeCategory={activeCategory}
        activeFilter={activeFilter}
        onFilterChange={setActiveFilter}
      />
      <BottomNavigation cartCount={cartCount} />
    </div>
  );
}
