// import React, { useState, useEffect } from 'react';
// import { Menu, Search, User, ShoppingBag } from 'lucide-react';
// import CartSidebar from './cart.jsx';
// import CategorySidebar from './categorysidebar.jsx';
// import { useNavigate } from 'react-router-dom';
// import axios from 'axios';
// import anayabloo from "../../public/anayabloo.png";

// const Navbar = () => {
//   const [searchQuery, setSearchQuery] = useState('');
//   const [isCartOpen, setIsCartOpen] = useState(false);
//   const [isCategoryOpen, setIsCategoryOpen] = useState(false);
//   const [topCategories, setTopCategories] = useState([]);
//   const navigate = useNavigate();

//   const API_BASE_URL = import.meta.env.VITE_API_URL;

//   useEffect(() => {
//     const fetchTopCategories = async () => {
//       try {
//         const res = await axios.get(`${API_BASE_URL}/categories`);
//         // Only the two parent categories we need
//         const parents = res.data.filter(cat =>
//           cat.name === "Kids Corner" || cat.name === "Dupatta Gallery"
//         );
//         setTopCategories(parents);
//       } catch (error) {
//         console.error("Error fetching top categories", error);
//       }
//     };

//     fetchTopCategories();
//   }, []);

//   const handleSearch = (e) => {
//     e.preventDefault();
//     console.log('Searching for:', searchQuery);
//   };

//   const handlelogout = () => {
//     const role = localStorage.getItem('role');
//     localStorage.removeItem('token');
//     localStorage.removeItem('role');
//     alert(`the ${role} logouted sucessfully`);
//   }

//   return (
//     <nav className="bg-white shadow-md fixed w-full z-40 top-0">
//       <CategorySidebar isOpen={isCategoryOpen} setIsOpen={setIsCategoryOpen} />

//       {/* Main Nav Bar */}
//       <div className="bg-brown-900" style={{ backgroundColor: '#3d2817' }}>
//         <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-12">
//           <div className="flex items-center justify-between h-14 md:h-16">
//             <div className="flex items-center gap-3 md:gap-6">
//               <button
//                 onClick={() => setIsCategoryOpen(true)}
//                 className="text-white hover:text-gray-300 transition-colors cursor-pointer bg-transparent border-0"
//                 aria-label="Open menu"
//               >
//                 <Menu size={24} />
//               </button>
//               <button
//                 onClick={() => navigate('/')}
//                 className="text-xl md:text-3xl font-bold text-gray-200 hover:text-gray-300 transition-colors bg-transparent border-0"
//                 style={{ fontFamily: 'Roboto Slab, serif' }}
//               >

//                 <img
//                   src={anayabloo}
//                   alt="AnayaBloom Logo"
//                   className="w-24 h-24 md:w-24 md:h-24 pt-4 object-contain"
//                 />
//               </button>
//             </div>

//             <div className="flex items-center gap-4 md:gap-6">
//               <form onSubmit={handleSearch} className="relative">
//                 <input
//                   type="text"
//                   value={searchQuery}
//                   onChange={(e) => setSearchQuery(e.target.value)}
//                   placeholder="Search..."
//                   className="pl-10 pr-4 py-2 bg-white bg-opacity-20 text-black rounded-full focus:outline-none focus:ring-2 focus:ring-white focus:bg-opacity-30 w-40 md:w-64 placeholder-gray-300"
//                 />
//                 <Search
//                   size={20}
//                   className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-300"
//                 />
//               </form>

//               <button
//                 onClick={() => navigate('/login')}
//                 className="text-white hover:text-gray-300 transition-colors cursor-pointer bg-transparent border-0"
//                 aria-label="Login"
//               >
//                 <User size={20} className="md:w-6 md:h-6" />
//               </button>

