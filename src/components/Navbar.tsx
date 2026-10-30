import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ShoppingBag, Menu, X, Flame, Bike } from "lucide-react";
import { useCart } from "../store/cart";

const LINKS = [
  { href: "#cardapio", label: "Cardápio" },
  { href: "#monte-seu", label: "Monte o seu" },
  { href: "#sobre", label: "A BiteUp" },
  { href: "#avaliacoes", label: "Avaliações" },
  { href: "#contato", label: "Contato" },
];

export default function Navbar() {
  const { count, setOpen, lastAdded } = useCart();
  const [scrolled, setScrolled] = useState(false);
  const [open, setMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 30);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <>
      <motion.header
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ delay: 2.4, type: "spring", stiffness: 120, damping: 18 }}
        className="fixed inset-x-0 top-0 z-[70] px-3 pt-3 sm:px-6 sm:pt-4"
      >
        <div
          className={`mx-auto flex max-w-6xl items-center justify-between gap-2 rounded-2xl border-2 px-3 py-2.5 transition-all duration-300 sm:px-5 ${
            scrolled
              ? "border-ink bg-bite shadow-[0_6px_0_#0c0c0c]"
              : "border-transparent bg-ink/40 backdrop-blur-md"
          }`}
        >
          <a href="#topo" className="group flex items-center gap-2">
            <motion.span
              whileHover={{ rotate: -12, scale: 1.1 }}
              className={`font-display flex h-10 w-10 items-center justify-center rounded-xl border-2 text-xl transition-colors ${
                scrolled ? "border-ink bg-ink text-bite" : "border-bite bg-bite text-ink"
              }`}
            >
              B
            </motion.span>
            <span
              className={`font-display text-xl tracking-tight sm:text-2xl ${
                scrolled ? "text-ink" : "text-cream"
              }`}
            >
              BITE<span className={scrolled ? "text-ink/60" : "text-bite"}>UP</span>
            </span>
          </a>

          <nav className="hidden items-center gap-1 lg:flex">
            {LINKS.map((l) => (
              <a
                key={l.href}
                href={l.href}
                className={`relative rounded-full px-4 py-2 text-sm font-extrabold uppercase tracking-wide transition-colors ${
                  scrolled ? "text-ink hover:bg-ink hover:text-bite" : "text-cream/85 hover:bg-bite hover:text-ink"
                }`}
              >
                {l.label}
              </a>
            ))}
          </nav>

          <div className="flex items-center gap-2">
            <div
              className={`hidden items-center gap-1.5 rounded-full px-3 py-1.5 text-xs font-extrabold md:flex ${
                scrolled ? "bg-ink text-bite" : "bg-bite/15 text-bite"
              }`}
            >
              <span className="relative flex h-2 w-2">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-green-400 opacity-75" />
                <span className="relative inline-flex h-2 w-2 rounded-full bg-green-400" />
              </span>
              ABERTO · 18h–23h
            </div>

            <motion.button
              key={lastAdded}
              initial={{ scale: 1 }}
              animate={lastAdded ? { scale: [1, 1.25, 1] } : {}}
              transition={{ duration: 0.4 }}
              onClick={() => setOpen(true)}
              className={`relative flex items-center gap-2 rounded-xl border-2 px-3 py-2 text-sm font-extrabold transition-transform hover:-translate-y-0.5 sm:px-4 ${
                scrolled
                  ? "border-ink bg-ink text-bite shadow-[0_4px_0_rgba(12,12,12,0.3)]"
                  : "border-bite bg-bite text-ink shadow-[0_4px_0_rgba(255,160,0,0.35)]"
              }`}
            >
              <ShoppingBag className="h-4 w-4" strokeWidth={2.8} />
              <span className="hidden sm:inline">Pedir</span>
              <AnimatePresence>
                {count > 0 && (
                  <motion.span
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    exit={{ scale: 0 }}
                    className={`absolute -right-2 -top-2 flex h-6 min-w-6 items-center justify-center rounded-full border-2 px-1 text-[11px] font-black ${
                      scrolled ? "border-ink bg-cream text-ink" : "border-ink bg-ink text-bite"
                    }`}
                  >
                    {count}
                  </motion.span>
                )}
              </AnimatePresence>
            </motion.button>

            <button
              onClick={() => setMenuOpen(true)}
              aria-label="Abrir menu"
              className={`flex h-10 w-10 items-center justify-center rounded-xl border-2 lg:hidden ${
                scrolled ? "border-ink bg-ink text-bite" : "border-bite/60 text-cream"
              }`}
            >
              <Menu className="h-5 w-5" strokeWidth={2.8} />
            </button>
          </div>
        </div>
      </motion.header>

      {/* Mobile fullscreen menu */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[90] flex flex-col bg-ink"
          >
            <div className="halftone-light absolute inset-0" />
            <div className="relative flex items-center justify-between p-5">
              <span className="font-display text-2xl text-bite">
                BITE<span className="text-cream">UP</span>
              </span>
              <button
                onClick={() => setMenuOpen(false)}
                aria-label="Fechar menu"
                className="flex h-11 w-11 items-center justify-center rounded-xl border-2 border-bite text-bite"
              >
                <X className="h-6 w-6" strokeWidth={2.8} />
              </button>
            </div>
            <nav className="relative flex flex-1 flex-col items-center justify-center gap-2 px-8">
              {LINKS.map((l, i) => (
                <motion.a
                  key={l.href}
                  href={l.href}
                  onClick={() => setMenuOpen(false)}
                  initial={{ opacity: 0, x: -60 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.08 * i, type: "spring", stiffness: 200, damping: 20 }}
                  className="font-display group flex w-full max-w-md items-center justify-between rounded-2xl border-2 border-transparent px-5 py-3 text-3xl text-cream transition-colors hover:border-bite hover:bg-bite hover:text-ink"
                >
                  {l.label}
                  <Flame className="h-6 w-6 opacity-0 transition-opacity group-hover:opacity-100" fill="currentColor" />
                </motion.a>
              ))}
              <motion.a
                href="#cardapio"
                onClick={() => setMenuOpen(false)}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 }}
                className="font-display mt-6 flex items-center gap-3 rounded-2xl bg-bite px-8 py-4 text-2xl text-ink shadow-[0_8px_0_rgba(255,160,0,0.3)]"
              >
                <Bike className="h-7 w-7" /> PEDIR AGORA
              </motion.a>
            </nav>
            <p className="font-hand relative pb-8 text-center text-2xl text-cream/50">
              Crave. Crunch. Repeat.
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
