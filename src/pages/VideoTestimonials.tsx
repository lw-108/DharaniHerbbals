import { useState, useRef } from "react";
import { ArrowLeft, ArrowRight, Star, Eye, User, Clock, Leaf, Play } from "lucide-react";
import { Banner } from "@/components/banner";
import Navbar from "@/components/ui/navbar";
import { Footer } from "@/components/footer";
import { PRODUCTS, type Product } from "@/lib/products-data";
import { QuickView } from "@/components/quick-view";

const videos = [
  {
    id: 1,
    title: "Pure Vilvam Sherbet Recipe",
    desc: "See how we slow-extract pristine Vilvam fruit to create the ultimate cooling summer elixir.",
    youtubeUrl: "https://www.youtube.com/embed/z8b8mJdK4gA",
    duration: "0:58",
    rating: 4.9,
    author: "Dr. Anjana S.",
    views: "12K views",
    thumb: "https://images.unsplash.com/photo-1544787219-7f47ccb76574?auto=format&fit=crop&q=80&w=300"
  },
  {
    id: 2,
    title: "Hibiscus Shampoo Routine",
    desc: "Unlock thick, volumetric hair growth using pure cold-processed hibiscus flower extract.",
    youtubeUrl: "https://www.youtube.com/embed/A67ZkAd1dQY",
    duration: "1:15",
    rating: 4.8,
    author: "Rohan K.",
    views: "8.5K views",
    thumb: "https://images.unsplash.com/photo-1527799881356-9a794c14b3d2?auto=format&fit=crop&q=80&w=300"
  },
  {
    id: 3,
    title: "Arappu Hair Wash Demo",
    desc: "Step-by-step tutorial on applying Arappu powder for pristine scalp conditioning.",
    youtubeUrl: "https://www.youtube.com/embed/5qy-E2n8oYk",
    duration: "1:02",
    rating: 5.0,
    author: "Kavitha M.",
    views: "10.2K views",
    thumb: "https://images.unsplash.com/photo-1535585209827-a15fcdbc4c2d?auto=format&fit=crop&q=80&w=300"
  },
  {
    id: 4,
    title: "Aavaram Flower Tea Brew",
    desc: "Watch the premium gold color extract as we steep hand-picked aavaram flowers.",
    youtubeUrl: "https://www.youtube.com/embed/8D4XF3NqT8Y",
    duration: "0:45",
    rating: 4.7,
    author: "Chef Rajesh",
    views: "6.4K views",
    thumb: "https://images.unsplash.com/photo-1597481499750-3e6b22637e12?auto=format&fit=crop&q=80&w=300"
  },
  {
    id: 5,
    title: "Rice Kanji Hair Therapy",
    desc: "The ancient South-Indian secret to silky, strong hair root reinforcement.",
    youtubeUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ",
    duration: "1:30",
    rating: 4.9,
    author: "Priya Sundar",
    views: "15.1K views",
    thumb: "https://images.unsplash.com/photo-1608248597279-f99d160bfcbc?auto=format&fit=crop&q=80&w=300"
  }
];

