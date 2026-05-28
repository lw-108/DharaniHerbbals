import { Link } from "react-router-dom";

type Category = {
  name: string;
  image: string;
};

interface Props {
  categories: Category[];
}

function formatCategoryName(name: string): string {
  const n = name.toUpperCase();
  if (n === "HAIR") return "Hair Care";
  if (n === "SKIN") return "Skin Care";
  if (n === "BABY") return "Baby Care";
  if (n === "BEVERAGES") return "Organic Teas";
  if (n === "BODY") return "Body Care";
  if (n === "FOOD") return "Natural Food";
  if (n === "HEALTH & WELLNESS") return "Wellness Essentials";
  if (n === "POOJAS") return "Pooja Essentials";
  return name;
}

export default function ShopByCategory({ categories }: Props) {
  // Use unique categories only
  const uniqueCategories = Array.from(new Set(categories.map((c) => c.name.toUpperCase())))
    .map((name) => {
      const originalCat = categories.find((c) => c.name.toUpperCase() === name);
      return {
        name: originalCat?.name || name,
        image: "/placeholder.svg"
      };
    });

  return (
    <section className="py-16 bg-white relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-1">
        {/* Header Section */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center justify-center gap-2 mb-4">
            <span className="w-8 h-px bg-emerald-600"></span>
            <span className="text-emerald-700 font-semibold text-sm tracking-wide uppercase">Collections</span>
            <span className="w-8 h-px bg-emerald-600"></span>
          </div>
          <h2 className="text-3xl md:text-4xl font-extrabold text-gray-900 mb-3">
            Shop by <span className="text-emerald-700">Category</span>
          </h2>
          <p className="text-gray-500 max-w-md mx-auto">
            Discover targeted herbal benefits organized cleanly by categories
          </p>
        </div>

        {/* Fixed 4x4 Grid Layout */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-5 md:gap-6 lg:gap-7">
          {uniqueCategories.slice(0, 16).map((cat, idx) => (
            <Link
              key={`${cat.name}-${idx}`}
              to={`/shop?category=${encodeURIComponent(cat.name)}`}
              className="group relative flex flex-col items-center bg-white rounded-2xl p-4 sm:p-5 shadow-sm border border-gray-100 transition-all duration-300 hover:shadow-xl hover:shadow-emerald-100/40 hover:-translate-y-1"
            >
              {/* Image Circle Container */}
              <div className="relative">
                <div className="w-20 h-20 sm:w-24 sm:h-24 md:w-28 md:h-28 rounded-full bg-gray-50 flex items-center justify-center transition-all duration-300 group-hover:bg-emerald-50 p-2 sm:p-3">
                  <img
                    src={cat.image}
                    alt={cat.name}
                    className="w-full h-full rounded-full object-cover transition-transform duration-500 group-hover:scale-105"
                    draggable={false}
                    loading="lazy"
                  />
                </div>
                {/* Decorative ring on hover */}
                <div className="absolute inset-0 rounded-full border-2 border-emerald-400/0 group-hover:border-emerald-400/30 transition-all duration-300 scale-105"></div>
              </div>

              {/* Category Name */}
              <span className="text-xs sm:text-sm md:text-base font-bold text-gray-800 mt-3 sm:mt-5 mb-1 group-hover:text-emerald-700 transition-colors text-center">
                {formatCategoryName(cat.name)}
              </span>

              {/* Subtle divider + shop indicator */}
              <div className="w-6 sm:w-8 h-px bg-gray-200 group-hover:w-8 sm:group-hover:w-12 group-hover:bg-emerald-600 transition-all duration-300 mb-1 sm:mb-2"></div>
              <span className="text-[10px] sm:text-xs text-emerald-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                Shop Now →
              </span>
            </Link>
          ))}
        </div>

        {/* View All Button */}
        <div className="text-center mt-12">
          <Link
            to="/shop"
            className="inline-flex items-center gap-2 px-6 sm:px-8 py-2.5 sm:py-3 bg-emerald-600 text-white font-semibold rounded-full shadow-md hover:shadow-lg hover:shadow-emerald-200 hover:bg-emerald-700 transition-all duration-300 text-xs sm:text-sm tracking-wide"
          >
            Explore All Categories
            <svg className="w-3 h-3 sm:w-4 sm:h-4 group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </Link>
        </div>
      </div>
    </section>
  );
}