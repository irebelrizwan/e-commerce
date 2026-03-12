import React from "react";
import { Link } from "react-router";
import { ArrowRight, ShieldCheck, Truck, RefreshCw, Headphones } from "lucide-react";
import { products } from "../data/products";
import { ProductCard } from "../components/ProductCard";

export function Home() {
  const featured = products.slice(0, 4);

  return (
    <div>
      {/* Hero */}
      <section className="bg-gradient-to-r from-[#2C1446] via-[#1C1921] to-[#1A1A1A] text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 md:py-32 grid md:grid-cols-2 gap-12 items-center">
          <div className="space-y-6">
            <span className="inline-block bg-white/10 text-white text-xs px-3 py-1.5 rounded-full tracking-widest uppercase">
              New Collection 2026
            </span>
            <h1 className="text-white" style={{ fontSize: "clamp(2.5rem, 5vw, 4rem)", fontWeight: 800, lineHeight: 1.1 }}>
              Elevate Your<br />
              <span className="bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
                Personal Style
              </span>
            </h1>
            <p className="text-gray-400 text-lg max-w-md">
              Discover curated collections of premium fashion, electronics, and accessories — crafted for the modern lifestyle.
            </p>
            <div className="flex flex-wrap gap-4">
              <Link
                to="/shop"
                className="flex items-center gap-2 bg-white text-black px-6 py-3.5 rounded-full text-sm hover:bg-gray-100 transition"
                style={{ fontWeight: 600 }}
              >
                Shop Now <ArrowRight size={16} />
              </Link>
              <Link
                to="/about"
                className="flex items-center gap-2 border border-white/20 text-white px-6 py-3.5 rounded-full text-sm hover:bg-white/10 transition"
              >
                Learn More
              </Link>
            </div>
          </div>

          <div className="relative hidden md:block">
            <div className="relative w-full aspect-square max-w-lg mx-auto">
              <div className="absolute inset-0 bg-gradient-to-br from-purple-600/30 to-pink-600/30 rounded-3xl blur-3xl" />
              <img
                src={products[3].image}
                alt="Featured product"
                className="relative rounded-3xl object-cover w-full h-full shadow-2xl"
              />
              {/* Floating badge */}
              <div className="absolute -bottom-4 -left-4 bg-white text-gray-900 px-4 py-3 rounded-2xl shadow-xl">
                <p className="text-xs text-gray-500">Best Seller</p>
                <p className="text-sm" style={{ fontWeight: 700 }}>ProSound Headphones</p>
                <p className="text-sm text-purple-600" style={{ fontWeight: 700 }}>$299.00</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Categories */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-[#099EE9] mb-8 text-center" style={{ fontWeight: 700, fontSize: "1.75rem" }}>
            Shop by Category
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
          {["Electronics", "Footwear", "Clothing", "Accessories", "Bags", "Beauty"].map((cat) => (
            <Link
              key={cat}
              to={`/shop?category=${cat}`}
              className="flex flex-col items-center gap-2 p-4 bg-gray-50 rounded-2xl hover:bg-[#099EE9] hover:text-white transition-all duration-200 group text-center"
            >
              <span className="text-sm group-hover:text-white text-gray-700" style={{ fontWeight: 500 }}>
                {cat}
              </span>
            </Link>
          ))}
        </div>
        </div>
      </section>

      {/* Featured Products */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-gray-900" style={{ fontWeight: 700, fontSize: "1.75rem" }}>
              Featured Products
            </h2>
            <Link
              to="/shop"
              className="flex items-center gap-1 text-sm text-gray-500 hover:text-black transition"
            >
              View all <ArrowRight size={15} />
            </Link>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {featured.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </div>
      </section>

      {/* Promo Banner */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-gradient-to-r from-[#2C1446] via-[#1C1921] to-[#1A1A1A] rounded-3xl p-10 md:p-16 flex flex-col md:flex-row items-center justify-between gap-8 text-white">
            <div className="text-white text-center md:text-left">
              <p className="text-purple-400 text-sm uppercase tracking-widest mb-2" style={{ fontWeight: 600 }}>Limited Time</p>
              <h3 className="text-white mb-3" style={{ fontWeight: 800, fontSize: "2rem" }}>
                Up to 40% Off<br />Selected Items
              </h3>
              <p className="text-gray-400">Use code <span className="text-white" style={{ fontWeight: 700 }}>Origin40</span> at checkout</p>
            </div>
            <Link
              to="/shop"
              className="shrink-0 bg-white text-black px-8 py-3.5 rounded-full text-sm hover:bg-gray-100 transition"
              style={{ fontWeight: 600 }}
            >
              Shop the Sale
            </Link>
          </div>
        </div>
      </section>

      {/* Trust Badges */}
      <section className="py-14 bg-gray-50 border-t border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            {[
              { icon: Truck, title: "Free Shipping", desc: "On orders over $75" },
              { icon: RefreshCw, title: "Easy Returns", desc: "30-day return policy" },
              { icon: ShieldCheck, title: "Secure Payment", desc: "SSL encrypted checkout" },
              { icon: Headphones, title: "24/7 Support", desc: "Always here to help" },
            ].map(({ icon: Icon, title, desc }) => (
              <div key={title} className="flex flex-col items-center gap-3">
                <div className="w-12 h-12 bg-black rounded-full flex items-center justify-center">
                  <Icon size={20} className="text-white" />
                </div>
                <div>
                  <p className="text-gray-900 text-sm" style={{ fontWeight: 600 }}>{title}</p>
                  <p className="text-gray-500 text-xs mt-0.5">{desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
