import React, { useState } from "react";
import { useNavigate, NavLink } from "react-router-dom";
import axios from "axios";
import { useUser } from "../Context/UserContext"; // ✅ Import context

export default function Loginpage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loginError, setLoginError] = useState("");
  const navigate = useNavigate();

  const { fetchUserProfile } = useUser();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await axios.post(
        "/api/user/login",
        { email, password },
        {
          headers: { "Content-Type": "application/json" },
          withCredentials: true, // ✅ Send cookie
        }
      );

      if (res.data.success) {
        await fetchUserProfile(); // ✅ Set user in context
        navigate("/");
      } else {
        setLoginError(res.data.message);
      }
    } catch (err) {
      console.error(err);
      setLoginError(err.response?.data?.message || "Login failed");
    }
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <div className="min-h-screen justify-center flex">
        <div className="w-full lg:w-1/2 flex items-center justify-center p-8">
          <div className="w-full max-w-md">
            <div className="bg-white rounded-2xl shadow-xl p-8">
              <div className="text-center mb-8">
                <h2 className="text-2xl font-bold text-gray-800">USER LOGIN</h2>
                <p className="text-gray-600 mt-2">Please sign in to continue</p>
              </div>

              <form onSubmit={handleSubmit}>
                {/* Email */}
                <div className="mb-6">
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Email Address
                  </label>
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-300"
                    placeholder="you@example.com"
                  />
                </div>

                {/* Password */}
                <div className="mb-6">
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Password
                  </label>
                  <input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-300"
                    placeholder="Password"
                  />
                </div>

                {/* Error */}
                {loginError && (
                  <p className="text-center text-red-600 mb-4">{loginError}</p>
                )}

                {/* Submit */}
                <button
                  type="submit"
                  className="w-full bg-blue-500 text-white py-3 rounded-lg font-semibold hover:bg-blue-600"
                >
                  Sign In
                </button>

                {/* Links */}
                <div className="flex justify-end mt-2">
                  <NavLink
                    to="/forgetpassword"
                    className="text-blue-600 hover:underline text-sm font-medium"
                  >
                    Forgot Password?
                  </NavLink>
                </div>

                <p className="mt-6 text-center text-gray-600">
                  Don't have an account?{" "}
                  <NavLink
                    to="/createaccount"
                    className="text-blue-600 hover:text-blue-400 font-semibold"
                  >
                    Sign up from here
                  </NavLink>
                </p>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
