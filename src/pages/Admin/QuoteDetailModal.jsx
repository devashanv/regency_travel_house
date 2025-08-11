import React, { useState } from "react";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import API from "../../api/axiosClient";

export default function QuoteDetailModal({ quote, onClose }) {
  const [price, setPrice] = useState(quote.estimated_price || "");
  const [status, setStatus] = useState(
    ["responded", "expired"].includes(quote.status?.toLowerCase()) ? quote.status.toLowerCase() : ""
  );
  const [loading, setLoading] = useState(false);

  const handleRespond = async () => {
    if (!price || isNaN(price) || parseFloat(price) < 0 || !status) {
      toast.error("Please provide a valid estimated price and status.");
      return;
    }

    try {
      setLoading(true);
      const token = localStorage.getItem("auth_token");
      API.defaults.headers.common["Authorization"] = `Bearer ${token}`;

      await API.put(`/admin/quotes/${quote.id}/respond`, {
        estimated_price: parseFloat(price),
        status: status.toLowerCase(),
      });

      toast.success("Quote responded successfully.");
      onClose(); // close and refresh
    } catch (err) {
      console.error("Error responding to quote:", err);
      if (err.response?.data?.errors) {
        const firstError = Object.values(err.response.data.errors)[0][0];
        toast.error(firstError);
      } else {
        toast.error(err.response?.data?.message || "Failed to respond.");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-100 bg-black/40 flex items-center justify-center">
      <div className="bg-white rounded shadow-lg p-6 w-full max-w-xl relative">
        <h2 className="text-xl font-semibold mb-4">Quote Details</h2>

        <div className="space-y-2">
          <p><strong>Customer:</strong> {quote.customer?.full_name || "—"}</p>
          <p><strong>Package:</strong> {quote.package?.title || "—"}</p>
          <p><strong>No of People:</strong> {quote.number_of_people || "—"}</p>
          <p><strong>Status:</strong> {quote.status || "—"}</p>
        </div>

        {quote.status === "pending" && (
          <div className="mt-4 space-y-4">
            <div>
              <label className="block text-sm font-medium mb-1">Estimated Price</label>
              <input
                type="number"
                min="0"
                value={price}
                onChange={(e) => setPrice(e.target.value)}
                className="w-full border px-4 py-2 rounded"
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-1">Status</label>
              <select
                value={status}
                onChange={(e) => setStatus(e.target.value)}
                className="w-full border px-4 py-2 rounded"
              >
                <option value="">-- Select Status --</option>
                <option value="responded">Responded</option>
                <option value="expired">Expired</option>
              </select>
            </div>
          </div>
        )}

        <div className="flex justify-end gap-3 mt-6">
          <button
            className="px-4 py-2 border rounded hover:bg-gray-100"
            onClick={onClose}
            disabled={loading}
          >
            Close
          </button>
          {quote.status === "pending" && (
            <button
              className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700"
              onClick={handleRespond}
              disabled={loading}
            >
              {loading ? "Saving..." : "Respond"}
            </button>
          )}
        </div>

        <ToastContainer position="top-right" autoClose={3000} />
      </div>
    </div>
  );
}
