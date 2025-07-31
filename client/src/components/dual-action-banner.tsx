import { Truck, Zap } from "lucide-react";
import { useLocation } from "wouter";

export default function DualActionBanner() {
  const [, setLocation] = useLocation();
  
  const handleShippingClick = () => {
    setLocation("/shipping");
  };

  const handleFlashSaleClick = () => {
    setLocation("/flash-sale");
  };

  return (
    <div className="bg-white mx-4 my-4 rounded-lg shadow-sm border border-gray-100">
      <div className="grid grid-cols-2 divide-x divide-gray-100">
        <div onClick={handleShippingClick} className="p-4 flex items-center space-x-3">
          {/* <button onClick={handleShippingClick} className="text-gray-400 hover:text-primary transition-colors"> */}
            <div className="bg-green-100 p-2 rounded-full">
              <Truck className="h-4 w-4 text-green-600" />
            </div>
            <div>
                <p className="text-sm font-medium text-gray-900">Free Shipping</p>
                <p className="text-xs text-gray-500">Buy $119.90 more</p>
            </div>
          {/* </button> */}
        </div>
        <div onClick={handleFlashSaleClick} className="p-4 flex items-center space-x-3">
          {/* <button onClick={handleFlashSaleClick} className="text-gray-400 hover:text-primary transition-colors"> */}
            <div className="bg-accent bg-opacity-20 p-2 rounded-full">
              <Zap className="h-4 w-4 text-accent" />
            </div>
            <div>
              <p className="text-sm font-medium text-gray-900">Flash Sale</p>
              <p className="text-xs text-accent cursor-pointer hover:underline">View more</p>
            </div>
          {/* </button> */}
        </div>
      </div>
    </div>
  );
}
