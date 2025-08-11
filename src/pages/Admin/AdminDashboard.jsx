import React, { useEffect, useState } from "react";
import AdminSideNav from "../../components/AdminSideNav";
import AdminHeader from "../../components/AdminHeader";
import API from "../../api/axiosClient";
import { FaSuitcase, FaCalendarCheck, FaUsers,FaPlus } from "react-icons/fa";
import { FaFileInvoiceDollar } from "react-icons/fa";
import { PiMedalFill } from "react-icons/pi";
import AddBookingByStaffModal from "./AddBookingByStaffModal";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer } from "react-toastify";

const AdminDashboard = () => {
  const [summary, setSummary] = useState(null);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchSummary = async () => {
      try {
        const token = localStorage.getItem("auth_token");
        API.defaults.headers.common["Authorization"] = `Bearer ${token}`;
        const response = await API.get("/admin/summary");
        setSummary(response.data);
      } catch (err) {
        console.error("Failed to load dashboard stats", err);
        setError("Failed to load summary.");
      }
    };

    fetchSummary();
  }, []);

  const [showAddModal, setShowAddModal] = useState(false);


  const stats = summary
    ? [
        {
          icon: <FaSuitcase className="text-red-500 text-2xl" />,
          title: "Total Packages",
          value: summary.total_packages,
          link: "/allPackages",
        },
        {
          icon: <FaCalendarCheck className="text-blue-500 text-2xl" />,
          title: "Upcoming Bookings",
          value: summary.upcoming_bookings,
          link: "/cheeckbookings",
        },
        {
          icon: <FaFileInvoiceDollar className="text-orange-400 text-2xl" />,
          title: "Pending Quotes",
          value: summary.pending_quotes,
          link: "/checkQuotes",
        },
        {
          icon: <PiMedalFill className="text-purple-500 text-2xl" />,
          title: "Loyalty Customers",
          value: summary.loyalty_customers,
          link: "/checkPoints",
        },
        {
          icon: <FaUsers className="text-green-500 text-2xl" />,
          title: "Registered Customers",
          value: summary.registered_customers,
          link: "/checkCustomers",
        },
      ]
    : [];

  return (
    <div className="min-h-screen bg-gray-50">
      <AdminHeader/>
      <div className="flex ">
        <div className="w-1/6 h-auto ">
        <AdminSideNav />
        </div>
        <div className="w-5/6  h-auto pt-10">
        <main className="flex-1 p-6">
          <div className="flex items-center justify-between mb-6">
            <h1 className="text-2xl font-semibold">
              Dashboard <span className="text-red-600">Overview</span>
            </h1>
            <div className="flex gap-2">
              
              <button
                onClick={() => setShowAddModal(true)}
                className="cursor-pointer bg-red-600 text-white px-4 py-2 rounded shadow flex items-center gap-2 hover:bg-red-700"
              >
                <FaPlus /> Add Booking
              </button>
            </div>
          </div>

          {error ? (
            <p className="text-red-600">{error}</p>
          ) : !summary ? (
            <p>Loading dashboard status...</p>
          ) : (
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
              {stats.map((stat, index) => (
                <div
                  key={index}
                  className="bg-white rounded-lg shadow p-6 flex flex-col justify-between min-h-[150px]"
                >
                  <div className="flex items-center gap-4 mb-4">
                    <div className="bg-gray-100 rounded-full p-3">
                      {stat.icon}
                    </div>
                    <h3 className="text-gray-600 font-medium">{stat.title}</h3>
                  </div>
                  <div className="text-2xl font-bold">{stat.value}</div>
                  <a
                    href={stat.link}
                    className="mt-2 text-red-600 text-sm font-medium flex items-center gap-1 hover:underline"
                  >
                    View all
                  </a>
                </div>
              ))}
            </div>
          )}
        </main>
        </div>
      </div>
      {showAddModal && (
        <AddBookingByStaffModal
          onClose={() => setShowAddModal(false)}
          // onBookingAdded={(data) => {
          //   console.log("Booking added:", data);
          // }}
        />
      )}
        <ToastContainer position="top-right" autoClose={3000} />
    </div>
  );
};

export default AdminDashboard;
