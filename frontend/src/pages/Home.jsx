import React from 'react'
import { ChevronLeft, ChevronRight } from 'lucide-react'

const Home = () => {
    return (
        // Use min-h-screen to ensure it covers the viewport
        <div className='relative flex flex-col items-center justify-center min-h-[70vh] py-12 w-full bg-gray-50 overflow-hidden px-4'>
            {/* Main Content Container */}
            <div className='flex flex-col gap-2 md:gap-4 text-center z-10'>
                <h2 className='text-xl sm:text-2xl md:text-4xl font-bold tracking-tight text-gray-800'>
                    NOVEMBER SALE
                </h2>

                <h1 className='text-5xl sm:text-7xl md:text-8xl lg:text-9xl font-extrabold text-red-600 leading-none'>
                    FLAT 30% OFF
                </h1>

                <h2 className='text-lg sm:text-xl md:text-2xl font-semibold text-gray-700'>
                    LIVE ONLINE & IN-STORES
                </h2>

                {/* Optional: Add a CTA button for better UX */}
                <button className="mt-6 mx-auto bg-black text-white px-8 py-3 rounded-full font-medium hover:bg-gray-800 transition-all w-fit">
                    SHOP NOW
                </button>
            </div>

            {/* Navigation Arrows - Hidden on very small screens for better UX, or scaled down */}
            <div className='absolute inset-y-0 left-2 md:left-8 flex items-center'>
                <div className='p-2 rounded-full hover:bg-white/80 transition-colors cursor-pointer shadow-sm md:shadow-md'>
                    <ChevronLeft className="w-6 h-6 md:w-10 md:h-10" />
                </div>
            </div>

            <div className='absolute inset-y-0 right-2 md:right-8 flex items-center'>
                <div className='p-2 rounded-full hover:bg-white/80 transition-colors cursor-pointer shadow-sm md:shadow-md'>
                    <ChevronRight className="w-6 h-6 md:w-10 md:h-10" />
                </div>
            </div>

        </div>
    )
}

export default Home;