import React from "react";
import { X, Minus, Plus, Trash2, ShoppingBag } from "lucide-react";
import { useCart } from "../store/cartStore";
import { Link } from "react-router";

interface CartDrawerProps {
  open: boolean;
  onClose: () => void;
}

export function CartDrawer({ open, onClose }: CartDrawerProps) {
  const { cart, removeFromCart, updateQuantity, cartTotal, clearCart } = useCart();

  return (
    <>
      {/* Backdrop */}
      <div
        className={`fixed inset-0 bg-black/40 z-50 transition-opacity duration-300 ${open ? "opacity-100" : "opacity-0 pointer-events-none"}`}
        onClick={onClose}
      />

      {/* Drawer */}
      <div
        className={`fixed right-0 top-0 h-full w-full max-w-md bg-white z-50 flex flex-col shadow-2xl transition-transform duration-300 ${
          open ? "translate-x-0" : "translate-x-full"
        }`}
      >
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-5 border-b border-gray-100">
          <div className="flex items-center gap-2">
            <ShoppingBag size={20} className="text-gray-800" />
            <h2 className="text-gray-900" style={{ fontWeight: 700 }}>Your Cart</h2>
            {cart.length > 0 && (
              <span className="bg-black text-white text-xs px-2 py-0.5 rounded-full">
                {cart.reduce((s, i) => s + i.quantity, 0)}
              </span>
            )}
          </div>
          <button onClick={onClose} className="p-2 rounded-full hover:bg-gray-100 transition">
            <X size={20} className="text-gray-500" />
          </button>
        </div>

        {/* Items */}
        <div className="flex-1 overflow-y-auto px-6 py-4 space-y-4">
          {cart.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-full gap-4 text-center">
              <div className="w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center">
                <ShoppingBag size={32} className="text-gray-300" />
              </div>
              <div>
                <p className="text-gray-700" style={{ fontWeight: 600 }}>Your cart is empty</p>
                <p className="text-sm text-gray-400 mt-1">Add some items to get started</p>
              </div>
              <button
                onClick={onClose}
                className="mt-2 bg-[#099EE9] text-white px-6 py-2.5 rounded-full text-sm hover:bg-gray-800 transition"
              >
                Continue Shopping
              </button>
            </div>
          ) : (
            cart.map((item) => (
              <div key={item.id} className="flex gap-4 bg-gray-50 rounded-xl p-3">
                <img
                  src={item.image}
                  alt={item.name}
                  className="w-18 h-18 object-cover rounded-lg w-[72px] h-[72px] shrink-0"
                />
                <div className="flex-1 min-w-0">
                  <p className="text-sm text-gray-900 truncate" style={{ fontWeight: 600 }}>{item.name}</p>
                  <p className="text-xs text-gray-400">{item.category}</p>
                  <p className="text-sm text-gray-900 mt-1" style={{ fontWeight: 700 }}>${item.price.toFixed(2)}</p>
                  <div className="flex items-center gap-2 mt-2">
                    <button
                      onClick={() => updateQuantity(item.id, item.quantity - 1)}
                      className="w-6 h-6 rounded-full border border-gray-200 flex items-center justify-center hover:bg-gray-200 transition"
                    >
                      <Minus size={12} />
                    </button>
                    <span className="text-sm w-5 text-center" style={{ fontWeight: 600 }}>{item.quantity}</span>
                    <button
                      onClick={() => updateQuantity(item.id, item.quantity + 1)}
                      className="w-6 h-6 rounded-full border border-gray-200 flex items-center justify-center hover:bg-gray-200 transition"
                    >
                      <Plus size={12} />
                    </button>
                  </div>
                </div>
                <button
                  onClick={() => removeFromCart(item.id)}
                  className="p-1.5 rounded-full hover:bg-red-50 transition self-start"
                >
                  <Trash2 size={14} className="text-red-400" />
                </button>
              </div>
            ))
          )}
        </div>

        {/* Footer */}
        {cart.length > 0 && (
          <div className="border-t border-gray-100 px-6 py-5 space-y-4">
            <div className="space-y-2">
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
            <Link
              to="/checkout"
              onClick={onClose}
              className="block w-full bg-[#099EE9] text-white text-center py-3.5 rounded-full hover:bg-gray-800 transition text-sm"
              style={{ fontWeight: 600 }}
            >
              Checkout
            </Link>
            <button
              onClick={clearCart}
              className="w-full text-center text-sm text-gray-400 hover:text-gray-700 transition"
            >
              Clear cart
            </button>
          </div>
        )}
      </div>
    </>
  );
}
