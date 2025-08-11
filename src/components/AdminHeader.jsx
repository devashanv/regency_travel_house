import React from "react";
import { FaBars } from "react-icons/fa";
import { IoChevronDown } from "react-icons/io5";

const AdminHeader = () => {
  return (
    <div className="flex fixed items-center justify-between px-6 py-3 bg-white w-full z-100 shadow-sm">
      {/* Left - Logo and Menu */}
      <div className="flex items-center gap-4">

        <div className="flex items-center gap-2">
          <div className="bg-red-600 w-8 h-8 flex items-center justify-center text-white font-bold rounded-md">
            R
          </div>
          <span className="text-lg font-semibold text-gray-900">
            Regency Travels
          </span>
        </div>
      </div>

      {/* Right - Profile */}
      <div className="flex items-center gap-2">
        <img
          src="https://randomuser.me/api/portraits/men/32.jpg" 
          alt="Admin"
          className="w-8 h-8 rounded-full border-2 border-red-500 object-cover"
        />
        <span className="font-medium text-gray-800">Admin User</span>
      </div>
    </div>
  );
};

export default AdminHeader;
