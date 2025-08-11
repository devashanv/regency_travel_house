import React, { useEffect, useState } from "react";
import { FaPlus, FaEye, FaTrash, FaFilter, FaEdit } from "react-icons/fa";
import AdminSideNav from "../../components/AdminSideNav";
import AdminHeader from "../../components/AdminHeader";
import API from "../../api/axiosClient";
import PackageDetailModal from "./PackageDetailModal";
import AddPackageModal from "./AddPackageModal";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function ManagePackages() {
  const [packages, setPackages] = useState([]);
  const [selectedPackage, setSelectedPackage] = useState(null);
  const [showAddModal, setShowAddModal] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  const fetchPackages = async () => {
    try {
      const token = localStorage.getItem("auth_token");
      if (!token) {
        setError("Authentication token not found.");
        return;
      }

      API.defaults.headers.common["Authorization"] = `Bearer ${token}`;
      const response = await API.get("/packages");
      setPackages(response.data);
    } catch (err) {
      console.error("Failed to fetch packages:", err);
      setError("Failed to load packages.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPackages();
  }, []);

  const openPackageDetail = async (id) => {
    try {
      const token = localStorage.getItem("auth_token");
      API.defaults.headers.common["Authorization"] = `Bearer ${token}`;
      const response = await API.get(`/packages/${id}`);
      setSelectedPackage(response.data);
    } catch (err) {
      console.error("Error fetching package detail:", err);
    }
  };

  const deletePackage = async (id) => {
    if (!window.confirm("Are you sure you want to delete this package?"))
      return;

    try {
      const token = localStorage.getItem("auth_token");
      API.defaults.headers.common["Authorization"] = `Bearer ${token}`;
      await API.delete(`/packages/${id}`);
      setPackages(packages.filter((p) => p.id !== id));
      toast.success("Package deleted successfully!");
    } catch (err) {
      console.error("Failed to delete package:", err);
      toast.error("Delete failed. Please try again.");
    }
  };

  const handleModalClose = (updatedPackage = null) => {
    setSelectedPackage(null);
    if (updatedPackage) {
      setPackages((prev) =>
        prev.map((p) => (p.id === updatedPackage.id ? updatedPackage : p))
      );
    }
  };

  const handlePackageAdded = (newPackage) => {
    setPackages((prev) => [newPackage, ...prev]);
  };

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentPackages = packages.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(packages.length / itemsPerPage);

  return (
    <div className="min-h-screen bg-gray-50">
      <ToastContainer position="top-right" autoClose={3000} hideProgressBar />
      <AdminHeader />
      <div className="flex">
        <div className="w-1/6 h-auto ">
          <AdminSideNav />
        </div>
        <div className="w-5/6 h-auto pt-10">
          {" "}
          <main className="flex-1 p-6">
            <div className="flex items-center justify-between mb-6">
              <h1 className="text-2xl font-semibold">
                Manage <span className="text-red-600">Packages</span>
              </h1>
              <button
                className="bg-red-600 cursor-pointer text-white px-4 py-2 rounded shadow flex items-center gap-2 hover:bg-red-700"
                onClick={() => setShowAddModal(true)}
              >
                <FaPlus /> Add Package
              </button>
            </div>

            {loading ? (
              <p>Loading packages...</p>
            ) : error ? (
              <p className="text-red-600">{error}</p>
            ) : (
              <div className="overflow-x-auto bg-white shadow rounded">
                <table className="w-full text-left text-sm">
                  <thead className="bg-gray-100 text-gray-600 font-semibold">
                    <tr>
                      <th className="p-4">ID</th>
                      <th className="p-4">Title</th>
                      <th className="p-4">Destination</th>
                      <th className="p-4">Price</th>
                      <th className="p-4">Duration</th>
                      <th className="p-4">Category</th>
                      <th className="p-4">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {currentPackages.map((pkg) => (
                      <tr
                        key={pkg.id}
                        className="border-b border-gray-200 hover:bg-gray-50"
                      >
                        <td className="p-4">#{pkg.id}</td>

                        <td className="p-4">{pkg.title}</td>
                        <td className="p-4">
                          {pkg.destination?.name || "N/A"}
                        </td>
                        <td className="p-4">USD {pkg.price_per_person}</td>
                        <td className="p-4">{pkg.duration_days} Days</td>
                        <td className="p-4">{pkg.category}</td>
                        <td className="p-4 flex gap-2">
                          {/* <button
                          className="bg-blue-100 cursor-pointer text-blue-600 px-3 py-1 text-xs rounded hover:bg-blue-200"
                          onClick={() => openPackageDetail(pkg.id)}
                        >
                          <FaEye /> View
                        </button> */}
                          <button
                            className="bg-blue-100 cursor-pointer text-blue-600 px-3 py-1 text-xs rounded hover:bg-blue-200"
                            onClick={() => openPackageDetail(pkg.id)}
                          >
                            <FaEye /> View
                          </button>
                          <button
                            className="bg-red-100 cursor-pointer text-red-600 px-3 py-1 text-xs rounded hover:bg-red-200"
                            onClick={() => deletePackage(pkg.id)}
                          >
                            <FaTrash /> Delete
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
                <div className="flex justify-between items-center p-4">
                  <button
                    className="px-3 py-1 bg-gray-200 cursor-pointer rounded disabled:opacity-50"
                    onClick={() =>
                      setCurrentPage((prev) => Math.max(prev - 1, 1))
                    }
                    disabled={currentPage === 1}
                  >
                    Previous
                  </button>
                  <span className="text-sm text-gray-700">
                    Page {currentPage} of {totalPages}
                  </span>
                  <button
                    className="px-3 py-1 bg-gray-200 cursor-pointer rounded disabled:opacity-50"
                    onClick={() =>
                      setCurrentPage((prev) => Math.min(prev + 1, totalPages))
                    }
                    disabled={currentPage === totalPages}
                  >
                    Next
                  </button>
                </div>
              </div>
            )}
          </main>
        </div>
      </div>

      {selectedPackage && (
        <PackageDetailModal pkg={selectedPackage} onClose={handleModalClose} />
      )}

      {showAddModal && (
        <AddPackageModal
          onClose={() => setShowAddModal(false)}
          onPackageAdded={handlePackageAdded}
        />
      )}
    </div>
  );
}