//               <button
//                 onClick={() => setIsCartOpen(true)}
//                 className="text-white hover:text-gray-300 relative bg-transparent border-0"
//                 aria-label="Shopping bag"
//               >
//                 <ShoppingBag size={20} />
//               </button>
//               <CartSidebar isOpen={isCartOpen} setIsOpen={setIsCartOpen} />
//               <button
//                 onClick={() => handlelogout()}
//                 className='text-gray-100 border p-1.5 rounded-lg'>
//                 Logout
//               </button>
//             </div>
//           </div>
//         </div>
//       </div>

//       {/* Second Line - Only 2 Links */}
//       <div className="bg-brown-900" style={{ backgroundColor: '#3d2817' }}>
//         <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-12">
//           <div className="flex items-center justify-center gap-16 md:gap-20 h-12 md:h-14">
//             {topCategories.map(cat => (
//               <button
//                 key={cat._id}
//                 onClick={() => navigate(`/collection/${cat._id}`)}
//                 className="text-sm md:text-base font-semibold text-white hover:text-gray-300 transition-colors uppercase tracking-wide cursor-pointer bg-transparent border-0"
//                 style={{ fontFamily: 'Roboto Slab, serif' }}
//               >
//                 {cat.name}
//               </button>
//             ))}
//           </div>
//         </div>
//       </div>
//     </nav>
//   );
// };

// export default Navbar;



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
  const navigate = useNavigate();

  const API_BASE_URL = import.meta.env.VITE_API_URL;

  useEffect(() => {
    const fetchTopCategories = async () => {
      try {
        const res = await axios.get(`${API_BASE_URL}/categories`);
        const parents = res.data.filter(cat =>
          cat.name === "Kids Corner" || cat.name === "Dupatta Gallery"
        );
        setTopCategories(parents);
      } catch (error) {
        console.error("Error fetching top categories", error);
      }
    };

    fetchTopCategories();
  }, []);

  const handleSearch = (e) => {
    e.preventDefault();
    console.log('Searching for:', searchQuery);
    setIsSearchOpen(false);
  };

  const handlelogout = () => {
    const role = localStorage.getItem('role');
    if(!role){
      navigate("/login");
      return;
    }else{
    localStorage.removeItem('token');
    localStorage.removeItem('role');
    alert(`the ${role} logged out successfully`);
  }
  };

  return (
    <nav className="bg-white shadow-md fixed w-full z-40 top-0">
      <CategorySidebar isOpen={isCategoryOpen} setIsOpen={setIsCategoryOpen} />

      {/* Main Nav Bar */}
      <div className="bg-brown-900" style={{ backgroundColor: '#3d2817' }}>
        <div className="max-w-7xl mx-auto px-3 sm:px-4 lg:px-6">
          <div className="flex items-center justify-between h-24 sm:h-28 md:h-32">
            
            {/* Left Section - Menu Button & Logo */}
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

            {/* Right Section - Icons */}
            <div className="flex items-center gap-2 sm:gap-3 md:gap-4">
              {/* Desktop Search */}
              <form onSubmit={handleSearch} className="relative hidden md:block">
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search..."
                  className="pl-10 pr-4 py-2 bg-white bg-opacity-20 text-white rounded-full focus:outline-none focus:ring-2 focus:ring-white focus:bg-opacity-30 w-48 lg:w-64 placeholder-gray-300"
                />
                <Search
                  size={20}
                  className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-300"
                />
              </form>

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

              {/* Logout - Hidden on small screens */}
              <button
                onClick={handlelogout}
                className='hidden sm:block text-gray-100 border border-white px-2 py-1 md:px-3 md:py-1.5 rounded-lg text-xs md:text-sm hover:bg-white hover:text-brown-900 transition-colors'
              >
                Logout
              </button>
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
            <button
              onClick={handlelogout}
              className='sm:hidden text-white text-xs font-semibold uppercase tracking-wide hover:text-gray-300 transition-colors bg-transparent border-0'
              style={{ fontFamily: 'Roboto Slab, serif' }}
            >
              Logout
            </button>
          </div>
        </div>
      </div>

      <CartSidebar isOpen={isCartOpen} setIsOpen={setIsCartOpen} />
    </nav>
  );
};

export default Navbar;