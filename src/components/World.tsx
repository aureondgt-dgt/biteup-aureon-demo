import { useEffect, useRef, useState } from "react";
import {
  motion,
  AnimatePresence,
  useScroll,
  useTransform,
  useInView,
  animate,
  type MotionValue,
} from "framer-motion";
import confetti from "canvas-confetti";
import {
  Plus, Minus, Flame, Beef, Egg, Milk, Check, ShoppingBag, Sparkles,
} from "lucide-react";
import { formatBRL } from "../data/menu";
import { useCart } from "../store/cart";
import { SectionHeading, Marquee } from "./chrome";

/* ================= BUILDER ================= */
const SIZES = [
  { id: "single", label: "Single", desc: "1 smash 120g", delta: 0 },
  { id: "double", label: "Double", desc: "2 smashes", delta: 8 },
  { id: "triple", label: "Triple", desc: "3 smashes monstro", delta: 15 },
];
const CHEESES = [
  { id: "cheddar", label: "Cheddar", delta: 0 },
  { id: "provolone", label: "Provolone", delta: 3 },
  { id: "2queijos", label: "2 queijos", delta: 5 },
];
const EXTRAS = [
  { id: "bacon", label: "Bacon crocante", price: 6, icon: Flame },
  { id: "onion", label: "Onion rings", price: 5, icon: Sparkles },
  { id: "egg", label: "Ovo", price: 4, icon: Egg },
  { id: "milk", label: "Cheddar extra", price: 5, icon: Milk },
  { id: "patty", label: "Hambúrguer extra", price: 9, icon: Beef },
];

