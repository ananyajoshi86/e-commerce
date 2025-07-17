import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { toast } from "react-toastify";
import Navbar from "./Navbar";

const Product = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [isAdded, setIsAdded] = useState(false);
  const [cart, setCart] = useState([]);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const res = await fetch(`/api/user/product/${id}`);
        const data = await res.json();
        setProduct(data.data);
      } catch (err) {
        console.error("Error fetching product:", err);
      }
    };

    const existingCart = JSON.parse(localStorage.getItem("cart")) || [];
    setCart(existingCart);

    fetchProduct();
  }, [id]);

  useEffect(() => {
    if (product) {
      const found = cart.some((item) => item._id === product._id);
      setIsAdded(found);
    }
  }, [cart, product]);

  const handleAddToCart = async () => {
    const token = localStorage.getItem("token");

    if (!token) {
      toast.error("⚠️ Please log in to add items to your cart.");
      return;
    }

    try {
      const quantity = 1;

      const res = await fetch("/api/user/addtocart", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ productId: product._id, quantity }),
      });

      const data = await res.json();

      if (!res.ok) throw new Error(data.message || "Failed to add to cart");

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

      setCart(updatedCart);
      localStorage.setItem("cart", JSON.stringify(updatedCart));
      setIsAdded(true);
      toast.success("✅ Added to cart!");
    } catch (err) {
      console.error("Add to cart failed:", err);
      toast.error("❌ Failed to add to cart");
    }
  };

  if (!product)
    return (
      <div className="p-10 text-gray-600 text-center text-xl">
        Loading product...
      </div>
    );

  return (
    <>
      <Navbar />
      <div className="max-w-6xl mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 items-start">
          {/* Image Section */}
          <div className="relative">
            <img
              src={
                product.img?.path
                  ? `/uploads/${product.img.path}`
                  : `https://ui-avatars.com/api/?name=${encodeURIComponent(
                      product.name
                    )}`
              }
              alt={product.name}
              className="w-full max-h-[500px] object-contain rounded-xl shadow-lg hover:scale-105 transition-transform duration-300"
            />
            <span className="absolute top-4 left-4 bg-green-100 text-green-800 text-xs font-semibold px-3 py-1 rounded">
              {product.category || "Category"}
            </span>
          </div>

          {/* Product Info Section */}
          <div className="space-y-6">
            <h1 className="text-4xl font-bold text-gray-800">{product.name}</h1>

            <div className="flex items-center gap-4">
              <p className="text-3xl font-bold text-blue-600">
                ₹{product.price.toLocaleString("en-IN")}
              </p>
              <div className="flex items-center gap-1 text-yellow-400">
                <span>★</span>
                <span className="text-gray-700 font-medium">
                  {product.rating || "4.5"}
                </span>
              </div>
            </div>

            <p className="text-green-600 font-medium">In Stock</p>

            <p className="text-gray-600 leading-relaxed">
              {product.description ||
                "This product currently has no description. Stay tuned!"}
            </p>

            <div className="flex flex-col sm:flex-row gap-4">
              <button
                onClick={handleAddToCart}
                disabled={isAdded}
                className={`${
                  isAdded
                    ? "bg-green-500 hover:bg-green-600"
                    : "bg-blue-600 hover:bg-blue-700"
                } text-white px-6 py-3 rounded-xl font-medium shadow transition`}
              >
                {isAdded ? "Added to Cart" : "Add to Cart"}
              </button>

              <button className="border border-gray-300 hover:border-gray-400 px-6 py-3 rounded-xl text-gray-700 font-medium shadow-sm transition">
                Add to Wishlist
              </button>
            </div>
          </div>
        </div>

        {/* Optional: Details Section */}
        <div className="mt-14">
          <h2 className="text-2xl font-semibold text-gray-800 mb-4">
            Product Details
          </h2>
          <ul className="list-disc list-inside text-gray-600 space-y-2">
            <li>Category: {product.category || "N/A"}</li>
            <li>Product ID: {product._id}</li>
            <li>Available for immediate delivery</li>
            <li>Free shipping over ₹499</li>
          </ul>
        </div>
      </div>
    </>
  );
};

export default Product;
