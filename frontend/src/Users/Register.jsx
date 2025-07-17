import React, { useState } from "react";

export default function Createacc() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [img, setimg] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const validatePassword = (password) => password.length >= 8;

  const handleSubmit = async (e) => {
    e.preventDefault();

    let form = new FormData();
    form.append("img", img);
    form.append("name", name);
    form.append("email", email);
    form.append("password", password);

    try {
      const response = await fetch("/api/user/register", form);

      if (response.status === 201) {
        setName("");
        setEmail("");
        setPassword("");

        setSuccess("Account created successfully!");
      } else {
        setError(response.data.message || "Failed to create account");
      }
    } catch (error) {
      console.log(error);
      if (
        error.response &&
        error.response.data &&
        error.response.data.message
      ) {
        setError(error.response.data.message);
      } else {
        setError("Error: " + error.message);
      }
    }
  };

  return (
    <div>
      <div className="min-h-screen bg-gray-100">
        <div className="min-h-screen justify-center flex">
          {/* Left Side - Create Account Form */}
          <div className="w-full lg:w-1/2 flex items-center justify-center p-8">
            <div className="w-full max-w-md">
              {/* Form Container */}
              <div className="bg-white rounded-2xl shadow-xl p-8">
                {/* Logo */}
                <div className="text-center mb-8">
                  {/* <div className="inline-flex items-center justify-center w-16 h-16 bg-blue-100 rounded-full mb-4">
                                        <i className="fas fa-user-plus text-blue-300 fa-lg"></i>
                                    </div> */}
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
                  <div className="mb-4 text-blue-300 text-center font-semibold">
                    {error}
                  </div>
                )}

                {/* Form */}
                <form onSubmit={handleSubmit}>
                  {/* Name Field */}
                  <div className="mb-6">
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Full Name
                    </label>
                    <div className="relative">
                      <input
                        type="text"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        required
                        className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-300 focus:border-transparent transition-colors"
                        placeholder="Your Name"
                      />
                    </div>
                  </div>
                  <div className="mb-6">
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Full Name
                    </label>
                    <div className="relative">
                      <input
                        type="file"
                        name="img"
                        onChange={(e) => setimg(e.target.files[0])}
                        required
                        className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-300 focus:border-transparent transition-colors"
                        placeholder="John Doe"
                      />
                    </div>
                  </div>

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
                      <i className="fas fa-envelope absolute right-2 top-4 w-6 h-6 text-gray-400"></i>
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
                        placeholder="••••••••"
                      />
                    </div>
                    {password && !validatePassword(password) && (
                      <p className="mt-2 text-sm text-blue-300">
                        Password must be at least 8 characters
                      </p>
                    )}
                  </div>

                  {/* Submit Button */}
                  <button
                    type="submit"
                    className="w-full bg-blue-300 text-white py-3 rounded-lg font-semibold hover:bg-blue-400 focus:ring-4 focus:ring-blue-300 focus:ring-opacity-50 transition-colors"
                  >
                    Create Account
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
