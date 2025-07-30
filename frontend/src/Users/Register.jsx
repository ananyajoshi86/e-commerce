import React, { useState } from "react";
import axios from "axios";

export default function Createacc() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [img, setImg] = useState(null);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const validatePassword = (password) => password.length >= 8;

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    try {
      const formData = new FormData();
      formData.append("img", img);
      formData.append("name", name);
      formData.append("email", email);
      formData.append("password", password);

      const response = await axios.post("/api/user/register", formData);

      if (response.status === 201) {
        setName("");
        setEmail("");
        setPassword("");
        setImg(null);
        setSuccess("Account created successfully!");
      } else {
        setError(response.data.message || "Failed to create account");
      }
    } catch (err) {
      console.error(err);
      if (err.response && err.response.data && err.response.data.message) {
        setError(err.response.data.message);
      } else {
        setError("Error: " + err.message);
      }
    }
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <div className="min-h-screen justify-center flex">
        <div className="w-full lg:w-1/2 flex items-center justify-center p-8">
          <div className="w-full max-w-md">
            <div className="bg-white rounded-2xl shadow-xl p-8">
              <div className="text-center mb-8">
                <h2 className="text-2xl font-bold text-gray-800">
                  Create Account
                </h2>
                <p className="text-gray-600 mt-2">
                  Get started with your account
                </p>
              </div>

              {/* Success/Error Messages */}
              {success && (
                <div className="mb-4 text-green-600 text-center font-semibold">
                  {success}
                </div>
              )}
              {error && (
                <div className="mb-4 text-red-500 text-center font-semibold">
                  {error}
                </div>
              )}

              <form onSubmit={handleSubmit}>
                {/* Name */}
                <div className="mb-6">
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Full Name
                  </label>
                  <input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    required
                    className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-300"
                    placeholder="Your Name"
                  />
                </div>

                {/* Profile Image */}
                <div className="mb-6">
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Profile Image
                  </label>
                  <input
                    type="file"
                    name="img"
                    accept="image/*"
                    onChange={(e) => setImg(e.target.files[0])}
                    required
                    className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-300"
                  />
                </div>

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
                    placeholder="••••••••"
                  />
                  {password && !validatePassword(password) && (
                    <p className="mt-2 text-sm text-red-400">
                      Password must be at least 8 characters
                    </p>
                  )}
                </div>

                {/* Submit */}
                <button
                  type="submit"
                  className="w-full bg-blue-500 text-white py-3 rounded-lg font-semibold hover:bg-blue-600 focus:ring-4 focus:ring-blue-300 transition-colors"
                >
                  Create Account
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
