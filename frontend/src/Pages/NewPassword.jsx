import React, { useState } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";

export default function ForgotPassword() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [msg, setMsg] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  const refresh_token = location.state?.refresh_token;

  const handleReset = async (e) => {
    e.preventDefault();
    setMsg("");
    if (password !== confirmPassword) {
      setMsg("Passwords do not match.");
      return;
    }
    setLoading(true);
    try {
      const res = await fetch("/api/user/new-password", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ refresh_token, password }),
      });
      const data = await res.json();
      if (data.success) {
        setMsg("Password reset successful! Redirecting to login...");
        setTimeout(() => {
          navigate("/login", {
            state: { message: "Password reset successful. Please login." },
          });
        }, 1500);
      } else {
        setMsg(data.message || "Failed to reset password.");
      }
    } catch {
      setMsg("An error occurred. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleForgot = async (e) => {
    e.preventDefault();
    setMsg("");
    setLoading(true);
    try {
      const res = await fetch("/api/user/forget-password", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });
      const data = await res.json();
      if (data.success) {
        setMsg("OTP sent to your email. Please check your inbox.");
        setTimeout(() => {
          navigate("/verify-otp", { state: { token: data.token } });
        }, 1500);
      } else {
        setMsg(data.message || "Failed to send OTP.");
      }
    } catch {
      setMsg("An error occurred. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  if (!refresh_token) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="bg-white p-6 rounded shadow">
          <p className="text-red-600">
            No token found. Please verify OTP again.
          </p>
          <Link
            to="/forgot-password"
            className="text-purple-600 hover:underline block mt-2"
          >
            Back
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white flex flex-col justify-center items-center py-12 px-4">
      <div className="w-full max-w-md bg-black rounded-3xl shadow-2xl p-8 flex flex-col items-center">
        <h2 className="text-3xl font-extrabold text-white mb-2 text-center">
          Set New Password
        </h2>
        <p className="text-red-200 mb-6 text-center">
          Enter your new password below.
        </p>
        <form className="w-full flex flex-col gap-5" onSubmit={handleReset}>
          <div>
            <label
              htmlFor="password"
              className="block text-sm font-medium text-red-200 mb-1"
            >
              New Password
            </label>
            <input
              id="password"
              name="password"
              type="password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="block w-full px-4 py-3 rounded-lg border border-red-700 bg-black text-white placeholder-red-400 focus:ring-2 focus:ring-red-500 focus:border-transparent transition-colors"
            />
          </div>
          <div>
            <label
              htmlFor="confirmPassword"
              className="block text-sm font-medium text-red-200 mb-1"
            >
              Confirm Password
            </label>
            <input
              id="confirmPassword"
              name="confirmPassword"
              type="password"
              required
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              className="block w-full px-4 py-3 rounded-lg border border-red-700 bg-black text-white placeholder-red-400 focus:ring-2 focus:ring-red-500 focus:border-transparent transition-colors"
            />
          </div>
          <button
            type="submit"
            disabled={loading}
            className={`w-full py-3 rounded-lg font-semibold text-white bg-red-700 hover:bg-red-800 transition-colors shadow-md ${
              loading ? "opacity-50 cursor-not-allowed" : ""
            }`}
          >
            {loading ? "Resetting..." : "Reset Password"}
          </button>
          {msg && <div className="text-center text-sm text-red-300">{msg}</div>}
          <div className="text-center mt-2">
            <Link to="/login" className="text-red-400 hover:underline text-sm">
              Back to Login
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
}
