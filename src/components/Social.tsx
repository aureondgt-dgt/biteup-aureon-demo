import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Star, Quote, ChevronLeft, ChevronRight, MapPin, Clock, Phone, Bike,
  Camera, AtSign, Send, Plus, Flame, MessageCircle,
} from "lucide-react";
import { TESTIMONIALS } from "../data/menu";
import { SectionHeading, Marquee, Magnetic } from "./chrome";

/* ================= REVIEWS ================= */
function Reviews() {
  const [index, setIndex] = useState(0);
  const [dir, setDir] = useState(1);
  const timer = useRef<number | null>(null);

  const go = (d: number) => {
    setDir(d);
    setIndex((i) => (i + d + TESTIMONIALS.length) % TESTIMONIALS.length);
  };

  useEffect(() => {
    timer.current = window.setInterval(() => go(1), 5000);
    return () => {
      if (timer.current) clearInterval(timer.current);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [index]);

  const t = TESTIMONIALS[index];

  return (
    <div className="relative mx-auto mt-12 max-w-3xl">
      <Quote className="absolute -top-8 left-1/2 h-16 w-16 -translate-x-1/2 text-bite" fill="currentColor" />
      <div className="overflow-hidden rounded-[2rem] border-2 border-cream/10 bg-coal p-8 pt-12 text-center sm:p-12 sm:pt-14">
        <AnimatePresence mode="wait" custom={dir}>
          <motion.div
            key={index}
            custom={dir}
            initial={{ opacity: 0, x: dir * 120 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: dir * -120 }}
            transition={{ type: "spring", stiffness: 220, damping: 24 }}
          >
            <div className="flex justify-center gap-1">
              {Array.from({ length: t.stars }).map((_, i) => (
                <motion.span key={i} initial={{ scale: 0, rotate: -30 }} animate={{ scale: 1, rotate: 0 }} transition={{ delay: 0.15 + i * 0.08, type: "spring", stiffness: 300, damping: 12 }}>
                  <Star className="h-6 w-6 text-bite" fill="currentColor" />
                </motion.span>
              ))}
            </div>
            <p className="mx-auto mt-5 max-w-xl text-lg font-medium leading-relaxed text-cream sm:text-xl">
              “{t.text}”
            </p>
            <div className="mt-6 flex items-center justify-center gap-3">
              <span
                className="font-display flex h-12 w-12 items-center justify-center rounded-full border-2 border-ink text-sm"
                style={{ background: t.color, color: "#0c0c0c" }}
              >
                {t.initials}
              </span>
              <span className="text-left">
                <span className="block text-sm font-black text-cream">{t.name}</span>
                <span className="block text-xs font-bold text-bite">{t.role}</span>
              </span>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>

      <div className="mt-6 flex items-center justify-center gap-4">
        <button
          onClick={() => go(-1)}
          aria-label="Anterior"
          className="flex h-12 w-12 items-center justify-center rounded-full border-2 border-bite text-bite transition-all hover:bg-bite hover:text-ink active:scale-90"
        >
          <ChevronLeft className="h-6 w-6" strokeWidth={3} />
        </button>
        <div className="flex gap-2">
          {TESTIMONIALS.map((_, i) => (
            <button
              key={i}
              onClick={() => { setDir(i > index ? 1 : -1); setIndex(i); }}
              aria-label={`Depoimento ${i + 1}`}
              className={`h-3 rounded-full transition-all ${i === index ? "w-10 bg-bite" : "w-3 bg-cream/25 hover:bg-cream/50"}`}
            />
          ))}
        </div>
        <button
          onClick={() => go(1)}
          aria-label="Próximo"
          className="flex h-12 w-12 items-center justify-center rounded-full border-2 border-bite text-bite transition-all hover:bg-bite hover:text-ink active:scale-90"
        >
          <ChevronRight className="h-6 w-6" strokeWidth={3} />
        </button>
      </div>
    </div>
  );
}

/* ================= FAQ ================= */
const FAQS = [
  { q: "Qual o tempo médio de entrega?", a: "Em média 25 minutos num raio de 5km. Nos horários de pico (19h–21h) pode chegar a 40 min — mas sempre chega quente, prometido." },
  { q: "Vocês têm opção sem carne?", a: "Ainda não no cardápio fixo, mas no 'Monte seu Monstro' dá pra criar versões vegetarianas caprichadas. Novidades veggie chegando em breve!" },
  { q: "Qual o valor da entrega?", a: "R$ 5,90 para pedidos até R$ 49,99. Acima de R$ 50,00 a entrega é POR NOSSA CONTA. Combo Nobre + batata já garante frete grátis." },
  { q: "Quais formas de pagamento?", a: "Pix, cartão de crédito/débito na entrega e dinheiro (com troco). No checkout do site tu escolhe e já manda tudo pronto no WhatsApp." },
  { q: "Fazem festa e eventos?", a: "SIM! Burger truck e chapa ao vivo pra aniversários, casamentos e eventos corporativos. Chama no WhatsApp que a gente monta um pacote insano." },
];

function Faq() {
  const [open, setOpen] = useState<number | null>(0);
  return (
    <div className="flex flex-col gap-3">
      {FAQS.map((f, i) => {
        const isOpen = open === i;
        return (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.06 }}
            className={`overflow-hidden rounded-2xl border-2 transition-colors ${isOpen ? "border-bite bg-coal" : "border-cream/10 bg-coal/60 hover:border-cream/25"}`}
          >
            <button onClick={() => setOpen(isOpen ? null : i)} className="flex w-full items-center justify-between gap-4 p-5 text-left">
              <span className="font-display text-lg text-cream sm:text-xl">{f.q}</span>
              <motion.span
                animate={{ rotate: isOpen ? 45 : 0 }}
                className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-full ${isOpen ? "bg-bite text-ink" : "bg-cream/10 text-bite"}`}
              >
                <Plus className="h-5 w-5" strokeWidth={3} />
              </motion.span>
            </button>
            <AnimatePresence initial={false}>
              {isOpen && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
                >
                  <p className="px-5 pb-5 text-sm font-medium leading-relaxed text-cream/65">{f.a}</p>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        );
      })}
    </div>
  );
}

/* ================= LOCATION ================= */
function isOpenNow() {
  const h = new Date().getHours();
  return h >= 18 && h < 23;
}

export default function Social() {
  const open = isOpenNow();

  return (
    <>
      {/* REVIEWS */}
      <section id="avaliacoes" className="noise relative bg-ink py-20 sm:py-28">
        <div className="halftone-light absolute inset-0 opacity-40" />
        <div className="relative mx-auto max-w-6xl px-5 sm:px-8">
          <SectionHeading
            eyebrow="Quem prova, volta"
            title="12 MIL MOTIVOS"
            highlight="PRA MORDER"
            subtitle="Avaliação 4.9 em mais de 12 mil pedidos. O povo falou — e falou alto."
          />
          <Reviews />

          {/* strip of mini reviews */}
          <div className="no-scrollbar mt-10 flex gap-4 overflow-x-auto pb-4">
            {[
              { n: "@camila.eats", txt: "o cheddar escorrendo é surreal 🤤", s: 5 },
              { n: "@diegofitcheat", txt: "dia do lixo oficial é na BiteUp", s: 5 },
              { n: "@jucastro", txt: "chegou em 20min, quente demais!", s: 5 },
              { n: "@rafa.burger", txt: "BBQ Supreme = melhor da cidade", s: 5 },
              { n: "@bia.lima", txt: "sextou com combo nobre, tradição", s: 5 },
              { n: "@pedro.h", txt: "atendimento nota 1000", s: 5 },
            ].map((r, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.07 }}
                whileHover={{ y: -6, rotate: -1 }}
                className="w-60 shrink-0 rounded-2xl border-2 border-cream/10 bg-smoke p-4"
              >
                <p className="text-xs font-black text-bite">{r.n}</p>
                <p className="mt-1 text-sm font-semibold text-cream/85">{r.txt}</p>
                <div className="mt-2 flex gap-0.5">
                  {Array.from({ length: r.s }).map((_, j) => (
                    <Star key={j} className="h-3 w-3 text-bite" fill="currentColor" />
                  ))}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* LOCATION + FAQ */}
      <section id="contato" className="noise relative bg-coal py-20 sm:py-28">
        <div className="halftone-light absolute inset-0 opacity-30" />
        <div className="relative mx-auto max-w-6xl px-5 sm:px-8">
          <SectionHeading
            eyebrow="Vem buscar ou chama"
            title="ONDE A BRASA"
            highlight="ACONTECE"
            subtitle="Loja física, delivery rapidão e WhatsApp sempre ligado."
          />

          <div className="mt-12 grid gap-6 lg:grid-cols-2">
            <div className="flex flex-col gap-4">
              <motion.div
                initial={{ opacity: 0, x: -40 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                className="overflow-hidden rounded-3xl border-2 border-bite/30"
              >
                {/* stylized map */}
                <div className="relative h-64 bg-ink sm:h-72">
                  <div
                    className="absolute inset-0 opacity-40"
                    style={{
                      backgroundImage:
                        "linear-gradient(rgba(255,160,0,0.25) 2px, transparent 2px), linear-gradient(90deg, rgba(255,160,0,0.25) 2px, transparent 2px)",
                      backgroundSize: "44px 44px",
                    }}
                  />
                  <svg className="absolute inset-0 h-full w-full" preserveAspectRatio="none" viewBox="0 0 400 260">
                    <motion.path
                      d="M-10 200 C 80 180, 120 120, 200 130 S 330 90, 410 110"
                      stroke="#FFA000"
                      strokeWidth="10"
                      fill="none"
                      strokeLinecap="round"
                      initial={{ pathLength: 0 }}
                      whileInView={{ pathLength: 1 }}
                      viewport={{ once: true }}
                      transition={{ duration: 1.6, ease: "easeOut" }}
                    />
                    <motion.path
                      d="M60 -10 C 70 80, 40 160, 90 270"
                      stroke="#333"
                      strokeWidth="14"
                      fill="none"
                      strokeLinecap="round"
                    />
                  </svg>
                  <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
                    <span className="absolute -inset-6 animate-ping rounded-full bg-bite/25" />
                    <motion.div
                      animate={{ y: [0, -10, 0] }}
                      transition={{ repeat: Infinity, duration: 1.8 }}
                      className="relative flex h-14 w-14 items-center justify-center rounded-full border-2 border-ink bg-bite shadow-[0_8px_0_#0c0c0c]"
                    >
                      <MapPin className="h-7 w-7 text-ink" fill="currentColor" />
                    </motion.div>
                  </div>
                  <div className="absolute bottom-3 left-3 rounded-xl border-2 border-ink bg-cream px-3 py-1.5 text-xs font-black text-ink">
                    Rua da Brasa, 404 — Centro
                  </div>
                  <div className={`absolute right-3 top-3 flex items-center gap-1.5 rounded-full px-3 py-1.5 text-xs font-black ${open ? "bg-green-400 text-ink" : "bg-red-500 text-white"}`}>
                    <span className="h-2 w-2 rounded-full bg-current" />
                    {open ? "ABERTO AGORA" : "FECHADO · ABRE 18H"}
                  </div>
                </div>
              </motion.div>

              <div className="grid gap-4 sm:grid-cols-3">
                {[
                  { icon: Clock, t: "Horário", d: "Ter–Dom · 18h às 23h", d2: "Seg: chapa descansando" },
                  { icon: Bike, t: "Delivery", d: "~25 min · raio 5km", d2: "Grátis acima de R$ 50" },
                  { icon: Phone, t: "WhatsApp", d: "(11) 94040-4040", d2: "liga ou chama" },
                ].map((c, i) => (
                  <motion.div
                    key={c.t}
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.1 }}
                    whileHover={{ y: -6 }}
                    className="rounded-2xl border-2 border-cream/10 bg-ink p-4 text-center"
                  >
                    <span className="mx-auto flex h-11 w-11 items-center justify-center rounded-xl bg-bite text-ink">
                      <c.icon className="h-5 w-5" strokeWidth={2.6} />
                    </span>
                    <p className="font-display mt-2 text-base text-cream">{c.t}</p>
                    <p className="mt-1 text-xs font-black text-bite">{c.d}</p>
                    <p className="text-[11px] font-bold text-cream/50">{c.d2}</p>
                  </motion.div>
                ))}
              </div>

              <motion.a
                href="https://wa.me/5511940404040?text=Ol%C3%A1!%20Quero%20pedir%20na%20BITEUP!"
                target="_blank"
                rel="noreferrer"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.97 }}
                className="flex items-center justify-center gap-2 rounded-2xl bg-green-500 px-6 py-4 text-lg font-black text-white shadow-[0_6px_0_rgba(34,197,94,0.35)]"
              >
                <MessageCircle className="h-6 w-6" /> CHAMAR NO WHATSAPP
              </motion.a>
            </div>

            <div>
              <h3 className="font-display mb-4 text-2xl text-cream">
                PERGUNTAS <span className="text-bite">FREQUENTES</span>
              </h3>
              <Faq />
            </div>
          </div>
        </div>
      </section>

      {/* BIG CTA */}
      <section className="noise relative overflow-hidden bg-bite py-20 sm:py-24">
        <div className="halftone absolute inset-0 opacity-60" />
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ repeat: Infinity, duration: 30, ease: "linear" }}
          className="pointer-events-none absolute -left-20 -top-20 h-72 w-72 rounded-full border-[30px] border-ink/10"
        />
        <motion.div
          animate={{ rotate: -360 }}
          transition={{ repeat: Infinity, duration: 36, ease: "linear" }}
          className="pointer-events-none absolute -bottom-24 -right-16 h-80 w-80 rounded-full border-[36px] border-ink/10"
        />
        <div className="relative mx-auto max-w-4xl px-5 text-center sm:px-8">
          <motion.div
            initial={{ scale: 0, rotate: -20 }}
            whileInView={{ scale: 1, rotate: 6 }}
            viewport={{ once: true }}
            transition={{ type: "spring", stiffness: 200, damping: 12 }}
            className="animate-flame mx-auto flex h-20 w-20 items-center justify-center rounded-3xl border-2 border-ink bg-ink"
          >
            <Flame className="h-10 w-10 text-bite" fill="currentColor" />
          </motion.div>
          <motion.h2
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="font-display mt-6 text-5xl leading-[0.95] text-ink sm:text-7xl"
          >
            BATEU A FOME?
            <br />
            NÃO PIRA. <span className="text-cream [-webkit-text-stroke:2px_#0c0c0c] [text-shadow:4px_4px_0_#0c0c0c]">PEDE.</span>
          </motion.h2>
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="font-hand mt-4 text-3xl text-ink/70"
          >
            a chapa já tá quente te esperando...
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3 }}
            className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row"
          >
            <Magnetic>
              <a href="#cardapio" className="font-display inline-block rounded-2xl border-2 border-ink bg-ink px-10 py-5 text-2xl text-bite shadow-[0_10px_0_rgba(12,12,12,0.4)] transition-transform hover:-translate-y-1">
                PEDIR AGORA
              </a>
            </Magnetic>
            <span className="text-sm font-black uppercase tracking-widest text-ink/60">ou</span>
            <a href="#monte-seu" className="font-display rounded-2xl border-2 border-ink bg-cream/70 px-8 py-4 text-xl text-ink backdrop-blur transition-all hover:bg-cream">
              CRIAR MEU BURGER
            </a>
          </motion.div>
        </div>
      </section>

      <div className="-rotate-1 border-y-4 border-ink bg-ink py-3">
        <Marquee
          fast
          items={["CRAVE", "CRUNCH", "REPEAT", "BITEUP", "DESDE 2019"]}
          className="font-display text-xl text-bite"
        />
      </div>

      {/* FOOTER */}
      <footer className="noise relative bg-ink pb-10 pt-16">
        <div className="mx-auto max-w-6xl px-5 sm:px-8">
          <div className="grid gap-10 md:grid-cols-[1.3fr_1fr_1fr]">
            <div>
              <a href="#topo" className="font-display text-4xl text-bite">
                BITE<span className="text-cream">UP</span>
              </a>
              <p className="font-hand mt-1 text-2xl text-cream/50">Crave. Crunch. Repeat.</p>
              <p className="mt-4 max-w-xs text-sm font-medium text-cream/55">
                Burgers artesanais na brasa desde 2019. Rua da Brasa, 404 — Centro.
                Ter–Dom, 18h às 23h.
              </p>
              <div className="mt-5 flex gap-3">
                {[
                  { icon: Camera, label: "Instagram" },
                  { icon: AtSign, label: "Threads" },
                  { icon: Send, label: "Telegram" },
                ].map((s) => (
                  <motion.a
                    key={s.label}
                    href="#topo"
                    aria-label={s.label}
                    whileHover={{ y: -4, rotate: -6 }}
                    className="flex h-11 w-11 items-center justify-center rounded-xl border-2 border-bite/40 text-bite transition-colors hover:border-bite hover:bg-bite hover:text-ink"
                  >
                    <s.icon className="h-5 w-5" />
                  </motion.a>
                ))}
              </div>
            </div>
            <div>
              <h5 className="text-xs font-black uppercase tracking-[0.25em] text-bite">Navega</h5>
              <ul className="mt-4 flex flex-col gap-2.5">
                {[
                  ["#cardapio", "Cardápio completo"],
                  ["#monte-seu", "Monte seu monstro"],
                  ["#sobre", "Manifesto"],
                  ["#avaliacoes", "Avaliações"],
                  ["#contato", "Contato & delivery"],
                ].map(([href, label]) => (
                  <li key={href}>
                    <a href={href} className="text-sm font-bold text-cream/65 transition-colors hover:text-bite">
                      {label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h5 className="text-xs font-black uppercase tracking-[0.25em] text-bite">Clube BiteUp</h5>
              <p className="mt-4 text-sm font-medium text-cream/55">
                Promo exclusiva toda sexta no teu e-mail. Sem spam, só burger.
              </p>
              <Newsletter />
            </div>
          </div>

          <div className="font-display mt-14 select-none overflow-hidden text-center text-[16.5vw] leading-none text-cream/[0.06] md:text-[11rem]">
            BITEUP
          </div>

          <div className="mt-6 flex flex-col items-center justify-between gap-3 border-t border-cream/10 pt-6 text-xs font-bold text-cream/40 sm:flex-row">
            <p>© 2026 BITEUP Burgers · Todos os direitos reservados</p>
            <p className="flex items-center gap-1.5">
              Feito com <Flame className="h-3.5 w-3.5 text-bite" fill="currentColor" /> e muito cheddar
            </p>
          </div>
        </div>
      </footer>
    </>
  );
}

function Newsletter() {
  const [email, setEmail] = useState("");
  const [done, setDone] = useState(false);
  return done ? (
    <motion.p
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      className="mt-4 rounded-2xl border-2 border-green-400 bg-green-400/10 p-4 text-sm font-black text-green-400"
    >
      Tu tá dentro! Primeira promo chega sexta.
    </motion.p>
  ) : (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        if (email.includes("@")) setDone(true);
      }}
      className="mt-4 flex gap-2"
    >
      <input
        type="email"
        required
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="teu@email.com"
        className="w-full min-w-0 rounded-xl border-2 border-cream/15 bg-smoke px-4 py-3 text-sm font-bold text-cream placeholder:text-cream/30 focus:border-bite"
      />
      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.92 }}
        className="shrink-0 rounded-xl bg-bite px-5 py-3 text-sm font-black uppercase text-ink"
      >
        Entrar
      </motion.button>
    </form>
  );
}
