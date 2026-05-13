'use client';

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from 'react';

type CartItem = {
  id: string;
  quantity: number;
  productId: string;
  name: string;
  imageUrl: string | null;
  price: number;
  category: string;
  subtotal: number;
};

type CartSummary = {
  count: number;
  total: number;
  items: CartItem[];
};

type CartContextValue = {
  cart: CartSummary;
  isOpen: boolean;
  loading: boolean;
  openCart: () => void;
  closeCart: () => void;
  refreshCart: () => Promise<void>;
  addToCart: (productId: string, quantity?: number) => Promise<boolean>;
};

const CartContext = createContext<CartContextValue | null>(null);

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [cart, setCart] = useState<CartSummary>({
    count: 0,
    total: 0,
    items: [],
  });
  const [isOpen, setIsOpen] = useState(false);
  const [loading, setLoading] = useState(false);

  const refreshCart = useCallback(async () => {
    try {
      const res = await fetch('/api/cart/summary', { cache: 'no-store' });
      const data = await res.json();
      setCart({
        count: data.count ?? 0,
        total: data.total ?? 0,
        items: data.items ?? [],
      });
    } catch {
      setCart({
        count: 0,
        total: 0,
        items: [],
      });
    }
  }, []);

  useEffect(() => {
    refreshCart();
  }, [refreshCart]);

  const addToCart = useCallback(async (productId: string, quantity = 1) => {
    setLoading(true);

    try {
      const res = await fetch('/api/cart/add', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ productId, quantity }),
      });

      if (!res.ok) {
        setLoading(false);
        return false;
      }

      await refreshCart();
      setIsOpen(true);
      setLoading(false);
      return true;
    } catch {
      setLoading(false);
      return false;
    }
  }, [refreshCart]);

  const value = useMemo(
    () => ({
      cart,
      isOpen,
      loading,
      openCart: () => setIsOpen(true),
      closeCart: () => setIsOpen(false),
      refreshCart,
      addToCart,
    }),
    [cart, isOpen, loading, refreshCart, addToCart]
  );

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCart() {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error('useCart must be used within CartProvider');
  return ctx;
}
