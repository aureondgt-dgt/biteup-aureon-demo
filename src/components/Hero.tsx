import { useRef } from "react";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { ArrowDown, Star, Flame, Bike, BadgeCheck, Timer, ChevronRight } from "lucide-react";
import { Marquee, Magnetic } from "./chrome";
import { formatBRL } from "../data/menu";

const TITLE_TOP = "CRAVE.";
const TITLE_MID = "CRUNCH.";
const TITLE_BOT = "REPEAT.";

function StaggerWord({ word, delay, className }: { word: string; delay: number; className?: string }) {
  return (
    <span className={`inline-flex overflow-hidden pb-1 ${className ?? ""}`}>
      {word.split("").map((ch, i) => (
        <motion.span
          key={i}
          initial={{ y: "110%", rotate: 8 }}
          animate={{ y: 0, rotate: 0 }}
          transition={{
            delay: delay + i * 0.045,
            type: "spring",
            stiffness: 220,
            damping: 17,
          }}
          className="inline-block"
        >
          {ch}
        </motion.span>
      ))}
    </span>
  );
}

export default function Hero() {
  const ref = useRef<HTMLDivElement>(null);
  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const sx = useSpring(mx, { stiffness: 60, damping: 18 });
  const sy = useSpring(my, { stiffness: 60, damping: 18 });

  const burgerX = useTransform(sx, [-0.5, 0.5], [-26, 26]);
  const burgerY = useTransform(sy, [-0.5, 0.5], [-20, 20]);
  const chipX = useTransform(sx, [-0.5, 0.5], [30, -30]);
  const chipY = useTransform(sy, [-0.5, 0.5], [22, -22]);
  const bgX = useTransform(sx, [-0.5, 0.5], [-14, 14]);

  const onMouse = (e: React.MouseEvent) => {
    const r = ref.current?.getBoundingClientRect();
    if (!r) return;
    mx.set((e.clientX - r.left) / r.width - 0.5);
    my.set((e.clientY - r.top) / r.height - 0.5);
  };

  return (
    <section
      id="topo"
      ref={ref}
      onMouseMove={onMouse}
      className="noise relative overflow-hidden bg-bite pt-28 sm:pt-32"
    >
      <div className="halftone absolute inset-0 opacity-70" />
      {/* giant bg text */}
      <motion.div style={{ x: bgX }} className="pointer-events-none absolute inset-x-0 top-16 select-none sm:top-20">
        <div className="font-display animate-marquee whitespace-nowrap text-center text-[22vw] leading-none text-ink/[0.06]">
          BITEUP • BITEUP • BITEUP • BITEUP •
        </div>
      </motion.div>
      {/* glow blobs */}
      <div className="pointer-events-none absolute -left-32 top-1/3 h-96 w-96 rounded-full bg-cream/30 blur-[100px]" />
      <div className="pointer-events-none absolute -right-24 bottom-0 h-80 w-80 rounded-full bg-ink/10 blur-[80px]" />

      <div className="relative mx-auto grid max-w-6xl items-center gap-10 px-5 pb-10 sm:px-8 lg:grid-cols-[1.05fr_0.95fr] lg:pb-4">
        {/* LEFT */}
        <div className="pt-4 text-center lg:text-left">
          <motion.div
            initial={{ opacity: 0, y: -20, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ delay: 2.5, type: "spring", stiffness: 200, damping: 16 }}
            className="inline-flex items-center gap-2 rounded-full border-2 border-ink bg-ink px-4 py-2 text-xs font-extrabold uppercase tracking-[0.18em] text-bite shadow-[0_5px_0_rgba(12,12,12,0.25)]"
          >
            <span className="relative flex h-2.5 w-2.5">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-green-400 opacity-75" />
              <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-green-400" />
            </span>
            Hamburgueria artesanal · delivery
          </motion.div>

          <h1 className="font-display mt-5 text-[17vw] leading-[0.92] text-ink sm:text-7xl lg:text-[5.6rem]">
            <StaggerWord word={TITLE_TOP} delay={2.55} />
            <br />
            <StaggerWord word={TITLE_MID} delay={2.75} className="text-cream [-webkit-text-stroke:2.5px_#0c0c0c] [text-shadow:5px_5px_0_#0c0c0c]" />
            <br />
            <span className="inline-flex items-center gap-3">
              <StaggerWord word={TITLE_BOT} delay={2.95} />
              <motion.span
                initial={{ scale: 0, rotate: -30 }}
                animate={{ scale: 1, rotate: 12 }}
                transition={{ delay: 3.4, type: "spring", stiffness: 260, damping: 12 }}
                className="hidden rounded-2xl border-2 border-ink bg-ink px-3 py-1 text-lg text-bite sm:inline-block"
              >
                <Flame className="inline h-5 w-5" fill="currentColor" /> NA BRASA
              </motion.span>
            </span>
          </h1>

          <motion.p
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 3.3, duration: 0.6 }}
            className="mx-auto mt-5 max-w-md text-base font-semibold text-ink/75 sm:text-lg lg:mx-0"
          >
            Smash suculento, cheddar escorrendo e bacon crocante. A mordida mais
            insana da cidade — do <span className="font-black text-ink">R$ 29,90</span> ao
            combo dos sonhos.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 3.45, duration: 0.6 }}
            className="mt-7 flex flex-col items-center gap-3 sm:flex-row lg:justify-start sm:justify-center"
          >
            <Magnetic>
              <a
                href="#cardapio"
                className="font-display group flex items-center gap-2 rounded-2xl border-2 border-ink bg-ink px-8 py-4 text-xl text-bite shadow-[0_8px_0_rgba(12,12,12,0.35)] transition-all hover:-translate-y-1 hover:shadow-[0_12px_0_rgba(12,12,12,0.35)]"
              >
                VER CARDÁPIO
                <ChevronRight className="h-6 w-6 transition-transform group-hover:translate-x-1" strokeWidth={3} />
              </a>
            </Magnetic>
            <Magnetic>
              <a
                href="#monte-seu"
                className="font-display rounded-2xl border-2 border-ink bg-cream/60 px-8 py-4 text-xl text-ink backdrop-blur transition-all hover:-translate-y-1 hover:bg-cream"
              >
                MONTAR O MEU
              </a>
            </Magnetic>
          </motion.div>

          {/* social proof */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 3.6 }}
            className="mt-8 flex flex-col items-center gap-3 sm:flex-row lg:justify-start sm:justify-center"
          >
            <div className="flex -space-x-3">
              {["CR", "DM", "JC", "RS"].map((n, i) => (
                <motion.span
                  key={n}
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ delay: 3.6 + i * 0.1, type: "spring", stiffness: 300, damping: 15 }}
                  className="font-display flex h-11 w-11 items-center justify-center rounded-full border-2 border-ink text-xs"
                  style={{ background: ["#0c0c0c", "#fff7ea", "#ff5d5d", "#4ade80"][i], color: ["#FFA000", "#0c0c0c", "#fff", "#0c0c0c"][i] }}
                >
                  {n}
                </motion.span>
              ))}
              <span className="font-display flex h-11 w-11 items-center justify-center rounded-full border-2 border-ink bg-ink text-[10px] text-bite">
                12k+
              </span>
            </div>
            <div className="text-left">
              <div className="flex items-center gap-1">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star key={i} className="h-4 w-4 text-ink" fill="currentColor" />
                ))}
                <span className="ml-1 text-sm font-black text-ink">4.9</span>
              </div>
              <p className="text-xs font-bold text-ink/70">12.400+ avaliações 5 estrelas</p>
            </div>
          </motion.div>
        </div>

        {/* RIGHT — burger */}
        <div className="relative mx-auto w-full max-w-[520px]">
          <motion.div
            initial={{ scale: 0.6, opacity: 0, rotate: -10 }}
            animate={{ scale: 1, opacity: 1, rotate: 0 }}
            transition={{ delay: 2.7, type: "spring", stiffness: 90, damping: 16 }}
            className="relative"
          >
            {/* rotating ring */}
            <div className="animate-spin-slow absolute -inset-5 sm:-inset-8">
              <svg viewBox="0 0 200 200" className="h-full w-full">
                <defs>
                  <path id="circ" d="M100,100 m-84,0 a84,84 0 1,1 168,0 a84,84 0 1,1 -168,0" />
                </defs>
                <text className="fill-ink text-[10.5px] font-black uppercase" style={{ letterSpacing: "3.5px" }}>
                  <textPath href="#circ">
                    BITEUP • BURGERS • FRIES • SHAKES • BITEUP •
                  </textPath>
                </text>
              </svg>
            </div>

            <motion.div style={{ x: burgerX, y: burgerY }} className="animate-float relative">
              <div className="overflow-hidden rounded-[3rem] border-4 border-ink shadow-[0_20px_0_rgba(12,12,12,0.9),0_30px_80px_rgba(12,12,12,0.35)]">
                <motion.img
                  src="/images/hero-burger.jpg"
                  alt="Burger BiteUp flutuante"
                  className="aspect-square w-full object-cover"
                  initial={{ scale: 1.25 }}
                  animate={{ scale: 1 }}
                  transition={{ delay: 2.7, duration: 1.4, ease: [0.22, 1, 0.36, 1] }}
                />
              </div>
              {/* steam */}
              <div className="absolute left-1/2 top-6 flex -translate-x-1/2 gap-3">
                {[0, 1, 2].map((i) => (
                  <span
                    key={i}
                    className="animate-steam block h-10 w-1.5 rounded-full bg-cream/70 blur-[2px]"
                    style={{ animationDelay: `${i * 0.7}s` }}
                  />
                ))}
              </div>
            </motion.div>

            {/* floating chips */}
            <motion.div style={{ x: chipX, y: chipY }} className="absolute inset-0">
              <motion.div
                initial={{ scale: 0, rotate: -20 }}
                animate={{ scale: 1, rotate: 8 }}
                transition={{ delay: 3.2, type: "spring", stiffness: 240, damping: 13 }}
                className="animate-wiggle absolute -left-2 top-8 rounded-2xl border-2 border-ink bg-cream px-4 py-2 shadow-[0_6px_0_#0c0c0c] sm:-left-6"
              >
                <div className="flex items-center gap-1.5 text-xs font-black text-ink">
                  <Flame className="h-4 w-4 text-bite-deep" fill="currentColor" /> DOUBLE BRASA
                </div>
                <div className="font-display text-xl text-ink">
                  {formatBRL(39.9)}{" "}
                  <span className="text-sm text-ink/40 line-through">{formatBRL(44.9)}</span>
                </div>
              </motion.div>

              <motion.div
                initial={{ scale: 0, rotate: 20 }}
                animate={{ scale: 1, rotate: -6 }}
                transition={{ delay: 3.4, type: "spring", stiffness: 240, damping: 13 }}
                className="absolute -right-2 top-1/3 rounded-2xl border-2 border-ink bg-ink px-4 py-2.5 text-bite shadow-[0_6px_0_rgba(12,12,12,0.4)] sm:-right-4"
              >
                <div className="flex items-center gap-1.5">
                  <Bike className="h-5 w-5" />
                  <span className="font-display text-lg">25 MIN</span>
                </div>
                <p className="text-[11px] font-bold uppercase tracking-wider text-cream/70">entrega média</p>
              </motion.div>

              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 3.55, type: "spring", stiffness: 240, damping: 12 }}
                className="absolute -bottom-2 left-6 flex items-center gap-2 rounded-full border-2 border-ink bg-green-400 px-4 py-2 text-ink shadow-[0_6px_0_#0c0c0c]"
              >
                <BadgeCheck className="h-5 w-5" />
                <span className="text-sm font-black">100% ARTESANAL</span>
              </motion.div>

              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 3.7, type: "spring", stiffness: 240, damping: 12 }}
                className="absolute -bottom-4 right-4 flex items-center gap-2 rounded-full border-2 border-ink bg-cream px-4 py-2 text-ink shadow-[0_6px_0_#0c0c0c] sm:right-8"
              >
                <Timer className="h-4 w-4" />
                <span className="text-sm font-black">NA CHAPA AGORA</span>
              </motion.div>
            </motion.div>
          </motion.div>
        </div>
      </div>

      {/* scroll hint */}
      <motion.a
        href="#cardapio"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 4 }}
        className="relative mx-auto mb-6 hidden w-max flex-col items-center gap-1 text-ink lg:flex"
      >
        <span className="text-[11px] font-black uppercase tracking-[0.3em]">Role pra babar</span>
        <motion.span animate={{ y: [0, 8, 0] }} transition={{ repeat: Infinity, duration: 1.4 }}>
          <ArrowDown className="h-5 w-5" strokeWidth={3} />
        </motion.span>
      </motion.a>

      <div className="relative -rotate-1 border-y-4 border-ink bg-ink py-3">
        <Marquee
          fast
          items={["SMASH NA BRASA", "CHEDDAR ESCORRENDO", "BACON CROCANTE", "DELIVERY EM 25 MIN", "COMBOS A PARTIR DE R$ 39,90"]}
          className="font-display text-lg text-bite sm:text-xl"
        />
      </div>
    </section>
  );
}
