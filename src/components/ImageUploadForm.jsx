import React, { useState } from "react";
import API from "../api/axiosClient";

function ImageUploadForm() {
  const [file, setFile] = useState(null);
  const [section, setSection] = useState("");
  const [packageId, setPackageId] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!file) return;

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
      console.log(response.data);
    } catch (error) {
      alert("Failed to upload image");
      console.error(error);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <input type="file" accept="image/*" onChange={(e) => setFile(e.target.files[0])} />
      <input type="text" placeholder="Section (optional)" value={section} onChange={(e) => setSection(e.target.value)} />
      <input type="text" placeholder="Package ID (optional)" value={packageId} onChange={(e) => setPackageId(e.target.value)} />
      <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded">Upload</button>
    </form>
  );
}

export default ImageUploadForm;
