import { useEffect, useState } from "react";
import {
  motion,
  AnimatePresence,
  useMotionValue,
  useSpring,
} from "framer-motion";
import { Flame, ArrowUp, ShoppingBag, Check } from "lucide-react";
import { useCart } from "../store/cart";
import { formatBRL } from "../data/menu";

/* ---------------- LOADER ---------------- */
export function Loader({ onDone }: { onDone: () => void }) {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    let v = 0;
    const t = setInterval(() => {
      v += Math.random() * 22 + 8;
      if (v >= 100) {
        v = 100;
        clearInterval(t);
        setTimeout(onDone, 450);
      }
      setProgress(Math.floor(v));
    }, 160);
    return () => clearInterval(t);
  }, [onDone]);

  return (
    <motion.div
      className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-ink"
      exit={{ y: "-100%", transition: { duration: 0.8, ease: [0.76, 0, 0.24, 1] } }}
    >
      <div className="halftone-light absolute inset-0 opacity-60" />
      <motion.div
        initial={{ scale: 0.5, opacity: 0, rotate: -8 }}
        animate={{ scale: 1, opacity: 1, rotate: 0 }}
        transition={{ type: "spring", stiffness: 200, damping: 15 }}
        className="relative"
      >
        <div className="font-display text-6xl sm:text-8xl tracking-tight text-bite">
          BITE<span className="text-cream">UP</span>
        </div>
        <motion.div
          animate={{ rotate: [0, 15, -10, 0] }}
          transition={{ repeat: Infinity, duration: 1.2 }}
          className="absolute -right-8 -top-4 rounded-full bg-bite p-2 text-ink"
        >
          <Flame className="h-6 w-6" fill="currentColor" />
        </motion.div>
      </motion.div>
      <p className="font-hand mt-2 text-2xl text-cream/70">Crave. Crunch. Repeat.</p>

      {/* burger stack building */}
      <div className="mt-8 flex h-20 items-end gap-1.5">
        {["#e8a04c", "#7a4a21", "#4ade80", "#ff5d5d", "#ffc233", "#7a4a21"].map((c, i) => (
          <motion.div
            key={i}
            initial={{ scaleY: 0 }}
            animate={{ scaleY: progress > (i + 1) * 14 ? 1 : 0 }}
            transition={{ type: "spring", stiffness: 300, damping: 20 }}
            className="w-16 origin-bottom rounded-md sm:w-20"
            style={{ height: 10 + (i % 3) * 6, background: c }}
          />
        ))}
      </div>

      <div className="mt-6 w-64 sm:w-80">
        <div className="flex justify-between text-xs font-bold uppercase tracking-widest text-cream/60">
          <span>Aquecendo a chapa</span>
          <span className="text-bite">{progress}%</span>
        </div>
        <div className="mt-2 h-3 overflow-hidden rounded-full bg-smoke">
          <motion.div
            className="h-full rounded-full bg-gradient-to-r from-bite-deep via-bite to-bite-light"
            animate={{ width: `${progress}%` }}
            transition={{ ease: "easeOut", duration: 0.2 }}
          />
        </div>
      </div>
    </motion.div>
  );
}

/* ---------------- CUSTOM CURSOR ---------------- */
export function CustomCursor() {
  const x = useMotionValue(-100);
  const y = useMotionValue(-100);
  const sx = useSpring(x, { stiffness: 500, damping: 40 });
  const sy = useSpring(y, { stiffness: 500, damping: 40 });
  const [visible, setVisible] = useState(false);
  const [hovering, setHovering] = useState(false);

  useEffect(() => {
    if (window.matchMedia("(pointer: coarse)").matches) return;
    const move = (e: MouseEvent) => {
      x.set(e.clientX);
      y.set(e.clientY);
      setVisible(true);
      const t = e.target as HTMLElement;
      setHovering(!!t.closest("a,button,[data-cursor]"));
    };
    window.addEventListener("mousemove", move);
    return () => window.removeEventListener("mousemove", move);
  }, [x, y]);

  if (typeof window !== "undefined" && window.matchMedia("(pointer: coarse)").matches)
    return null;

  return (
    <motion.div
      className="pointer-events-none fixed left-0 top-0 z-[99] hidden md:block"
      style={{ x: sx, y: sy, opacity: visible ? 1 : 0 }}
    >
      <motion.div
        animate={{
          scale: hovering ? 2.6 : 1,
          backgroundColor: hovering ? "rgba(255,160,0,0.25)" : "rgba(255,160,0,1)",
        }}
        className="-ml-2 -mt-2 h-4 w-4 rounded-full border-2 border-ink"
      />
    </motion.div>
  );
}

