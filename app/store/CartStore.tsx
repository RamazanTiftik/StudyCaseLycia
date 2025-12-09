"use client";

import { create } from "zustand";

interface CartItem {
  id: number;
  name: string;
  price: number;
  image: string;
  quantity: number;
}

interface CartState {
  items: CartItem[];
  count: number;
  add: (item: CartItem) => void;
  remove: (id: number) => void;
  clear: () => void;
  increase: (id: number) => void;
  decrease: (id: number) => void;
}

export const useCart = create<CartState>((set, get) => ({
  items: [],
  count: 0,

  add: (item) => {
    const items = get().items;
    const exists = items.find((i) => i.id === item.id);

    let newItems;

    if (exists) {
      newItems = items.map((i) =>
        i.id === item.id ? { ...i, quantity: i.quantity + 1 } : i
      );
    } else {
      newItems = [...items, item];
    }

    set({
      items: newItems,
      count: newItems.reduce((t, i) => t + i.quantity, 0),
    });
  },

  remove: (id) => {
    const newItems = get().items.filter((i) => i.id !== id);

    set({
      items: newItems,
      count: newItems.reduce((t, i) => t + i.quantity, 0),
    });
  },

  clear: () => set({ items: [], count: 0 }),

  increase: (id) => {
    const newItems = get().items.map((i) =>
      i.id === id ? { ...i, quantity: i.quantity + 1 } : i
    );

    set({
      items: newItems,
      count: newItems.reduce((t, i) => t + i.quantity, 0),
    });
  },

  decrease: (id) => {
    const newItems = get().items
      .map((i) =>
        i.id === id ? { ...i, quantity: Math.max(1, i.quantity - 1) } : i
      )
      .filter((i) => i.quantity > 0);

    set({
      items: newItems,
      count: newItems.reduce((t, i) => t + i.quantity, 0),
    });
  },
}));
