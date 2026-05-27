import { Routes, Route } from "react-router-dom";
import HomePage from "./pages/HomePage";
import ShopByCategory from "./pages/ShopByCategory";
import VideoTestimonials from "./pages/VideoTestimonials";
import MostLovedPage from "./pages/MostLovedPage";
import DealsPage from "./pages/DealsPage";
import TrendingPage from "./pages/TrendingPage";
import JourneyPage from "./pages/JourneyPage";
import { AppShell } from "./components/app-shell";

export default function App() {
  return (
    <Routes>
      {/* Home page without AppShell */}
      <Route path="/" element={<HomePage />} />
      {/* All other pages wrapped with AppShell layout */}
      <Route element={<AppShell />}>
        <Route path="/shop" element={<ShopByCategory />} />
        <Route path="/testimonials" element={<VideoTestimonials />} />
        <Route path="/most-loved" element={<MostLovedPage />} />
        <Route path="/deals" element={<DealsPage />} />
        <Route path="/trending" element={<TrendingPage />} />
        <Route path="/journey" element={<JourneyPage />} />
      </Route>
    </Routes>
  );
}
