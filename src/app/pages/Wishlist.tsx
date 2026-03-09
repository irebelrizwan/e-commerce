import React from "react";
import { Heart } from "lucide-react";
import { Link } from "react-router";
import { useCart } from "../store/cartStore";
import { products } from "../data/products";
import { ProductCard } from "../components/ProductCard";

export function Wishlist() {
  const { wishlist } = useCart();
  const wishlisted = products.filter((p) => wishlist.includes(p.id));

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <div className="flex items-center gap-3 mb-8">
          <Heart size={24} className="text-red-500 fill-red-500" />
          <h1 className="text-gray-900" style={{ fontWeight: 800, fontSize: "2rem" }}>Wishlist</h1>
          {wishlisted.length > 0 && (
            <span className="bg-red-500 text-white text-sm px-2.5 py-0.5 rounded-full">{wishlisted.length}</span>
          )}
        </div>

        {wishlisted.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-32 gap-5">
            <div className="w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center">
              <Heart size={32} className="text-gray-300" />
            </div>
            <div className="text-center">
              <p className="text-gray-700" style={{ fontWeight: 600 }}>Your wishlist is empty</p>
              <p className="text-sm text-gray-400 mt-1">Save items you love to your wishlist</p>
            </div>
            <Link
              to="/shop"
              className="bg-black text-white px-6 py-2.5 rounded-full text-sm hover:bg-gray-800 transition"
              style={{ fontWeight: 600 }}
            >
              Browse Products
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {wishlisted.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
