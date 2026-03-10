import React from "react";
import { Zap, Heart, Globe, Award } from "lucide-react";

export function About() {
  return (
    <div className="min-h-screen">
      {/* Hero section */}
      <section className="bg-gray-950 text-white py-24">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h1 className="text-white mb-4" style={{ fontWeight: 800, fontSize: "clamp(2rem, 5vw, 3.5rem)" }}>
            About LUXE
          </h1>
          <p className="text-gray-400 text-lg max-w-2xl mx-auto">
            We're on a mission to make premium lifestyle products accessible to everyone who appreciates quality, design, and craftsmanship.
          </p>
        </div>
      </section>

      {/* Values */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-gray-900 text-center mb-12" style={{ fontWeight: 700, fontSize: "1.75rem" }}>
            Our Values
          </h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              { icon: Zap, title: "Innovation", desc: "We bring you the latest products at the forefront of design and technology." },
              { icon: Heart, title: "Community", desc: "Built for the people. We listen, learn, and improve based on your feedback." },
              { icon: Globe, title: "Sustainability", desc: "We partner with brands committed to ethical and sustainable practices." },
              { icon: Award, title: "Quality", desc: "Every product is rigorously curated to meet our high standards." },
            ].map(({ icon: Icon, title, desc }) => (
              <div key={title} className="p-6 bg-gray-50 rounded-2xl text-center">
                <div className="w-12 h-12 bg-black rounded-full flex items-center justify-center mx-auto mb-4">
                  <Icon size={20} className="text-white" />
                </div>
                <h3 className="text-gray-900 mb-2" style={{ fontWeight: 700 }}>{title}</h3>
                <p className="text-sm text-gray-500 leading-relaxed">{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="py-16 bg-gray-950 text-white">
        <div className="max-w-4xl mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            {[
              { value: "50K+", label: "Happy Customers" },
              { value: "200+", label: "Premium Brands" },
              { value: "10K+", label: "Products" },
              { value: "99%", label: "Satisfaction Rate" },
            ].map(({ value, label }) => (
              <div key={label}>
                <p className="text-white" style={{ fontWeight: 800, fontSize: "2.5rem" }}>{value}</p>
                <p className="text-gray-400 text-sm mt-1">{label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
