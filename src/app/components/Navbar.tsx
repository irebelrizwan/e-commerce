import React, { useState, useRef, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router";
import { ShoppingCart, Heart, Search, Menu, X, ChevronDown, LogOut } from "lucide-react";
import { useCart } from "../store/cartStore";
import { useAuth } from "../store/authStore";
import { AuthModal } from "./AuthModal";
import { products } from "../data/products";

import logo from "./photos/elogo.png";

interface NavbarProps {
  onCartOpen: () => void;
  searchQuery: string;
  onSearchChange: (q: string) => void;
}

export function Navbar({ onCartOpen, searchQuery, onSearchChange }: NavbarProps) {
  const navigate = useNavigate();
  const { cartCount, wishlist } = useCart();
  const { user, logout: authLogout } = useAuth();

  const [mobileOpen, setMobileOpen] = useState(false);
  const [authModal, setAuthModal] = useState<{ open: boolean; mode: "login" | "register" }>({ open: false, mode: "login" });
  const [userMenuOpen, setUserMenuOpen] = useState(false);

  const [filteredProducts, setFilteredProducts] = useState<any[]>([]);
  const [showSuggestions, setShowSuggestions] = useState(false);

  const location = useLocation();
  const userMenuRef = useRef<HTMLDivElement>(null);

  // Handle logout - auth state change triggers cart sync and redirect to landing page
  const handleLogout = () => {
    authLogout();
    setUserMenuOpen(false);
    navigate("/");
  };

  // Close user dropdown
  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (userMenuRef.current && !userMenuRef.current.contains(e.target as Node)) {
        setUserMenuOpen(false);
      }
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  // 🔥 Live search logic
  useEffect(() => {
    if (searchQuery.trim() === "") {
      setFilteredProducts([]);
      return;
    }

    const results = products.filter((p) =>
      p.name.toLowerCase().includes(searchQuery.toLowerCase())
    );

    setFilteredProducts(results.slice(0, 5));
  }, [searchQuery]);

  const navLinks = [
    { label: "Home", to: "/home" },
    { label: "Shop", to: "/home/shop" },
    { label: "Compare", to: "/home/compare" },
    { label: "About", to: "/home/about" },
  ];

  return (
    <>
      {/* 🔥 MODERN NAVBAR */}
      <nav className="sticky top-0 z-50 backdrop-blur-md bg-white/80 border-b border-gray-200 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

          <div className="flex items-center h-20">

            {/* LEFT */}
            <div className="flex items-center gap-8 flex-shrink-0">
              <Link to="/home">
                <img
                  src={logo}
                  alt="Origin"
                  className="h-14 md:h-16 w-auto object-contain"
                />
              </Link>

              <div className="hidden md:flex items-center gap-6 whitespace-nowrap">
                {navLinks.map((link) => (
                  <Link
                    key={link.to}
                    to={link.to}
                    className={`text-sm px-2 py-1 rounded-md transition-all ${
                      location.pathname === link.to
                        ? "text-[#099EE9] bg-blue-50"
                        : "text-gray-600 hover:text-[#099EE9] hover:bg-blue-50"
                    }`}
                  >
                    {link.label}
                  </Link>
                ))}
              </div>
            </div>

            {/* CENTER SEARCH */}
            <div className="relative flex-1 flex justify-center px-4">
              <div className="flex items-center bg-gray-100 rounded-full px-4 py-2 w-full max-w-md">
                <Search size={18} className="text-gray-500 mr-2" />
                <input
                  type="text"
                  placeholder="Search products..."
                  value={searchQuery}
                  onChange={(e) => {
                    onSearchChange(e.target.value);
                    setShowSuggestions(true);
                  }}
                  onFocus={() => setShowSuggestions(true)}
                  onBlur={() => setTimeout(() => setShowSuggestions(false), 200)}
                  className="bg-transparent text-sm outline-none w-full"
                />
              </div>

              {/* 🔥 LIVE SEARCH DROPDOWN */}
              {showSuggestions && filteredProducts.length > 0 && (
                <div className="absolute top-full mt-2 w-full max-w-md bg-white border border-gray-200 rounded-xl shadow-lg z-50 overflow-hidden">
                  {filteredProducts.map((product) => (
                    <Link
                      key={product.id}
                      to={`/home/product/${product.id}`}
                      className="flex items-center gap-3 px-4 py-2 hover:bg-gray-50"
                    >
                      <img src={product.image} className="w-8 h-8 rounded object-cover" />
                      <span className="text-sm">{product.name}</span>
                    </Link>
                  ))}
                </div>
              )}
            </div>

            {/* RIGHT */}
            <div className="flex items-center gap-2 flex-shrink-0 whitespace-nowrap">

              <Link to="/home/wishlist" className="relative p-2">
                <Heart size={20} />
                {wishlist.length > 0 && (
                  <span className="absolute top-0 right-0 bg-red-500 text-white text-xs w-4 h-4 flex items-center justify-center rounded-full">
                    {wishlist.length}
                  </span>
                )}
              </Link>

              <button onClick={onCartOpen} className="relative p-2">
                <ShoppingCart size={20} />
                {cartCount > 0 && (
                  <span className="absolute top-0 right-0 bg-black text-white text-xs w-4 h-4 flex items-center justify-center rounded-full">
                    {cartCount}
                  </span>
                )}
              </button>

              {/* AUTH */}
              <div className="hidden md:flex items-center gap-2 whitespace-nowrap">
                {user ? (
                  <div className="relative" ref={userMenuRef}>
                    <button
                      onClick={() => setUserMenuOpen(!userMenuOpen)}
                      className="flex items-center gap-2 px-3 py-1.5 rounded-full border hover:bg-gray-50 transition"
                    >
                      <div className="w-6 h-6 bg-black text-white flex items-center justify-center rounded-full text-xs font-bold">
                        {user.name.charAt(0).toUpperCase()}
                      </div>
                      <span className="text-sm">{user.name.split(" ")[0]}</span>
                      <ChevronDown size={14} />
                    </button>

                    {/* Dropdown Menu */}
                    {userMenuOpen && (
                      <div className="absolute right-0 mt-2 w-48 bg-white border border-gray-200 rounded-lg shadow-lg z-50 overflow-hidden">
                        <div className="px-4 py-3 border-b border-gray-100">
                          <p className="text-sm font-semibold text-gray-900">{user.name}</p>
                          <p className="text-xs text-gray-500">{user.email}</p>
                        </div>
                        <div className="py-2">
                          <button
                            onClick={handleLogout}
                            className="w-full flex items-center gap-2 px-4 py-2 text-sm text-red-600 hover:bg-red-50 transition"
                          >
                            <LogOut size={16} />
                            Logout
                          </button>
                        </div>
                      </div>
                    )}
                  </div>
                ) : (
                  <>
                    <button
                      onClick={() => setAuthModal({ open: true, mode: "login" })}
                      className="text-sm px-3 py-1.5 whitespace-nowrap hover:text-[#099EE9] transition"
                    >
                      Sign In
                    </button>

                    <button
                      onClick={() => setAuthModal({ open: true, mode: "register" })}
                      className="text-sm bg-[#099EE9] text-white px-4 py-1.5 rounded-full whitespace-nowrap hover:bg-blue-600 transition"
                    >
                      Register
                    </button>
                  </>
                )}
              </div>

              {/* MOBILE MENU */}
              <button className="md:hidden p-2" onClick={() => setMobileOpen(!mobileOpen)}>
                {mobileOpen ? <X size={20} /> : <Menu size={20} />}
              </button>
            </div>

          </div>
        </div>
      </nav>

      <AuthModal
        open={authModal.open}
        mode={authModal.mode}
        onClose={() => setAuthModal((prev) => ({ ...prev, open: false }))}
        onSwitchMode={(mode) => setAuthModal({ open: true, mode })}
      />
    </>
  );
}