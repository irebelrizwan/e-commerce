import React from "react";
import { RouterProvider } from "react-router";
import { CartProvider } from "./store/cartStore";
import { router } from "./routes";

export default function App() {
  return (
    <CartProvider>
      <RouterProvider router={router} />
    </CartProvider>
  );
}
