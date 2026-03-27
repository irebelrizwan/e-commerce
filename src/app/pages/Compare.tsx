import { products } from "../data/products";
import { useCompare } from "../store/compareStore";

export function Compare() {
  const { items } = useCompare();

  const selected = products.filter((p) => items.includes(p.id));

  if (selected.length === 0) {
    return (
      <div className="py-32 text-center">
        <h2 className="text-2xl font-semibold text-gray-600">
          No products selected
        </h2>
        <p className="text-gray-400 mt-2">
          Add products to compare from the shop page
        </p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#f8fbff] to-[#eef5ff] py-16 px-4">
      
      {/* Heading */}
      <h1 className="text-3xl md:text-4xl font-bold text-center mb-12 text-gray-900">
        Compare Products
      </h1>

      {/* Horizontal Scroll */}
      <div className="overflow-x-auto">
        <div className="flex gap-6 min-w-max justify-center">

          {selected.map((product) => (
            <div
              key={product.id}
              className="w-72 bg-white/80 backdrop-blur-lg border border-gray-200 rounded-3xl shadow-lg hover:shadow-2xl transition-all duration-300 p-5"
            >
              
              {/* Image */}
              <div className="h-48 bg-gray-100 rounded-2xl overflow-hidden mb-4 flex items-center justify-center">
                <img
                  src={product.image}
                  alt={product.name}
                  className="h-full object-contain"
                />
              </div>

              {/* Name */}
              <h2 className="text-lg font-semibold text-gray-900 mb-2 line-clamp-2">
                {product.name}
              </h2>

              {/* Price */}
              <p className="text-[#099EE9] font-bold text-lg mb-3">
                ${product.price}
              </p>

              {/* Divider */}
              <div className="border-t border-gray-200 my-3"></div>

              {/* Details */}
              <div className="space-y-3 text-sm">

                <div className="flex justify-between">
                  <span className="text-gray-400">Category</span>
                  <span className="text-gray-700 font-medium">
                    {product.category}
                  </span>
                </div>

                <div className="flex justify-between">
                  <span className="text-gray-400">Rating</span>
                  <span className="text-yellow-500 font-medium">
                    ⭐ {product.rating}
                  </span>
                </div>

                <div className="flex justify-between">
                  <span className="text-gray-400">Reviews</span>
                  <span className="text-gray-700 font-medium">
                    {product.reviews}
                  </span>
                </div>

                {product.originalPrice && (
                  <div className="flex justify-between">
                    <span className="text-gray-400">Original</span>
                    <span className="text-gray-500 line-through">
                      ${product.originalPrice}
                    </span>
                  </div>
                )}

              </div>

              {/* CTA */}
              <button className="mt-5 w-full bg-[#099EE9] text-white py-2 rounded-full hover:bg-[#0785c7] transition text-sm font-semibold">
                View Product
              </button>

            </div>
          ))}

        </div>
      </div>
    </div>
  );
}