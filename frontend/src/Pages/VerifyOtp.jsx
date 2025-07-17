import { useState } from "react";
import { useNavigate, useLocation, Link } from "react-router-dom";

export default function VerifyOtp() {
  const [otp, setOtp] = useState("");
  const [msg, setMsg] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  // Get token from location.state (passed from ForgotPassword)
  const token = location.state?.token;

  const handleVerify = async (e) => {
    e.preventDefault();
    setMsg("");
    setLoading(true);
    try {
      const res = await fetch("/api/user/verify-otp", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ otp, token }),
      });
      const data = await res.json();
      if (data.refresh_token) {
        setMsg("OTP verified! Redirecting to set new password...");
        setTimeout(() => {
          navigate("/new-password", {
            state: { refresh_token: data.refresh_token },
          });
        }, 1500);
      } else {
        setMsg(data.message || "Invalid OTP.");
      }
    } catch {
      setMsg("An error occurred. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  if (!token) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-white">
        <div className="bg-black p-8 rounded-3xl shadow-2xl flex flex-col items-center">
          <p className="text-red-600 font-semibold mb-2">
            No token found. Please start the forgot password process again.
          </p>
          <Link
            to="/forgot-password"
            className="text-red-400 hover:underline text-sm"
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
          Verify OTP
        </h2>
        <p className="text-red-200 mb-6 text-center">
          Enter the OTP sent to your email.
        </p>
        <form className="w-full flex flex-col gap-5" onSubmit={handleVerify}>
          <div>
            <label
              htmlFor="otp"
              className="block text-sm font-medium text-red-200 mb-1"
            >
              OTP
            </label>
            <input
              id="otp"
              name="otp"
              type="text"
              required
              value={otp}
              onChange={(e) => setOtp(e.target.value)}
              className="block w-full px-4 py-3 rounded-lg border border-red-700 bg-black text-white placeholder-red-400 focus:ring-2 focus:ring-red-500 focus:border-transparent transition-colors"
              placeholder="Enter OTP"
            />
          </div>
          <button
            type="submit"
            disabled={loading}
            className={`w-full py-3 rounded-lg font-semibold text-white bg-red-700 hover:bg-red-800 transition-colors shadow-md ${
              loading ? "opacity-50 cursor-not-allowed" : ""
            }`}
          >
            {loading ? "Verifying..." : "Verify OTP"}
          </button>
          {msg && <div className="text-center text-sm text-red-300">{msg}</div>}
          <div className="text-center mt-2">
            <Link
              to="/forgot-password"
              className="text-red-400 hover:underline text-sm"
            >
              Back to Forgot Password
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
}
