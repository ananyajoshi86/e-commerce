import React, { useState } from "react";
import { useNavigate, NavLink } from "react-router-dom";

export default function Loginpage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loginError, setLoginError] = useState("");
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoginError("");

    try {
      const { data } = await fetch(
        "/api/user/login",
        { email, password },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if (data && data.success) {
        localStorage.setItem("token", data.token);
        localStorage.setItem("userId", data.user._Id);
        setIsLoggedIn(true);
        navigate("/");
      } else {
        setIsLoggedIn(false);
        setLoginError("Account not found. Please create an account.");
      }
    } catch (error) {
      console.log(error);
      setIsLoggedIn(false);
      setLoginError("Invalid credentials or server error.");
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

              {isLoggedIn ? (
                <div className="text-green-600 text-center mb-4 font-semibold">
                  You are logged in!
                </div>
              ) : (
                <form onSubmit={handleSubmit}>
                  {/* Email Field */}
                  <div className="mb-6">
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Email Address
                    </label>
                    <div className="relative">
                      <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                        className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-300 focus:border-transparent transition-colors"
                        placeholder="you@example.com"
                      />
                    </div>
                  </div>

                  {/* Password Field */}
                  <div className="mb-6">
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Password
                    </label>
                    <div className="relative">
                      <input
                        type="text"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                        className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-300 focus:border-transparent transition-colors"
                        placeholder="Password"
                      />
                    </div>
                  </div>

                  {/* Error Message */}
                  {loginError && (
                    <p className="text-center text-red-600 mb-4">
                      {loginError}
                    </p>
                  )}

                  {/* Submit Button */}
                  <button
                    type="submit"
                    className="w-full bg-blue-500 text-white py-3 rounded-lg font-semibold hover:bg-blue-600 focus:ring-4 focus:ring-blue-300 focus:ring-opacity-50 transition-colors"
                  >
                    Sign In
                  </button>

                  {/* Forgot Password Link */}
                  <div className="flex justify-end mt-2">
                    <NavLink
                      to="/forgetpassword"
                      className="text-blue-600 hover:underline text-sm font-medium"
                    >
                      Forgot Password?
                    </NavLink>
                  </div>

                  {/* Sign Up Link */}
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
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
