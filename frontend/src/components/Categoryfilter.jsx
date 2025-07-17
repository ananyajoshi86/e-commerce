import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Navbar from "../components/Navbar";

const ProductCard = ({ product, cart, handleAddToCart }) => {
  const [isAdded, setIsAdded] = useState(false);

  useEffect(() => {
    const alreadyInCart = cart.some((item) => item._id === product._id);
    setIsAdded(alreadyInCart);
  }, [cart, product]);

  const handleClick = async () => {
    if (!isAdded) {
      const success = await handleAddToCart(product);
      if (success) setIsAdded(true);
    }
  };

  return (
    <div className="bg-white p-4 rounded-lg shadow hover:shadow-lg transition">
      <img
        src={
          product.img?.path
            ? `/uploads/${product.img.path}`
            : `https://ui-avatars.com/api/?name=${encodeURIComponent(
                product.name
              )}`
        }
        alt={product.name}
        className="h-28 object-contain mb-2"
      />
      <h3 className="font-semibold text-gray-800">{product.name}</h3>
      <p className="text-sm text-gray-500">{product.category}</p>
      <p className="text-lg font-bold text-green-700 mt-1">₹{product.price}</p>
      <button
        className={`mt-3 ${
          isAdded
            ? "bg-red-500 hover:bg-red-600"
            : "bg-blue-500 hover:bg-blue-600"
        } text-white py-1 px-3 rounded`}
        onClick={handleClick}
        disabled={isAdded}
      >
        {isAdded ? "ADDED" : "Add to Cart"}
      </button>
    </div>
  );
};

const Categoryfilter = () => {
  const { category } = useParams();
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [cart, setCart] = useState([]);

  useEffect(() => {
    const fetchFilteredProducts = async () => {
      try {
        const response = await fetch(
          `/api/user/products?category=${encodeURIComponent(
            category
          )}`
        );
        const data = await response.json();
        setProducts(data);
      } catch (error) {
        console.error("Fetch error:", error);
      } finally {
        setLoading(false);
      }
    };

    const existingCart = JSON.parse(localStorage.getItem("cart")) || [];
    setCart(existingCart);

    fetchFilteredProducts();
  }, [category]);

  const handleAddToCart = async (product) => {
    const token = localStorage.getItem("token");

    if (!token) {
      alert("Please log in to add items to your cart.");
      return false;
    }

    const alreadyExists = cart.some((item) => item._id === product._id);
    if (alreadyExists) {
      return false;
    }

    try {
      const quantity = 1;
      await axios.post(
        "/api/user/addtocart",
        { productId: product._id, quantity },
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );

      const updatedCart = [
        ...cart,
        {
          _id: product._id,
          name: product.name,
          category: product.category,
          price: product.price,
          img: product.img,
          quantity,
        },
      ];

      localStorage.setItem("cart", JSON.stringify(updatedCart));
      setCart(updatedCart);
      return true;
    } catch (err) {
      console.error("Add to cart failed:", err.response?.data || err.message);
      alert("Failed to add to cart");
      return false;
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-6 py-10">
      <Navbar />
      <h2 className="text-2xl font-bold text-gray-800 mb-4">
        Products in: {category}
      </h2>

      {loading ? (
        <p className="text-gray-600">Loading...</p>
      ) : products.length === 0 ? (
        <p className="text-gray-500">No products found in this category.</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {products.map((product) => (
            <ProductCard
              key={product._id}
              product={product}
              cart={cart}
              handleAddToCart={handleAddToCart}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default Categoryfilter;