/* ---------------- MARQUEE ---------------- */
export function Marquee({
  items,
  className = "",
  fast = false,
  reverse = false,
}: {
  items: string[];
  className?: string;
  fast?: boolean;
  reverse?: boolean;
}) {
  const row = [...items, ...items, ...items, ...items];
  return (
    <div className={`relative flex overflow-hidden ${className}`}>
      <div
        className={`flex w-max shrink-0 items-center gap-8 whitespace-nowrap pr-8 ${
          reverse ? "animate-marquee-rev" : fast ? "animate-marquee-fast" : "animate-marquee"
        }`}
      >
        {row.map((it, i) => (
          <span key={i} className="flex items-center gap-8">
            <span>{it}</span>
            <Flame className="h-5 w-5 shrink-0" fill="currentColor" />
          </span>
        ))}
      </div>
      <div
        aria-hidden
        className={`flex w-max shrink-0 items-center gap-8 whitespace-nowrap pr-8 ${
          reverse ? "animate-marquee-rev" : fast ? "animate-marquee-fast" : "animate-marquee"
        }`}
      >
        {row.map((it, i) => (
          <span key={i} className="flex items-center gap-8">
            <span>{it}</span>
            <Flame className="h-5 w-5 shrink-0" fill="currentColor" />
          </span>
        ))}
      </div>
    </div>
  );
}

/* ---------------- SECTION HEADING ---------------- */
export function SectionHeading({
  eyebrow,
  title,
  highlight,
  subtitle,
  dark = false,
  align = "center",
}: {
  eyebrow: string;
  title: string;
  highlight?: string;
  subtitle?: string;
  dark?: boolean;
  align?: "center" | "left";
}) {
  const alignCls = align === "center" ? "items-center text-center" : "items-start text-left";
  return (
    <div className={`flex flex-col gap-4 ${alignCls}`}>
      <motion.span
        initial={{ opacity: 0, y: 20, rotate: -6 }}
        whileInView={{ opacity: 1, y: 0, rotate: -3 }}
        viewport={{ once: true, margin: "-80px" }}
        transition={{ type: "spring", stiffness: 200, damping: 15 }}
        className={`inline-block rounded-full px-5 py-2 text-xs font-extrabold uppercase tracking-[0.2em] ${
          dark ? "bg-ink text-bite" : "bg-bite text-ink"
        } sticker`}
      >
        {eyebrow}
      </motion.span>
      <motion.h2
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-80px" }}
        transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        className={`font-display text-4xl leading-[1.02] sm:text-6xl lg:text-7xl ${
          dark ? "text-ink" : "text-cream"
        }`}
      >
        {title}{" "}
        {highlight && (
          <span className={`relative inline-block ${dark ? "text-bite-deep" : "text-bite"}`}>
            {highlight}
            <svg viewBox="0 0 220 24" className="absolute -bottom-2 left-0 w-full" fill="none">
              <motion.path
                d="M4 18 C 60 6, 160 6, 216 14"
                stroke={dark ? "#0c0c0c" : "#FFA000"}
                strokeWidth="6"
                strokeLinecap="round"
                initial={{ pathLength: 0 }}
                whileInView={{ pathLength: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: 0.4 }}
              />
            </svg>
          </span>
        )}
      </motion.h2>
      {subtitle && (
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.15 }}
          className={`max-w-xl text-base font-medium sm:text-lg ${dark ? "text-ink/70" : "text-cream/70"}`}
        >
          {subtitle}
        </motion.p>
      )}
    </div>
  );
}

