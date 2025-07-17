import React, { useEffect, useState } from "react";
import { useLocation, Link } from "react-router-dom";

import Navbar from "./Navbar";

const SearchResults = () => {
  const [results, setResults] = useState([]);
  const query = new URLSearchParams(useLocation().search).get("q");

  useEffect(() => {
    const fetchResults = async () => {
      try {
        const res = await fetch(
          `/api/user/search?q=${encodeURIComponent(query)}`
        );
        setResults(res.data.data || []);
      } catch (err) {
        console.error("Search failed:", err);
      }
    };

    if (query) fetchResults();
  }, [query]);

  return (
    <div className="max-w-screen-xl mx-auto px-6 py-10">
      <Navbar />
      <h2 className="text-2xl font-bold text-gray-800 mb-6">
        Search results for: <span className="text-blue-600">"{query}"</span>
      </h2>

      {results.length === 0 ? (
        <p className="text-gray-600">No products found.</p>
      ) : (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {results.map((product) => (
            <Link
              key={product._id}
              to={`/product/${product._id}`}
              className="bg-white p-4 rounded-xl shadow hover:shadow-lg transition"
            >
              <img
                src={
                  product.img?.path
                    ? `/uploads/${product.img.path}`
                    : `https://ui-avatars.com/api/?name=${encodeURIComponent(
                        product.name
                      )}`
                }
                alt={product.name}
                className="w-full h-40 object-contain mb-3"
              />
              <h3 className="text-lg font-semibold">{product.name}</h3>
              <p className="text-sm text-gray-500">₹{product.price}</p>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
};

export default SearchResults;
