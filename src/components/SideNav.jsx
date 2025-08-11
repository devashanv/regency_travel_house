import React, { useEffect, useState } from "react";
import API from "../api/axiosClient";
import { useNavigate, Link, useLocation } from "react-router-dom";
import { motion } from "framer-motion";
import { FaUserCircle } from "react-icons/fa";

function SideNav() {
  const [customer, setCustomer] = useState(null);
  const [error, setError] = useState("");
  const [setLoading] = useState(true);
  const navigate = useNavigate();
  const location = useLocation();

  const isActive = (path) => location.pathname === path;

  useEffect(() => {
    const token = localStorage.getItem("auth_token");
    const customerId = localStorage.getItem("customer_id");

    if (token && customerId) {
      API.defaults.headers.common["Authorization"] = `Bearer ${token}`;
      API.get(`/customers/${customerId}`)
        .then((response) => {
          setCustomer(response.data);
          setError("");
        })
        .catch((error) => {
          console.error("Failed to fetch customer:", error);
          setError("Unable to load customer data. Please try again later.");
        })
        .finally(() => {
          setLoading(false);
        });
    } else {
      setError("Missing authentication. Please log in again.");
      setLoading(false);
    }
  }, []);

  // const handleLogout = async (e) => {
  //   e.preventDefault();
  //   try {
  //     await API.post("/customers/logout");
  //   } catch (error) {
  //     console.error("Logout failed:", error);
  //   } finally {
  //     localStorage.removeItem("auth_token");
  //     localStorage.removeItem("customer_id");
  //     delete API.defaults.headers.common["Authorization"];
  //     navigate("/login");
  //   }
  // };

  const handleLogout = async (e) => {
    e.preventDefault();
    try {
      await API.post("/customers/logout");
    } catch (error) {
      console.error("Logout failed:", error);
    } finally {
      localStorage.removeItem("auth_token");
      localStorage.removeItem("auth_user"); // <-- Add this
      localStorage.removeItem("customer_id");
      delete API.defaults.headers.common["Authorization"];
      navigate("/login");
    }
  };

  const navLinks = (
    <div className="space-y-4 mt-4">
      {[
        { to: "/mydashboard", icon: "fa-home", label: "Dashboard" },
        { to: "/mytours", icon: "fa-map-marked-alt", label: "My Tours" },
        { to: "/myfavourite", icon: "fa-heart", label: "Favorites" },
        // { to: "/notifications", icon: "fa-bell", label: "Notifications" },
        { to: "/transactions", icon: "fa-receipt", label: "Transactions" },
        { to: "/settings", icon: "fa-cog", label: "Settings" },
      ].map(({ to, icon, label }) => (
        <Link
          key={to}
          to={to}
          className={`flex items-center gap-3 px-3 py-2 rounded-md ${
            isActive(to)
              ? "bg-blue-50 text-[#0070C4] font-semibold"
              : "text-gray-700 hover:bg-gray-100"
          }`}
        >
          <i className={`fas ${icon}`}></i>
          <span>{label}</span>
        </Link>
      ))}
    </div>
  );

  const promoSection = (
    <div className="p-4 h-[200px] mt-10 bg-blue-50  rounded-xl text-center shadow-sm flex items-center justify-between">
      <div className="flex flex-col justify-center items-start text-left">
        <h4 className="text-lg font-bold text-blue-700 mb-2">50% Discount!</h4>
        <p className="text-md text-gray-600 mb-3 max-w-[200px]">
          Join our loyalty program and get exclusive benefits
        </p>
        <button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-full">
          Join Now
        </button>
      </div>

      <motion.svg
        viewBox="0 0 200 200"
        xmlns="http://www.w3.org/2000/svg"
        className="w-[100px] h-[160px]"
        animate={{ y: [0, -10, 0, 10, 0] }}
        transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
      >
        <circle cx="100" cy="70" r="40" fill="#FFD166" />
        <circle cx="85" cy="60" r="5" fill="#333" />
        <circle cx="115" cy="60" r="5" fill="#333" />
        <path
          d="M90 80 Q100 90 110 80"
          stroke="#333"
          strokeWidth="2"
          fill="none"
        />
        <ellipse cx="100" cy="140" rx="40" ry="50" fill="#FFD166" />
        <path
          d="M80 120 Q100 130 120 120"
          stroke="#333"
          strokeWidth="2"
          fill="none"
        />
        <rect x="60" y="140" width="80" height="40" fill="#06D6A0" />
        <path d="M60 140 L40 180 L60 180 Z" fill="#06D6A0" />
        <path d="M140 140 L160 180 L140 180 Z" fill="#06D6A0" />
        <circle cx="70" cy="50" r="5" fill="#FFD166" />
        <circle cx="130" cy="50" r="5" fill="#FFD166" />
      </motion.svg>
    </div>
  );

  if (error) {
    return (
      <div className="h-screen flex items-center justify-center flex-col text-center px-4">
        <p className="text-red-600 font-semibold mb-4">{error}</p>
        <button
          onClick={handleLogout}
          className="bg-red-600 cursor-pointer hover:bg-red-700 text-white px-4 py-2 rounded"
        >
          Logout & Retry
        </button>
      </div>
    );
  }

  return (
    <>
      {/* Desktop SideNav */}
      <div className=" hidden lg:flex ">
        <div className="h-screen  bg-white shadow-lg flex flex-col justify-between px-4  py-4">
          <div className=" ">
            <div className=" flex justify-start items-center px-6 py-4 bg-white shadow-sm">
              <div className="flex items-center justify-start gap-2">
                <FaUserCircle className="text-2xl text-gray-600" />
                <div className="text-right">
                  <span className="block font-semibold text-gray-800 text-sm">
                    {customer?.full_name}
                  </span>
                </div>
              </div>
            </div>
            {navLinks}
            {promoSection}
            <a
              href="#"
              onClick={handleLogout}
              className="hover:font-bold hover:bg-gray-100 px-3 py-2 rounded-md flex items-center  gap-3 text-red-600 hover:text-red-800 text-md mt-3"
            >
              <i className="fas fa-sign-out-alt"></i>
              <span>Logout</span>
            </a>
          </div>
        </div>
      </div>

      {/* Bottom Mobile Navigation */}
      <div className="fixed bottom-0 left-0 right-0 z-50 bg-white border-t border-gray-200 shadow-lg lg:hidden">
        <div className="flex justify-around items-center py-2">
          {[
            { to: "/mydashboard", icon: "fa-home", label: "Home" },
            { to: "/mytours", icon: "fa-map", label: "Tours" },
            { to: "/myfavourite", icon: "fa-heart", label: "Favorites" },
            { to: "/transactions", icon: "fa-receipt", label: "Bills" },
            { to: "/settings", icon: "fa-cog", label: "Settings" },
          ].map(({ to, icon, label }) => (
            <Link
              key={to}
              to={to}
              className={`flex flex-col items-center text-xs ${
                isActive(to) ? "text-blue-600" : "text-gray-500"
              }`}
            >
              <i className={`fas ${icon} text-lg mb-1`}></i>
              {label}
            </Link>
          ))}
        </div>
      </div>
    </>
  );
}

export default SideNav;
