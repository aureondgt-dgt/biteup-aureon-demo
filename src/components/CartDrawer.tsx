import { useMemo, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import confetti from "canvas-confetti";
import {
  X, Plus, Minus, Trash2, ShoppingBag, Bike, MapPin, User, CreditCard,
  Banknote, QrCode, Check, ChevronLeft, PartyPopper, Star,
} from "lucide-react";
import { useCart } from "../store/cart";
import { formatBRL } from "../data/menu";

const FREE_OVER = 50;
const FEE = 5.9;

export default function CartDrawer() {
  const { items, subtotal, isOpen, setOpen, setQty, remove, clear } = useCart();
  const [step, setStep] = useState<"cart" | "form" | "done">("cart");
  const [name, setName] = useState("");
  const [address, setAddress] = useState("");
  const [pay, setPay] = useState("pix");
  const [orderNum] = useState(() => Math.floor(1000 + Math.random() * 9000));

  const free = subtotal >= FREE_OVER;
  const total = subtotal + (items.length === 0 || free ? 0 : FEE);
  const progress = Math.min(100, (subtotal / FREE_OVER) * 100);

  const waLink = useMemo(() => {
    const lines = items.map((i) => `• ${i.qty}x ${i.product.name} — ${formatBRL(i.product.price * i.qty)}`);
    const payLabel = pay === "pix" ? "Pix" : pay === "card" ? "Cartão" : "Dinheiro";
    const msg = `*PEDIDO BITEUP #${orderNum}*\n\n${lines.join("\n")}\n\nSubtotal: ${formatBRL(subtotal)}\nEntrega: ${free ? "GRÁTIS" : formatBRL(FEE)}\n*Total: ${formatBRL(total)}*\n\nNome: ${name}\nEndereço: ${address}\nPagamento: ${payLabel}`;
    return `https://wa.me/5511940404040?text=${encodeURIComponent(msg)}`;
  }, [items, subtotal, total, free, name, address, pay, orderNum]);

  const finish = () => {
    if (!name.trim() || !address.trim()) return;
    setStep("done");
    confetti({ particleCount: 140, spread: 110, origin: { y: 0.6 }, colors: ["#FFA000", "#4ade80", "#ffffff", "#0c0c0c"] });
    setTimeout(() => confetti({ particleCount: 60, angle: 60, spread: 60, origin: { x: 0, y: 0.7 } }), 300);
    setTimeout(() => confetti({ particleCount: 60, angle: 120, spread: 60, origin: { x: 1, y: 0.7 } }), 450);
  };

  const close = () => {
    setOpen(false);
    setTimeout(() => {
      if (step === "done") {
        clear();
        setStep("cart");
      }
    }, 400);
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={close}
            className="fixed inset-0 z-[85] bg-ink/70 backdrop-blur-sm"
          />
          <motion.aside
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", stiffness: 300, damping: 32 }}
            className="fixed right-0 top-0 z-[86] flex h-full w-full max-w-md flex-col bg-ink"
          >
            {/* header */}
            <div className="flex items-center justify-between border-b-2 border-cream/10 bg-coal p-5">
              <div className="flex items-center gap-3">
                {step === "form" && (
                  <button onClick={() => setStep("cart")} aria-label="Voltar" className="flex h-9 w-9 items-center justify-center rounded-full bg-cream/10 text-cream">
                    <ChevronLeft className="h-5 w-5" strokeWidth={3} />
                  </button>
                )}
                <h3 className="font-display text-2xl text-cream">
                  {step === "cart" && <>SEU <span className="text-bite">PEDIDO</span></>}
                  {step === "form" && <>ONDE <span className="text-bite">ENTREGAR?</span></>}
                  {step === "done" && <><span className="text-bite">PEDIDO</span> FEITO!</>}
                </h3>
              </div>
              <button onClick={close} aria-label="Fechar" className="flex h-10 w-10 items-center justify-center rounded-xl border-2 border-cream/15 text-cream transition-colors hover:border-bite hover:text-bite">
                <X className="h-5 w-5" strokeWidth={3} />
              </button>
            </div>

            {/* free delivery bar */}
            {step === "cart" && items.length > 0 && (
              <div className="border-b-2 border-cream/10 bg-coal/60 px-5 py-3">
                <div className="flex items-center gap-2 text-xs font-black">
                  <Bike className={`h-4 w-4 ${free ? "text-green-400" : "text-bite"}`} />
                  {free ? (
                    <span className="text-green-400">TU GANHOU ENTREGA GRÁTIS!</span>
                  ) : (
                    <span className="text-cream/80">
                      Faltam <span className="text-bite">{formatBRL(FREE_OVER - subtotal)}</span> pra entrega grátis
                    </span>
                  )}
                </div>
                <div className="mt-2 h-2.5 overflow-hidden rounded-full bg-smoke">
                  <motion.div
                    animate={{ width: `${progress}%` }}
                    transition={{ type: "spring", stiffness: 120, damping: 20 }}
                    className={`h-full rounded-full ${free ? "bg-green-400" : "bg-gradient-to-r from-bite-deep to-bite"}`}
                  />
                </div>
              </div>
            )}

            {/* BODY */}
            <div className="flex-1 overflow-y-auto p-5">
              {step === "cart" && (
                <>
                  {items.length === 0 ? (
                    <div className="flex h-full flex-col items-center justify-center text-center">
                      <motion.div
                        animate={{ rotate: [0, -8, 8, 0] }}
                        transition={{ repeat: Infinity, duration: 2.5 }}
                        className="flex h-24 w-24 items-center justify-center rounded-3xl border-2 border-cream/15 bg-coal"
                      >
                        <ShoppingBag className="h-10 w-10 text-bite" />
                      </motion.div>
                      <p className="font-display mt-5 text-2xl text-cream">CARRINHO VAZIO...</p>
                      <p className="mt-1 max-w-[240px] text-sm font-medium text-cream/50">
                        A fome tá chamando e a chapa tá quente. Bora resolver isso?
                      </p>
                      <button
                        onClick={close}
                        className="font-display mt-6 rounded-2xl bg-bite px-8 py-3.5 text-lg text-ink"
                      >
                        VER CARDÁPIO
                      </button>
                    </div>
                  ) : (
                    <div className="flex flex-col gap-3">
                      <AnimatePresence initial={false}>
                        {items.map((i) => (
                          <motion.div
                            key={i.product.id}
                            layout
                            initial={{ opacity: 0, x: 60 }}
                            animate={{ opacity: 1, x: 0 }}
                            exit={{ opacity: 0, x: 80, height: 0, marginBottom: 0, overflow: "hidden" }}
                            className="flex gap-3 rounded-2xl border-2 border-cream/10 bg-coal p-3"
                          >
                            <img src={i.product.image} alt={i.product.name} className="h-20 w-20 shrink-0 rounded-xl border-2 border-ink object-cover" />
                            <div className="flex min-w-0 flex-1 flex-col">
                              <div className="flex items-start justify-between gap-2">
                                <p className="font-display truncate text-base text-cream">{i.product.name}</p>
                                <button onClick={() => remove(i.product.id)} aria-label="Remover" className="text-cream/30 transition-colors hover:text-red-400">
                                  <Trash2 className="h-4 w-4" />
                                </button>
                              </div>
                              <p className="text-xs font-bold text-bite">{formatBRL(i.product.price)}</p>
                              <div className="mt-auto flex items-center justify-between pt-2">
                                <div className="flex items-center gap-2">
                                  <button onClick={() => setQty(i.product.id, i.qty - 1)} aria-label="Diminuir" className="flex h-7 w-7 items-center justify-center rounded-lg bg-smoke text-cream transition-colors hover:bg-bite hover:text-ink">
                                    <Minus className="h-3.5 w-3.5" strokeWidth={3.5} />
                                  </button>
                                  <motion.span key={i.qty} initial={{ scale: 0.5 }} animate={{ scale: 1 }} className="w-5 text-center text-sm font-black text-cream">
                                    {i.qty}
                                  </motion.span>
                                  <button onClick={() => setQty(i.product.id, i.qty + 1)} aria-label="Aumentar" className="flex h-7 w-7 items-center justify-center rounded-lg bg-smoke text-cream transition-colors hover:bg-bite hover:text-ink">
                                    <Plus className="h-3.5 w-3.5" strokeWidth={3.5} />
                                  </button>
                                </div>
                                <p className="font-display text-base text-cream">{formatBRL(i.product.price * i.qty)}</p>
                              </div>
                            </div>
                          </motion.div>
                        ))}
                      </AnimatePresence>
                      <button onClick={clear} className="mx-auto mt-1 text-xs font-bold text-cream/35 underline-offset-2 hover:text-red-400 hover:underline">
                        limpar tudo
                      </button>
                    </div>
                  )}
                </>
              )}

              {step === "form" && (
                <motion.div initial={{ opacity: 0, x: 40 }} animate={{ opacity: 1, x: 0 }} className="flex flex-col gap-4">
                  <label className="block">
                    <span className="mb-1.5 flex items-center gap-1.5 text-xs font-black uppercase tracking-widest text-cream/60">
                      <User className="h-3.5 w-3.5" /> Teu nome
                    </span>
                    <input
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      placeholder="Ex: Maria Faminta"
                      className="w-full rounded-2xl border-2 border-cream/15 bg-coal px-4 py-3.5 text-sm font-bold text-cream placeholder:text-cream/25 focus:border-bite"
                    />
                  </label>
                  <label className="block">
                    <span className="mb-1.5 flex items-center gap-1.5 text-xs font-black uppercase tracking-widest text-cream/60">
                      <MapPin className="h-3.5 w-3.5" /> Endereço de entrega
                    </span>
                    <textarea
                      value={address}
                      onChange={(e) => setAddress(e.target.value)}
                      placeholder="Rua, número, complemento, bairro..."
                      rows={3}
                      className="w-full resize-none rounded-2xl border-2 border-cream/15 bg-coal px-4 py-3.5 text-sm font-bold text-cream placeholder:text-cream/25 focus:border-bite"
                    />
                  </label>
                  <div>
                    <span className="mb-1.5 flex items-center gap-1.5 text-xs font-black uppercase tracking-widest text-cream/60">
                      <CreditCard className="h-3.5 w-3.5" /> Pagamento
                    </span>
                    <div className="grid grid-cols-3 gap-2">
                      {[
                        { id: "pix", label: "Pix", icon: QrCode },
                        { id: "card", label: "Cartão", icon: CreditCard },
                        { id: "cash", label: "Dinheiro", icon: Banknote },
                      ].map((p) => (
                        <button
                          key={p.id}
                          onClick={() => setPay(p.id)}
                          className={`flex flex-col items-center gap-1.5 rounded-2xl border-2 py-3.5 text-xs font-black transition-all ${
                            pay === p.id ? "border-bite bg-bite/15 text-bite" : "border-cream/15 text-cream/50 hover:border-cream/30"
                          }`}
                        >
                          <p.icon className="h-5 w-5" />
                          {p.label}
                        </button>
                      ))}
                    </div>
                  </div>
                  <div className="rounded-2xl border-2 border-bite/30 bg-bite/5 p-4 text-sm font-bold text-cream/70">
                    <div className="flex justify-between"><span>Subtotal</span><span>{formatBRL(subtotal)}</span></div>
                    <div className="mt-1 flex justify-between">
                      <span>Entrega</span>
                      <span className={free ? "text-green-400" : ""}>{free ? "GRÁTIS" : formatBRL(FEE)}</span>
                    </div>
                    <div className="font-display mt-2 flex justify-between border-t border-cream/10 pt-2 text-xl text-bite">
                      <span>TOTAL</span><span>{formatBRL(total)}</span>
                    </div>
                  </div>
                </motion.div>
              )}

              {step === "done" && (
                <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} className="flex h-full flex-col items-center justify-center text-center">
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ type: "spring", stiffness: 220, damping: 12, delay: 0.1 }}
                    className="flex h-24 w-24 items-center justify-center rounded-full border-4 border-ink bg-green-400 shadow-[0_10px_0_rgba(74,222,128,0.3)]"
                  >
                    <Check className="h-12 w-12 text-ink" strokeWidth={3.5} />
                  </motion.div>
                  <p className="font-display mt-6 text-3xl text-cream">
                    PEDIDO <span className="text-bite">#{orderNum}</span>
                  </p>
                  <p className="mt-2 max-w-[280px] text-sm font-medium text-cream/60">
                    Valeu, <span className="font-black text-cream">{name || "faminto(a)"}</span>! Toca no
                    botão pra confirmar no WhatsApp — a chapa já vai acender.
                  </p>
                  <div className="mt-4 flex items-center gap-1.5 rounded-full bg-bite/15 px-4 py-2 text-xs font-black text-bite">
                    <Star className="h-4 w-4" fill="currentColor" /> Total: {formatBRL(total)}
                  </div>
                  <a
                    href={waLink}
                    target="_blank"
                    rel="noreferrer"
                    className="mt-6 flex w-full items-center justify-center gap-2 rounded-2xl bg-green-500 px-6 py-4 text-lg font-black text-white"
                  >
                    <PartyPopper className="h-6 w-6" /> CONFIRMAR NO WHATSAPP
                  </a>
                  <button onClick={close} className="mt-3 text-sm font-bold text-cream/40 hover:text-cream">
                    fechar e voltar pro site
                  </button>
                </motion.div>
              )}
            </div>

            {/* footer */}
            {step === "cart" && items.length > 0 && (
              <div className="border-t-2 border-cream/10 bg-coal p-5">
                <div className="flex justify-between text-sm font-bold text-cream/60">
                  <span>Subtotal</span><span>{formatBRL(subtotal)}</span>
                </div>
                <div className="mt-1 flex justify-between text-sm font-bold text-cream/60">
                  <span>Entrega</span>
                  <span className={free ? "font-black text-green-400" : ""}>{free ? "GRÁTIS" : formatBRL(FEE)}</span>
                </div>
                <motion.button
                  onClick={() => setStep("form")}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.97 }}
                  className="font-display mt-4 flex w-full items-center justify-center gap-2 rounded-2xl bg-bite py-4 text-xl text-ink shadow-[0_6px_0_rgba(255,160,0,0.35)]"
                >
                  CONTINUAR · {formatBRL(total)}
                </motion.button>
              </div>
            )}
            {step === "form" && (
              <div className="border-t-2 border-cream/10 bg-coal p-5">
                <motion.button
                  onClick={finish}
                  disabled={!name.trim() || !address.trim()}
                  whileTap={{ scale: 0.97 }}
                  className={`font-display flex w-full items-center justify-center gap-2 rounded-2xl py-4 text-xl transition-all ${
                    !name.trim() || !address.trim()
                      ? "cursor-not-allowed bg-smoke text-cream/30"
                      : "bg-bite text-ink shadow-[0_6px_0_rgba(255,160,0,0.35)]"
                  }`}
                >
                  <Check className="h-6 w-6" strokeWidth={3} /> FINALIZAR PEDIDO
                </motion.button>
                {(!name.trim() || !address.trim()) && (
                  <p className="mt-2 text-center text-xs font-bold text-cream/40">preenche nome + endereço pra continuar</p>
                )}
              </div>
            )}
          </motion.aside>
        </>
      )}
    </AnimatePresence>
  );
}
