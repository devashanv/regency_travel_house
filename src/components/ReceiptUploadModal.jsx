import React, { useEffect, useState } from "react";
import { FaCalendarAlt, FaUserFriends, FaMoon } from "react-icons/fa";
import { toast } from "react-toastify";
import API from "../api/axiosClient";

const ReceiptUploadModal = ({ booking, onClose }) => {
  const [profile, setProfile] = useState({
    full_name: "",
    email: "",
    phone: "",
    country_of_residence: "",
    id_type: "",
  });

  const [receiptFile, setReceiptFile] = useState(null);
  const [updating, setUpdating] = useState(false);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const res = await API.get("/customer/profile");
        setProfile(res.data);
      } catch (err) {
        console.error("Failed to load profile", err);
        toast.error("Failed to load profile");
      }
    };
    fetchProfile();
  }, []);

  const handleProfileChange = (e) => {
    const { name, value } = e.target;
    setProfile((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async () => {
    setUpdating(true);
    const token = localStorage.getItem("auth_token");
    API.defaults.headers.common["Authorization"] = `Bearer ${token}`;
    const customerId = booking.customer_id || booking.customer?.id;

    try {
      // Step 1: Update customer profile
      await API.put(`/customers/${customerId}`, profile);

      // Step 2: Only continue if receipt selected
      if (!receiptFile) {
        toast.info("Profile updated. No receipt uploaded.");
        onClose();
        return;
      }

      // Step 3: Upload booking receipt and metadata
      const formData = new FormData();
      formData.append("payment_reference", receiptFile);
      // formData.append("start_date", booking.start_date);
      // formData.append("end_date", booking.end_date);
      // formData.append("travel_date", booking.travel_date);
      // formData.append("number_of_people", booking.number_of_travelers); // match backend field
      // formData.append("special_requests", booking.special_requests || "");

      // await API.put(`/bookings/${booking.id}/customer-update`, formData);
      await API.post(`/bookings/${booking.id}/update`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      toast.success("Receipt uploaded successfully.");
      onClose();
    } catch (err) {
      console.error("Upload error:", err);
      toast.error("Failed to upload receipt or update data.");
    } finally {
      setUpdating(false);
    }
  };

  return (
    <div className="fixed inset-0 z-100 bg-black/50 backdrop-blur-sm flex justify-center items-center">
      <div className="bg-white p-6 rounded-xl w-full max-w-3xl shadow-lg overflow-y-auto max-h-[90vh]">
        <h3 className="text-xl font-semibold mb-4 text-blue-600">
          Update Your Details & Upload Receipt
        </h3>

        <div className="flex justify-between items-center mb-2">
          <h3 className="text-lg font-semibold">{booking.package?.title}</h3>
          <span
            className={`text-xs font-medium px-3 py-1 rounded-full ${
              booking.status === "confirmed"
                ? "bg-green-100 text-green-700"
                : "bg-yellow-100 text-yellow-700"
            }`}
          >
            {booking.status?.toUpperCase()}
          </span>
        </div>

        {/* Profile Section */}
        {/* <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm mb-6">
          {[
            ["full_name", "Full Name"],
            ["email", "Email"],
            ["phone", "Phone"],
            ["id_number", "Passport or NIC"],
          ].map(([field, label]) => (
            <div key={field}>
              <div className="flex">
              <label className="flex items-center gap-1">
                <input
                  type="radio"
                  name="id_type"
                  value="passport"
                  checked={profile.id_type === "passport"}
                  onChange={handleProfileChange}
                />
                Passport
              </label>

              <label className="flex items-center gap-1">
                <input
                  type="radio"
                  name="id_type"
                  value="nic"
                  checked={profile.id_type === "nic"}
                  onChange={handleProfileChange}
                />
                NIC
              </label>
              </div>
              <label className="block text-gray-600">{label}</label>
              <input
                type={field.includes("date") ? "date" : "text"}
                name={field}
                value={profile[field] || ""}
                onChange={handleProfileChange}
                className="w-full border px-3 py-2 rounded"
              />
            </div>
          ))}
        </div> */}

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm mb-6">
          {/* Identification Number + Radio Buttons */}
          <div className="md:col-span-2">
            {/* <label className="block text-gray-600 mb-1">
              Identification Number
            </label> */}
            <div className="flex flex-col md:flex-row md:items-center gap-3">
              {/* <input
                type="text"
                name="id_number"
                value={profile.id_number}
                onChange={handleProfileChange}
                placeholder="Enter Passport or ID Number"
                className="flex-1 border px-3 py-2 rounded"
              /> */}

              {/* <div className="flex items-center gap-4">
        <label className="flex items-center gap-1">
          <input
            type="radio"
            name="id_type"
            value="passport"
            checked={profile.id_type === "passport"}
            onChange={handleProfileChange}
          />
          Passport
        </label>

        <label className="flex items-center gap-1">
          <input
            type="radio"
            name="id_type"
            value="nic"
            checked={profile.id_type === "nic"}
            onChange={handleProfileChange}
          />
          ID
        </label>
      </div> */}

              <div className="w-full">
                <label className="block text-sm font-medium mb-1">
                  ID Type
                </label>

                <div className="flex items-center gap-4 mb-2 text-sm w-full">
                  <label className="flex items-center gap-1">
                    <input
                      type="radio"
                      name="id_type"
                      value="passport"
                      checked={profile.id_type === "passport"}
                      onChange={handleProfileChange}
                    />
                    Passport
                  </label>

                  <label className="flex items-center gap-1">
                    <input
                      type="radio"
                      name="id_type"
                      value="nic"
                      checked={profile.id_type === "nic"}
                      onChange={handleProfileChange}
                    />
                    ID
                  </label>

                  {profile.id_type && (
                    <input
                      name="id_number"
                      value={profile.id_number}
                      onChange={handleProfileChange}
                      placeholder={
                        profile.id_type === "passport"
                          ? "Enter Passport Number"
                          : "Enter ID Number"
                      }
                      maxLength={profile.id_type === "passport" ? 9 : 12}
                      className="w-full rounded border border-gray-400 px-4 py-2 text-sm"
                    />
                  )}
                </div>
              </div>
            </div>
          </div>

          {/* Remaining Fields */}
          {[
            ["full_name", "Full Name"],
            ["email", "Email"],
            ["phone", "Phone"],
            ["address", "Address"],
          ].map(([field, label]) => (
            <div key={field}>
              <label className="block text-gray-600 mb-1">{label}</label>
              <input
                type={field.includes("date") ? "date" : "text"}
                name={field}
                value={profile[field] || ""}
                onChange={handleProfileChange}
                className="w-full border px-3 py-2 rounded"
                placeholder={`Enter ${label}`}
              />
            </div>
          ))}
        </div>

        <div className="pb-3">
          <p className="text-red-500 text-sm">
            * If you have any changes of booking, please contact us.
          </p>
        </div>

        {/* Booking Overview */}
        <div className="grid grid-cols-3 gap-4 text-center text-sm mb-4">
          <div>
            <FaCalendarAlt className="mx-auto text-blue-500 mb-1" />
            <p className="font-semibold">{booking.travel_date}</p>
            <p className="text-xs text-gray-500">Travel Date</p>
          </div>
          <div>
            <FaMoon className="mx-auto text-blue-500 mb-1" />
            <p className="font-semibold">
              {(booking.package?.duration_days ?? 1) - 1}
            </p>
            <p className="text-xs text-gray-500">Nights</p>
          </div>
          <div>
            <FaUserFriends className="mx-auto text-blue-500 mb-1" />
            <p className="font-semibold">{booking.number_of_travelers}</p>
            <p className="text-xs text-gray-500">People</p>
          </div>
        </div>

        {/* File Upload */}
        <div className="mb-4">
          <label className="block mb-1 cursor-pointer text-sm font-medium text-gray-700">
            Upload Payment Receipt (PDF/Image)
          </label>

          <input
            type="file"
            accept="image/*,.pdf"
            onChange={(e) => setReceiptFile(e.target.files[0])}
            className="block w-full text-sm cursor-pointer text-gray-500
                file:mr-4 file:py-2 file:px-4
                file:rounded-full file:border-0
                file:text-sm file:font-semibold
                file:bg-blue-50 file:text-blue-700
                hover:file:bg-red-100
                disabled:opacity-50"
          />
        </div>

        {/* Actions */}
        <div className="flex justify-end gap-4">
          <button
            onClick={onClose}
            className="px-4 py-2 border rounded hover:bg-gray-100 cursor-pointer"
            disabled={updating}
          >
            Cancel
          </button>
          <button
            onClick={handleSubmit}
            className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 cursor-pointer"
            disabled={updating}
          >
            {updating ? "Saving..." : "Save Changes"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default ReceiptUploadModal;
