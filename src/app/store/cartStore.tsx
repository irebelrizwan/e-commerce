import React, { createContext, useContext, useState, ReactNode, useEffect } from "react";
import { getUserCart, saveUserCart, clearUserCart } from "../utils/cartPersistence";

export interface Product {
  id: number;
  name: string;
  price: number;
  originalPrice?: number;
  image: string;
  category: string;
  rating: number;
  reviews: number;
  badge?: string;
  description: string;
}

export interface CartItem extends Product {
  quantity: number;
}

interface CartContextType {
  cart: CartItem[];
  wishlist: number[];
  currentUserId: string | null;
  addToCart: (product: Product) => void;
  removeFromCart: (id: number) => void;
  updateQuantity: (id: number, quantity: number) => void;
  toggleWishlist: (id: number) => void;
  cartCount: number;
  cartTotal: number;
  clearCart: () => void;
  setUserCart: (cart: CartItem[], wishlist: number[]) => void;
  loadUserCart: (userId: string) => void;
  saveCurrentCart: () => void;
  clearUserCartData: (userId: string) => void;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

const CART_KEY = "user_cart";
const WISHLIST_KEY = "user_wishlist";

export function CartProvider({ children }: { children: ReactNode }) {
  const [cart, setCart] = useState<CartItem[]>([]);
  const [wishlist, setWishlist] = useState<number[]>([]);
  const [currentUserId, setCurrentUserId] = useState<string | null>(null);

  // Load cart from localStorage on mount
  useEffect(() => {
    const savedCart = localStorage.getItem(CART_KEY);
    const savedWishlist = localStorage.getItem(WISHLIST_KEY);

    if (savedCart) {
      setCart(JSON.parse(savedCart));
    }
    if (savedWishlist) {
      setWishlist(JSON.parse(savedWishlist));
    }
  }, []);

  // Save cart to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem(CART_KEY, JSON.stringify(cart));

    // Also save to per-user database if user is logged in
    if (currentUserId) {
      saveUserCart(currentUserId, cart, wishlist);
    }
  }, [cart, currentUserId, wishlist]);

  // Save wishlist to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem(WISHLIST_KEY, JSON.stringify(wishlist));
  }, [wishlist]);

  const addToCart = (product: Product) => {
    setCart((prev) => {
      const existing = prev.find((item) => item.id === product.id);
      if (existing) {
        return prev.map((item) =>
          item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
        );
      }
      return [...prev, { ...product, quantity: 1 }];
    });
  };

  const removeFromCart = (id: number) => {
    setCart((prev) => prev.filter((item) => item.id !== id));
  };

  const updateQuantity = (id: number, quantity: number) => {
    if (quantity <= 0) {
      removeFromCart(id);
      return;
    }
    setCart((prev) =>
      prev.map((item) => (item.id === id ? { ...item, quantity } : item))
    );
  };

  const toggleWishlist = (id: number) => {
    setWishlist((prev) =>
      prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]
    );
  };

  const cartCount = cart.reduce((sum, item) => sum + item.quantity, 0);
  const cartTotal = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);

  const clearCart = () => {
    setCart([]);
    localStorage.removeItem(CART_KEY);
  };

  const setUserCart = (newCart: CartItem[], newWishlist: number[]) => {
    setCart(newCart);
    setWishlist(newWishlist);
  };

  // Load user's cart from database
  const loadUserCart = (userId: string) => {
    setCurrentUserId(userId);
    const { items, wishlist: savedWishlist } = getUserCart(userId);
    setCart(items);
    setWishlist(savedWishlist);
  };

  // Save current cart to database
  const saveCurrentCart = () => {
    if (currentUserId) {
      saveUserCart(currentUserId, cart, wishlist);
    }
  };

  // Clear user's cart from database
  const clearUserCartData = (userId: string) => {
    clearUserCart(userId);
    if (currentUserId === userId) {
      setCurrentUserId(null);
      setCart([]);
      setWishlist([]);
    }
  };

  return (
    <CartContext.Provider
      value={{
        cart,
        wishlist,
        currentUserId,
        addToCart,
        removeFromCart,
        updateQuantity,
        toggleWishlist,
        cartCount,
        cartTotal,
        clearCart,
        setUserCart,
        loadUserCart,
        saveCurrentCart,
        clearUserCartData,
      }}
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
