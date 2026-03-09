import React from "react";
import { Link } from "react-router";
import { Zap, Instagram, Twitter, Facebook } from "lucide-react";

export function Footer() {
  return (
    <footer className="bg-gray-950 text-gray-400">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10 mb-12">
          <div className="col-span-1 md:col-span-2">
            <Link to="/" className="flex items-center gap-2 mb-4">
              <div className="w-8 h-8 bg-white rounded-lg flex items-center justify-center">
                <Zap size={16} className="text-black" fill="black" />
              </div>
              <span className="text-white text-xl" style={{ fontWeight: 700 }}>LUXE</span>
            </Link>
            <p className="text-sm leading-relaxed max-w-sm">
              Premium products for modern living. Curated with care, delivered with love.
            </p>
            <div className="flex gap-4 mt-5">
              {[Instagram, Twitter, Facebook].map((Icon, i) => (
                <button key={i} className="w-9 h-9 bg-white/10 rounded-full flex items-center justify-center hover:bg-white/20 transition">
                  <Icon size={15} className="text-white" />
                </button>
              ))}
            </div>
          </div>

          <div>
            <p className="text-white text-sm mb-4" style={{ fontWeight: 600 }}>Shop</p>
            <ul className="space-y-2.5 text-sm">
              {["All Products", "Electronics", "Clothing", "Accessories"].map((item) => (
                <li key={item}>
                  <Link to="/shop" className="hover:text-white transition">{item}</Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <p className="text-white text-sm mb-4" style={{ fontWeight: 600 }}>Company</p>
            <ul className="space-y-2.5 text-sm">
              {["About Us", "Careers", "Contact", "Privacy Policy"].map((item) => (
                <li key={item}>
                  <Link to="/about" className="hover:text-white transition">{item}</Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="border-t border-white/10 pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs">
          <p>© 2026 LUXE. All rights reserved.</p>
          <p>Made with ♥ for great products</p>
        </div>
      </div>
    </footer>
  );
}
