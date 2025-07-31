
import { useState } from "react";
import { ArrowLeft, HelpCircle, Clock } from "lucide-react";
import { useLocation } from "wouter";
import { button } from "@/components/ui/button";

export default function Wallet() {
  const [, setLocation] = useLocation();
  const [balance] = useState("0.00");

  const handleBack = () => {
    setLocation("/profile");
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white px-4 py-3 flex items-center justify-between shadow-sm">
        <button onClick={handleBack} className="p-2 hover:bg-gray-100 rounded-full transition-colors">
          <ArrowLeft className="h-5 w-5 text-gray-700" />
        </button>
        <h1 className="text-lg font-bold text-gray-900">Wallet</h1>
        <button className="p-2 hover:bg-gray-100 rounded-full transition-colors">
          <HelpCircle className="h-5 w-5 text-gray-700" />
        </button>
      </header>

      {/* Balance Card */}
      <div className="p-4">
        <div className="bg-white rounded-lg p-6 shadow-sm">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-600 text-sm mb-1">Total:</p>
              <p className="text-4xl font-bold text-gray-900">{balance}</p>
            </div>
            <button className="bg-gray-400 text-white px-6 py-2 hover:bg-gray-500 transition-colors">
              Withdraw
            </button>
          </div>
        </div>
      </div>

      {/* History Section */}
      <div className="px-4">
        <h2 className="text-xl font-bold text-gray-900 mb-6">History</h2>
        
        {/* Empty State */}
        <div className="text-center py-16">
          <div className="w-20 h-20 mx-auto mb-4 opacity-50">
            <div className="w-full h-full border-2 border-dashed border-gray-300 rounded-lg flex items-center justify-center relative">
              <div className="w-8 h-8 border border-gray-300 rounded bg-white"></div>
              <Clock className="absolute bottom-1 right-1 h-4 w-4 text-gray-400" />
            </div>
          </div>
          <p className="text-gray-600 text-lg">It is empty here :(</p>
        </div>
      </div>
    </div>
  );
}
