import React, { useState } from "react";
import { Link } from "react-router";
import { ArrowLeft, CheckCircle } from "lucide-react";
import { useCart } from "../store/cartStore";

export function Checkout() {
  const { cart, cartTotal, clearCart } = useCart();
  const [submitted, setSubmitted] = useState(false);
  const [form, setForm] = useState({
    name: "", email: "", address: "", city: "", zip: "",
    card: "", expiry: "", cvv: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    clearCart();
  };

  if (submitted) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4">
        <div className="bg-white rounded-3xl p-12 text-center max-w-md w-full shadow-sm border border-gray-100">
          <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
            <CheckCircle size={40} className="text-green-500" />
          </div>
          <h2 className="text-gray-900 mb-3" style={{ fontWeight: 800, fontSize: "1.75rem" }}>Order Placed!</h2>
          <p className="text-gray-500 mb-8">
            Thanks for your order! You'll receive a confirmation email at <strong>{form.email}</strong> shortly.
          </p>
          <Link
            to="/"
            className="inline-block bg-[#099EE9] text-white px-8 py-3.5 rounded-full text-sm hover:bg-gray-800 transition"
            style={{ fontWeight: 600 }}
          >
            Back to Home
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <Link to="/shop" className="inline-flex items-center gap-2 text-sm text-gray-500 hover:text-black transition mb-8">
          <ArrowLeft size={16} />
          Continue Shopping
        </Link>

        <h1 className="text-gray-900 mb-10" style={{ fontWeight: 800, fontSize: "2rem" }}>Checkout</h1>

        <div className="grid lg:grid-cols-5 gap-10">
          {/* Form */}
          <form onSubmit={handleSubmit} className="lg:col-span-3 space-y-8">
            {/* Shipping */}
            <div className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm">
              <h3 className="text-gray-900 mb-5" style={{ fontWeight: 700 }}>Shipping Information</h3>
              <div className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs text-gray-500 mb-1.5" style={{ fontWeight: 500 }}>Full Name</label>
                    <input
                      required
                      name="name"
                      value={form.name}
                      onChange={handleChange}
                      placeholder="John Doe"
                      className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm outline-none focus:border-black transition"
                    />
                  </div>
                  <div>
                    <label className="block text-xs text-gray-500 mb-1.5" style={{ fontWeight: 500 }}>Email</label>
                    <input
                      required
                      type="email"
                      name="email"
                      value={form.email}
                      onChange={handleChange}
                      placeholder="john@example.com"
                      className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm outline-none focus:border-black transition"
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-xs text-gray-500 mb-1.5" style={{ fontWeight: 500 }}>Address</label>
                  <input
                    required
                    name="address"
                    value={form.address}
                    onChange={handleChange}
                    placeholder="123 Main Street"
                    className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm outline-none focus:border-black transition"
                  />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs text-gray-500 mb-1.5" style={{ fontWeight: 500 }}>City</label>
                    <input
                      required
                      name="city"
                      value={form.city}
                      onChange={handleChange}
                      placeholder="New York"
                      className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm outline-none focus:border-black transition"
                    />
                  </div>
                  <div>
                    <label className="block text-xs text-gray-500 mb-1.5" style={{ fontWeight: 500 }}>ZIP Code</label>
                    <input
                      required
                      name="zip"
                      value={form.zip}
                      onChange={handleChange}
                      placeholder="10001"
                      className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm outline-none focus:border-black transition"
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* Payment */}
            <div className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm">
              <h3 className="text-gray-900 mb-5" style={{ fontWeight: 700 }}>Payment Details</h3>
              <div className="space-y-4">
                <div>
                  <label className="block text-xs text-gray-500 mb-1.5" style={{ fontWeight: 500 }}>Card Number</label>
                  <input
                    required
                    name="card"
                    value={form.card}
                    onChange={handleChange}
                    placeholder="1234 5678 9012 3456"
                    maxLength={19}
                    className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm outline-none focus:border-black transition"
                  />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs text-gray-500 mb-1.5" style={{ fontWeight: 500 }}>Expiry Date</label>
                    <input
                      required
                      name="expiry"
                      value={form.expiry}
                      onChange={handleChange}
                      placeholder="MM / YY"
                      className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm outline-none focus:border-black transition"
                    />
                  </div>
                  <div>
                    <label className="block text-xs text-gray-500 mb-1.5" style={{ fontWeight: 500 }}>CVV</label>
                    <input
                      required
                      name="cvv"
                      value={form.cvv}
                      onChange={handleChange}
                      placeholder="123"
                      maxLength={4}
                      className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm outline-none focus:border-black transition"
                    />
                  </div>
                </div>
              </div>
            </div>

            <button
              type="submit"
              className="w-full bg-[#099EE9] text-white py-4 rounded-full text-sm hover:bg-gray-800 transition"
              style={{ fontWeight: 700 }}
            >
              Place Order — ${cartTotal.toFixed(2)}
            </button>
          </form>

          {/* Summary */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm sticky top-24">
              <h3 className="text-gray-900 mb-5" style={{ fontWeight: 700 }}>Order Summary</h3>
              <div className="space-y-4 mb-6">
                {cart.map((item) => (
                  <div key={item.id} className="flex gap-3 items-center">
                    <img
                      src={item.image}
                      alt={item.name}
                      className="w-12 h-12 object-cover rounded-lg shrink-0"
                    />
                    <div className="flex-1 min-w-0">
                      <p className="text-sm text-gray-800 truncate" style={{ fontWeight: 500 }}>{item.name}</p>
                      <p className="text-xs text-gray-400">Qty: {item.quantity}</p>
                    </div>
                    <p className="text-sm text-gray-900" style={{ fontWeight: 600 }}>
                      ${(item.price * item.quantity).toFixed(2)}
                    </p>
                  </div>
                ))}
              </div>
              <div className="space-y-2 border-t border-gray-100 pt-4">
                <div className="flex justify-between text-sm text-gray-500">
                  <span>Subtotal</span>
                  <span>${cartTotal.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-sm text-gray-500">
                  <span>Shipping</span>
                  <span className="text-green-500">Free</span>
                </div>
                <div className="flex justify-between text-gray-900 pt-2 border-t border-gray-100" style={{ fontWeight: 700 }}>
                  <span>Total</span>
                  <span>${cartTotal.toFixed(2)}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
