import { create } from 'zustand';

export const useCartStore = create((set, get) => ({
  items: [],
  isOpen: false,

  addItem: (product) => {
    const existing = get().items.find((i) => i._id === product._id);
    if (existing) {
      set((state) => ({
        items: state.items.map((i) =>
          i._id === product._id ? { ...i, qty: i.qty + 1 } : i
        ),
      }));
    } else {
      set((state) => ({ items: [...state.items, { ...product, qty: 1 }] }));
    }
  },

  removeItem: (id) => {
    set((state) => ({ items: state.items.filter((i) => i._id !== id) }));
  },

  updateQty: (id, qty) => {
    if (qty < 1) return get().removeItem(id);
    set((state) => ({
      items: state.items.map((i) => (i._id === id ? { ...i, qty } : i)),
    }));
  },

  clearCart: () => set({ items: [] }),

  toggleCart: () => set((state) => ({ isOpen: !state.isOpen })),

  getTotal: () => {
    return get().items.reduce((acc, i) => {
      const price = i.discount > 0 ? i.price - (i.price * i.discount) / 100 : i.price;
      return acc + price * i.qty;
    }, 0);
  },

  getCount: () => get().items.reduce((acc, i) => acc + i.qty, 0),
}));
