import React, { useEffect, useState, useRef } from "react";

const API_URL = "/api/product";
const UPLOAD_URL = "/api/upload/image";

const AdminProducts = () => {
  const [products, setProducts] = useState([]);
  const [form, setForm] = useState({
    name: "",
    description: "",
    price: "",
    category: "",
    brand: "",
    image: "",
  });
  const [editingId, setEditingId] = useState(null);
  const [loading, setLoading] = useState(false);
  const [imgPreview, setImgPreview] = useState("");
  const fileInputRef = useRef();

  // Fetch products
  const fetchProducts = async () => {
    setLoading(true);
    try {
      const res = await fetch(`${API_URL}/all`);
      const data = await res.json();
      setProducts(data.products || []);
    } catch (err) {
      alert("Failed to fetch products");
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  // Handle form input
  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  // Handle image upload
  const handleImageChange = async (e) => {
    const file = e.target.files[0];
    if (!file) return;
    setImgPreview(URL.createObjectURL(file));
    const formData = new FormData();
    formData.append("img", file);

    try {
      const res = await fetch(UPLOAD_URL, {
        method: "POST",
        body: formData,
      });
      const data = await res.json();
      if (data.success) {
        setForm((prev) => ({ ...prev, image: data.filename || data.path }));
      } else {
        alert("Image upload failed");
      }
    } catch {
      alert("Image upload error");
    }
  };

  // Add or update product
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      let res;
      if (editingId) {
        res = await fetch(`${API_URL}/update/${editingId}`, {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(form),
        });
      } else {
        res = await fetch(`${API_URL}/create`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(form),
        });
      }
      const data = await res.json();
      if (!data.success) {
        alert(data.message || "Failed to save product");
        return;
      }
      setForm({
        name: "",
        description: "",
        price: "",
        category: "",
        brand: "",
        image: "",
      });
      setImgPreview("");
      if (fileInputRef.current) fileInputRef.current.value = "";
      fetchProducts();
      setEditingId(null);
    } catch (err) {
      alert("Failed to save product");
    }
  };

  // Edit product
  const handleEdit = (product) => {
    setForm({
      name: product.name,
      description: product.description,
      price: product.price,
      category: product.category,
      brand: product.brand,
      image: product.image || "",
    });
    setImgPreview(product.image ? `/uploads/${product.image}` : "");
    setEditingId(product._id);
  };

  // Delete product
  const handleDelete = async (id) => {
    if (!window.confirm("Delete this product?")) return;
    try {
      await fetch(`${API_URL}/delete/${id}`, { method: "DELETE" });
      fetchProducts();
    } catch (err) {
      alert("Failed to delete product");
    }
  };

  return (
    <div className="p-8">
      <h2 className="text-2xl font-bold mb-4">Manage Products</h2>
      <form
        onSubmit={handleSubmit}
        className="mb-6 flex flex-wrap gap-2 items-center"
      >
        <input
          name="name"
          value={form.name}
          onChange={handleChange}
          placeholder="Name"
          className="border px-2 py-1 rounded"
          required
        />
        <input
          name="description"
          value={form.description}
          onChange={handleChange}
          placeholder="Description"
          className="border px-2 py-1 rounded"
        />
        <input
          name="price"
          value={form.price}
          onChange={handleChange}
          placeholder="Price"
          type="number"
          className="border px-2 py-1 rounded"
          required
        />
        <input
          name="category"
          value={form.category}
          onChange={handleChange}
          placeholder="Category"
          className="border px-2 py-1 rounded"
        />
        <input
          name="brand"
          value={form.brand}
          onChange={handleChange}
          placeholder="Brand"
          className="border px-2 py-1 rounded"
        />
        <input
          type="file"
          accept="image/*"
          onChange={handleImageChange}
          ref={fileInputRef}
          className="border px-2 py-1 rounded"
        />
        {imgPreview && (
          <img
            src={imgPreview}
            alt="Preview"
            className="w-16 h-16 object-cover rounded"
          />
        )}
        <button
          type="submit"
          className="bg-blue-600 text-white px-4 py-1 rounded"
        >
          {editingId ? "Update" : "Add"}
        </button>
        {editingId && (
          <button
            type="button"
            className="bg-gray-400 text-white px-4 py-1 rounded"
            onClick={() => {
              setEditingId(null);
              setForm({
                name: "",
                description: "",
                price: "",
                category: "",
                brand: "",
                image: "",
              });
              setImgPreview("");
              if (fileInputRef.current) fileInputRef.current.value = "";
            }}
          >
            Cancel
          </button>
        )}
      </form>
      {loading ? (
        <p>Loading...</p>
      ) : (
        <table className="w-full border">
          <thead>
            <tr className="bg-gray-100">
              <th className="border px-2 py-1">Image</th>
              <th className="border px-2 py-1">Name</th>
              <th className="border px-2 py-1">Description</th>
              <th className="border px-2 py-1">Price</th>
              <th className="border px-2 py-1">Category</th>
              <th className="border px-2 py-1">Brand</th>
              <th className="border px-2 py-1">Actions</th>
            </tr>
          </thead>
          <tbody>
            {products.map((p) => (
              <tr key={p._id}>
                <td className="border px-2 py-1">
                  {p.image ? (
                    <img
                      src={`/uploads/${p.image}`}
                      alt={p.name}
                      className="w-16 h-16 object-cover rounded"
                    />
                  ) : (
                    <span>No image</span>
                  )}
                </td>
                <td className="border px-2 py-1">{p.name}</td>
                <td className="border px-2 py-1">{p.description}</td>
                <td className="border px-2 py-1">{p.price}</td>
                <td className="border px-2 py-1">{p.category}</td>
                <td className="border px-2 py-1">{p.brand}</td>
                <td className="border px-2 py-1">
                  <button
                    className="bg-yellow-400 text-white px-2 py-1 rounded mr-2"
                    onClick={() => handleEdit(p)}
                  >
                    Edit
                  </button>
                  <button
                    className="bg-red-500 text-white px-2 py-1 rounded"
                    onClick={() => handleDelete(p._id)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
            {products.length === 0 && (
              <tr>
                <td colSpan={7} className="text-center py-4">
                  No products found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default AdminProducts;
