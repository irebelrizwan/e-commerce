import React from "react";
import { Link } from "react-router";
import { Heart, ShoppingCart, Star } from "lucide-react";
import { Product, useCart } from "../store/cartStore";
import toast from "react-hot-toast";
import { useCompare } from "../store/compareStore";

interface ProductCardProps {
  product: Product;
}

export function ProductCard({ product }: ProductCardProps) {
  const { addToCart, toggleWishlist, wishlist } = useCart();
  const isWishlisted = wishlist.includes(product.id);
  const { toggleCompare } = useCompare();

  const badgeColors: Record<string, string> = {
    Sale: "bg-red-500",
    New: "bg-blue-500",
    Bestseller: "bg-amber-500",
  };

  return (
    <div className="group relative bg-white rounded-2xl overflow-hidden border border-gray-100 hover:shadow-xl transition-all duration-300 hover:-translate-y-1">

      {/* IMAGE SECTION */}
      <div className="relative overflow-hidden bg-gray-50 aspect-[4/3]">

        <Link to={`/product/${product.id}`} className="block">
          <img
            src={product.image}
            alt={product.name}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 pointer-events-none"
          />
        </Link>

        {/* BADGE */}
        {product.badge && (
          <span className={`absolute top-3 left-3 ${badgeColors[product.badge] || "bg-gray-700"} text-white text-xs px-2.5 py-1 rounded-full`}>
            {product.badge}
          </span>
        )}

        {/* 🔥 COMPARE BUTTON (FIXED) */}
        <button
          onClick={(e) => {
            e.stopPropagation();
            toggleCompare(product.id);
            console.log("COMPARE CLICKED", product.id);
          }}
          className="absolute bottom-3 left-3 z-30 bg-[#099EE9] text-white px-3 py-1 rounded-full text-xs hover:bg-[#0785c7] transition"
        >
          Compare
        </button>

        {/* WISHLIST BUTTON */}
        <button
          onClick={(e) => {
            e.stopPropagation();
            if (!isWishlisted) {
              toggleWishlist(product.id);
              toast.success("Added to wishlist");
            } else {
              toggleWishlist(product.id);
              toast("Removed from wishlist");
            }
          }}
          className="absolute top-3 right-3 z-30 w-8 h-8 bg-white rounded-full flex items-center justify-center shadow-md opacity-0 group-hover:opacity-100 transition-all duration-200 hover:scale-110"
        >
          <Heart
            size={15}
            className={isWishlisted ? "text-red-500 fill-red-500" : "text-gray-400"}
          />
        </button>

      </div>

      {/* CONTENT */}
      <div className="p-4">
        <p className="text-xs text-gray-400 uppercase tracking-wider mb-1">
          {product.category}
        </p>

        <Link to={`/product/${product.id}`}>
          <h3 className="text-gray-900 mb-2 hover:text-black transition-colors line-clamp-1 font-semibold">
            {product.name}
          </h3>
        </Link>

        <div className="flex items-center gap-1 mb-3">
          <div className="flex">
            {[...Array(5)].map((_, i) => (
              <Star
                key={i}
                size={12}
                className={
                  i < Math.floor(product.rating)
                    ? "text-amber-400 fill-amber-400"
                    : "text-gray-200 fill-gray-200"
                }
              />
            ))}
          </div>
          <span className="text-xs text-gray-400">
            ({product.reviews})
          </span>
        </div>

        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="text-gray-900 font-bold">
              ${product.price.toFixed(2)}
            </span>
            {product.originalPrice && (
              <span className="text-sm text-gray-400 line-through">
                ${product.originalPrice.toFixed(2)}
              </span>
            )}
          </div>

          <button
            onClick={() => {
              addToCart(product);
              toast.success("Added to cart");
            }}
            className="flex items-center gap-1.5 bg-[#099EE9] text-white text-xs px-3 py-2 rounded-full hover:bg-[#0785c7] transition"
          >
            <ShoppingCart size={13} />
            Add
          </button>
        </div>
      </div>
    </div>
  );
}