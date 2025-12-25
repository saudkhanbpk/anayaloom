// import React, { useState, useEffect } from "react";
// import { useDispatch } from "react-redux";
// import { addToCart } from "../redux/cartslice";

// export default function JuniorsProducts() {
//   const [products, setProducts] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const dispatch = useDispatch();

//   const JUNIORS_COLLECTION_JSON =
//     "https://outfitters.com.pk/collections/juniors-new-arrivals/products.json";

//   useEffect(() => {
//     fetch(JUNIORS_COLLECTION_JSON)
//       .then((res) => res.json())
//       .then((data) => {
//         setProducts(data.products || []);
//         setLoading(false);
//       })
//       .catch(() => setLoading(false));
//   }, []);

//   const handleAddToCart = (product) => {
//     dispatch(
//       addToCart({
//         id: product.id,
//         title: product.title,
//         price: product.variants?.[0]?.price,
//         image: product.images?.[0]?.src,
//       })
//     );
//   };

//   if (loading) {
//     return <p className="text-center">Loading Juniors products...</p>;
//   }

//   return (
//     <section className="max-w-7xl mx-auto px-4 py-8">
//       <h1 className="text-2xl font-semibold mb-6">Juniors Collection</h1>

//       <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
//         {products.map((product) => (
//           <div
//             key={product.id}
//             className="border rounded-lg bg-gray-300 shadow-sm"
//           >
//             <img
//               src={product.images?.[0]?.src}
//               alt={product.title}
//               className="h-64 w-full object-contain"
//             />

//             <div className="p-4">
//               <h2 className="text-sm font-medium truncate">
//                 {product.title}
//               </h2>

//               <p className="font-semibold mt-2">
//                 PKR {product.variants?.[0]?.price}
//               </p>

//               <button
//                 onClick={() => handleAddToCart(product)}
//                 className="mt-4 w-full border border-black py-2 text-sm hover:bg-black hover:text-white transition"
//               >
//                 Add to Cart
//               </button>
//             </div>
//           </div>
//         ))}
//       </div>
//     </section>
//   );
// }


import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { addToCart } from "../redux/cartslice";

export default function JuniorsProducts() {
  const [products, setProducts] = useState([]); 
  const [filteredProducts, setFilteredProducts] = useState([]); 
  const [categories, setCategories] = useState(["All"]);
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [loading, setLoading] = useState(true);
  const dispatch = useDispatch();

  const API_BASE_URL = import.meta.env.VITE_API_URL;

useEffect(() => {
  fetch(`${API_BASE_URL}/products`)
    .then((res) => res.json())
    .then((data) => {
      const allFetched = Array.isArray(data) ? data : data.products;

      const dupattaProducts = allFetched.filter((p) => {
        const categoryName = p.category?.name;
        const parentName = p.category?.parent?.name; // Now available due to nested populate
        
        return categoryName === "Kids Corner" || parentName === "Kids Corner";
      });

      setProducts(dupattaProducts);
      setFilteredProducts(dupattaProducts);

      const subCats = [
        "All",
        ...new Set(
          dupattaProducts
            .filter(p => p.category?.parent?.name === "Kids Corner")
            .map((p) => p.category.name)
        ),
      ];
      
      setCategories(subCats);
      setLoading(false);
    })
    .catch((err) => {
      console.error("Fetch error:", err);
      setLoading(false);
    });
}, [API_BASE_URL]);

  
  useEffect(() => {
    if (selectedCategory === "All") {
      setFilteredProducts(products);
    } else {
      setFilteredProducts(
        products.filter((p) => p.category?.name === selectedCategory)
      );
    }
  }, [selectedCategory, products]);

  const handleAddToCart = (product) => {
    dispatch(
      addToCart({
        id: product._id,
        title: product.name,
        price: product.price,
        image: product.images?.[0],
      })
    );
  };

  if (loading) {
    return <p className="text-center py-10">Loading Kids Corner...</p>;
  }

  return (
    <section className="max-w-7xl mx-auto px-4 py-8">
      <h1 className="text-2xl font-semibold mb-2">Kids Corner Gallery</h1>
      <p className="text-gray-500 mb-6 text-sm">Explore our exclusive Kids Corner collection</p>

      {/* --- SUB-CATEGORY TABS --- */}
      <div className="flex flex-wrap gap-3 mb-8 overflow-x-auto pb-2 scrollbar-hide">
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => setSelectedCategory(cat)}
            className={`px-6 py-2 rounded-full border transition-all duration-200 whitespace-nowrap text-sm font-medium ${
              selectedCategory === cat
                ? "bg-[#F7F3EB] border-[#D16B2D] text-[#D16B2D] shadow-sm"
                : "bg-white border-gray-300 text-gray-600 hover:border-[#D16B2D]"
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {filteredProducts.map((product) => (
          <div key={product._id} className="border rounded-lg bg-white shadow-sm overflow-hidden group">
            <div className="h-64 bg-gray-100 relative overflow-hidden">
              <img
                src={product.images?.[0]}
                alt={product.name}
                className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
              />
            </div>
            <div className="p-4">
              <h2 className="text-sm font-medium truncate">{product.name}</h2>
              <p className="font-bold mt-2 text-[#D16B2D]">PKR {product.price}</p>
              <button
                onClick={() => handleAddToCart(product)}
                className="mt-4 w-full border border-black py-2 text-sm hover:bg-black hover:text-white transition-colors"
              >
                Add to Cart
              </button>
            </div>
          </div>
        ))}
      </div>

      {filteredProducts.length === 0 && (
        <div className="text-center py-20 text-gray-400">
          No items found in this section.
        </div>
      )}
    </section>
  );
}
