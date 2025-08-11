// components/ImageList.jsx
import React, { useEffect, useState } from "react";
import API from "../api/axiosClient";

function ImageList() {
  const [images, setImages] = useState([]);

  const fetchImages = async () => {
    try {
      const response = await API.get("/images");
      setImages(response.data);
    } catch (error) {
      console.error("Failed to fetch images:", error);
    }
  };

  const deleteImage = async (id) => {
    if (!window.confirm("Delete this image?")) return;
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
    <div className="grid grid-cols-3 gap-4">
      {images.map((img) => (
        <div key={img.id} className="border p-2 rounded shadow">
          <img src={`https://portal.knowmo.me/storage/images/${img.filename}`} alt={img.section} className="w-full h-40 object-cover" />
          <p className="text-sm mt-2">Section: {img.section || "N/A"}</p>
          <p className="text-sm">Package: {img.package?.title || "None"}</p>
          <button
            onClick={() => deleteImage(img.id)}
            className="mt-2 bg-red-500 text-white px-2 py-1 rounded"
          >
            Delete
          </button>
        </div>
      ))}
    </div>
  );
}

export default ImageList;
