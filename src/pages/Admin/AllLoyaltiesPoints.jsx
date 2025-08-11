import React, { useEffect, useState } from "react";
import { FaEye, FaTrash, FaPlus } from "react-icons/fa";
import AdminSideNav from "../../components/AdminSideNav";
import AdminHeader from "../../components/AdminHeader";
import API from "../../api/axiosClient";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import CustomerDetailModal from "./CustomerDetailModal";
import AddCustomerModal from "./AddCustomerModal";
import { typographyClasses } from "@mui/material";
import LoyaltyDetail from "./ViewLoyalty";
import LoyaltyPointsEditModal from "../../pages/Admin/LoyaltyPointsEditModal";

export default function ManageCustomers() {
  const [customers, setCustomers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [viewingCustomer, setViewingCustomer] = useState(null);
  // const [viewingLoyaltyDetail, setViewingLoyaltyDetail] = useState(null);
  const [showLoyaltyModal, setShowLoyaltyModal] = useState(false);
  const [selectedCustomerId, setSelectedCustomerId] = useState(null);

  // LoyaltyDetailModal
  const fetchCustomers = async () => {
    try {
      const token = localStorage.getItem("auth_token");
      API.defaults.headers.common["Authorization"] = `Bearer ${token}`;
      const res = await API.get("/customer/all");
      console.log(res);
      setCustomers(res.data);
    } catch (err) {
      toast.error("Failed to load customers.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCustomers();
  }, []);

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
                Manage <span className="text-red-600">Loyalties Points</span>
              </h1>
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
                      <th className="px-5 py-3">Tier</th>
                      <th className="px-5 py-3">Loyalty</th>
                      <th className="px-5 py-3">Donate</th>
                      <th className="px-5 py-3 text-center">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {currentCustomers.map((c) => (
                      <tr
                        key={c.id}
                        className="border-b border-gray-300 hover:bg-gray-50"
                      >
                        <td className="px-5 py-3">{c.full_name}</td>
                        <td className="px-5 py-3">{c.email}</td>
                        <td className="px-5 py-3">
                          {c.loyalty?.membership_tier || "Bronze"}
                        </td>

                        <td className="px-5 py-3">{c.loyalty_points ?? 0}</td>

                        <td className="px-5 py-3">{c.donate ?? 0}</td>

                        <td className="px-5 py-3 text-center flex gap-2 justify-center">
                          <button
                            className="bg-blue-100 text-blue-600 px-3 py-1 text-xs rounded hover:bg-blue-200"
                            onClick={() => setViewingCustomer(c)}
                          >
                            <FaEye /> View
                          </button>
                          <button
                            onClick={() => {
                              setSelectedCustomerId(c.id);
                              setShowLoyaltyModal(true);
                            }}
                            className="bg-yellow-100 text-yellow-600 px-3 py-1 text-xs rounded hover:bg-yellow-200"
                          >
                            <FaPlus /> Adjust
                          </button>
                        </td>
                      </tr>
                    ))}
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
                    className="px-4 py-2 bg-gray-200 rounded cursor-pointer disabled:opacity-50"
                  >
                    Next
                  </button>
                </div>
              </div>
            )}

            {viewingCustomer && (
              <LoyaltyDetail
                customer={viewingCustomer}
                onClose={() => setViewingCustomer(false)}
              />
            )}

            {showLoyaltyModal && (
              <LoyaltyPointsEditModal
                customerId={selectedCustomerId}
                onClose={() => setShowLoyaltyModal(false)}
                onUpdated={() => {
                  fetchCustomers();
                }}
              />
            )}

            <ToastContainer position="top-right" autoClose={3000} />
          </main>
        </div>
      </div>
    </div>
  );
}
