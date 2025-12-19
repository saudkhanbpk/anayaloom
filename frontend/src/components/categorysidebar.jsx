import React from 'react';
import { X } from 'lucide-react';

const CategorySidebar = ({ isOpen, setIsOpen }) => {
  const categories = [
    'NEW IN',
    'ENCORE',
    'IN LAYERS',
    'GOING OUT',
    'OTR LAB',
    'WINTER FALL\'25',
    'SWEATSHIRTS | HOODIES',
    'SWEATERS',
    'OUTERWEAR',
    'SHIRTS | SHACKETS',
    'T-SHIRTS',
    'POLOS',
    'TROUSERS',
    'ACTIVEWEAR',
    'JEANS',
    'SHORTS'
  ];

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
        className={`fixed top-0 left-0 h-full w-full sm:w-80 bg-white z-50 shadow-xl transform transition-transform duration-300 ease-in-out ${
          isOpen ? 'translate-x-0' : '-translate-x-full'
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
          {/* New Collections */}
          <div className="p-6 border-b">
            <div className="mb-4">
              <h3 className="font-bold text-lg mb-2">NEW IN</h3>
              <div className="space-y-1">
                {categories.slice(0, 6).map((category, index) => (
                  <button
                    key={index}
                    className="block w-full text-left py-2 px-3 hover:bg-gray-50 rounded transition-colors"
                    onClick={() => {
                      console.log('Selected:', category);
                      // Handle category selection
                      setIsOpen(false);
                    }}
                  >
                    {category}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Shop by Categories */}
          <div className="p-6 border-b">
            <div className="flex justify-between items-center mb-4">
              <h3 className="font-bold text-lg">SHOP BY CATEGORIES</h3>
              <button className="text-sm font-semibold text-gray-600 hover:text-black">
                VIEW ALL
              </button>
            </div>
            <div className="space-y-1">
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
            </div>
          </div>

          {/* Featured Sections */}
          <div className="p-6">
            <h3 className="font-bold text-lg mb-4">FEATURED</h3>
            <div className="space-y-4">
              <button className="block w-full text-left p-4 bg-gray-50 hover:bg-gray-100 rounded-lg transition-colors">
                <div className="font-semibold text-gray-800">ENCORE</div>
                <div className="text-sm text-gray-500 mt-1">Shop the collection</div>
              </button>
              <button className="block w-full text-left p-4 bg-gray-50 hover:bg-gray-100 rounded-lg transition-colors">
                <div className="font-semibold text-gray-800">IN LAYERS</div>
                <div className="text-sm text-gray-500 mt-1">Layered essentials</div>
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default CategorySidebar;