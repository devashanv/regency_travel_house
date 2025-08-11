import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import API from "../api/axiosClient";

function SideNav() {
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const isActive = (path) => location.pathname === path;

  const handleLogout = async (e) => {
    e.preventDefault();

    try {
      const response = await API.post("/staff/logout");
      console.log("Logout success:", response.data); 
      navigate("/adlogin"); 
    } catch (error) {
      console.error("Logout failed:", error);
      setError("Logout failed. Please try again.");
    } finally {
      localStorage.removeItem("auth_token");
      localStorage.removeItem("staff_id");
      delete API.defaults.headers.common["Authorization"];
    }
  };

  if (error) {
    return (
      <div className="h-screen flex items-center justify-center flex-col text-center px-4">
        <p className="text-red-600 font-semibold mb-4">{error}</p>
        <button
          onClick={handleLogout}
          className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded"
        >
          Logout & Retry
        </button>
      </div>
    );
  }

  return (
    <div className="flex pt-10 h-screen fixed">
      <div className="h-screen  bg-white shadow-lg flex flex-col justify-between px-6 py-4">
        <div>
          
          <div className="space-y-4 mt-4">
            <Link
              to="/addash"
              className={`flex items-center  gap-3 px-3 py-2 rounded-md ${
                isActive("/addash")
                  ? "bg-red-50 text-red-700 font-semibold"
                  : "text-gray-700 hover:bg-gray-100"
              }`}
            >
              <i className="fas  min-w-[20px] fa-tachometer-alt"></i>
              <span>Dashboard Overview</span>
            </Link>

            <Link
              to="/checkQuotes"
              className={`flex items-center gap-3 px-3 py-2 rounded-md ${
                isActive("/checkQuotes")
                  ? "bg-red-50 text-red-700 font-semibold"
                  : "text-gray-700 hover:bg-gray-100"
              }`}
            >
              <i className="fas  min-w-[20px] fa-file-invoice-dollar"></i>
              <span>Quotes</span>
            </Link>

            <Link
              to="/cheeckbookings"
              className={`flex items-center gap-3 px-3 py-2 rounded-md ${
                isActive("/cheeckbookings")
                  ? "bg-red-50 text-red-700 font-semibold"
                  : "text-gray-700 hover:bg-gray-100"
              }`}
            >
              <i className="fas  min-w-[20px] fa-calendar-check"></i>
              <span>Bookings</span>
            </Link>


            <Link
              to="/checkDestinations"
              className={`flex items-center gap-3 px-3 py-2 rounded-md ${
                isActive("/checkDestinations")
                  ? "bg-red-50 text-red-700 font-semibold"
                  : "text-gray-700 hover:bg-gray-100"
              }`}
            >
              <i className="fas  min-w-[20px] fa-map-marked-alt"></i>
              <span>Destinations</span>
            </Link>

            <Link
              to="/allPackages"
              className={`flex items-center gap-3 px-3 py-2 rounded-md ${
                isActive("/allPackages")
                  ? "bg-red-50 text-red-700 font-semibold"
                  : "text-gray-700 hover:bg-gray-100"
              }`}
            >
              <i className="fas  min-w-[20px] fa-suitcase"></i>
              <span>Packages</span>
            </Link>

            <Link
              to="/checkItineraries"
              className={`flex items-center gap-3 px-3 py-2 rounded-md ${
                isActive("/checkItineraries")
                  ? "bg-red-50 text-red-700 font-semibold"
                  : "text-gray-700 hover:bg-gray-100"
              }`}
            >
              <i className="fas  min-w-[20px] fa-route"></i>
              <span>Itineraries</span>
            </Link>

            <Link
              to="/checkCustomers"
              className={`flex items-center gap-3 px-3 py-2 rounded-md ${
                isActive("/checkCustomers")
                  ? "bg-red-50 text-red-700 font-semibold"
                  : "text-gray-700 hover:bg-gray-100"
              }`}
            >
              <i className="fas  min-w-[20px] fa-users"></i>
              <span>Customers</span>
            </Link>

            <Link
              to="/checkPoints"
              className={`flex items-center gap-3 px-3 py-2 rounded-md ${
                isActive("/checkPoints")
                  ? "bg-red-50 text-red-700 font-semibold"
                  : "text-gray-700 hover:bg-gray-100"
              }`}
            >
              <i className="fas  min-w-[20px] fa-award"></i>
              <span>Loyalty Points</span>
            </Link>

            <Link
              to="/regstaff"
              className={`flex items-center gap-3 px-3 py-2 rounded-md ${
                isActive("/regstaff")
                  ? "bg-red-50 text-red-700 font-semibold"
                  : "text-gray-700 hover:bg-gray-100"
              }`}
            >
              <i className="fas  min-w-[20px] fa-user-plus"></i>
              <span>Register Staff</span>
            </Link>

            <a
              href="#"
              onClick={handleLogout}
              className="hover:font-bold hover:bg-gray-100 px-3 py-2 rounded-md flex items-center gap-3 text-red-600 hover:text-red-800 text-md mt-6"
            >
              <i className="fas  min-w-[20px] fa-sign-out-alt"></i>
              <span>Logout</span>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}

export default SideNav;
