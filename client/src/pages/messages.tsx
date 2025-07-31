
import { useState } from "react";
import { ArrowLeft, Package, Gift, Tag, Volume2, ShoppingCart } from "lucide-react";
import { useLocation } from "wouter";
import { Badge } from "@/components/ui/badge";
// import { button } from "@/components/ui/button";

const messageTabs = [
  { id: "order", label: "Order", icon: Package },
  { id: "activity", label: "Activity", icon: Gift },
  { id: "promo", label: "Promo", icon: Tag },
  { id: "news", label: "News", icon: Volume2 }
];

const recommendedProducts = [
  {
    id: "p1",
    title: "Men's Personalized Piq...",
    subtitle: "#1 Bestseller in Spring Men T...",
    price: "$9.10",
    originalPrice: "$12.99",
    image: "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?ixlib=rb-4.0.3&auto=format&fit=crop&w=200&h=200",
    badge: "Trends #SummerHoliday",
    rating: "12",
    sold: "High Repeat Customers"
  },
  {
    id: "p2",
    title: "YIYANG 2 Pairs Push U...",
    subtitle: "#2 Bestseller in Wedding Wo...",
    price: "$3.92",
    originalPrice: "$5.99",
    image: "https://images.unsplash.com/photo-1571513722275-4b41940f54b8?ixlib=rb-4.0.3&auto=format&fit=crop&w=200&h=200",
    badge: "Trends #SummerHoliday",
    sold: "600+ sold"
  },
  {
    id: "p3",
    title: "Professional...",
    subtitle: "Drone XT600",
    price: "$20.45",
    originalPrice: "$29.99",
    discount: "36%",
    image: "https://images.unsplash.com/photo-1473968512647-3e447244af8f?ixlib=rb-4.0.3&auto=format&fit=crop&w=200&h=200",
    badge: "Light and Shadow Flagship Brushless Motor"
  },
  {
    id: "p4",
    title: "SHEGLAM Sweet Ce...",
    subtitle: "Vegan formula, Cruelty-free",
    price: "$8.99",
    image: "https://images.unsplash.com/photo-1596462502278-27bfdc403348?ixlib=rb-4.0.3&auto=format&fit=crop&w=200&h=200",
    badge: "Trends SHEGLAM"
  }
];

