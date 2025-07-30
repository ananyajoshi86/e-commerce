// ProtectedAdmin.jsx - Axios-Based Version
import React, { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import axios from "axios";

const ProtectedAdmin = ({ children }) => {
  const [auth, setAuth] = useState(null);

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const res = await axios.get("/api/admin/profile", {
          withCredentials: true,
        });
        if (res.status === 200) {
          setAuth(true);
        } else {
          setAuth(false);
        }
      } catch (error) {
        setAuth(false);
      }
    };

    checkAuth();
  }, []);

  if (auth === null) return null;
  if (!auth) return <Navigate to="/loginadmin" replace />;
  return children;
};

export default ProtectedAdmin;
