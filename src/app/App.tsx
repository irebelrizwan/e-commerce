import React from "react";
import { RouterProvider } from "react-router";
import { CartProvider } from "./store/cartStore";
import { router } from "./routes";
import { Toaster } from "react-hot-toast";

export default function App() {
  return (
    <CartProvider>
      <Toaster position="top-right" />
      <RouterProvider router={router} />
    </CartProvider>
  );
}