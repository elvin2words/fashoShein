
import { useState } from "react";
import { ArrowLeft, QrCode, Ruler, Heart, Shield, ChevronRight } from "lucide-react";
import { useLocation } from "wouter";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";

const sizeCategories = [
  { id: "gender", label: "Gender", value: "Male", options: ["Female", "Male", "None Above"] },
  { id: "bodyShape", label: "Body Shape", value: "Rectangle", options: ["Trapezoid", "Triangle", "Oval", "Rectangle", "Inverted Triangle"] },
  { id: "height", label: "Height", value: "173 cm / 68 in" },
  { id: "weight", label: "Weight", value: "70 kg / 154 lbs" },
  { id: "bustSize", label: "Bust size", value: "98 cm / 39 in" },
  { id: "braSize", label: "Bra size", value: "" },
  { id: "waist", label: "Waist", value: "84 cm / 33 in" },
  { id: "hips", label: "Hips", value: "92 cm / 36 in" },
  { id: "preference", label: "What's your Preference?", value: "True to Size" }
];

const preferenceCategories = [
  {
    id: "favoriteCategories",
    label: "Which are your favorite categories?",
    options: ["Women", "Men", "Plus Size", "Kids", "Home", "Pets Supplies"],
    selected: ["Men", "Home"]
  },
  {
    id: "buyClothesFor",
    label: "Who do you usually buy clothes for?",
    options: ["Myself", "Partner", "Parents", "Toddler Girls 1-6 Yrs", "Girls 7-14 Yrs", "Toddler Boys 1-6 Yrs", "Boys 7-14 Yrs", "Baby 0-24 Months", "Dogs", "Cats"],
    selected: ["Myself"]
  },
  {
    id: "favoriteStyles",
    label: "Which are your favorite styles?",
    options: ["Basics", "Casual", "Elegant", "Sexy", "Sporty", "Vintage", "Vacation", "Party", "Workwear", "Wedding guest"],
    selected: ["Basics", "Casual", "Elegant", "Vacation", "Workwear"]
  }
];

