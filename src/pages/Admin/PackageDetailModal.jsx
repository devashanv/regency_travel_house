import React, { useState, useEffect } from "react";
import API from "../../api/axiosClient";
import { toast } from "react-toastify";

export default function PackageDetailModal({ pkg, onClose }) {
  const [form, setForm] = useState({
    title: pkg.title,
    description: pkg.description || "",
    price_per_person: pkg.price_per_person,
    duration_days: pkg.duration_days,
    start_date: pkg.start_date || "",
    end_date: pkg.end_date || "",
    available_slots: pkg.available_slots,
    is_featured: pkg.is_featured ? "true" : "false",
    category: pkg.category || "",
    activities: pkg.activities || "",
    include: pkg.include || "",
    exclude: pkg.exclude || "",
    footprint: pkg.footprint || "",
    special_package: pkg.special_package || false,
  });

  const [images, setImages] = useState([]);
  const [selectedFiles, setSelectedFiles] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [heroImage, setHeroImage] = useState(null); // for hero image
  const [imageFile, setImageFile] = useState(null);
  const [bannerPreview, setBannerPreview] = useState(null);

  const fetchImages = async () => {
    try {
      const res = await API.get(`/packages/${pkg.id}/images`);
      setImages(res.data);
    } catch (err) {
      console.error("Failed to load gallery images", err);
    }
  };

  const fetchHeroImage = async () => {
    try {
      const res = await API.get(`/packages/${pkg.id}/images/hero`);
      setHeroImage(res.data); // set only hero image here
    } catch (err) {
      console.error("Failed to load hero image", err);
    }
  };

  useEffect(() => {
    fetchImages();
    fetchHeroImage();
  }, [pkg.id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (e) => {
    setSelectedFiles([...e.target.files]);
  };

  const handleBannerImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImageFile(file);
      const reader = new FileReader();
      reader.onloadend = () => setBannerPreview(reader.result);
      reader.readAsDataURL(file);
    }
  };

  const handleReplaceImage = async (imageId, event) => {
    const file = event.target.files[0];
    if (!file) return;

    const formData = new FormData();
    formData.append("image", file);

    try {
      const token = localStorage.getItem("auth_token");
      API.defaults.headers.common["Authorization"] = `Bearer ${token}`;

      await API.post(`/images/${imageId}/replace`, formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      toast.success("Image replaced successfully");
      fetchImages();
    } catch (err) {
      console.error("Replace failed", err);
      toast.error("Failed to replace image");
    }
  };

  const handleReplaceHeroImage = async (event) => {
    const file = event.target.files[0];
    if (!file || !heroImage) return;

    const formData = new FormData();
    formData.append("image", file);

    try {
      const token = localStorage.getItem("auth_token");
      API.defaults.headers.common["Authorization"] = `Bearer ${token}`;

      await API.post(`/images/${heroImage.id}/replace`, formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      toast.success("Hero image replaced successfully");
      await fetchHeroImage(); // Refresh preview
    } catch (err) {
      console.error("Hero image replace failed", err);
      toast.error("Failed to replace hero image");
    }
  };

  const handleRemoveImage = (id) => {
    setImages((prev) => prev.filter((img) => img.id !== id));
  };

  const savePackageAndImages = async () => {
    setLoading(true);
    setError("");

    try {
      const token = localStorage.getItem("auth_token");
      API.defaults.headers.common["Authorization"] = `Bearer ${token}`;

      if (selectedFiles.length) {
        const galleryFormData = new FormData();
        selectedFiles.forEach((file) => {
          galleryFormData.append("images[]", file);
        });
        galleryFormData.append("package_id", pkg.id);
        galleryFormData.append("section", "gallery");

        await API.post("/images/multiple", galleryFormData, {
          headers: { "Content-Type": "multipart/form-data" },
        });

        setSelectedFiles([]);
        await fetchImages();
      }

      if (imageFile) {
        const heroFormData = new FormData();
        heroFormData.append("image", imageFile);
        heroFormData.append("package_id", pkg.id);
        heroFormData.append("section", "hero");

        await API.post("/images/hero", heroFormData, {
          headers: { "Content-Type": "multipart/form-data" },
        });

        setImageFile(null);
        setBannerPreview(null);
        await fetchImages();
      }

      const response = await API.put(`/packages/${pkg.id}`, {
        ...form,
        is_featured: form.is_featured === "true",
      });

      toast.success("Package updated successfully");
      onClose(response.data);
    } catch (err) {
      console.error("Save failed:", err);
      setError("Failed to save changes.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-100 flex items-center justify-center bg-black/30">
      <div className="bg-white rounded-xl p-6 w-full max-w-2xl shadow-lg overflow-y-auto max-h-[90vh]">
        <h2 className="text-xl font-semibold mb-4 text-red-600">
          View/Edit Package
        </h2>

        <div className="space-y-4">
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
                className="w-full border border-gray-300 rounded px-4 py-2"
              />
            </div>
          ))}

          <div>
            <label className="block font-medium">Description</label>
            <textarea
              name="description"
              value={form.description}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded-md px-4 py-2"
              rows={3}
            />
          </div>

          <div>
            <label className="block font-medium">Featured</label>
            <select
              name="is_featured"
              value={form.is_featured}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded-md px-4 py-2"
            >
              <option value="false">No</option>
              <option value="true">Yes</option>
            </select>
          </div>

          <div>
            <label className="block font-medium mb-1">Special Package</label>
            <div className="flex gap-4 items-center">
              <label className="flex items-center gap-1">
                <input
                  type="radio"
                  name="special_package"
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
                  checked={form.special_package === false}
                  onChange={() =>
                    setForm((prev) => ({ ...prev, special_package: false }))
                  }
                />
                No
              </label>
            </div>
          </div>

          {/* Hero Image Upload */}
          <div>
            <label className="block font-medium mb-2">Upload Hero Image</label>
            <input
              type="file"
              accept="image/*"
              id="replace-hero-img"
              // className="hidden"
              className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-red-50 file:text-red-700 hover:file:bg-red-100"
              onChange={handleReplaceHeroImage}
            />

            {heroImage && (
              <div className="relative w-1/2">
                <img
                  src={`https://portal.knowmo.me/storage/images/${heroImage.filename}`}
                  alt="Hero"
                  className="mt-2 h-32 w-full object-cover rounded"
                />
                <button
                  type="button"
                  onClick={() => setHeroImage(null)}
                  className="absolute top-1 right-1 bg-white text-red-600 rounded-full w-6 h-6 flex items-center justify-center shadow hover:bg-red-100"
                  title="Remove Hero Image"
                >
                  ✕
                </button>
                <button
                  type="button"
                  className="absolute bottom-1 right-1 bg-yellow-500 text-white text-xs px-2 rounded hover:bg-yellow-600"
                  onClick={() =>
                    document.getElementById("replace-hero-img").click()
                  }
                >
                  Replace
                </button>
                <input
                  type="file"
                  accept="image/*"
                  id="replace-hero-img"
                  className="hidden"
                  onChange={handleBannerImageChange}
                />
              </div>
            )}
          </div>

          {/* Gallery Upload */}
          <div>
            <label className="block font-medium mb-2">
              Upload Gallery Images
            </label>
            <input
              type="file"
              multiple
              onChange={handleFileChange}
              className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-red-50 file:text-red-700 hover:file:bg-red-100"
            />
            {selectedFiles.length > 0 && (
              <div className="mt-2 text-xs text-gray-600">
                {selectedFiles.length} file(s) selected
              </div>
            )}
          </div>

          <div className="grid grid-cols-3 gap-4 mt-4">
            {images.map((img) => (
              <div
                key={img.id}
                className="relative bg-gray-100 rounded shadow overflow-hidden"
              >
                <img
                  src={`https://portal.knowmo.me/storage/images/${img.filename}`}
                  alt="preview"
                  className="w-full h-32 object-cover"
                />
                <button
                  type="button"
                  onClick={() => handleRemoveImage(img.id)}
                  className="absolute top-1 right-1 bg-white text-red-600 rounded-full w-6 h-6 flex items-center justify-center shadow hover:bg-red-100"
                  title="Remove Image"
                >
                  ✕
                </button>
                <button
                  type="button"
                  className="absolute bottom-1 right-1 bg-yellow-500 text-white text-xs px-2 rounded hover:bg-yellow-600"
                  onClick={() =>
                    document.getElementById(`replace-img-${img.id}`).click()
                  }
                >
                  Replace
                </button>
                <input
                  type="file"
                  accept="image/*"
                  id={`replace-img-${img.id}`}
                  className="hidden"
                  onChange={(e) => handleReplaceImage(img.id, e)}
                />
              </div>
            ))}
          </div>

          {error && <p className="text-red-600 mt-2">{error}</p>}
        </div>

        <div className="flex justify-end gap-4 mt-6">
          <button
            onClick={onClose}
            className="px-4 py-2 rounded-md hover:bg-gray-100"
            disabled={loading}
          >
            Cancel
          </button>
          <button
            onClick={savePackageAndImages}
            className="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700"
            disabled={loading}
          >
            {loading
              ? selectedFiles.length
                ? "Uploading & Saving..."
                : "Saving..."
              : "Save Changes"}
          </button>
        </div>
      </div>
    </div>
  );
}
