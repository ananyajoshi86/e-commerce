import React from "react";

const promos = [
  {
    title: "Luxa Dark Chocolate",
    description: "Very tasty & creamy vanilla flavour creamy muffins.",
    image: "/chocolate.png", 
    bg: "bg-red-50",
    textColor: "text-black",
  },
  {
    title: "Creamy Muffins",
    description: "Very tasty & creamy vanilla flavour creamy muffins.",
    image: "/muffin.png", 
    bg: "bg-blue-50",
    textColor: "text-black",
  },
];

const PromoCards = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 px-6 py-10">
      {promos.map((promo, index) => (
        <div
          key={index}
          className={`relative flex items-center justify-between rounded-xl ${promo.bg} p-6 overflow-hidden`}
        >
          {/* Left Content */}
          <div className="max-w-[50%] z-10 h-80">
            <h4 className="text-xl text-yellow-500 font-semibold mb-2">
              Upto 25% Off
            </h4>
            <h2 className={`text-3xl font-bold mb-2 ${promo.textColor}`}>
              {promo.title}
            </h2>
            <p className="text-gray-600 mb-4">{promo.description}</p>
            <button className="bg-black text-white px-4 py-2 rounded-md text-sm">
              SHOW NOW
            </button>
          </div>

          {/* Right Image */}
          <img
            src={promo.image}
            alt={promo.title}
            className="max-h-64 object-contain absolute right-4 bottom-0 z-0"
          />
        </div>
      ))}
    </div>
  );
};

export default PromoCards;
