import React from "react";
import { Navigate } from "react-router-dom";

const ProtectedAdmin = ({ children }) => {
  const token = localStorage.getItem("adminToken"); // or from context
  if (!token) {
    return <Navigate to="/loginadmin" replace />;
  }
  return children;
};

export default ProtectedAdmin;
