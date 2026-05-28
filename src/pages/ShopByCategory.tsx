import { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import { ArrowRight, Star, Heart, ArrowLeft, SlidersHorizontal } from "lucide-react";
import { PRODUCTS, type Product } from "../lib/products-data";
import { useProductFilter } from "../lib/product-filter-context";
import { useApp } from "@/lib/app-context";
import { QuickView } from "../components/quick-view";

function CategoryCard({ title, onClick }: { title: string; onClick: () => void }) {


  // Try matching images based on categories
  const getCategoryImage = (cat: string) => {
    switch (cat.toLowerCase()) {
      case "hair": return "https://images.unsplash.com/photo-1527799881356-9a794c14b3d2?auto=format&fit=crop&q=80&w=400";
      case "skin": return "https://images.unsplash.com/photo-1556228720-195a672e8a03?auto=format&fit=crop&q=80&w=400";
      case "baby": return "https://images.unsplash.com/photo-1519689680058-324335c77ebe?auto=format&fit=crop&q=80&w=400";
      case "beverages": return "https://images.unsplash.com/photo-1576092768241-dec231879fc3?auto=format&fit=crop&q=80&w=400";
      case "health & wellness": return "https://images.unsplash.com/photo-1471864190281-a93a3070b6de?auto=format&fit=crop&q=80&w=400";
      default: return `https://images.unsplash.com/photo-1546842931-886c185b4c8c?auto=format&fit=crop&q=80&w=400`;
    }
  };

  return (
    <div
      onClick={onClick}
      className="group relative block w-full overflow-hidden rounded-2xl bg-white border border-gray-100 shadow-sm transition-all duration-300 hover:scale-[1.02] hover:shadow-xl cursor-pointer"
    >
      <div className="h-44 overflow-hidden relative">
        <img
          src={getCategoryImage(title)}
          alt={title}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent opacity-60" />
      </div>
      <div className="p-5 text-center">
        <h3 className="text-base font-bold text-gray-800 transition-colors group-hover:text-emerald-600">
          {title}
        </h3>
        <span className="inline-flex items-center gap-1.5 text-xs text-emerald-600 font-bold mt-2 opacity-0 transform translate-y-1 transition-all duration-300 group-hover:opacity-100 group-hover:translate-y-0">
          Explore Collection <ArrowRight className="w-3.5 h-3.5" />
        </span>
      </div>
    </div>
  );
}

export default function ShopByCategory() {
  const { category, setCategory, brand, productType, sort } = useProductFilter();
  const { addToCart, toggleWishlist, wishlist, searchQuery, setSearchQuery } = useApp();
  const [searchParams, setSearchParams] = useSearchParams();
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);

  // Read URL query params
  const urlCategory = searchParams.get("category");
  const urlSearch = searchParams.get("search");

  // Sync URL params to contexts on load
  useEffect(() => {
    if (urlCategory) {
      setCategory(urlCategory);
    }
    if (urlSearch) {
      setSearchQuery(urlSearch);
    }
  }, [urlCategory, urlSearch]);

  const categories = [
    "Hair Care",
    "Skin Care",
    "Baby Care",
    "Wellness",
    "Organic Teas"
  ];

  // Helper matching function
  const isCategoryMatch = (prodCat: string, targetCat: string) => {
    if (targetCat === "All") return true;
    const t = targetCat.toLowerCase().replace(" care", "").trim();
    const p = prodCat.toLowerCase().replace(" care", "").trim();
    return p.includes(t) || t.includes(p);
  };

  const activeSearch = searchQuery || urlSearch || "";
  const activeCategory = category !== "All" ? category : (urlCategory || "All");

  // Filter products list
  const filteredProducts = PRODUCTS.filter((product) => {
    const matchesCategory = activeCategory === "All" || isCategoryMatch(product.category, activeCategory);
    const matchesBrand = brand === "All Brands" || product.brand === brand;
    const matchesType = productType === "All Types" || product.productType === productType;

    if (!activeSearch) {
      return matchesCategory && matchesBrand && matchesType;
    }

    const query = activeSearch.toLowerCase().trim();
    const matchesName = product.name.toLowerCase().includes(query);
    const matchesBot = product.botanicalName.toLowerCase().includes(query);
    const matchesCat = product.category.toLowerCase().includes(query);
    return matchesCategory && matchesBrand && matchesType && (matchesName || matchesBot || matchesCat);
  });

  // Sort products
  const sortedProducts = [...filteredProducts].sort((a, b) => {
    if (sort === "price-asc") return a.price - b.price;
    if (sort === "price-desc") return b.price - a.price;
    if (sort === "rating-desc") return b.rating - a.rating;
    return 0;
  });

  const isBrowsingProducts = activeCategory !== "All" || activeSearch !== "";

  const handleClearFilters = () => {
    setCategory("All");
    setSearchQuery("");
    setSearchParams({});
  };

  return (
    <section className="relative py-8 bg-white min-h-[60vh]">
      <div className="max-w-7xl mx-auto px-4 lg:px-6">

        {isBrowsingProducts ? (
          <div>
            {/* Header controls for product browser */}
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 border-b border-gray-100 pb-6 mb-8">
              <div className="space-y-1 text-left">
                <button
                  onClick={handleClearFilters}
                  className="inline-flex items-center gap-1.5 text-xs text-gray-500 hover:text-emerald-600 font-bold transition-colors cursor-pointer mb-2"
                >
                  <ArrowLeft className="w-3.5 h-3.5" /> Back to Categories
                </button>
                <h2 className="text-2xl font-extrabold text-gray-900 tracking-tight">
                  {activeCategory !== "All" ? activeCategory : "Search Results"}
                </h2>
                <p className="text-xs text-gray-400">
                  Showing {sortedProducts.length} pristine Ayurvedic remedies
                </p>
              </div>

              {/* Reset active filters */}
              <button
                onClick={handleClearFilters}
                className="px-4 py-2 border border-gray-200 text-xs font-bold text-gray-700 rounded-xl hover:bg-gray-50 transition-colors flex items-center gap-2 cursor-pointer shadow-sm ml-auto md:ml-0"
              >
                <SlidersHorizontal className="w-3.5 h-3.5 text-emerald-600" /> Reset Filters
              </button>
            </div>

            {/* Products Grid */}
            {sortedProducts.length === 0 ? (
              <div className="text-center py-20 text-gray-500 border border-dashed border-gray-200 rounded-3xl p-10 max-w-lg mx-auto">
                <p className="text-base font-bold text-gray-800">No matching remedies found</p>
                <p className="text-xs text-gray-400 mt-1 max-w-[280px] mx-auto">
                  Try checking another category, removing search queries, or altering sidebar selections.
                </p>
                <button
                  onClick={handleClearFilters}
                  className="mt-6 px-6 py-2.5 bg-emerald-600 text-white rounded-xl text-xs font-bold hover:bg-emerald-700 transition"
                >
                  View All Categories
                </button>
              </div>
            ) : (
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6">
                {sortedProducts.map((product) => {
                  const discount = product.originalPrice ? Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100) : 0;
                  const isWishlisted = wishlist.includes(product.id);

                  return (
                    <div
                      key={product.id}
                      className="group relative bg-white border border-gray-100 rounded-2xl shadow-sm hover:shadow-xl hover:border-emerald-100 transition-all duration-300 flex flex-col justify-between overflow-hidden"
                    >
                      <div className="relative aspect-square bg-gray-50 flex items-center justify-center p-4">
                        {discount > 0 && (
                          <span className="absolute top-3 left-3 bg-red-500 text-white text-[10px] font-extrabold px-2 py-0.5 rounded-full z-10 shadow-sm">
                            {discount}% OFF
                          </span>
                        )}
                        <button
                          onClick={() => toggleWishlist(product.id)}
                          className={`absolute top-3 right-3 transition-colors z-10 cursor-pointer p-1 rounded-full bg-white/80 shadow-sm backdrop-blur-sm ${isWishlisted ? "text-red-500" : "text-gray-300 hover:text-red-500"
                            }`}
                          title="Toggle Wishlist"
                        >
                          <Heart className={`w-4 h-4 ${isWishlisted ? "fill-current" : ""}`} />
                        </button>
                        <img
                          src={product.imageUrl}
                          alt={product.name}
                          onClick={() => setSelectedProduct(product)}
                          className="w-full h-full object-contain mix-blend-multiply group-hover:scale-105 transition-transform duration-500 cursor-pointer"
                        />
                      </div>

                      <div className="p-4 flex-grow flex flex-col justify-between">
                        <div>
                          <div className="flex items-center gap-1 mb-1">
                            <span className="text-[9px] bg-emerald-50 text-emerald-700 font-bold px-1.5 py-0.5 rounded">
                              {product.category}
                            </span>
                            <div className="ml-auto flex items-center gap-0.5 text-[10px] text-amber-500 font-semibold">
                              <Star className="w-3 h-3 fill-amber-400 text-amber-400" />
                              <span>{product.rating}</span>
                            </div>
                          </div>
                          <h4
                            className="font-bold text-xs text-gray-800 line-clamp-2 hover:text-emerald-600 transition-colors cursor-pointer text-left leading-normal"
                            onClick={() => setSelectedProduct(product)}
                          >
                            {product.name}
                          </h4>
                          <p className="text-[10px] text-gray-400 italic mt-0.5 text-left truncate">
                            {product.botanicalName}
                          </p>
                        </div>

                        <div className="flex items-center justify-between mt-4 pt-3 border-t border-gray-50">
                          <div className="flex items-baseline gap-1">
                            <span className="text-sm font-black text-gray-900">₹{product.price}</span>
                            {product.originalPrice && (
                              <span className="text-[10px] text-gray-400 line-through">₹{product.originalPrice}</span>
                            )}
                          </div>
                          <button
                            onClick={() => addToCart(product)}
                            className="px-3 py-1.5 bg-emerald-600 text-white font-bold rounded-lg text-[10px] hover:bg-emerald-700 transition-all active:scale-95 shadow-sm cursor-pointer"
                          >
                            Add
                          </button>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        ) : (
          <div>
            {/* Standard Category Grid */}
            <h2 className="text-3xl font-black text-gray-900 text-center mb-3">
              Shop by Category
            </h2>
            <p className="text-center text-gray-500 text-xs max-w-md mx-auto mb-12 leading-relaxed">
              Explore our thoughtfully curated range of native herbal formulations, handpicked and cold-processed to retain maximum Ayurvedic efficacy.
            </p>

            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-6 max-w-5xl mx-auto">
              {categories.map((cat) => (
                <CategoryCard
                  key={cat}
                  title={cat}
                  onClick={() => {
                    setCategory(cat);
                    setSearchParams({ category: cat });
                  }}
                />
              ))}
            </div>

            <div className="mt-12 text-center">
              <button
                onClick={() => setCategory("All")}
                className="inline-flex items-center gap-2 px-8 py-3 bg-emerald-600 text-white font-bold text-xs rounded-xl shadow hover:bg-emerald-700 transition-all"
              >
                Browse All Products <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        )}
      </div>

      <QuickView product={selectedProduct} onClose={() => setSelectedProduct(null)} />
    </section>
  );
}
