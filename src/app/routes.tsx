import React, { useState } from "react";
import { createBrowserRouter, Outlet, useOutletContext } from "react-router";
import { Navbar } from "./components/Navbar";
import { Footer } from "./components/Footer";
import { CartDrawer } from "./components/CartDrawer";
import { Home } from "./pages/Home";
import { Shop } from "./pages/Shop";
import { ProductDetail } from "./pages/ProductDetail";
import { Wishlist } from "./pages/Wishlist";
import { Checkout } from "./pages/Checkout";
import { About } from "./pages/About";

type RootContext = { searchQuery: string };

function Root() {
  const [cartOpen, setCartOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  return (
    <div className="min-h-screen flex flex-col bg-white">
      <Navbar
        onCartOpen={() => setCartOpen(true)}
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
      />
      <main className="flex-1">
        <Outlet context={{ searchQuery } satisfies RootContext} />
      </main>
      <Footer />
      <CartDrawer open={cartOpen} onClose={() => setCartOpen(false)} />
    </div>
  );
}

function ShopWrapper() {
  const { searchQuery } = useOutletContext<RootContext>();
  return <Shop searchQuery={searchQuery} />;
}

export const router = createBrowserRouter([
  {
    path: "/",
    Component: Root,
    children: [
      { index: true, Component: Home },
      { path: "shop", Component: ShopWrapper },
      { path: "product/:id", Component: ProductDetail },
      { path: "wishlist", Component: Wishlist },
      { path: "checkout", Component: Checkout },
      { path: "about", Component: About },
    ],
  },
]);
