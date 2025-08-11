import React from "react";

export default function LoyaltyDetailModal({ customer, onClose }) {
  return (
    <div className="fixed inset-0 bg-black/40 z-50 flex justify-center items-center">
      <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-lg">
        <h2 className="text-xl font-semibold text-red-600 mb-4">
          Customer Details
        </h2>

        <div className="space-y-2">
          <p><strong>Full Name:</strong> {customer.full_name}</p>
          <p><strong>Email:</strong> {customer.email}</p>
          <p><strong>Phone:</strong> {customer.phone || "—"}</p>
          <p><strong>Bookings:</strong> {customer.bookings_count}</p>
          <p><strong>Loyalty Points:</strong> {(customer.loyalty_points ?? 0)}</p>
          <p><strong>Tier:</strong> {(customer.loyalty?.tier?? 0)}</p>


        </div>

        <div className="mt-6 flex justify-end">
          <button
            onClick={onClose}
            className="px-4 py-2 border rounded hover:bg-gray-100"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
}
