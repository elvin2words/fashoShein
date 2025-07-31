import { Card, CardContent } from "@/components/ui/card";
import { AlertCircle } from "lucide-react";
import TopNavigation from "@/components/top-navigation";
import BottomNavigation from "@/components/bottom-navigation";
import { useState } from "react";


export default function NotFound() {
  const [cartCount, setCartCount] = useState(3);
  const [wishlistCount, setWishlistCount] = useState(3);
  const [notificationCount, setNotificationCount] = useState(5);

  return (
    <div className="min-h-screen w-full flex items-center justify-center bg-gray-50">

      {/* <TopNavigation 
        wishlistCount={wishlistCount}
        notificationCount={notificationCount}
      /> */}

      <Card className="w-full max-w-md mx-4">
        <CardContent className="pt-6">
          <div className="flex mb-4 gap-2">
            <AlertCircle className="h-8 w-8 text-red-500" />
            <h1 className="text-2xl font-bold text-gray-900">404 Page Not Found</h1>
          </div>

          <p className="mt-4 text-sm text-gray-600">
            Did you forget to add the page to the router?
          </p>
          <p className="mt-4 text-sm text-gray-500">
            If you think this is an error, please contact support.
          </p>
        </CardContent>
      </Card>

      <BottomNavigation cartCount={cartCount} />
    </div>
  );
}
