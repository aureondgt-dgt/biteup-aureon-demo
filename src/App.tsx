import { useState } from "react";
import { AnimatePresence } from "framer-motion";
import { CartProvider } from "./store/cart";
import { Loader, CustomCursor, Toasts, FloatingButtons } from "./components/chrome";
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import MenuSection from "./components/MenuSection";
import World from "./components/World";
import Social from "./components/Social";
import CartDrawer from "./components/CartDrawer";

export default function App() {
  const [loading, setLoading] = useState(true);

  return (
    <CartProvider>
      <div className="min-h-screen bg-ink font-body text-cream">
        <AnimatePresence>
          {loading && <Loader key="loader" onDone={() => setLoading(false)} />}
        </AnimatePresence>

        <CustomCursor />
        <Navbar />

        <main>
          <Hero />
          <MenuSection />
          <World />
          <Social />
        </main>

        <CartDrawer />
        <Toasts />
        <FloatingButtons />
      </div>
    </CartProvider>
  );
}
