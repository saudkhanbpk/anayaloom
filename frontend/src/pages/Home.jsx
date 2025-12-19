import React from "react";
import { ChevronLeft, ChevronRight, User, ShoppingBag, Search } from "lucide-react";
import { Link } from "react-router-dom";

// Dummy data for products and categories
const featuredCategories = [
  { id: 1, name: "Men", image: "/images/men.jpg" },
  { id: 2, name: "Women", image: "/images/women.jpg" },
  { id: 3, name: "Juniors", image: "/images/juniors.jpg" },
];

const featuredProducts = [
  { id: 1, title: "Stylish Jacket", price: 2500, image: "/images/product1.jpg" },
  { id: 2, title: "Casual Shirt", price: 1200, image: "/images/product2.jpg" },
  { id: 3, title: "Denim Jeans", price: 1800, image: "/images/product3.jpg" },
  { id: 4, title: "Sneakers", price: 3500, image: "/images/product4.jpg" },
];

const Home = () => {
  return (
    <div className="w-full min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="relative flex flex-col items-center justify-center min-h-[80vh] py-16 bg-linear-to-r from-yellow-50 to-orange-50 overflow-hidden px-4">
        <div className="flex flex-col gap-4 text-center z-10">
          <h2 className="text-xl sm:text-2xl md:text-3xl font-bold tracking-tight text-gray-800">
            NOVEMBER SALE
          </h2>
          <h1 className="text-5xl sm:text-7xl md:text-8xl font-extrabold text-red-600 leading-none">
            FLAT 30% OFF
          </h1>
          <h2 className="text-lg sm:text-xl md:text-2xl font-semibold text-gray-700">
            LIVE ONLINE & IN-STORES
          </h2>
          <Link
            to="/men"
            className="mt-6 mx-auto bg-black text-white px-8 py-3 rounded-full font-medium hover:bg-gray-800 transition-all w-fit"
          >
            SHOP NOW
          </Link>
        </div>

        {/* Navigation Arrows */}
        <div className="absolute inset-y-0 left-2 md:left-8 flex items-center">
          <div className="p-2 rounded-full hover:bg-white/80 transition-colors cursor-pointer shadow-sm md:shadow-md">
            <ChevronLeft className="w-6 h-6 md:w-10 md:h-10" />
          </div>
        </div>
        <div className="absolute inset-y-0 right-2 md:right-8 flex items-center">
          <div className="p-2 rounded-full hover:bg-white/80 transition-colors cursor-pointer shadow-sm md:shadow-md">
            <ChevronRight className="w-6 h-6 md:w-10 md:h-10" />
          </div>
        </div>
      </section>

      {/* Featured Categories */}
      <section className="max-w-7xl mx-auto py-16 px-4">
        <h2 className="text-3xl font-bold mb-8 text-center">Shop by Category</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {featuredCategories.map((cat) => (
            <Link
              key={cat.id}
              to={`/${cat.name.toLowerCase()}`}
              className="relative group overflow-hidden rounded-xl shadow-lg cursor-pointer"
            >
              <img
                src={cat.image}
                alt={cat.name}
                className="w-full h-64 object-cover group-hover:scale-105 transition-transform duration-300"
              />
              <div className="absolute inset-0 bg-black/30 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                <h3 className="text-white text-2xl font-bold">{cat.name}</h3>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* Featured Products */}
      <section className="max-w-7xl mx-auto py-16 px-4 bg-white">
        <h2 className="text-3xl font-bold mb-8 text-center">Featured Products</h2>
        <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {featuredProducts.map((product) => (
            <div
              key={product.id}
              className="border rounded-lg overflow-hidden bg-white shadow-sm hover:shadow-md transition"
            >
              <div className="w-full h-64 overflow-hidden">
                <img
                  src={product.image}
                  alt={product.title}
                  className="w-full h-full object-cover hover:scale-105 transition duration-300"
                />
              </div>
              <div className="p-4">
                <h2 className="text-sm font-medium truncate">{product.title}</h2>
                <p className="text-gray-700 font-semibold mt-2">PKR {product.price}</p>
                <button className="mt-4 w-full border border-black py-2 text-sm font-medium hover:bg-black hover:text-white transition">
                  Add to Cart
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Newsletter Section */}
      <section className="py-16 px-4 bg-gray-100">
        <div className="max-w-2xl mx-auto text-center">
          <h2 className="text-3xl font-bold mb-4">Subscribe to Our Newsletter</h2>
          <p className="text-gray-700 mb-6">
            Get updates on new arrivals, offers & promotions.
          </p>
          <form className="flex flex-col sm:flex-row gap-2 justify-center">
            <input
              type="email"
              placeholder="Enter your email"
              className="px-4 py-3 border rounded-md w-full sm:w-auto flex-1 focus:outline-none focus:ring-2 focus:ring-black"
            />
            <button className="bg-black text-white px-6 py-3 rounded-md hover:bg-gray-800 transition">
              Subscribe
            </button>
          </form>
        </div>
      </section>
    </div>
  );
};

export default Home;
