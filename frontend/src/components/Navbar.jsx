import React, { useState } from 'react';
import { Menu, Search, User, ShoppingBag } from 'lucide-react';
import CartSidebar from './cart.jsx';
import CategorySidebar from './categorysidebar.jsx';

const Navbar = () => {

    const [searchQuery, setSearchQuery] = useState('');
    const [isCartOpen, setIsCartOpen] = useState(false);
    // const [cartItems, setCartItems] = useState([]);
    const [isCategoryOpen, setIsCategoryOpen] = useState(false);

    const handleSearch = (e) => {
        e.preventDefault();
        console.log('Searching for:', searchQuery);
    };
    return (
        <nav className="bg-white shadow-md fixed w-full z-40 top-0 ">
            <CategorySidebar isOpen={isCategoryOpen} setIsOpen={setIsCategoryOpen} />
            {/* Main Navigation Bar */}
            <div className="bg-brown-900" style={{ backgroundColor: '#3d2817' }}>
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-12">
                    <div className="flex items-center justify-between h-14 md:h-16">
                        {/* Left Section - Menu & Logo */}
                        <div className="flex items-center gap-3 md:gap-6">
                            <button
                                onClick={() => setIsCategoryOpen(true)}
                                className="text-white hover:text-gray-300 transition-colors cursor-pointer bg-transparent border-0"
                                aria-label="Open menu"
                            >
                                <Menu size={24} />
                            </button>
                            <button
                                onClick={() => window.location.href = '/'}
                                className="text-xl md:text-3xl font-bold text-gray-200 hover:text-gray-300 transition-colors bg-transparent border-0 cursor-pointer"
                                style={{ fontFamily: 'Roboto Slab, serif' }}
                            >
                                AnayaBloom
                            </button>
                        </div>

                        {/* Right Section - Icons */}
                        <div className="flex items-center gap-4 md:gap-6">


                            <form onSubmit={handleSearch} className="relative">
                                <input
                                    type="text"
                                    value={searchQuery}
                                    onChange={(e) => setSearchQuery(e.target.value)}
                                    placeholder="Search..."
                                    className="pl-10 pr-4 py-2 bg-white bg-opacity-20 text-black rounded-full focus:outline-none focus:ring-2 focus:ring-white focus:bg-opacity-30 w-40 md:w-64 placeholder-gray-300"
                                />
                                <Search
                                    size={20}
                                    className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-300"
                                />
                            </form>

                            {/* User Icon */}
                            <button
                                onClick={() => window.location.href = '/login'}
                                className="text-white hover:text-gray-300 transition-colors cursor-pointer bg-transparent border-0"
                                aria-label="Login"
                            >
                                <User size={20} className="md:w-6 md:h-6" />
                            </button>

                            


                            <button
                                onClick={() => setIsCartOpen(true)}
                                className="text-white hover:text-gray-300 relative bg-transparent border-0"
                                aria-label="Shopping bag"
                            >
                                <ShoppingBag size={20} />
                                {/* {cartItems.length > 0 && ( */}
                                    {/* <span className="absolute -top-1 -right-1 bg-red-500 text-xs rounded-full w-5 h-5 flex items-center justify-center"> */}
                                        {/* {cartItems.length} */}
                                    {/* </span> */}
                                {/* )} */}
                            </button>
                            <CartSidebar
                                isOpen={isCartOpen}
                                setIsOpen={setIsCartOpen}
                                // cartItems={cartItems}
                                // setCartItems={setCartItems}
                            />



                        </div>
                    </div>
                </div>
            </div>

            {/* Second Line - Navigation Links */}
            <div className="bg-brown-900" style={{ backgroundColor: '#3d2817' }}>
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-12">
                    <div className="flex items-center justify-center gap-16 md:gap-20 h-12 md:h-14">
                        {/* <button
                            onClick={() => window.location.href = '/men'}
                            className="text-sm md:text-base font-semibold text-white hover:text-gray-300 transition-colors uppercase tracking-wide cursor-pointer bg-transparent border-0"
                        >
                            MEN
                        </button> */}
                        <button
                            onClick={() => window.location.href = '/women'}
                            className="text-sm md:text-base font-semibold text-white hover:text-gray-300 transition-colors uppercase tracking-wide cursor-pointer bg-transparent border-0"
                            style={{ fontFamily: 'Roboto Slab, serif' }}
                        >
                           Dupatta Gallery
                        </button>
                        <button
                            onClick={() => window.location.href = '/juniors'}
                            className="text-sm md:text-base font-semibold text-white hover:text-gray-300 transition-colors uppercase tracking-wide cursor-pointer bg-transparent border-0"
                            style={{ fontFamily: 'Roboto Slab, serif' }}
                        >
                            Kids Corner
                        </button>
                    </div>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;