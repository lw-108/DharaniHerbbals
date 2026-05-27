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
        <svg 
          viewBox="0 0 100 100" 
          className="w-[42px] h-[42px] transform transition-transform duration-300 group-hover:scale-105"
          fill="none" 
          xmlns="http://www.w3.org/2000/svg"
        >
          {/* Main green teardrop/shield shield backing */}
          <path 
            d="M50 90C72.0914 90 90 72.0914 90 50C90 12 50 10 50 10C50 10 10 12 10 50C10 72.0914 27.9086 90 50 90Z" 
            fill="#7cb43d" 
          />
          {/* Darker green leaf partition */}
          <path 
            d="M50 10C50 10 10 12 10 50C10 68.3 22.3 83.7 39 88.5C39 88.5 50 60 50 10Z" 
            fill="#569a30" 
          />
          {/* Top Leaf White outline vein */}
          <path 
            d="M32 30C45 32 58 45 62 60M32 30C28 42 35 55 45 68" 
            stroke="white" 
            strokeWidth="3.5" 
            strokeLinecap="round" 
            strokeLinejoin="round" 
          />
          {/* Bottom Leaf White outline vein */}
          <path 
            d="M48 40C58 42 68 53 72 66M48 40C44 50 49 61 57 72" 
            stroke="white" 
            strokeWidth="3.5" 
            strokeLinecap="round" 
            strokeLinejoin="round" 
          />
        </svg>

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
