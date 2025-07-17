import React, { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

export default function Cart() {
  const [cartItems, setCartItems] = useState([]);

  useEffect(() => {
    const cart = JSON.parse(localStorage.getItem("cart")) || [];
    setCartItems(cart);
  }, []);

  const updateCart = (updatedItems) => {
    setCartItems(updatedItems);
    localStorage.setItem("cart", JSON.stringify(updatedItems));
  };

  const handleIncrement = (id) => {
    const updated = cartItems.map((item) =>
      item._id === id ? { ...item, quantity: item.quantity + 1 } : item
    );
    updateCart(updated);
  };

  const handleDecrement = (id) => {
    const updated = cartItems.map((item) =>
      item._id === id && item.quantity > 1
        ? { ...item, quantity: item.quantity - 1 }
        : item
    );
    updateCart(updated);
  };

  const handleRemove = (id) => {
    const updated = cartItems.filter((item) => item._id !== id);
    updateCart(updated);
  };

  const total = cartItems.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  return (
    <div className="bg-blue-50 min-h-screen flex flex-col">
      <Navbar />
      <div className="flex-1">
        <div className="max-w-4xl mx-auto px-4 py-10">
          <h2 className="text-3xl font-bold text-blue-700 mb-8 text-center">
            Your Cart
          </h2>
          {cartItems.length === 0 ? (
            <div className="bg-white rounded-xl shadow p-8 text-center text-blue-400 text-xl font-semibold">
              Your cart is empty.
            </div>
          ) : (
            <div className="bg-white rounded-2xl shadow-xl p-6">
              <table className="min-w-full">
                <thead>
                  <tr>
                    <th className="px-4 py-3 text-left text-xs font-semibold text-blue-500 uppercase">
                      Product
                    </th>
                    <th className="px-4 py-3 text-left text-xs font-semibold text-blue-500 uppercase">
                      Category
                    </th>
                    <th className="px-4 py-3 text-center text-xs font-semibold text-blue-500 uppercase">
                      Quantity
                    </th>
                    <th className="px-4 py-3 text-right text-xs font-semibold text-blue-500 uppercase">
                      Price
                    </th>
                    <th className="px-4 py-3"></th>
                  </tr>
                </thead>
                <tbody>
                  {cartItems.map((item) => (
                    <tr
                      key={item._id}
                      className="border-b last:border-b-0 hover:bg-blue-50 transition"
                    >
                      <td className="px-4 py-4 flex items-center gap-4">
                        <img
                          src={
                            item.img?.path
                              ? `http://localhost:4499/uploads/${item.img.path}`
                              : `https://ui-avatars.com/api/?name=${encodeURIComponent(
                                  item.name
                                )}`
                          }
                          alt={item.name}
                          className="w-14 h-14 rounded-lg object-cover border"
                        />
                        <span className="font-semibold text-blue-800">
                          {item.name}
                        </span>
                      </td>
                      <td className="px-4 py-4 text-blue-600">
                        {item.category}
                      </td>
                      <td className="px-4 py-4 text-center">
                        <div className="flex items-center justify-center gap-2">
                          <button
                            onClick={() => handleDecrement(item._id)}
                            className="bg-blue-200 text-blue-700 px-2 py-1 rounded hover:bg-blue-300"
                          >
                            −
                          </button>
                          <span className="font-bold text-blue-700">
                            {item.quantity}
                          </span>
                          <button
                            onClick={() => handleIncrement(item._id)}
                            className="bg-blue-200 text-blue-700 px-2 py-1 rounded hover:bg-blue-300"
                          >
                            +
                          </button>
                        </div>
                      </td>
                      <td className="px-4 py-4 text-right text-blue-700 font-bold">
                        ₹{item.price * item.quantity}
                      </td>
                      <td className="px-4 py-4 text-right">
                        <button
                          className="text-blue-400 hover:text-blue-700 transition font-bold"
                          onClick={() => handleRemove(item._id)}
                        >
                          Remove
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
              <div className="flex justify-end mt-8">
                <div className="bg-blue-100 rounded-xl px-8 py-4 text-xl font-bold text-blue-700 shadow">
                  Total: ₹{total}
                </div>
              </div>
              <div className="flex justify-end mt-6">
                <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold px-8 py-3 rounded-xl shadow transition">
                  Proceed to Checkout
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
      <Footer/>
    </div>
  );
}
