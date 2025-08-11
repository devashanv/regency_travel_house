import React, { useState } from "react";
import API from "../../api/axiosClient";
import { toast } from "react-toastify";

export default function DestinationFormModal({ mode, destination, onClose }) {
  const isEdit = mode === "edit";

  const [form, setForm] = useState(
    destination || {
      name: "",
      country: "",
      region: "",
      description: "",
      thumbnail_string: "",
      best_time_to_visit: "",
    }
  );

  const [imageFile, setImageFile] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleImageChange = (e) => {
    setImageFile(e.target.files[0]);
  };

  const uploadImage = async () => {
    if (!imageFile) return null;

    const token = localStorage.getItem("auth_token");
    if (!token) {
      setError("Authentication token not found.");
      return null;
    }

    const formData = new FormData();
    formData.append("image", imageFile);

    try {
      const res = await API.post("/images", formData, {
        headers: {
          "Authorization": `Bearer ${token}`,
          "Content-Type": "multipart/form-data",
        },
      });
      return res.data.image.filename;
    } catch (err) {
      console.error("Image upload error:", err);
      toast.error("Image upload failed");
      return null;
    }
  };

  const handleSubmit = async () => {
    setLoading(true);
    setError("");
  
    if (!form.name || !form.country) {
      setError("Name and Country are required.");
      setLoading(false);
      return;
    }
  
    try {
      const token = localStorage.getItem("auth_token");
      if (!token) {
        setError("Authentication token not found.");
        return;
      }
  
      API.defaults.headers.common["Authorization"] = `Bearer ${token}`;
  
      const destinationResponse = isEdit
        ? await API.put(`/destinations/${destination.id}`, form)
        : await API.post("/destinations", form);
  
      const savedDestination = destinationResponse.data;
  
      if (imageFile) {
        const formData = new FormData();
        formData.append("image", imageFile);
        formData.append("destination_id", savedDestination.id); // pass correct ID
  
        const imageRes = await API.post("/images", formData, {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "multipart/form-data",
          },
        });
  

        const imagePath = `storage/images/${imageRes.data.image.filename}`;
        await API.put(`/destinations/${savedDestination.id}`, {
          thumbnail_string: imagePath,
        });
        savedDestination.thumbnail_string = imagePath;
      }
  
      toast.success(`Destination ${isEdit ? "updated" : "added"} successfully`);
      onClose(savedDestination);
    } catch (err) {
      console.error("Submit error:", err);
      if (err.response?.status === 403) {
        setError("You are not authorized to perform this action.");
      } else if (err.response?.status === 422) {
        const errors = err.response.data.errors;
        const firstError = Object.values(errors)[0][0];
        setError(firstError || "Validation error.");
      } else {
        setError("Something went wrong. Please try again.");
      }
    } finally {
      setLoading(false);
    }
  };
  
  return (
    <div className="fixed inset-0 z-100 flex items-center justify-center bg-black/30">
      <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-2xl">
        <h2 className="text-xl font-semibold mb-4">
          {isEdit ? "View/Edit Destination" : "Add Destination"}
        </h2>

        <div className="space-y-3">
          {[
            ["name", "Name"],
            ["country", "Country"],
            ["region", "Region"],
            ["description", "Description"],
            ["best_time_to_visit", "Best Time to Visit"],
          ].map(([field, label]) => (
            <div key={field}>
              <label className="block text-sm font-medium mb-1">{label}</label>
              <input
                type="text"
                name={field}
                value={form[field] || ""}
                onChange={handleChange}
                placeholder={label}
                className="w-full border border-gray-300 rounded px-4 py-2"
              />
            </div>
          ))}



          {error && <p className="text-red-600 text-sm">{error}</p>}
        </div>

        <div className="flex justify-end gap-4 mt-6">
          <button
            className="px-4 py-2 cursor-pointer border rounded hover:bg-gray-100"
            onClick={() => onClose(null)}
            disabled={loading}
          >
            Cancel
          </button>
          <button
            className="px-4 py-2 bg-red-600 cursor-pointer text-white rounded hover:bg-red-700"
            onClick={handleSubmit}
            disabled={loading}
          >
            {loading ? "Saving..." : isEdit ? "Update" : "Save"}
          </button>
        </div>
      </div>
    </div>
  );
}
