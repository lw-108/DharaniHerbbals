import { useState } from "react";
import { Banner } from "../components/banner";
import Navbar from "../components/ui/navbar";
import { QuickView } from "../components/quick-view";
import { PRODUCTS, type Product } from "../lib/products-data";
import { Footer } from "../components/footer";
import { Star, Heart } from "lucide-react";
import { useProductFilter } from "@/lib/product-filter-context";
import { Link } from "react-router-dom";

export default function MostLovedPage() {
  const { category, brand, productType, sort } = useProductFilter();
  const [searchQuery, setSearchQuery] = useState("");
  const [visibleCount, setVisibleCount] = useState(20);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);

  // Filter products by Most Loved (Best Selling) and search query
  const filtered = PRODUCTS.filter((product) => {
    const isBestSeller = product.productType === "Best Selling";
    if (!isBestSeller) return false;
    if (category !== "All" && product.category !== category) return false;
    if (brand !== "All Brands" && product.brand !== brand) return false;
    if (productType !== "All Types" && product.productType !== productType) return false;
    if (!searchQuery) return true;
    return product.name.toLowerCase().includes(searchQuery.toLowerCase().trim());
  });
  const mostLoved = filtered.sort((a, b) => {
    if (sort === "price-asc") return a.price - b.price;
    if (sort === "price-desc") return b.price - a.price;
    if (sort === "rating-desc") return b.rating - a.rating;
    return 0;
  });

  const renderProductCard = (product: Product) => {
    const discount = product.originalPrice ? Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100) : 0;
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
          <button className="absolute top-3 right-3 text-gray-300 hover:text-red-500 transition-colors z-10">
            <Heart className="w-5 h-5" />
          </button>
          <img
            src={product.imageUrl}
            alt={product.name}
            className="w-full h-full object-contain mix-blend-multiply group-hover:scale-105 transition-transform duration-500"
          />
        </div>
        <div className="p-4 flex-grow flex flex-col justify-between">
          <div>
            <div className="flex items-center gap-1 mb-1">
              <span className="text-[10px] bg-emerald-50 text-emerald-700 font-bold px-2 py-0.5 rounded">
                {product.category}
              </span>
              <div className="flex items-center gap-0.5 text-[11px] text-amber-500 font-semibold">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star key={i} className="w-3 h-3 fill-amber-400" />
                ))}
              </div>
            </div>
            <h4 className="font-semibold text-sm text-gray-800 line-clamp-2 hover:text-emerald-600 transition-colors cursor-pointer" onClick={() => setSelectedProduct(product)}>
              {product.name.toUpperCase()}
            </h4>
            <p className="text-[11px] text-gray-400 italic mt-0.5">{product.botanicalName}</p>
          </div>
          <div className="flex items-center justify-between mt-4 pt-3 border-t border-gray-50">
            <div className="flex items-baseline gap-1">
              <span className="text-base font-bold text-gray-900">₹{product.price}</span>
              {product.originalPrice && (
                <span className="text-xs text-gray-400 line-through">₹{product.originalPrice}</span>
              )}
            </div>
            <div className="flex gap-2">
              <button onClick={() => setSelectedProduct(product)} className="px-3 py-1.5 bg-emerald-600 text-white font-bold rounded-lg text-xs hover:bg-emerald-700 transition-all active:scale-95 shadow-sm">
                Add to Cart
              </button>
              <button onClick={() => /* TODO: handle buy now */ null} className="px-3 py-1.5 bg-amber-600 text-white font-bold rounded-lg text-xs hover:bg-amber-700 transition-all active:scale-95 shadow-sm">
                Buy Now
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-white text-gray-900 flex flex-col selection:bg-emerald-100 selection:text-emerald-900">
        <Banner
          searchQuery={searchQuery}
          setSearchQuery={setSearchQuery}
          filteredProducts={mostLoved}
          onProductClick={setSelectedProduct}
        />
        <div className="flex justify-center my-4">
          <Link to="/shop" className="px-4 py-2 bg-emerald-600 text-white rounded hover:bg-emerald-700 transition">
            View All Products
          </Link>
        </div>
      <Navbar
        user={null}
        onSignInClick={() => {}}
        onSignUpClick={() => {}}
        onSignOutClick={() => {}}
      />

      <div className="bg-emerald-50/50 py-12 border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-6 text-center">
          <span className="text-xs bg-emerald-100 text-emerald-800 font-bold px-3 py-1 rounded-full uppercase tracking-wider">
            Curated Favorites
          </span>
          <h1 className="text-3xl md:text-4xl font-extrabold text-gray-900 mt-3">
            Our Most Loved Picks
          </h1>
          <p className="text-sm text-gray-500 mt-2 max-w-xl mx-auto">
            Handpicked favorites that our customers keep coming back for. Crafted with pristine organic ingredients for holistic health.
          </p>
        </div>
      </div>

      <main className="flex-grow max-w-7xl mx-auto px-6 py-12 w-full">
        {mostLoved.length === 0 ? (
          <div className="text-center py-16 text-gray-500">No products found.</div>
        ) : (
          <div>
  <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-6">
    {mostLoved.slice(0, visibleCount).map(renderProductCard)}
  </div>
  {visibleCount < mostLoved.length && (
    <div className="flex justify-center mt-6">
      <button
        onClick={() => setVisibleCount(prev => Math.min(prev + 20, mostLoved.length))}
        className="px-4 py-2 bg-emerald-600 text-white rounded hover:bg-emerald-700 transition"
      >
        View More
      </button>
    </div>
  )}
</div>
        )}
      </main>

      <QuickView product={selectedProduct} onClose={() => setSelectedProduct(null)} />
      <Footer />
    </div>
  );
}
