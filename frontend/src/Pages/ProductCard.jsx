import React from "react";
import { useCart } from "../context/CartContext";
import { useNavigate } from "react-router-dom";
import { useAuth } from '../context/AuthContext';
 

const ProductCard = ({ product }) => {
  const { addToCart, addToWishlist } = useCart();
 const navigate = useNavigate();
  const { isAuthenticated } = useAuth();
  const isLoggedIn = !!localStorage.getItem("token");

  const handleAddToCart = () => {
    if (!isAuthenticated) {
      alert("Please login to add items to cart");
      navigate("/login");
      return;
    }
    addToCart(product);
  };
  const handleAddToWishlist = () => {
    if (!isAuthenticated) {
      alert("Please login to add items to cart");
      navigate("/login");
      return;
    }
    addToWishlist && addToWishlist(product);
  };
  return (
    <>
   
    <div className="border rounded p-4 bg-white shadow hover:shadow-lg transition">
      <img
        src={`/uploads/${product.image}`}
        alt={product.name}
        className="w-full h-48 object-cover mb-2 rounded"
      />
      <h3 className="font-bold text-lg text-gray-800">{product.name}</h3>
      <p className="text-sm text-gray-500 mb-1">{product.description}</p>
      <p className="text-blue-600 font-semibold text-md">${product.price}</p>

      <div className="mt-3 flex gap-2">
        <button
          className="bg-blue-600 text-white px-3 py-1 rounded hover:bg-blue-700"
          onClick={handleAddToCart}
        >
          Add to Cart
        </button>

        <button
          className="bg-pink-500 text-white px-3 py-1 rounded hover:bg-pink-600"
          onClick={handleAddToWishlist}
        >
          Wishlist
        </button>
      </div>
      </div>
      </>
  );
};

export default ProductCard;
