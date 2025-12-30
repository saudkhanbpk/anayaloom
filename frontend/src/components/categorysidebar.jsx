import React, { useEffect, useState } from 'react';
import { X } from 'lucide-react';
import axios from "axios";
import { useNavigate } from "react-router-dom";

const CategorySidebar = ({ isOpen, setIsOpen }) => {

  const [categories, setCategories] = useState([]);
  const navigate = useNavigate();

  const API_BASE_URL = import.meta.env.VITE_API_URL;

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const res = await axios.get(`${API_BASE_URL}/categories`);

        // ✅ ONLY parent categories
        const parentCategories = res.data.filter(
          category => category.parent === null
        );

        setCategories(parentCategories);
      } catch (error) {
        console.error("Error fetching categories", error);
      }
    };

    fetchCategories();
  }, []);


  // const categories = [
  //   'NEW IN',
  //   'ENCORE',
  //   'IN LAYERS',
  //   'GOING OUT',
  //   'OTR LAB',
  //   'WINTER FALL\'25',
  //   'SWEATSHIRTS | HOODIES',
  //   'SWEATERS',
  //   'OUTERWEAR',
  //   'SHIRTS | SHACKETS',
  //   'T-SHIRTS',
  //   'POLOS',
  //   'TROUSERS',
  //   'ACTIVEWEAR',
  //   'JEANS',
  //   'SHORTS'
  // ];

  return (
    <>
      {/* Backdrop */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/50 bg-opacity-20 z-40"
          onClick={() => setIsOpen(false)}
        />
      )}

      {/* Sidebar */}
      <div
        className={`fixed top-0 left-0 h-full w-full sm:w-80 bg-white z-50 shadow-xl transform transition-transform duration-300 ease-in-out ${isOpen ? 'translate-x-0' : '-translate-x-full'
          }`}
      >
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b">
          <h2 className="text-xl font-bold" style={{ fontFamily: 'Roboto Slab, serif' }}>
            AnayaBloom
          </h2>
          <button
            onClick={() => setIsOpen(false)}
            className="p-1 hover:bg-gray-100 rounded-full transition-colors"
          >
            <X size={24} />
          </button>
        </div>

        {/* Categories Section */}
        <div className="overflow-y-auto h-full">

          {/* Shop by Categories */}
          <div className="p-6 border-b">
            <div className="flex justify-between items-center mb-4">
              <h3 className="font-bold text-lg">SHOP BY CATEGORIES</h3>
              {/* <button className="text-sm font-semibold text-gray-600 hover:text-black">
                VIEW ALL
              </button> */}
            </div>
            {/* <div className="space-y-1">
              {categories.slice(6).map((category, index) => (
                <button
                  key={index}
                  className="block w-full text-left py-2 px-3 hover:bg-gray-50 rounded transition-colors"
                  onClick={() => {
                    console.log('Selected category:', category);
                    // Handle category selection
                    setIsOpen(false);
                  }}
                >
                  {category}
                </button>
              ))}
            </div> */}
            <div className="space-y-1">
              {categories.map(category => (
                <button
                  key={category._id}
                  className="block w-full text-left py-2 px-3 hover:bg-gray-50 rounded transition-colors"
                  onClick={() => {
                    navigate(`/collection/${category._id}`);
                    setIsOpen(false);
                  }}
                >
                  {category.name}
                </button>
              ))}
            </div>
          </div>

        </div>
      </div>
    </>
  );
};

export default CategorySidebar;