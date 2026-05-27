import { useState } from "react";
import { Banner } from "@/components/banner";
import Navbar from "@/components/ui/navbar";
import { ProductGrid } from "@/components/product-grid";
import { Footer } from "@/components/footer";
import { PRODUCTS, type Product } from "@/lib/products-data";
import { QuickView } from "@/components/quick-view";

export default function TrendingPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);

  // Filter products by Trending (case-insensitive match) and search query
  const trending = PRODUCTS.filter((product) => {
    const isTrending = product.productType?.toLowerCase() === "trending";
    if (!searchQuery) return isTrending;
    return isTrending && product.name.toLowerCase().includes(searchQuery.toLowerCase().trim());
  });

  const handleResetSearch = () => {
    setSearchQuery("");
  };

  return (
    <div className="min-h-screen bg-background text-foreground flex flex-col">
      {/* Top Banner */}
      <Banner
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        filteredProducts={trending}
        onProductClick={setSelectedProduct}
      />

      {/* Navbar */}
      <Navbar
        user={null}
        onSignInClick={() => {}}
        onSignUpClick={() => {}}
        onSignOutClick={() => {}}
      />

      {/* Header Info */}
      <div className="bg-teal-50/50 dark:bg-teal-950/10 py-12 border-b border-border/40">
        <div className="max-w-7xl mx-auto px-6 text-center">
          <span className="text-xs bg-teal-100 dark:bg-teal-900/60 text-teal-800 dark:text-teal-300 font-bold px-3 py-1 rounded-full uppercase tracking-wider">
            Popular Choices
          </span>
          <h1 className="text-3xl md:text-4xl font-extrabold text-foreground mt-3">
            Trending Products
          </h1>
          <p className="text-sm text-muted-foreground mt-2 max-w-xl mx-auto">
            Discover what our wellness community is loving right now. Get access to hot, demand-driven remedies.
          </p>
        </div>
      </div>

      {/* Main Catalog Grid */}
      <main className="flex-grow pb-16">
        <ProductGrid
          products={trending}
          searchQuery={searchQuery}
          onProductClick={setSelectedProduct}
          onResetSearch={handleResetSearch}
        />
      </main>

      {/* Quick View Modal */}
      <QuickView product={selectedProduct} onClose={() => setSelectedProduct(null)} />

      {/* Footer */}
      <Footer />
    </div>
  );
}
