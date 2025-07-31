import { useState } from "react";
import { X, Check } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";

interface ProductOptionsModalProps {
  isOpen: boolean;
  onClose: () => void;
  product: {
    id: string;
    title: string;
    image: string;
    color: string;
    size: string;
    discountPrice: string;
    originalPrice: string;
  };
}

const colorOptions = [
  { name: "White", value: "#FFFFFF", available: true },
  { name: "Black", value: "#000000", available: true },
  { name: "Blue", value: "#3B82F6", available: true },
  { name: "Red", value: "#EF4444", available: false },
  { name: "Pink", value: "#EC4899", available: true },
  { name: "Green", value: "#10B981", available: true },
];

const sizeOptions = [
  { name: "XS", available: true },
  { name: "S", available: true },
  { name: "M", available: true },
  { name: "L", available: true },
  { name: "XL", available: false },
  { name: "XXL", available: true },
];

export default function ProductOptionsModal({ isOpen, onClose, product }: ProductOptionsModalProps) {
  const [selectedColor, setSelectedColor] = useState(product.color);
  const [selectedSize, setSelectedSize] = useState(product.size);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-end">
      <div className="bg-white w-full rounded-t-2xl max-h-[80vh] overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b border-gray-200">
          <h2 className="text-lg font-bold text-gray-900">Product Options</h2>
          <button 
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700 transition-colors"
          >
            <X className="h-6 w-6" />
          </button>
        </div>

        {/* Content */}
        <div className="p-4 overflow-y-auto">
          {/* Product Info */}
          <div className="flex space-x-3 mb-6">
            <img 
              src={product.image} 
              alt={product.title}
              className="w-16 h-16 object-cover rounded-lg"
            />
            <div className="flex-1">
              <h3 className="font-medium text-gray-900 text-sm mb-1">{product.title}</h3>
              <div className="flex items-center space-x-2">
                <span className="text-primary font-bold text-sm">${product.discountPrice}</span>
                <span className="text-gray-400 line-through text-xs">${product.originalPrice}</span>
              </div>
            </div>
          </div>

          {/* Color Selection */}
          <div className="mb-6">
            <h3 className="font-medium text-gray-900 mb-3">Color: {selectedColor}</h3>
            <div className="flex flex-wrap gap-3">
              {colorOptions.map((color) => (
                <button
                  key={color.name}
                  onClick={() => color.available && setSelectedColor(color.name)}
                  disabled={!color.available}
                  className={cn(
                    "relative w-12 h-12 rounded-full border-2 transition-all",
                    selectedColor === color.name 
                      ? "border-primary ring-2 ring-primary ring-offset-2" 
                      : "border-gray-300",
                    !color.available && "opacity-50 cursor-not-allowed"
                  )}
                  style={{ backgroundColor: color.value }}
                >
                  {selectedColor === color.name && (
                    <div className="absolute inset-0 flex items-center justify-center">
                      <Check className="h-4 w-4 text-white drop-shadow-md" />
                    </div>
                  )}
                  {!color.available && (
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="w-8 h-0.5 bg-gray-400 rotate-45" />
                    </div>
                  )}
                </button>
              ))}
            </div>
          </div>

          {/* Size Selection */}
          <div className="mb-6">
            <h3 className="font-medium text-gray-900 mb-3">Size: {selectedSize}</h3>
            <div className="flex flex-wrap gap-2">
              {sizeOptions.map((size) => (
                <button
                  key={size.name}
                  onClick={() => size.available && setSelectedSize(size.name)}
                  disabled={!size.available}
                  className={cn(
                    "px-4 py-2 border rounded-lg text-sm font-medium transition-colors",
                    selectedSize === size.name
                      ? "border-primary bg-primary text-white"
                      : "border-gray-300 text-gray-700 hover:border-gray-400",
                    !size.available && "opacity-50 cursor-not-allowed bg-gray-100"
                  )}
                >
                  {size.name}
                  {!size.available && (
                    <span className="ml-1 text-xs">(Out of stock)</span>
                  )}
                </button>
              ))}
            </div>
          </div>

          {/* Size Guide */}
          <div className="mb-6 p-3 bg-gray-50 rounded-lg">
            <h4 className="font-medium text-gray-900 text-sm mb-2">Size Guide</h4>
            <div className="grid grid-cols-4 gap-2 text-xs">
              <div className="font-medium">Size</div>
              <div className="font-medium">Chest</div>
              <div className="font-medium">Waist</div>
              <div className="font-medium">Length</div>
              <div>S</div><div>32-34"</div><div>26-28"</div><div>24"</div>
              <div>M</div><div>34-36"</div><div>28-30"</div><div>25"</div>
              <div>L</div><div>36-38"</div><div>30-32"</div><div>26"</div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex space-x-3">
            <Button 
              variant="outline" 
              onClick={onClose}
              className="flex-1"
            >
              Cancel
            </Button>
            <Button 
              onClick={() => {
                // Here you would update the cart item with new options
                console.log('Updated options:', { color: selectedColor, size: selectedSize });
                onClose();
              }}
              className="flex-1"
            >
              Update
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}