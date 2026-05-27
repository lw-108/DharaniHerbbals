import { useState, useEffect } from "react";
import { X, Star, Check, ShieldCheck, Heart, ShoppingBag, Info, HeartHandshake } from "lucide-react";
import { type Product } from "@/lib/products-data";

interface QuickViewProps {
  product: Product | null;
  onClose: () => void;
}

export function QuickView({ product, onClose }: QuickViewProps) {
  const [isAdded, setIsAdded] = useState(false);
  const [isLiked, setIsLiked] = useState(false);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    if (product) {
      setIsVisible(true);
      setIsAdded(false);
      // Prevent body scrolling when modal is active
      document.body.style.overflow = "hidden";
    } else {
      setIsVisible(false);
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [product]);

  if (!product) return null;

  const handleClose = () => {
    setIsVisible(false);
    setTimeout(onClose, 200); // Wait for transition
  };

  const handleAddToCart = () => {
    setIsAdded(true);
    setTimeout(() => {
      setIsAdded(false);
    }, 2500);
  };

  return (
    <div
      className={`fixed inset-0 z-50 flex items-center justify-center p-4 transition-all duration-300 ${
        isVisible ? "opacity-100" : "opacity-0 pointer-events-none"
      }`}
    >
      {/* Backdrop */}
      <div
        onClick={handleClose}
        className="absolute inset-0 bg-background/80 backdrop-blur-md"
      />

      {/* Modal Card */}
      <div
        className={`bg-card text-foreground border border-border w-full max-w-3xl rounded-3xl overflow-hidden shadow-2xl relative z-10 flex flex-col md:flex-row transition-all duration-300 max-h-[90vh] md:max-h-[85vh] ${
          isVisible ? "scale-100 translate-y-0" : "scale-95 translate-y-4"
        }`}
      >
        {/* Close Button */}
        <button
          onClick={handleClose}
          className="absolute top-4 right-4 z-20 p-2 rounded-full bg-background/80 dark:bg-card/80 border border-border hover:bg-muted text-muted-foreground hover:text-foreground transition-all shadow-sm cursor-pointer"
          title="Close Modal"
        >
          <X className="w-4 h-4" />
        </button>

        {/* Left Side: Product Image & Badges */}
        <div className="w-full md:w-5/12 relative min-h-[220px] md:min-h-[400px] bg-muted/40">
          <img
            src={product.imageUrl}
            alt={product.name}
            className="w-full h-full object-cover absolute inset-0"
          />
          {/* Gradients */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent pointer-events-none" />

          {/* Floating Badges */}
          <div className="absolute bottom-4 left-4 right-4 flex flex-wrap gap-2">
            {product.isBestSeller && (
              <span className="text-[10px] md:text-xs bg-amber-500 text-white font-bold px-2.5 py-1 rounded-full shadow-md flex items-center gap-1">
                <Star className="w-3.5 h-3.5 fill-current" /> Bestseller
              </span>
            )}
            {product.isNew && (
              <span className="text-[10px] md:text-xs bg-emerald-500 text-white font-bold px-2.5 py-1 rounded-full shadow-md flex items-center gap-1">
                <ShieldCheck className="w-3.5 h-3.5" /> Fresh Batch
              </span>
            )}
          </div>
        </div>

        {/* Right Side: Product Details & Scrollable Content */}
        <div className="w-full md:w-7/12 p-6 md:p-8 overflow-y-auto flex flex-col justify-between max-h-[50vh] md:max-h-[85vh]">
          <div>
            {/* Header */}
            <div className="mb-4">
              <span className="text-[11px] font-bold text-primary uppercase tracking-widest bg-primary/10 dark:bg-primary/20 px-2.5 py-1 rounded-full">
                {product.category}
              </span>
              <h2 className="text-xl md:text-2xl font-bold text-foreground mt-3 leading-tight">
                {product.name}
              </h2>
              <p className="text-xs md:text-sm text-muted-foreground italic font-medium mt-1">
                Botanical Name: <span className="text-primary font-semibold">{product.botanicalName}</span>
              </p>
            </div>

            {/* Ratings and reviews */}
            <div className="flex items-center gap-2 mb-4 bg-muted/30 p-2 rounded-xl border border-border/40">
              <div className="flex text-amber-500">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    className={`w-3.5 h-3.5 ${
                      i < Math.floor(product.rating) ? "fill-current" : "opacity-30"
                    }`}
                  />
                ))}
              </div>
              <span className="text-xs font-bold text-foreground">{product.rating}</span>
              <span className="text-[11px] text-muted-foreground">({product.reviewsCount} organic reviews)</span>
            </div>

            {/* Description */}
            <p className="text-xs md:text-sm text-muted-foreground leading-relaxed mb-5">
              {product.description}
            </p>

            {/* Core Benefits */}
            <div className="mb-5">
              <h4 className="text-xs font-bold text-foreground uppercase tracking-wider mb-2.5 flex items-center gap-1.5">
                <HeartHandshake className="w-4 h-4 text-primary" /> Key Benefits & Remedies
              </h4>
              <ul className="space-y-1.5 text-xs text-muted-foreground">
                {product.benefits.map((benefit, i) => (
                  <li key={i} className="flex items-start gap-2">
                    <span className="text-primary shrink-0 mt-0.5 bg-primary/10 dark:bg-primary/20 p-0.5 rounded-full">
                      <Check className="w-3 h-3" />
                    </span>
                    <span>{benefit}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Ingredients & Usage */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6 bg-muted/20 border border-border/40 p-4 rounded-2xl">
              <div>
                <h4 className="text-xs font-bold text-foreground mb-1.5 flex items-center gap-1">
                  <Info className="w-3.5 h-3.5 text-primary" /> Key Ingredients
                </h4>
                <p className="text-xs text-muted-foreground leading-relaxed">
                  {product.ingredients.join(", ")}
                </p>
              </div>
              <div>
                <h4 className="text-xs font-bold text-foreground mb-1.5">
                  How to Use
                </h4>
                <p className="text-xs text-muted-foreground leading-relaxed">
                  {product.usage}
                </p>
              </div>
            </div>
          </div>

          {/* Pricing & Add to Cart footer */}
          <div className="border-t border-border/60 pt-5 flex items-center justify-between gap-4 mt-auto">
            <div>
              <span className="text-xs text-muted-foreground font-semibold block">Exclusive Organic Price</span>
              <div className="flex items-baseline gap-2">
                <span className="text-2xl font-bold text-foreground">₹{product.price}</span>
                {product.originalPrice && (
                  <span className="text-sm text-muted-foreground line-through">
                    ₹{product.originalPrice}
                  </span>
                )}
              </div>
            </div>

            <div className="flex gap-2 shrink-0">
              {/* Whishlist toggle */}
              <button
                onClick={() => setIsLiked(!isLiked)}
                className={`p-3 rounded-2xl border transition-all duration-200 cursor-pointer ${
                  isLiked
                    ? "bg-rose-500/10 border-rose-500/30 text-rose-500"
                    : "bg-muted border-border hover:bg-muted-foreground/10 text-muted-foreground"
                }`}
                title="Add to wishlist"
              >
                <Heart className={`w-4 h-4 ${isLiked ? "fill-current" : ""}`} />
              </button>

              {/* Add to wellness cart button with micro-animation */}
              <button
                onClick={handleAddToCart}
                className={`px-5 py-3 rounded-2xl font-bold text-xs md:text-sm shadow-md transition-all duration-300 flex items-center gap-2 cursor-pointer ${
                  isAdded
                    ? "bg-emerald-600 hover:bg-emerald-700 text-white shadow-emerald-500/20 scale-95"
                    : "bg-primary hover:bg-primary/95 text-primary-foreground shadow-primary/20 active:scale-95"
                }`}
              >
                <ShoppingBag className="w-4 h-4" />
                {isAdded ? "Added to Cart!" : "Add to Wellness Cart"}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
