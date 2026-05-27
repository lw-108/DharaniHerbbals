import { Link } from "react-router-dom";

type Category = {
  name: string;
  image: string;
};

interface Props {
  categories: Category[];
}

const DEFAULT_IMAGES: Record<string, string> = {
  HAIR: "https://images.unsplash.com/photo-1527799881356-9a794c14b3d2?auto=format&fit=crop&q=80&w=300",
  SKIN: "https://images.unsplash.com/photo-1556228720-195a672e8a03?auto=format&fit=crop&q=80&w=300",
  BABY: "https://images.unsplash.com/photo-1519689680058-324335c77ebe?auto=format&fit=crop&q=80&w=300",
  BEVERAGES: "https://images.unsplash.com/photo-1576092768241-dec231879fc3?auto=format&fit=crop&q=80&w=300",
  BODY: "https://images.unsplash.com/photo-1607006342411-9a3363b6392c?auto=format&fit=crop&q=80&w=300",
  FOOD: "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?auto=format&fit=crop&q=80&w=300",
  "HEALTH & WELLNESS": "https://images.unsplash.com/photo-1471864190281-a93a3070b6de?auto=format&fit=crop&q=80&w=300",
  POOJAS: "https://images.unsplash.com/photo-1609137144814-7d2d3a3dcc4a?auto=format&fit=crop&q=80&w=300",
};

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
        image: originalCat?.image || DEFAULT_IMAGES[name] || "https://images.unsplash.com/photo-1546842931-886c185b4c8c?auto=format&fit=crop&q=80&w=300"
      };
    });

  // Triple the items to ensure the marquee exceeds viewport width and transitions seamlessly
  const marqueeItems = [...uniqueCategories, ...uniqueCategories, ...uniqueCategories];

  return (
    <section className="py-16 bg-emerald-50/30 border-t border-b border-emerald-100/50 relative overflow-hidden select-none">
      <div className="max-w-7xl mx-auto px-6 text-center">
        <h2 className="text-3xl font-extrabold text-gray-900 mb-2">Shop by Category</h2>
        <p className="text-sm text-gray-500 mb-12 max-w-xl mx-auto">
          Discover targeted herbal benefits organized cleanly by categories
        </p>
      </div>

      {/* Infinite slow marquee container */}
      <div className="w-full overflow-hidden py-2 relative">
        {/* Left and Right beautiful faded color overlays for premium look */}
        <div className="absolute left-0 top-0 bottom-0 w-16 md:w-32 bg-gradient-to-r from-white/90 to-transparent z-10 pointer-events-none" />
        <div className="absolute right-0 top-0 bottom-0 w-16 md:w-32 bg-gradient-to-l from-white/90 to-transparent z-10 pointer-events-none" />

        <div className="flex gap-10 md:gap-14 category-marquee w-max py-2">
          {marqueeItems.map((cat, idx) => (
            <Link
              key={`${cat.name}-${idx}`}
              to={`/shop?category=${encodeURIComponent(cat.name)}`}
              className="flex flex-col items-center group shrink-0 transition-transform duration-300 hover:scale-105"
            >
              <div className="w-24 h-24 md:w-28 md:h-28 rounded-full border-4 border-white shadow-md overflow-hidden bg-white group-hover:border-emerald-500 group-hover:shadow-xl transition-all duration-300">
                <img
                  src={cat.image}
                  alt={cat.name}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  draggable={false}
                />
              </div>
              <span className="text-[13px] md:text-sm font-bold text-gray-700 mt-4 group-hover:text-emerald-700 transition-colors uppercase tracking-wider">
                {formatCategoryName(cat.name)}
              </span>
            </Link>
          ))}
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 text-center mt-12">
        <Link
          to="/shop"
          className="inline-flex items-center gap-2 px-8 py-3 bg-emerald-600 text-white font-bold rounded-full shadow-lg hover:bg-emerald-700 hover:shadow-emerald-200 transition-all text-sm"
        >
          Explore All Categories
        </Link>
      </div>

      {/* Styled self-contained slow animation */}
      <style>{`
        .category-marquee {
          animation: category-scroll 45s linear infinite;
        }
        .category-marquee:hover {
          animation-play-state: paused;
        }
        @keyframes category-scroll {
          0% {
            transform: translateX(0);
          }
          100% {
            transform: translateX(-33.333%);
          }
        }
      `}</style>
    </section>
  );
}
