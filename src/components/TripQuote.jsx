import React, { useState } from "react";
import API from "../api/axiosClient";
import { toast } from "react-toastify";
import { useNavigate, useLocation } from "react-router-dom";

const TripQuote = ({ onClose, packageId }) => {
  const [form, setForm] = useState({
    start_date: "",
    end_date: "",
    number_of_people: 1,
    estimated_price: "",
    special_requests: "",
  });

  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();
  const location = useLocation();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrors({});
    setLoading(true);

    const token = localStorage.getItem("auth_token");

    // Redirect if not authenticated
    if (!token) {
      toast.warning("Please register or login to request a quote.");
      navigate("/register", {
        state: { from: location.pathname },
      });
      return;
    }

    try {
      API.defaults.headers.common["Authorization"] = `Bearer ${token}`;

      await API.post("/quotes", {
        package_id: packageId,
        start_date: form.start_date,
        end_date: form.end_date,
        number_of_people: parseInt(form.number_of_people),
        estimated_price: parseInt(form.estimated_price),
        special_requests: form.special_requests,
      });

      toast.success("Quote request sent successfully!");
      onClose();
    } catch (err) {
      if (err.response?.data?.errors) {
        setErrors(err.response.data.errors);
        toast.error("Please fix the errors in the form.");
      } else {
        toast.error("Failed to send quote request.");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/30 backdrop-blur-sm flex justify-center items-center z-50">
      <div className="bg-white rounded-2xl p-6 w-[90%] max-w-md shadow-xl relative">
        <button
          className="absolute cursor-pointer top-4 right-4 text-red-600 text-xl font-bold"
          onClick={onClose}
        >
          ×
        </button>
        <h2 className="text-xl font-bold text-primary mb-6">
          Request This Trip
        </h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <p className="text-primary mb-1">Plan To Fly Duration</p>
            <Input
              label="From (Start Date)"
              name="start_date"
              type="date"
              value={form.start_date}
              onChange={handleChange}
              error={errors.start_date}
            />
            <Input
              label="To (End Date)"
              name="end_date"
              type="date"
              value={form.end_date}
              onChange={handleChange}
              error={errors.end_date}
            />
          </div>
          <Input
            label="Number of People"
            name="number_of_people"
            type="number"
            value={form.number_of_people}
            onChange={handleChange}
            error={errors.number_of_people}
          />

          <TextArea
            label="Special Requests"
            name="special_requests"
            value={form.special_requests}
            onChange={handleChange}
            error={errors.special_requests}
          />

          <div className="flex justify-between pt-2">
            <button
              type="submit"
              className="bg-red-600 cursor-pointer text-white px-6 py-2 rounded hover:bg-red-700 transition"
              disabled={loading}
            >
              {loading ? "Sending..." : "Send Request"}
            </button>
            <button
              type="button"
              className="bg-gray-500 cursor-pointer text-white px-6 py-2 rounded hover:bg-gray-700 transition"
              onClick={onClose}
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

const Input = ({ label, name, value, onChange, error, type = "text" }) => (
  <div>
    <label className="block text-sm font-medium text-gray-800 mb-1">
      {label}
    </label>
    <input
      type={type}
      name={name}
      value={value}
      onChange={onChange}
      className={`w-full p-3 rounded text-black border transition ${
        error ? "border-red-500" : "border-gray-300"
      }`}
    />
    {error && <p className="text-sm text-red-600">{error[0]}</p>}
  </div>
);

const TextArea = ({ label, name, value, onChange, error }) => (
  <div>
    <label className="block text-sm font-medium text-gray-800 mb-1">
      {label}
    </label>
    <textarea
      name={name}
      value={value}
      onChange={onChange}
      rows={4}
      className={`w-full p-3 text-black rounded border transition ${
        error ? "border-red-500" : "border-gray-300"
      }`}
    />
    {error && <p className="text-sm text-red-600">{error[0]}</p>}
  </div>
);

export default TripQuote;
