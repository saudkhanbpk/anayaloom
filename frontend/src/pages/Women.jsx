import React, { useState, useEffect } from "react";

export default function WomenProducts() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  const MEN_COLLECTION_JSON =
    "https://outfitters.com.pk/collections/men-new-arrivals-view-all/products.json";

  useEffect(() => {
    fetch(MEN_COLLECTION_JSON)
      .then((res) => {
        if (!res.ok) {
          throw new Error("Failed to fetch products");
        }
        return res.json();
      })
      .then((data) => {
        setProducts(data.products || []);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error:", error);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-60">
        <p className="text-lg font-medium">Loading Women products...</p>
      </div>
    );
  }

  if (!products.length) {
    return (
      <div className="flex justify-center items-center h-60">
        <p className="text-lg font-medium">No products found</p>
      </div>
    );
  }

  return (
    <section className="max-w-7xl mx-auto px-4 py-8">
      {/* Page Title */}
      <h1 className="text-2xl font-semibold mb-6">Women Collection</h1>

      {/* Product Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {products.map((product) => (
          <div
            key={product.id}
            className="border rounded-lg overflow-hidden bg-gray-200 shadow-sm hover:shadow-md transition"
          >
            {/* Product Image */}
            <div className="w-full h-64 overflow-hidden">
              <img
                src={product.images?.[0]?.src}
                alt={product.title}
                className="w-full h-full object-contain hover:scale-105 transition duration-300"
              />
            </div>

            {/* Product Info */}
            <div className="p-4">
              <h2 className="text-sm font-medium truncate">
                {product.title}
              </h2>

              <p className="text-gray-700 font-semibold mt-2">
                PKR {product.variants?.[0]?.price}
              </p>

              <button className="mt-4 w-full border border-black py-2 text-sm font-medium hover:bg-black hover:text-white transition">
                Add to Cart
              </button>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
