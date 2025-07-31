
import { useState } from "react";
import { ArrowLeft, ShoppingCart, Copy, Share2, Users, Smartphone, Gift } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useLocation } from "wouter";
import { cn } from "@/lib/utils";

const shareSteps = [
  {
    id: "invited-friends",
    icon: Users,
    title: "Invited Friends",
    // description: "Detailed Rules >",
    count: 0
  },
  {
    id: "friends-registration", 
    icon: Smartphone,
    title: "Friends Registration",
    description: "",
    count: 0
  },
  {
    id: "earn-rewards",
    icon: Gift,
    title: "Earn Rewards", 
    description: "",
    count: 0
  }
];

export default function ShareEarn() {
  const [, setLocation] = useLocation();
  const [cartCount] = useState(1);
  const [copied, setCopied] = useState(false);
  
  const shareUrl = "https://shein.top/eog9cvs";

  const handleBack = () => {
    setLocation("/profile");
  };

  const handleCartClick = () => {
    setLocation("/cart");
  };

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(shareUrl);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy:', err);
    }
  };

  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: 'Share & Earn 15% OFF',
          text: 'Get 15% OFF on your next purchase!',
          url: shareUrl,
        });
      } catch (err) {
        console.log('Error sharing:', err);
      }
    } else {
      // Fallback for browsers that don't support Web Share API
      handleCopy();
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white sticky px-4 py-3 flex items-center justify-between shadow-sm">
        <button onClick={handleBack} className="p-2 hover:bg-gray-100 rounded-full transition-colors">
          <ArrowLeft className="h-5 w-5 text-gray-700" />
        </button>
        <h1 className="text-lg font-bold text-gray-900">Share&Earn</h1>
        <div onClick={handleCartClick} className="relative">
          <button className="p-2 hover:bg-gray-100 rounded-full transition-colors">
            <ShoppingCart className="h-5 w-5 text-gray-700" />
          </button>
          {cartCount > 0 && (
            <div className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
              {cartCount}
            </div>
          )}
        </div>
      </header>

      {/* Hero Section */}
      <div className="relative">
        <div 
          className="h-80 bg-cover bg-center relative"
          style={{
            backgroundImage: "url('https://images.unsplash.com/photo-1441986300917-64674bd600d8?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=400')"
          }}
        >
          <div className="absolute inset-0 bg-black bg-opacity-40" />
          <div className="absolute justify-center bottom-8 left-4 right-4 text-white">
            <h1 className="text-4xl font-bold mb-4">Share & Earn</h1>
            <div className="flex space-x-4">
              <div className="bg-red-500 px-4 py-2 rounded text-center">
                <div className="text-lg font-bold">15% OFF Share</div>
                <div className="text-xs">FOR YOU Today</div>
              </div>
              <div className="bg-red-500 px-4 py-2 rounded text-center">
                <div className="text-lg font-bold">15% OFF</div>
                <div className="text-xs">FOR YOUR FRIENDS</div>                
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Start Sharing Section */}
      <div className="px-4 py-6 bg-white">
        <h2 className="text-lg text-center font-bold text-gray-900 mb-4">START SHARING</h2>
        
        <div className="flex items-center space-x-2 mb-4">
          <div className="flex-1 bg-gray-100 px-3 py-2 rounded text-sm text-gray-600 font-mono">
            {shareUrl}
          </div>
          <Button 
            variant="outline" size="sm" onClick={handleCopy}
            className={cn(
              "transition-colors",
              copied ? "bg-green-100 text-green-700 border-green-300" : ""
            )}
          >
            <Copy className="h-4 w-4 mr-1" />
            {copied ? "Copied!" : "COPY"}
          </Button>
        </div>

        <Button 
          onClick={handleShare}
          className="w-full bg-orange-500 hover:bg-orange-600 text-white font-bold py-3 rounded-lg mb-6"
        >
          <Share2 className="h-4 w-4 mr-2" />
          OTHERS
        </Button>

        {/* Progress Steps */}
        <div className="flex justify-between items-center mb-8">
          {shareSteps.map((step, index) => {
            const Icon = step.icon;
            return (
              <div key={step.id} className="flex flex-col items-center text-center flex-1">
                <div className="w-12 h-12 bg-gray-100 rounded-full flex items-center justify-center mb-2">
                  <Icon className="h-6 w-6 text-gray-600" />
                </div>
                <h3 className="text-xs font-medium text-gray-900 mb-1">{step.title}</h3>
                {step.description && (
                  <p className="text-xs text-gray-500">{step.description}</p>
                )}
                {/* {index < shareSteps.length - 1 && (
                  <div className="absolute top-6 left-1/2 w-20 h-px bg-gray-300 transform translate-x-4" />
                )} */}
              </div>
            );
          })}
        </div>
      </div>

      {/* Earn Rewards Section */}
      <div className="px-4 py-6 bg-white mt-4">
        <h2 className="text-lg font-bold text-gray-900 mb-6 text-center">EARN REWARDS</h2>
        
        <div className="flex justify-center space-x-8 mb-4">
          <div className="text-center">
            <div className="text-3xl font-bold text-orange-500">0</div>
            <div className="text-sm text-gray-600">Friends</div>
          </div>
          <div className="w-px bg-gray-300 h-12" />
          <div className="text-center">
            <div className="text-3xl font-bold text-orange-500">0</div>
            <div className="text-sm text-gray-600">Coupons</div>
          </div>
        </div>

        <div className="text-center">
          <button className="text-sm text-purple-600 hover:underline">
            View Details &gt;
          </button>
        </div>
      </div>

      {/* How it Works */}
      <div className="px-4 py-6 bg-white mt-4">
        <h3 className="font-bold text-gray-900 mb-4">How it Works:</h3>
        <div className="space-y-3 text-sm text-gray-600">
          <div className="flex items-start space-x-2">
            <div className="w-5 h-5 bg-purple-100 text-purple-600 rounded-full flex items-center justify-center text-xs font-bold mt-0.5">
              1
            </div>
            <p>Share your referral link with friends</p>
          </div>
          <div className="flex items-start space-x-2">
            <div className="w-5 h-5 bg-purple-100 text-purple-600 rounded-full flex items-center justify-center text-xs font-bold mt-0.5">
              2
            </div>
            <p>Your friends register using your link and get 15% OFF</p>
          </div>
          <div className="flex items-start space-x-2">
            <div className="w-5 h-5 bg-purple-100 text-purple-600 rounded-full flex items-center justify-center text-xs font-bold mt-0.5">
              3
            </div>
            <p>You earn 15% OFF coupon for each successful referral</p>
          </div>
        </div>
      </div>

      {/* Terms */}
      <div className="px-4 py-4 bg-white mt-4">
        <p className="text-xs text-gray-500 text-center">
          Terms and conditions apply. Offer valid for new users only.
        </p>
      </div>
    </div>
  );
}
