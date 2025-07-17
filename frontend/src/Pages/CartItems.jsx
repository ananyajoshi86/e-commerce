// import React from "react";
// import { useCart } from "../context/CartContext";
// import { FiTrash2 } from "react-icons/fi";

// const Cart = () => {
//   const { cart, removeFromCart } = useCart();

//   const total = cart.reduce((sum, item) => sum + item.price * item.qty, 0);

//   return (
//     <div className="p-8 min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
//       <h2 className="text-3xl font-extrabold mb-8 text-indigo-700">
//         Your Cart
//       </h2>
//       {cart.length === 0 ? (
//         <div className="flex flex-col items-center justify-center h-64">
//           <img
//             src="/empty-cart.svg"
//             alt="Empty Cart"
//             className="w-40 mb-4 opacity-80"
//           />
//           <p className="text-lg text-gray-500">Your cart is empty.</p>
//         </div>
//       ) : (
//         <>
//           <ul className="space-y-6">
//             {cart.map((item) => (
//               <li
//                 key={item._id || item.id}
//                 className="flex items-center bg-white rounded-xl shadow-lg p-4 hover:shadow-2xl transition"
//               >
//                 <img
//                   src={
//                     item.image?.startsWith("")
//                       ? item.image
//                       : `/uploads/${item.image}`
//                   }
//                   alt={item.name}
//                   className="w-20 h-20 object-cover rounded-lg border mr-6"
//                 />
//                 <div className="flex-1">
//                   <div className="font-bold text-lg text-indigo-800">
//                     {item.name}
//                   </div>
//                   {/* <div className="flex items-center mt-2">
//                     <button
//                       className="p-2 bg-indigo-100 hover:bg-indigo-200 rounded-full text-indigo-600"
//                       onClick={() => decreaseQty(item._id || item.id)}
//                       disabled={item.qty <= 1}
//                     >
//                       <FiMinus />
//                     </button>
//                     <span className="mx-3 text-lg font-semibold">
//                       {item.qty}
//                     </span>
//                     <button
//                       className="p-2 bg-indigo-100 hover:bg-indigo-200 rounded-full text-indigo-600"
//                       onClick={() => addToCart(item)}
//                     >
//                       <FiPlus />
//                     </button>
//                   </div> */}
//                 </div>
//                 <div className="text-right mr-6">
//                   <div className="text-xl font-bold text-indigo-700">
//                     ${(item.price * item.qty).toFixed(2)}
//                   </div>
//                   <div className="text-sm text-gray-400">
//                     (${item.price.toFixed(2)} each)
//                   </div>
//                 </div>
//                 <button
//                   className="ml-2 p-2 bg-red-100 hover:bg-red-200 rounded-full text-red-600 transition"
//                   onClick={() => removeFromCart(item._id || item.id)}
//                   title="Remove"
//                 >
//                   <FiTrash2 size={20} />
//                 </button>
//               </li>
//             ))}
//           </ul>
//           <div className="mt-10 flex justify-end">
//             <div className="bg-white rounded-xl shadow-md px-8 py-6 text-right">
//               <div className="text-2xl font-bold text-indigo-800 mb-2">
//                 Total:{" "}
//                 <span className="text-green-600">${total.toFixed(2)}</span>
//               </div>
//               <button className="mt-4 bg-gradient-to-r from-indigo-500 to-blue-500 text-white px-6 py-2 rounded-lg font-semibold shadow hover:from-blue-600 hover:to-indigo-600 transition">
//                 Proceed to Checkout
//               </button>
//             </div>
//           </div>
//         </>
//       )}
//     </div>
//   );
// };

// export default Cart;

import { useCart } from "../context/CartContext";
import { Link } from "react-router-dom";
import Header from "../components/Header";
import { FiTrash2 } from "react-icons/fi";

export default function Cart() {
  const { cart, removeFromCart, updateQty, clearCart } = useCart();

  const total = cart.reduce((sum, item) => sum + item.price * item.qty, 0);

  const isLoggedIn = !!localStorage.getItem("token");

  if (!isLoggedIn) {
    return (
      <>
        <Header />
        <div className="min-h-[60vh] flex flex-col items-center justify-center">
          <h2 className="text-xl font-semibold mb-4 text-red-600">
            Please login to view your cart.
          </h2>
          <Link to="/login" className="text-blue-600 underline">
            Go to Login
          </Link>
        </div>
      </>
    );
  }

  if (cart.length === 0)
    return (
      <>
        <Header />
        <div className="min-h-[60vh] flex flex-col items-center justify-center pt-[250px]">
          <h2 className="text-2xl font-bold mb-4">Your cart is empty</h2>
          <Link to="/login" className="text-emerald-600 hover:underline">
            Login
          </Link>
        </div>
      </>
    );

  return (
    <>
      <Header />
      <div className="max-w-3xl mx-auto py-10 px-4 pt-[250px]">
        <h1 className="text-3xl font-bold mb-6"> 🛒Your Cart</h1>
        <div className="bg-white rounded-xl shadow-lg p-6">
          {cart.map((item, index) => (
            <div
              key={item._id || item.id || index}
              className="flex items-center gap-4 border-b py-4 last:border-b-0"
            >
              <img
                src={item.image}
                alt={item.name}
                className="w-20 h-20 object-contain rounded"
              />
              <div className="flex-1">
                <h3 className="font-semibold text-lg">{item.name}</h3>
                <p className="text-gray-500">₹{item.price}</p>
                <div className="flex items-center mt-2">
                  <button
                    className="px-2 py-1 bg-gray-200 rounded-l hover:bg-gray-300"
                    onClick={() => updateQty(item._id, item.qty - 1)}
                    disabled={item.qty === 1}
                  >
                    -
                  </button>
                  <span className="px-4">{item.qty}</span>
                  <button
                    className="px-2 py-1 bg-gray-200 rounded-r hover:bg-gray-300"
                    onClick={() => updateQty(item._id, item.qty + 1)}
                  >
                    +
                  </button>
                </div>
              </div>
              <div className="flex flex-col items-end">
                <span className="font-bold text-lg">
                  ₹{item.price * item.qty}
                </span>
                <button
                  className="text-red-500 mt-2 hover:underline"
                  onClick={() => removeFromCart(item._id)}
                >
                  <FiTrash2 />
                </button>
              </div>
            </div>
          ))}
          <div className="flex justify-between items-center mt-6">
            <button
              className="text-sm text-red-600 hover:underline"
              onClick={clearCart}
            >
              Clear Cart
            </button>
            <div className="text-xl font-bold">Total: ₹{total.toFixed(2)}</div>
          </div>
          <button className="mt-6 w-full bg-blue-500 hover:bg-emerald-100 text-white font-semibold py-3 rounded-xl text-lg transition">
            Proceed to Checkout
          </button>
        </div>
      </div>
    </>
  );
}
