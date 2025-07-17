import React, { useEffect, useState } from "react";

export default function Stats() {
  const [stats, setStats] = useState({
    users: 0,
    products: 0,
  });

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const res = await fetch("/api/user/stats");
        const data = await res.json();
        setStats({
          users: data.totalUsers || 0,
          products: data.totalProducts || 0,
        });
      } catch (error) {
        console.error("Error fetching stats:", error);
      }
    };

    fetchStats();
  }, []);

  return (
    <div>
      <div className="flex-1 flex justify-center items-center">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:py-24 lg:px-8 w-full">
          <h2 className="text-3xl font-extrabold tracking-tight text-gray-900 sm:text-4xl">
            Our service statistics
          </h2>
          <div className="grid grid-cols-1 gap-5 sm:grid-cols-3 mt-4">
            <div className="bg-white overflow-hidden shadow sm:rounded-lg">
              <div className="px-4 py-5 sm:p-6">
                <dl>
                  <dt className="text-sm leading-5 font-medium text-gray-500 truncate">
                    Total Users
                  </dt>
                  <dd className="mt-1 text-3xl leading-9 font-semibold text-blue-600">
                    {stats.users.toLocaleString()}
                  </dd>
                </dl>
              </div>
            </div>
            <div className="bg-white overflow-hidden shadow sm:rounded-lg">
              <div className="px-4 py-5 sm:p-6">
                <dl>
                  <dt className="text-sm leading-5 font-medium text-gray-500 truncate">
                    Total Products
                  </dt>
                  <dd className="mt-1 text-3xl leading-9 font-semibold text-blue-600">
                    {stats.products.toLocaleString()}
                  </dd>
                </dl>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