function Builder() {
  const [size, setSize] = useState("double");
  const [cheese, setCheese] = useState("cheddar");
  const [extras, setExtras] = useState<string[]>(["bacon"]);
  const { addCustom } = useCart();

  const toggle = (id: string) =>
    setExtras((e) => (e.includes(id) ? e.filter((x) => x !== id) : [...e, id]));

  const patties = size === "single" ? 1 : size === "double" ? 2 : 3;
  const sizeDelta = SIZES.find((s) => s.id === size)?.delta ?? 0;
  const cheeseDelta = CHEESES.find((c) => c.id === cheese)?.delta ?? 0;
  const extrasTotal = EXTRAS.filter((e) => extras.includes(e.id)).reduce((a, e) => a + e.price, 0);
  const total = 24.9 + sizeDelta + cheeseDelta + extrasTotal;

  const layers: { key: string; el: React.ReactNode }[] = [];
  if (extras.includes("onion"))
    layers.push({
      key: "onion",
      el: (
        <div className="flex justify-center gap-2">
          {[0, 1, 2].map((i) => (
            <div key={i} className="h-7 w-12 rounded-full border-[3px] border-ink bg-[#e8b04c]" />
          ))}
        </div>
      ),
    });
  if (extras.includes("bacon"))
    layers.push({
      key: "bacon",
      el: (
        <div className="flex justify-center gap-1 px-8">
          {[0, 1, 2, 3].map((i) => (
            <div key={i} className="h-5 w-full rounded-md border-2 border-ink bg-[#b3402e]" style={{ transform: `rotate(${(i % 2 ? -1 : 1) * 4}deg)` }} />
          ))}
        </div>
      ),
    });
  if (extras.includes("milk"))
    layers.push({
      key: "xcheese",
      el: <div className="mx-6 h-5 rounded-md border-2 border-ink bg-[#ffb300] [clip-path:polygon(0_0,100%_0,100%_55%,90%_100%,78%_55%,65%_100%,52%_55%,38%_100%,25%_55%,12%_100%,0_55%)]" />,
    });
  for (let i = 0; i < patties; i++)
    layers.push({
      key: `patty-${i}`,
      el: <div className="mx-4 h-8 rounded-full border-2 border-ink bg-[#6b3a1f] shadow-[inset_0_3px_0_rgba(255,255,255,0.15)]" />,
    });
  if (extras.includes("patty"))
    layers.push({
      key: "patty-x",
      el: <div className="mx-4 h-8 rounded-full border-2 border-ink bg-[#7a4a21]" />,
    });
  layers.push({
    key: "cheese",
    el: (
      <div
        className={`mx-6 h-5 rounded-md border-2 border-ink ${
          cheese === "provolone" ? "bg-[#f5e6c4]" : "bg-[#ff9500]"
        } [clip-path:polygon(0_0,100%_0,100%_55%,90%_100%,78%_55%,65%_100%,52%_55%,38%_100%,25%_55%,12%_100%,0_55%)]`}
      />
    ),
  });
  if (extras.includes("egg"))
    layers.push({
      key: "egg",
      el: (
        <div className="flex justify-center">
          <div className="flex h-9 w-28 items-center justify-center rounded-full border-2 border-ink bg-[#fff7ea]">
            <div className="h-5 w-8 rounded-full border-2 border-ink bg-[#ffb300]" />
          </div>
        </div>
      ),
    });
  layers.push({
    key: "salad",
    el: <div className="mx-5 -mb-1 h-5 rounded-full border-2 border-ink bg-[#4ade80]" style={{ borderRadius: "40% 60% 55% 45% / 100%" }} />,
  });

  const handleAdd = (e: React.MouseEvent) => {
    const rect = (e.currentTarget as HTMLElement).getBoundingClientRect();
    confetti({
      particleCount: 80,
      spread: 100,
      origin: { x: (rect.left + rect.width / 2) / window.innerWidth, y: rect.top / window.innerHeight },
      colors: ["#FFA000", "#0c0c0c", "#4ade80", "#ffffff"],
    });
    const names = [
      SIZES.find((s) => s.id === size)?.label,
      CHEESES.find((c) => c.id === cheese)?.label,
      ...EXTRAS.filter((x) => extras.includes(x.id)).map((x) => x.label),
    ].join(" + ");
    addCustom({
      id: `custom-${Date.now()}`,
      name: "Monstro BiteUp",
      price: total,
      category: "burgers",
      description: `Criação personalizada: ${names}`,
      ingredients: ["Pão brioche", names],
      image: "/images/double-brasa.jpg",
      rating: 5,
      reviews: 1,
      time: "12-18 min",
      calories: "~950 kcal",
    });
  };

  return (
    <div className="grid items-start gap-10 lg:grid-cols-2">
      {/* visual */}
      <div className="relative overflow-hidden rounded-[2rem] border-2 border-ink bg-ink p-6 sm:p-10">
        <div className="halftone-light absolute inset-0" />
        <div className="relative mx-auto max-w-sm">
          <motion.div
            animate={{ y: [0, -6, 0] }}
            transition={{ repeat: Infinity, duration: 3 }}
            className="relative z-10 mx-auto -mb-3 h-24 w-4/5 rounded-t-full border-2 border-ink bg-gradient-to-b from-[#f2b95c] to-[#d98f2e]"
          >
            <div className="absolute inset-x-8 top-5 flex justify-between">
              {[0, 1, 2, 3, 4].map((i) => (
                <span key={i} className="h-2 w-3 rounded-full bg-[#fff7ea]/80" style={{ transform: `rotate(${i * 24}deg)` }} />
              ))}
            </div>
          </motion.div>
          <div className="flex flex-col gap-1.5">
            <AnimatePresence initial={false}>
              {layers.map((l) => (
                <motion.div
                  key={l.key}
                  layout
                  initial={{ opacity: 0, scaleX: 0.4, y: -14 }}
                  animate={{ opacity: 1, scaleX: 1, y: 0 }}
                  exit={{ opacity: 0, scaleX: 0.4, y: 14 }}
                  transition={{ type: "spring", stiffness: 380, damping: 26 }}
                >
                  {l.el}
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
          <div className="mx-auto mt-1 h-10 w-4/5 rounded-b-3xl border-2 border-ink bg-gradient-to-b from-[#e8a04c] to-[#c07a1e]" />
          <div className="mx-auto mt-4 h-4 w-3/5 rounded-full bg-black/60 blur-[6px]" />
        </div>
        <div className="relative mt-6 flex items-center justify-between rounded-2xl border-2 border-bite/40 bg-smoke p-4">
          <div>
            <p className="text-[11px] font-black uppercase tracking-widest text-cream/50">Total da criação</p>
            <AnimatePresence mode="popLayout">
              <motion.p
                key={total}
                initial={{ y: 14, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                exit={{ y: -14, opacity: 0 }}
                className="font-display text-4xl text-bite"
              >
                {formatBRL(total)}
              </motion.p>
            </AnimatePresence>
          </div>
          <motion.button
            onClick={handleAdd}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.92 }}
            className="font-display flex items-center gap-2 rounded-2xl bg-bite px-6 py-4 text-lg text-ink shadow-[0_6px_0_rgba(255,160,0,0.35)]"
          >
            <ShoppingBag className="h-5 w-5" strokeWidth={2.8} /> PEDIR
          </motion.button>
        </div>
      </div>

      {/* controls */}
      <div className="flex flex-col gap-6">
        <div>
          <h4 className="font-display mb-3 flex items-center gap-2 text-xl text-ink">
            <span className="flex h-8 w-8 items-center justify-center rounded-full bg-ink text-sm text-bite">1</span>
            TAMANHO DA FOME
          </h4>
          <div className="grid grid-cols-3 gap-2">
            {SIZES.map((s) => (
              <button
                key={s.id}
                onClick={() => setSize(s.id)}
                className={`rounded-2xl border-2 p-3 text-center transition-all ${
                  size === s.id
                    ? "border-ink bg-ink text-bite shadow-[0_5px_0_rgba(12,12,12,0.4)]"
                    : "border-ink/20 bg-white/60 text-ink hover:border-ink"
                }`}
              >
                <p className="font-display text-lg leading-none">{s.label}</p>
                <p className={`mt-1 text-[11px] font-bold ${size === s.id ? "text-cream/60" : "text-ink/50"}`}>{s.desc}</p>
                <p className={`mt-1 text-xs font-black ${size === s.id ? "text-bite" : "text-bite-deep"}`}>
                  {s.delta === 0 ? "base" : `+${formatBRL(s.delta)}`}
                </p>
              </button>
            ))}
          </div>
        </div>

        <div>
          <h4 className="font-display mb-3 flex items-center gap-2 text-xl text-ink">
            <span className="flex h-8 w-8 items-center justify-center rounded-full bg-ink text-sm text-bite">2</span>
            QUEIJO
          </h4>
          <div className="grid grid-cols-3 gap-2">
            {CHEESES.map((c) => (
              <button
                key={c.id}
                onClick={() => setCheese(c.id)}
                className={`rounded-2xl border-2 p-3 text-center transition-all ${
                  cheese === c.id
                    ? "border-ink bg-bite text-ink shadow-[0_5px_0_#0c0c0c]"
                    : "border-ink/20 bg-white/60 text-ink hover:border-ink"
                }`}
              >
                <p className="font-display text-base leading-none">{c.label}</p>
                <p className="mt-1 text-xs font-black opacity-70">{c.delta === 0 ? "incluso" : `+${formatBRL(c.delta)}`}</p>
              </button>
            ))}
          </div>
        </div>

        <div>
          <h4 className="font-display mb-3 flex items-center gap-2 text-xl text-ink">
            <span className="flex h-8 w-8 items-center justify-center rounded-full bg-ink text-sm text-bite">3</span>
            TURBINE COM EXTRAS
          </h4>
          <div className="flex flex-col gap-2">
            {EXTRAS.map((ex) => {
              const on = extras.includes(ex.id);
              const Icon = ex.icon;
              return (
                <motion.button
                  key={ex.id}
                  onClick={() => toggle(ex.id)}
                  whileTap={{ scale: 0.98 }}
                  className={`flex items-center justify-between rounded-2xl border-2 p-3 transition-all ${
                    on ? "border-ink bg-ink text-cream shadow-[0_5px_0_rgba(12,12,12,0.4)]" : "border-ink/20 bg-white/60 text-ink hover:border-ink"
                  }`}
                >
                  <span className="flex items-center gap-3">
                    <span className={`flex h-10 w-10 items-center justify-center rounded-xl ${on ? "bg-bite text-ink" : "bg-ink/10 text-ink"}`}>
                      <Icon className="h-5 w-5" />
                    </span>
                    <span className="text-left">
                      <span className="block text-sm font-black">{ex.label}</span>
                      <span className={`block text-xs font-bold ${on ? "text-bite" : "text-bite-deep"}`}>+{formatBRL(ex.price)}</span>
                    </span>
                  </span>
                  <span className={`flex h-8 w-8 items-center justify-center rounded-full border-2 ${on ? "border-bite bg-bite text-ink" : "border-ink/20 text-ink/40"}`}>
                    {on ? <Minus className="h-4 w-4" strokeWidth={3} /> : <Plus className="h-4 w-4" strokeWidth={3} />}
                  </span>
                </motion.button>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}

/* ================= MANIFESTO (scroll words) ================= */
const TEXT = "A gente não faz lanche. A gente faz ritual. Pão tostado na manteiga, smash prensado na brasa, cheddar escorrendo sem pedir licença. Cada mordida é um crunch que ecoa. BITEUP: crave, crunch, repeat.";

function Word({ progress, range, children }: { progress: MotionValue<number>; range: [number, number]; children: string }) {
  const opacity = useTransform(progress, range, [0.14, 1]);
  const y = useTransform(progress, range, [8, 0]);
  const hot = ["crunch", "brasa,", "escorrendo", "mordida", "BITEUP:", "crave,", "crunch,", "repeat."].includes(children);
  return (
    <motion.span style={{ opacity, y }} className={hot ? "text-bite" : undefined}>
      {children}{" "}
    </motion.span>
  );
}

function Manifesto() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start 0.85", "end 0.45"] });
  const words = TEXT.split(" ");
  return (
    <div ref={ref} className="mx-auto max-w-4xl">
      <p className="font-display text-3xl leading-snug text-cream sm:text-5xl sm:leading-tight">
        {words.map((w, i) => (
          <Word key={i} progress={scrollYProgress} range={[i / words.length, (i + 1.5) / words.length]}>
            {w}
          </Word>
        ))}
      </p>
    </div>
  );
}

/* ================= STATS ================= */
function Counter({ to, suffix, decimals = 0, label, sub }: { to: number; suffix: string; decimals?: number; label: string; sub: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });
  const [val, setVal] = useState(0);

  useEffect(() => {
    if (!inView) return;
    const controls = animate(0, to, {
      duration: 2,
      ease: [0.22, 1, 0.36, 1],
      onUpdate: (v) => setVal(v),
    });
    return () => controls.stop();
  }, [inView, to]);

  return (
    <div ref={ref} className="text-center">
      <p className="font-display text-5xl text-ink sm:text-6xl">
        {val.toLocaleString("pt-BR", { minimumFractionDigits: decimals, maximumFractionDigits: decimals })}
        <span className="text-ink/70">{suffix}</span>
      </p>
      <p className="mt-1 text-sm font-black uppercase tracking-widest text-ink">{label}</p>
      <p className="text-xs font-bold text-ink/60">{sub}</p>
    </div>
  );
}

export default function World() {
  return (
    <>
      {/* BUILDER */}
      <section id="monte-seu" className="noise relative bg-cream py-20 sm:py-28">
        <div className="halftone absolute inset-0 opacity-40" />
        <div className="relative mx-auto max-w-6xl px-5 sm:px-8">
          <SectionHeading
            dark
            eyebrow="Modo criador"
            title="MONTE SEU"
            highlight="MONSTRO"
            subtitle="Escolhe o tamanho, o queijo e os extras. A gente monta na hora e o preço atualiza ao vivo."
          />
          <div className="mt-12">
            <Builder />
          </div>
          <div className="mt-8 flex items-center justify-center gap-2 text-sm font-bold text-ink/60">
            <Check className="h-4 w-4 text-green-600" strokeWidth={3} />
            Pão brioche tostado na manteiga + salada fresca inclusos em todas as criações
          </div>
        </div>
      </section>

      <div className="rotate-1 border-y-4 border-ink bg-ink py-3">
        <Marquee
          reverse
          items={["MONTE O TEU", "DO TEU JEITO", "SEM MISÉRIA", "CHEDDAR EM DOBRO", "BACON SEMPRE"]}
          className="font-display text-lg text-cream sm:text-xl"
        />
      </div>

      {/* MANIFESTO + STATS */}
      <section id="sobre" className="noise relative overflow-hidden bg-ink py-20 sm:py-28">
        <div className="halftone-light absolute inset-0 opacity-40" />
        <div className="pointer-events-none absolute -left-40 top-1/3 h-[500px] w-[500px] rounded-full bg-bite/10 blur-[130px]" />
        <div className="relative mx-auto max-w-6xl px-5 sm:px-8">
          <SectionHeading
            eyebrow="Manifesto BiteUp"
            title="POR QUE É"
            highlight="INSANO?"
            subtitle="Role devagar e sente o texto ganhando vida — igual a primeira mordida."
          />
          <div className="mt-14">
            <Manifesto />
          </div>

          <div className="mt-16 grid gap-6 sm:grid-cols-3">
            {[
              { t: "Brasa de verdade", d: "Nada de chapa elétrica sem alma. Aqui o smash beija a brasa e ganha aquele defumado que vicia.", n: "01" },
              { t: "Ingrediente nobre", d: "Pão fresco todo dia, carne 100% Angus moída na casa e cheddar inglês de verdade.", n: "02" },
              { t: "Velocidade insana", d: "Do pedido à tua porta em ~25 min. Quente, crocante e com embalagem que dá até dó de abrir.", n: "03" },
            ].map((c, i) => (
              <motion.div
                key={c.n}
                initial={{ opacity: 0, y: 50, rotate: i % 2 ? 2 : -2 }}
                whileInView={{ opacity: 1, y: 0, rotate: i % 2 ? 1 : -1 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{ delay: i * 0.12, type: "spring", stiffness: 120, damping: 16 }}
                whileHover={{ rotate: 0, y: -8 }}
                className="rounded-3xl border-2 border-bite/30 bg-coal p-6"
              >
                <span className="font-display text-5xl text-bite/25">{c.n}</span>
                <h4 className="font-display mt-2 text-2xl text-bite">{c.t}</h4>
                <p className="mt-2 text-sm font-medium leading-relaxed text-cream/65">{c.d}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* STATS */}
      <section className="noise relative overflow-hidden border-y-4 border-ink bg-bite py-14">
        <div className="halftone absolute inset-0 opacity-50" />
        <div className="relative mx-auto grid max-w-6xl grid-cols-2 gap-8 px-5 sm:px-8 lg:grid-cols-4">
          <Counter to={127} suffix="k+" label="Burgers devorados" sub="e contando..." />
          <Counter to={4.9} suffix="" decimals={1} label="Avaliação média" sub="12.400+ reviews" />
          <Counter to={25} suffix="min" label="Entrega média" sub="quente e crocante" />
          <Counter to={98} suffix="%" label="Pedem de novo" sub="vício comprovado" />
        </div>
      </section>
    </>
  );
}
