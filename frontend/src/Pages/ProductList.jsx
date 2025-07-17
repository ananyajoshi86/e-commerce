// import React, { useEffect, useState } from "react";
// import { useCart } from "../context/Cart";

// const ProductList = () => {
//   const [products, setProducts] = useState([]);
//   useEffect(() => {
//     fetch("/api/product/all")
//       .then((res) => res.json())
//       .then((data) => setProducts(data.products || []));
//   }, []);

//   const { addToCart, addToWishlist } = useCart();

//   return (
//     <div>
//       {products.map((p) => (
//         <div key={p._id} className="border rounded p-4">
//           <img
//             src={`/uploads/${p.image}`}
//             alt={p.name}
//             className="w-full h-48 object-cover mb-2"
//           />
//           <h3 className="font-bold">{p.name}</h3>
//           <p>{p.description}</p>
//           <p className="text-blue-600 font-semibold">${p.price}</p>
//           <button
//             className="bg-blue-600 text-white px-3 py-1 rounded mr-2"
//             onClick={() => addToCart(p)}
//           >
//             Add to Cart
//           </button>
//           <button
//             className="bg-pink-500 text-white px-3 py-1 rounded"
//             onClick={() => addToWishlist(p)}
//           >
//             Wishlist
//           </button>
//         </div>
//       ))}
//     </div>
//   );
// };

// export default ProductList;

import React, { useState, useEffect } from "react";

const ProductList = () => {
  const [products, setProducts] = useState([]);
  const [quantities, setQuantities] = useState({});
  const [cart, setCart] = useState([]);

  // ✅ Fetch products using native fetch API
  useEffect(() => {
    fetch("/api/products")
      .then((res) => res.json())
      .then((data) => setProducts(data))
      .catch((err) => console.error("Failed to fetch products:", err));
  }, []);

  const handleIncrease = (id) => {
    setQuantities((prev) => ({
      ...prev,
      [id]: (prev[id] || 1) + 1,
    }));
  };

  const handleDecrease = (id) => {
    setQuantities((prev) => ({
      ...prev,
      [id]: prev[id] > 1 ? prev[id] - 1 : 1,
    }));
  };

  const handleAddToCart = (product) => {
    const qty = quantities[product._id] || 1;
    const updatedCart = [...cart];
    const index = updatedCart.findIndex((item) => item._id === product._id);

    if (index > -1) {
      updatedCart[index].quantity += qty;
    } else {
      updatedCart.push({ ...product, quantity: qty });
    }

    setCart(updatedCart);
    alert(`${product.name} added to cart!`);
  };

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 p-4">
      {products.map((product) => (
        <div key={product._id} className="bg-white p-4 rounded shadow-md">
          <img
            src={product.image?.path || "/images/placeholder.png"}
            alt={product.name}
            className="h-40 w-full object-contain mb-2"
          />
          <h2 className="text-lg font-semibold">{product.name}</h2>
          <p className="text-gray-600">${product.price}</p>
          <div className="flex items-center mt-2 gap-2">
            <button
              onClick={() => handleDecrease(product._id)}
              className="px-2 py-1 bg-gray-200 rounded"
            >
              -
            </button>
            <span>{quantities[product._id] || 1}</span>
            <button
              onClick={() => handleIncrease(product._id)}
              className="px-2 py-1 bg-gray-200 rounded"
            >
              +
            </button>
          </div>
          <button
            onClick={() => handleAddToCart(product)}
            className="mt-3 w-full bg-black text-white px-4 py-2 rounded"
          >
            Add to Cart
          </button>
        </div>
      ))}
    </div>
  );
};

export default ProductList;
