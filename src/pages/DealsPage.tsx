import { useState } from "react";
import Navbar from "../components/ui/navbar";
import { Banner } from "../components/banner";
import { QuickView } from "../components/quick-view";
import { PRODUCTS, type Product } from "../lib/products-data";
import { Footer } from "../components/footer";
import { Star, Heart } from "lucide-react";

export default function DealsPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);

  // Filter products by Deals and search query
  const deals = PRODUCTS.filter((product) => {
    const isDeal = product.productType === "deals";
    if (!searchQuery) return isDeal;
    return isDeal && product.name.toLowerCase().includes(searchQuery.toLowerCase().trim());
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
              <div className="ml-auto flex items-center gap-0.5 text-[11px] text-amber-500 font-semibold">
                <Star className="w-3 h-3 fill-amber-400 text-amber-400" />
                <span>{product.rating}</span>
              </div>
            </div>
            <h4 className="font-semibold text-sm text-gray-800 line-clamp-2 hover:text-emerald-600 transition-colors cursor-pointer" onClick={() => setSelectedProduct(product)}>
              {product.name}
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
            <button
              onClick={() => setSelectedProduct(product)}
              className="px-3 py-1.5 bg-emerald-600 text-white font-bold rounded-lg text-xs hover:bg-emerald-700 transition-all active:scale-95 shadow-sm"
            >
              Add
            </button>
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
        filteredProducts={deals}
        onProductClick={setSelectedProduct}
      />
      <Navbar
        user={null}
        onSignInClick={() => {}}
        onSignUpClick={() => {}}
        onSignOutClick={() => {}}
      />

      <div className="bg-amber-50/50 py-12 border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-6 text-center">
          <span className="text-xs bg-amber-100 text-amber-800 font-bold px-3 py-1 rounded-full uppercase tracking-wider">
            Limited Time Offers
          </span>
          <h1 className="text-3xl md:text-4xl font-extrabold text-gray-900 mt-3">
            Handpicked Deals for You
          </h1>
          <p className="text-sm text-gray-500 mt-2 max-w-xl mx-auto">
            Take advantage of exclusive discounts on your favorite organic formulations and household herbal remedies.
          </p>
        </div>
      </div>

      <main className="flex-grow max-w-7xl mx-auto px-6 py-12 w-full">
        {deals.length === 0 ? (
          <div className="text-center py-16 text-gray-500">No active deals found.</div>
        ) : (
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-6">
            {deals.map(renderProductCard)}
          </div>
        )}
      </main>

      <QuickView product={selectedProduct} onClose={() => setSelectedProduct(null)} />
      <Footer />
    </div>
  );
}
