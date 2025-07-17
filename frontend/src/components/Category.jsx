import React from "react";
import { useNavigate } from "react-router-dom";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import { Navigation } from "swiper/modules";

const categories = [
  {
    name: "Fruits",
    img: "/4.jpeg",
  },
  {
    name: "Pulses",
    img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRiNX1VLc0MUXsOWWr6njpK_qrZ4iLVH-WnOg&s",
  },
  {
    name: "Snacks",
    img: "/chips.jpeg",
  },
  {
    name: "Dairy",
    img: "/7.jpeg",
  },
  {
    name: "Sweet",
    img: "/2.jpeg",
  },
  {
    name: "Fresh-veggies",
    img: "/6.jpeg",
  },
];

export default function Category() {
  const navigate = useNavigate();

  const handleCategoryClick = (category) => {
    navigate(`/filter/${encodeURIComponent(category)}`);
  };

  return (
    <div className="max-w-screen-7xl mx-auto px-8 py-10">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-gray-800">Category</h2>
      </div>

      <Swiper
        modules={[Navigation]}
        navigation
        spaceBetween={20}
        slidesPerView={2}
        breakpoints={{
          640: { slidesPerView: 3 },
          768: { slidesPerView: 4 },
          1024: { slidesPerView: 6 },
        }}
        className="pb-6"
      >
        {categories.map((cat) => (
          <SwiperSlide key={cat.name}>
            <div
              onClick={() => handleCategoryClick(cat.name)}
              className="cursor-pointer bg-white rounded-xl shadow-md p-6 flex flex-col items-center text-center transition-transform duration-300 transform hover:-translate-y-2 hover:shadow-xl h-44"
            >
              <img
                src={cat.img}
                alt={cat.name}
                className="w-20 h-20 object-contain mb-2"
              />
              <p className="text-base font-semibold text-gray-800 mt-2">
                {cat.name}
              </p>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
}
