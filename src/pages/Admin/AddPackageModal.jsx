import React, { useState, useEffect } from "react";
import API from "../../api/axiosClient";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function AddPackageModal({ onClose, onPackageAdded }) {
  const [form, setForm] = useState({
    destination_id: "",
    title: "",
    description: "",
    price_per_person: "",
    duration_days: "",
    start_date: "",
    end_date: "",
    available_slots: "",
    is_featured: "false",
    category: "",
    activities: "",
    include: "",
    exclude: "",
    footprint: "",
    special_package: false,
  });

  const placeholders = {
    title: "Enter package title",
    category: "E.g., Adventure, Honeymoon",
    activities: "E.g., Hiking, Snorkeling",
    price_per_person: "E.g., 250",
    duration_days: "E.g., 7",
    available_slots: "E.g., 20",
    start_date: "Select a start date",
    end_date: "Select an end date",
    include: "Items included in the package",
    exclude: "Items excluded from the package",
    footprint: "E.g. 1000",
  };

  const [destinations, setDestinations] = useState([]);
  const [selectedFiles, setSelectedFiles] = useState([]);
  const [galleryPreviews, setGalleryPreviews] = useState([]);
  const [imageFile, setImageFile] = useState(null);
  const [bannerPreview, setBannerPreview] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchDestinations = async () => {
      try {
        const token = localStorage.getItem("auth_token");
        API.defaults.headers.common["Authorization"] = `Bearer ${token}`;
        const res = await API.get("/destinations");
        setDestinations(res.data);
      } catch (err) {
        console.error("Failed to fetch destinations", err);
        toast.error("Failed to fetch destinations");
      }
    };
    fetchDestinations();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImageFile(file);
      const reader = new FileReader();
      reader.onloadend = () => setBannerPreview(reader.result);
      reader.readAsDataURL(file);
    }
  };

  const handleFileChange = (e) => {
    const files = Array.from(e.target.files);
    const total = selectedFiles.length + files.length;

    if (total > 6) {
      toast.warning("You can upload up to 6 images only.");
      return;
    }

    files.forEach((file) => {
      const reader = new FileReader();
      reader.onloadend = () => {
        setGalleryPreviews((prev) => [...prev, reader.result]);
        setSelectedFiles((prev) => [...prev, file]);
      };
      reader.readAsDataURL(file);
    });
  };

  const removeGalleryImage = (index) => {
    const updatedFiles = [...selectedFiles];
    const updatedPreviews = [...galleryPreviews];
    updatedFiles.splice(index, 1);
    updatedPreviews.splice(index, 1);
    setSelectedFiles(updatedFiles);
    setGalleryPreviews(updatedPreviews);
  };

  const handleReplaceImage = (e, index) => {
    const file = e.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onloadend = () => {
      const updatedPreviews = [...galleryPreviews];
      const updatedFiles = [...selectedFiles];

      updatedPreviews[index] = reader.result;
      updatedFiles[index] = file;

      setGalleryPreviews(updatedPreviews);
      setSelectedFiles(updatedFiles);
    };
    reader.readAsDataURL(file);
  };

  const handleSubmit = async () => {
    setLoading(true);
    setError("");

    try {
      const token = localStorage.getItem("auth_token");
      API.defaults.headers.common["Authorization"] = `Bearer ${token}`;

      const packageRes = await API.post("/packages", {
        ...form,
        is_featured: form.is_featured === "true",
      });

      const createdPackage = packageRes.data;

      if (imageFile) {
        const bannerData = new FormData();
        bannerData.append("image", imageFile);
        bannerData.append("package_id", createdPackage.id);
        bannerData.append("section", "hero");

        await API.post("/images", bannerData, {
          headers: { "Content-Type": "multipart/form-data" },
        });
      }

      if (selectedFiles.length) {
        const formData = new FormData();
        selectedFiles.forEach((file) => {
          formData.append("images[]", file);
        });
        formData.append("package_id", createdPackage.id);
        formData.append("section", "gallery");

        await API.post("/images/multiple", formData, {
          headers: { "Content-Type": "multipart/form-data" },
        });
      }

      toast.success("Package created successfully!");
      onPackageAdded(createdPackage);
      onClose();
    } catch (err) {
      console.error("Error saving package", err);
      setError(
        err.response?.data?.message ||
          "Failed to save package. Please check your inputs."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-100 flex items-center justify-center bg-black/30">
      <div className="bg-white p-6 rounded-xl w-full max-w-2xl max-h-[90vh] overflow-y-auto shadow-lg">
        <h2 className="text-xl font-semibold mb-4 text-red-600">
          Add New Package
        </h2>

        <div className="space-y-4">
          {/* Destination */}
          <div>
            <label className="block font-medium">Destination</label>
            <select
              name="destination_id"
              value={form.destination_id}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded px-4 py-2"
            >
              <option value="">-- Select Destination --</option>
              {destinations.map((dest) => (
                <option key={dest.id} value={dest.id}>
                  {dest.name}
                </option>
              ))}
            </select>
          </div>

          {[
            "title",
            "category",
            "activities",
            "price_per_person",
            "duration_days",
            "available_slots",
            "start_date",
            "end_date",
            "include",
            "exclude",
            "footprint",
          ].map((field) => (
            <div key={field}>
              <label className="block font-medium capitalize">
                {field.replace("_", " ")}
              </label>
              <input
                type={field.includes("date") ? "date" : "text"}
                name={field}
                value={form[field]}
                onChange={handleChange}
                placeholder={placeholders[field]}
                className="w-full border border-gray-300 rounded px-4 py-2"
              />
            </div>
          ))}

          {/* Special Package */}
          <div>
            <label className="block font-medium mb-1">Special Package</label>
            <div className="flex gap-4 items-center">
              <label className="flex items-center gap-1">
                <input
                  type="radio"
                  name="special_package"
                  value={true}
                  checked={form.special_package === true}
                  onChange={() =>
                    setForm((prev) => ({ ...prev, special_package: true }))
                  }
                />
                Yes
              </label>
              <label className="flex items-center gap-1">
                <input
                  type="radio"
                  name="special_package"
                  value={false}
                  checked={form.special_package === false}
                  onChange={() =>
                    setForm((prev) => ({ ...prev, special_package: false }))
                  }
                />
                No
              </label>
            </div>
          </div>

          {/* Description */}
          <div>
            <label className="block font-medium">Description</label>
            <textarea
              name="description"
              value={form.description}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded px-4 py-2"
              rows={3}
            />
          </div>

          {/* Featured */}
          <div>
            <label className="block font-medium">Featured</label>
            <select
              name="is_featured"
              value={form.is_featured}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded px-4 py-2"
            >
              <option value="false">No</option>
              <option value="true">Yes</option>
            </select>
          </div>

          {/* Banner Upload */}
          <div>
            <label className="block font-medium">Upload Banner Image</label>
            <input
              type="file"
              accept="image/*"
              onChange={handleImageChange}
              className="block w-full text-sm cursor-pointer text-gray-500
                file:mr-4 file:py-2 file:px-4
                file:rounded-full file:border-0
                file:text-sm file:font-semibold
                file:bg-red-50 file:text-red-700
                hover:file:bg-red-100"
            />
            {bannerPreview && (
              <img
                src={bannerPreview}
                alt="Banner Preview"
                className="mt-2 h-40 object-cover rounded border"
              />
            )}
          </div>

          {/* Gallery Upload with Preview, Remove, Replace */}
          <div>
            <label className="block font-medium">Upload Gallery Images</label>
            <input
              type="file"
              multiple
              disabled={selectedFiles.length >= 6}
              onChange={handleFileChange}
              className="block w-full text-sm cursor-pointer text-gray-500
                file:mr-4 file:py-2 file:px-4
                file:rounded-full file:border-0
                file:text-sm file:font-semibold
                file:bg-red-50 file:text-red-700
                hover:file:bg-red-100
                disabled:opacity-50"
            />
            {galleryPreviews.length > 0 && (
              <div className="mt-2 grid grid-cols-3 gap-2">
                {galleryPreviews.map((src, index) => (
                  <div key={index} className="relative group">
                    <img
                      src={src}
                      alt={`Gallery ${index + 1}`}
                      className="h-24 w-full object-cover rounded border"
                    />
                    <button
                      type="button"
                      onClick={() => removeGalleryImage(index)}
                      className="absolute top-1 right-1 bg-white text-red-600 cursor-pointer  rounded-full w-6 h-6 text-xs flex items-center justify-center opacity-0 group-hover:opacity-100 transition"
                      title="Remove"
                    >
                      ✕
                    </button>
                    <button
                      type="button"
                      onClick={() =>
                        document
                          .getElementById(`replace-input-${index}`)
                          .click()
                      }
                      className="absolute bottom-1 right-1 cursor-pointer p-2 bg-yellow-500 text-white rounded px-1 text-xs opacity-0 group-hover:opacity-100 transition"
                      title="Replace"
                    >
                      Replace
                    </button>
                    <input
                      type="file"
                      id={`replace-input-${index}`}
                      accept="image/*"
                      className="hidden"
                      onChange={(e) => handleReplaceImage(e, index)}
                    />
                  </div>
                ))}
              </div>
            )}
            {selectedFiles.length > 0 && (
              <p className="text-xs mt-1 text-gray-600">
                {selectedFiles.length} file(s) selected
              </p>
            )}
          </div>

          {error && <p className="text-red-600">{error}</p>}
        </div>

        <div className="flex justify-end gap-4 mt-6">
          <button
            onClick={onClose}
            className="px-4 py-2 rounded border hover:bg-gray-100 cursor-pointer"
            disabled={loading}
          >
            Cancel
          </button>
          <button
            onClick={handleSubmit}
            className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700 cursor-pointer"
            disabled={loading}
          >
            {loading
              ? selectedFiles.length
                ? "Uploading & Saving..."
                : "Saving..."
              : "Save Package"}
          </button>
        </div>
      </div>
      <ToastContainer position="top-right" autoClose={3000} />
    </div>
  );
}
