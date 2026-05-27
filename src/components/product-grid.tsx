'use client';

import { Star, Leaf, Sparkles, RefreshCw, Eye, ArrowRight } from "lucide-react";
import { type Product } from "@/lib/products-data";
import { Link } from "react-router-dom";

interface ProductGridProps {
  products: Product[];
  searchQuery: string;
  onProductClick: (product: Product) => void;
  onResetSearch: () => void;
  limit?: number;
}

// Subcomponent to highlight matching search characters
function HighlightText({ text, highlight }: { text: string; highlight: string }) {
  if (!highlight.trim()) return <span>{text}</span>;
  
  // Escaping special characters for regex matching
  const safeHighlight = highlight.replace(/[-\/\\^$*+?.()|[\]{}]/g, "\\$&");
  const regex = new RegExp(`(${safeHighlight})`, "gi");
  const parts = text.split(regex);

  return (
    <span>
      {parts.map((part, i) => 
        regex.test(part) ? (
          <mark key={i} className="bg-emerald-100 dark:bg-emerald-900/60 text-emerald-800 dark:text-emerald-300 font-bold px-0.5 rounded transition-all">
            {part}
          </mark>
        ) : (
          part
        )
      )}
    </span>
  );
}

export function ProductGrid({
  products,
  searchQuery,
  onProductClick,
  onResetSearch,
  limit
}: ProductGridProps) {
  // Show up to the limit if specified (e.g. on home page sections), or all if searching/on dedicated pages
  const displayedProducts = searchQuery ? products : (limit ? products.slice(0, limit) : products);
  
  if (products.length === 0) {
    return (
      <div className="w-full max-w-lg mx-auto py-16 px-6 text-center flex flex-col items-center justify-center gap-4 bg-muted/20 border border-dashed border-border rounded-3xl animate-fade-in">
        <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center text-primary mb-2">
          <Leaf className="w-8 h-8 animate-pulse" />
        </div>
        <h3 className="text-xl font-bold text-foreground">
          No organic products found
        </h3>
        <p className="text-sm text-muted-foreground leading-relaxed">
          We couldn't find anything matching your smart search term "<span className="font-semibold text-foreground">{searchQuery}</span>".
          Check for spelling mistakes or try a popular category instead.
        </p>
        <button
          onClick={onResetSearch}
          className="mt-2 inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-primary text-primary-foreground font-bold text-sm shadow-md hover:bg-primary/95 transition-all duration-200 active:scale-95 cursor-pointer"
        >
          <RefreshCw className="w-4 h-4" /> Reset Search Filters
        </button>
      </div>
    );
  }

  return (
    <div className="w-full max-w-7xl mx-auto px-4 py-8">
      {/* Search status header */}
      <div className="mb-8 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3 border-b border-border/60 pb-4">
        <div>
          <h3 className="text-lg font-bold text-foreground flex items-center gap-2">
            <Sparkles className="w-4 h-4 text-primary" />
            {searchQuery ? "Search Results" : "Our Most Loved Picks"}
          </h3>
          <p className="text-xs text-muted-foreground mt-0.5">
            Showing {displayedProducts.length} of {products.length} premium botanical remedies
          </p>
        </div>
        
        {searchQuery && (
          <button
            onClick={onResetSearch}
            className="text-xs font-semibold text-primary hover:underline flex items-center gap-1 cursor-pointer"
          >
            Clear active filters
          </button>
        )}
      </div>

      {/* Grid List */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 md:gap-8">
        {displayedProducts.map((product) => (
          <div
            key={product.id}
            onClick={() => onProductClick(product)}
            className="group bg-card text-card-foreground border border-border/60 rounded-3xl overflow-hidden shadow-sm hover:shadow-xl hover:border-primary/30 transition-all duration-300 flex flex-col justify-between cursor-pointer relative"
          >
            {/* Header badges inside image */}
            <div className="relative aspect-square overflow-hidden bg-muted/20">
              <img
                src={product.imageUrl}
                alt={product.name}
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
              />
              {/* Soft overlay gradients */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              
              {/* Badges on left */}
              <div className="absolute top-3 left-3 flex flex-col gap-1.5 z-10">
                {product.isBestSeller && (
                  <span className="text-[9px] bg-amber-500 text-white font-bold px-2 py-0.5 rounded-md uppercase tracking-wider shadow-sm">
                    Bestseller
                  </span>
                )}
                {product.isNew && (
                  <span className="text-[9px] bg-emerald-500 text-white font-bold px-2 py-0.5 rounded-md uppercase tracking-wider shadow-sm">
                    New
                  </span>
                )}
              </div>

              {/* Hover Quick View action button overlay */}
              <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300">
                <span className="inline-flex items-center gap-1.5 bg-background/90 text-foreground px-4 py-2.5 rounded-2xl shadow-lg border border-border text-xs font-bold backdrop-blur-sm transform translate-y-2 group-hover:translate-y-0 transition-transform duration-300">
                  <Eye className="w-3.5 h-3.5 text-primary" /> Quick View
                </span>
              </div>
            </div>

            {/* Product Metadata Info Area */}
            <div className={`p-5 flex-grow flex flex-col justify-between bg-gradient-to-b ${product.colorTheme ?? ""}`}>
              <div>
                {/* Category & Botanical details */}
                <div className="flex justify-between items-center gap-2 mb-1.5">
                  <span className="text-[10px] font-bold text-primary uppercase tracking-widest">
                    {product.category}
                  </span>
                  <div className="flex items-center gap-1 text-[11px] font-semibold text-foreground">
                    <Star className="w-3 h-3 fill-amber-500 text-amber-500" />
                    <span>{product.rating}</span>
                  </div>
                </div>

                {/* Name - smart highlight characters */}
                <h4 className="font-bold text-sm md:text-base text-foreground group-hover:text-primary transition-colors line-clamp-1 mb-1">
                  <HighlightText text={product.name} highlight={searchQuery} />
                </h4>

                <p className="text-[11px] text-muted-foreground italic font-medium line-clamp-1 mb-3">
                  <HighlightText text={product.botanicalName} highlight={searchQuery} />
                </p>
              </div>

              {/* Description snippet */}
              <p className="text-xs text-muted-foreground/80 line-clamp-2 leading-relaxed mb-4">
                {product.description}
              </p>

              {/* Price & Actions */}
              <div className="flex items-center justify-between mt-auto pt-3 border-t border-border/30">
                <div className="flex items-center gap-2">
                  <span className="text-base font-extrabold text-foreground">₹{product.price}</span>
                  {product.originalPrice && (
                    <span className="text-xs text-muted-foreground line-through">₹{product.originalPrice}</span>
                  )}
                </div>
                <button
                  onClick={(e) => { e.stopPropagation(); onProductClick(product); }}
                  className="px-3 py-1.5 bg-primary text-primary-foreground font-bold rounded-lg text-xs hover:bg-primary/90 transition-all active:scale-95 shadow-sm"
                >
                  Add to Cart
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* View More Button */}
      {!searchQuery && (
        <div className="mt-12 flex justify-center">
          <Link
            to="/shop"
            className="inline-flex items-center gap-2 px-6 py-3 bg-primary text-primary-foreground font-bold rounded-2xl shadow-lg hover:bg-primary/95 transition-all duration-200 active:scale-95 cursor-pointer"
          >
            Browse All Products <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      )}
    </div>
  );
}
