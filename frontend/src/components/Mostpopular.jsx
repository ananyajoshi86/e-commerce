import React, { useEffect, useState, useRef } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import { Navigation } from "swiper/modules";
import { Link } from "react-router-dom";

export default function Mostpopular() {
  const [products, setProducts] = useState([]);
  const [cart, setCart] = useState([]);
  const prevRef = useRef(null);
  const nextRef = useRef(null);

  useEffect(() => {
    const fetchPopularProducts = async () => {
      try {
        const res = await fetch("/api/user/popular");
        const data = await res.json();
        setProducts(data?.data || []);
      } catch (error) {
        console.error("Failed to fetch products", error);
      }
    };

    const storedCart = JSON.parse(localStorage.getItem("cart")) || [];
    setCart(storedCart);

    fetchPopularProducts();
  }, []);

  const handleAddToCart = async (product) => {
    const token = localStorage.getItem("token");
    if (!token) {
      alert("Please log in to add items to your cart.");
      return;
    }

    try {
      const quantity = 1;

      const res = await fetch("/api/user/addtocart", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ productId: product._id, quantity }),
      });

      if (!res.ok) throw new Error("Add to cart failed");

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
    } catch (err) {
      console.error("Add to cart failed:", err.message);
      alert("Failed to add to cart");
    }
  };

  const ProductCard = ({ product }) => {
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
      <Link to={`/product/${product._id}`} className="block">
        <div className="bg-white rounded-2xl shadow-lg p-4 hover:shadow-xl transition-shadow duration-300 group">
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
              className="w-full h-48 object-cover rounded-xl group-hover:scale-105 transition-transform duration-300"
            />
            <div className="absolute top-2 right-2 bg-yellow-400 text-white text-xs font-semibold px-2 py-1 rounded-full shadow">
              ★ {parseFloat(product.rating).toFixed(1)}
            </div>
          </div>

          <div className="mt-4 space-y-1">
            <h3 className="text-lg font-bold text-gray-800">{product.name}</h3>
            <p className="text-sm text-black">
              ₹{product.price.toLocaleString("en-IN")}
            </p>
          </div>

          <button
            onClick={handleClick}
            disabled={isAdded}
            className={`mt-3 w-full py-2 rounded transition ${
              isAdded
                ? "bg-green-500 cursor-not-allowed"
                : "bg-blue-500 hover:bg-blue-700"
            } text-white`}
          >
            {isAdded ? "Added to Cart" : "Add to Cart"}
          </button>
        </div>
      </Link>
    );
  };

  return (
    <div className="max-w-screen-xl mx-auto px-4 py-10">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-gray-800">
          Most Popular Products
        </h2>
        <div className="flex space-x-2">
          <button
            ref={prevRef}
            className="px-3 py-1 bg-gray-200 rounded hover:bg-gray-300"
          >
            Prev
          </button>
          <button
            ref={nextRef}
            className="px-3 py-1 bg-gray-200 rounded hover:bg-gray-300"
          >
            Next
          </button>
        </div>
      </div>

      <Swiper
        modules={[Navigation]}
        navigation={{
          prevEl: prevRef.current,
          nextEl: nextRef.current,
        }}
        onInit={(swiper) => {
          swiper.params.navigation.prevEl = prevRef.current;
          swiper.params.navigation.nextEl = nextRef.current;
          swiper.navigation.init();
          swiper.navigation.update();
        }}
        spaceBetween={20}
        slidesPerView={2}
        breakpoints={{
          640: { slidesPerView: 3 },
          768: { slidesPerView: 4 },
          1024: { slidesPerView: 6 },
        }}
      >
        {products.map((product) => (
          <SwiperSlide key={product._id}>
            <ProductCard product={product} />
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
}
