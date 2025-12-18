import React from 'react';

const Footer = () => {
  return (
    <footer className="bg-black text-white py-16 px-4 sm:px-6 lg:px-12">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
          {/* Logo Section */}
          <div className="flex items-start">
            <h2 
              className="text-5xl md:text-6xl font-bold"
              style={{ fontFamily: 'Roboto Slab, serif' }}
            >
              AnayaBloom
            </h2>
          </div>

          {/* Column 1 - Customer Service */}
          <div className="space-y-4">
            <button
              onClick={() => window.location.href = '/shopping-guide'}
              className="block text-white hover:text-gray-300 transition-colors text-left bg-transparent border-0 cursor-pointer text-base"
            >
              Shopping Guide
            </button>
            <button
              onClick={() => window.location.href = '/login'}
              className="block text-white hover:text-gray-300 transition-colors text-left bg-transparent border-0 cursor-pointer text-base"
            >
              Log In/Sign Up
            </button>
            <button
              onClick={() => window.location.href = '/exchange-returns'}
              className="block text-white hover:text-gray-300 transition-colors text-left bg-transparent border-0 cursor-pointer text-base"
            >
              Exchange & Returns
            </button>
            <button
              onClick={() => window.location.href = '/shipping'}
              className="block text-white hover:text-gray-300 transition-colors text-left bg-transparent border-0 cursor-pointer text-base"
            >
              Shipping & Deliveries
            </button>
            <button
              onClick={() => window.location.href = '/how-to-buy'}
              className="block text-white hover:text-gray-300 transition-colors text-left bg-transparent border-0 cursor-pointer text-base"
            >
              How To Buy
            </button>
            <button
              onClick={() => window.location.href = '/payment'}
              className="block text-white hover:text-gray-300 transition-colors text-left bg-transparent border-0 cursor-pointer text-base"
            >
              Payment
            </button>
          </div>

          {/* Column 2 - Company Info */}
          <div className="space-y-4">
            <button
              onClick={() => window.location.href = '/about'}
              className="block text-white hover:text-gray-300 transition-colors text-left bg-transparent border-0 cursor-pointer text-base"
            >
              About Us
            </button>
            <button
              onClick={() => window.location.href = '/stores'}
              className="block text-white hover:text-gray-300 transition-colors text-left bg-transparent border-0 cursor-pointer text-base"
            >
              Retail Stores
            </button>
            <button
              onClick={() => window.location.href = '/contact'}
              className="block text-white hover:text-gray-300 transition-colors text-left bg-transparent border-0 cursor-pointer text-base"
            >
              Contact Us
            </button>
          </div>
        </div>

        {/* Copyright Section */}
        <div className="mt-16 pt-8 border-t border-gray-800 text-right">
          <p className="text-sm text-gray-400">
            © Copyrights Reserved by AnayaBloom {new Date().getFullYear()}
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;