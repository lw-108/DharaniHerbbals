import { Sheet, SheetContent, SheetHeader, SheetTitle } from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { useApp } from "@/lib/app-context";
import { Trash2, Plus, Minus, ShoppingBag } from "lucide-react";

export function CartDrawer() {
  const { cart, isCartOpen, setIsCartOpen, updateCartQty, removeFromCart, clearCart } = useApp();

  const totalAmount = cart.reduce((total, item) => total + item.product.price * item.quantity, 0);
  const totalItems = cart.reduce((count, item) => count + item.quantity, 0);

  return (
    <Sheet open={isCartOpen} onOpenChange={setIsCartOpen}>
      <SheetContent className="w-full sm:max-w-md bg-card border-l border-border p-0 flex flex-col justify-between h-full shadow-2xl">
        <div>
          {/* Header */}
          <SheetHeader className="p-6 border-b border-border/60 flex flex-row items-center justify-between">
            <SheetTitle className="flex items-center gap-2 text-foreground font-serif text-lg font-bold">
              <ShoppingBag className="w-5 h-5 text-primary" />
              <span>Your Shopping Cart ({totalItems})</span>
            </SheetTitle>
          </SheetHeader>

          {/* Cart List */}
          <div className="overflow-y-auto max-h-[calc(100vh-240px)] divide-y divide-border/60">
            {cart.length === 0 ? (
              <div className="flex flex-col items-center justify-center py-20 text-center px-6">
                <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mb-4 text-primary">
                  <ShoppingBag className="w-8 h-8" />
                </div>
                <h3 className="font-bold text-foreground text-sm">Your cart is empty</h3>
                <p className="text-xs text-muted-foreground mt-1 max-w-[240px]">
                  Explore our pure traditional Ayurvedic remedies and add products to start your wellness journey.
                </p>
                <Button
                  onClick={() => setIsCartOpen(false)}
                  className="mt-6 rounded-full bg-primary text-primary-foreground font-bold text-xs px-6 hover:bg-primary/90 shadow-sm"
                >
                  Continue Shopping
                </Button>
              </div>
            ) : (
              cart.map((item) => (
                <div key={item.product.id} className="p-4 flex gap-4 hover:bg-muted/20 transition-colors">
                  <div className="w-20 h-20 bg-gray-50/80 rounded-xl overflow-hidden border border-border/40 flex items-center justify-center p-2 shrink-0">
                    <img
                      src={item.product.imageUrl}
                      alt={item.product.name}
                      className="w-full h-full object-contain mix-blend-multiply"
                    />
                  </div>

                  <div className="flex-grow flex flex-col justify-between min-w-0">
                    <div>
                      <div className="flex justify-between items-start gap-2">
                        <h4 className="font-bold text-xs text-foreground line-clamp-2 leading-snug">
                          {item.product.name}
                        </h4>
                        <button
                          onClick={() => removeFromCart(item.product.id)}
                          className="text-muted-foreground hover:text-destructive transition-colors p-0.5 shrink-0"
                          title="Remove item"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                      <p className="text-[10px] text-muted-foreground italic mt-0.5 truncate">
                        {item.product.botanicalName}
                      </p>
                    </div>

                    <div className="flex justify-between items-center mt-2">
                      {/* Price info */}
                      <div className="flex items-baseline gap-1">
                        <span className="text-xs font-black text-foreground">
                          ₹{item.product.price * item.quantity}
                        </span>
                        {item.quantity > 1 && (
                          <span className="text-[9px] text-muted-foreground">
                            (₹{item.product.price} each)
                          </span>
                        )}
                      </div>

                      {/* Quantity Controls */}
                      <div className="flex items-center border border-border rounded-lg overflow-hidden bg-background">
                        <button
                          onClick={() => updateCartQty(item.product.id, item.quantity - 1)}
                          className="px-2 py-1 hover:bg-muted text-muted-foreground transition-colors"
                          title="Decrease quantity"
                        >
                          <Minus className="w-3 h-3" />
                        </button>
                        <span className="px-2 text-xs font-bold text-foreground min-w-[20px] text-center">
                          {item.quantity}
                        </span>
                        <button
                          onClick={() => updateCartQty(item.product.id, item.quantity + 1)}
                          className="px-2 py-1 hover:bg-muted text-muted-foreground transition-colors"
                          title="Increase quantity"
                        >
                          <Plus className="w-3 h-3" />
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>

        {/* Footer Area */}
        {cart.length > 0 && (
          <div className="p-6 border-t border-border/80 bg-muted/30 flex flex-col gap-4">
            <div className="flex justify-between text-sm font-bold text-foreground">
              <span>Subtotal</span>
              <span>₹{totalAmount}</span>
            </div>
            <p className="text-[10px] text-muted-foreground leading-normal">
              Shipping & taxes calculated at checkout. Supporting local growers with every purchase.
            </p>

            <div className="flex gap-3">
              <Button
                variant="outline"
                onClick={() => clearCart()}
                className="flex-1 rounded-xl text-xs font-semibold h-11 border-border/80 hover:bg-muted"
              >
                Clear Cart
              </Button>
              <Button
                onClick={() => {
                  alert(`Proceeding to checkout with total amount: ₹${totalAmount}`);
                  setIsCartOpen(false);
                }}
                className="flex-[2] rounded-xl text-xs font-bold h-11 bg-primary hover:bg-primary/90 text-primary-foreground shadow-lg shadow-primary/10"
              >
                Checkout
              </Button>
            </div>
          </div>
        )}
      </SheetContent>
    </Sheet>
  );
}
