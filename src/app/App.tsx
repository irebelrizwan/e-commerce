import React from "react";
import { RouterProvider } from "react-router";
import { CartProvider } from "./store/cartStore";
import { router } from "./routes";
import { Toaster } from "react-hot-toast";
import { useInitializeAuth } from "./hooks/useInitializeAuth";
import { useSyncCartWithAuth } from "./hooks/useSyncCartWithAuth";

function AppContent() {
  // Initialize auth session on app load
  useInitializeAuth();

  // Sync cart with auth state (load/clear cart on login/logout)
  useSyncCartWithAuth();

  return (
    <CartProvider>
      <Toaster position="top-right" />
      <RouterProvider router={router} />
    </CartProvider>
  );
}

export default function App() {
  return <AppContent />;
}