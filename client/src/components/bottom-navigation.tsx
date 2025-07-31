// import { Home, Search, ShoppingCart, User } from "lucide-react";
// import { Badge } from "@/components/ui/badge";
// import { cn } from "@/lib/utils";
// import { Link, useLocation } from "wouter";

// interface BottomNavigationProps {
//   cartCount: number;
// }

// const navItems = [
//   { id: "shop", label: "Shop", icon: Home, path: "/" },
//   { id: "category", label: "Category", icon: Search, path: "/category" },
//   { id: "trends", label: "Trends", icon: null, path: "/trends" },
//   { id: "cart", label: "Cart", icon: ShoppingCart, path: "/cart" },
//   { id: "me", label: "Me", icon: User, path: "/profile" },
// ];

// export default function BottomNavigation({ cartCount }: BottomNavigationProps) {
//   const [location] = useLocation();

//   return (
//     <nav className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 px-4 py-2 z-50">
//       <div className="flex items-center justify-around">
//         {navItems.map((item) => {
//           const Icon = item.icon;
//           const isActive = location === item.path;
          
//           return (
//             <Link
//               key={item.id}
//               href={item.path}
//               className={cn(
//                 "flex flex-col items-center space-y-1 transition-colors",
//                 isActive ? "text-primary" : "text-gray-400 hover:text-primary"
//               )}
//             >
//               {item.id === "trends" ? (
//                 <div className="w-8 h-8 bg-gradient-to-r from-primary to-secondary rounded-full flex items-center justify-center">
//                   <span className="text-white text-xs font-bold">T</span>
//                 </div>
//               ) : Icon ? (
//                 <div className="relative">
//                   <Icon className="h-5 w-5" />
//                   {item.id === "cart" && cartCount > 0 && (
//                     <Badge className="absolute -top-2 -right-2 bg-accent text-white text-xs rounded-full h-5 w-5 flex items-center justify-center p-0 border-0 badge-notification">
//                       {cartCount}
//                     </Badge>
//                   )}
//                 </div>
//               ) : null}
//               <span className="text-xs font-medium">{item.label}</span>
//             </Link>
//           );
//         })}
//       </div>
//     </nav>
//   );
// }

import { Home, Search, ShoppingCart, User } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import { Link, useLocation } from "wouter";

interface BottomNavigationProps {
  cartCount: number;
}

const navItems = [
  { id: "shop", label: "Shop", icon: Home, path: "/" },
  { id: "category", label: "Category", icon: Search, path: "/category" },
  { id: "trends", label: "Trends", icon: null, path: "/trends" },
  { id: "cart", label: "Cart", icon: ShoppingCart, path: "/cart" },
  { id: "me", label: "Me", icon: User, path: "/profile" },
];

export default function BottomNavigation({ cartCount }: BottomNavigationProps) {
  const [location] = useLocation();

  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 px-0 py-2 z-50 shadow-sm">
      <div className="grid grid-cols-5 text-center">
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = location === item.path;

          const isTrends = item.id === "trends";

          return (
            <Link
              key={item.id}
              href={item.path}
              className={cn(
                "flex flex-col items-center justify-center text-xs font-medium transition-colors relative",
                isActive ? "text-primary" : "text-gray-400 hover:text-primary",
                isTrends ? "translate-y-[-12px]" : "py-1"
              )}
            >
              {isTrends ? (
                <div className="w-12 h-12 bg-gradient-to-br from-primary to-secondary rounded-full flex items-center justify-center shadow-md border-4 border-white">
                  <span className="text-white text-sm font-bold">T</span>
                </div>
              ) : Icon ? (
                <div className="relative">
                  <Icon className="h-5 w-5" />
                  {item.id === "cart" && cartCount > 0 && (
                    <Badge className="absolute -top-2 -right-2 bg-accent text-white text-xs rounded-full h-5 w-5 flex items-center justify-center p-0 border-0 badge-notification">
                      {cartCount}
                    </Badge>
                  )}
                </div>
              ) : null}
              {!isTrends && <span>{item.label}</span>}
            </Link>
          );
        })}
      </div>
    </nav>
  );
}



// import { Home, Search, ShoppingCart, User } from "lucide-react";
// import { Badge } from "@/components/ui/badge";
// import { cn } from "@/lib/utils";
// import { Link, useLocation } from "wouter";

// interface BottomNavigationProps {
//   cartCount: number;
// }

// const navItems = [
//   { id: "shop", label: "Shop", icon: Home, path: "/" },
//   { id: "category", label: "Category", icon: Search, path: "/category" },
//   { id: "trends", label: "Trends", icon: null, path: "/trends" },
//   { id: "cart", label: "Cart", icon: ShoppingCart, path: "/cart" },
//   { id: "me", label: "Me", icon: User, path: "/profile" },
// ];

// export default function BottomNavigation({ cartCount }: BottomNavigationProps) {
//   const [location] = useLocation();

//   return (
//     <nav className="fixed bottom-0 left-0 right-0 z-50 px-2 pb-3 pt-4 bg-white rounded-t-2xl shadow-xl">
//       <div className="relative">
//         {/* Floating center tab "T" */}
//         <div className="absolute inset-x-0 -top-6 flex justify-center pointer-events-none z-10">
//           <div className="w-16 h-16 bg-gradient-to-br from-primary to-secondary rounded-full flex items-center justify-center shadow-lg border-4 border-white pointer-events-auto">
//             <Link href="/trends" className="flex items-center justify-center w-full h-full">
//               <span className="text-white font-bold text-lg">T</span>
//             </Link>
//           </div>
//         </div>

//         {/* Main nav bar grid */}
//         <div className="grid grid-cols-5 items-end text-center mt-4">
//           {navItems.map((item) => {
//             const Icon = item.icon;
//             const isActive = location === item.path;

//             // Skip rendering the trends button in the grid (it's floating above)
//             if (item.id === "trends") return <div key="spacer" />;

//             return (
//               <Link
//                 key={item.id}
//                 href={item.path}
//                 className={cn(
//                   "flex flex-col items-center justify-center gap-1 text-xs font-medium transition-colors",
//                   isActive ? "text-primary" : "text-gray-400 hover:text-primary"
//                 )}
//               >
//                 {Icon && (
//                   <div className="relative">
//                     <Icon className="h-6 w-6" />
//                     {item.id === "cart" && cartCount > 0 && (
//                       <Badge className="absolute -top-2 -right-2 bg-accent text-white text-xs rounded-full h-5 w-5 flex items-center justify-center p-0 border-0 badge-notification">
//                         {cartCount}
//                       </Badge>
//                     )}
//                   </div>
//                 )}
//                 <span>{item.label}</span>
//               </Link>
//             );
//           })}
//         </div>
//       </div>
//     </nav>
//   );
// }
