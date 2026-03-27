import React from "react";
import { RouterProvider } from "react-router";
import { CartProvider } from "./store/cartStore";
import { router } from "./routes";
import { Toaster } from "react-hot-toast";
import { useSyncCartWithAuth } from "./hooks/useSyncCartWithAuth";

function AppRouter() {
  // Sync cart with auth state (load/clear cart on login/logout)
  useSyncCartWithAuth();

  return (
    <>
      <Toaster position="top-right" />
      <RouterProvider router={router} />
    </>
  );
}

export default function App() {
  return (
    <CartProvider>
      <AppRouter />
    </CartProvider>
  );
}