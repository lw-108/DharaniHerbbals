import { Routes, Route } from "react-router-dom";
import HomePage from "./pages/HomePage";
import ShopByCategory from "./pages/ShopByCategory";
import VideoTestimonials from "./pages/VideoTestimonials";
import MostLovedPage from "./pages/MostLovedPage";
import DealsPage from "./pages/DealsPage";
import TrendingPage from "./pages/TrendingPage";
import JourneyPage from "./pages/JourneyPage";
import { AppShell } from "./components/app-shell";
import { CartDrawer } from "./components/cart-drawer";
import { AuthModal } from "./components/auth-modal";
import { useApp } from "./lib/app-context";

export default function App() {
  const { isAuthOpen, setIsAuthOpen, authMode, signIn, signUp } = useApp();

  return (
    <>
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
      <CartDrawer />
      <AuthModal
        open={isAuthOpen}
        onOpenChange={setIsAuthOpen}
        defaultMode={authMode}
        onSuccess={async (u) => {
          if (authMode === "signin") {
            await signIn(u.email);
          } else {
            await signUp(u.name, u.email);
          }
        }}
      />
    </>
  );
}

