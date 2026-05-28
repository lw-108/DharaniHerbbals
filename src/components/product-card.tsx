
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Heart, ShoppingCart, Star, StarHalf } from "lucide-react";

import { useAppContext } from "@/lib/app-context";
import { type Product } from "@/lib/products-data";

interface ProductCardProps {
  product: Product;
}

export function ProductCard({ product }: ProductCardProps) {
  const { addToCart, toggleWishlist, wishlist, cart } = useAppContext();
  const isInWishlist = wishlist.includes(product.id);
  const inCartQuantity = cart.find((c: any) => c.product.id === product.id)?.quantity ?? 0;

  const handleAddToCart = () => addToCart(product);
  const handleToggleWishlist = () => toggleWishlist(product.id);

  const fullStars = Math.floor(product.rating);
  const hasHalf = product.rating - fullStars >= 0.5;
  const emptyStars = 5 - fullStars - (hasHalf ? 1 : 0);

  return (
    <Card className="bg-glass backdrop-blur-lg border border-border/30 hover:shadow-xl transition-shadow">
      <div className="relative p-4">
        <img src={product.imageUrl} alt={product.name} className="w-full h-48 object-cover rounded-xl mb-3" />
        {/* Wishlist badge */}
        <button
          onClick={handleToggleWishlist}
          className="absolute top-2 left-2 cursor-pointer"
          aria-label="Toggle wishlist"
        >
          <Heart className={isInWishlist ? "size-5 text-primary" : "size-5"} />
        </button>
        <h3 className="text-lg font-semibold line-clamp-1">{product.name}</h3>
        <p className="text-sm text-muted-foreground line-clamp-2">{product.description}</p>
        {/* Rating */}
        <div className="flex items-center gap-1 text-primary mt-1">
          {[...Array(fullStars)].map((_, i) => (
            <Star key={i} className="size-4 fill-current" />
          ))}
          {hasHalf && <StarHalf className="size-4 fill-current" />}
          {[...Array(emptyStars)].map((_, i) => (
            <Star key={i} className="size-4 text-gray-300" />
          ))}
          <span className="ml-2 text-xs text-muted-foreground">({product.reviewsCount})</span>
        </div>
        {/* Price */}
        <div className="flex items-baseline gap-2 mt-2">
          <span className="text-xl font-bold text-primary">₹{product.price}</span>
          {product.originalPrice && (
            <span className="text-sm line-through text-muted-foreground">₹{product.originalPrice}</span>
          )}
        </div>
        {/* Actions */}
        <Button variant="default" size="sm" className="mt-3" onClick={handleAddToCart}>
          <ShoppingCart className="size-4 mr-1" />
          Add to Cart{inCartQuantity > 0 ? ` (${inCartQuantity})` : ""}
        </Button>
      </div>
    </Card>
  );
}