/* ---------------- MAGNETIC ---------------- */
export function Magnetic({ children }: { children: React.ReactNode }) {
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const sx = useSpring(x, { stiffness: 250, damping: 18 });
  const sy = useSpring(y, { stiffness: 250, damping: 18 });
  return (
    <motion.div
      style={{ x: sx, y: sy }}
      onMouseMove={(e) => {
        const r = e.currentTarget.getBoundingClientRect();
        x.set((e.clientX - r.left - r.width / 2) * 0.25);
        y.set((e.clientY - r.top - r.height / 2) * 0.25);
      }}
      onMouseLeave={() => {
        x.set(0);
        y.set(0);
      }}
      className="inline-block"
    >
      {children}
    </motion.div>
  );
}

/* ---------------- TOASTS ---------------- */
export function Toasts() {
  const { toasts } = useCart();
  return (
    <div className="pointer-events-none fixed bottom-24 left-1/2 z-[95] flex -translate-x-1/2 flex-col items-center gap-2 sm:bottom-8">
      <AnimatePresence>
        {toasts.map((t) => (
          <motion.div
            key={t.id}
            layout
            initial={{ opacity: 0, y: 40, scale: 0.8 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.8 }}
            transition={{ type: "spring", stiffness: 400, damping: 25 }}
            className="flex items-center gap-3 rounded-2xl border-2 border-ink bg-cream py-2 pl-2 pr-5 text-ink shadow-[0_8px_0_#0c0c0c]"
          >
            {t.image ? (
              <img src={t.image} alt="" className="h-10 w-10 rounded-xl border-2 border-ink object-cover" />
            ) : (
              <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-bite">
                <Check className="h-5 w-5" strokeWidth={3} />
              </span>
            )}
            <span className="text-sm font-extrabold">{t.message}</span>
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  );
}

/* ---------------- FLOATING BUTTONS ---------------- */
export function FloatingButtons() {
  const { count, subtotal, setOpen, lastAdded } = useCart();
  const [showTop, setShowTop] = useState(false);

  useEffect(() => {
    const onScroll = () => setShowTop(window.scrollY > 700);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <>
      <AnimatePresence>
        {count > 0 && (
          <motion.button
            key={`cart-${lastAdded}`}
            initial={{ opacity: 0, y: 60, scale: 0.7 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 60, scale: 0.7 }}
            transition={{ type: "spring", stiffness: 300, damping: 22 }}
            onClick={() => setOpen(true)}
            className="fixed bottom-5 left-1/2 z-[80] flex -translate-x-1/2 items-center gap-3 rounded-full border-2 border-ink bg-bite py-3 pl-4 pr-6 text-ink shadow-[0_8px_0_#0c0c0c] transition-transform hover:-translate-y-1 sm:left-auto sm:right-6 sm:translate-x-0"
          >
            <span className="relative flex h-10 w-10 items-center justify-center rounded-full bg-ink text-bite">
              <ShoppingBag className="h-5 w-5" />
              <motion.span
                key={count}
                initial={{ scale: 0.3 }}
                animate={{ scale: 1 }}
                transition={{ type: "spring", stiffness: 500, damping: 12 }}
                className="absolute -right-1 -top-1 flex h-6 min-w-6 items-center justify-center rounded-full border-2 border-ink bg-cream px-1 text-[11px] font-black text-ink"
              >
                {count}
              </motion.span>
            </span>
            <span className="text-left leading-tight">
              <span className="block text-[11px] font-bold uppercase tracking-wider opacity-70">
                Ver carrinho
              </span>
              <span className="font-display block text-lg">{formatBRL(subtotal)}</span>
            </span>
          </motion.button>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {showTop && (
          <motion.button
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0 }}
            onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
            className="fixed bottom-5 right-5 z-[79] hidden h-12 w-12 items-center justify-center rounded-full border-2 border-bite bg-ink text-bite transition-colors hover:bg-bite hover:text-ink sm:flex"
            aria-label="Voltar ao topo"
          >
            <ArrowUp className="h-5 w-5" strokeWidth={3} />
          </motion.button>
        )}
      </AnimatePresence>
    </>
  );
}
