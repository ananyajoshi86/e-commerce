import React from "react";

const HeroBanner = () => {
  return (
    <section className="grid grid-cols-1 md:grid-cols-3 gap-6 px-6 py-10 h-full">
      {/* Main Hero */}
      <div className="bg-blue-50 p-6 md:col-span-2 rounded-2xl flex flex-col md:flex-row items-center justify-between relative">
        <div className="max-w-md h-96">
          <h4 className="text-yellow-500 text-xl font-medium mb-2">
            100% Natural
          </h4>
          <h2 className="text-5xl font-bold leading-snug mb-4">
            Fresh Smoothie <br /> & Summer Juice
          </h2>
          <p className="text-gray-600 mb-6">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Dignissim
            massa diam elementum.
          </p>
          <button className="px-6 py-2 border border-gray-700 rounded-md hover:bg-gray-800 hover:text-white transition">
            SHOP NOW
          </button>
        </div>

        <img
          src="/product-thumb-1.png"
          alt="Smoothie Bottle"
          className="h-64 md:h-72 lg:h-80 object-contain"
        />

        
        <div className="absolute bottom-4 left-6 flex gap-2 mt-4">
          <div className="h-3 w-3 bg-yellow-400 rounded-full"></div>
          <div className="h-3 w-3 bg-gray-300 rounded-full"></div>
          <div className="h-3 w-3 bg-gray-300 rounded-full"></div>
        </div>
      </div>

    
      <div className="flex flex-col gap-6 h-full">
        {/* Fruits & Vegetables */}
        <div className="bg-green-50 p-6 rounded-2xl flex justify-between items-center h-64">
          <div>
            <p className="text-lg text-gray-600 mb-1">20% Off</p>
            <h3 className="text-2xl font-bold mb-2">Fruits & Vegetables</h3>
            <button className="text-sm text-gray-600 hover:underline flex items-center gap-1">
              Shop Collection →
            </button>
          </div>
          <img
            src="/fruit-vegetables.png"
            alt="Fruits"
            className="h-40 md:h-40 object-contain"
          />
        </div>

        {/* Baked Products */}
        <div className="bg-rose-50 p-6 rounded-2xl flex justify-between items-center">
          <div>
            <p className="text-lg text-gray-600 mb-1">15% Off</p>
            <h3 className="text-2xl font-bold mb-2">Baked Products</h3>
            <button className="text-sm text-gray-600 hover:underline flex items-center gap-1">
              Shop Collection →
            </button>
          </div>
          <img
            src="/cookie.png"
            alt="Bread Basket"
            className="h-40 md:h-40 object-contain"
          />
        </div>
      </div>
    </section>
  );
};

export default HeroBanner;