export default function MyProfile() {
  const [, setLocation] = useLocation();
  const [showSizeModal, setShowSizeModal] = useState(false);
  const [showPreferenceModal, setShowPreferenceModal] = useState(false);
  const [preferences, setPreferences] = useState(preferenceCategories);

  const handleBack = () => {
    setLocation("/profile");
  };

  const handleQRCode = () => {
    setLocation("/qr-scanner");
  };

  const togglePreference = (categoryId: string, option: string) => {
    setPreferences(prev => prev.map(category => {
      if (category.id === categoryId) {
        const isSelected = category.selected.includes(option);
        return {
          ...category,
          selected: isSelected 
            ? category.selected.filter(item => item !== option)
            : [...category.selected, option]
        };
      }
      return category;
    }));
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white px-4 py-4 shadow-sm">
        <div className="flex items-center justify-between">
          <button onClick={handleBack} className="text-gray-700">
            <ArrowLeft className="h-6 w-6" />
          </button>
          <h1 className="text-lg font-semibold text-gray-900">My Profile</h1>
          <div className="w-6" />
        </div>
      </header>

      {/* User Info Bar */}
      <div className="bg-white mx-4 mt-4 rounded-lg p-4 shadow-sm">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-gray-200 rounded-full flex items-center justify-center">
              <span className="text-gray-600 font-bold">Y</span>
            </div>
            <div>
              <div className="flex items-center space-x-2">
                <span className="font-medium text-gray-900">young_mazwi</span>
                <span className="text-blue-500">♂</span>
              </div>
            </div>
          </div>
          <button onClick={handleQRCode} className="text-gray-600">
            <QrCode className="h-6 w-6" />
          </button>
        </div>
      </div>

      {/* My Size Card */}
      <div className="bg-white mx-4 mt-4 rounded-lg shadow-sm">
        <button 
          onClick={() => setShowSizeModal(true)}
          className="w-full p-4 flex items-center justify-between hover:bg-gray-50 transition-colors"
        >
          <div className="flex items-center space-x-3">
            <Ruler className="h-5 w-5 text-gray-600" />
            <span className="font-medium text-gray-900">My Size</span>
            <span className="text-gray-400">👗</span>
          </div>
          <ChevronRight className="h-5 w-5 text-gray-400" />
        </button>
        
        <div className="px-4 pb-4">
          <div className="flex space-x-2">
            {[1, 2, 3].map((i) => (
              <div key={i} className="flex-1 h-2 bg-gray-200 rounded">
                <div className="h-full bg-gray-300 rounded" style={{ width: '60%' }} />
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* My Preference Card */}
      <div className="bg-white mx-4 mt-4 rounded-lg shadow-sm">
        <button 
          onClick={() => setShowPreferenceModal(true)}
          className="w-full p-4 flex items-center justify-between hover:bg-gray-50 transition-colors"
        >
          <div className="flex items-center space-x-3">
            <Heart className="h-5 w-5 text-gray-600" />
            <span className="font-medium text-gray-900">My Preference</span>
          </div>
          <ChevronRight className="h-5 w-5 text-gray-400" />
        </button>
        
        <div className="px-4 pb-4">
          <div className="flex flex-wrap gap-2 mb-2">
            {["Men", "Home", "Myself", "Basics", "Casual"].map((tag) => (
              <Badge key={tag} variant="secondary" className="text-xs">
                {tag}
              </Badge>
            ))}
          </div>
          <div className="flex space-x-2">
            <Badge variant="secondary" className="text-xs">Elegant</Badge>
            <span className="text-gray-400 text-xs">...</span>
          </div>
        </div>
      </div>

      {/* Privacy Protection */}
      <div className="mx-4 mt-6 flex items-center justify-center">
        <div className="flex items-center space-x-2 text-gray-500">
          <Shield className="h-4 w-4" />
          <span className="text-sm">Personal Privacy Protection</span>
        </div>
      </div>

      {/* Size Modal */}
      <Dialog open={showSizeModal} onOpenChange={setShowSizeModal}>
        <DialogContent className="max-w-sm mx-auto max-h-screen overflow-y-auto">
          <DialogHeader className="relative">
            <button 
              onClick={() => setShowSizeModal(false)}
              className="absolute right-0 top-0 text-gray-400 hover:text-gray-600"
            >
              ✕
            </button>
            <div className="bg-gradient-to-r from-blue-100 to-purple-100 rounded-lg p-4 mb-4">
              <DialogTitle className="text-lg font-bold text-gray-900 mb-2">
                Get Personalized Recommendations
              </DialogTitle>
              <p className="text-sm text-gray-600">
                Create your profile for personalized recommendations
              </p>
            </div>
          </DialogHeader>

          <div className="space-y-6">
            {/* Gender */}
            <div>
              <label className="block text-sm font-medium text-gray-900 mb-2">Gender*</label>
              <div className="flex space-x-2">
                {["Female", "Male", "None Above"].map((option) => (
                  <button
                    key={option}
                    className={`flex-1 py-2 px-3 text-sm border rounded ${
                      option === "Male" 
                        ? "border-gray-900 bg-gray-100" 
                        : "border-gray-300"
                    }`}
                  >
                    {option === "Female" && "♀"} {option === "Male" && "♂"} {option}
                  </button>
                ))}
              </div>
            </div>

            {/* Body Shape */}
            <div>
              <label className="block text-sm font-medium text-gray-900 mb-2">Body Shape*</label>
              <div className="grid grid-cols-5 gap-2">
                {["Trapezoid", "Triangle", "Oval", "Rectangle", "Inverted Triangle"].map((shape, index) => (
                  <button
                    key={shape}
                    className={`flex flex-col items-center p-2 border rounded ${
                      shape === "Rectangle" 
                        ? "border-gray-900 bg-gray-100" 
                        : "border-gray-300"
                    }`}
                  >
                    <div className="w-8 h-12 mb-1 flex items-center justify-center">
                      {/* Simple body shape icons */}
                      <div className="w-4 h-8 bg-gray-400 rounded-sm"></div>
                    </div>
                    <span className="text-xs text-center">{shape}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Optional Section */}
            <div className="border-t pt-4">
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-medium text-gray-900">Optional</h3>
                <ChevronRight className="h-4 w-4 text-gray-400" />
              </div>

              <div className="space-y-4">
                {sizeCategories.slice(2).map((category) => (
                  <div key={category.id}>
                    <label className="block text-sm text-gray-700 mb-1">{category.label}</label>
                    <div className="border border-gray-300 rounded px-3 py-2 flex items-center justify-between">
                      <span className="text-sm text-gray-600">{category.value || "Select"}</span>
                      <ChevronRight className="h-4 w-4 text-gray-400" />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="flex space-x-4 mt-6">
            <button variant="outline" className="flex-1" onClick={() => setShowSizeModal(false)}>
              Cancel
            </button>
            <button className="flex-1 bg-gray-900 hover:bg-gray-800">
              Confirm
            </button>
          </div>
        </DialogContent>
      </Dialog>

      {/* Preference Modal */}
      <Dialog open={showPreferenceModal} onOpenChange={setShowPreferenceModal}>
        <DialogContent className="max-w-sm mx-auto max-h-screen overflow-y-auto">
          <DialogHeader className="relative">
            <button 
              onClick={() => setShowPreferenceModal(false)}
              className="absolute right-0 top-0 text-gray-400 hover:text-gray-600"
            >
              ✕
            </button>
            <DialogTitle className="text-lg font-bold text-gray-900 text-center">
              My Preference
            </DialogTitle>
          </DialogHeader>

          <div className="space-y-6">
            {preferences.map((category) => (
              <div key={category.id}>
                <h3 className="font-medium text-gray-900 mb-3">{category.label}</h3>
                <div className="flex flex-wrap gap-2">
                  {category.options.map((option) => (
                    <button
                      key={option}
                      onClick={() => togglePreference(category.id, option)}
                      className={`px-3 py-1 text-sm border rounded-full ${
                        category.selected.includes(option)
                          ? "border-gray-900 bg-gray-100"
                          : "border-gray-300"
                      }`}
                    >
                      {option}
                    </button>
                  ))}
                </div>
              </div>
            ))}
          </div>

          <button 
            className="w-full mt-6 bg-gray-400 hover:bg-gray-500"
            onClick={() => setShowPreferenceModal(false)}
          >
            SAVE
          </button>
        </DialogContent>
      </Dialog>
    </div>
  );
}
