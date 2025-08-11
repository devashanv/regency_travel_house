import React, { useState } from "react";
import API from "../../api/axiosClient";
import { toast } from "react-toastify";

export default function ItineraryFormModal({
  packageId,
  initialData,
  editMode,
  onClose,
  onSubmit,
}) {
  const [form, setForm] = useState({
    package_id: packageId,
    day_number: initialData?.day_number || "",
    title: initialData?.title || "",
    description: initialData?.description || "",
    location: initialData?.location || "",
    latitude: initialData?.latitude || "",
    longitude: initialData?.longitude || "",
  });

  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async () => {
    if (!form.location || form.latitude === "" || form.longitude === "") {
      toast.error("Please fill in all required fields.");
      return;
    }

    const lat = parseFloat(form.latitude);
    const lng = parseFloat(form.longitude);

    if (lat < -90 || lat > 90 || lng < -180 || lng > 180) {
      toast.error("Latitude or Longitude is out of valid range.");
      return;
    }

    setLoading(true);
    try {
      const token = localStorage.getItem("auth_token");
      API.defaults.headers.common["Authorization"] = `Bearer ${token}`;

      let res;
      if (editMode) {
        res = await API.put(`/itineraries/${initialData.id}`, form);
        toast.success("Itinerary updated!");
      } else {
        res = await API.post(`/itineraries`, form);
        toast.success("Itinerary added!");
      }

      onSubmit(res.data.data);
    } catch (err) {
      toast.error("Failed to save itinerary");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-100 bg-black/30 flex justify-center items-center">
      <div className="bg-white rounded-lg p-6 w-full max-w-lg shadow">
        <h2 className="text-lg font-semibold mb-4">
          {editMode ? "View/Edit Itinerary" : "Add New Itinerary"}
        </h2>

        <div className="space-y-3">
          {/* <label className="block font-medium">Day Number</label>
          <input
            name="day_number"
            value={form.day_number}
            onChange={handleChange}
            type="number"
            placeholder="Ex: 1"
            className="w-full border-gray-300 border rounded px-4 py-2"
          /> */}
          {!editMode && (
            <>
              <label className="block font-medium">Day Number</label>
              <input
                name="day_number"
                value={form.day_number}
                onChange={handleChange}
                type="number"
                placeholder="Ex: 1"
                className="w-full border-gray-300 border rounded px-4 py-2"
              />
            </>
          )}

          <label className="block font-medium">Title</label>
          <input
            name="title"
            value={form.title}
            onChange={handleChange}
            placeholder="Ex: Arrival and Check-in"
            className="w-full border border-gray-300 rounded px-4 py-2"
          />

          <label className="block font-medium">Description</label>
          <textarea
            name="description"
            value={form.description}
            onChange={handleChange}
            placeholder="Describe the day's activities..."
            className="w-full border border-gray-300 rounded px-4 py-2"
          />

          <label className="block font-medium">Location *</label>
          <input
            name="location"
            value={form.location}
            onChange={handleChange}
            placeholder="Ex: Sigiriya Rock Fortress"
            className="w-full border border-gray-300 rounded px-4 py-2"
          />

          <label className="block font-medium">Latitude *</label>
          <input
            name="latitude"
            type="number"
            value={form.latitude}
            onChange={handleChange}
            step="0.000001"
            placeholder="Between -90 and 90"
            className="w-full border border-gray-300 rounded px-4 py-2"
          />

          <label className="block font-medium">Longitude *</label>
          <input
            name="longitude"
            type="number"
            value={form.longitude}
            onChange={handleChange}
            step="0.000001"
            placeholder="Between -180 and 180"
            className="w-full border border-gray-300 rounded px-4 py-2"
          />
        </div>

        <div className="flex justify-end mt-6 gap-4">
          <button
            onClick={onClose}
            className="px-4 py-2 border cursor-pointer border-gray-300 rounded hover:bg-gray-100"
          >
            Cancel
          </button>
          <button
            onClick={handleSubmit}
            disabled={loading}
            className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700"
          >
            {loading ? "Saving..." : "Save"}
          </button>
        </div>
      </div>
    </div>
  );
}
