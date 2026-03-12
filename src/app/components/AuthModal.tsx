import React, { useState } from "react";
import { X, Eye, EyeOff, Loader2 } from "lucide-react";
import { useAuth } from "../store/authStore";

interface AuthModalProps {
  open: boolean;
  mode: "login" | "register";
  onClose: () => void;
  onSwitchMode: (mode: "login" | "register") => void;
}

export function AuthModal({ open, mode, onClose, onSwitchMode }: AuthModalProps) {
  const { login, register } = useAuth();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPass, setShowPass] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const reset = () => {
    setName(""); setEmail(""); setPassword("");
    setError(""); setShowPass(false); setLoading(false);
  };

  const handleClose = () => { reset(); onClose(); };
  const handleSwitch = (m: "login" | "register") => { reset(); onSwitchMode(m); };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    const result =
      mode === "login"
        ? await login(email, password)
        : await register(name, email, password);

    setLoading(false);
    if (result.error) {
      setError(result.error);
    } else {
      reset();
      onClose();
    }
  };

  if (!open) return null;

  const inputClass =
    "w-full border border-gray-200 rounded-xl px-4 py-3 text-sm outline-none focus:border-black transition placeholder-gray-400";

  return (
    <>
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black/40 z-50 backdrop-blur-sm"
        onClick={handleClose}
      />

      {/* Modal */}
      <div className="fixed inset-0 z-50 flex items-center justify-center px-4">
        <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md p-8 relative">
          {/* Close */}
          <button
            onClick={handleClose}
            className="absolute top-4 right-4 p-2 rounded-full hover:bg-gray-100 transition"
          >
            <X size={18} className="text-gray-500" />
          </button>

          {/* Header */}
          <div className="mb-7">
            <h2 className="text-gray-900 text-2xl" style={{ fontWeight: 700 }}>
              {mode === "login" ? "Welcome back" : "Create account"}
            </h2>
            <p className="text-sm text-gray-400 mt-1">
              {mode === "login"
                ? "Sign in to your Origin account"
                : "Join Origin and start shopping"}
            </p>
          </div>

          {/* Demo hint */}
          {mode === "login" && (
            <div className="bg-gray-50 border border-gray-100 rounded-xl px-4 py-3 mb-5 text-xs text-gray-500">
              Demo: <span className="text-gray-700 font-medium">demo@Origin.com</span> / <span className="text-gray-700 font-medium">password</span>
            </div>
          )}

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-4">
            {mode === "register" && (
              <div>
                <label className="block text-xs text-gray-500 mb-1.5" style={{ fontWeight: 500 }}>Full Name</label>
                <input
                  required
                  type="text"
                  placeholder="John Doe"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className={inputClass}
                />
              </div>
            )}

            <div>
              <label className="block text-xs text-gray-500 mb-1.5" style={{ fontWeight: 500 }}>Email Address</label>
              <input
                required
                type="email"
                placeholder="you@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className={inputClass}
              />
            </div>

            <div>
              <label className="block text-xs text-gray-500 mb-1.5" style={{ fontWeight: 500 }}>Password</label>
              <div className="relative">
                <input
                  required
                  type={showPass ? "text" : "password"}
                  placeholder={mode === "register" ? "Min. 6 characters" : "Enter your password"}
                  value={password}
                  minLength={mode === "register" ? 6 : undefined}
                  onChange={(e) => setPassword(e.target.value)}
                  className={`${inputClass} pr-11`}
                />
                <button
                  type="button"
                  onClick={() => setShowPass(!showPass)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 p-1 text-gray-400 hover:text-gray-600 transition"
                >
                  {showPass ? <EyeOff size={16} /> : <Eye size={16} />}
                </button>
              </div>
            </div>

            {error && (
              <p className="text-xs text-red-500 bg-red-50 border border-red-100 rounded-lg px-3 py-2">
                {error}
              </p>
            )}

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-black text-white py-3 rounded-xl text-sm flex items-center justify-center gap-2 hover:bg-gray-800 transition disabled:opacity-60"
              style={{ fontWeight: 600 }}
            >
              {loading && <Loader2 size={15} className="animate-spin" />}
              {mode === "login" ? "Sign In" : "Create Account"}
            </button>
          </form>

          {/* Switch */}
          <p className="text-center text-sm text-gray-400 mt-6">
            {mode === "login" ? "Don't have an account?" : "Already have an account?"}{" "}
            <button
              onClick={() => handleSwitch(mode === "login" ? "register" : "login")}
              className="text-black hover:underline"
              style={{ fontWeight: 600 }}
            >
              {mode === "login" ? "Register" : "Sign In"}
            </button>
          </p>
        </div>
      </div>
    </>
  );
}
