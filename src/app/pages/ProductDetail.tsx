import React, { useState } from "react";
import { useParams, Link } from "react-router";
import { ArrowLeft, Heart, ShoppingCart, Star, Truck, ShieldCheck, RefreshCw } from "lucide-react";
import { products } from "../data/products";
import { useCart } from "../store/cartStore";
import { ProductCard } from "../components/ProductCard";

export function ProductDetail() {
  const { id } = useParams();
  const product = products.find((p) => p.id === Number(id));
  const { addToCart, toggleWishlist, wishlist } = useCart();
  const [qty, setQty] = useState(1);
  const [added, setAdded] = useState(false);

  if (!product) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <p className="text-gray-500">Product not found.</p>
          <Link to="/shop" className="mt-4 inline-block text-black underline text-sm">Back to Shop</Link>
        </div>
      </div>
    );
  }

  const isWishlisted = wishlist.includes(product.id);

  const handleAddToCart = () => {
    for (let i = 0; i < qty; i++) addToCart(product);
    setAdded(true);
    setTimeout(() => setAdded(false), 2000);
  };

  const related = products.filter((p) => p.category === product.category && p.id !== product.id).slice(0, 4);

  return (
    <div className="min-h-screen bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        {/* Breadcrumb */}
        <Link to="/shop" className="inline-flex items-center gap-2 text-sm text-gray-500 hover:text-black transition mb-8">
          <ArrowLeft size={16} />
          Back to Shop
        </Link>

        <div className="grid md:grid-cols-2 gap-12 mb-20">
          {/* Image */}
          <div className="relative bg-gray-50 rounded-3xl overflow-hidden aspect-square">
            <img
              src={product.image}
              alt={product.name}
              className="w-full h-full object-cover"
            />
            {product.badge && (
              <span className="absolute top-5 left-5 bg-black text-white text-xs px-3 py-1.5 rounded-full">
                {product.badge}
              </span>
            )}
          </div>

          {/* Info */}
          <div className="flex flex-col justify-center space-y-6">
            <div>
              <p className="text-xs text-gray-400 uppercase tracking-widest mb-2">{product.category}</p>
              <h1 className="text-gray-900" style={{ fontWeight: 800, fontSize: "2rem" }}>{product.name}</h1>
            </div>

            <div className="flex items-center gap-3">
              <div className="flex">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    size={16}
                    className={i < Math.floor(product.rating) ? "text-amber-400 fill-amber-400" : "text-gray-200 fill-gray-200"}
                  />
                ))}
              </div>
              <span className="text-sm text-gray-500">{product.rating} ({product.reviews} reviews)</span>
            </div>

            <p className="text-gray-600 leading-relaxed">{product.description}</p>

            <div className="flex items-baseline gap-3">
              <span className="text-3xl text-gray-900" style={{ fontWeight: 800 }}>${product.price.toFixed(2)}</span>
              {product.originalPrice && (
                <>
                  <span className="text-lg text-gray-400 line-through">${product.originalPrice.toFixed(2)}</span>
                  <span className="text-green-600 text-sm" style={{ fontWeight: 600 }}>
                    Save ${(product.originalPrice - product.price).toFixed(2)}
                  </span>
                </>
              )}
            </div>

            {/* Qty */}
            <div className="flex items-center gap-4">
              <p className="text-sm text-gray-600" style={{ fontWeight: 500 }}>Quantity</p>
              <div className="flex items-center border border-gray-200 rounded-full overflow-hidden">
                <button
                  onClick={() => setQty(Math.max(1, qty - 1))}
                  className="px-4 py-2 text-gray-500 hover:bg-gray-100 transition"
                >−</button>
                <span className="px-4 py-2 text-sm" style={{ fontWeight: 600 }}>{qty}</span>
                <button
                  onClick={() => setQty(qty + 1)}
                  className="px-4 py-2 text-gray-500 hover:bg-gray-100 transition"
                >+</button>
              </div>
            </div>

            {/* Actions */}
            <div className="flex gap-3">
              <button
                onClick={handleAddToCart}
                className={`flex-1 flex items-center justify-center gap-2 py-3.5 rounded-full text-sm transition ${
                  added ? "bg-green-500 text-white" : "bg-black text-white hover:bg-gray-800"
                }`}
                style={{ fontWeight: 600 }}
              >
                <ShoppingCart size={16} />
                {added ? "Added to Cart!" : "Add to Cart"}
              </button>
              <button
                onClick={() => toggleWishlist(product.id)}
                className="w-12 h-12 border border-gray-200 rounded-full flex items-center justify-center hover:bg-gray-50 transition"
              >
                <Heart
                  size={18}
                  className={isWishlisted ? "text-red-500 fill-red-500" : "text-gray-400"}
                />
              </button>
            </div>

            {/* Perks */}
            <div className="grid grid-cols-3 gap-4 pt-4 border-t border-gray-100">
              {[
                { icon: Truck, label: "Free Shipping" },
                { icon: RefreshCw, label: "30-Day Returns" },
                { icon: ShieldCheck, label: "Secure Pay" },
              ].map(({ icon: Icon, label }) => (
                <div key={label} className="flex flex-col items-center text-center gap-1.5">
                  <Icon size={18} className="text-gray-400" />
                  <span className="text-xs text-gray-500">{label}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Related Products */}
        {related.length > 0 && (
          <div>
            <h2 className="text-gray-900 mb-6" style={{ fontWeight: 700, fontSize: "1.5rem" }}>
              You May Also Like
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {related.map((p) => (
                <ProductCard key={p.id} product={p} />
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
