import React, { useEffect, useState } from "react";
import API from "../../api/axiosClient";

const AdminImages = () => {
  const [images, setImages] = useState([]);
  const [file, setFile] = useState(null);
  const [section, setSection] = useState("");
  const [packageId, setPackageId] = useState("");

  const fetchImages = async () => {
    try {
      const response = await API.get("/images");
      setImages(response.data);
    } catch (error) {
      console.error("Failed to fetch images:", error);
    }
  };

  const handleUpload = async (e) => {
    e.preventDefault();
    if (!file) {
      alert("Please select an image");
      return;
    }

    const formData = new FormData();
    formData.append("image", file);
    formData.append("section", section);
    if (packageId) formData.append("package_id", packageId);

    try {
      const response = await API.post("/images", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      alert("Image uploaded successfully");
      setFile(null);
      setSection("");
      setPackageId("");
      fetchImages(); // Refresh after upload
    } catch (error) {
      alert("Upload failed");
      console.error(error);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this image?")) return;

    try {
      await API.delete(`/images/${id}`);
      setImages(images.filter((img) => img.id !== id));
    } catch (error) {
      console.error("Failed to delete image:", error);
    }
  };

  useEffect(() => {
    fetchImages();
  }, []);

  return (
    <div className="p-8 bg-gray-50 min-h-screen">
      <h1 className="text-3xl font-bold mb-6 text-gray-800">Image Manager</h1>

      {/* Upload Form */}
      <form
        onSubmit={handleUpload}
        className="bg-white p-6 rounded shadow-md mb-10 max-w-xl"
      >
        <h2 className="text-xl font-semibold mb-4">Upload New Image</h2>
        <div className="mb-4">
          <input
            type="file"
            accept="image/*"
            onChange={(e) => setFile(e.target.files[0])}
            className="w-full border p-2 rounded"
          />
        </div>
        <div className="mb-4">
          <input
            type="text"
            placeholder="Section (optional)"
            value={section}
            onChange={(e) => setSection(e.target.value)}
            className="w-full border p-2 rounded"
          />
        </div>
        <div className="mb-4">
          <input
            type="text"
            placeholder="Package ID (optional)"
            value={packageId}
            onChange={(e) => setPackageId(e.target.value)}
            className="w-full border p-2 rounded"
          />
        </div>
        <button
          type="submit"
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition"
        >
          Upload
        </button>
      </form>

      {/* Image List */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {images.map((img) => (
          <div
            key={img.id}
            className="bg-white rounded shadow p-4 flex flex-col items-center"
          >
            <img
              src={`https://portal.knowmo.me/storage/images/${img.filename}`}
              alt="Uploaded"
              className="w-full h-48 object-cover rounded mb-3"
            />
            <p className="text-sm text-gray-700 mb-1">
              Section: {img.section || "N/A"}
            </p>
            <p className="text-sm text-gray-700 mb-3">
              Package: {img.package?.title || "None"}
            </p>
            <button
              onClick={() => handleDelete(img.id)}
              className="text-red-500 hover:underline"
            >
              Delete
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AdminImages;
