import React, { useEffect, useState } from "react";
import { FaEye, FaTrash, FaPlus, FaEdit } from "react-icons/fa";
import AdminHeader from "../../components/AdminHeader";
import AdminSideNav from "../../components/AdminSideNav";
import CustomerDetailModal from "./CustomerDetailModal";
import AddCustomerModal from "./AddCustomerModal";
import API from "../../api/axiosClient";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import EditCustomerModal from "./Forms/EditCustomerModal";

export default function ManageCustomers() {
    useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  useEffect(() => {
    fetchCustomers();
  }, []);

  const [customers, setCustomers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [viewingCustomer, setViewingCustomer] = useState(null);
  const [showAddModal, setShowAddModal] = useState(false);
  const [editCustomer, setEditCustomer] = useState(null); // For editing

  const fetchCustomers = async () => {
    try {
      const token = localStorage.getItem("auth_token");
      API.defaults.headers.common["Authorization"] = `Bearer ${token}`;
      const res = await API.get("/customer/all");
      setCustomers(res.data);
    } catch (err) {
      toast.error("Failed to load customers.");
    } finally {
      setLoading(false);
    }
  };


  const handleView = async (id) => {
    try {
      const token = localStorage.getItem("auth_token");
      API.defaults.headers.common["Authorization"] = `Bearer ${token}`;
      const res = await API.get(`/customer/${id}`);
      setViewingCustomer(res.data);
    } catch {
      toast.error("Failed to load customer details.");
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Delete this customer?")) return;
    try {
      const token = localStorage.getItem("auth_token");
      API.defaults.headers.common["Authorization"] = `Bearer ${token}`;
      await API.delete(`/customer/${id}`);
      toast.success("Customer deleted.");
      setCustomers((prev) => prev.filter((c) => c.id !== id));
    } catch {
      toast.error("Delete failed.");
    }
  };

  const handleEdit = async (id) => {
    try {
      const token = localStorage.getItem("auth_token");
      API.defaults.headers.common["Authorization"] = `Bearer ${token}`;
      const res = await API.get(`/customer/${id}`);
      setEditCustomer(res.data); // open modal with data
    } catch {
      toast.error("Failed to load customer details for editing.");
    }
  };

  const getTier = (points) => {
    if (points >= 1000) return "Gold";
    if (points >= 500) return "Silver";
    return "Bronze";
  };

  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentCustomers = customers.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(customers.length / itemsPerPage);

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
                Manage <span className="text-red-600">Customers</span>
              </h1>
              <button
                className="bg-red-600 text-white px-4 py-2 rounded flex items-center gap-2 hover:bg-red-700"
                onClick={() => setShowAddModal(true)}
              >
                <FaPlus /> Add Member
              </button>
            </div>

            {loading ? (
              <p>Loading...</p>
            ) : (
              <div className="overflow-x-auto bg-white shadow rounded">
                <table className="w-full text-sm text-left">
                  <thead className="bg-gray-100 text-gray-600 font-semibold">
                    <tr>
                      <th className="px-5 py-3">Name</th>
                      <th className="px-5 py-3">Email</th>
                      <th className="px-5 py-3">Phone</th>
                      <th className="px-5 py-3">Bookings</th>
                      <th className="px-5 py-3">Tier</th>
                      {/* <th className="px-5 py-3">Points</th> */}
                      <th className="px-5 py-3 text-center">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {currentCustomers.map((c) => {
                      const points =
                        (c.earned_points ?? 0) - (c.redeemed_points ?? 0);
                      return (
                        <tr
                          key={c.id}
                          className="border-b border-gray-300 hover:bg-gray-50"
                        >
                          <td className="px-5 py-3">{c.full_name}</td>

                          <td className="px-5 py-3">
                            <div className="flex items-center gap-2">
                              <span>{c.email}</span>
                              {c.per_for_news && (
                                <span className="bg-secondary text-white text-xs font-semibold px-2 py-1 rounded-full">
                                  NL
                                </span>
                              )}
                            </div>
                          </td>

                          <td className="px-5 py-3">{c.phone || "—"}</td>
                          <td className="px-5 py-3">{c.bookings_count}</td>
                          <td className="px-5 py-3">{getTier(points)}</td>
                          <td className="px-5 py-3 flex gap-2 justify-center">
                            <button
                              className="bg-blue-100 text-blue-600 px-3 py-1 text-xs rounded flex items-center gap-1 hover:bg-blue-200"
                              onClick={() => handleView(c.id)}
                            >
                              <FaEye /> View
                            </button>
                            <button
                              className="bg-yellow-100 text-yellow-600 px-3 py-1 text-xs rounded flex items-center gap-1 hover:bg-yellow-200"
                              onClick={() => handleEdit(c.id)}
                            >
                              <FaEdit /> Edit
                            </button>
                            {/* <button
                              className="bg-red-100 text-red-600 px-3 py-1 text-xs rounded flex items-center gap-1 hover:bg-red-200"
                              onClick={() => handleDelete(c.id)}
                            >
                              <FaTrash /> Delete
                            </button> */}
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
                <div className="flex justify-between items-center px-5 py-3">
                  <button
                    onClick={() =>
                      setCurrentPage((prev) => Math.max(prev - 1, 1))
                    }
                    disabled={currentPage === 1}
                    className="px-4 py-2 bg-gray-200 cursor-pointer rounded disabled:opacity-50"
                  >
                    Previous
                  </button>
                  <span className="text-sm text-gray-600">
                    Page {currentPage} of {totalPages}
                  </span>
                  <button
                    onClick={() =>
                      setCurrentPage((prev) => Math.min(prev + 1, totalPages))
                    }
                    disabled={currentPage === totalPages}
                    className="px-4 py-2 bg-gray-200 rounded  cursor-pointer disabled:opacity-50"
                  >
                    Next
                  </button>
                </div>
              </div>
            )}

            {viewingCustomer && (
              <CustomerDetailModal
                customer={viewingCustomer}
                onClose={() => setViewingCustomer(null)}
              />
            )}

            {showAddModal && (
              <AddCustomerModal
                onClose={() => setShowAddModal(false)}
                onAdded={fetchCustomers}
              />
            )}

            {editCustomer && (
              <EditCustomerModal
                onClose={() => setEditCustomer(null)}
                onAdded={fetchCustomers}
                initialData={editCustomer}
                isEdit
              />
            )}

            <ToastContainer position="top-right" autoClose={3000} />
          </main>
        </div>
      </div>
    </div>
  );
}
