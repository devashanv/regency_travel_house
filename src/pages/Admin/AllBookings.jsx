import React, { useEffect, useState } from "react";
import { FaPlus, FaEye, FaFilter } from "react-icons/fa";
import AdminSideNav from "../../components/AdminSideNav";
import AdminHeader from "../../components/AdminHeader";
import API from "../../api/axiosClient";
import BookingDetailModal from "./BookingDetailModal";
import AddBookingByStaffModal from "./AddBookingByStaffModal";
import "react-toastify/dist/ReactToastify.css";
import {ToastContainer } from "react-toastify";

const statusStyles = {
  confirmed: "bg-green-100 text-green-600",
  pending: "bg-yellow-100 text-yellow-600",
  cancelled: "bg-red-100 text-red-600",
  completed: "bg-blue-100 text-blue-600",
};

export default function ManageBookings() {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [selectedBooking, setSelectedBooking] = useState(null);
  const [showAddModal, setShowAddModal] = useState(false);
  const [statusFilter, setStatusFilter] = useState("all");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [packageFilter, setPackageFilter] = useState("all");
  const [packages, setPackages] = useState([]);

  const [filteredBookings, setFilteredBookings] = useState([]);
  const [isFilterActive, setIsFilterActive] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  useEffect(() => {
    fetchBookings();
  }, []);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  useEffect(() => {
    const fetchPackages = async () => {
      try {
        const res = await API.get("/packages");
        setPackages(res.data);
      } catch (error) {
        console.error("Failed to load packages", error);
      }
    };

    fetchPackages();
  }, []);

  const applyFilters = async () => {
    try {
      const token = localStorage.getItem("auth_token");
      if (!token) {
        setError("Authentication token not found.");
        return;
      }

      API.defaults.headers.common["Authorization"] = `Bearer ${token}`;
      const res = await API.get("/admin/bookings/filter", {
        params: {
          status: statusFilter,
          start_date: startDate,
          end_date: endDate,
          package_id: packageFilter,
        },
      });

      console.log("Filtered bookings:", res.data);
      setFilteredBookings(res.data);
      setIsFilterActive(true);
    } catch (err) {
      console.error("Failed to filter bookings", err);
    }
  };

  const resetFilters = () => {
    setStatusFilter("all");
    setStartDate("");
    setEndDate("");
    setPackageFilter("all");
    setFilteredBookings([]);
    setIsFilterActive(false);
  };

  const fetchBookings = async () => {
    try {
      setLoading(true);
      setError("");
      const token = localStorage.getItem("auth_token");
      if (!token) {
        setError("Authentication token not found.");
        return;
      }

      API.defaults.headers.common["Authorization"] = `Bearer ${token}`;
      const response = await API.get("/admin/bookings");
      setBookings(response.data);
    } catch (err) {
      console.error("Failed to fetch bookings:", err);
      if (err.response?.status === 403) {
        setError("You are not authorized to view this data.");
      } else {
        setError("Failed to load bookings.");
      }
    } finally {
      setLoading(false);
    }
  };

  const openBookingDetail = async (id) => {
    try {
      const response = await API.get(`/admin/bookings/${id}`);
      setSelectedBooking(response.data);
    } catch (err) {
      console.error("Error fetching booking detail:", err);
    }
  };
  const bookingsToShow = isFilterActive ? filteredBookings : bookings;

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentBookings = bookingsToShow.slice(
    indexOfFirstItem,
    indexOfLastItem
  );
  const totalPages = Math.ceil(bookingsToShow.length / itemsPerPage);

  return (
    <div className="min-h-screen bg-gray-50">
      <AdminHeader />
      <div className="flex">
        <div className="w-1/6 h-auto ">
          <AdminSideNav />
        </div>
        <div className="w-5/6 h-auto pt-10">
          {" "}
          <main className="flex-1 p-6">
            <div className="flex items-center justify-between mb-6">
              <h1 className="text-2xl font-semibold">
                Manage <span className="text-red-600">Bookings</span>
              </h1>

              <button
                onClick={() => setShowAddModal(true)}
                className="cursor-pointer bg-red-600 text-white px-4 py-2 rounded shadow flex items-center gap-2 hover:bg-red-700"
              >
                <FaPlus /> Add Booking
              </button>
            </div>

            {/* Filters */}
            <div className="flex flex-wrap gap-4 items-end mb-6">
              <div>
                <label className="block text-sm font-medium mb-1">Status</label>
                <select
                  value={statusFilter}
                  onChange={(e) => setStatusFilter(e.target.value)}
                  className="border-gray-300 border cursor-pointer rounded-md px-3 py-2 w-48"
                >
                  <option value="all">All Statuses</option>
                  <option value="confirmed">Confirmed</option>
                  <option value="pending">Pending</option>
                  <option value="cancelled">Cancelled</option>
                  <option value="completed">Completed</option>
                </select>
              </div>

              <div>
                <label className="block text-sm  font-medium mb-1">
                  Date Range
                </label>
                <div className="flex gap-2">
                  <input
                    type="date"
                    value={startDate}
                    onChange={(e) => setStartDate(e.target.value)}
                    className="border-gray-300 cursor-pointer border rounded-md px-3 py-2"
                  />
                  <span className="px-2 py-2">to</span>
                  <input
                    type="date"
                    value={endDate}
                    onChange={(e) => setEndDate(e.target.value)}
                    className="border-gray-300 cursor-pointer border rounded-md px-3 py-2"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium mb-1">
                  Package
                </label>
                <select
                  value={packageFilter}
                  onChange={(e) => setPackageFilter(e.target.value)}
                  className="border-gray-300 cursor-pointer border rounded-md px-3 py-2 w-48"
                >
                  <option value="all">All Packages</option>
                  {packages.map((pkg) => (
                    <option key={pkg.id} value={pkg.id}>
                      {pkg.title}
                    </option>
                  ))}
                </select>
              </div>

              <button
                onClick={applyFilters}
                className="flex items-center gap-2 border cursor-pointer border-gray-300 rounded-md px-4 py-2 hover:bg-gray-100"
              >
                <FaFilter /> Apply Filters
              </button>

              <button
                onClick={resetFilters}
                className="flex items-center gap-2 border cursor-pointer border-gray-300 text-gray-700 rounded-md px-4 py-2 hover:bg-gray-100"
              >
                Reset
              </button>
            </div>

            {/* Bookings Table */}
            {loading ? (
              <p>Loading bookings...</p>
            ) : error ? (
              <p className="text-red-600">{error}</p>
            ) : (
              <div className="overflow-x-auto bg-white shadow rounded">
                <table className="w-full text-left text-sm">
                  <thead className="bg-gray-100 text-gray-600 font-semibold">
                    <tr>
                      <th className="p-4">Booking ID</th>
                      <th className="p-4">Customer</th>
                      <th className="p-4">Package</th>
                      <th className="p-4">Travel Date</th>
                      <th className="p-4">Guests</th>
                      <th className="p-4">Status</th>
                      <th className="p-4">Actions</th>
                    </tr>
                  </thead>

                  <tbody>
                    {bookingsToShow.length === 0 ? (
                      <tr>
                        <td
                          colSpan="7"
                          className="text-center py-4 text-gray-500"
                        >
                          No bookings found for the selected filters.
                        </td>
                      </tr>
                    ) : (
                      currentBookings.map((b) => (
                        <tr
                          key={b.id}
                          className="border-b border-gray-200 hover:bg-gray-50"
                        >
                          <td className="p-4">#{b.id}</td>
                          <td className="p-4">
                            {b.customer?.full_name || "N/A"}
                          </td>
                          <td className="p-4">{b.package?.title || "N/A"}</td>
                          <td className="p-4">{b.travel_date}</td>
                          <td className="p-4">{b.number_of_travelers}</td>
                          <td className="p-4">
                            <span
                              className={`px-3 py-1 text-xs rounded-full font-medium ${
                                statusStyles[b.status?.toLowerCase()] || ""
                              }`}
                            >
                              {b.status}
                            </span>
                          </td>
                          <td className="p-4 flex gap-2">
                            {b.status?.toLowerCase() !== "cancelled" && (
                              <button
                                className="bg-blue-100 text-blue-600 px-3 cursor-pointer py-1 text-xs rounded flex items-center gap-1 hover:bg-blue-200"
                                onClick={() => openBookingDetail(b.id)}
                              >
                                <FaEye /> View
                              </button>
                            )}
                          </td>
                        </tr>
                      ))
                    )}
                  </tbody>
                </table>
                <div className="flex justify-between items-center p-4">
                  <button
                    className="px-3 py-1 bg-gray-200 cursor-pointer rounded disabled:opacity-50"
                    onClick={() =>
                      setCurrentPage((prev) => Math.max(prev - 1, 1))
                    }
                    disabled={currentPage === 1}
                  >
                    Previous
                  </button>
                  <span className="text-sm text-gray-700">
                    Page {currentPage} of {totalPages}
                  </span>
                  <button
                    className="px-3 py-1 bg-gray-200 cursor-pointer rounded disabled:opacity-50"
                    onClick={() =>
                      setCurrentPage((prev) => Math.min(prev + 1, totalPages))
                    }
                    disabled={currentPage === totalPages}
                  >
                    Next
                  </button>
                </div>
              </div>
            )}
          </main>
        </div>
      </div>

      {/* View/Edit Booking */}
      {selectedBooking && (
        <BookingDetailModal
          booking={selectedBooking}
          onClose={() => {
            setSelectedBooking(null);
            fetchBookings();
          }}
        />
      )}

      {showAddModal && (
        <AddBookingByStaffModal
          onClose={() => setShowAddModal(false)}
          onBookingAdded={(data) => {
            console.log("Booking added:", data);
          }}
        />
      )}

       <ToastContainer position="top-right" autoClose={3000} />
    </div>
  );
}
