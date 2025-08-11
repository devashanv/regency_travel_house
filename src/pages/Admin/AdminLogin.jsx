import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../../api/axiosClient";
import AdForgotPasswordModal from "./AdForgotPassword";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const AdminLogin = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [showForgotModal, setShowForgotModal] = useState(false);
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");

    if (!email || !password) {
      setError("Please enter both email and password.");
      return;
    }

    setLoading(true);
    try {
      const response = await API.post("/staff/login", { email, password });
      const { token, user } = response.data;

      if (token) {
        localStorage.setItem("auth_token", token);
        localStorage.setItem("staff_id", user.id);
        API.defaults.headers.common["Authorization"] = `Bearer ${token}`;
        navigate("/addash");
      } else {
        setError("Login failed: Token not received.");
      }
    } catch (err) {
      const message = err.response?.data?.message || "Invalid credentials.";
      setError(message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="mx-auto my-30 flex h-[70vh] w-3/4 shadow-xl">
      <div className="w-full lg:w-1/2 flex flex-col items-center justify-center p-10 bg-white">
        <img
          src="RTH-logo.png"
          alt="Logo"
          className="w-48 h-16 object-cover mb-6"
        />{" "}
        <p className="mb-6 text-gray-600">Please login to your account</p>
        {error && <p className="text-red-500 mb-3">{error}</p>}
        <form
          onSubmit={handleLogin}
          className="w-full flex flex-col items-center"
        >
          <input
            type="email"
            placeholder="Email"
            className="mb-3 w-80 p-3 border rounded-full focus:ring-2 focus:ring-orange-500"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            disabled={loading}
          />
          <input
            type="password"
            placeholder="Password"
            className="mb-4 w-80 p-3 border rounded-full focus:ring-2 focus:ring-orange-500"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            disabled={loading}
          />
          <button
            type="submit"
            disabled={loading}
            className={`cursor-pointer w-80 py-3 rounded-full font-semibold transition-all ${
              loading
                ? "bg-gray-400 cursor-not-allowed"
                : "bg-[#0D1537] text-white hover:bg-[#ec2326]"
            }`}
          >
            {loading ? "Logging in..." : "LOG IN"}
          </button>
        </form>
        <button
          onClick={() => setShowForgotModal(true)}
          className="mt-3 text-sm text-gray-500 cursor-pointer hover:text-gray-700"
        >
          Forgot password?
        </button>
      </div>

      <div className="hidden lg:flex w-1/2 bg-cover bg-[url('../src/assets/footer-background.png')] items-center justify-center text-white px-20">
        <div>
          <h2 className="text-2xl font-bold mb-4">
            We are more than just a company
          </h2>
          <p className="text-sm leading-relaxed">
            Lorem ipsum dolor sit amet, consectetur adipisicing elit...
          </p>
        </div>
      </div>

      {showForgotModal && (
        <AdForgotPasswordModal
          isOpen
          onClose={() => setShowForgotModal(false)}
        />
      )}
      <ToastContainer position="top-right" autoClose={3000} />
    </div>
  );
};

export default AdminLogin;
