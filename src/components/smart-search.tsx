import { Sparkles, RefreshCw, X } from "lucide-react";
import { CATEGORIES } from "@/lib/products-data";

interface SmartSearchProps {
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  selectedCategory: string;
  setSelectedCategory: (category: string) => void;
}

const POPULAR_SEARCHES = [
  { label: "Acne Control", query: "Neem" },
  { label: "Stress Relief", query: "Ashwagandha" },
  { label: "Hair Fall Oil", query: "Bhringraj" },
  { label: "Detox Tea", query: "Hibiscus" },
  { label: "Natural Hydrator", query: "Aloe" }
];

export function SmartSearch({
  searchQuery,
  setSearchQuery,
  selectedCategory,
  setSelectedCategory
}: SmartSearchProps) {
  
  const handlePopularSearch = (query: string) => {
    setSearchQuery(query);
    setSelectedCategory("All"); // Reset category to show matching results
  };

  const handleClearAll = () => {
    setSearchQuery("");
    setSelectedCategory("All");
  };

  return (
    <div className="w-full max-w-5xl mx-auto px-4 pt-8 pb-4">
      {/* Category Pills Navigation with high fidelity styles */}
      <div className="flex flex-col items-center justify-center gap-4 border-b border-gray-100 pb-6 mb-6 dark:border-zinc-800/60">
        <div className="flex flex-wrap items-center justify-center gap-2 md:gap-3">
          {CATEGORIES.map((category) => {
            const isActive = selectedCategory === category;
            return (
              <button
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={`px-4.5 py-2 rounded-full text-xs font-bold border transition-all duration-300 cursor-pointer ${
                  isActive
                    ? "bg-[#1eab59] border-[#1eab59] text-white shadow-md shadow-emerald-500/20 scale-105"
                    : "bg-white dark:bg-zinc-900 border-gray-200 dark:border-zinc-800 hover:border-gray-300 dark:hover:border-zinc-700 text-gray-700 dark:text-zinc-300"
                }`}
              >
                {category}
              </button>
            );
          })}
        </div>
      </div>

      {/* Active Search & Suggestions Bar */}
      <div className="flex flex-col md:flex-row justify-between items-center gap-4 text-xs">
        {/* Popular Botanical Targets */}
        <div className="flex flex-wrap items-center gap-2 justify-center md:justify-start">
          <span className="text-gray-400 font-semibold uppercase tracking-wider text-[10px]">
            Quick Remedies:
          </span>
          {POPULAR_SEARCHES.map((item) => (
            <button
              key={item.label}
              onClick={() => handlePopularSearch(item.query)}
              className="inline-flex items-center gap-1 bg-gray-50 hover:bg-gray-100 dark:bg-zinc-800/40 dark:hover:bg-zinc-800 text-gray-600 dark:text-zinc-300 px-3 py-1.5 rounded-full border border-gray-200/60 dark:border-zinc-800/80 transition-all cursor-pointer font-medium hover:text-[#1eab59]"
            >
              <Sparkles className="w-3 h-3 text-[#1eab59]" />
              {item.label}
            </button>
          ))}
        </div>

        {/* Active Search Filter Badge */}
        {(searchQuery || selectedCategory !== "All") && (
          <div className="flex items-center gap-2 animate-in fade-in slide-in-from-right-3 duration-250 shrink-0">
            <span className="text-[10px] text-gray-400 font-bold uppercase tracking-wider">
              Active:
            </span>
            <div className="inline-flex items-center gap-1.5 bg-emerald-50 dark:bg-emerald-950/20 text-[#1eab59] border border-emerald-200/50 dark:border-emerald-900/40 px-3 py-1 rounded-full font-bold">
              <span>
                {selectedCategory !== "All" ? selectedCategory : ""}
                {searchQuery ? ` "${searchQuery}"` : ""}
              </span>
              <button
                onClick={handleClearAll}
                className="hover:bg-emerald-100 dark:hover:bg-emerald-950/40 p-0.5 rounded-full cursor-pointer transition-colors"
                title="Clear current filter"
              >
                <X className="w-3 h-3" />
              </button>
            </div>
            
            <button
              onClick={handleClearAll}
              className="text-gray-400 hover:text-gray-600 flex items-center gap-1 cursor-pointer font-bold hover:underline"
            >
              <RefreshCw className="w-3 h-3" /> Reset
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
