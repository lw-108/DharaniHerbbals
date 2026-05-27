import { useProductFilter, ProductFilterProvider } from "@/lib/product-filter-context";
import { PRODUCTS } from "@/lib/products-data";
import { TooltipProvider } from "@/components/ui/tooltip";
import { SidebarProvider, SidebarInset } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/app-sidebar";
import { AppHeader } from "@/components/app-header";

function AppContent({ children }: { children?: React.ReactNode }) {
  const { category, brand, productType, sort } = useProductFilter();
  const filteredProducts = PRODUCTS.filter((product) => {
    if (category !== "All" && product.category !== category) return false;
    if (brand !== "All Brands" && product.brand !== brand) return false;
    if (productType !== "All Types" && product.productType !== productType) return false;
    return true;
  });
  const sortedProducts = filteredProducts.sort((a, b) => {
    if (sort === "price-asc") return a.price - b.price;
    if (sort === "price-desc") return b.price - a.price;
    if (sort === "rating-desc") return b.rating - a.rating;
    return 0;
  });

  return (
    <div className="flex flex-1 flex-col gap-4">
      <div className="flex flex-1 flex-col gap-4">
        {children ? (
          children
        ) : (
          <section className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-6">
            {sortedProducts.map((product) => (
              <div key={product.id} className="group relative bg-white border border-gray-100 rounded-2xl shadow-sm hover:shadow-xl hover:border-emerald-100 transition-all duration-300 flex flex-col justify-between overflow-hidden">
                <div className="relative aspect-square bg-gray-50 flex items-center justify-center p-4">
                  <img src={product.imageUrl || "https://via.placeholder.com/150"} alt={product.name} className="w-full h-full object-contain mix-blend-multiply group-hover:scale-105 transition-transform duration-500" />
                </div>
                <div className="p-4 flex-grow flex flex-col justify-between">
                  <div>
                    <h4 className="font-semibold text-sm text-gray-800 line-clamp-2">{product.name}</h4>
                    <p className="text-[11px] text-gray-400 italic mt-0.5">{product.category}</p>
                  </div>
                  <div className="flex items-center justify-between mt-4 pt-3 border-t border-gray-50">
                    <span className="text-base font-bold text-gray-900">₹{product.price}</span>
                  </div>
                </div>
              </div>
            ))}
          </section>
        )}
      </div>
    </div>
  );
}

export function AppShell({ children }: { children?: React.ReactNode }) {
  const isSignedIn = true; // Placeholder: replace with real auth logic

  return (
    <TooltipProvider>
      <ProductFilterProvider>
        <SidebarProvider>
          <AppSidebar />
          <SidebarInset className="p-4 md:p-6">
            <AppHeader showUserAvatar={isSignedIn} />
            <AppContent>{children}</AppContent>
          </SidebarInset>
        </SidebarProvider>
      </ProductFilterProvider>
    </TooltipProvider>
  );
}



