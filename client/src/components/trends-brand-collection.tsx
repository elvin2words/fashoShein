import { useState } from "react";
import { Plus, Users, TrendingUp, Star } from "lucide-react";
import { cn } from "@/lib/utils";
import { Badge } from "@/components/ui/badge";
import { useLocation } from "wouter";

interface TrendsBrandCollectionProps {
  activeTab: string;
}

const brandCollections = {
  recommend: [
    {
      id: "1",
      brandName: "CasualDiffBautify",
      followers: "4.5M",
      salesSurge: "+18%",
      isFollowing: false,
      products: [
        {
          id: "1",
          image: "https://images.unsplash.com/photo-1551107696-a4b0c5a0d9a2?ixlib=rb-4.0.3&auto=format&fit=crop&w=150&h=150",
          price: "5.00",
          sold: "450k"
        },
        {
          id: "2",
          image: "https://images.unsplash.com/photo-1595777457583-95e059d581b8?ixlib=rb-4.0.3&auto=format&fit=crop&w=150&h=150",
          price: "12.00",  
          sold: "89k"
        },
        {
          id: "3",
          image: "https://images.unsplash.com/photo-1566479179817-c0dd2e0bc1e5?ixlib=rb-4.0.3&auto=format&fit=crop&w=150&h=150",
          price: "8.00",
          sold: "234k"
        },
        {
          id: "4",
          image: "https://images.unsplash.com/photo-1434389677669-e08b4cac3105?ixlib=rb-4.0.3&auto=format&fit=crop&w=150&h=150",
          price: "15.00",
          sold: "67k"
        }
      ],
      review: "My daughter's loved them"
    },
    {
      id: "2",
      brandName: "SHEIN Lady",
      followers: "2.1M",
      salesSurge: "+25%",
      isFollowing: false,
      products: [
        {
          id: "5",
          image: "https://images.unsplash.com/photo-1541099649105-f69ad21f3246?ixlib=rb-4.0.3&auto=format&fit=crop&w=150&h=150",
          price: "15.00",
          sold: "123k"
        },
        {
          id: "6",
          image: "https://images.unsplash.com/photo-1551028719-00167b16eac5?ixlib=rb-4.0.3&auto=format&fit=crop&w=150&h=150",
          price: "25.00",
          sold: "78k"
        },
        {
          id: "7",
          image: "https://images.unsplash.com/photo-1602810318383-e386cc2a3ccf?ixlib=rb-4.0.3&auto=format&fit=crop&w=150&h=150",
          price: "18.00",
          sold: "156k"
        },
        {
          id: "8",
          image: "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?ixlib=rb-4.0.3&auto=format&fit=crop&w=150&h=150",
          price: "22.00",
          sold: "92k"
        }
      ],
      review: "Definitely love it, girls it's super gorgeous and definitely worth it"
    },
    {
      id: "3",
      brandName: "new world jewelry",
      followers: "1.8M",
      salesSurge: "+12%",
      isFollowing: false,
      products: [
        {
          id: "9",
          image: "https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?ixlib=rb-4.0.3&auto=format&fit=crop&w=150&h=150",
          price: "5.00",
          sold: "567k"
        },
        {
          id: "10",
          image: "https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?ixlib=rb-4.0.3&auto=format&fit=crop&w=150&h=150",
          price: "3.00",
          sold: "789k"
        },
        {
          id: "11",
          image: "https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?ixlib=rb-4.0.3&auto=format&fit=crop&w=150&h=150",
          price: "8.00",
          sold: "234k"
        },
        {
          id: "12",
          image: "https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?ixlib=rb-4.0.3&auto=format&fit=crop&w=150&h=150",
          price: "12.00",
          sold: "145k"
        }
      ],
      review: "Looks very pretty. Nice boss and flowy"
    },
    {
      id: "4",
      brandName: "Franczb",
      followers: "950k",
      salesSurge: "+8%",
      isFollowing: false,
      products: [
        {
          id: "13",
          image: "https://images.unsplash.com/photo-1445205170230-053b83016050?ixlib=rb-4.0.3&auto=format&fit=crop&w=150&h=150",
          price: "16.00",
          sold: "89k"
        },
        {
          id: "14",
          image: "https://images.unsplash.com/photo-1594633313593-bab3825d0caf?ixlib=rb-4.0.3&auto=format&fit=crop&w=150&h=150",
          price: "28.00",
          sold: "45k"
        },
        {
          id: "15",
          image: "https://images.unsplash.com/photo-1566479179817-c0dd2e0bc1e5?ixlib=rb-4.0.3&auto=format&fit=crop&w=150&h=150",
          price: "32.00",
          sold: "67k"
        },
        {
          id: "16",
          image: "https://images.unsplash.com/photo-1551107696-a4b0c5a0d9a2?ixlib=rb-4.0.3&auto=format&fit=crop&w=150&h=150",
          price: "19.00",
          sold: "123k"
        }
      ],
      review: "I'm in love with my purchase"
    }
  ],
  following: [
    {
      id: "2",
      brandName: "SHEIN Lady",
      followers: "2.1M",
      salesSurge: "+25%",
      isFollowing: true,
      products: [
        {
          id: "5",
          image: "https://images.unsplash.com/photo-1541099649105-f69ad21f3246?ixlib=rb-4.0.3&auto=format&fit=crop&w=150&h=150",
          price: "15.00",
          sold: "123k"
        },
        {
          id: "6",
          image: "https://images.unsplash.com/photo-1551028719-00167b16eac5?ixlib=rb-4.0.3&auto=format&fit=crop&w=150&h=150",
          price: "25.00",
          sold: "78k"
        },
        {
          id: "7",
          image: "https://images.unsplash.com/photo-1602810318383-e386cc2a3ccf?ixlib=rb-4.0.3&auto=format&fit=crop&w=150&h=150",
          price: "18.00",
          sold: "156k"
        },
        {
          id: "8",
          image: "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?ixlib=rb-4.0.3&auto=format&fit=crop&w=150&h=150",
          price: "22.00",
          sold: "92k"
        }
      ],
      review: "Amazing quality and fast shipping!"
    }
  ],
  browsed: [
    {
      id: "1",
      brandName: "CasualDiffBautify",
      followers: "4.5M",
      salesSurge: "+18%",
      isFollowing: false,
      products: [
        {
          id: "1",
          image: "https://images.unsplash.com/photo-1551107696-a4b0c5a0d9a2?ixlib=rb-4.0.3&auto=format&fit=crop&w=150&h=150",
          price: "5.00",
          sold: "450k"
        },
        {
          id: "2",
          image: "https://images.unsplash.com/photo-1595777457583-95e059d581b8?ixlib=rb-4.0.3&auto=format&fit=crop&w=150&h=150",
          price: "12.00",
          sold: "89k"
        },
        {
          id: "3",
          image: "https://images.unsplash.com/photo-1566479179817-c0dd2e0bc1e5?ixlib=rb-4.0.3&auto=format&fit=crop&w=150&h=150",
          price: "8.00",
          sold: "234k"
        },
        {
          id: "4",
          image: "https://images.unsplash.com/photo-1434389677669-e08b4cac3105?ixlib=rb-4.0.3&auto=format&fit=crop&w=150&h=150",
          price: "15.00",
          sold: "67k"
        }
      ],
      review: "Previously viewed - great products!"
    },
    {
      id: "3",
      brandName: "new world jewelry",
      followers: "1.8M",
      salesSurge: "+12%",
      isFollowing: false,
      products: [
        {
          id: "9",
          image: "https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?ixlib=rb-4.0.3&auto=format&fit=crop&w=150&h=150",
          price: "5.00",
          sold: "567k"
        },
        {
          id: "10",
          image: "https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?ixlib=rb-4.0.3&auto=format&fit=crop&w=150&h=150",
          price: "3.00",
          sold: "789k"
        },
        {
          id: "11",
          image: "https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?ixlib=rb-4.0.3&auto=format&fit=crop&w=150&h=150",
          price: "8.00",
          sold: "234k"
        },
        {
          id: "12",
          image: "https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?ixlib=rb-4.0.3&auto=format&fit=crop&w=150&h=150",
          price: "12.00",
          sold: "145k"
        }
      ],
      review: "Visited before - beautiful jewelry collection"
    }
  ]
};

