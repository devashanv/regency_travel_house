import React, { useState } from "react";
import API from "../../api/axiosClient";
import { toast } from "react-toastify";

export default function AddCustomerModal({ onClose, onAdded }) {
  const [form, setForm] = useState({
    full_name: "",
    email: "",
    password: "",
    confirmPassword: "",
    phone: "",
    address: "",
    country_of_residence: "",
    nic: "",
    date_of_birth: "",
  });

  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrors({});
    setLoading(true);

    try {
      await API.post("/customers/register", {
        full_name: form.full_name,
        email: form.email,
        password: form.password,
        password_confirmation: form.confirmPassword,
        phone: form.phone,
        address: form.address,
        country_of_residence: form.country_of_residence,
        nic: form.nic,
        date_of_birth: form.date_of_birth,
      });

      toast.success("Customer registered successfully");
      onAdded(); 
      onClose(); 
    } catch (err) {
      if (err.response?.data?.errors) {
        setErrors(err.response.data.errors);
        toast.error("Validation error");
      } else {
        toast.error("Registration failed");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/40 z-100 flex justify-center items-center">
      <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-lg">
        <h2 className="text-xl font-semibold text-red-600 mb-4">
          Add New Customer
        </h2>

        <form
          onSubmit={handleSubmit}
          className="space-y-4 max-h-[75vh] overflow-y-auto pr-2"
        >
          {/* Reusable input component rendering */}
          <Input
            label="Full Name"
            name="full_name"
            value={form.full_name}
            onChange={handleChange}
            error={errors.full_name}
          />
          <Input
            label="Email"
            name="email"
            type="email"
            value={form.email}
            onChange={handleChange}
            error={errors.email}
          />
          <Input
            label="Password"
            name="password"
            type="password"
            value={form.password}
            onChange={handleChange}
            error={errors.password}
          />
          <Input
            label="Confirm Password"
            name="confirmPassword"
            type="password"
            value={form.confirmPassword}
            onChange={handleChange}
          />

          <div className="flex justify-end gap-4 mt-4">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 cursor-pointer border rounded hover:bg-gray-100"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={loading}
              className="px-4 py-2 cursor-pointer bg-red-600 text-white rounded hover:bg-red-700"
            >
              {loading ? "Adding..." : "Add Customer"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

const Input = ({ label, name, value, onChange, error, type = "text" }) => (
  <div>
    <label className="block text-sm font-medium">{label}</label>
    <input
      type={type}
      name={name}
      value={value}
      onChange={onChange}
      className="w-full border px-4 py-2 rounded"
    />
    {error && <p className="text-sm text-red-600">{error[0]}</p>}
  </div>
);
