import { Switch, Route } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import Home from "@/pages/home"; 
import Category from "@/pages/category";
import Trends from "@/pages/trends";
import Cart from "@/pages/cart";
import Profile from "@/pages/profile";
import ProductDetail from "@/pages/product-detail";
import Wishlist from "@/pages/wishlist";
import SuperDeals from "@/pages/super-deals";
import NotFound from "@/pages/not-found";
import FlashSale from "@/pages/flash-sale";
import Following from "@/pages/following";
import ShareEarn from "@/pages/share-earn";
import VisualSearch from "./pages/visual-search";
import MyProfile from "./pages/my-profile";
import QRScanner from "./pages/qr-scanner";
import Messages from "./pages/messages";
import Orders from "./pages/orders";
import Search from "./pages/search";
import SearchResults from "./pages/search-results";
import Coupons from "@/pages/coupons";
import Points from "@/pages/points";
import Wallet from "@/pages/wallet";
import GiftCard from "@/pages/gift-card";
import RecentlyViewed from "@/pages/recently-viewed";
import Settings from "@/pages/settings";
import BrandShop from "./pages/brand-shop";

function Router() {
  return (
    <Switch>
      <Route path="/" component={Home} />
      <Route path="/category" component={Category} />
      <Route path="/category/:categorySlug" component={Category} />
      <Route path="/trends" component={Trends} />
      <Route path="/cart" component={Cart} />
      <Route path="/wishlist" component={Wishlist} />
      <Route path="/super-deals" component={SuperDeals} />
      <Route path="/profile" component={Profile} />
      <Route path="/my-profile" component={MyProfile} />
      <Route path="/qr-scanner" component={QRScanner} />
      <Route path="/messages" component={Messages} />
      <Route path="/orders" component={Orders} />
      <Route path="/orders/${order}" component={Orders} />
      <Route path="/search" component={Search} />
      <Route path="/search-results" component={SearchResults} />
      {/* <Route path="/product" component={ProductDetail} /> */}
      <Route path="/product/:productId" component={ProductDetail} />
      <Route path="/brand/:brandId" component={BrandShop} />
      <Route path="/flash-sale" component={FlashSale} />
      <Route path="/following" component={Following} />
      <Route path="/share-earn" component={ShareEarn} />
      <Route path="/visual-search" component={VisualSearch} />
      <Route path="/coupons" component={Coupons} />
      <Route path="/points" component={Points} />
      <Route path="/wallet" component={Wallet} />
      <Route path="/gift-card" component={GiftCard} />
      <Route path="/recently-viewed" component={RecentlyViewed} />
      <Route path="/settings" component={Settings} />
      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Router />
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;
