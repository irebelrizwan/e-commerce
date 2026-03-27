import React, { useState, useEffect } from "react";
import { createBrowserRouter, Outlet, useOutletContext, Navigate, useLocation, useNavigate } from "react-router";
import { Navbar } from "./components/Navbar";
import { Footer } from "./components/Footer";
import { CartDrawer } from "./components/CartDrawer";
import { Landing } from "./pages/Landing";
import { Home } from "./pages/Home";
import { Shop } from "./pages/Shop";
import { ProductDetail } from "./pages/ProductDetail";
import { Wishlist } from "./pages/Wishlist";
import { Checkout } from "./pages/Checkout";
import { About } from "./pages/About";
import { Compare } from "./pages/Compare";
import { useAuth } from "./store/authStore";
import { useInitializeAuth } from "./hooks/useInitializeAuth";

type RootContext = { searchQuery: string };

function RootLayout() {
  const location = useLocation();
  const navigate = useNavigate();
  const { isAuthenticated, isInitializing } = useAuth();
  const [cartOpen, setCartOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  // Initialize auth on root mount
  useInitializeAuth();

  // Redirect to landing page if user logs out while on a protected route
  useEffect(() => {
    if (!isAuthenticated && location.pathname.startsWith("/home")) {
      navigate("/", { replace: true });
    }
  }, [isAuthenticated, location.pathname, navigate]);

  // Show loading state while initializing
  if (isInitializing) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-white">
        <div className="text-center">
          <div className="animate-spin w-12 h-12 border-4 border-gray-300 border-t-blue-500 rounded-full mx-auto mb-4"></div>
          <p className="text-gray-500">Loading...</p>
        </div>
      </div>
    );
  }

  // If not authenticated, show landing page
  if (!isAuthenticated) {
    return <Outlet />;
  }

  // If authenticated, show app layout
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
    element: <RootLayout />,
    children: [
      // Landing page - public route
      { index: true, element: <Landing /> },

      // Protected app routes
      { path: "home", element: <Home /> },
      { path: "home/shop", element: <ShopWrapper /> },
      { path: "home/product/:id", element: <ProductDetail /> },
      { path: "home/wishlist", element: <Wishlist /> },
      { path: "home/checkout", element: <Checkout /> },
      { path: "home/about", element: <About /> },
      { path: "home/compare", element: <Compare /> },

      // Catch-all redirect
      { path: "*", element: <Navigate to="/" replace /> },
    ],
  },
]);