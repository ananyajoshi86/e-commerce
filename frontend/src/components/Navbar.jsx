import React, { useEffect, useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { FaHome } from "react-icons/fa";
import { FaShoppingCart } from "react-icons/fa";
import { IoLogIn } from "react-icons/io5";

const Navbar = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isSticky, setIsSticky] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const handleScroll = () => {
      const threshold = 300;
      setIsSticky(window.scrollY > threshold);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      fetchUserProfile(token);
    } else {
      setIsLoggedIn(false);
      setLoading(false);
    }
  }, []);

  const fetchUserProfile = async () => {
    try {
      const token = localStorage.getItem("token");
      const res = await fetch("/api/user/profile", {
        headers: { Authorization: `Bearer ${token}` },
      });

      if (!res.ok) throw new Error("Profile fetch failed");

      const data = await res.json();
      setUser(data.data);
      setIsLoggedIn(true);
    } catch (error) {
      console.error("Profile fetch error:", error);
      localStorage.removeItem("token");
      setIsLoggedIn(false);
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/search?q=${encodeURIComponent(searchQuery.trim())}`);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("userId");
    localStorage.removeItem("token");
    setIsLoggedIn(false);
    setUser(null);
    navigate("/login");
  };

  return (
    <header
      className={`z-50 w-full transition-all duration-300 ${
        isSticky ? "fixed top-0 left-0 bg-white shadow-md" : "relative"
      }`}
    >
      <div className="max-w-screen-xl mx-auto flex flex-wrap items-center justify-between gap-6 py-4 px-3">
        <div className="flex items-center space-x-3">
          <img
            src="/logo.png"
            alt="FOODMART Logo"
            className="h-20 w-60 object-contain"
          />
        </div>

        {/* 🔍 Search Form */}
        <form
          onSubmit={handleSearch}
          className="flex flex-grow max-w-2xl w-full"
        >
          <select className="border border-gray-300 rounded-l-md px-5 text-sm text-gray-600 bg-white">
            <option>All Categories</option>
            <option>Fruits</option>
            <option>Vegetables</option>
            <option>Dairy</option>
          </select>
          <input
            type="text"
            placeholder="Search..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="flex-grow border-t border-b border-gray-300 px-4 py-2 text-sm focus:outline-none"
          />
          <button
            type="submit"
            className="bg-green-500 hover:bg-green-600 px-4 rounded-r-md flex items-center justify-center"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5 text-white"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
              />
            </svg>
          </button>
        </form>

        <div className="flex items-center space-x-6">
          <NavLink
            to="/"
            className="text-md text-3xl font-semibold text-green-600"
          >
            <FaHome />
          </NavLink>
          <NavLink
            to="/cart"
            className="text-md text-3xl font-semibold text-green-600 "
          >
            <FaShoppingCart />
          </NavLink>
          <div className="flex items-center gap-4">
            {!loading && isLoggedIn && user ? (
              <NavLink
                to="/profile"
                className="block w-10 h-10 rounded-full overflow-hidden border-2 border-blue-500 shadow"
              >
                <img
                  src={
                    user.img?.path
                      ? `/uploads/${user.img.path}`
                      : `https://ui-avatars.com/api/?name=${encodeURIComponent(
                          user.name
                        )}`
                  }
                  alt="Profile"
                  className="w-full h-full object-cover"
                />
              </NavLink>
            ) : !loading ? (
              <NavLink
                to="/login"
                className="text-md text-3xl font-semibold text-green-600"
              >
                <IoLogIn />
              </NavLink>
            ) : null}
          </div>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
