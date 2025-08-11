import React, { useEffect, useState } from "react";
import API from "../../api/axiosClient";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { FaPlus, FaEdit, FaTrash } from "react-icons/fa";
import AdminHeader from "../../components/AdminHeader";
import AdminSideNav from "../../components/AdminSideNav";

export default function AdminRegister() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
    role: "Support",
  });
  const [staffList, setStaffList] = useState([]);
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});
  const [showModal, setShowModal] = useState(false);
  const [editMode, setEditMode] = useState(false);
  const [editId, setEditId] = useState(null);

  const fetchStaff = async () => {
    try {
      const token = localStorage.getItem("auth_token");
      API.defaults.headers.common["Authorization"] = `Bearer ${token}`;
      const response = await API.get("/staff/all");
      setStaffList(response.data);
    } catch (err) {
      toast.error("Failed to load staff.");
    }
  };

  useEffect(() => {
    fetchStaff();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrors({});
    setLoading(true);
    const token = localStorage.getItem("auth_token");
    API.defaults.headers.common["Authorization"] = `Bearer ${token}`;

    try {
      if (editMode) {
        await API.put(`/staff/${editId}`, {
          name: form.name,
          email: form.email,
          role: form.role,
        });
        toast.success("Staff updated successfully!");
      } else {
        await API.post("/staff/register", {
          name: form.name,
          email: form.email,
          password: form.password,
          password_confirmation: form.confirmPassword,
          role: form.role,
        });
        toast.success("Staff registered successfully!");
      }

      fetchStaff();
      closeModal();
    } catch (err) {
      if (err.response?.data?.errors) {
        setErrors(err.response.data.errors);
        toast.error("Validation error. Please check fields.");
      } else {
        toast.error(err.response?.data?.message || "Operation failed.");
      }
    } finally {
      setLoading(false);
    }
  };

  const closeModal = () => {
    setForm({
      name: "",
      email: "",
      password: "",
      confirmPassword: "",
      role: "Support",
    });
    setEditMode(false);
    setEditId(null);
    setErrors({});
    setShowModal(false);
  };

  const handleEdit = (staff) => {
    setForm({
      name: staff.name,
      email: staff.email,
      password: "",
      confirmPassword: "",
      role: staff.role,
    });
    setEditId(staff.id);
    setEditMode(true);
    setShowModal(true);
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this staff member?"))
      return;

    try {
      const token = localStorage.getItem("auth_token");
      API.defaults.headers.common["Authorization"] = `Bearer ${token}`;
      await API.delete(`/staff/${id}`);
      toast.success("Staff deleted.");
      fetchStaff();
    } catch (err) {
      toast.error("Delete failed.");
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <AdminHeader />
      <div className="flex">
        <div className="w-1/6 h-auto ">
          <AdminSideNav />
        </div>
        <div className="w-5/6 h-auto pt-10">
          <main className="flex-1 p-6">
            <div className="flex justify-between items-center mb-6">
              <h1 className="text-2xl font-semibold">
                Manage <span className="text-red-600">Staff</span>
              </h1>
              <button
                className="bg-red-600 cursor-pointer text-white px-4 py-2 rounded flex items-center gap-2 hover:bg-red-700"
                onClick={() => setShowModal(true)}
              >
                <FaPlus /> Add Staff
              </button>
            </div>

            {/* Staff Table */}
            <div className="bg-white shadow rounded overflow-x-auto">
              <table className="w-full text-sm text-left">
                <thead className="bg-gray-100 text-gray-600 font-semibold">
                  <tr>
                    <th className="p-4">ID</th>
                    <th className="p-4">Name</th>
                    <th className="p-4">Email</th>
                    <th className="p-4">Role</th>
                    <th className="p-4">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {staffList.map((staff) => (
                    <tr
                      key={staff.id}
                      className="border-b border-gray-300 hover:bg-gray-50"
                    >
                      <td className="p-4">#{staff.id}</td>
                      <td className="p-4">{staff.name}</td>
                      <td className="p-4">{staff.email}</td>
                      <td className="p-4">{staff.role}</td>
                      <td className="p-4 flex gap-2">
                        <button
                          className="bg-yellow-100 cursor-pointer text-yellow-600 px-3 py-1 rounded text-xs hover:bg-yellow-200"
                          onClick={() => handleEdit(staff)}
                        >
                          <FaEdit /> Edit
                        </button>
                        <button
                          className="bg-red-100 cursor-pointer text-red-600 px-3 py-1 rounded text-xs hover:bg-red-200"
                          onClick={() => handleDelete(staff.id)}
                        >
                          <FaTrash /> Delete
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Modal for Add/Edit */}
            {showModal && (
              <div className="fixed inset-0 z-100 bg-black/40 flex items-center justify-center">
                <div className="bg-white p-6 rounded-lg shadow w-full max-w-xl">
                  <h2 className="text-xl font-semibold text-red-600 mb-4">
                    {editMode ? "Edit Staff" : "Register New Staff"}
                  </h2>
                  <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium">
                        Full Name
                      </label>
                      <input
                        name="name"
                        value={form.name}
                        onChange={handleChange}
                        className="w-full border border-gray-300 px-4 py-2 rounded"
                      />
                      {errors.name && (
                        <p className="text-sm text-red-600">{errors.name[0]}</p>
                      )}
                    </div>
                    <div>
                      <label className="block text-sm font-medium">Email</label>
                      <input
                        name="email"
                        value={form.email}
                        onChange={handleChange}
                        type="email"
                        className="w-full border border-gray-300 px-4 py-2 rounded"
                      />
                      {errors.email && (
                        <p className="text-sm text-red-600">
                          {errors.email[0]}
                        </p>
                      )}
                    </div>
                    {!editMode && (
                      <>
                        <div>
                          <label className="block text-sm font-medium">
                            Password
                          </label>
                          <input
                            name="password"
                            value={form.password}
                            onChange={handleChange}
                            type="password"
                            className="w-full border border-gray-300 px-4 py-2 rounded"
                          />
                          {errors.password && (
                            <p className="text-sm text-red-600">
                              {errors.password[0]}
                            </p>
                          )}
                        </div>
                        <div>
                          <label className="block text-sm font-medium">
                            Confirm Password
                          </label>
                          <input
                            name="confirmPassword"
                            value={form.confirmPassword}
                            onChange={handleChange}
                            type="password"
                            className="w-full border border-gray-300 px-4 py-2 rounded"
                          />
                        </div>
                      </>
                    )}
                    <div>
                      <label className="block text-sm font-medium">Role</label>
                      <select
                        name="role"
                        value={form.role}
                        onChange={handleChange}
                        className="w-full border border-gray-300 px-4 py-2 rounded"
                      >
                        <option value="Admin">Admin</option>
                        <option value="Manager">Manager</option>
                        <option value="Support">Support</option>
                      </select>
                    </div>
                    <div className="flex justify-end gap-3 mt-6">
                      <button
                        type="button"
                        onClick={closeModal}
                        className="px-4 py-2 cursor-pointer border rounded hover:bg-gray-100"
                      >
                        Cancel
                      </button>
                      <button
                        type="submit"
                        className="px-4 py-2 cursor-pointer bg-red-600 text-white rounded hover:bg-red-700"
                      >
                        {loading
                          ? "Saving..."
                          : editMode
                          ? "Update"
                          : "Register"}
                      </button>
                    </div>
                  </form>
                </div>
              </div>
            )}

            <ToastContainer position="top-right" autoClose={3000} />
          </main>
        </div>
      </div>
    </div>
  );
}