export default function VideoTestimonials() {
  const [searchQuery, setSearchQuery] = useState("");
  const [activeIdx, setActiveIdx] = useState(0);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  
  const playlistRef = useRef<HTMLDivElement>(null);

  const activeVideo = videos[activeIdx];

  // Try to find matching product in the catalog dynamically
  const featuredProduct = PRODUCTS.find((p) => {
    const titleLower = activeVideo.title.toLowerCase();
    const pNameLower = p.name.toLowerCase();
    return pNameLower.includes(titleLower) || titleLower.includes(pNameLower) || 
           (titleLower.includes("vilvam") && pNameLower.includes("vilvam")) ||
           (titleLower.includes("hibiscus") && pNameLower.includes("hibiscus")) ||
           (titleLower.includes("arappu") && pNameLower.includes("arappu")) ||
           (titleLower.includes("aavaram") && pNameLower.includes("aavaram")) ||
           (titleLower.includes("rice kanji") && pNameLower.includes("rice"));
  });

  const scrollPlaylist = (direction: "left" | "right") => {
    if (playlistRef.current) {
      const scrollAmt = 240;
      playlistRef.current.scrollBy({
        left: direction === "left" ? -scrollAmt : scrollAmt,
        behavior: "smooth"
      });
    }
  };

  // Filter products for Banner
  const filteredProducts = PRODUCTS.filter((p) => {
    if (!searchQuery) return true;
    const query = searchQuery.toLowerCase().trim();
    return p.name.toLowerCase().includes(query) || p.category.toLowerCase().includes(query);
  });

  return (
    <div className="min-h-screen bg-slate-50 text-gray-900 flex flex-col selection:bg-emerald-100 selection:text-emerald-955">
      <Banner
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        filteredProducts={filteredProducts}
        onProductClick={setSelectedProduct}
      />
      <Navbar user={null} onSignInClick={() => {}} onSignUpClick={() => {}} onSignOutClick={() => {}} />

      {/* Widescreen Theater Experience */}
      <main className="flex-grow max-w-7xl w-full mx-auto px-4 md:px-8 py-10">
        
        {/* Header Hero */}
        <div className="text-center mb-10">
          <div className="inline-flex items-center gap-1.5 bg-emerald-50 text-emerald-700 font-extrabold text-xs px-3 py-1 rounded-full uppercase tracking-wider mb-3">
            <Leaf className="w-3.5 h-3.5 fill-emerald-100" />
            Discover the Difference
          </div>
          <h1 className="text-3xl md:text-4xl font-extrabold text-gray-900">
            Video Testimonials
          </h1>
          <p className="text-sm text-gray-500 mt-2 max-w-md mx-auto">
            See verified organic remedies and wellness formulations in action, straight from our community.
          </p>
        </div>

        {/* Theater Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-stretch mb-12">
          
          {/* Left / Center Player (2/3 span) */}
          <div className="lg:col-span-2 bg-black rounded-3xl overflow-hidden shadow-2xl relative border border-gray-100 flex flex-col justify-between aspect-[16/9]">
            <iframe
              key={activeVideo.id}
              src={activeVideo.youtubeUrl}
              title={activeVideo.title}
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; picture-in-picture"
              allowFullScreen
              className="w-full h-full object-cover"
            />
          </div>

          {/* Right Side Video Detail Card (1/3 span) */}
          <div className="bg-white border border-gray-100 rounded-3xl shadow-xl p-6 flex flex-col justify-between">
            <div className="space-y-5 flex flex-col">
              
              {/* Creator Meta */}
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="w-9 h-9 rounded-full bg-emerald-50 text-emerald-700 font-bold text-xs flex items-center justify-center border border-emerald-100">
                    <User className="w-4 h-4" />
                  </div>
                  <div>
                    <h4 className="text-xs font-extrabold text-gray-900">{activeVideo.author}</h4>
                    <p className="text-[10px] text-gray-400">Verified Botanist</p>
                  </div>
                </div>
                <div className="flex items-center gap-0.5 text-amber-500 font-extrabold text-xs bg-amber-50 px-2 py-0.5 rounded animate-pulse">
                  <Star className="w-3 h-3 fill-amber-400 text-amber-400" />
                  <span>{activeVideo.rating}</span>
                </div>
              </div>

              {/* Title & Info */}
              <div className="space-y-2">
                <h2 className="text-lg font-black text-gray-900 leading-tight">
                  {activeVideo.title}
                </h2>
                <div className="flex items-center gap-3 text-[11px] text-gray-400 font-semibold">
                  <span className="flex items-center gap-1">
                    <Clock className="w-3 h-3 text-gray-300" /> {activeVideo.duration}
                  </span>
                  <span>•</span>
                  <span>{activeVideo.views}</span>
                </div>
                <p className="text-xs text-gray-600 leading-relaxed pt-1">
                  {activeVideo.desc}
                </p>
              </div>

              {/* Verified Badge */}
              <div className="bg-emerald-50/50 rounded-xl p-3 border border-emerald-100/30 flex items-start gap-2.5 mt-auto">
                <Leaf className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                <div className="text-[11px] text-emerald-800 leading-relaxed font-medium">
                  Verified organic recipe. Free of parabens, chemical dyes, and artificial processing agents.
                </div>
              </div>
            </div>

            {/* Featured Product Shop Button */}
            {featuredProduct && (
              <div className="mt-6 pt-6 border-t border-gray-100 flex items-center gap-3">
                <div className="w-12 h-12 bg-gray-50 border border-gray-100 rounded-xl p-1 shrink-0 flex items-center justify-center">
                  <img
                    src={featuredProduct.imageUrl}
                    alt={featuredProduct.name}
                    className="w-full h-full object-contain mix-blend-multiply"
                  />
                </div>
                <div className="flex-grow min-w-0">
                  <h4 className="text-xs font-bold text-gray-900 truncate">{featuredProduct.name}</h4>
                  <p className="text-[11px] text-emerald-600 font-black">₹{featuredProduct.price}</p>
                </div>
                <button
                  onClick={() => setSelectedProduct(featuredProduct)}
                  className="px-3 py-2 bg-emerald-600 text-white font-bold text-xs rounded-xl hover:bg-emerald-700 active:scale-95 shadow transition-all shrink-0 flex items-center gap-1"
                >
                  <Eye className="w-3.5 h-3.5" />
                  View
                </button>
              </div>
            )}
          </div>
        </div>

        {/* Sync Carousel Playlist Grid Header */}
        <div className="flex items-center justify-between mb-5">
          <div>
            <h3 className="font-extrabold text-sm text-gray-900 uppercase tracking-widest">
              More Calming Remedies
            </h3>
            <p className="text-xs text-gray-400 mt-0.5">Click to switch current theater playback</p>
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={() => scrollPlaylist("left")}
              className="w-8 h-8 rounded-full border border-gray-200 bg-white shadow-sm flex items-center justify-center hover:bg-gray-50 active:scale-90 transition-all cursor-pointer"
            >
              <ArrowLeft className="w-4 h-4 text-gray-600" />
            </button>
            <button
              onClick={() => scrollPlaylist("right")}
              className="w-8 h-8 rounded-full border border-gray-200 bg-white shadow-sm flex items-center justify-center hover:bg-gray-50 active:scale-90 transition-all cursor-pointer"
            >
              <ArrowRight className="w-4 h-4 text-gray-600" />
            </button>
          </div>
        </div>

        {/* Synced Playlist Carousel Row */}
        <div
          ref={playlistRef}
          className="flex gap-4 overflow-x-auto pb-4 scroll-smooth scrollbar-none snap-x snap-mandatory"
        >
          {videos.map((vid, idx) => {
            const isActive = idx === activeIdx;
            return (
              <div
                key={vid.id}
                onClick={() => setActiveIdx(idx)}
                className={`snap-start shrink-0 w-60 bg-white rounded-2xl overflow-hidden cursor-pointer shadow-sm border transition-all duration-300 ${
                  isActive
                    ? "border-emerald-500 ring-2 ring-emerald-500/20 scale-[0.98] shadow-md"
                    : "border-gray-100 hover:border-gray-300 hover:shadow-md"
                }`}
              >
                {/* Thumbnail Layer */}
                <div className="relative aspect-[16/10] bg-gray-100 flex items-center justify-center overflow-hidden">
                  <img
                    src="/placeholder.svg"
                    alt={vid.title}
                    className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-black/35 flex items-center justify-center">
                    <span className="w-10 h-10 rounded-full bg-white/90 shadow-lg flex items-center justify-center transform transition-transform hover:scale-110">
                      <Play className="w-4.5 h-4.5 text-emerald-700 fill-emerald-700 ml-0.5" />
                    </span>
                  </div>
                  <div className="absolute bottom-2 right-2 bg-black/60 backdrop-blur-sm text-[10px] font-bold text-white px-2 py-0.5 rounded">
                    {vid.duration}
                  </div>
                </div>

                {/* Info block */}
                <div className="p-3">
                  <h4 className={`text-xs font-extrabold line-clamp-1 transition-colors ${
                    isActive ? "text-emerald-700" : "text-gray-800"
                  }`}>
                    {vid.title}
                  </h4>
                  <div className="flex items-center justify-between mt-2 text-[10px] text-gray-400 font-semibold">
                    <span>{vid.author}</span>
                    <span className="flex items-center gap-0.5 text-amber-500">
                      <Star className="w-2.5 h-2.5 fill-current" /> {vid.rating}
                    </span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

      </main>

      <QuickView product={selectedProduct} onClose={() => setSelectedProduct(null)} />
      <Footer />
    </div>
  );
}
