import React, { useState, useEffect } from "react";
import { Link } from "react-router";
import { ArrowRight, ShieldCheck, Truck, RefreshCw, Headphones } from "lucide-react";
import { products } from "../data/products";
import { ProductCard } from "../components/ProductCard";
import { ChevronLeft, ChevronRight } from "lucide-react";
import heroVideo from "../components/photos/hero_vid1.mp4";
import homecard from "../components/photos/homecard.png";

export function Home() {
  const [currentSlide, setCurrentSlide] = useState(0);
  useEffect(() => {
  const interval = setInterval(() => {
    setCurrentSlide((prev) => (prev + 1) % slides.length);
  }, 4000);

  return () => clearInterval(interval);
}, []);
const nextSlide = () => {
  setCurrentSlide((prev) => (prev + 1) % slides.length);
};

const prevSlide = () => {
  setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
};
  const slides = [
  {
    badge: "New Collection 2026",
    title1: "Elevate Your",
    title2: "Personal Style",
    desc: "Discover curated collections of premium fashion, electronics, and accessories — crafted for the modern lifestyle.",
    image: products[3].image
  },
  {
    badge: "Trending Electronics",
    title1: "Upgrade Your",
    title2: "Smart Living",
    desc: "Explore cutting-edge gadgets and premium electronics designed for modern convenience.",
    image: products[1].image
  },
  {
    badge: "Fashion Picks",
    title1: "Style Meets",
    title2: "Comfort",
    desc: "Step into a world of trendy fashion and accessories tailored for everyday elegance.",
    image: products[2].image
  }
];
  const featured = products.slice(0, 12);

  return (
    <div>
      {/* Hero */}
      <section className="relative text-white overflow-hidden">

  {/* VIDEO */}
  <video
    autoPlay
    loop
    muted
    playsInline
    className="absolute inset-0 w-full h-full object-cover"
  >
    <source src={heroVideo} type="video/mp4" />
  </video>

  {/* OVERLAY */}
  <div className="absolute inset-0 bg-black/50"></div>

  {/* LEFT BUTTON */}
  <button
    onClick={prevSlide}
    className="absolute left-6 top-1/2 -translate-y-1/2 bg-white/10 hover:bg-white/20 text-white w-10 h-10 rounded-full flex items-center justify-center backdrop-blur transition z-10"
  >
    <ChevronLeft size={22} />
  </button>

  {/* RIGHT BUTTON */}
  <button
    onClick={nextSlide}
    className="absolute right-6 top-1/2 -translate-y-1/2 bg-white/10 hover:bg-white/20 text-white w-10 h-10 rounded-full flex items-center justify-center backdrop-blur transition z-10"
  >
    <ChevronRight size={22} />
  </button>

  {/* CONTENT */}
  <div className="relative z-10 max-w-4xl mx-auto px-4 py-20 flex flex-col items-center justify-center text-center gap-6">

    <span className="inline-block bg-white/10 text-white text-xs px-3 py-1.5 rounded-full tracking-widest uppercase">
      {slides[currentSlide].badge}
    </span>

    <h1
      className="text-white"
      style={{ fontSize: "clamp(2.5rem, 5vw, 4rem)", fontWeight: 800 }}
    >
      {slides[currentSlide].title1}
      <br />
      <span className="bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
        {slides[currentSlide].title2}
      </span>
    </h1>

    <p className="text-gray-300 text-lg max-w-xl">
      {slides[currentSlide].desc}
    </p>

    <div className="flex justify-center gap-4">
      <Link
        to="/home/shop"
        className="bg-white text-black px-6 py-3 rounded-full text-sm"
      >
        Shop Now
      </Link>

      <Link
        to="/home/about"
        className="border border-white/20 px-6 py-3 rounded-full text-sm"
      >
        Learn More
      </Link>
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
              to={`/home/shop?category=${cat}`}
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
              to="/home/shop"
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

    <div className="relative rounded-3xl p-10 md:p-16 flex flex-col md:flex-row items-center justify-between gap-8 text-white overflow-hidden">

      {/* Background Image */}
      <img
        src={homecard}
        alt="Promo"
        className="absolute inset-0 w-full h-150 object-cover"
      />

      {/* Overlay */}
      <div className="absolute inset-0 bg-black/50"></div>

      {/* Content */}
      <div className="relative z-10 text-center md:text-left">
        <p className="text-blue-400 text-sm uppercase tracking-widest mb-2 font-semibold">
          Limited Time
        </p>

        <h3 className="mb-3 text-3xl font-extrabold">
          Up to 40% Off<br />Selected Items
        </h3>

        <p className="text-gray-200">
          Use code <span className="text-white font-bold">Origin40</span> at checkout
        </p>
      </div>

      {/* Button */}
      <Link
        to="/home/shop"
        className="relative z-10 shrink-0 bg-white text-black px-8 py-3.5 rounded-full text-sm hover:bg-gray-100 transition font-semibold"
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
                <div className="w-12 h-12 bg-[#099EE9] rounded-full flex items-center justify-center">
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
