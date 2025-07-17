import React, { useState } from "react";
import ProductCard from "../pages/ProductCard";
import { useCart } from "../context/CartContext";

const categories = ["All", "Fruits & Veges", "Juices"];
const defaultProducts = [
  {
    id: 1,
    name: "Fruits",
    price: 18,
    image: "/4.jpeg",
    rating: 4.5,
    discount: "-30%",
    category: "Juices",
  },
  {
    id: 2,
    name: "Vegetables",
    price: 18,
    image: "/6.jpeg",
    rating: 4.5,
    discount: "-30%",
    category: "Fruits & Veges",
  },
  {
    id: 3,
    name: "Juices",
    price: 18,
    image: "/juice.jpeg",
    rating: 4.5,
    category: "Fruits & Veges",
  },
  {
    id: 4,
    name: " Milk ",
    price: 18,
    image: "/thumb-milk.png",
    rating: 4.5,
    category: "Juices",
  },
];

const TrendingProducts = ({ products = defaultProducts }) => {
  const [activeCategory, setActiveCategory] = useState("All");
  const { addToCart } = useCart();

  const filteredProducts =
    activeCategory === "All"
      ? products
      : products.filter((p) => p.category === activeCategory);

  return (
    <div className="px-6 py-10">
      <div className="flex items-center justify-between mb-4 ">
        <h2 className="text-2xl font-semibold">Trending Products</h2>
        <div className="flex space-x-6 text-sm font-semibold border-b border-gray-200 ">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`pb-1 ${
                activeCategory === cat
                  ? "border-b-2 border-yellow-400 text-yellow-600"
                  : "text-gray-500"
              }`}
            >
              {cat.toUpperCase()}
            </button>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 ">
        {filteredProducts.map((product) => (
          <div
            key={product.id}
            className="bg-white p-4 rounded-xl shadow-sm relative group hover:shadow-lg transition"
          >
            {product.discount && (
              <span className="absolute top-2 left-2 text-xs bg-green-500 text-white px-2 py-0.5 rounded">
                {product.discount}
              </span>
            )}

            <button className="absolute top-2 right-2 bg-white border rounded-full p-1 text-gray-500 hover:text-red-400 transition">
              ♡
            </button>

            <img
              src={product.image}
              alt={product.name}
              className="h-28 mx-auto object-contain mb-4"
            />

            <h3 className="text-sm font-semibold mb-1">
              {product.name.length > 28
                ? product.name.substring(0, 28) + "..."
                : product.name}
            </h3>

            <div className="text-xs text-gray-500 mb-1 flex items-center gap-1">
              <span>1 UNIT</span>
              <span className="text-yellow-500">★</span>
              <span className="font-semibold">{product.rating}</span>
            </div>

            <p className="font-bold text-lg">${product.price.toFixed(2)}</p>

            <div className="mt-2 flex items-center justify-between">
              <div className="flex items-center border rounded-md">
                <button className="px-2 text-lg">−</button>
                <span className="px-2">1</span>
                <button className="px-2 text-lg">+</button>
              </div>
              <button
                className="text-sm text-white-600 hover:text-black transition bg-blue-600 px-2 py-1 rounded"
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

export default TrendingProducts;
