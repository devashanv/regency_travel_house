import React from "react";
import { FaLock, FaMobileAlt, FaShieldAlt, FaLink, FaSave } from "react-icons/fa";

const settingsData = [
  {
    icon: <FaLock className="text-indigo-600 text-xl" />,
    title: "Password",
    subtitle: "Last changed 3 months ago",
    button: "Change Password",
  },
  {
    icon: <FaMobileAlt className="text-indigo-600 text-xl" />,
    title: "Two-Factor Authentication",
    subtitle: "Not enabled",
    button: "Enable 2FA",
  },
  {
    icon: <FaShieldAlt className="text-indigo-600 text-xl" />,
    title: "Login Alerts",
    subtitle: <span className="text-green-600 font-medium">Active</span>,
    button: "Manage",
  },
  {
    icon: <FaLink className="text-indigo-600 text-xl" />,
    title: "Connected Devices",
    subtitle: "3 devices active",
    button: "View All",
  },
];

const SecuritySettings = () => {
  return (
    <div>
      <div className="bg-white rounded-xl shadow p-6 mx-auto">
        <h2 className="text-xl font-semibold text-gray-800 mb-6">
          Security Settings
        </h2>

        {settingsData.map((item, index) => (
          <div
            key={index}
            className="flex items-center justify-between py-4 border-b last:border-b-0"
          >
            <div className="flex items-center gap-4">
              <div className="bg-red-100 p-3 rounded-full">
                {item.icon}
              </div>
              <div>
                <p className="font-medium text-gray-800">{item.title}</p>
                <p className="text-sm text-gray-500">{item.subtitle}</p>
              </div>
            </div>
            <button className="bg-indigo-600 text-white text-sm px-4 py-2 rounded hover:bg-[#0070C4]">
              {item.button}
            </button>
          </div>
        ))}
      </div>

      <div className="flex justify-start mt-6 mx-auto">
        <button className="flex items-center gap-2 bg-indigo-600 text-white px-5 py-2 rounded-md text-sm cursor-pointer hover:bg-[#0070C4]">
          <FaSave /> Save Changes
        </button>
      </div>
    </div>
  );
};

export default SecuritySettings;
