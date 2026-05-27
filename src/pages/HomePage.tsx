import { useState } from "react";
import { Link } from "react-router-dom";
import { Star, ArrowRight, Play, Heart, ShieldCheck } from "lucide-react";
import { Banner } from "../components/banner";
import Navbar from "../components/ui/navbar";
import ShopByCategory from "../components/ShopByCategory";

import { HeroCarousel } from "../components/hero-carousel";
import { QuickView } from "../components/quick-view";
import { PRODUCTS, type Product } from "../lib/products-data";
import { Footer } from "../components/footer";

export default function HomePage() {
  const [searchQuery, setSearchQuery] = useState("");
  const selectedCategory = "All";
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);

  const filteredProducts = PRODUCTS.filter((product) => {
    const matchesCategory = selectedCategory === "All" || product.category === selectedCategory;
    if (!searchQuery) return matchesCategory;
    const query = searchQuery.toLowerCase().trim();
    const matchesName = product.name.toLowerCase().includes(query);
    const matchesBot = product.botanicalName.toLowerCase().includes(query);
    const matchesCat = product.category.toLowerCase().includes(query);
    return matchesCategory && (matchesName || matchesBot || matchesCat);
  });

  // Generate categories for ShopByCategory component
  const categories = Array.from(new Set(PRODUCTS.map(p => p.category))).map(name => ({ name, image: "" }));


  // Filter specific product segments
  const mostLoved = PRODUCTS.filter((p) => p.productType === "Best Selling");
  const deals = PRODUCTS.filter((p) => p.productType === "deals");
  const trending = PRODUCTS.filter((p) => p.productType?.toLowerCase() === "trending");



  // Helper to render product card matching design
  const renderProductCard = (product: Product) => {
    const discount = product.originalPrice ? Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100) : 0;
    return (
      <div
        key={product.id}
        className="group relative bg-white border border-gray-100 rounded-2xl shadow-sm hover:shadow-xl hover:border-emerald-100 transition-all duration-300 flex flex-col justify-between overflow-hidden"
      >
        <div className="relative aspect-square bg-gray-50 flex items-center justify-center p-4">
          {discount > 0 && (
            <span className="absolute top-3 left-3 bg-red-500 text-white text-[10px] font-extrabold px-2 py-0.5 rounded-full z-10 shadow-sm">
              {discount}% OFF
            </span>
          )}
          <button className="absolute top-3 right-3 text-gray-300 hover:text-red-500 transition-colors z-10">
            <Heart className="w-5 h-5" />
          </button>
          <img
            src={product.imageUrl}
            alt={product.name}
            className="w-full h-full object-contain mix-blend-multiply group-hover:scale-105 transition-transform duration-500"
          />
        </div>

        <div className="p-4 flex-grow flex flex-col justify-between">
          <div>
            <div className="flex items-center gap-1 mb-1">
              <span className="text-[10px] bg-emerald-50 text-emerald-700 font-bold px-2 py-0.5 rounded">
                {product.category}
              </span>
              <div className="ml-auto flex items-center gap-0.5 text-[11px] text-amber-500 font-semibold">
                <Star className="w-3 h-3 fill-amber-400 text-amber-400" />
                <span>{product.rating}</span>
              </div>
            </div>
            <h4 className="font-semibold text-sm text-gray-800 line-clamp-2 hover:text-emerald-600 transition-colors cursor-pointer" onClick={() => setSelectedProduct(product)}>
              {product.name}
            </h4>
            <p className="text-[11px] text-gray-400 italic mt-0.5">{product.botanicalName}</p>
          </div>

          <div className="flex items-center justify-between mt-4 pt-3 border-t border-gray-50">
            <div className="flex items-baseline gap-1">
              <span className="text-base font-bold text-gray-900">₹{product.price}</span>
              {product.originalPrice && (
                <span className="text-xs text-gray-400 line-through">₹{product.originalPrice}</span>
              )}
            </div>
            <button
              onClick={() => setSelectedProduct(product)}
              className="px-3 py-1.5 bg-emerald-600 text-white font-bold rounded-lg text-xs hover:bg-emerald-700 transition-all active:scale-95 shadow-sm"
            >
              Add
            </button>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-white text-gray-900 flex flex-col selection:bg-emerald-100 selection:text-emerald-900">
      <Banner searchQuery={searchQuery} setSearchQuery={setSearchQuery} filteredProducts={filteredProducts} onProductClick={setSelectedProduct} />
      <Navbar user={null} onSignInClick={() => {}} onSignUpClick={() => {}} onSignOutClick={() => {}} />

      {searchQuery ? (
        <main className="flex-grow max-w-7xl mx-auto px-6 py-12">
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-6">
            {filteredProducts.map(renderProductCard)}
          </div>
        </main>
      ) : (
        <>
          <HeroCarousel />

          {/* 1. Our Most Loved Picks */}
          <section className="py-16 bg-white">
            <div className="max-w-7xl mx-auto px-6">
              <div className="text-center mb-10">
                <div className="flex items-center justify-center gap-1.5 text-emerald-600 font-extrabold text-sm uppercase tracking-widest">
                  <span className="h-0.5 w-6 bg-emerald-600"></span>
                  Bestsellers
                  <span className="h-0.5 w-6 bg-emerald-600"></span>
                </div>
                <h2 className="text-3xl font-extrabold text-gray-900 mt-2 flex items-center justify-center gap-2">
                  Our Most Loved Picks
                </h2>
                <p className="text-sm text-gray-500 mt-2">
                  Explore our carefully chosen customer favorite formulations
                </p>
              </div>

              <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-6">
                {mostLoved.slice(0, 10).map(renderProductCard)}
              </div>

              <div className="mt-12 text-center">
                <Link
                  to="/shop"
                  className="inline-flex items-center gap-2 px-8 py-3 bg-emerald-600 text-white font-bold rounded-full shadow-lg hover:bg-emerald-700 transition-all"
                >
                  View All Products <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            </div>
          </section>
                <ShopByCategory categories={categories} />

          {/* 3. Discover the Difference (Video Shorts Layout) */}
          <section className="py-16 bg-white">
            <div className="max-w-7xl mx-auto px-6">
              <div className="text-center mb-10">
                <h2 className="text-3xl font-extrabold text-gray-900">Discover the Difference</h2>
                <p className="text-sm text-gray-500 mt-2">See how our formulations change daily skin & wellness routines</p>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-6">
                {[
                  { title: "Hair Care Magic", views: "10k+", thumb: "https://images.unsplash.com/photo-1527799881356-9a794c14b3d2?auto=format&fit=crop&q=80&w=300" },
                  { title: "Daily Glow Routine", views: "8.5k+", thumb: "https://images.unsplash.com/photo-1556228720-195a672e8a03?auto=format&fit=crop&q=80&w=300" },
                  { title: "Natural Baby Bath", views: "12k+", thumb: "https://images.unsplash.com/photo-1519689680058-324335c77ebe?auto=format&fit=crop&q=80&w=300" },
                  { title: "Healthy Brew Guide", views: "6.2k+", thumb: "https://images.unsplash.com/photo-1576092768241-dec231879fc3?auto=format&fit=crop&q=80&w=300" },
                  { title: "Wellness Routine", views: "15k+", thumb: "https://images.unsplash.com/photo-1471864190281-a93a3070b6de?auto=format&fit=crop&q=80&w=300" },
                ].map((vid, idx) => (
                  <div key={idx} className="group relative rounded-2xl overflow-hidden shadow bg-gray-100 aspect-[9/16] cursor-pointer">
                    <img src={vid.thumb} alt={vid.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                    <div className="absolute inset-0 bg-black/40 flex flex-col justify-between p-4 text-white">
                      <div className="bg-black/35 backdrop-blur-sm self-start text-[10px] font-bold px-2 py-0.5 rounded-full">
                        {vid.views} Views
                      </div>
                      <div className="flex flex-col items-center gap-2">
                        <span className="w-12 h-12 rounded-full bg-red-600 flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform">
                          <Play className="w-5 h-5 text-white fill-white ml-0.5" />
                        </span>
                        <h4 className="text-xs font-bold text-center mt-1 line-clamp-1">{vid.title}</h4>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* 4. Customer Reviews & Testimonials */}
          <section className="py-16 bg-gray-50 border-t border-b border-gray-100">
            <div className="max-w-7xl mx-auto px-6">
              <div className="text-center mb-10">
                <h2 className="text-3xl font-extrabold text-gray-900">Customer Reviews & Testimonials</h2>
                <p className="text-sm text-gray-500 mt-2">Real testimonials from verified botanical enthusiasts</p>
              </div>

              {/* Google Ratings Header */}
              <div className="max-w-md mx-auto bg-white border border-gray-100 rounded-2xl shadow-sm p-6 text-center mb-12">
                <div className="flex items-center justify-center gap-1 text-amber-500 mb-2">
                  <span className="text-3xl font-black text-gray-900 mr-2">4.9</span>
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-6 h-6 fill-current text-amber-400" />
                  ))}
                </div>
                <p className="text-sm font-bold text-gray-700">426 Verified Customer Reviews</p>
                <button className="mt-4 px-6 py-2 bg-blue-600 text-white font-bold text-xs rounded-full hover:bg-blue-700 transition-colors shadow-sm">
                  Write a Review
                </button>
              </div>

              {/* Review Cards Grid */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {[
                  { name: "Anjana S.", date: "2 weeks ago", text: "I've been using their Multhani Metti Jar and Rose Water. It cleared my acne breakouts in just two weeks! Extremely premium quality." },
                  { name: "Rajesh Kumar", date: "1 month ago", text: "The Little Millet Vallarai Pongal mix is my go-to healthy breakfast. It is delicious, filling, and packs premium herbal ingredients." },
                  { name: "Kavitha M.", date: "3 weeks ago", text: "Hibiscus shampoo left my hair feeling soft and volumetric. You can definitely tell they use clean, organic herbal ingredients." }
                ].map((rev, idx) => (
                  <div key={idx} className="bg-white border border-gray-100 p-6 rounded-2xl shadow-sm flex flex-col justify-between">
                    <div>
                      <div className="flex gap-1 text-amber-400 mb-3">
                        {[...Array(5)].map((_, i) => (
                          <Star key={i} className="w-4 h-4 fill-current" />
                        ))}
                      </div>
                      <p className="text-sm text-gray-600 italic leading-relaxed">"{rev.text}"</p>
                    </div>
                    <div className="mt-4 pt-4 border-t border-gray-50 flex items-center justify-between text-xs">
                      <span className="font-bold text-gray-800">{rev.name}</span>
                      <span className="text-gray-400">{rev.date}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* 5. Handpicked Deals for You */}
          <section className="py-16 bg-white">
            <div className="max-w-7xl mx-auto px-6">
              <div className="text-center mb-10">
                <div className="inline-flex items-center gap-1 bg-red-50 text-red-700 font-extrabold text-xs px-3 py-1 rounded-full uppercase tracking-wider">
                  Handpicked Deals For You
                </div>
                <h2 className="text-3xl font-extrabold text-gray-900 mt-3">Special Discount Catalog</h2>
                <p className="text-sm text-gray-500 mt-2">Pristine native formulations at exclusive discounts</p>
              </div>

              <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-6">
                {deals.slice(0, 5).map(renderProductCard)}
              </div>
            </div>
          </section>

          {/* 6. Trending Products */}
          <section className="py-16 bg-gray-50 border-t border-b border-gray-100">
            <div className="max-w-7xl mx-auto px-6">
              <div className="text-center mb-10">
                <h2 className="text-3xl font-extrabold text-gray-900">Trending Products</h2>
                <p className="text-sm text-gray-500 mt-2">The fastest-selling herbal formulations flying off our shelves</p>
              </div>

              <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-6">
                {trending.slice(0, 5).map(renderProductCard)}
              </div>
            </div>
          </section>

          {/* 7. Side-by-side Promo Banners */}
          <section className="py-16 bg-white">
            <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-3 gap-6">
              {[
                { title: "Pure Soap Blend", desc: "100% Organic & Chemical Free", bg: "bg-emerald-950 text-white", img: "https://images.unsplash.com/photo-1607006342411-9a3363b6392c?auto=format&fit=crop&q=80&w=400" },
                { title: "Glowing Skin Combo", desc: "Best of Skin & Body Care", bg: "bg-amber-50 text-gray-900", img: "https://images.unsplash.com/photo-1556228720-195a672e8a03?auto=format&fit=crop&q=80&w=400" },
                { title: "Herbal Wellness Tea", desc: "Natural Organic Beverages", bg: "bg-stone-100 text-gray-900", img: "https://images.unsplash.com/photo-1576092768241-dec231879fc3?auto=format&fit=crop&q=80&w=400" },
              ].map((promo, idx) => (
                <div key={idx} className={`relative rounded-3xl overflow-hidden p-8 flex flex-col justify-between h-64 shadow-sm border border-gray-100 ${promo.bg}`}>
                  <img src={promo.img} className="absolute inset-0 w-full h-full object-cover opacity-15 mix-blend-multiply" alt="" />
                  <div className="relative z-10">
                    <h3 className="text-2xl font-bold">{promo.title}</h3>
                    <p className="text-xs opacity-85 mt-2">{promo.desc}</p>
                  </div>
                  <div className="relative z-10">
                    <Link to="/shop" className="inline-flex items-center gap-1.5 text-xs font-bold underline hover:opacity-85">
                      Shop Now <ArrowRight className="w-3.5 h-3.5" />
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* 8. Our Journey */}
          <section className="py-16 bg-emerald-950 text-white relative overflow-hidden">
            <div className="max-w-7xl mx-auto px-6 relative z-10">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                <div className="space-y-6">
                  <div className="inline-flex items-center gap-1.5 text-emerald-400 font-extrabold text-xs uppercase tracking-wider">
                    Our Journey
                  </div>
                  <h2 className="text-3xl md:text-4xl font-extrabold tracking-tight">
                    Sourcing Directly from Local Indian Farmers
                  </h2>
                  <p className="text-emerald-100/80 text-sm leading-relaxed">
                    Dharani Herbals is born from our passion to bridge pure traditional herbs to modern busy families. We work hand-in-hand with native farmers in Tamil Nadu to secure clean crops, free of preservatives and harmful processing agents.
                  </p>
                  <p className="text-emerald-100/80 text-sm leading-relaxed">
                    Every batch of powder, shampoo, or homogeneous mix is fully checked, preserving natural medicinal properties so you receive optimal wellness solutions.
                  </p>
                  <div>
                    <Link
                      to="/journey"
                      className="inline-flex items-center gap-2 px-6 py-3 bg-white text-emerald-950 font-bold rounded-xl hover:bg-emerald-50 transition-colors"
                    >
                      Read Full Story <ArrowRight className="w-4 h-4" />
                    </Link>
                  </div>
                </div>

                <div className="rounded-3xl overflow-hidden border border-white/10 shadow-xl">
                  <img
                    src="https://images.unsplash.com/photo-1542838132-92c53300491e?auto=format&fit=crop&q=80&w=800"
                    alt="Herb Harvest Group"
                    className="w-full h-80 object-cover"
                  />
                </div>
              </div>

              {/* Stats Bar */}
              <div className="mt-16 pt-12 border-t border-white/10 grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
                {[
                  { value: "10K+", label: "Happy Customers" },
                  { value: "50+", label: "Organic Crops" },
                  { value: "200+", label: "Remedies Offered" },
                  { value: "100%", label: "Preservative Free" },
                ].map((stat, idx) => (
                  <div key={idx}>
                    <div className="text-4xl font-black text-white">{stat.value}</div>
                    <div className="text-xs text-emerald-200/70 uppercase tracking-widest font-semibold mt-1">{stat.label}</div>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* 9. Verified Benefits Bar */}
          <section className="py-10 bg-gray-50 border-b border-gray-100">
            <div className="max-w-7xl mx-auto px-6 grid grid-cols-2 md:grid-cols-4 gap-6">
              {[
                { title: "Free Shipping", desc: "On orders above ₹1000" },
                { title: "Secure Checkout", desc: "100% Protected Payments" },
                { title: "Direct Farm Source", desc: "Supporting Local Growers" },
                { title: "100% Organic", desc: "Zero Preservatives Added" },
              ].map((ben, idx) => (
                <div key={idx} className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-emerald-50 flex items-center justify-center text-emerald-600 shrink-0">
                    <ShieldCheck className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="text-xs font-bold text-gray-800">{ben.title}</h4>
                    <p className="text-[10px] text-gray-400 mt-0.5">{ben.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* 10. Subscribe Form Banner */}
          <section className="py-16 bg-emerald-900 text-white">
            <div className="max-w-4xl mx-auto text-center px-6 space-y-6">
              <h2 className="text-2xl md:text-3xl font-extrabold uppercase tracking-wide">
                Stay Connected with Natural Wellness
              </h2>
              <p className="text-emerald-100/80 text-sm max-w-lg mx-auto">
                Join our premium botanical community. Recieve 10% off your initial purchase, organic recipes, and expert herb facts.
              </p>
              
              <div className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto pt-2">
                <input
                  type="email"
                  placeholder="Enter your email address"
                  className="w-full px-5 py-3 rounded-xl border-none bg-white text-gray-900 focus:outline-none text-sm placeholder-gray-400 shadow"
                />
                <button className="px-6 py-3 bg-emerald-600 text-white font-bold rounded-xl hover:bg-emerald-700 transition-all shadow shrink-0 text-sm">
                  Subscribe
                </button>
              </div>
            </div>
          </section>
        </>
      )}

      <QuickView product={selectedProduct} onClose={() => setSelectedProduct(null)} />
      <Footer />
    </div>
  );
}
