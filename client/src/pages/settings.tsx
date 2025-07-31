
import { useState } from "react";
import { ArrowLeft, ChevronRight, QrCode } from "lucide-react";
import { useLocation } from "wouter";
import { button } from "@/components/ui/button";

const settingsOptions = [
  { id: "address-book", label: "Address Book", hasChevron: true },
  { id: "payment-options", label: "My Payment Options", hasChevron: true },
  { id: "manage-account", label: "Manage My Account", hasChevron: true },
  { id: "show-outfit", label: "Show&Outfit", hasChevron: true },
  { id: "location", label: "Location", value: "ZW", hasChevron: true },
  { id: "language", label: "Language", hasChevron: true },
  { id: "currency", label: "Currency", value: "USD", hasChevron: true },
  { id: "contact-preferences", label: "Contact Preferences", hasChevron: true },
  { id: "blocked-contacts", label: "Blocked Contact List", hasChevron: true },
  { id: "clear-cache", label: "Clear Cache", value: "93.00kB", hasChevron: true },
  { id: "privacy-policy", label: "Privacy & Cookie Policy", hasChevron: true },
  { id: "terms-conditions", label: "Terms & Conditions", hasChevron: true },
  { id: "rating-feedback", label: "Rating & Feedback", hasChevron: true },
  { id: "connect-us", label: "Connect to Us", hasChevron: true },
  { id: "ad-choice", label: "Ad Choice", hasChevron: true },
  { id: "about-shein", label: "About SHEIN", hasChevron: true },
  { id: "manage-cookies", label: "Manage Cookies", hasChevron: true },
  { id: "switch-accounts", label: "Switch Accounts", hasChevron: true }
];

export default function Settings() {
  const [, setLocation] = useLocation();

  const handleBack = () => {
    setLocation("/profile");
  };

  const handleSignOut = () => {
    // Handle sign out logic
    console.log("Sign out");
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white px-4 py-3 flex items-center shadow-sm">
        <button onClick={handleBack} className="p-2 hover:bg-gray-100 rounded-full transition-colors">
          <ArrowLeft className="h-5 w-5 text-gray-700" />
        </button>
        <h1 className="text-lg font-bold text-gray-900 ml-4">Settings</h1>
      </header>

      {/* User Profile */}
      <div className="bg-white mx-4 mt-4 rounded-lg p-4 shadow-sm">
        <div className="flex items-center justify-between">
          <span className="font-medium text-gray-900">young_mazwi</span>
          <div className="flex items-center space-x-2">
            <QrCode className="h-5 w-5 text-gray-600" />
            <ChevronRight className="h-5 w-5 text-gray-400" />
          </div>
        </div>
      </div>

      {/* Settings Options */}
      <div className="bg-white mx-4 mt-4 rounded-lg shadow-sm divide-y divide-gray-100">
        {settingsOptions.map((option) => (
          <button
            key={option.id}
            className="w-full px-4 py-4 flex items-center justify-between hover:bg-gray-50 transition-colors"
          >
            <span className="text-gray-900">{option.label}</span>
            <div className="flex items-center space-x-2">
              {option.value && (
                <span className="text-gray-500 text-sm">{option.value}</span>
              )}
              {option.hasChevron && (
                <ChevronRight className="h-4 w-4 text-gray-400" />
              )}
            </div>
          </button>
        ))}
      </div>

      {/* Sign Out button */}
      <div className="px-4 py-8">
        <button 
          onClick={handleSignOut}
          variant="outline" 
          className="w-full text-red-500 border-red-500 hover:bg-red-50"
        >
          SIGN OUT
        </button>
      </div>

      {/* Version */}
      <div className="text-center text-gray-400 text-sm pb-8">
        Version 13.1.4
      </div>
    </div>
  );
}