export default function Messages() {
  const [, setLocation] = useLocation();
  const [activeTab, setActiveTab] = useState("order");
  const [cartCount] = useState(8);

  const handleBack = () => {
    setLocation("/");
  };

  const handleProductClick = (productId: string) => {
    setLocation(`/product/${productId}`);
  };

  const handleCartClick = () => {
    setLocation("/cart");
  };

  const handleTabChange = (tabId: string) => {
    setActiveTab(tabId);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white px-4 py-4 shadow-sm">
        <div className="flex items-center justify-between">
          <button onClick={handleBack} className="text-gray-700">
            <ArrowLeft className="h-6 w-6" />
          </button>
          <h1 className="text-lg font-semibold text-gray-900">Message</h1>
          <div className="relative">
            <ShoppingCart onClick={handleCartClick} className="h-6 w-6 text-gray-700" />
            {cartCount > 0 && (
              <Badge className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center p-0">
                {cartCount}
              </Badge>
            )}
          </div>
        </div>
      </header>

      {/* Message Tabs */}
      <div className="bg-white px-4 py-3 shadow-sm">
        <div className="flex justify-between">
          {messageTabs.map((tab) => {
            const Icon = tab.icon;
            return (
              <button
                key={tab.id}
                onClick={() => handleTabChange(tab.id)}
                className={`flex flex-col items-center space-y-1 flex-1 py-2 ${
                  activeTab === tab.id ? 'text-primary' : 'text-gray-500'
                }`}
              >
                <Icon className="h-5 w-5" />
                <span className="text-xs">{tab.label}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Content */}
      <div className="px-4 py-6">
        {/* You May Also Like Section */}
        <div className="text-center mb-6">
          <div className="flex items-center justify-center space-x-2 text-gray-500 mb-4">
            <span className="text-sm">◆</span>
            <span className="text-sm font-medium">You May Also Like</span>
            <span className="text-sm">◆</span>
          </div>
        </div>

        {/* Product Grid */}
        <div className="grid grid-cols-2 gap-3">
          {recommendedProducts.map((product) => (
            <div 
              key={product.id} 
              className="bg-white rounded-lg overflow-hidden shadow-sm cursor-pointer"
              onClick={() => handleProductClick(product.id)}
            >
              <div className="relative">
                <img 
                  src={product.image} 
                  alt={product.title}
                  className="w-full h-32 object-cover"
                />
                {product.badge && (
                  <div className="absolute top-2 left-2">
                    <Badge className="bg-purple-500 text-white text-xs px-2 py-1">
                      {product.badge}
                    </Badge>
                  </div>
                )}
                {product.discount && (
                  <div className="absolute top-2 right-2 bg-red-500 text-white text-xs px-1 rounded">
                    {product.discount}
                  </div>
                )}
              </div>
              
              <div className="p-3">
                <h3 className="text-sm font-medium text-gray-900 mb-1 line-clamp-1">
                  {product.title}
                </h3>
                
                {product.subtitle && (
                  <p className="text-xs text-gray-500 mb-2 line-clamp-1">
                    {product.subtitle}
                  </p>
                )}
                
                <div className="flex items-center justify-between">
                  <span className="text-primary font-bold text-sm">{product.price}</span>
                  {product.originalPrice && (
                    <span className="text-gray-400 line-through text-xs">{product.originalPrice}</span>
                  )}
                </div>
                
                {(product.rating || product.sold) && (
                  <div className="flex items-center justify-between mt-2 text-xs text-gray-500">
                    {product.rating && (
                      <div className="flex items-center space-x-1">
                        <span>⭐</span>
                        <span>{product.rating}</span>
                      </div>
                    )}
                    {product.sold && (
                      <span className="text-orange-500">{product.sold}</span>
                    )}
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

//   return (
//     <div className="min-h-screen bg-gray-50">
//       {/* Header */}
//       <header className="bg-white px-4 py-4 shadow-sm">
//         <div className="flex items-center justify-between">
//           <button onClick={handleBack} className="text-gray-700">
//             <ArrowLeft className="h-6 w-6" />
//           </button>
//           <h1 className="text-lg font-semibold text-gray-900">Message</h1>
//           <div className="relative">
//             <ShoppingCart className="h-6 w-6 text-gray-700" />
//             {cartCount > 0 && (
//               <Badge className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center p-0">
//                 {cartCount}
//               </Badge>
//             )}
//           </div>
//         </div>
//       </header>

//       {/* Message Tabs */}
//       <div className="bg-white px-4 py-3 shadow-sm">
//         <div className="flex justify-between">
//           {messageTabs.map((tab) => {
//             const Icon = tab.icon;
//             return (
//               <button
//                 key={tab.id}
//                 onClick={() => setActiveTab(tab.id)}
//                 className={`flex flex-col items-center space-y-1 flex-1 py-2 ${
//                   activeTab === tab.id ? 'text-primary' : 'text-gray-500'
//                 }`}
//               >
//                 <Icon className="h-5 w-5" />
//                 <span className="text-xs">{tab.label}</span>
//               </button>
//             );
//           })}
//         </div>
//       </div>

//       {/* Content */}
//       <div className="px-4 py-6">
//         {/* You May Also Like Section */}
//         <div className="text-center mb-6">
//           <div className="flex items-center justify-center space-x-2 text-gray-500 mb-4">
//             <span className="text-sm">◆</span>
//             <span className="text-sm font-medium">You May Also Like</span>
//             <span className="text-sm">◆</span>
//           </div>
//         </div>

//         {/* Product Grid */}
//         <div className="grid grid-cols-2 gap-3">
//           {recommendedProducts.map((product) => (
//             <div 
//               key={product.id} 
//               className="bg-white rounded-lg overflow-hidden shadow-sm cursor-pointer"
//               onClick={() => handleProductClick(product.id)}
//             >
//               <div className="relative">
//                 <img 
//                   src={product.image} 
//                   alt={product.title}
//                   className="w-full h-32 object-cover"
//                 />
//                 {product.badge && (
//                   <div className="absolute top-2 left-2">
//                     <Badge className="bg-purple-500 text-white text-xs px-2 py-1">
//                       Trends
//                     </Badge>
//                   </div>
//                 )}
//                 {product.discount && (
//                   <div className="absolute top-2 right-2 bg-red-500 text-white text-xs px-1 rounded">
//                     {product.discount}
//                   </div>
//                 )}
//               </div>
              
//               <div className="p-3">
//                 <div className="mb-2">
//                   <Badge variant="secondary" className="text-xs mb-1">
//                     {product.badge?.replace('Trends ', '') || 'Trends'}
//                   </Badge>
//                 </div>
                
//                 <h3 className="text-sm font-medium text-gray-900 mb-1 line-clamp-1">
//                   {product.title}
//                 </h3>
                
//                 {product.subtitle && (
//                   <p className="text-xs text-gray-500 mb-2 line-clamp-1">
//                     {product.subtitle}
//                   </p>
//                 )}
                
//                 <div className="flex items-center justify-between">
//                   <div className="flex items-center space-x-1">
//                     <span className="text-primary font-bold text-sm">{product.price}</span>
//                     {product.originalPrice && (
//                       <span className="text-gray-400 line-through text-xs">{product.originalPrice}</span>
//                     )}
//                   </div>
//                   <button size="sm" variant="outline" className="h-6 px-2">
//                     <ShoppingCart className="h-3 w-3" />
//                   </button>
//                 </div>
                
//                 {(product.rating || product.sold) && (
//                   <div className="flex items-center justify-between mt-2 text-xs text-gray-500">
//                     {product.rating && (
//                       <div className="flex items-center space-x-1">
//                         <span>⭐</span>
//                         <span>{product.rating}</span>
//                       </div>
//                     )}
//                     {product.sold && (
//                       <span className="text-orange-500">{product.sold}</span>
//                     )}
//                   </div>
//                 )}
//               </div>
//             </div>
//           ))}
//         </div>
//       </div>
//     </div>
//   );
// }
