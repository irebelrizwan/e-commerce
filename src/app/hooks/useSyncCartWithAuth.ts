import { useEffect } from "react";
import { useAuth } from "../store/authStore";
import { useCart } from "../store/cartStore";

/**
 * Hook to sync cart data with authentication state
 * - Loads user's cart when they log in
 * - Clears cart UI when they log out (but keeps cart data in database)
 */
export function useSyncCartWithAuth() {
  const { user } = useAuth();
  const { loadUserCart, clearCart, currentUserId } = useCart();

  useEffect(() => {
    if (user && user.id && user.id !== currentUserId) {
      // User just logged in - load their saved cart from database
      loadUserCart(user.id);
    } else if (!user && currentUserId) {
      // User just logged out - clear only the UI cart (keep database intact)
      clearCart();
    }
  }, [user, currentUserId, loadUserCart, clearCart]);
}

