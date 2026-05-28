import { createContext, useContext, useState, useEffect, type ReactNode } from "react";
import { type Product } from "@/lib/products-data";

// ─── Types ────────────────────────────────────────────────────────────────────

export interface User {
  name: string;
  email: string;
  avatarUrl?: string;
}

export interface CartItem {
  product: Product;
  quantity: number;
}

export type AuthMode = "signin" | "signup";

export interface AppContextProps {
  // Products
  productsList: Product[];

  // Wishlist
  wishlist: string[];
  toggleWishlist: (productId: string) => void;

  // Cart
  cart: CartItem[];
  addToCart: (product: Product) => void;
  updateCartQty: (productId: string, qty: number) => void;
  removeFromCart: (productId: string) => void;
  clearCart: () => void;
  isCartOpen: boolean;
  setIsCartOpen: (open: boolean) => void;

  // Auth modal
  isAuthOpen: boolean;
  setIsAuthOpen: (open: boolean) => void;
  authMode: AuthMode;
  setAuthMode: (mode: AuthMode) => void;

  // User / session
  user: User | null;
  signIn: (email: string) => Promise<void>;
  signUp: (name: string, email: string) => Promise<void>;
  signOut: () => void;

  // Search
  searchQuery: string;
  setSearchQuery: (query: string) => void;
}

// ─── Context ─────────────────────────────────────────────────────────────────

const AppContext = createContext<AppContextProps | undefined>(undefined);

// ─── Provider ────────────────────────────────────────────────────────────────

export function AppProvider({
  productsList,
  children,
}: {
  productsList: Product[];
  children: ReactNode;
}) {
  // Wishlist – persisted
  const [wishlist, setWishlist] = useState<string[]>(() => {
    try {
      const saved = localStorage.getItem("wishlist");
      return saved ? (JSON.parse(saved) as string[]) : [];
    } catch {
      return [];
    }
  });

  // Cart – persisted
  const [cart, setCart] = useState<CartItem[]>(() => {
    try {
      const saved = localStorage.getItem("cart");
      return saved ? (JSON.parse(saved) as CartItem[]) : [];
    } catch {
      return [];
    }
  });

  // User – persisted
  const [user, setUser] = useState<User | null>(() => {
    try {
      const saved = localStorage.getItem("user");
      return saved ? (JSON.parse(saved) as User) : null;
    } catch {
      return null;
    }
  });

  // UI state
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isAuthOpen, setIsAuthOpen] = useState(false);
  const [authMode, setAuthMode] = useState<AuthMode>("signin");
  const [searchQuery, setSearchQuery] = useState("");

  // ── Persistence effects ────────────────────────────────────────────────────
  useEffect(() => {
    localStorage.setItem("wishlist", JSON.stringify(wishlist));
  }, [wishlist]);

  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cart));
  }, [cart]);

  useEffect(() => {
    if (user) {
      localStorage.setItem("user", JSON.stringify(user));
    } else {
      localStorage.removeItem("user");
    }
  }, [user]);

  // ── Wishlist helpers ───────────────────────────────────────────────────────
  const toggleWishlist = (productId: string) => {
    setWishlist((prev) =>
      prev.includes(productId)
        ? prev.filter((id) => id !== productId)
        : [...prev, productId]
    );
  };

  // ── Cart helpers ───────────────────────────────────────────────────────────
  const addToCart = (product: Product) => {
    setCart((prev) => {
      const existing = prev.find((i) => i.product.id === product.id);
      if (existing) {
        return prev.map((i) =>
          i.product.id === product.id ? { ...i, quantity: i.quantity + 1 } : i
        );
      }
      return [...prev, { product, quantity: 1 }];
    });
  };

  const updateCartQty = (productId: string, qty: number) => {
    if (qty <= 0) {
      removeFromCart(productId);
      return;
    }
    setCart((prev) =>
      prev.map((i) => (i.product.id === productId ? { ...i, quantity: qty } : i))
    );
  };

  const removeFromCart = (productId: string) => {
    setCart((prev) => prev.filter((i) => i.product.id !== productId));
  };

  const clearCart = () => setCart([]);

  // ── Auth helpers ───────────────────────────────────────────────────────────
  const signIn = async (email: string) => {
    // Mock: create a guest user from the email
    const name = email.split("@")[0] ?? "User";
    setUser({ name, email });
    setIsAuthOpen(false);
  };

  const signUp = async (name: string, email: string) => {
    setUser({ name, email });
    setIsAuthOpen(false);
  };

  const signOut = () => {
    setUser(null);
  };

  // ── Context value ──────────────────────────────────────────────────────────
  const value: AppContextProps = {
    productsList,
    wishlist,
    toggleWishlist,
    cart,
    addToCart,
    updateCartQty,
    removeFromCart,
    clearCart,
    isCartOpen,
    setIsCartOpen,
    isAuthOpen,
    setIsAuthOpen,
    authMode,
    setAuthMode,
    user,
    signIn,
    signUp,
    signOut,
    searchQuery,
    setSearchQuery,
  };

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
}

// ─── Hooks ────────────────────────────────────────────────────────────────────

export function useAppContext(): AppContextProps {
  const ctx = useContext(AppContext);
  if (!ctx) throw new Error("useAppContext must be used within AppProvider");
  return ctx;
}

export const useApp = useAppContext;