export default function TrendsBrandCollection({ activeTab }: TrendsBrandCollectionProps) {
  const [followingBrands, setFollowingBrands] = useState<string[]>(["2"]);
  const [, setLocation] = useLocation();

  const handleProductClick = (productId: string) => {
    setLocation(`/product/${productId}`);
  };

  const handleBrandClick = (brandId: string) => {
    setLocation(`/brand/${brandId.toLowerCase().replace(/\s+/g, '-')}`);
  };

  const handleFollowToggle = (brandId: string) => {
    setFollowingBrands(prev => 
      prev.includes(brandId) 
        ? prev.filter(id => id !== brandId)
        : [...prev, brandId]
    );
  };

  const collections = brandCollections[activeTab as keyof typeof brandCollections] || brandCollections.recommend;

  if (activeTab === "following" && followingBrands.length === 0) {
    return (
      <div className="text-center py-12">
        <Users className="h-12 w-12 text-gray-400 mx-auto mb-4" />
        <p className="text-gray-500 text-lg mb-2">No brands followed yet</p>
        <p className="text-gray-400 text-sm">Follow brands to see their updates here</p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {collections.map((brand) => (
        <div key={brand.id} className="bg-white rounded-lg shadow-sm border border-gray-100 overflow-hidden">
          {/* Brand Header */}
          <div className="flex items-center justify-between p-4 border-b border-gray-100">
            <div className="flex-1">
              <button 
                className="text-left"
                onClick={() => handleBrandClick(brand.brandName)}
              >
                <h3 className="font-bold text-gray-900 text-base">{brand.brandName}</h3>
                <div className="flex items-center space-x-4 mt-1">
                  <div className="flex items-center space-x-1 text-gray-500 text-xs">
                    <Users className="h-3 w-3" />
                    <span>{brand.followers} followers</span>
                  </div>
                  <div className="flex items-center space-x-1 text-green-600 text-xs">
                    <TrendingUp className="h-3 w-3" />
                    <span>Sales surge {brand.salesSurge}</span>
                  </div>
                </div>
              </button>
            </div>
            <button
              onClick={() => handleFollowToggle(brand.id)}
              className={cn(
                "flex items-center space-x-1 px-3 py-1.5 rounded-full text-xs font-medium transition-colors",
                followingBrands.includes(brand.id)
                  ? "bg-gray-100 text-gray-600"
                  : "bg-primary text-white hover:bg-primary/90"
              )}
            >
              <Plus className="h-3 w-3" />
              <span>{followingBrands.includes(brand.id) ? "Following" : "Follow"}</span>
            </button>
          </div>

          {/* Products Grid */}
          <div className="p-4">
            {/* <div className="grid grid-cols-4 gap-2 mb-3"> */}
            <div className="overflow-x-auto scroll-fade hide-scrollbar grid grid-flow-col grid-rows-1 gap-2 mb-3">
              {brand.products.map((product) => (
                <div key={product.id} className="relative" onClick={() => handleProductClick(product.id)}>
                  <img 
                    src={product.image} 
                    alt="Product"
                    className="w-full aspect-square object-cover rounded-lg"
                  />
                  <div className="absolute bottom-5 left-0 right-0 bg-black bg-opacity-60 text-white text-xs p-0 rounded-b-lg">
                    <div className="text-center">
                      <div className="text-gray-300">{product.sold} sold</div>
                    </div>
                  </div>
                  <div className="mt-1 text-center">
                    <span className="text-primary font-bold text-sm">${product.price}</span>
                  </div>
                </div>
              ))}
            </div>

            {/* Customer Review */}
            <div className="bg-gray-50 rounded-lg p-0">
              <div className="flex items-center space-x-2 mb-2">
                <div className="flex">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <Star key={star} className="h-3 w-3 text-yellow-400 fill-current" />
                  ))}
                </div>
                <span className="text-xs text-gray-500">Customer XXX</span>
                <p className="text-sm text-gray-700 italic">"{brand.review}"</p>
              </div>
              {/* <p className="text-sm text-gray-700 italic">"{brand.review}"</p> */}
            </div>
          </div>
        </div>
      ))}

      {/* You May Also Like Section for Following Tab */}
      {activeTab === "following" && (
        <div className="bg-white rounded-lg shadow-sm border border-gray-100 p-4">
          <h3 className="font-bold text-gray-900 mb-3">You May Also Like</h3>
          <div className="grid grid-cols-2 gap-3">
            {brandCollections.recommend.slice(0, 8).map((brand) => (
              <div key={brand.id} className="border border-gray-100 rounded-lg p-3">
                <div className="flex items-center justify-between mb-2">
                  <span className="font-medium text-sm">{brand.brandName}</span>
                  <button
                    onClick={() => handleFollowToggle(brand.id)}
                    className="bg-primary text-white text-xs px-2 py-1 rounded-full"
                  >
                    +
                  </button>
                </div>
                <div className="grid grid-cols-2 gap-1">
                  {brand.products.slice(0, 2).map((product) => (
                    <img 
                      key={product.id}
                      src={product.image} 
                      alt="Product"
                      className="w-full aspect-square object-cover rounded"
                    />
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}