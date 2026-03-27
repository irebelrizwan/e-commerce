import React, { useState } from "react";
import { ArrowRight, ShieldCheck, Zap, Users, LogIn } from "lucide-react";
import { AuthModal } from "../components/AuthModal";
import logo from "../components/photos/elogo.png";

export function Landing() {
  const [authModal, setAuthModal] = useState<{ open: boolean; mode: "login" | "register" }>({
    open: false,
    mode: "login",
  });

  const openAuthModal = (mode: "login" | "register") => {
    setAuthModal({ open: true, mode });
  };

  const closeAuthModal = () => {
    setAuthModal({ open: false, mode: "login" });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 text-white">
      {/* Navigation */}
      <nav className="flex items-center justify-between px-6 md:px-12 py-6 border-b border-white/10">
        <div className="flex items-center gap-2">
          <img src={logo} alt="Logo" className="w-8 h-8 rounded-lg" />
          <span className="text-xl font-bold">Origin</span>
        </div>
        <div className="flex gap-4">
          <button
            onClick={() => openAuthModal("login")}
            className="px-6 py-2 rounded-lg border border-white/20 hover:border-white/40 transition hover:bg-white/5"
          >
            Sign In
          </button>
          <button
            onClick={() => openAuthModal("register")}
            className="px-6 py-2 rounded-lg bg-gradient-to-r from-blue-500 to-cyan-500 hover:from-blue-600 hover:to-cyan-600 transition font-medium"
          >
            Sign Up
          </button>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="px-6 md:px-12 py-20 md:py-32">
        <div className="max-w-5xl mx-auto">
          {/* Main Heading */}
          <div className="mb-12">
            <h1 className="text-5xl md:text-7xl font-bold leading-tight mb-6">
              Welcome to <span className="bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent">Origin</span>
            </h1>
            <p className="text-xl md:text-2xl text-gray-300 mb-8">
              Your premier destination for premium fashion, electronics, and lifestyle products. Shop smarter, live better.
            </p>
          </div>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 mb-20">
            <button
              onClick={() => openAuthModal("register")}
              className="px-8 py-4 rounded-lg bg-gradient-to-r from-blue-500 to-cyan-500 hover:from-blue-600 hover:to-cyan-600 transition font-semibold flex items-center justify-center gap-2 text-lg"
            >
              Get Started <ArrowRight size={20} />
            </button>
            <button
              onClick={() => openAuthModal("login")}
              className="px-8 py-4 rounded-lg border-2 border-white/20 hover:border-white/40 transition font-semibold flex items-center justify-center gap-2 text-lg hover:bg-white/5"
            >
              <LogIn size={20} /> Sign In
            </button>
          </div>

          {/* Features Grid */}
          <div className="grid md:grid-cols-3 gap-8">
            {/* Feature 1 */}
            <div className="bg-white/5 border border-white/10 rounded-2xl p-8 backdrop-blur hover:bg-white/10 transition">
              <div className="bg-gradient-to-br from-blue-500 to-cyan-500 w-12 h-12 rounded-lg flex items-center justify-center mb-4">
                <ShieldCheck size={24} />
              </div>
              <h3 className="text-xl font-bold mb-3">Secure Shopping</h3>
              <p className="text-gray-400">
                Your data is protected with enterprise-grade security. Shop with confidence.
              </p>
            </div>

            {/* Feature 2 */}
            <div className="bg-white/5 border border-white/10 rounded-2xl p-8 backdrop-blur hover:bg-white/10 transition">
              <div className="bg-gradient-to-br from-purple-500 to-pink-500 w-12 h-12 rounded-lg flex items-center justify-center mb-4">
                <Zap size={24} />
              </div>
              <h3 className="text-xl font-bold mb-3">Fast Checkout</h3>
              <p className="text-gray-400">
                Seamless payment experience with multiple payment options for your convenience.
              </p>
            </div>

            {/* Feature 3 */}
            <div className="bg-white/5 border border-white/10 rounded-2xl p-8 backdrop-blur hover:bg-white/10 transition">
              <div className="bg-gradient-to-br from-amber-500 to-orange-500 w-12 h-12 rounded-lg flex items-center justify-center mb-4">
                <Users size={24} />
              </div>
              <h3 className="text-xl font-bold mb-3">Personalized</h3>
              <p className="text-gray-400">
                Your preferences and wishlist are saved for a personalized shopping experience.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="px-6 md:px-12 py-20 bg-white/5 border-y border-white/10">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-4xl md:text-5xl font-bold mb-12 text-center">Why Choose Origin?</h2>

          <div className="grid md:grid-cols-2 gap-8">
            <div>
              <h3 className="text-2xl font-bold mb-4 flex items-center gap-3">
                <span className="w-8 h-8 rounded-full bg-gradient-to-r from-blue-500 to-cyan-500 flex items-center justify-center text-sm font-bold">
                  ✓
                </span>
                Curated Collections
              </h3>
              <p className="text-gray-300">
                Handpicked products from the world's best brands, ensuring quality and authenticity.
              </p>
            </div>

            <div>
              <h3 className="text-2xl font-bold mb-4 flex items-center gap-3">
                <span className="w-8 h-8 rounded-full bg-gradient-to-r from-blue-500 to-cyan-500 flex items-center justify-center text-sm font-bold">
                  ✓
                </span>
                Easy Returns
              </h3>
              <p className="text-gray-300">
                30-day money-back guarantee on all purchases. No questions asked.
              </p>
            </div>

            <div>
              <h3 className="text-2xl font-bold mb-4 flex items-center gap-3">
                <span className="w-8 h-8 rounded-full bg-gradient-to-r from-blue-500 to-cyan-500 flex items-center justify-center text-sm font-bold">
                  ✓
                </span>
                Smart Recommendations
              </h3>
              <p className="text-gray-300">
                AI-powered product suggestions based on your preferences and shopping history.
              </p>
            </div>

            <div>
              <h3 className="text-2xl font-bold mb-4 flex items-center gap-3">
                <span className="w-8 h-8 rounded-full bg-gradient-to-r from-blue-500 to-cyan-500 flex items-center justify-center text-sm font-bold">
                  ✓
                </span>
                24/7 Support
              </h3>
              <p className="text-gray-300">
                Our dedicated support team is always ready to help with any questions.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Footer */}
      <section className="px-6 md:px-12 py-20">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-4xl md:text-5xl font-bold mb-6">Ready to Start Shopping?</h2>
          <p className="text-xl text-gray-300 mb-10">
            Join thousands of happy customers and discover amazing products today.
          </p>
          <button
            onClick={() => openAuthModal("register")}
            className="px-10 py-4 rounded-lg bg-gradient-to-r from-blue-500 to-cyan-500 hover:from-blue-600 hover:to-cyan-600 transition font-semibold text-lg inline-flex items-center gap-2"
          >
            Create Your Account <ArrowRight size={20} />
          </button>
        </div>
      </section>

      {/* Auth Modal */}
      <AuthModal
        open={authModal.open}
        mode={authModal.mode}
        onClose={closeAuthModal}
        onSwitchMode={(mode) => setAuthModal({ open: true, mode })}
      />
    </div>
  );
}
