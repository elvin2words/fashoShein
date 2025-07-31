
import { useState } from "react";
import { ArrowLeft, HelpCircle, Shield, Gift, ChevronRight } from "lucide-react";
import { useLocation } from "wouter";
import { Button } from "@/components/ui/button";

const giftCards = [
  { id: "1", value: 80, price: 80, originalPrice: null },
  { id: "2", value: 500, price: 460, originalPrice: 500 },
  { id: "3", value: 100, price: 100, originalPrice: null },
  { id: "4", value: 200, price: 190, originalPrice: 200 },
  { id: "5", value: 300, price: 285, originalPrice: 300 },
  { id: "6", value: 80, price: 80, originalPrice: null, theme: "birthday" }
];

export default function GiftCard() {
  const [, setLocation] = useLocation();
  const [balance] = useState("0.00");

  const handleBack = () => {
    setLocation("/profile");
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-gradient-to-r from-red-400 to-red-500 px-4 py-3 flex items-center justify-between text-white">
        <button onClick={handleBack} className="p-2 hover:bg-white/10 rounded-full transition-colors">
          <ArrowLeft className="h-5 w-5" />
        </button>
        <h1 className="text-lg font-bold">Gift Card</h1>
        <button className="p-2 hover:bg-white/10 rounded-full transition-colors">
          <HelpCircle className="h-5 w-5" />
        </button>
      </header>

      {/* Features Banner */}
      <div className="bg-gradient-to-r from-red-400 to-red-500 px-4 pb-4">
        <div className="flex justify-center space-x-8 text-white text-sm">
          <div className="flex items-center space-x-2">
            <Shield className="h-4 w-4" />
            <span>Secure Payments</span>
          </div>
          <div className="flex items-center space-x-2">
            <Gift className="h-4 w-4" />
            <span>Flexible Use</span>
          </div>
        </div>
      </div>

      {/* Balance Card */}
      <div className="bg-gradient-to-r from-red-400 to-red-500 px-4 pb-6">
        <div className="bg-white/20 backdrop-blur-sm rounded-lg p-4">
          <div className="flex items-center justify-between text-white">
            <div className="flex items-center space-x-2">
              <span className="text-sm">Total Balance</span>
              <HelpCircle className="h-4 w-4 opacity-70" />
            </div>
            <ChevronRight className="h-4 w-4" />
          </div>
          <div className="flex items-center justify-between mt-2">
            <div className="text-2xl font-bold text-white">${balance}</div>
            <div className="flex space-x-3">
              <Button className="text-white text-sm hover:underline">
                Check Balance
              </Button>
              <button className="bg-red-600 text-white px-4 py-1 rounded-full text-sm hover:bg-red-700 transition-colors">
                Link Card
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Best Sellers Section */}
      <div className="p-4">
        <h2 className="text-xl font-bold text-gray-900 mb-4">Best Sellers</h2>
        
        <div className="grid grid-cols-2 gap-4">
          {giftCards.map((card) => (
            <div key={card.id} className="bg-white rounded-lg overflow-hidden shadow-sm">
              <div className={`h-32 ${card.theme === 'birthday' ? 'bg-gradient-to-br from-orange-200 to-orange-300' : 'bg-gradient-to-br from-red-500 to-red-600'} flex items-center justify-center relative`}>
                {card.theme === 'birthday' ? (
                  <div className="text-center">
                    <div className="text-orange-800 text-lg font-bold">HAPPY BIRTHDAY</div>
                    <div className="w-8 h-8 bg-purple-400 rounded mx-auto mt-2"></div>
                  </div>
                ) : (
                  <div className="text-white text-2xl font-bold">SHEIN</div>
                )}
                {/* Diamond patterns */}
                <div className="absolute top-2 left-2 w-4 h-4 border border-white/30 transform rotate-45"></div>
                <div className="absolute bottom-2 right-2 w-6 h-6 border border-white/30 transform rotate-45"></div>
              </div>
              <div className="p-3">
                <div className="text-sm text-gray-600 mb-1">Value ${card.value}.00</div>
                <div className="flex items-center space-x-2">
                  <span className="text-lg font-bold text-gray-900">Price ${card.price}.00</span>
                  {card.originalPrice && card.originalPrice !== card.price && (
                    <span className="text-sm text-red-500 line-through">${card.originalPrice}.00</span>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
