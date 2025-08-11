import React, { useState, useEffect } from "react";
import API from "../../api/axiosClient";
import { toast } from "react-toastify";

export default function LoyaltyPointsEditModal({
  customerId,
  onClose,
  onUpdated,
}) {
  const [customer, setCustomer] = useState(null);
  const [form, setForm] = useState({
    points_earned: 0,
    points_redeemed: 0,
  });
  const [loading, setLoading] = useState(false);

  // Fetch current customer data
  useEffect(() => {
    const fetchCustomer = async () => {
      try {
        const token = localStorage.getItem("auth_token");
        API.defaults.headers.common["Authorization"] = `Bearer ${token}`;

        const res = await API.get(`/customer/${customerId}`);
        setCustomer(res.data);
      } catch (err) {
        console.error("Failed to load customer", err);
        toast.error("Failed to load customer details");
        onClose();
      }
    };
    fetchCustomer();
  }, [customerId, onClose]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async () => {
    setLoading(true);
    try {
      const token = localStorage.getItem("auth_token");
      API.defaults.headers.common["Authorization"] = `Bearer ${token}`;

      await API.put(`/loyalty/customers/${customerId}/update`, {
        points_earned: Number(form.points_earned),
        points_redeemed: Number(form.points_redeemed),
      });

      toast.success("Loyalty points updated!");
      onUpdated();
      onClose();
    } catch (err) {
      console.error("Failed to update loyalty", err);
      toast.error(err.response?.data?.message || "Update failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-100 flex items-center justify-center bg-black/40 backdrop-blur-sm">
      <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md">
        <h2 className="text-xl font-semibold mb-4 text-red-600">
          Edit Loyalty Points
        </h2>

        {customer ? (
          <div className="space-y-4">
            <p>
              <strong>Customer:</strong> {customer.full_name}
            </p>
            <p>
              <strong>Email:</strong> {customer.email}
            </p>
            <p>
              <strong>Phone:</strong> {customer.phone || "—"}
            </p>
            <p>
              <strong>Bookings:</strong> {customer.bookings_count}
            </p>
            <p>
              <strong>Tier:</strong> {customer.tier}
            </p>

            <p>
              <strong>Current Points:</strong> {customer.loyalty_points || 0}
            </p>

            <div>
              <label className="block text-sm font-medium">
                Add Bonus Points 
              </label>
              <input
                type="number"
                name="points_earned"
                value={form.points_earned}
                onChange={handleChange}
                min={0}
                className="w-full border px-3 py-2 rounded mt-1"
              />
            </div>

            <div>
              <label className="block text-sm font-medium">
                Reduce Points
              </label>
              <input
                type="number"
                name="points_redeemed"
                value={form.points_redeemed}
                onChange={handleChange}
                min={0}
                className="w-full border px-3 py-2 rounded mt-1"
              />
            </div>

            <div className="flex justify-end gap-4 mt-6">
              <button
                onClick={onClose}
                className="px-4 py-2 border rounded cursor-pointer hover:bg-gray-100"
                disabled={loading}
              >
                Cancel
              </button>
              <button
                onClick={handleSubmit}
                className="px-4 py-2 bg-red-600 cursor-pointer text-white rounded hover:bg-red-700"
                disabled={loading}
              >
                {loading ? "Updating..." : "Save Changes"}
              </button>
            </div>
          </div>
        ) : (
          <p>Loading customer data...</p>
        )}
      </div>
    </div>
  );
}
