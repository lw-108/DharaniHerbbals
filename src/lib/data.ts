// Auto-generated module to expose product catalog
import productData from "./data.json";

export type Product = {
  id: string;
  name: string;
  category: string;
  brand: string;
  productType: string;
  imageUrl: string;
};

export const PRODUCTS: Product[] = (productData as any[]).map((p: any) => ({
  id: String(p.id),
  name: p.name || "",
  category: p.category || "",
  brand: p.brand || "",
  productType: p.productType || "",
  imageUrl: p.imageUrl || ""
}));

// Extract unique categories, brands, and product types for easy sorting
export const CATEGORIES: string[] = Array.from(new Set((productData as any[]).map((p) => p.category)));
export const BRANDS: string[] = Array.from(new Set((productData as any[]).map((p) => p.brand)));
export const PRODUCT_TYPES: string[] = Array.from(new Set((productData as any[]).map((p) => p.productType)));
