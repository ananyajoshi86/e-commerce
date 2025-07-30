// AddProduct.jsx - Axios Based Product Form
import React, { useState } from "react";
import axios from "axios";

export default function AddProduct() {
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("");
  const [rating, setRating] = useState("");
  const [img, setImg] = useState(null);
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
      const response = await axios.post("/api/product/create", form, {
        withCredentials: true,
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      if (response.status === 201) {
        setName("");
        setPrice("");
        setDescription("");
        setImg(null);
        setCategory("");
        setRating("");
        setSuccess("✅ Product added successfully!");
        setError("");
      } else {
        setError(response.data.message || "❌ Failed to add product");
        setSuccess("");
      }
    } catch (err) {
      setSuccess("");
      setError("❌ Error: " + err.message);
    }
  };

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <div className="max-w-2xl mx-auto bg-white rounded-lg shadow-lg p-8">
        <h2 className="text-2xl font-bold text-blue-500 mb-4">
          Add New Product
        </h2>

        {success && (
          <div className="text-green-600 font-medium mb-4">{success}</div>
        )}
        {error && <div className="text-red-500 font-medium mb-4">{error}</div>}

        <form onSubmit={handleSubmit} className="grid gap-4">
          <input
            type="text"
            placeholder="Product Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
            className="border p-2 rounded"
          />

          <input
            type="file"
            onChange={(e) => setImg(e.target.files[0])}
            required
            className="border p-2 rounded"
          />

          <select
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            required
            className="border p-2 rounded"
          >
            <option value="">Select Category</option>
            <option value="Sweet">Sweet</option>
            <option value="Snacks">Snacks</option>
            <option value="Pulses">Pulses</option>
            <option value="Food-item">Food-item</option>
            <option value="Fresh-veggies">Fresh-veggies</option>
            <option value="Fruits">Fruits</option>
          </select>

          <input
            type="number"
            placeholder="Price (₹)"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            required
            className="border p-2 rounded"
          />

          <input
            type="number"
            placeholder="Rating (1-5)"
            value={rating}
            onChange={(e) => setRating(e.target.value)}
            min="1"
            max="5"
            step="0.1"
            required
            className="border p-2 rounded"
          />

          <textarea
            placeholder="Description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            required
            rows={3}
            className="border p-2 rounded resize-none"
          ></textarea>

          <button
            type="submit"
            className="bg-blue-500 text-white font-semibold py-2 rounded hover:bg-blue-600"
          >
            Add Product
          </button>
        </form>
      </div>
    </div>
  );
}
