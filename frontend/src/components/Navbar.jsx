import React, { useState, useEffect } from 'react';
import { Menu, Search, User, ShoppingBag, X } from 'lucide-react';
import CartSidebar from './cart.jsx';
import CategorySidebar from './categorysidebar.jsx';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import anayabloom from "../../public/anayabloom.png";

const Navbar = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isCategoryOpen, setIsCategoryOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [topCategories, setTopCategories] = useState([]);
  const [subCategories, setSubCategories] = useState([]); // optional: for getParentCategoryId
  const [suggestions, setSuggestions] = useState([]);
  const [loading, setLoading] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const navigate = useNavigate();
  const API_BASE_URL = import.meta.env.VITE_API_URL;

  // Helper function to get parent category ID safely
  const getParentCategoryId = (product, categories) => {
    if (!product.category) return null;

    // Find category object by _id if product.category is string
    const categoryObj =
      typeof product.category === "string"
        ? categories.find((c) => c._id === product.category)
        : product.category;

    if (!categoryObj) return null;

    // Return parent ID if exists, else category's own ID
    return categoryObj.parent?._id || categoryObj._id;
  };

  // Fetch top categories (main navbar)
  useEffect(() => {
    const fetchTopCategories = async () => {
      try {
        const res = await axios.get(`${API_BASE_URL}/categories`);
        const parents = res.data.filter(cat =>
          cat.name === "Kids Corner" || cat.name === "Dupatta Gallery"
        );
        setTopCategories(parents);
        setSubCategories(res.data); // keep all categories for parent lookup
      } catch (error) {
        console.error("Error fetching categories", error);
      }
    };
    fetchTopCategories();
  }, [API_BASE_URL]);

  // Fetch search suggestions
  useEffect(() => {
    if (!searchQuery.trim()) {
      setSuggestions([]);
      return;
    }

    const delay = setTimeout(async () => {
      try {
        setLoading(true);
        const res = await axios.get(`${API_BASE_URL}/search`, {
          params: { query: searchQuery }
        });

        setSuggestions([
          ...res.data.categories.map(c => ({ ...c, type: "category" })),
          ...res.data.products.map(p => ({ ...p, type: "product" }))
        ]);
      } catch (err) {
        console.error("Search error", err);
      } finally {
        setLoading(false);
      }
    }, 300);

    return () => clearTimeout(delay);
  }, [searchQuery, API_BASE_URL]);

  const handleSearch = (e) => {
    e.preventDefault();
    if (suggestions.length === 0) return;

    const first = suggestions[0];
    if (first.type === "category") {
      navigate(`/collection/${first._id}`);
    } else {
      const parentId = getParentCategoryId(first, subCategories.concat(topCategories));
      if (!parentId) {
        console.error("Cannot find parent category for product", first);
        return;
      }
      navigate(`/collection/${parentId}?highlight=${first._id}`);
    }

    setIsSearchOpen(false);
  };

   useEffect(() => {
    const token = localStorage.getItem('token'); // or role/email
    setIsLoggedIn(!!token); // true if token exists
  }, []);

  const handleLogout = () => {
    const role = localStorage.getItem('role');
    if (!role) {
      navigate("/login");
      return;
    }
    localStorage.removeItem('token');
    localStorage.removeItem('role');
    localStorage.removeItem('email');
    setIsLoggedIn(false);
    alert(`The ${role} logged out successfully`);
  };

  return (
    <nav className="bg-white shadow-md fixed w-full z-40 top-0">
      <CategorySidebar isOpen={isCategoryOpen} setIsOpen={setIsCategoryOpen} />

      {/* Main Nav Bar */}
      <div className="bg-brown-900" style={{ backgroundColor: '#3d2817' }}>
        <div className="max-w-7xl mx-auto px-3 sm:px-4 lg:px-6">
          <div className="flex items-center justify-between h-24 sm:h-28 md:h-32">

            {/* Left Section */}
            <div className="flex items-center gap-3 sm:gap-4 md:gap-6">
              <button
                onClick={() => setIsCategoryOpen(true)}
                className="text-white hover:text-gray-300 transition-colors cursor-pointer bg-transparent border-0 p-2"
                aria-label="Open menu"
              >
                <Menu size={24} className="sm:w-6 sm:h-6" />
              </button>

              <button
                onClick={() => navigate('/')}
                className="bg-transparent border-0 cursor-pointer"
                aria-label="Go to home"
              >
                <img
                  src={anayabloom}
                  alt="AnayaBloom Logo"
                  className="h-20 sm:h-24 md:h-28 w-auto object-contain"
                />
              </button>
            </div>

            {/* Right Section */}
            <div className="flex items-center gap-2 sm:gap-3 md:gap-4">
              {/* Desktop Search */}
              <div className="relative hidden md:block">
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search..."
                  className="pl-10 pr-4 py-2 bg-opacity-20 text-white rounded-full w-64"
                />
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-300" />

                {suggestions.length > 0 && (
                  <div className="absolute top-full left-0 w-full bg-white rounded shadow-lg z-50 max-h-64 overflow-y-auto">
                    {suggestions.map(item => (
                      <div
                        key={item._id}
                        onClick={() => {
                          setSearchQuery('');
                          setSuggestions([]);
                          if (item.type === "category") {
                            navigate(`/collection/${item._id}`);
                          } else {
                            const parentId = getParentCategoryId(item, subCategories.concat(topCategories));
                            if (!parentId) return;
                            navigate(`/collection/${parentId}?highlight=${item._id}`);
                          }
                        }}
                        className="px-4 py-2 hover:bg-gray-100 cursor-pointer text-sm"
                      >
                        <span className="font-medium">{item.name}</span>
                        <span className="text-xs text-gray-500 ml-2">({item.type})</span>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {/* Mobile Search Toggle */}
              <button
                onClick={() => setIsSearchOpen(!isSearchOpen)}
                className="md:hidden text-white hover:text-gray-300 transition-colors cursor-pointer bg-transparent border-0 p-2"
                aria-label="Toggle search"
              >
                {isSearchOpen ? <X size={20} /> : <Search size={20} />}
              </button>

              <button
                onClick={() => navigate('/login')}
                className="text-white hover:text-gray-300 transition-colors cursor-pointer bg-transparent border-0 p-2"
                aria-label="Login"
              >
                <User size={20} className="sm:w-5 sm:h-5 md:w-6 md:h-6" />
              </button>

              <button
                onClick={() => setIsCartOpen(true)}
                className="text-white hover:text-gray-300 relative bg-transparent border-0 p-2"
                aria-label="Shopping bag"
              >
                <ShoppingBag size={20} className="sm:w-5 sm:h-5 md:w-6 md:h-6" />
              </button>
              
              {isLoggedIn && (
              <button
                onClick={handleLogout}
                className='hidden sm:block text-gray-100 border border-white px-2 py-1 md:px-3 md:py-1.5 rounded-lg text-xs md:text-sm  hover:text-brown-900 transition-colors'
              >
                Logout
              </button>
                )}
            </div>
          </div>

          {/* Mobile Search Bar */}
          {isSearchOpen && (
            <div className="md:hidden pb-3">
              <form onSubmit={handleSearch} className="relative">
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search..."
                  className="w-full pl-10 pr-4 py-2 bg-white bg-opacity-20 text-white rounded-full focus:outline-none focus:ring-2 focus:ring-white focus:bg-opacity-30 placeholder-gray-300"
                  autoFocus
                />
                <Search
                  size={20}
                  className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-300"
                />
              </form>
            </div>
          )}
        </div>
      </div>

      {/* Second Line - Category Links */}
      <div className="bg-brown-900" style={{ backgroundColor: '#3d2817' }}>
        <div className="max-w-7xl mx-auto px-3 sm:px-4 lg:px-6">
          <div className="flex items-center justify-center gap-8 sm:gap-12 md:gap-16 lg:gap-20 h-10 sm:h-12 md:h-14">
            {topCategories.map(cat => (
              <button
                key={cat._id}
                onClick={() => navigate(`/collection/${cat._id}`)}
                className="text-xs sm:text-sm md:text-base font-semibold text-white hover:text-gray-300 transition-colors uppercase tracking-wide cursor-pointer bg-transparent border-0 whitespace-nowrap"
                style={{ fontFamily: 'Roboto Slab, serif' }}
              >
                {cat.name}
              </button>
            ))}

            {/* Mobile Logout */}
            {isLoggedIn && (
            <button
              onClick={handleLogout}
              className='sm:hidden text-white text-xs font-semibold uppercase border border-white px-2 rounded-lg tracking-wide hover:text-gray-300 transition-colors bg-transparent'
              style={{ fontFamily: 'Roboto Slab, serif' }}
            >
              Logout
            </button>
              )}
          </div>
        </div>
      </div>

      <CartSidebar isOpen={isCartOpen} setIsOpen={setIsCartOpen} />
    </nav>
  );
};

export default Navbar;
