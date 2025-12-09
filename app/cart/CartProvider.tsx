"use client";

import React, { createContext, useContext, useEffect, useState } from "react";

export interface CartItem {
  id: number;
  name: string;
  price: number;
  image?: string;
  quantity: number;
}

interface CartContextValue {
  items: CartItem[];
  addItem: (item: Omit<CartItem, "quantity">, qty?: number) => void;
  removeItem: (id: number) => void;
  updateQuantity: (id: number, qty: number) => void;
  clearCart: () => void;
  getTotal: () => number;
  getCount: () => number;
}

const CartContext = createContext<CartContextValue | undefined>(undefined);

const STORAGE_KEY = "lycia_cart_v1";

export const CartProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [items, setItems] = useState<CartItem[]>([]);

  // load from localStorage on mount
  useEffect(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (raw) setItems(JSON.parse(raw));
    } catch (e) {
      console.error("Failed to parse cart from localStorage", e);
    }
  }, []);

  // persist to localStorage on change
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
    } catch (e) {
      console.error("Failed to save cart to localStorage", e);
    }
  }, [items]);

  function addItem(item: Omit<CartItem, "quantity">, qty = 1) {
    setItems((prev) => {
      const found = prev.find((p) => p.id === item.id);
      if (found) {
        return prev.map((p) => (p.id === item.id ? { ...p, quantity: p.quantity + qty } : p));
      } else {
        return [...prev, { ...item, quantity: qty }];
      }
    });
  }

  function removeItem(id: number) {
    setItems((prev) => prev.filter((p) => p.id !== id));
  }

  function updateQuantity(id: number, qty: number) {
    if (qty <= 0) {
      removeItem(id);
      return;
    }
    setItems((prev) => prev.map((p) => (p.id === id ? { ...p, quantity: qty } : p)));
  }

  function clearCart() {
    setItems([]);
  }

  function getTotal() {
    return items.reduce((sum, it) => sum + it.price * it.quantity, 0);
  }

  function getCount() {
    return items.reduce((sum, it) => sum + it.quantity, 0);
  }

  return (
    <CartContext.Provider value={{ items, addItem, removeItem, updateQuantity, clearCart, getTotal, getCount }}>
      {children}
    </CartContext.Provider>
  );
};

export function useCart(): CartContextValue {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error("useCart must be used inside CartProvider");
  return ctx;
}
