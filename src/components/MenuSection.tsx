import { useEffect, useMemo, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import confetti from "canvas-confetti";
import {
  Star, Plus, Check, Heart, Clock, Flame, Zap, ShoppingBag, BadgePercent,
} from "lucide-react";
import { PRODUCTS, CATEGORIES, formatBRL, type Category, type Product } from "../data/menu";
import { useCart } from "../store/cart";
import { SectionHeading } from "./chrome";

/* ---------- countdown to midnight ---------- */
function useCountdown() {
  const [t, setT] = useState({ h: "00", m: "00", s: "00" });
  useEffect(() => {
    const tick = () => {
      const now = new Date();
      const end = new Date();
      end.setHours(23, 59, 59, 999);
      const diff = Math.max(0, end.getTime() - now.getTime());
      const h = Math.floor(diff / 3600000);
      const m = Math.floor((diff % 3600000) / 60000);
      const s = Math.floor((diff % 60000) / 1000);
      setT({
        h: String(h).padStart(2, "0"),
        m: String(m).padStart(2, "0"),
        s: String(s).padStart(2, "0"),
      });
    };
    tick();
    const id = setInterval(tick, 1000);
    return () => clearInterval(id);
  }, []);
  return t;
}

function ProductCard({ product, index }: { product: Product; index: number }) {
  const { add, favorites, toggleFav } = useCart();
  const [added, setAdded] = useState(false);
  const fav = favorites.includes(product.id);

  const handleAdd = (e: React.MouseEvent) => {
    const rect = (e.currentTarget as HTMLElement).getBoundingClientRect();
    confetti({
      particleCount: 26,
      spread: 60,
      startVelocity: 28,
      scalar: 0.8,
      ticks: 120,
      origin: {
        x: (rect.left + rect.width / 2) / window.innerWidth,
        y: (rect.top + rect.height / 2) / window.innerHeight,
      },
      colors: ["#FFA000", "#FFC233", "#ffffff", "#ff5d5d"],
    });
    add(product.id);
    setAdded(true);
    setTimeout(() => setAdded(false), 1400);
  };

  return (
    <motion.article
      layout
      initial={{ opacity: 0, y: 50, scale: 0.95 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, scale: 0.9, transition: { duration: 0.2 } }}
      transition={{ duration: 0.5, delay: Math.min(index * 0.06, 0.4), ease: [0.22, 1, 0.36, 1] }}
      whileHover={{ y: -10 }}
      className="card-shine group relative flex flex-col overflow-hidden rounded-3xl border-2 border-cream/10 bg-coal transition-colors hover:border-bite"
    >
      <div className="relative overflow-hidden">
        <motion.img
          src={product.image}
          alt={product.name}
          loading="lazy"
          className="aspect-[4/3] w-full object-cover transition-transform duration-700 group-hover:rotate-1 group-hover:scale-110"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-coal via-transparent to-transparent" />
        {product.badge && (
          <motion.span
            initial={{ rotate: -12, scale: 0 }}
            whileInView={{ rotate: -8, scale: 1 }}
            viewport={{ once: true }}
            transition={{ type: "spring", stiffness: 300, damping: 12, delay: 0.2 + index * 0.05 }}
            className="absolute left-3 top-3 rounded-full border-2 border-ink px-3 py-1 text-[11px] font-black uppercase tracking-wider text-ink shadow-[0_4px_0_#0c0c0c]"
            style={{ background: product.badgeColor ?? "#FFA000" }}
          >
            {product.badge}
          </motion.span>
        )}
        <button
          onClick={() => toggleFav(product.id)}
          aria-label="Favoritar"
          className={`absolute right-3 top-3 flex h-10 w-10 items-center justify-center rounded-full border-2 border-ink shadow-[0_4px_0_#0c0c0c] transition-all active:scale-90 ${
            fav ? "bg-red-500 text-white" : "bg-cream text-ink hover:bg-bite"
          }`}
        >
          <motion.span animate={fav ? { scale: [1, 1.5, 1] } : {}} transition={{ duration: 0.35 }}>
            <Heart className="h-5 w-5" fill={fav ? "currentColor" : "none"} strokeWidth={2.6} />
          </motion.span>
        </button>
        <div className="absolute bottom-3 left-3 flex items-center gap-2">
          <span className="flex items-center gap-1 rounded-full bg-ink/85 px-3 py-1 text-xs font-black text-bite backdrop-blur">
            <Star className="h-3.5 w-3.5" fill="currentColor" /> {product.rating.toFixed(1)}
            <span className="font-bold text-cream/60">({product.reviews.toLocaleString("pt-BR")})</span>
          </span>
          <span className="flex items-center gap-1 rounded-full bg-ink/85 px-3 py-1 text-xs font-bold text-cream/80 backdrop-blur">
            <Clock className="h-3.5 w-3.5" /> {product.time}
          </span>
        </div>
      </div>

      <div className="flex flex-1 flex-col gap-2 p-5">
        <div className="flex items-start justify-between gap-2">
          <h3 className="font-display text-2xl leading-none text-cream transition-colors group-hover:text-bite">
            {product.name}
          </h3>
          {product.spicy ? (
            <span className="flex gap-0.5">
              {Array.from({ length: product.spicy }).map((_, i) => (
                <Flame key={i} className="h-4 w-4 text-red-500" fill="currentColor" />
              ))}
            </span>
          ) : null}
        </div>
        <p className="text-sm font-medium leading-relaxed text-cream/60">{product.description}</p>
        <div className="flex flex-wrap gap-1.5">
          {product.ingredients.slice(0, 4).map((ing) => (
            <span key={ing} className="rounded-full bg-smoke px-2.5 py-1 text-[11px] font-bold text-cream/70">
              {ing}
            </span>
          ))}
          {product.ingredients.length > 4 && (
            <span className="rounded-full bg-bite/15 px-2.5 py-1 text-[11px] font-black text-bite">
              +{product.ingredients.length - 4}
            </span>
          )}
        </div>

        <div className="mt-auto flex items-end justify-between gap-3 pt-4">
          <div>
            {product.oldPrice && (
              <p className="text-sm font-bold text-cream/35 line-through">{formatBRL(product.oldPrice)}</p>
            )}
            <p className="font-display text-3xl text-bite">{formatBRL(product.price)}</p>
          </div>
          <motion.button
            onClick={handleAdd}
            whileTap={{ scale: 0.9 }}
            className={`relative flex items-center gap-2 overflow-hidden rounded-2xl border-2 border-ink px-5 py-3 text-sm font-black uppercase tracking-wide transition-colors ${
              added ? "bg-green-400 text-ink" : "bg-bite text-ink hover:bg-bite-light"
            } shadow-[0_5px_0_rgba(255,160,0,0.35)]`}
          >
            <AnimatePresence mode="wait" initial={false}>
              {added ? (
                <motion.span
                  key="ok"
                  initial={{ y: 20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  exit={{ y: -20, opacity: 0 }}
                  className="flex items-center gap-1.5"
                >
                  <Check className="h-5 w-5" strokeWidth={3.5} /> Foi!
                </motion.span>
              ) : (
                <motion.span
                  key="add"
                  initial={{ y: 20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  exit={{ y: -20, opacity: 0 }}
                  className="flex items-center gap-1.5"
                >
                  <Plus className="h-5 w-5" strokeWidth={3.5} /> Pedir
                </motion.span>
              )}
            </AnimatePresence>
          </motion.button>
        </div>
      </div>
    </motion.article>
  );
}

export default function MenuSection() {
  const [cat, setCat] = useState<Category | "all">("all");
  const { add } = useCart();
  const { h, m, s } = useCountdown();

  const filtered = useMemo(
    () => (cat === "all" ? PRODUCTS : PRODUCTS.filter((p) => p.category === cat)),
    [cat]
  );

  return (
    <section id="cardapio" className="noise relative bg-ink py-20 sm:py-28">
      <div className="halftone-light absolute inset-0 opacity-50" />
      <div className="pointer-events-none absolute -right-40 top-20 h-[500px] w-[500px] rounded-full bg-bite/10 blur-[120px]" />

      <div className="relative mx-auto max-w-6xl px-5 sm:px-8">
        <SectionHeading
          eyebrow="Cardápio da casa"
          title="ESCOLHE TUA"
          highlight="FOME"
          subtitle="Tudo feito na hora, na brasa de verdade. Escolhe, adiciona e recebe quentinho."
        />

        {/* filter pills */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="no-scrollbar mt-10 flex justify-start gap-2 overflow-x-auto pb-2 sm:justify-center sm:flex-wrap"
        >
          {CATEGORIES.map((c) => {
            const active = cat === c.id;
            const n = c.id === "all" ? PRODUCTS.length : PRODUCTS.filter((p) => p.category === c.id).length;
            return (
              <button
                key={c.id}
                onClick={() => setCat(c.id)}
                className={`relative shrink-0 rounded-full px-5 py-2.5 text-sm font-black uppercase tracking-wide transition-colors ${
                  active ? "text-ink" : "text-cream/60 hover:text-cream"
                }`}
              >
                {active && (
                  <motion.span
                    layoutId="pill"
                    transition={{ type: "spring", stiffness: 350, damping: 28 }}
                    className="absolute inset-0 rounded-full border-2 border-ink bg-bite shadow-[0_4px_0_rgba(255,160,0,0.4)]"
                  />
                )}
                <span className="relative">
                  {c.label} <span className="opacity-60">({n})</span>
                </span>
              </button>
            );
          })}
        </motion.div>

        {/* grid */}
        <motion.div layout className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          <AnimatePresence mode="popLayout">
            {filtered.map((p, i) => (
              <ProductCard key={p.id} product={p} index={i} />
            ))}
          </AnimatePresence>
        </motion.div>

        {/* FLASH PROMO */}
        <motion.div
          initial={{ opacity: 0, y: 60 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          className="noise relative mt-16 overflow-hidden rounded-[2rem] border-2 border-bite bg-gradient-to-br from-bite-deep via-bite to-bite-light p-8 sm:p-12"
        >
          <div className="halftone absolute inset-0 opacity-60" />
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ repeat: Infinity, duration: 24, ease: "linear" }}
            className="absolute -right-16 -top-16 h-64 w-64 rounded-full border-[26px] border-ink/10"
          />
          <div className="relative grid items-center gap-8 lg:grid-cols-[1fr_auto]">
            <div>
              <div className="inline-flex items-center gap-2 rounded-full bg-ink px-4 py-1.5 text-xs font-black uppercase tracking-[0.2em] text-bite">
                <Zap className="h-4 w-4" fill="currentColor" /> Promo relâmpago
              </div>
              <h3 className="font-display mt-4 text-4xl leading-none text-ink sm:text-6xl">
                DOUBLE BRASA
                <br />
                COM 11% OFF
              </h3>
              <p className="mt-3 max-w-md font-bold text-ink/75">
                Só hoje, só aqui no site. Dois smashes + cheddar triplo por{" "}
                <span className="rounded bg-ink px-2 py-0.5 text-bite">{formatBRL(39.9)}</span> em
                vez de {formatBRL(44.9)}. Corre que a chapa esfria!
              </p>
              <div className="mt-5 flex items-center gap-2">
                {[
                  { v: h, l: "horas" },
                  { v: m, l: "min" },
                  { v: s, l: "seg" },
                ].map((u, i) => (
                  <div key={u.l} className="flex items-center gap-2">
                    <div className="min-w-[74px] rounded-2xl border-2 border-ink bg-ink px-3 py-2 text-center shadow-[0_5px_0_rgba(12,12,12,0.35)]">
                      <motion.p
                        key={u.v}
                        initial={{ y: -12, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        className="font-display text-3xl text-bite tabular-nums"
                      >
                        {u.v}
                      </motion.p>
                      <p className="text-[10px] font-black uppercase tracking-widest text-cream/60">{u.l}</p>
                    </div>
                    {i < 2 && <span className="font-display text-3xl text-ink">:</span>}
                  </div>
                ))}
              </div>
            </div>
            <div className="flex flex-col items-center gap-4">
              <motion.div
                whileHover={{ rotate: -4, scale: 1.04 }}
                className="relative w-56 overflow-hidden rounded-3xl border-4 border-ink shadow-[0_12px_0_#0c0c0c] sm:w-64"
              >
                <img src="/images/double-brasa.jpg" alt="Double Brasa" className="aspect-square w-full object-cover" />
                <span className="absolute left-3 top-3 flex items-center gap-1 rounded-full bg-ink px-3 py-1 text-xs font-black text-bite">
                  <BadgePercent className="h-4 w-4" /> -11% HOJE
                </span>
              </motion.div>
              <motion.button
                whileHover={{ scale: 1.05, rotate: -1 }}
                whileTap={{ scale: 0.94 }}
                onClick={() => add("double-brasa")}
                className="font-display flex items-center gap-2 rounded-2xl border-2 border-ink bg-ink px-8 py-4 text-xl text-bite shadow-[0_8px_0_rgba(12,12,12,0.4)]"
              >
                <ShoppingBag className="h-6 w-6" /> QUERO O MEU
              </motion.button>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
