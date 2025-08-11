import React, { useState } from "react";
import API from "../../api/axiosClient";

export default function BookingDetailModal({ booking, onClose }) {
  const [status, setStatus] = useState(booking.status || "pending");
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState("");
  const [error, setError] = useState("");
  const [travelDate, setTravelDate] = useState(booking.travel_date || "");

  // const handleSave = async () => {
  //   setLoading(true);
  //   setError("");
  //   try {
  //     const token = localStorage.getItem("auth_token");
  //     API.defaults.headers.common["Authorization"] = `Bearer ${token}`;

  //     const response = await API.put(`/admin/bookings/${booking.id}`, {
  //       status: status.toLowerCase(),
  //       travel_date: travelDate,
  //     });

  //     setSuccess("Booking updated successfully.");
  //     console.log("Updated Booking:", response.data);
  //     onClose(); // close modal after update
  //   } catch (err) {
  //     console.error("Update failed:", err);
  //     setError("Failed to update booking status.");
  //   } finally {
  //     setLoading(false);
  //   }
  // };
  
  const handleSave = async () => {
    setLoading(true);
    setError("");
    setSuccess("");

    if (status === booking.status && travelDate === booking.travel_date) {
      setError("No changes to save.");
      setLoading(false);
      return;
    }

    try {
      const token = localStorage.getItem("auth_token");
      API.defaults.headers.common["Authorization"] = `Bearer ${token}`;

      const response = await API.put(`/admin/bookings/${booking.id}`, {
        status: status.toLowerCase(),
        travel_date: travelDate,
      });

      setSuccess("Booking updated successfully.");
      setTimeout(() => {
        onClose(); // close after a short delay
      }, 1500);
    } catch (err) {
      console.error("Update failed:", err);
      setError(err.response?.data?.message || "Failed to update booking.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-100 flex items-center justify-center bg-black/30">
      <div className="bg-white rounded-xl p-6 w-full max-w-2xl overflow-y-auto max-h-[90vh] shadow-lg">
        <h2 className="text-xl font-semibold mb-4">
          View/Edit Booking Details
        </h2>

        <div>
          <label className="block font-medium">Booking ID</label>
          <input
            value={`#${booking.id}`}
            disabled
            className="w-full border border-gray-300 rounded-md px-4 py-2"
          />
        </div>

        <div>
          <label className="block font-medium">Customer</label>
          <input
            value={booking.customer?.full_name}
            disabled
            className="w-full border border-gray-300 rounded-md px-4 py-2"
          />
        </div>

        <div className="space-y-4">
          <div>
            <label className="block font-medium">Package</label>
            <input
              value={booking.package?.title}
              disabled
              className="w-full border border-gray-300 rounded-md px-4 py-2"
            />
          </div>

          <div>
            <label className="block font-medium">Travel Date ⚠️</label>
            <input
              type="date"
              value={travelDate}
              onChange={(e) => setTravelDate(e.target.value)}
              className="w-full border border-gray-300 rounded-md px-4 py-2"
            />
          </div>

          <div>
            <label className="block font-medium">Number of Guests</label>
            <input
              value={booking.number_of_travelers}
              disabled
              className="w-full border border-gray-300 rounded-md px-4 py-2"
            />
          </div>

          <div>
            <label className="block font-medium">Total Price</label>
            <input
              value={`$${booking.total_price.toLocaleString()}`}
              disabled
              className="w-full border border-gray-300 rounded-md px-4 py-2"
            />
          </div>

          <div>
            <label className="block font-medium">Status ⚠️</label>
            <select
              value={status}
              onChange={(e) => setStatus(e.target.value)}
              className="w-full border border-gray-300 rounded-md px-4 py-2"
            >
              <option value="pending">Pending</option>
              <option value="confirmed">Confirmed</option>
              <option value="completed">Completed</option>
              <option value="cancelled">Cancelled</option>
            </select>
          </div>

          <div>
            <label className="block font-medium">Special Requests</label>
            <textarea
              value={booking.special_requests || "None"}
              disabled
              className="w-full border border-gray-300 rounded-md px-4 py-2"
              rows={3}
            />
          </div>

          {error && <p className="text-red-600">{error}</p>}
          {success && <p className="text-green-600">{success}</p>}
        </div>

        <div className="flex justify-end gap-4 mt-6">
          <button
            onClick={onClose}
            className="px-4 py-2 cursor-pointer border rounded-md hover:bg-gray-100"
            disabled={loading}
          >
            Cancel
          </button>
          <button
            onClick={handleSave}
            className="px-4 py-2 cursor-pointer bg-red-600 text-white rounded-md shadow hover:bg-red-700"
            disabled={loading}
          >
            {loading ? "Saving..." : "Save Changes"}
          </button>
        </div>
      </div>
    </div>
  );
}
