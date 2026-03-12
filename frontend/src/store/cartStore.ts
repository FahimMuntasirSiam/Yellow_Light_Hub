import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export interface CartItem {
    id: string | number;
    name: string;
    slug: string;
    price: number;
    image: string;
    quantity: number;
}

interface CartState {
    items: CartItem[];
    isOpen: boolean;
    addItem: (product: Omit<CartItem, 'quantity'>) => void;
    removeItem: (id: string | number) => void;
    updateQuantity: (id: string | number, quantity: number) => void;
    clearCart: () => void;
    toggleCart: () => void;
    setIsOpen: (isOpen: boolean) => void;
    getTotalItems: () => number;
    getTotalPrice: () => number;
}

export const useCartStore = create<CartState>()(
    persist(
        (set, get) => ({
            items: [],
            isOpen: false,
            addItem: (product) => {
                const currentItems = get().items;
                const existingItem = currentItems.find((item) => item.id === product.id);

                if (existingItem) {
                    set({
                        items: currentItems.map((item) =>
                            item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
                        ),
                    });
                } else {
                    set({ items: [...currentItems, { ...product, quantity: 1 }] });
                }
                set({ isOpen: true });
            },
            removeItem: (id) => {
                set({ items: get().items.filter((item) => item.id !== id) });
            },
            updateQuantity: (id, quantity) => {
                if (quantity <= 0) {
                    get().removeItem(id);
                    return;
                }
                set({
                    items: get().items.map((item) =>
                        item.id === id ? { ...item, quantity } : item
                    ),
                });
            },
            clearCart: () => set({ items: [] }),
            toggleCart: () => set({ isOpen: !get().isOpen }),
            setIsOpen: (isOpen) => set({ isOpen }),
            getTotalItems: () => get().items.reduce((total, item) => total + item.quantity, 0),
            getTotalPrice: () => get().items.reduce((total, item) => total + item.price * item.quantity, 0),
        }),
        {
            name: 'yellowlight-cart',
        }
    )
);
