import React, { useEffect, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import { Navigation } from "swiper/modules";
import { useNavigate } from "react-router-dom";

export default function Brands() {
  return (
    <div>
      <section className="max-w-screen-7xl mx-auto px-8 py-10">
        <h2 className="text-2xl font-bold text-gray-800">New Brand arrived</h2>
        <Swiper
          modules={[Navigation]}
          navigation
          spaceBetween={20}
          slidesPerView={1.2}
          breakpoints={{
            640: { slidesPerView: 2 },
            768: { slidesPerView: 3 },
            1024: { slidesPerView: 4 },
          }}
        >
          {[1, 2, 3, 4, 5].map((_, idx) => (
            <SwiperSlide key={idx}>
              <div className="bg-white rounded-lg shadow-md p-6 w-full max-w-md">
                <div className="flex items-center">
                  <img
                    className="w-24 h-24 object-cover rounded"
                    src="https://themewagon.github.io/FoodMart/images/product-thumb-12.jpg"
                    alt="Amber Jar"
                  />
                  <div className="ml-6">
                    <h2 className="text-xl font-semibold text-gray-800">
                      Amber Jar
                    </h2>
                    <p className="text-base text-gray-500">
                      Honey best nectar you wish to get
                    </p>
                  </div>
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </section>
    </div>
  );
}
