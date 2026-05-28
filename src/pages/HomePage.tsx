import { useState } from "react";
import { Link } from "react-router-dom";
import { Star, ArrowRight, Play, Heart, ShieldCheck, Leaf, Award, Truck, Users, Droplet, Sparkles, Zap } from "lucide-react";
import { Banner } from "../components/banner";
import Navbar from "../components/ui/navbar";
import ShopByCategory from "../components/ShopByCategory";

import { HeroCarousel } from "../components/hero-carousel";
import { QuickView } from "../components/quick-view";
import { PRODUCTS, type Product } from "../lib/products-data";
import { Footer } from "../components/footer";
import { useApp } from "@/lib/app-context";

export default function HomePage() {
  const { searchQuery, setSearchQuery, addToCart, toggleWishlist, wishlist } = useApp();
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
    const isWishlisted = wishlist.includes(product.id);
    return (
      <div
        key={product.id}
        className="group relative bg-white border border-gray-100 rounded-2xl shadow-sm hover:shadow-xl hover:border-emerald-200 transition-all duration-300 flex flex-col justify-between overflow-hidden"
      >
        <div className="relative aspect-square bg-gradient-to-br from-gray-50 to-white flex items-center justify-center p-4">
          {discount > 0 && (
            <span className="absolute top-3 left-3 bg-emerald-600 text-white text-[10px] font-extrabold px-2 py-0.5 rounded-full z-10 shadow-sm">
              {discount}% OFF
            </span>
          )}
          <button
            onClick={() => toggleWishlist(product.id)}
            className={`absolute top-3 right-3 transition-colors z-10 cursor-pointer p-1.5 rounded-full bg-white shadow-sm hover:shadow ${
              isWishlisted ? "text-red-500" : "text-gray-400 hover:text-red-500"
            }`}
            title="Toggle Wishlist"
          >
            <Heart className={`w-3.5 h-3.5 ${isWishlisted ? "fill-current" : ""}`} />
          </button>
          <img
            src={product.imageUrl}
            alt={product.name}
            className="w-full h-full object-contain group-hover:scale-105 transition-transform duration-500"
          />
        </div>

        <div className="p-4 flex-grow flex flex-col justify-between">
          <div>
            <div className="flex items-center gap-1 mb-1.5">
              <span className="text-[10px] bg-emerald-50 text-emerald-700 font-semibold px-2 py-0.5 rounded">
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
            <p className="text-[10px] text-gray-400 mt-0.5">{product.botanicalName}</p>
          </div>

          <div className="flex items-center justify-between mt-4 pt-3 border-t border-gray-50">
            <div className="flex items-baseline gap-1.5">
              <span className="text-base font-bold text-gray-900">₹{product.price}</span>
              {product.originalPrice && (
                <span className="text-xs text-gray-400 line-through">₹{product.originalPrice}</span>
              )}
            </div>
            <button
              onClick={() => addToCart(product)}
              className="px-3 py-1.5 bg-emerald-600 text-white font-semibold rounded-lg text-xs hover:bg-emerald-700 transition-all active:scale-95 shadow-sm"
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
          <section className="py-20 bg-white">
            <div className="max-w-7xl mx-auto px-6">
              <div className="text-center mb-12">
                <div className="inline-flex items-center gap-2 mb-4">
                  <Leaf className="w-5 h-5 text-emerald-600" />
                  <span className="text-emerald-700 font-semibold text-sm tracking-wide uppercase">Bestsellers</span>
                  <Leaf className="w-5 h-5 text-emerald-600" />
                </div>
                <h2 className="text-3xl md:text-4xl font-extrabold text-gray-900 mb-3">
                  Our Most Loved Picks
                </h2>
                <p className="text-gray-500 max-w-md mx-auto">
                  Explore our carefully chosen customer favorite formulations
                </p>
              </div>

              <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-6">
                {mostLoved.slice(0, 10).map(renderProductCard)}
              </div>

              <div className="mt-12 text-center">
                <Link
                  to="/shop"
                  className="inline-flex items-center gap-2 px-8 py-3 bg-emerald-600 text-white font-semibold rounded-full shadow-md hover:shadow-lg hover:shadow-emerald-200 hover:bg-emerald-700 transition-all duration-300 text-sm"
                >
                  View All Products <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            </div>
          </section>

          {/* 2. Shop by Category */}
          <ShopByCategory categories={categories} />

          {/* 3. Discover the Difference */}
          <section className="py-20 bg-white">
            <div className="max-w-7xl mx-auto px-6">
              <div className="text-center mb-12">
                <div className="inline-flex items-center gap-2 mb-4">
                  <Sparkles className="w-5 h-5 text-emerald-600" />
                  <span className="text-emerald-700 font-semibold text-sm tracking-wide uppercase">Wellness Stories</span>
                  <Sparkles className="w-5 h-5 text-emerald-600" />
                </div>
                <h2 className="text-3xl md:text-4xl font-extrabold text-gray-900 mb-3">
                  Discover the Difference
                </h2>
                <p className="text-gray-500 max-w-md mx-auto">
                  See how our formulations change daily skin & wellness routines
                </p>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-6">
                {[
                  { title: "Hair Care Magic", views: "10k+", thumb: "/placeholder.svg" },
                  { title: "Daily Glow Routine", views: "8.5k+", thumb: "/placeholder.svg" },
                  { title: "Natural Baby Bath", views: "12k+", thumb: "/placeholder.svg" },
                  { title: "Healthy Brew Guide", views: "6.2k+", thumb: "/placeholder.svg" },
                  { title: "Wellness Routine", views: "15k+", thumb: "/placeholder.svg" },
                ].map((vid, idx) => (
                  <div key={idx} className="group relative rounded-2xl overflow-hidden shadow-sm bg-gray-50 aspect-[9/16] cursor-pointer">
                    <img src={vid.thumb} alt={vid.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent flex flex-col justify-between p-4 text-white">
                      <div className="bg-black/35 backdrop-blur-sm self-start text-[10px] font-semibold px-2 py-0.5 rounded-full">
                        {vid.views} Views
                      </div>
                      <div className="flex flex-col items-center gap-2">
                        <div className="w-12 h-12 rounded-full bg-emerald-600 flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform cursor-pointer">
                          <Play className="w-5 h-5 text-white fill-white ml-0.5" />
                        </div>
                        <h4 className="text-xs font-semibold text-center mt-1 line-clamp-1">{vid.title}</h4>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* 4. Customer Reviews */}
          <section className="py-20 bg-gray-50">
            <div className="max-w-7xl mx-auto px-6">
              <div className="text-center mb-12">
                <div className="inline-flex items-center gap-2 mb-4">
                  <Users className="w-5 h-5 text-emerald-600" />
                  <span className="text-emerald-700 font-semibold text-sm tracking-wide uppercase">Testimonials</span>
                  <Users className="w-5 h-5 text-emerald-600" />
                </div>
                <h2 className="text-3xl md:text-4xl font-extrabold text-gray-900 mb-3">
                  What Our Customers Say
                </h2>
                <p className="text-gray-500 max-w-md mx-auto">
                  Real testimonials from verified botanical enthusiasts
                </p>
              </div>

              <div className="max-w-md mx-auto bg-white border border-gray-100 rounded-2xl shadow-sm p-6 text-center mb-12">
                <div className="flex items-center justify-center gap-1 text-amber-500 mb-2">
                  <span className="text-3xl font-black text-gray-900 mr-2">4.9</span>
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-5 h-5 fill-current text-amber-400" />
                  ))}
                </div>
                <p className="text-sm font-medium text-gray-700">426 Verified Customer Reviews</p>
                <button className="mt-4 px-6 py-2 bg-emerald-600 text-white font-semibold text-xs rounded-full hover:bg-emerald-700 transition-colors shadow-sm">
                  Write a Review
                </button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {[
                  { name: "Anjana S.", date: "2 weeks ago", text: "I've been using their Multhani Metti Jar and Rose Water. It cleared my acne breakouts in just two weeks! Extremely premium quality." },
                  { name: "Rajesh Kumar", date: "1 month ago", text: "The Little Millet Vallarai Pongal mix is my go-to healthy breakfast. It is delicious, filling, and packs premium herbal ingredients." },
                  { name: "Kavitha M.", date: "3 weeks ago", text: "Hibiscus shampoo left my hair feeling soft and volumetric. You can definitely tell they use clean, organic herbal ingredients." }
                ].map((rev, idx) => (
                  <div key={idx} className="bg-white border border-gray-100 p-6 rounded-2xl shadow-sm hover:shadow-md transition-shadow">
                    <div className="flex gap-1 text-amber-400 mb-3">
                      {[...Array(5)].map((_, i) => (
                        <Star key={i} className="w-4 h-4 fill-current" />
                      ))}
                    </div>
                    <p className="text-sm text-gray-600 leading-relaxed">"{rev.text}"</p>
                    <div className="mt-4 pt-4 border-t border-gray-50 flex items-center justify-between text-xs">
                      <span className="font-semibold text-gray-800">{rev.name}</span>
                      <span className="text-gray-400">{rev.date}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* 5. Handpicked Deals */}
          <section className="py-20 bg-white">
            <div className="max-w-7xl mx-auto px-6">
              <div className="text-center mb-12">
                <div className="inline-flex items-center gap-2 mb-4">
                  <Zap className="w-5 h-5 text-emerald-600" />
                  <span className="text-emerald-700 font-semibold text-sm tracking-wide uppercase">Limited Time</span>
                  <Zap className="w-5 h-5 text-emerald-600" />
                </div>
                <h2 className="text-3xl md:text-4xl font-extrabold text-gray-900 mb-3">
                  Handpicked Deals For You
                </h2>
                <p className="text-gray-500 max-w-md mx-auto">
                  Pristine native formulations at exclusive discounts
                </p>
              </div>

              <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-6">
                {deals.slice(0, 5).map(renderProductCard)}
              </div>
            </div>
          </section>

          {/* 6. Trending Products */}
          <section className="py-20 bg-gray-50">
            <div className="max-w-7xl mx-auto px-6">
              <div className="text-center mb-12">
                <div className="inline-flex items-center gap-2 mb-4">
                  <TrendingUp className="w-5 h-5 text-emerald-600" />
                  <span className="text-emerald-700 font-semibold text-sm tracking-wide uppercase">Popular Now</span>
                  <TrendingUp className="w-5 h-5 text-emerald-600" />
                </div>
                <h2 className="text-3xl md:text-4xl font-extrabold text-gray-900 mb-3">
                  Trending Products
                </h2>
                <p className="text-gray-500 max-w-md mx-auto">
                  The fastest-selling herbal formulations flying off our shelves
                </p>
              </div>

              <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-6">
                {trending.slice(0, 5).map(renderProductCard)}
              </div>
            </div>
          </section>

          {/* 7. Promo Banners */}
          <section className="py-20 bg-white">
            <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-3 gap-6">
              {[
                { title: "Pure Soap Blend", desc: "100% Organic & Chemical Free", icon: Droplet, bg: "bg-emerald-50" },
                { title: "Glowing Skin Combo", desc: "Best of Skin & Body Care", icon: Sparkles, bg: "bg-amber-50" },
                { title: "Herbal Wellness Tea", desc: "Natural Organic Beverages", icon: Leaf, bg: "bg-stone-50" },
              ].map((promo, idx) => (
                <div key={idx} className={`relative rounded-2xl overflow-hidden p-8 flex flex-col justify-between h-64 shadow-sm border border-gray-100 ${promo.bg} hover:shadow-md transition-shadow group`}>
                  <div className="relative z-10">
                    <promo.icon className="w-10 h-10 text-emerald-600 mb-4" />
                    <h3 className="text-2xl font-bold text-gray-900">{promo.title}</h3>
                    <p className="text-sm text-gray-600 mt-2">{promo.desc}</p>
                  </div>
                  <div className="relative z-10">
                    <Link to="/shop" className="inline-flex items-center gap-1.5 text-sm font-semibold text-emerald-600 hover:text-emerald-700 group-hover:gap-2 transition-all">
                      Shop Now <ArrowRight className="w-4 h-4" />
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* 8. Our Journey */}
          <section className="py-20 bg-emerald-600 text-white relative overflow-hidden">
            <div className="absolute inset-0 opacity-10">
              <div className="absolute inset-0" style={{ backgroundImage: 'url("data:image/svg+xml,%3Csvg xmlns=\'http://www.w3.org/2000/svg\' viewBox=\'0 0 24 24\' fill=\'white\'%3E%3Cpath d=\'M12,2C9,7,4,9,4,14c0,4,4,6,8,6s8-2,8-6C20,9,15,7,12,2z\'/%3E%3C/svg%3E")', backgroundSize: '60px', backgroundRepeat: 'repeat' }}></div>
            </div>
            <div className="max-w-7xl mx-auto px-6 relative z-10">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                <div className="space-y-6">
                  <div className="inline-flex items-center gap-2">
                    <Leaf className="w-5 h-5 text-emerald-200" />
                    <span className="text-emerald-200 font-semibold text-sm tracking-wide uppercase">Our Journey</span>
                  </div>
                  <h2 className="text-3xl md:text-4xl font-extrabold tracking-tight">
                    Sourcing Directly from Local Indian Farmers
                  </h2>
                  <p className="text-emerald-50 text-sm leading-relaxed">
                    Dharani Herbals is born from our passion to bridge pure traditional herbs to modern busy families. We work hand-in-hand with native farmers in Tamil Nadu to secure clean crops, free of preservatives and harmful processing agents.
                  </p>
                  <p className="text-emerald-50 text-sm leading-relaxed">
                    Every batch of powder, shampoo, or homogeneous mix is fully checked, preserving natural medicinal properties so you receive optimal wellness solutions.
                  </p>
                  <div>
                    <Link
                      to="/journey"
                      className="inline-flex items-center gap-2 px-6 py-3 bg-white text-emerald-700 font-semibold rounded-xl hover:bg-emerald-50 transition-colors shadow-lg"
                    >
                      Read Full Story <ArrowRight className="w-4 h-4" />
                    </Link>
                  </div>
                </div>

                <div className="rounded-2xl overflow-hidden shadow-xl">
                  <img
                    src="/placeholder.svg"
                    alt="Herb Harvest Group"
                    className="w-full h-80 object-cover"
                  />
                </div>
              </div>

              <div className="mt-16 pt-12 border-t border-white/20 grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
                {[
                  { value: "10K+", label: "Happy Customers", icon: Users },
                  { value: "50+", label: "Organic Crops", icon: Leaf },
                  { value: "200+", label: "Remedies Offered", icon: Award },
                  { value: "100%", label: "Preservative Free", icon: ShieldCheck },
                ].map((stat, idx) => (
                  <div key={idx} className="space-y-2">
                    <stat.icon className="w-6 h-6 mx-auto text-emerald-200" />
                    <div className="text-3xl font-black text-white">{stat.value}</div>
                    <div className="text-xs text-emerald-100 font-semibold uppercase tracking-wider">{stat.label}</div>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* 9. Benefits Bar */}
          <section className="py-10 bg-white border-b border-gray-100">
            <div className="max-w-7xl mx-auto px-6 grid grid-cols-2 md:grid-cols-4 gap-6">
              {[
                { title: "Free Shipping", desc: "On orders above ₹1000", icon: Truck },
                { title: "Secure Checkout", desc: "100% Protected Payments", icon: ShieldCheck },
                { title: "Direct Farm Source", desc: "Supporting Local Growers", icon: Leaf },
                { title: "100% Organic", desc: "Zero Preservatives Added", icon: Award },
              ].map((ben, idx) => (
                <div key={idx} className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-emerald-50 flex items-center justify-center text-emerald-600 shrink-0">
                    <ben.icon className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="text-xs font-bold text-gray-800">{ben.title}</h4>
                    <p className="text-[10px] text-gray-400 mt-0.5">{ben.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* 10. Subscribe Form */}
          <section className="py-20 bg-emerald-50">
            <div className="max-w-4xl mx-auto text-center px-6 space-y-6">
              <Leaf className="w-10 h-10 text-emerald-600 mx-auto" />
              <h2 className="text-2xl md:text-3xl font-extrabold text-gray-900">
                Stay Connected with Natural Wellness
              </h2>
              <p className="text-gray-600 text-sm max-w-lg mx-auto">
                Join our premium botanical community. Receive 10% off your initial purchase, organic recipes, and expert herb facts.
              </p>
              
              <div className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto pt-2">
                <input
                  type="email"
                  placeholder="Enter your email address"
                  className="w-full px-5 py-3 rounded-xl border border-gray-200 bg-white text-gray-900 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent text-sm placeholder-gray-400 shadow-sm"
                />
                <button className="px-6 py-3 bg-emerald-600 text-white font-semibold rounded-xl hover:bg-emerald-700 transition-all shadow-sm shrink-0 text-sm">
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

// Missing import for TrendingUp
import { TrendingUp } from "lucide-react";