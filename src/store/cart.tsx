import { createContext, useContext, useEffect, useMemo, useState, type ReactNode } from "react";
import type { Product } from "../data/menu";
import { PRODUCTS } from "../data/menu";

export interface CartItem {
  product: Product;
  qty: number;
  note?: string;
}

interface Toast {
  id: number;
  message: string;
  image?: string;
}

interface CartContextType {
  items: CartItem[];
  count: number;
  subtotal: number;
  isOpen: boolean;
  toasts: Toast[];
  favorites: string[];
  setOpen: (v: boolean) => void;
  add: (id: string, qty?: number) => void;
  addCustom: (product: Product) => void;
  remove: (id: string) => void;
  setQty: (id: string, qty: number) => void;
  clear: () => void;
  toggleFav: (id: string) => void;
  lastAdded: number;
}

const CartContext = createContext<CartContextType | null>(null);

export function CartProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useState<CartItem[]>(() => {
    try {
      const raw = localStorage.getItem("biteup-cart");
      if (!raw) return [];
      const parsed: { id: string; qty: number }[] = JSON.parse(raw);
      return parsed
        .map((p) => {
          const product = PRODUCTS.find((x) => x.id === p.id);
          return product ? { product, qty: p.qty } : null;
        })
        .filter(Boolean) as CartItem[];
    } catch {
      return [];
    }
  });
  const [isOpen, setOpen] = useState(false);
  const [toasts, setToasts] = useState<Toast[]>([]);
  const [favorites, setFavorites] = useState<string[]>([]);
  const [lastAdded, setLastAdded] = useState(0);

  useEffect(() => {
    try {
      localStorage.setItem(
        "biteup-cart",
        JSON.stringify(items.map((i) => ({ id: i.product.id, qty: i.qty })))
      );
    } catch { /* noop */ }
  }, [items]);

  const pushToast = (message: string, image?: string) => {
    const id = Date.now() + Math.random();
    setToasts((t) => [...t.slice(-2), { id, message, image }]);
    setTimeout(() => setToasts((t) => t.filter((x) => x.id !== id)), 2600);
  };

  const add = (id: string, qty = 1) => {
    const product = PRODUCTS.find((p) => p.id === id);
    if (!product) return;
    setItems((prev) => {
      const found = prev.find((i) => i.product.id === id);
      if (found)
        return prev.map((i) =>
          i.product.id === id ? { ...i, qty: Math.min(20, i.qty + qty) } : i
        );
      return [...prev, { product, qty }];
    });
    setLastAdded(Date.now());
    pushToast(`${product.name} no carrinho!`, product.image);
  };

  const addCustom = (product: Product) => {
    setItems((prev) => [...prev, { product, qty: 1 }]);
    setLastAdded(Date.now());
    pushToast(`${product.name} no carrinho!`, product.image);
  };

  const remove = (id: string) =>
    setItems((prev) => prev.filter((i) => i.product.id !== id));

  const setQty = (id: string, qty: number) => {
    if (qty <= 0) return remove(id);
    setItems((prev) =>
      prev.map((i) => (i.product.id === id ? { ...i, qty: Math.min(20, qty) } : i))
    );
  };

  const clear = () => setItems([]);

  const toggleFav = (id: string) =>
    setFavorites((f) => (f.includes(id) ? f.filter((x) => x !== id) : [...f, id]));

  const { count, subtotal } = useMemo(
    () => ({
      count: items.reduce((a, i) => a + i.qty, 0),
      subtotal: items.reduce((a, i) => a + i.qty * i.product.price, 0),
    }),
    [items]
  );

  return (
    <CartContext.Provider
      value={{ items, count, subtotal, isOpen, toasts, favorites, setOpen, add, addCustom, remove, setQty, clear, toggleFav, lastAdded }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error("useCart must be used within CartProvider");
  return ctx;
}
