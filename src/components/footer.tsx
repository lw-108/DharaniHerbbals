import { Link } from "react-router-dom";
import { Phone, Mail, MapPin, Globe, Leaf } from "lucide-react";

export function Footer() {
  return (
    <footer className="bg-emerald-950 text-emerald-100/90 border-t border-emerald-900/50 pt-16 pb-8">
      <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
        {/* Brand Column */}
        <div className="flex flex-col gap-4">
          <Link to="/" className="flex items-center gap-2 text-white font-extrabold text-xl tracking-tight">
            <span className="bg-white/10 p-2 rounded-xl border border-white/20">
              <Leaf className="w-6 h-6 text-emerald-400 fill-emerald-400/20" />
            </span>
            <span>Dharani Herbals</span>
          </Link>
          <p className="text-sm leading-relaxed text-emerald-200/70">
            Sourcing the purest organic botanical remedies directly from native farms. Empowering your wellness journey with premium herbal alternatives.
          </p>
          <div className="flex gap-4.5 mt-2">
            {/* Facebook */}
            <a href="#" className="hover:text-white transition-colors text-emerald-300">
              <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24">
                <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
              </svg>
            </a>
            {/* Instagram */}
            <a href="#" className="hover:text-white transition-colors text-emerald-300">
              <svg className="w-5 h-5" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24">
                <rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect>
                <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
                <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line>
              </svg>
            </a>
            {/* YouTube */}
            <a href="#" className="hover:text-white transition-colors text-emerald-300">
              <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24">
                <path d="M23.498 6.163a3.003 3.003 0 0 0-2.11-2.108C19.524 3.545 12 3.545 12 3.545s-7.525 0-9.387.51a3.003 3.003 0 0 0-2.11 2.108C0 8.025 0 12 0 12s0 3.975.503 5.837a3.003 3.003 0 0 0 2.11 2.108c1.862.51 9.387.51 9.387.51s7.525 0 9.387-.51a3.003 3.003 0 0 0 2.11-2.108C24 15.975 24 12 24 12s0-3.975-.502-5.837zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
              </svg>
            </a>
          </div>
        </div>

        {/* Quick Links Column */}
        <div>
          <h4 className="text-white font-bold text-sm uppercase tracking-wider mb-5">Quick Explore</h4>
          <ul className="space-y-3 text-sm">
            <li>
              <Link to="/shop" className="hover:text-white transition-colors">Shop By Category</Link>
            </li>
            <li>
              <Link to="/most-loved" className="hover:text-white transition-colors">Most Loved Picks</Link>
            </li>
            <li>
              <Link to="/deals" className="hover:text-white transition-colors">Handpicked Deals</Link>
            </li>
            <li>
              <Link to="/trending" className="hover:text-white transition-colors">Trending Products</Link>
            </li>
            <li>
              <Link to="/testimonials" className="hover:text-white transition-colors">Video Testimonials</Link>
            </li>
          </ul>
        </div>

        {/* Brand Partners */}
        <div>
          <h4 className="text-white font-bold text-sm uppercase tracking-wider mb-5">Our Brands</h4>
          <ul className="space-y-3 text-sm">
            <li><span className="hover:text-white transition-colors cursor-pointer">MAKIL</span></li>
            <li><span className="hover:text-white transition-colors cursor-pointer">DIVYAM</span></li>
            <li><span className="hover:text-white transition-colors cursor-pointer">VEDAN AMUTHU</span></li>
            <li><span className="hover:text-white transition-colors cursor-pointer">ATHIYAMAN</span></li>
            <li><span className="hover:text-white transition-colors cursor-pointer">NIRAI HOMAM</span></li>
          </ul>
        </div>

        {/* Contact Info */}
        <div className="flex flex-col gap-4 text-sm">
          <h4 className="text-white font-bold text-sm uppercase tracking-wider mb-1">Get in Touch</h4>
          <a href="tel:+919788122001" className="flex items-center gap-3 hover:text-white transition-colors">
            <Phone className="w-4 h-4 text-emerald-400 shrink-0" />
            <span>+91 97881 22001</span>
          </a>
          <a href="mailto:info@dharaniherbbals.in" className="flex items-center gap-3 hover:text-white transition-colors">
            <Mail className="w-4 h-4 text-emerald-400 shrink-0" />
            <span className="break-all">info@dharaniherbbals.in</span>
          </a>
          <div className="flex items-start gap-3">
            <MapPin className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
            <span className="leading-relaxed">Tamil Nadu, India</span>
          </div>
          <div className="flex items-center gap-3">
            <Globe className="w-4 h-4 text-emerald-400 shrink-0" />
            <span>Languages: English, தமிழ்</span>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 border-t border-emerald-900/50 mt-12 pt-8 flex flex-col md:flex-row justify-between items-center gap-4 text-xs text-emerald-200/50">
        <span>© 2026 Dharani Herbals. All rights reserved.</span>
        <div className="flex gap-6">
          <a href="#" className="hover:text-white transition-colors">Privacy Policy</a>
          <a href="#" className="hover:text-white transition-colors">Terms of Service</a>
          <a href="#" className="hover:text-white transition-colors">Refund Policy</a>
        </div>
      </div>
    </footer>
  );
}
