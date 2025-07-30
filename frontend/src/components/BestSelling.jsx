import React, { useState } from "react";
import { FiHeart } from "react-icons/fi";
import { AiOutlineMinus, AiOutlinePlus } from "react-icons/ai";
import { useCart } from "../context/CartContext";


const products = [
  {
    id: 1,
    name: "Dairy Products",
    price: 18.0,
    rating: 4.5,
    discount: "-15%",
    image: "7.jpeg",
  },
  {
    id: 2,
    name: "Vegetables",
    price: 18.0,
    rating: 4.5,
    discount: "-15%",
    image: "6.jpeg",
  },
  {
    id: 3,
    name: "Sweets",
    price: 500.0,
    rating: 4.5,
    discount: "-15%",
    image: "5.jpeg",
  },
  {
    id: 4,
    name: "Fruits",
    price: 100.0,
    rating: 4.5,
    discount: "-15%",
    image: "4.jpeg",
  },
  {
    id: 5,
    name: "ColdDrinks",
    price: 300.0,
    rating: 4.5,
    discount: "-15%",
    image: "/3.jpeg",
  },
  {
    id: 6,
    name: "Ice-cream ",
    price: 100.0,
    rating: 4.5,
    discount: "-15%",
    image: "2.jpeg",
  },
  {
    id: 7,
    name: "Dairy Milk",
    price: 20.0,
    rating: 4.5,
    discount: "-15%",
    image: "/1.webp",
  },
];

const BestSellingProducts = () => {
  const [wishlist, setWishlist] = useState([]);

  const { addToCart } = useCart();
  
  const toggleWishlist = (id) => {
    setWishlist((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  return (
    <div className="px-6 py-10">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-3xl font-semibold">Best selling products</h2>
        <div className="flex items-center gap-2">
          <a href="#" className="text-sm font-semibold text-gray-700">
            View All Categories →
          </a>
          <button className="bg-gray-200 rounded-full p-2 text-xl">&lt;</button>
          <button className="bg-gray-200 rounded-full p-2 text-xl">&gt;</button>
        </div>
      </div>

      <div className="flex gap-6 overflow-x-auto scrollbar-hide">
        {products.map((product) => (
          <div
            key={product.id}
            className="min-w-[250px] bg-white rounded-2xl shadow-md p-4 relative"
          >
            <div className="relative mb-4">
              <img
                src={product.image}
                alt={product.name}
                className="w-full h-36 object-contain rounded-xl"
              />
              {product.discount && (
                <span className="absolute top-2 left-2 bg-green-200 text-green-800 text-xs font-bold px-2 py-0.5 rounded">
                  {product.discount}
                </span>
              )}
              <button
                onClick={() => toggleWishlist(product.id)}
                className={`absolute top-2 right-2 rounded-full p-2 transition ${
                  wishlist.includes(product.id)
                    ? "bg-red-500 text-white"
                    : "bg-white text-gray-600"
                }`}
              >
                <FiHeart />
              </button>
            </div>
            <h3 className="font-medium text-gray-800 text-lg leading-tight">
              {product.name}
            </h3>
            <div className="text-sm text-gray-500 mt-1">
              1 UNIT{" "}
              <span className="ml-2 text-yellow-500 font-semibold">
                ★ {product.rating}
              </span>
            </div>
            <div className="text-xl font-bold text-gray-900 mt-2">
              ${product.price.toFixed(2)}
            </div>

            <div className="flex items-center mt-3 gap-2">
              <button className="bg-gray-100 rounded-full p-1.5">
                <AiOutlineMinus size={16} />
              </button>
              <span className="text-sm font-medium">1</span>
              <button className="bg-gray-100 rounded-full p-1.5">
                <AiOutlinePlus size={16} />
              </button>
              <button
                className="ml-auto text-sm text-white-600 hover:text-black transition bg-blue-600 px-3 py-1.5 rounded-lg"
                onClick={() => addToCart(product)}
              >
                Add to Cart
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default BestSellingProducts;
