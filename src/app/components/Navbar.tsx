import React, { useState, useRef, useEffect } from "react";
import { Link, useLocation } from "react-router";
import { ShoppingCart, Heart, Search, Menu, X, Zap, User, LogOut, ChevronDown } from "lucide-react";
import { useCart } from "../store/cartStore";
import { useAuth } from "../store/authStore";
import { AuthModal } from "./AuthModal";

interface NavbarProps {
  onCartOpen: () => void;
  searchQuery: string;
  onSearchChange: (q: string) => void;
}

export function Navbar({ onCartOpen, searchQuery, onSearchChange }: NavbarProps) {
  const { cartCount, wishlist } = useCart();
  const { user, logout } = useAuth();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [authModal, setAuthModal] = useState<{ open: boolean; mode: "login" | "register" }>({ open: false, mode: "login" });
  const [userMenuOpen, setUserMenuOpen] = useState(false);
  const location = useLocation();
  const userMenuRef = useRef<HTMLDivElement>(null);

  // Close user dropdown on outside click
  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (userMenuRef.current && !userMenuRef.current.contains(e.target as Node)) {
        setUserMenuOpen(false);
      }
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  const navLinks = [
    { label: "Home", to: "/" },
    { label: "Shop", to: "/shop" },
    { label: "About", to: "/about" },
  ];

  return (
    <>
      <nav className="sticky top-0 z-50 bg-white border-b border-gray-100 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            {/* Logo */}
            <Link to="/" className="flex items-center gap-2">
              <div className="w-8 h-8 bg-black rounded-lg flex items-center justify-center">
                <Zap size={16} className="text-white" fill="white" />
              </div>
              <span className="text-xl tracking-tight text-gray-900" style={{ fontWeight: 700 }}>LUXE</span>
            </Link>

            {/* Desktop Nav */}
            <div className="hidden md:flex items-center gap-8">
              {navLinks.map((link) => (
                <Link
                  key={link.to}
                  to={link.to}
                  className={`text-sm transition-colors ${
                    location.pathname === link.to
                      ? "text-black border-b-2 border-black pb-0.5"
                      : "text-gray-500 hover:text-black"
                  }`}
                >
                  {link.label}
                </Link>
              ))}
            </div>

            {/* Search bar (desktop) */}
            <div className="hidden md:flex items-center bg-gray-100 rounded-full px-4 py-2 w-56">
              <Search size={15} className="text-gray-400 mr-2 shrink-0" />
              <input
                type="text"
                placeholder="Search products..."
                value={searchQuery}
                onChange={(e) => onSearchChange(e.target.value)}
                className="bg-transparent text-sm outline-none w-full text-gray-700 placeholder-gray-400"
              />
            </div>

            {/* Right icons */}
            <div className="flex items-center gap-1">
              {/* Mobile search toggle */}
              <button
                className="md:hidden p-2 rounded-full hover:bg-gray-100 transition"
                onClick={() => setSearchOpen(!searchOpen)}
              >
                <Search size={20} className="text-gray-700" />
              </button>

              <Link to="/wishlist" className="relative p-2 rounded-full hover:bg-gray-100 transition">
                <Heart size={20} className="text-gray-700" />
                {wishlist.length > 0 && (
                  <span className="absolute top-0 right-0 bg-red-500 text-white text-[10px] w-4 h-4 rounded-full flex items-center justify-center">
                    {wishlist.length}
                  </span>
                )}
              </Link>

              <button
                onClick={onCartOpen}
                className="relative p-2 rounded-full hover:bg-gray-100 transition"
              >
                <ShoppingCart size={20} className="text-gray-700" />
                {cartCount > 0 && (
                  <span className="absolute top-0 right-0 bg-black text-white text-[10px] w-4 h-4 rounded-full flex items-center justify-center">
                    {cartCount}
                  </span>
                )}
              </button>

              {/* Auth — desktop */}
              <div className="hidden md:flex items-center gap-2 ml-1">
                {user ? (
                  <div className="relative" ref={userMenuRef}>
                    <button
                      onClick={() => setUserMenuOpen(!userMenuOpen)}
                      className="flex items-center gap-1.5 pl-3 pr-2 py-1.5 rounded-full border border-gray-200 hover:border-gray-300 hover:bg-gray-50 transition"
                    >
                      <div className="w-6 h-6 bg-black rounded-full flex items-center justify-center">
                        <span className="text-white text-[10px]" style={{ fontWeight: 700 }}>
                          {user.name.charAt(0).toUpperCase()}
                        </span>
                      </div>
                      <span className="text-sm text-gray-700 max-w-[80px] truncate" style={{ fontWeight: 500 }}>
                        {user.name.split(" ")[0]}
                      </span>
                      <ChevronDown size={13} className={`text-gray-400 transition-transform ${userMenuOpen ? "rotate-180" : ""}`} />
                    </button>

                    {userMenuOpen && (
                      <div className="absolute right-0 top-full mt-2 w-52 bg-white border border-gray-100 rounded-2xl shadow-lg py-1.5 z-50">
                        <div className="px-4 py-3 border-b border-gray-100">
                          <p className="text-sm text-gray-900" style={{ fontWeight: 600 }}>{user.name}</p>
                          <p className="text-xs text-gray-400 truncate mt-0.5">{user.email}</p>
                        </div>
                        <Link
                          to="/wishlist"
                          onClick={() => setUserMenuOpen(false)}
                          className="flex items-center gap-2.5 px-4 py-2.5 text-sm text-gray-600 hover:bg-gray-50 transition"
                        >
                          <Heart size={14} /> Wishlist
                        </Link>
                        <button
                          onClick={() => { logout(); setUserMenuOpen(false); }}
                          className="w-full flex items-center gap-2.5 px-4 py-2.5 text-sm text-red-500 hover:bg-red-50 transition"
                        >
                          <LogOut size={14} /> Sign Out
                        </button>
                      </div>
                    )}
                  </div>
                ) : (
                  <>
                    <button
                      onClick={() => setAuthModal({ open: true, mode: "login" })}
                      className="text-sm text-gray-600 hover:text-black px-3 py-1.5 rounded-full hover:bg-gray-100 transition"
                    >
                      Sign In
                    </button>
                    <button
                      onClick={() => setAuthModal({ open: true, mode: "register" })}
                      className="text-sm text-white bg-black px-4 py-1.5 rounded-full hover:bg-gray-800 transition"
                      style={{ fontWeight: 600 }}
                    >
                      Register
                    </button>
                  </>
                )}
              </div>

              {/* Mobile menu toggle */}
              <button
                className="md:hidden p-2 rounded-full hover:bg-gray-100 transition"
                onClick={() => setMobileOpen(!mobileOpen)}
              >
                {mobileOpen ? <X size={20} /> : <Menu size={20} />}
              </button>
            </div>
          </div>

          {/* Mobile search */}
          {searchOpen && (
            <div className="md:hidden pb-3">
              <div className="flex items-center bg-gray-100 rounded-full px-4 py-2">
                <Search size={15} className="text-gray-400 mr-2 shrink-0" />
                <input
                  type="text"
                  placeholder="Search products..."
                  value={searchQuery}
                  onChange={(e) => onSearchChange(e.target.value)}
                  className="bg-transparent text-sm outline-none w-full"
                  autoFocus
                />
              </div>
            </div>
          )}

          {/* Mobile menu */}
          {mobileOpen && (
            <div className="md:hidden border-t border-gray-100 py-4 space-y-1">
              {navLinks.map((link) => (
                <Link
                  key={link.to}
                  to={link.to}
                  className="block px-2 py-2 text-sm text-gray-700 hover:text-black hover:bg-gray-50 rounded-lg"
                  onClick={() => setMobileOpen(false)}
                >
                  {link.label}
                </Link>
              ))}
              <div className="border-t border-gray-100 pt-3 mt-2 space-y-1">
                {user ? (
                  <>
                    <div className="flex items-center gap-2.5 px-2 py-2">
                      <div className="w-7 h-7 bg-black rounded-full flex items-center justify-center">
                        <span className="text-white text-xs" style={{ fontWeight: 700 }}>
                          {user.name.charAt(0).toUpperCase()}
                        </span>
                      </div>
                      <div>
                        <p className="text-sm text-gray-900" style={{ fontWeight: 600 }}>{user.name}</p>
                        <p className="text-xs text-gray-400">{user.email}</p>
                      </div>
                    </div>
                    <button
                      onClick={() => { logout(); setMobileOpen(false); }}
                      className="flex items-center gap-2 w-full px-2 py-2 text-sm text-red-500 hover:bg-red-50 rounded-lg transition"
                    >
                      <LogOut size={15} /> Sign Out
                    </button>
                  </>
                ) : (
                  <>
                    <button
                      onClick={() => { setAuthModal({ open: true, mode: "login" }); setMobileOpen(false); }}
                      className="flex items-center gap-2 w-full px-2 py-2 text-sm text-gray-700 hover:bg-gray-50 rounded-lg transition"
                    >
                      <User size={15} /> Sign In
                    </button>
                    <button
                      onClick={() => { setAuthModal({ open: true, mode: "register" }); setMobileOpen(false); }}
                      className="flex items-center gap-2 w-full px-2 py-2 text-sm text-gray-700 hover:bg-gray-50 rounded-lg transition"
                    >
                      <User size={15} /> Register
                    </button>
                  </>
                )}
              </div>
            </div>
          )}
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