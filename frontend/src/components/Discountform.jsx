import React from "react";

import { Link, NavLink } from "react-router-dom";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";

import { Navigation } from "swiper/modules";

export default function Discountform() {
  return (
    <div>
      <div className="px-5 py-5">
        <section className="flex flex-col md:flex-row items-center justify-center gap-10 bg-blue-100 p-6 rounded-lg max-w-8xl h-150 mx-auto">
          <div className="md:w-1/3 mb-6 md:mb-0">
            <h1 className="text-3xl md:text-4xl font-bold text-black">
              Get <span className="text-yellow-500">25% Discount</span> on your
              first purchase
            </h1>
            <p className="text-gray-600 mt-4 text-xl">
              lorem Lorem ipsum dolor sit amet, consectetur adipiscing elit.
              Dictumst amet, metus, sit massa posuere maecenas. At tellus ut
              nunc amet vel egestas.
            </p>
          </div>
          <div className="md:w-1/3 w-full">
            <form className="flex flex-col">
              <label className="text-gray-700 mb-1 text-lg" htmlFor="name">
                Name
              </label>
              <input
                className="p-3 mb-5 border border-gray-300 rounded text-lg"
                type="text"
                id="name"
                placeholder="Name"
              />

              <label className="text-gray-700 mb-1 text-lg" htmlFor="email">
                Email
              </label>
              <input
                className="p-3 mb-5 border border-gray-300 rounded text-lg"
                type="email"
                id="email"
                placeholder="abc@mail.com"
              />

              <div className="flex items-center mb-5">
                <input
                  className="mr-2 scale-110"
                  type="checkbox"
                  id="subscribe"
                />
                <label className="text-gray-700 text-lg" htmlFor="subscribe">
                  Subscribe to the newsletter
                </label>
              </div>

              <button
                className="bg-black text-white p-3 rounded text-lg"
                type="submit"
              >
                Submit
              </button>
            </form>
          </div>
        </section>
      </div>
    </div>
  );
}
