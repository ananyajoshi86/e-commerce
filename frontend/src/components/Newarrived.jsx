import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

function ProductCard({ product, cart, handleAddToCart }) {
  const [isAdded, setIsAdded] = useState(false);

  useEffect(() => {
    const found = cart.some((item) => item._id === product._id);
    setIsAdded(found);
  }, [cart, product]);

  const handleClick = (e) => {
    e.preventDefault();
    if (!isAdded) {
      handleAddToCart(product);
      setIsAdded(true);
    }
  };

  return (
    <Link
      to={`/product/${product._id}`}
      className="w-full sm:w-[calc(50%-0.625rem)] md:w-[calc(33.333%-0.666rem)] lg:w-[calc(25%-0.75rem)]"
    >
      <div className="p-4">
        <div className="w-full mx-auto bg-white rounded-xl shadow-md p-4 relative hover:shadow-lg transition-all duration-300">
          <span className="absolute top-3 left-3 bg-green-100 text-green-700 text-xs font-semibold px-2 py-1 rounded">
            -30%
          </span>

          <button className="absolute top-3 right-3 text-gray-400 hover:text-red-500">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M5 15l7-7 7 7"
              />
            </svg>
          </button>

          <div className="flex justify-center my-4">
            <img
              src={
                product.img?.path
                  ? `/uploads/${product.img.path}`
                  : `https://ui-avatars.com/api/?name=${encodeURIComponent(
                      product.name
                    )}`
              }
              alt={product.name}
              className="h-28 object-contain"
            />
          </div>

          <h3 className="text-sm font-medium text-gray-800">{product.name}</h3>
          <div className="text-xs text-gray-500 mt-1">
            {product.description}
          </div>
          <div className="flex items-center text-sm text-yellow-500 mt-1">
            <span className="ml-1 text-red-500">{product.category}</span>
          </div>

          <div className="text-lg font-bold text-gray-800 mt-2">
            {product.price}
          </div>

          <div className="mt-4 flex items-center justify-between">
            <button
              className={`ml-3 ${
                isAdded
                  ? "bg-green-500 hover:bg-green-600"
                  : "bg-blue-500 hover:bg-blue-600"
              } text-white py-1 px-3 rounded`}
              onClick={handleClick}
            >
              {isAdded ? "Added to cart" : "Add to Cart"}
            </button>
          </div>
        </div>
      </div>
    </Link>
  );
}

export default function Newarrived() {
  const [products, setProducts] = useState([]);
  const [cart, setCart] = useState([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const navigate = useNavigate();

  const limit = 8;

  const fetchProducts = async () => {
    try {
      const res = await fetch(
        `/api/user/allproducts?page=${page}&limit=${limit}`
      );
      const data = await res.json();
      setProducts(data.data || []);
      setTotalPages(data.totalPages || 1);
    } catch (error) {
      setProducts([]);
      console.error("Failed to fetch products:", error);
    }
  };

  useEffect(() => {
    const existingCart = JSON.parse(localStorage.getItem("cart")) || [];
    setCart(existingCart);
    fetchProducts();
  }, [page]);

  const handleAddToCart = async (product) => {
    const token = localStorage.getItem("token");

    if (!token) {
      alert("Please log in to add items to your cart.");
      return;
    }

    try {
      const quantity = 1;

      await fetch("/api/user/addtocart", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          productId: product._id,
          quantity,
        }),
      });

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
    } catch (err) {
      console.error("Add to cart failed:", err.message);
      alert("Failed to add to cart");
    }
  };

  const handlePrev = () => {
    if (page > 1) setPage(page - 1);
  };

  const handleNext = () => {
    if (page < totalPages) setPage(page + 1);
  };

  return (
    <>
      <h2 className="text-2xl font-bold text-gray-800 mx-8">New Arrivals</h2>
      <section className="max-w-screen-xl mx-auto py-8 grid gap-20 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
        {products.map((product) => (
          <ProductCard
            key={product._id}
            product={product}
            cart={cart}
            handleAddToCart={handleAddToCart}
          />
        ))}
      </section>

      <div className="flex justify-center mt-10 gap-4">
        <button
          onClick={handlePrev}
          disabled={page === 1}
          className="px-4 py-2 bg-gray-200 text-gray-800 rounded hover:bg-gray-300 disabled:opacity-50"
        >
          Prev
        </button>
        <span className="text-lg text-gray-700 font-medium">
          Page {page} of {totalPages}
        </span>
        <button
          onClick={handleNext}
          disabled={page === totalPages}
          className="px-4 py-2 bg-gray-200 text-gray-800 rounded hover:bg-gray-300 disabled:opacity-50"
        >
          Next
        </button>
      </div>
    </>
  );
}
