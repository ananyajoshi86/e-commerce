import React from "react";

import { Link, NavLink } from "react-router-dom";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";

import { Navigation } from "swiper/modules";
export default function Footer() {
  return (
    <div>
      <footer className="bg-white text-gray-700 py-8">
        <div className="max-w-screen-xl mx-auto px-4">
          <div className="flex flex-wrap justify-between gap-8">
            {/* Logo & Social */}
            <div className="w-full md:w-1/4">
              <div className="flex items-center mb-4">
                <img
                  src="https://themewagon.github.io/FoodMart/images/logo.png"
                  alt="FOODMART Logo"
                  className="h-20 w-48 object-contain" // Increased from h-10 w-10 to h-16 w-16
                />
              </div>

              <div className="flex mt-4 space-x-4">
                <img
                  src="placeholder-facebook.png"
                  alt="Facebook"
                  className="h-6 w-6"
                />
                <img
                  src="placeholder-twitter.png"
                  alt="Twitter"
                  className="h-6 w-6"
                />
                <img
                  src="placeholder-youtube.png"
                  alt="YouTube"
                  className="h-6 w-6"
                />
                <img
                  src="placeholder-instagram.png"
                  alt="Instagram"
                  className="h-6 w-6"
                />
                <img
                  src="placeholder-amazon.png"
                  alt="Amazon"
                  className="h-6 w-6"
                />
              </div>
            </div>

            {/* Ultras Links */}
            <div className="w-full md:w-1/4">
              <h3 className="text-lg font-semibold mb-4">Ultras</h3>
              <ul className="text-sm text-gray-500 space-y-2">
                <li>
                  <a href="#">About us</a>
                </li>
                <li>
                  <a href="#">Conditions</a>
                </li>
                <li>
                  <a href="#">Our Journals</a>
                </li>
                <li>
                  <a href="#">Careers</a>
                </li>
                <li>
                  <a href="#">Affiliate Programme</a>
                </li>
                <li>
                  <a href="#">Ultras Press</a>
                </li>
              </ul>
            </div>

            {/* Customer Service */}
            <div className="w-full md:w-1/4">
              <h3 className="text-lg font-semibold mb-4">Customer Service</h3>
              <ul className="text-sm text-gray-500 space-y-2">
                <li>
                  <a href="#">FAQ</a>
                </li>
                <li>
                  <a href="#">Contact</a>
                </li>
                <li>
                  <a href="#">Privacy Policy</a>
                </li>
                <li>
                  <a href="#">Returns & Refunds</a>
                </li>
                <li>
                  <a href="#">Cookie Guidelines</a>
                </li>
                <li>
                  <a href="#">Delivery Information</a>
                </li>
              </ul>
            </div>

            {/* Subscribe */}
            <div className="w-full md:w-1/4">
              <h3 className="text-lg font-semibold mb-4">Subscribe Us</h3>
              <p className="text-sm text-gray-500 mb-4">
                Subscribe to our newsletter to get updates about our grand
                offers.
              </p>
              <div className="flex">
                <input
                  type="email"
                  placeholder="Email Address"
                  className="w-full px-4 py-2 border border-gray-300 rounded-l-md text-sm"
                />
                <button className="px-4 py-2 bg-black text-white rounded-r-md text-sm">
                  Subscribe
                </button>
              </div>
            </div>
          </div>

          {/* Footer Bottom */}
        </div>
      </footer>
    </div>
  );
}
