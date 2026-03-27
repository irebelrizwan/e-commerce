/**
 * Cart persistence utility
 * Manages per-user cart data in localStorage
 */

import { CartItem } from "../store/cartStore";

const CART_DB_KEY = "cart_database";

export interface UserCart {
  userId: string;
  items: CartItem[];
  wishlist: number[];
  lastUpdated: number;
}

// Initialize or get cart database
function getCartDatabase(): Record<string, UserCart> {
  try {
    const db = localStorage.getItem(CART_DB_KEY);
    return db ? JSON.parse(db) : {};
  } catch {
    return {};
  }
}

// Save cart database to localStorage
function saveCartDatabase(db: Record<string, UserCart>): void {
  localStorage.setItem(CART_DB_KEY, JSON.stringify(db));
}

// Get user's cart from database
export function getUserCart(userId: string): { items: CartItem[]; wishlist: number[] } {
  const db = getCartDatabase();
  const userCart = db[userId];

  if (userCart) {
    return {
      items: userCart.items,
      wishlist: userCart.wishlist,
    };
  }

  return {
    items: [],
    wishlist: [],
  };
}

// Save user's cart to database
export function saveUserCart(
  userId: string,
  items: CartItem[],
  wishlist: number[]
): void {
  const db = getCartDatabase();

  db[userId] = {
    userId,
    items,
    wishlist,
    lastUpdated: Date.now(),
  };

  saveCartDatabase(db);
}

// Clear user's cart from database (on logout)
export function clearUserCart(userId: string): void {
  const db = getCartDatabase();
  if (db[userId]) {
    delete db[userId];
    saveCartDatabase(db);
  }
}

// Get all user carts (for debugging/admin purposes)
export function getAllCarts(): Record<string, UserCart> {
  return getCartDatabase();
}

// Delete all cart data for a user
export function deleteUserCartData(userId: string): void {
  clearUserCart(userId);
}
