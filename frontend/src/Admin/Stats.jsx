// Stats.jsx - Axios Based Stats Dashboard
import React, { useEffect, useState } from "react";
import axios from "axios";

export default function Stats() {
  const [stats, setStats] = useState({ users: 0, products: 0 });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const res = await axios.get("/api/product/stats", {
          withCredentials: true,
        });
        setStats({
          users: res.data.totalUsers || 0,
          products: res.data.totalProducts || 0,
        });
      } catch (error) {
        console.error("Error fetching stats:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchStats();
  }, []);

  return (
    <div className="p-6">
      <h2 className="text-3xl font-extrabold text-gray-900 mb-6">
        Admin Stats Overview
      </h2>

      {loading ? (
        <div className="text-center text-gray-600">Loading stats...</div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          <div className="bg-white rounded-lg shadow p-6">
            <h3 className="text-sm font-medium text-gray-500">Total Users</h3>
            <p className="text-3xl font-bold text-blue-600 mt-1">
              {stats.users.toLocaleString()}
            </p>
          </div>

          <div className="bg-white rounded-lg shadow p-6">
            <h3 className="text-sm font-medium text-gray-500">
              Total Products
            </h3>
            <p className="text-3xl font-bold text-blue-600 mt-1">
              {stats.products.toLocaleString()}
            </p>
          </div>
        </div>
      )}
    </div>
  );
}
