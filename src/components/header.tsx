import { Heart, ShoppingCart, User } from "lucide-react";

interface HeaderProps {
  selectedCategory: string;
  setSelectedCategory: (category: string) => void;
  onScrollToSection: (sectionId: string) => void;
}

export function Header({
  selectedCategory,
  setSelectedCategory,
  onScrollToSection
}: HeaderProps) {
  // Navigation Menu mapping
  const menuItems = [
    { label: "Home", category: "All", type: "category" },
    { label: "Hair", category: "Hair Care", type: "category" },
    { label: "Skin", category: "Skin Care", type: "category" },
    { label: "Baby", category: "Baby Care", type: "category" },
    { label: "Health & Wellness", category: "Wellness", type: "category" },
    { label: "Shop All", category: "All", type: "category" },
    { label: "About Us", target: "benefits", type: "scroll" },
    { label: "Contact", target: "footer", type: "scroll" }
  ];

  return (
    <header className="w-full bg-white text-gray-800 border-b border-gray-100 py-3.5 px-4 md:px-8 flex justify-between items-center sticky top-0 z-40 shadow-sm transition-colors duration-300">
      
      {/* 1. Dharani Herbbals Serif Brand Logo with custom leaf SVG */}
      <a href="#" className="flex items-center gap-2.5 group shrink-0">
        {/* Customized exact match leaf emblem SVG */}
        <img src="/favicon.png" alt="" className="w-[50px] h-[50px] rounded-lg" />
          {/* Main green teardrop/shield shield backing */}
        <div className="flex flex-col">
          <span className="font-serif text-[21px] font-medium leading-[1.1] tracking-wide text-gray-800 flex items-start">
            Dharani
            <span className="text-[7px] font-sans font-bold align-super ml-0.5 mt-0.5 text-gray-500">®</span>
          </span>
          <span className="font-serif text-[21px] font-bold leading-[0.9] tracking-wider text-gray-900 mt-0.5">
            Herbbals
          </span>
        </div>
      </a>

      {/* 2. Menu Links List (exactly styled as in reference image) */}
      <nav className="hidden lg:flex items-center gap-6 xl:gap-8 text-[15px] font-medium text-gray-700">
        {menuItems.map((item, idx) => {
          const isCategoryType = item.type === "category";
          const isActive = isCategoryType && selectedCategory === item.category && (item.label !== "Home" || selectedCategory === "All");

          return (
            <button
              key={idx}
              onClick={() => {
                if (isCategoryType && item.category) {
                  setSelectedCategory(item.category);
                  onScrollToSection("catalog");
                } else if (item.target) {
                  onScrollToSection(item.target);
                }
              }}
              className={`hover:text-[#1eab59] transition-all duration-200 cursor-pointer font-medium py-1 relative ${
                isActive 
                  ? "text-[#1eab59] font-bold after:absolute after:bottom-0 after:left-0 after:right-0 after:h-[2px] after:bg-[#1eab59] after:rounded-full" 
                  : "text-gray-700"
              }`}
            >
              {item.label}
            </button>
          );
        })}
      </nav>

      {/* 3. Action Buttons on Far Right */}
      <div className="flex items-center gap-5 md:gap-6 text-gray-700">
        {/* Wishlist */}
        <button 
          className="hover:text-[#1eab59] transition-colors relative cursor-pointer" 
          title="Wishlist"
        >
          <Heart className="w-5 h-5 stroke-[1.8]" />
        </button>

        {/* Shopping Cart */}
        <button 
          className="hover:text-[#1eab59] transition-colors relative cursor-pointer" 
          title="Shopping Cart"
        >
          <ShoppingCart className="w-5 h-5 stroke-[1.8]" />
        </button>

        {/* User Account */}
        <button 
          className="hover:text-[#1eab59] transition-colors cursor-pointer" 
          title="Account"
        >
          <User className="w-5 h-5 stroke-[1.8]" />
        </button>
      </div>

    </header>
  );
}
