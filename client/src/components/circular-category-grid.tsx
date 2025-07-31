import { useQuery } from "@tanstack/react-query";
import type { Category } from "@shared/schema";

export default function CircularCategoryGrid() {
  const { data: categories = [] } = useQuery<Category[]>({
    queryKey: ["/api/categories"],
  });

  return (
    <div className="px-4 mb-1">
      <div className="overflow-x-auto scroll-fade hide-scrollbar">
        {/* <div className="flex space-x-4 pb-4 min-w-max"> */}
        <div className="grid grid-flow-col auto-cols-max grid-rows-1 gap-2 pb-4">
        {/* <div className="grid grid-flow-row auto-rows-max grid-cols-6 gap-x-14 gap-y-2 pb-4"> */}
          {/* style={{ maxWidth: "calc(6 * 6rem)" }} // Optional: constrain height to 6 rows */}
          {categories.map((category) => (
            <div key={category.id} className="flex flex-col items-center space-y-2 min-w-0">
              <div className="w-16 h-16 rounded overflow-hidden bg-gradient-to-br from-secondary to-primary p-0.5">
                <img 
                  src={category.imageUrl} 
                  alt={category.name}
                  className="w-full h-full rounded object-cover bg-white"
                />
              </div>
              <span className="text-xs text-gray-700 text-center">{category.name}</span>
            </div>
          ))}
        </div>      
      </div>  

      <div className="overflow-x-auto scroll-fade hide-scrollbar">
        <div className="grid grid-flow-col auto-cols-max grid-rows-2 gap-2 pb-4">
        {/* <div className="grid grid-flow-row auto-rows-max grid-cols-6 gap-x-14 gap-y-2 pb-4"> */}
          {/* style={{ maxWidth: "calc(6 * 6rem)" }} // Optional: constrain height to 6 rows */}
          {categories.map((category) => (
            <div key={category.id} className="flex flex-col items-center space-y-2 min-w-0">
              <div className="w-16 h-16 rounded-full overflow-hidden bg-gradient-to-br from-secondary to-primary p-0.5">
                <img 
                  src={category.imageUrl} 
                  alt={category.name}
                  className="w-full h-full rounded-full object-cover bg-white"
                />
              </div>
              <span className="text-xs text-gray-700 text-center">{category.name}</span>
            </div>
          ))}
        </div>        
      </div>
    </div>
  );
}


// import { useQuery } from "@tanstack/react-query";
// import type { Category } from "@shared/schema";

// export default function CircularCategoryGrid() {
//   const { data: categories = [] } = useQuery<Category[]>({
//     queryKey: ["/api/categories"],
//   });

//   return (
//     <div className="px-4 mb-1">
//       <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-6">
//         {categories.map((category) => (
//           <div key={category.id} className="flex flex-col items-center space-y-2">
//             <div className="w-16 h-16 rounded-full overflow-hidden bg-gradient-to-br from-secondary to-primary p-0.5">
//               <img 
//                 src={category.imageUrl} 
//                 alt={category.name}
//                 className="w-full h-full rounded-full object-cover bg-white"
//               />
//             </div>
//             <span className="text-xs text-gray-700 text-center">{category.name}</span>
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// }
