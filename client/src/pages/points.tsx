
import { useState } from "react";
import { ArrowLeft, MessageCircle, Star, Badge } from "lucide-react";
import { useLocation } from "wouter";
import { button } from "@/components/ui/button";

export default function Points() {
  const [, setLocation] = useLocation();
  const [points] = useState(122);
  const [dollarValue] = useState(1.43);

  const handleBack = () => {
    setLocation("/profile");
  };

  const handleProductClick = (productId: string) => {
    setLocation(`/product/${productId}`);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-purple-900 via-blue-900 to-black relative overflow-hidden">
      {/* Cosmic Background Effects */}
      <div className="absolute inset-0">
        <div className="absolute top-20 left-10 w-2 h-2 bg-white rounded-full opacity-60"></div>
        <div className="absolute top-40 right-20 w-1 h-1 bg-white rounded-full opacity-40"></div>
        <div className="absolute top-60 left-1/4 w-1 h-1 bg-white rounded-full opacity-50"></div>
        <div className="absolute bottom-40 right-10 w-2 h-2 bg-purple-300 rounded-full opacity-30"></div>
        <div className="absolute bottom-60 left-20 w-1 h-1 bg-blue-300 rounded-full opacity-40"></div>
        
        {/* Cosmic rays/beams */}
        <div className="absolute top-0 right-0 w-64 h-64 bg-gradient-to-bl from-cyan-400/20 to-transparent transform rotate-45"></div>
        <div className="absolute bottom-0 left-0 w-48 h-48 bg-gradient-to-tr from-purple-400/20 to-transparent transform -rotate-12"></div>
      </div>

      {/* Header */}
      <header className="relative z-10 px-4 py-3 flex items-center justify-between">
        <button onClick={handleBack} className="p-2 hover:bg-white/10 rounded-full transition-colors">
          <ArrowLeft className="h-5 w-5 text-white" />
        </button>
        <h1 className="text-lg font-bold text-white">SHEIN POINTS</h1>
        <button className="p-2 hover:bg-white/10 rounded-full transition-colors">
          <div className="w-6 h-6 bg-red-500 rounded-full flex items-center justify-center">
            <span className="text-white text-xs">!</span>
          </div>
        </button>
      </header>

      {/* Points Display */}
      <div className="relative z-10 px-4 py-8 text-center">
        <div className="flex items-center justify-center space-x-2 mb-2">
          <div className="w-12 h-12 bg-yellow-500 rounded-full flex items-center justify-center">
            <span className="text-white font-bold text-lg">$</span>
          </div>
          <div className="text-white">
            <div className="text-3xl font-bold">{points}</div>
            <div className="text-sm opacity-80">≈ ${dollarValue}</div>
          </div>
          <div className="bg-gray-700 text-white px-3 py-1 rounded-full text-sm">
            Rules
          </div>
        </div>

        <div className="bg-gray-700 text-white px-4 py-2 rounded-full inline-block text-sm mb-8">
          Earn more points!
        </div>

        {/* Mascot Character */}
        <div className="relative mb-8">
          <div className="w-32 h-32 mx-auto relative">
            {/* Star character */}
            <div className="w-full h-full bg-gradient-to-b from-yellow-300 to-yellow-500 relative" 
                 style={{
                   clipPath: "polygon(50% 0%, 61% 35%, 98% 35%, 68% 57%, 79% 91%, 50% 70%, 21% 91%, 32% 57%, 2% 35%, 39% 35%)"
                 }}>
              {/* Eyes */}
              <div className="absolute top-8 left-8 w-3 h-3 bg-black rounded-full"></div>
              <div className="absolute top-8 right-8 w-3 h-3 bg-black rounded-full"></div>
              {/* Small smile */}
              <div className="absolute top-12 left-1/2 transform -translate-x-1/2 w-4 h-2 border-b-2 border-black rounded-full"></div>
            </div>
            {/* Arms/legs */}
            <div className="absolute -bottom-4 left-1/2 transform -translate-x-1/2 w-8 h-8 bg-yellow-400 rounded-full"></div>
          </div>
          
          {/* Platform */}
          <div className="w-40 h-20 mx-auto bg-gradient-to-b from-pink-400 to-purple-500 rounded-full relative -mt-4"></div>
        </div>

        <button className="bg-gradient-to-r from-yellow-400 to-yellow-500 text-black font-bold py-3 px-8 rounded-full text-lg hover:from-yellow-500 hover:to-yellow-600 transition-all">
          GET MORE
        </button>
      </div>

      {/* Side buttons */}
      <div className="absolute right-4 top-1/2 transform -translate-y-1/2 space-y-4">
        <button className="w-12 h-12 bg-cyan-400 rounded-full flex items-center justify-center">
          <MessageCircle className="h-6 w-6 text-white" />
        </button>
        <div className="text-xs text-white text-center">Comments</div>
      </div>

      <div className="absolute left-4 top-1/2 transform -translate-y-1/2 space-y-4">
        <button className="w-12 h-12 bg-purple-400 rounded-full flex items-center justify-center">
          <Star className="h-6 w-6 text-white" />
        </button>
        <div className="text-xs text-white text-center">Check-In</div>
      </div>

      <div className="absolute right-4 bottom-1/3 space-y-4">
        <button className="w-12 h-12 bg-red-400 rounded-full flex items-center justify-center">
          <div className="w-6 h-6 bg-white rounded-sm flex items-center justify-center">
            <div className="w-3 h-3 bg-red-400 rounded-sm"></div>
          </div>
        </button>
        <div className="text-xs text-white text-center">Tasks</div>
      </div>

      {/* Bottom Product Section */}
      <div className="absolute bottom-0 left-0 right-0 bg-white rounded-t-3xl p-4">
        <div className="grid grid-cols-2 gap-4">
          <div className="bg-gray-100 rounded-lg p-4 relative">
            <div className="text-center mb-2">
              <div className="text-gray-400 text-2xl font-bold">SHEIN</div>
            </div>
            <div className="text-left">
              <p className="text-xs text-gray-600 mb-2">Men'S 3D Print Black And Wh...</p>
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <span className="text-lg font-bold text-red-500">$9.10</span>
                  <Badge className="bg-red-100 text-red-600 text-xs">-9%</Badge>
                </div>
                <button 
                  onClick={() => handleProductClick("1")}
                  className="w-8 h-8 bg-white border border-gray-300 rounded-full flex items-center justify-center"
                >
                  <span className="text-sm">1+</span>
                </button>
              </div>
            </div>
          </div>

          <div className="bg-gray-100 rounded-lg p-4 relative">
            <div className="text-center mb-2">
              <div className="text-gray-400 text-2xl font-bold">SHEIN</div>
            </div>
            <div className="text-left">
              <p className="text-xs text-gray-600 mb-2">6 Pieces Non-Slip Phillips - S...</p>
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <span className="text-lg font-bold text-red-500">$3.00</span>
                  <span className="text-xs text-gray-500">10+ sold</span>
                </div>
                <button 
                  onClick={() => handleProductClick("2")}
                  className="w-8 h-8 bg-white border border-gray-300 rounded-full flex items-center justify-center"
                >
                  <span className="text-sm">1+</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
