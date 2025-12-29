import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import CategorySidebar from '../components/categorysidebar.jsx';

const Home = () => {
  const [categories, setCategories] = useState([]);
  const [latestProducts, setLatestProducts] = useState([]);
  const [isCategoryOpen, setIsCategoryOpen] = useState(false);
  const navigate = useNavigate();
  const API_BASE_URL = import.meta.env.VITE_API_URL;

  // Fetch all parent categories
  const fetchCategories = async () => {
    try {
      const res = await axios.get(`${API_BASE_URL}/categories/parents`);
      setCategories(res.data);
    } catch (err) {
      console.error("Error fetching categories:", err);
    }
  };

  // Fetch latest products
  const fetchLatestProducts = async () => {
    try {
      const res = await axios.get(`${API_BASE_URL}/products`);
      // Group products by category and pick last one of each category
      const grouped = res.data.reduce((acc, product) => {
        // const catId = product.category._id ;
        // const catId = product.category.parent?._id
        const catId = product?.category?.parent?._id || 
                    product?.category?._id || 
                    'uncategorized';
                    
        console.log(catId, "this si ");

        if (!acc[catId] || new Date(product.createdAt) > new Date(acc[catId].createdAt)) {
          acc[catId] = product;
        }
        return acc;
      }, {});
      setLatestProducts(Object.values(grouped));
    } catch (err) {
      console.error("Error fetching products:", err);
    }
  };

  useEffect(() => {
    fetchCategories();
    fetchLatestProducts();
  }, []);

  // Helper: convert category name to slug
  const toSlug = (name) => name.toLowerCase().replace(/\s+/g, "-");

  return (

    <div className="w-full min-h-screen bg-gray-50">
      <CategorySidebar
        isOpen={isCategoryOpen}
        setIsOpen={setIsCategoryOpen}
      />

      {/* Hero Section */}
      <section className="relative flex flex-col items-center justify-center min-h-[70vh] py-16 bg-linear-to-r from-yellow-50 to-orange-50 overflow-hidden px-4">
        <div className="flex flex-col gap-4 text-center z-10">
          <h2 className="text-xl sm:text-2xl md:text-3xl font-bold tracking-tight text-gray-800">NOVEMBER SALE</h2>
          <h1 className="text-5xl sm:text-7xl md:text-8xl font-extrabold text-red-600 leading-none">FLAT 30% OFF</h1>
          <h2 className="text-lg sm:text-xl md:text-2xl font-semibold text-gray-700">LIVE ONLINE & IN-STORES</h2>
          <button
            onClick={() =>{ setIsCategoryOpen(true); } }
            className="mt-6 mx-auto bg-black text-white px-8 py-3 rounded-full font-medium hover:bg-gray-800 transition-all w-fit"
          >
            SHOP NOW
          </button>
        </div>
      </section>

      {/* Categories Section */}
      <section className="max-w-7xl mx-auto py-16 px-4">
        <h2 className="text-3xl font-bold mb-8 text-center">Shop by Category</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {categories.map((cat) => (
            <div
              key={cat._id}
              className="flex items-center justify-center h-40 bg-white rounded-xl shadow-lg cursor-pointer hover:shadow-2xl transition transform hover:scale-105"
              onClick={() => navigate(`/collection/${toSlug(cat._id)}`)}
            >
              <span className="text-xl font-semibold text-gray-800">{cat.name}</span>
            </div>
          ))}
        </div>
      </section>

      {/* Latest Products Section */}
      <section className="max-w-7xl mx-auto py-16 px-4 bg-white">
        <h2 className="text-3xl font-bold mb-8 text-center">Latest Products</h2>
        <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {latestProducts.map((product) => (
            <div
              key={product._id}
              className="border rounded-lg overflow-hidden bg-white shadow-sm hover:shadow-md transition cursor-pointer"
              onClick={() => navigate(`/collection/${product.category.parent?._id}`)}
            >
              <div className="w-full h-64 overflow-hidden">
                <img
                  src={product.images?.[0] || "/images/default-product.jpg"}
                  alt={product.name}
                  className="w-full h-full object-cover hover:scale-105 transition duration-300"
                />
              </div>
              <div className="p-4">
                <h2 className="text-sm font-medium truncate">{product.name}</h2>
                <p className="text-gray-700 font-semibold mt-2">PKR {product.price}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

    </div>
  );
};

export default Home;
