import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { addToCart } from "../redux/cartslice";

export default function JuniorsProducts() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const dispatch = useDispatch();

  const JUNIORS_COLLECTION_JSON =
    "https://outfitters.com.pk/collections/juniors-new-arrivals/products.json";

  useEffect(() => {
    fetch(JUNIORS_COLLECTION_JSON)
      .then((res) => res.json())
      .then((data) => {
        setProducts(data.products || []);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  const handleAddToCart = (product) => {
    dispatch(
      addToCart({
        id: product.id,
        title: product.title,
        price: product.variants?.[0]?.price,
        image: product.images?.[0]?.src,
      })
    );
  };

  if (loading) {
    return <p className="text-center">Loading Men products...</p>;
  }

  return (
    <section className="max-w-7xl mx-auto px-4 py-8">
      <h1 className="text-2xl font-semibold mb-6">Men Collection</h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {products.map((product) => (
          <div
            key={product.id}
            className="border rounded-lg bg-gray-300 shadow-sm"
          >
            <img
              src={product.images?.[0]?.src}
              alt={product.title}
              className="h-64 w-full object-contain"
            />

            <div className="p-4">
              <h2 className="text-sm font-medium truncate">
                {product.title}
              </h2>

              <p className="font-semibold mt-2">
                PKR {product.variants?.[0]?.price}
              </p>

              <button
                onClick={() => handleAddToCart(product)}
                className="mt-4 w-full border border-black py-2 text-sm hover:bg-black hover:text-white transition"
              >
                Add to Cart
              </button>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

