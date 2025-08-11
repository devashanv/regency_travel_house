import React, { useState } from "react";
import API from "../../../api/axiosClient";
import { toast } from "react-toastify";

export default function EditCustomerModal({ initialData, onClose, onAdded }) {
  const [form, setForm] = useState({ ...initialData, confirmPassword: "" });
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
      const token = localStorage.getItem("auth_token");
      API.defaults.headers.common["Authorization"] = `Bearer ${token}`;

      await API.put(`/customer/${initialData.id}`, {
        full_name: form.full_name,
        email: form.email,
        password: form.password,
        password_confirmation: form.confirmPassword,
        phone: form.phone,
        address: form.address,
        country_of_residence: form.country_of_residence,
        nic: form.nic,
        date_of_birth: form.date_of_birth,
        gender: form.gender,
        id_type: form.id_type,
        id_number: form.id_number,
      });

      toast.success("Customer updated successfully");
      onAdded();
      onClose();
    } catch (err) {
      if (err.response?.data?.errors) {
        setErrors(err.response.data.errors);
        toast.error("Validation error");
        console.log(err);
      } else {
        toast.error("Update failed");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/40 z-100 flex justify-center items-center">
      <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-lg">
        <h2 className="text-xl font-semibold text-red-600 mb-4">
          Edit Customer
        </h2>
        <form
          onSubmit={handleSubmit}
          className="space-y-4 max-h-[75vh] overflow-y-auto pr-2"
        >
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
            label="Phone"
            name="phone"
            value={form.phone}
            onChange={handleChange}
            error={errors.phone}
          />

          <Input
            label="Address"
            name="address"
            value={form.address}
            onChange={handleChange}
            error={errors.address}
          />
          <Input
            label="Country"
            name="country_of_residence"
            value={form.country_of_residence}
            onChange={handleChange}
            error={errors.country_of_residence}
          />

          <div>
            <label className="block text-sm font-medium mb-1">Gender</label>
            <select
              name="gender"
              value={form.gender}
              onChange={handleChange}
              className={`w-full rounded-md  border ${
                errors.gender ? "border-red-500" : "border-gray-400"
              } px-4 py-2 text-sm`}
            >
              <option value="">Select Gender</option>
              <option value="male">Male</option>
              <option value="female">Female</option>
              <option value="other">Other</option>
            </select>
            {errors.gender && (
              <p className="text-sm text-red-600">{errors.gender}</p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">ID Type</label>

            <div className="flex items-center gap-4 mb-2 text-sm">
              <label className="flex items-center gap-1">
                <input
                  type="radio"
                  name="id_type"
                  value="passport"
                  checked={form.id_type === "passport"}
                  onChange={handleChange}
                />
                Passport
              </label>

              <label className="flex items-center gap-1">
                <input
                  type="radio"
                  name="id_type"
                  value="nic"
                  checked={form.id_type === "nic"}
                  onChange={handleChange}
                />
                ID
              </label>

              {form.id_type && (
                <Input
                  name="id_number"
                  value={form.id_number}
                  onChange={handleChange}
                  error={errors.id_number}
                  placeholder={
                    form.id_type === "passport"
                      ? "Enter Passport Number"
                      : "Enter ID Number"
                  }
                  maxLength={form.id_type === "passport" ? 9 : 12}
                />
              )}
            </div>
          </div>

          <Input
            label="Date of Birth"
            name="date_of_birth"
            type="date"
            value={form.date_of_birth}
            onChange={handleChange}
            error={errors.date_of_birth}
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
              {loading ? "Updating..." : "Update Customer"}
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
      value={value || ""}
      onChange={onChange}
      className="w-full border px-4 py-2 rounded"
    />
    {error && <p className="text-sm text-red-600">{error[0]}</p>}
  </div>
);
