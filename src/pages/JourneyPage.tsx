import Navbar from "../components/ui/navbar";
import { Footer } from "../components/footer";
import { Leaf, Award, ShieldCheck } from "lucide-react";

export default function JourneyPage() {
  return (
    <div className="min-h-screen bg-white text-gray-900 flex flex-col selection:bg-emerald-100 selection:text-emerald-900">
      {/* Navbar */}
      <Navbar
        user={null}
        onSignInClick={() => {}}
        onSignUpClick={() => {}}
        onSignOutClick={() => {}}
      />

      {/* Header Area */}
      <div className="relative py-24 bg-gradient-to-br from-emerald-950 to-teal-950 text-white overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-white/10 via-transparent to-transparent opacity-50" />
        <div className="max-w-4xl mx-auto text-center px-6 relative z-10">
          <Leaf className="w-12 h-12 text-emerald-400 mx-auto mb-4 animate-bounce" />
          <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight">Our Sacred Journey</h1>
          <p className="text-emerald-100/80 mt-4 text-base md:text-lg max-w-2xl mx-auto leading-relaxed">
            From humble village roots to trusted global suppliers of clean, organic botanical remedies. Explore how Dharani Herbals was born out of a passion for nature.
          </p>
        </div>
      </div>

      {/* Story & Philosophy Section */}
      <section className="py-20 px-6 max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <div className="space-y-6">
            <h2 className="text-3xl font-extrabold text-gray-900 tracking-tight">
              Rooted in Ayurvedic Traditions
            </h2>
            <p className="text-gray-600 leading-relaxed">
              Dharani Herbals was founded with a singular mission: to restore the connection between nature and modern wellness. We believe that true health is found in pure, untouched, organic extracts harvested ethically and sustainably.
            </p>
            <p className="text-gray-600 leading-relaxed">
              Every single product in our catalog undergoes rigorous sourcing inspections. We work closely with tribal communities and local farmers in Tamil Nadu to secure ingredients that are pure, free of chemical fertilizers, and fully potent.
            </p>
            
            {/* Core Values Icons */}
            <div className="grid grid-cols-2 gap-6 pt-4">
              <div className="flex gap-3">
                <div className="bg-emerald-55 p-2.5 rounded-xl text-emerald-700 h-fit bg-emerald-50">
                  <Award className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="font-bold text-gray-800 text-sm">Certified Organic</h4>
                  <p className="text-xs text-gray-500 mt-0.5">100% chemical-free</p>
                </div>
              </div>
              <div className="flex gap-3">
                <div className="bg-emerald-50 p-2.5 rounded-xl text-emerald-700 h-fit">
                  <ShieldCheck className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="font-bold text-gray-800 text-sm">Strict Quality</h4>
                  <p className="text-xs text-gray-500 mt-0.5">Lab-tested remedies</p>
                </div>
              </div>
            </div>
          </div>

          <div className="relative rounded-3xl overflow-hidden aspect-video lg:aspect-square shadow-2xl">
            <img
              src="https://images.unsplash.com/photo-1542838132-92c53300491e?auto=format&fit=crop&q=80&w=800"
              alt="Organic farm harvesting"
              className="w-full h-full object-cover"
            />
          </div>
        </div>
      </section>

      {/* Timeline Section */}
      <section className="py-20 bg-gray-50 border-t border-b border-gray-100">
        <div className="max-w-4xl mx-auto px-6">
          <h2 className="text-3xl font-extrabold text-gray-900 text-center mb-12">Milestones Along the Way</h2>
          
          <div className="relative border-l border-emerald-300 ml-4 space-y-12">
            {/* Milestone 1 */}
            <div className="relative pl-8">
              <span className="absolute -left-3.5 top-1.5 w-7 h-7 bg-emerald-500 rounded-full border-4 border-white flex items-center justify-center">
                <span className="w-2.5 h-2.5 bg-white rounded-full" />
              </span>
              <span className="text-xs font-bold text-emerald-750 tracking-widest uppercase">2018</span>
              <h3 className="text-lg font-bold text-gray-800 mt-1">Sowing the Seeds</h3>
              <p className="text-sm text-gray-550 mt-1 leading-relaxed">
                Began as a small collaborative network of organic growers in Tamil Nadu, sharing native seeds and traditional soil management techniques.
              </p>
            </div>

            {/* Milestone 2 */}
            <div className="relative pl-8">
              <span className="absolute -left-3.5 top-1.5 w-7 h-7 bg-emerald-500 rounded-full border-4 border-white flex items-center justify-center">
                <span className="w-2.5 h-2.5 bg-white rounded-full" />
              </span>
              <span className="text-xs font-bold text-emerald-750 tracking-widest uppercase">2020</span>
              <h3 className="text-lg font-bold text-gray-800 mt-1">Dharani Brand Launch</h3>
              <p className="text-sm text-gray-550 mt-1 leading-relaxed">
                Officially launched Dharani Herbals, introducing premium packaging and native herbal mixtures like Avarampoo tea and cold-pressed coconut oil.
              </p>
            </div>

            {/* Milestone 3 */}
            <div className="relative pl-8">
              <span className="absolute -left-3.5 top-1.5 w-7 h-7 bg-emerald-500 rounded-full border-4 border-white flex items-center justify-center">
                <span className="w-2.5 h-2.5 bg-white rounded-full" />
              </span>
              <span className="text-xs font-bold text-emerald-750 tracking-widest uppercase">2023</span>
              <h3 className="text-lg font-bold text-gray-800 mt-1">Global Sourcing Standards</h3>
              <p className="text-sm text-gray-550 mt-1 leading-relaxed">
                Implemented strict testing protocols ensuring all powders, malts, and shampoos are entirely contaminant-free and therapeutically active.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <Footer />
    </div>
  );
}
