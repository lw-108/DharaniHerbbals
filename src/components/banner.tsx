import { useState, useRef, useEffect } from "react";
import { Phone, Mail, Search, Globe, X, ArrowRight, CornerDownLeft, AlertCircle } from "lucide-react";
import { type Product } from "@/lib/products-data";
import { useNavigate, useLocation } from "react-router-dom";

interface BannerProps {
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  filteredProducts: Product[];
  onProductClick: (product: Product) => void;
}

export function Banner({
  searchQuery,
  setSearchQuery,
  filteredProducts,
  onProductClick
}: BannerProps) {
  const [isFocused, setIsFocused] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();
  const location = useLocation();

  // Close dropdown when clicking outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
        setIsFocused(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleSearchChange = (val: string) => {
    setSearchQuery(val);
    setIsFocused(true);
    // Land on products page if on informational subpages
    if (location.pathname !== "/" && location.pathname !== "/shop") {
      navigate(`/shop?search=${encodeURIComponent(val)}`);
    }
  };

  const handleProductSelect = (product: Product) => {
    onProductClick(product);
    setIsFocused(false);
    // If not on a products page, navigate to shop showing that product
    if (location.pathname !== "/" && location.pathname !== "/shop") {
      navigate(`/shop?category=${encodeURIComponent(product.category)}`);
    }
  };

  return (
    <div className="w-full bg-[#1eab59] text-white text-xs py-2 px-4 md:px-8 flex flex-col xl:flex-row justify-between items-center gap-3 border-b border-emerald-600/10 shadow-sm relative z-50 transition-all duration-300">
      
      {/* Left section: Contacts */}
      <div className="flex flex-wrap justify-center xl:justify-start items-center gap-5 sm:gap-6 w-full xl:w-auto">
        {/* Phone number */}
        <a
          href="tel:+919788122001"
          className="flex items-center gap-2 group transition-all duration-200 hover:text-emerald-100 font-medium"
        >
          <Phone className="w-3.5 h-3.5 fill-none text-white transition-transform duration-300 group-hover:rotate-12" />
          <span className="tracking-wide text-[13px] font-sans font-medium">+91 97881 22001</span>
        </a>

        {/* Email */}
        <a
          href="mailto:info@dharaniherbbals.in"
          className="flex items-center gap-2 group transition-all duration-200 hover:text-emerald-100 font-medium"
        >
          <Mail className="w-3.5 h-3.5 text-white transition-transform duration-300 group-hover:scale-110" />
          <span className="tracking-wide text-[13px] font-sans font-medium">info@dharaniherbbals.in</span>
        </a>
      </div>

      {/* Right section: Search bar, social icons, and Tamil language */}
      <div className="flex flex-wrap justify-center xl:justify-end items-center gap-4 sm:gap-5 w-full xl:w-auto" ref={containerRef}>
        
        {/* 1. Pill Search Bar (exactly matches image design) */}
        <div className="relative">
          <div className={`flex items-center bg-white rounded-full pl-3 pr-1 py-1 text-black h-9 w-[280px] md:w-[320px] shadow-sm transition-all duration-300 ${
            isFocused ? "ring-2 ring-white/40 shadow" : "border border-emerald-600/10"
          }`}>
            <Search className="w-4 h-4 text-gray-400 mr-2 shrink-0" />
            
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => handleSearchChange(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  setIsFocused(false);
                  if (location.pathname !== "/" && location.pathname !== "/shop") {
                    navigate(`/shop?search=${encodeURIComponent(searchQuery)}`);
                  }
                }
              }}
              onFocus={() => setIsFocused(true)}
              placeholder="Search products..."
              className="w-full bg-transparent text-sm text-gray-800 placeholder:text-gray-400 focus:outline-none pr-7"
            />


            {searchQuery && (
              <button
                onClick={() => setSearchQuery("")}
                className="absolute right-12 p-0.5 rounded-full hover:bg-gray-100 text-gray-400 hover:text-gray-600 transition-colors cursor-pointer"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            )}

            <button 
              type="button" 
              className="bg-[#128a43] p-1.5 rounded-full text-white hover:bg-[#0e7036] transition-colors flex items-center justify-center shrink-0 cursor-pointer shadow-sm"
              title="Search button"
            >
              <Search className="w-3.5 h-3.5" />
            </button>
          </div>

          {/* Autocomplete Dropdown - floating directly under the search bar */}
          {isFocused && searchQuery && (
            <div className="absolute top-full right-0 mt-2 bg-white text-gray-800 border border-gray-100 rounded-2xl shadow-2xl z-50 overflow-hidden w-[300px] md:w-[360px] animate-in fade-in-50 slide-in-from-top-2 duration-200">
              <div className="p-3 bg-gray-50 border-b border-gray-100 flex justify-between items-center text-[10px] text-gray-500 font-bold uppercase tracking-wider">
                <span>Botanical Fuzzy Matches ({filteredProducts.length})</span>
                <span className="flex items-center gap-0.5 font-mono">
                  <CornerDownLeft className="w-2.5 h-2.5" /> preview
                </span>
              </div>

              <div className="max-h-[300px] overflow-y-auto divide-y divide-gray-100">
                {filteredProducts.length > 0 ? (
                  filteredProducts.slice(0, 5).map((product) => (
                    <div
                      key={product.id}
                      onClick={() => handleProductSelect(product)}
                      className="p-3 flex items-center justify-between hover:bg-emerald-50/40 cursor-pointer transition-colors group"
                    >
                      <div className="flex items-center gap-3">
                        <img
                          src={product.imageUrl}
                          alt={product.name}
                          className="w-10 h-10 rounded-lg object-cover border border-gray-100 group-hover:scale-105 transition-transform"
                        />
                        <div className="text-left">
                          <h4 className="font-bold text-xs text-gray-800 group-hover:text-[#1eab59] transition-colors line-clamp-1">
                            {product.name}
                          </h4>
                          <p className="text-[10px] text-gray-400 italic">
                            {product.botanicalName}
                          </p>
                        </div>
                      </div>

                      <div className="flex items-center gap-2 shrink-0">
                        <span className="text-xs font-bold text-gray-800">
                          ₹{product.price}
                        </span>
                        <ArrowRight className="w-3.5 h-3.5 text-gray-400 group-hover:text-[#1eab59] group-hover:translate-x-0.5 transition-all" />
                      </div>
                    </div>
                  ))
                ) : (
                  <div className="p-6 text-center flex flex-col items-center justify-center gap-1.5 text-gray-500">
                    <AlertCircle className="w-6 h-6 text-gray-300" />
                    <p className="text-xs font-bold text-gray-700">No matching remedies found</p>
                    <p className="text-[10px] text-gray-400">Try typing another botanical ingredient</p>
                  </div>
                )}
              </div>
            </div>
          )}
        </div>

        {/* 2. Social Media Icons (exactly matching layout with robust custom SVGs) */}
        <div className="flex items-center gap-4 text-white/90">
          {/* Facebook */}
          <a href="#" className="hover:text-emerald-100 transition-colors" aria-label="Facebook">
            <svg className="w-3.5 h-3.5 fill-current" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
            </svg>
          </a>
          {/* Instagram */}
          <a href="#" className="hover:text-emerald-100 transition-colors" aria-label="Instagram">
            <svg className="w-3.5 h-3.5" stroke="currentColor" strokeWidth="2.5" fill="none" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect>
              <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
              <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line>
            </svg>
          </a>
          {/* YouTube */}
          <a href="#" className="hover:text-emerald-100 transition-colors" aria-label="YouTube">
            <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path d="M23.498 6.163a3.003 3.003 0 0 0-2.11-2.108C19.524 3.545 12 3.545 12 3.545s-7.525 0-9.387.51a3.003 3.003 0 0 0-2.11 2.108C0 8.025 0 12 0 12s0 3.975.503 5.837a3.003 3.003 0 0 0 2.11 2.108c1.862.51 9.387.51 9.387.51s7.525 0 9.387-.51a3.003 3.003 0 0 0 2.11-2.108C24 15.975 24 12 24 12s0-3.975-.502-5.837zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
            </svg>
          </a>
          {/* Twitter */}
          <a href="#" className="hover:text-emerald-100 transition-colors" aria-label="Twitter">
            <svg className="w-3.5 h-3.5 fill-current" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z"/>
            </svg>
          </a>
        </div>

        {/* Divider */}
        <span className="hidden sm:inline w-[1px] h-4.5 bg-white/20"></span>

        {/* 3. Tamil Language Selector */}
        <div className="flex items-center gap-1.5 text-white font-medium cursor-pointer hover:text-emerald-100 transition-colors">
          <Globe className="w-4 h-4 text-white" />
          <span className="text-[13px] tracking-wide font-sans font-medium">தமிழ்</span>
        </div>
      </div>
    </div>
  );
}
