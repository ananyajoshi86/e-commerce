import React from "react";

import { Link, NavLink } from "react-router-dom";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";

import { Navigation } from "swiper/modules";
export default function Blogs() {
  return (
    <div>
      <section className="py-8 px-4">
        <h2 className="text-4xl font-bold mb-6">Our Recent Blog</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <article className="bg-white rounded-lg shadow-md overflow-hidden">
            <img
              src="https://themewagon.github.io/FoodMart/images/post-thumb-1.jpg"
              alt="Fruits"
              className="w-full h-72 object-cover"
            />
            <div className="p-4">
              <div className="text-gray-500 text-base mb-2">
                <span className="mr-2">📅 22 AUG 2021</span>
                <span>📁 TIPS & TRICKS</span>
              </div>
              <h3 className="text-2xl font-semibold mb-2">
                Top 10 casual look ideas to dress up your kids
              </h3>
              <p className="text-gray-700 text-base">
                Lorem ipsum dolor sit amet, consectetur adipi elit. Aliquet
                eleifend viverra enim tincidunt donec quam. A in arcu, hendrerit
                neque dolor morbi...
              </p>
            </div>
          </article>

          <article className="bg-white rounded-lg shadow-md overflow-hidden">
            <img
              src="https://themewagon.github.io/FoodMart/images/post-thumb-2.jpg"
              alt="Cashew Butter"
              className="w-full h-72 object-cover"
            />
            <div className="p-4">
              <div className="text-gray-500 text-base mb-2">
                <span className="mr-2">📅 25 AUG 2021</span>
                <span>📁 TRENDING</span>
              </div>
              <h3 className="text-2xl font-semibold mb-2">
                Latest trends of wearing street wears supremely
              </h3>
              <p className="text-gray-700 text-base">
                Lorem ipsum dolor sit amet, consectetur adipi elit. Aliquet
                eleifend viverra enim tincidunt donec quam. A in arcu, hendrerit
                neque dolor morbi...
              </p>
            </div>
          </article>

          <article className="bg-white rounded-lg shadow-md overflow-hidden">
            <img
              src="https://themewagon.github.io/FoodMart/images/post-thumb-3.jpg"
              alt="Broccoli"
              className="w-full h-72 object-cover"
            />
            <div className="p-4">
              <div className="text-gray-500 text-base mb-2">
                <span className="mr-2">📅 28 AUG 2021</span>
                <span>📁 INSPIRATION</span>
              </div>
              <h3 className="text-2xl font-semibold mb-2">
                10 Different Types of comfortable clothes ideas for women
              </h3>
              <p className="text-gray-700 text-base">
                Lorem ipsum dolor sit amet, consectetur adipi elit. Aliquet
                eleifend viverra enim tincidunt donec quam. A in arcu, hendrerit
                neque dolor morbi...
              </p>
            </div>
          </article>
        </div>
        <div className="text-right mt-6">
          <a
            href="/all-articles"
            className="text-blue-500 hover:underline text-base font-medium"
          >
            Read All Articles ➔
          </a>
        </div>
      </section>
    </div>
  );
}
