import React, { useEffect, useState } from "react";
import { FaEye, FaPlus, FaEdit, FaTrash } from "react-icons/fa";
import AdminHeader from "../../components/AdminHeader";
import AdminSideNav from "../../components/AdminSideNav";
import API from "../../api/axiosClient";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import DestinationDetailModal from "./DestinationDetailModal";
import DestinationFormModal from "./DestinationFormModal";

export default function ManageDestinations() {
  const [destinations, setDestinations] = useState([]);
  const [selectedDestination, setSelectedDestination] = useState(null);
  const [formMode, setFormMode] = useState(null);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  const fetchDestinations = async () => {
    try {
      const token = localStorage.getItem("auth_token");
      if (!token) {
        setError("Authentication token not found.");
        return;
      }
      API.defaults.headers.common["Authorization"] = `Bearer ${token}`;
      const response = await API.get("/destinations");
      setDestinations(response.data);
    } catch (err) {
      console.error("Error loading destinations:", err);
      setError("Failed to load destinations.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDestinations();
  }, []);

  const openDetail = async (id) => {
    const token = localStorage.getItem("auth_token");
    API.defaults.headers.common["Authorization"] = `Bearer ${token}`;
    const response = await API.get(`/destinations/${id}`);
    setSelectedDestination(response.data);
  };

  const openForm = (mode, destination = null) => {
    setFormMode({ mode, destination });
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this destination?"))
      return;
    try {
      const token = localStorage.getItem("auth_token");
      API.defaults.headers.common["Authorization"] = `Bearer ${token}`;
      await API.delete(`/destinations/${id}`);
      setDestinations((prev) => prev.filter((d) => d.id !== id));
      toast.success("Destination deleted.");
    } catch (err) {
      console.error("Delete error:", err);
      toast.error("Delete failed.");
    }
  };

  const handleFormClose = (updated = null) => {
    setFormMode(null);
    if (updated) {
      if (formMode.mode === "add") {
        setDestinations((prev) => [updated, ...prev]);
      } else {
        setDestinations((prev) =>
          prev.map((d) => (d.id === updated.id ? updated : d))
        );
      }
    }
  };

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentDestinations = destinations.slice(
    indexOfFirstItem,
    indexOfLastItem
  );
  const totalPages = Math.ceil(destinations.length / itemsPerPage);

  return (
    <div className="min-h-screen bg-gray-50">
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
                Manage <span className="text-red-600">Destinations</span>
              </h1>
              <button
                className="cursor-pointer bg-red-600 text-white px-4 py-2 rounded flex items-center gap-2 hover:bg-red-700"
                onClick={() => openForm("add")}
              >
                <FaPlus /> Add Destination
              </button>
            </div>

            {loading ? (
              <p>Loading destinations...</p>
            ) : error ? (
              <p className="text-red-600">{error}</p>
            ) : (
              <div className="overflow-x-auto bg-white shadow rounded">
                <table className="w-full text-left text-sm">
                  <thead className="bg-gray-100 text-gray-600 font-semibold">
                    <tr>
                      <th className="p-4">ID</th>
                      <th className="p-4">Name</th>
                      <th className="p-4">Country</th>
                      <th className="p-4">Region</th>
                      <th className="p-4">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {currentDestinations.map((d) => (
                      <tr
                        key={d.id}
                        className="border-b border-gray-200 hover:bg-gray-50"
                      >
                        <td className="p-4">#{d.id}</td>
                        <td className="p-4">{d.name}</td>
                        <td className="p-4">{d.country}</td>
                        <td className="p-4">{d.region || "-"}</td>
                        <td className="p-4 flex gap-2">
                          {/* <button
                          className="cursor-pointer bg-blue-100 text-blue-600 px-3 py-1 text-xs rounded hover:bg-blue-200"
                          onClick={() => openForm("edit", d)}
                        >
                          <FaEye /> View
                        </button> */}
                          <button
                            className="cursor-pointer bg-blue-100 text-blue-600 px-3 py-1 text-xs rounded hover:bg-blue-200"
                            onClick={() => openForm("edit", d)}
                          >
                            <FaEye />
                            View
                          </button>
                          <button
                            className="bg-red-100 cursor-pointer text-red-600 px-3 py-1 text-xs rounded hover:bg-red-200"
                            onClick={() => handleDelete(d.id)}
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

      {selectedDestination && (
        <DestinationDetailModal
          destination={selectedDestination}
          onClose={() => setSelectedDestination(null)}
        />
      )}

      {formMode && (
        <DestinationFormModal
          mode={formMode.mode}
          destination={formMode.destination}
          onClose={handleFormClose}
        />
      )}
      <ToastContainer position="top-right" autoClose={3000} />
    </div>
  );
}
