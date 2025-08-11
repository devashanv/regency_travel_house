import React, { useState } from "react";
import { FaTimes } from "react-icons/fa";
import { toast } from "react-toastify";
import API from "../../api/axiosClient";

export default function DonatePointsModal({ loyalty, onClose }) {
  const [pointsToDonate, setPointsToDonate] = useState("");
  const [loading, setLoading] = useState(false);

  const availablePoints =
    (loyalty?.valid_earned ?? 0) -
    (loyalty?.total_redeemed ?? 0) -
    (loyalty?.donate ?? 0);

const handleDonate = async () => {
    if (!pointsToDonate || pointsToDonate <= 0) {
      toast.error("Please enter a valid number of points to donate.");
      return;
    }
  
    if (pointsToDonate > availablePoints) {
      toast.error("You cannot donate more points than you have available.");
      return;
    }
  
    setLoading(true);
    try {
      const token = localStorage.getItem("auth_token");
      API.defaults.headers.common["Authorization"] = `Bearer ${token}`;
  
      await API.post(`/loyalty/donate`, {
        donate: pointsToDonate, 
      });
  
      toast.success(`Donated ${pointsToDonate} points successfully! 🌟`);
      onClose();
    } catch (err) {
      console.error("Donation failed:", err);
      toast.error(
        err.response?.data?.message ||
        "Failed to donate points. Please try again."
      );
    } finally {
      setLoading(false);
    }
  };
  
  return (
    <div className="fixed inset-0 z-100 bg-black/70 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl shadow-lg max-w-md w-full relative p-8">
        {/* Close Button */}
        <button
          className="absolute cursor-pointer top-4 right-4 text-gray-500 hover:text-gray-700"
          onClick={onClose}
          disabled={loading}
        >
          <FaTimes size={20} />
        </button>

        {/* Modal Content */}
        <h2 className="text-2xl font-bold text-gray-800 mb-2 text-center">
          Donate Your Points
        </h2>
        <p className="text-sm text-gray-500 mb-6 text-center">
          Support our{" "}
          <span className="font-semibold text-secondary">
            "Rays of Hope & Sustainability"
          </span>{" "}
          initiative. Your loyalty points will help fund eco-projects,
          education, and community growth.
        </p>

        {/* Loyalty Info */}
        <div className="bg-gray-50 p-4 rounded-lg mb-6 shadow-sm">
          <div className="flex justify-between mb-2">
            <span className="text-gray-600 text-sm">Available Points:</span>
            <span className="font-semibold text-gray-800">
              {loyalty?.loyalty_points}
            </span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-600 text-sm">Membership Tier:</span>
            <span className="font-semibold text-gray-800">
              {loyalty?.membership_tier ?? "Bronze"}
            </span>
          </div>
        </div>

        {/* Input Points */}
        <div className="mb-6">
          <label className="block text-gray-700 font-semibold mb-2 text-sm">
            Enter Points to Donate
          </label>
          <input
            type="number"
            name="donate"
            value={pointsToDonate}
            onChange={(e) => setPointsToDonate(e.target.value)}
            className="w-full border border-gray-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-yellow-400"
            placeholder="e.g., 100"
            min="1"
            max={loyalty?.available_points}
            disabled={loading}
            required
          />
        </div>

        {/* Donate Button */}
        <button
          onClick={handleDonate}
          className="w-full bg-secondary hover:bg-yellow-500 text-white font-bold py-3 rounded-full transition shadow-lg"
          disabled={loading}
        >
          {loading ? "Donating..." : "Donate Now"}
        </button>
      </div>
    </div>
  );
}
