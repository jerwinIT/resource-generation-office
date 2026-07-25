"use client";

import { createContext, useContext, useState, useCallback, ReactNode } from "react";

// ─── Types ────────────────────────────────────────────────────────────────────
export type CartItem = {
  id: number;
  name: string;
  category: string;
  price: number;
  src: string;
  size?: string;
  qty: number;
};

type CartContextValue = {
  items: CartItem[];
  lastAdded: CartItem | null;
  popupVisible: boolean;
  addItem: (item: Omit<CartItem, "qty"> & { qty?: number }) => void;
  removeItem: (id: number, size?: string) => void;
  totalQty: number;
};

// ─── Context ──────────────────────────────────────────────────────────────────
const CartContext = createContext<CartContextValue | null>(null);

export function CartProvider({ children }: { children: ReactNode }) {
  const [items, setItems]               = useState<CartItem[]>([]);
  const [lastAdded, setLastAdded]       = useState<CartItem | null>(null);
  const [popupVisible, setPopupVisible] = useState(false);
  const [timer, setTimer]               = useState<ReturnType<typeof setTimeout> | null>(null);

  const addItem = useCallback((incoming: Omit<CartItem, "qty"> & { qty?: number }) => {
    const qty = incoming.qty ?? 1;

    setItems((prev) => {
      const idx = prev.findIndex(
        (i) => i.id === incoming.id && i.size === incoming.size,
      );
      if (idx > -1) {
        const updated = [...prev];
        updated[idx] = { ...updated[idx], qty: updated[idx].qty + qty };
        return updated;
      }
      return [...prev, { ...incoming, qty }];
    });

    const added: CartItem = { ...incoming, qty };
    setLastAdded(added);
    setPopupVisible(true);

    // Auto-dismiss after 3 s, reset if called again
    if (timer) clearTimeout(timer);
    const t = setTimeout(() => setPopupVisible(false), 3000);
    setTimer(t);
  }, [timer]);

  const removeItem = useCallback((id: number, size?: string) => {
    setItems((prev) =>
      prev.filter((i) => !(i.id === id && i.size === size)),
    );
  }, []);

  const totalQty = items.reduce((s, i) => s + i.qty, 0);

  return (
    <CartContext.Provider value={{ items, lastAdded, popupVisible, addItem, removeItem, totalQty }}>
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error("useCart must be used inside <CartProvider>");
  return ctx;
}