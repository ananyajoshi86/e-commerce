import React, { useState } from "react";

export default function AddProduct() {
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("");
  const [rating, setRating] = useState(""); // New field
  const [img, setImg] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    const form = new FormData();
    form.append("img", img);
    form.append("name", name);
    form.append("price", price);
    form.append("description", description);
    form.append("category", category);
    form.append("rating", rating);

    try {
      const response = await fetch("/api/user/add", {
        method: "POST",
        body: form,
      });

      const data = await response.json();

      if (response.status === 201) {
        setName("");
        setPrice("");
        setDescription("");
        setImg("");
        setCategory("");
        setRating("");
        setSuccess("✅ Product added successfully!");
        setError("");
      } else {
        setError(data.message || "❌ Failed to add product");
        setSuccess("");
      }
    } catch (err) {
      setSuccess("");
      setError("❌ Error: " + err.message);
    }
  };

  return (
    <div className="bg-gray-100 min-h-screen flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-xl w-full space-y-8">
        <div className="bg-white shadow-xl rounded-2xl px-8 py-10">
          <div className="text-center mb-6">
            <h2 className="text-3xl font-bold text-blue-400">
              Add New Product
            </h2>
            <p className="mt-2 text-gray-500">
              Fill in the details to list a new product
            </p>
          </div>

          {/* Alert Messages */}
          {success && (
            <div className="text-green-600 text-center font-medium mb-4">
              {success}
            </div>
          )}
          {error && (
            <div className="text-red-500 text-center font-medium mb-4">
              {error}
            </div>
          )}

          <form className="space-y-5" onSubmit={handleSubmit}>
            {/* Product Name */}
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Product Name
              </label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
                className="mt-1 block w-full px-4 py-2 border rounded-lg shadow-sm focus:ring-blue-300 focus:border-blue-300"
              />
            </div>

            {/* Image Upload */}
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Product Image
              </label>
              <input
                type="file"
                onChange={(e) => setImg(e.target.files[0])}
                required
                className="mt-1 block w-full px-4 py-2 border rounded-lg shadow-sm file:mr-4 file:py-2 file:px-4 file:border file:rounded-full file:text-sm file:font-semibold file:bg-blue-100 file:text-blue-700 hover:file:bg-blue-200"
              />
            </div>

            {/* Category Dropdown */}
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Category
              </label>
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                required
                className="mt-1 block w-full px-4 py-2 border rounded-lg shadow-sm focus:ring-blue-300 focus:border-blue-300"
              >
                <option value="">Select Category</option>
                <option value="Sweet">Sweet</option>
                <option value="Snacks">Snacks</option>
                <option value="Pulses">Pulses</option>
                <option value="Food-item">Food-item</option>
                <option value="Fresh-veggies">Fresh-veggies</option>
                <option value="Fruits">Fruits</option>
              </select>
            </div>

            {/* Price */}
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Price (₹)
              </label>
              <input
                type="number"
                value={price}
                onChange={(e) => setPrice(e.target.value)}
                required
                className="mt-1 block w-full px-4 py-2 border rounded-lg shadow-sm focus:ring-blue-300 focus:border-blue-300"
              />
            </div>

            {/* Rating */}
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Rating (1 to 5)
              </label>
              <input
                type="number"
                value={rating}
                onChange={(e) => setRating(e.target.value)}
                min="1"
                max="5"
                step="0.1"
                required
                className="mt-1 block w-full px-4 py-2 border rounded-lg shadow-sm focus:ring-blue-300 focus:border-blue-300"
              />
            </div>

            {/* Description */}
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Description
              </label>
              <textarea
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                required
                rows={3}
                className="mt-1 block w-full px-4 py-2 border rounded-lg shadow-sm focus:ring-blue-300 focus:border-blue-300 resize-none"
              ></textarea>
            </div>

            {/* Submit Button */}
            <div>
              <button
                type="submit"
                className="w-full bg-blue-400 hover:bg-blue-500 text-white font-semibold py-3 rounded-lg transition-all shadow-sm focus:ring-4 focus:ring-blue-200"
              >
                Add Product
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
