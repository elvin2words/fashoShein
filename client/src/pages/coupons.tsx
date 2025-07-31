
import { useState } from "react";
import { ArrowLeft, ChevronDown } from "lucide-react";
import { useLocation } from "wouter";
import { cn } from "@/lib/utils";
import { button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

const tabs = [
  { id: "unused", label: "Unused" },
  { id: "used", label: "Used" },
  { id: "expired", label: "Expired" }
];

const filterTabs = [
  { id: "all", label: "All" },
  { id: "expiring", label: "Expiring Soon" },
  { id: "new", label: "New" },
  { id: "shipping", label: "Shipping Coupon" }
];

const unusedCoupons = [
  {
    id: "1",
    discount: "20",
    type: "OFF",
    title: "Sitewide Coupon",
    description: "Capped at $40",
    minOrder: "Orders $50+",
    expires: "08/24/2025 14:38",
    isNew: true
  },
  {
    id: "2",
    discount: "20",
    type: "OFF",
    title: "Sitewide Coupon",
    description: "Orders $120+",
    minOrder: "Orders $120+",
    expires: "21 : 50 : 41",
    isNew: true
  },
  {
    id: "3",
    discount: "30",
    type: "OFF",
    title: "Sitewide Coupon",
    description: "Capped at $23",
    minOrder: "Orders $15+",
    expires: "21 : 50 : 41",
    isNew: true
  },
  {
    id: "4",
    discount: "25",
    type: "OFF",
    title: "Sitewide Coupon",
    description: "Capped at $30",
    minOrder: "Orders $75+",
    expires: "21 : 50 : 41",
    isNew: true
  }
];

const expiredCoupons = [
  {
    id: "1",
    discount: "20",
    type: "OFF",
    title: "Sitewide Coupon",
    minOrder: "Orders $120+",
    expires: "07/26/2025 14:39"
  },
  {
    id: "2",
    discount: "30",
    type: "OFF",
    title: "Sitewide Coupon",
    description: "Capped at $23",
    minOrder: "Orders $15+",
    expires: "07/26/2025 14:39"
  },
  {
    id: "3",
    discount: "25",
    type: "OFF",
    title: "Sitewide Coupon",
    description: "Capped at $30",
    minOrder: "Orders $75+",
    expires: "07/26/2025 14:39"
  },
  {
    id: "4",
    discount: "20",
    type: "OFF",
    title: "Sitewide Coupon",
    minOrder: "Orders $120+",
    expires: "07/28/2025 16:25"
  },
  {
    id: "5",
    discount: "30",
    type: "OFF",
    title: "Sitewide Coupon",
    description: "Capped at $23",
    minOrder: "Orders $15+",
    expires: "07/28/2025 16:25"
  },
  {
    id: "6",
    discount: "25",
    type: "OFF",
    title: "Sitewide Coupon",
    description: "Capped at $30",
    minOrder: "Orders $75+",
    expires: "07/28/2025 16:25"
  }
];

export default function Coupons() {
  const [, setLocation] = useLocation();
  const [activeTab, setActiveTab] = useState("unused");
  const [activeFilter, setActiveFilter] = useState("all");

  const handleBack = () => {
    setLocation("/profile");
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white px-4 py-3 flex items-center shadow-sm">
        <button onClick={handleBack} className="p-2 hover:bg-gray-100 rounded-full transition-colors">
          <ArrowLeft className="h-5 w-5 text-gray-700" />
        </button>
        <h1 className="text-lg font-bold text-gray-900 ml-4">Coupons</h1>
      </header>

      {/* Tabs */}
      <div className="bg-white border-b border-gray-200">
        <div className="flex">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={cn(
                "flex-1 py-4 px-4 text-sm font-medium transition-colors relative",
                activeTab === tab.id
                  ? "text-gray-900"
                  : "text-gray-600"
              )}
            >
              {tab.label}
              {activeTab === tab.id && (
                <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-gray-900" />
              )}
            </button>
          ))}
        </div>
      </div>

      {/* Content */}
      <div className="p-4">
        {activeTab === "unused" && (
          <>
            {/* Filter Tabs */}
            <div className="flex space-x-2 mb-4 overflow-x-auto">
              {filterTabs.map((filter) => (
                <button
                  key={filter.id}
                  onClick={() => setActiveFilter(filter.id)}
                  className={cn(
                    "px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-colors",
                    activeFilter === filter.id
                      ? "bg-gray-900 text-white"
                      : "bg-white text-gray-700 border border-gray-200"
                  )}
                >
                  {filter.label}
                </button>
              ))}
            </div>

            {/* Coupons List */}
            <div className="space-y-3">
              {unusedCoupons.map((coupon) => (
                <div key={coupon.id} className="bg-white rounded-lg p-4 shadow-sm relative overflow-hidden">
                  {coupon.isNew && (
                    <Badge className="absolute top-3 left-3 bg-red-500 text-white text-xs">
                      NEW
                    </Badge>
                  )}
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-4">
                      <div className="text-center">
                        <div className="text-2xl font-bold text-red-500">
                          {coupon.discount}
                          <span className="text-sm">%{coupon.type}</span>
                        </div>
                        <div className="text-xs text-gray-600">{coupon.minOrder}</div>
                      </div>
                      <div className="flex-1">
                        <h3 className="font-bold text-gray-900">{coupon.title}</h3>
                        {coupon.description && (
                          <p className="text-sm text-red-500">{coupon.description}</p>
                        )}
                        <div className="flex items-center space-x-1 mt-1">
                          <span className="text-xs text-gray-600">Expires in</span>
                          <span className="text-xs text-gray-900">{coupon.expires}</span>
                          <ChevronDown className="h-3 w-3 text-gray-400" />
                        </div>
                      </div>
                    </div>
                    <button className="bg-gray-900 text-white px-6 py-2 text-sm">
                      Shop
                    </button>
                  </div>
                </div>
              ))}
              <div className="text-center py-8 text-gray-500">
                <p>— No more content —</p>
              </div>
            </div>
          </>
        )}

        {activeTab === "used" && (
          <div className="text-center py-16">
            <div className="w-16 h-16 mx-auto mb-4 opacity-50">
              <svg viewBox="0 0 64 64" className="w-full h-full">
                <path
                  d="M32 8L56 24v24L32 56L8 40V16z"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                />
                <circle cx="32" cy="32" r="8" fill="none" stroke="currentColor" strokeWidth="2" />
              </svg>
            </div>
            <h3 className="text-lg font-bold text-gray-900 mb-2">No used coupons</h3>
            <p className="text-gray-600 mb-6">
              Only show the coupons that have been used in the last 3 months
            </p>
            <button className="bg-gray-900 text-white">
              View expired coupons
            </button>
          </div>
        )}

        {activeTab === "expired" && (
          <div className="space-y-3">
            {expiredCoupons.map((coupon) => (
              <div key={coupon.id} className="bg-white rounded-lg p-4 shadow-sm relative overflow-hidden opacity-75">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-4">
                    <div className="text-center">
                      <div className="text-2xl font-bold text-gray-400">
                        {coupon.discount}
                        <span className="text-sm">%{coupon.type}</span>
                      </div>
                      <div className="text-xs text-gray-500">{coupon.minOrder}</div>
                    </div>
                    <div className="flex-1">
                      <h3 className="font-bold text-gray-600">{coupon.title}</h3>
                      {coupon.description && (
                        <p className="text-sm text-gray-500">{coupon.description}</p>
                      )}
                      <div className="flex items-center space-x-1 mt-1">
                        <span className="text-xs text-gray-500">Expires in</span>
                        <span className="text-xs text-gray-600">{coupon.expires}</span>
                        <ChevronDown className="h-3 w-3 text-gray-400" />
                      </div>
                    </div>
                  </div>
                  <div className="absolute top-4 right-4">
                    <div className="w-12 h-12 rounded-full border-2 border-gray-300 flex items-center justify-center transform rotate-12">
                      <span className="text-xs text-gray-400 font-bold transform -rotate-12">USED</span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
