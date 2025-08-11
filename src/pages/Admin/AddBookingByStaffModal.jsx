// import React, { useEffect, useState } from "react";
// import API from "../../api/axiosClient";
// import "react-toastify/dist/ReactToastify.css";
// import { toast, ToastContainer } from "react-toastify";

// export default function AddBookingByStaffModal({ onClose, onBookingAdded }) {
//   useEffect(() => {
//     window.scrollTo(0, 0);
//   }, []);

//   const [form, setForm] = useState({
//     customer_id: "",
//     package_id: "",
//     travel_date: "",
//     number_of_travelers: 1,
//     points_to_redeem: "",
//   });

//   const [customers, setCustomers] = useState([]);
//   const [packages, setPackages] = useState([]);
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState("");

//   // Fetch customers & packages
//   useEffect(() => {
//     const fetchData = async () => {
//       try {
//         const [custRes, packRes] = await Promise.all([
//           API.get("/customer/all"),
//           API.get("/packages"),
//         ]);
//         setCustomers(custRes.data);
//         setPackages(packRes.data);
//       } catch (err) {
//         console.error("Failed to fetch data", err);
//         toast.error("Error loading customer or package list");
//       }
//     };

//     fetchData();
//   }, []);

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setForm((prev) => ({ ...prev, [name]: value }));
//   };

//   const handleSubmit = async () => {
//     if (!form.customer_id || !form.package_id || !form.travel_date) {
//       setError("Please fill all required fields.");
//       return;
//     }

//     setLoading(true);
//     setError("");
//     try {
//       const res = await API.post("/staff/bookings", {
//         ...form,
//         points_to_redeem: form.points_to_redeem || 0,
//       });

//       toast.success("Booking created successfully!");

//       // Trigger parent refresh via callback
//       if (onBookingAdded) {
//         onBookingAdded(res.data);  // Pass new booking data to parent
//       }

//       onClose();  // Close modal
//     } catch (err) {
//       console.error("Booking failed", err);
//       setError(
//         err.response?.data?.message || "Failed to create booking. Check inputs."
//       );
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div className="fixed inset-0 z-100 flex items-center justify-center bg-black/30">
//       <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-2xl max-h-[90vh] overflow-y-auto">
//         <h2 className="text-xl font-semibold mb-4 text-red-600">
//           Add Booking for Customer
//         </h2>

//         <div className="space-y-3">
//           {/* Customer Dropdown */}
//           <div>
//             <label className="block text-sm font-medium">Customer</label>
//             <select
//               name="customer_id"
//               value={form.customer_id}
//               onChange={handleChange}
//               className="w-full border border-gray-300 rounded px-4 py-2"
//             >
//               <option value="">-- Select Customer --</option>
//               {customers.map((c) => (
//                 <option key={c.id} value={c.id}>
//                   {c.full_name} ({c.email})
//                 </option>
//               ))}
//             </select>
//           </div>

//           {/* Package Dropdown */}
//           <div>
//             <label className="block text-sm font-medium">Package</label>
//             <select
//               name="package_id"
//               value={form.package_id}
//               onChange={handleChange}
//               className="w-full border border-gray-300 rounded px-4 py-2"
//             >
//               <option value="">-- Select Package --</option>
//               {packages.map((p) => (
//                 <option key={p.id} value={p.id}>
//                   {p.title} ({p.destination?.country || "Unknown"})
//                 </option>
//               ))}
//             </select>
//           </div>

//           {/* Date & Travelers */}
//           <div>
//             <label className="block text-sm font-medium">Travel Date</label>
//             <input
//               type="date"
//               name="travel_date"
//               value={form.travel_date}
//               onChange={handleChange}
//               className="w-full border px-4 py-2 rounded"
//             />
//           </div>

//           <div>
//             <label className="block text-sm font-medium">
//               Number of Travelers
//             </label>
//             <input
//               type="number"
//               name="number_of_travelers"
//               value={form.number_of_travelers}
//               onChange={handleChange}
//               className="w-full border px-4 py-2 rounded"
//               min={1}
//             />
//           </div>

//           <div>
//             <label className="block text-sm font-medium">
//               Points to Redeem (optional)
//             </label>
//             <input
//               type="number"
//               name="points_to_redeem"
//               value={form.points_to_redeem}
//               onChange={handleChange}
//               className="w-full border px-4 py-2 rounded"
//               min={0}
//             />
//           </div>

//           {error && <p className="text-red-600 text-sm">{error}</p>}
//         </div>

//         <div className="flex justify-end gap-4 mt-6">
//           <button
//             className="px-4 py-2 border cursor-pointer rounded hover:bg-gray-100"
//             onClick={onClose}
//             disabled={loading}
//           >
//             Cancel
//           </button>
//           <button
//             className="px-4 py-2 bg-red-600 text-white cursor-pointer rounded hover:bg-red-700"
//             onClick={handleSubmit}
//             disabled={loading}
//           >
//             {loading ? "Saving..." : "Save Booking"}
//           </button>
//         </div>
//       </div>
//       <ToastContainer position="top-right" autoClose={3000} />
//     </div>
//   );
// }

import React, { useEffect, useState } from "react";
import API from "../../api/axiosClient";
import { toast,ToastContainer } from "react-toastify";

export default function AddBookingByStaffModal({ onClose, onBookingAdded }) {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const [form, setForm] = useState({
    customer_id: "",
    package_id: "",
    travel_date: "",
    number_of_travelers: 1,
    points_to_redeem: "",
  });

  const [customers, setCustomers] = useState([]);
  const [packages, setPackages] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  // Fetch customers & packages
  useEffect(() => {
    const fetchData = async () => {
      try {
        const [custRes, packRes] = await Promise.all([
          API.get("/customer/all"),
          API.get("/packages"),
        ]);
        setCustomers(custRes.data);
        setPackages(packRes.data);
      } catch (err) {
        console.error("Failed to fetch data", err);
        toast.error("Error loading customer or package list");
      }
    };

    fetchData();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async () => {
    if (!form.customer_id || !form.package_id || !form.travel_date) {
      setError("Please fill all required fields.");
      return;
    }

    setLoading(true);
    setError("");
    try {
      const res = await API.post("/staff/bookings", {
        ...form,
        points_to_redeem: form.points_to_redeem || 0,
      });

      toast.success("Booking created successfully!");

      if (onBookingAdded) {
        onBookingAdded(res.data);
      }

      onClose();
    } catch (err) {
      console.error("Booking failed", err);
      setError(
        err.response?.data?.message || "Failed to create booking. Check inputs."
      );
      toast.error("Failed to create booking. Check inputs.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-100 flex items-center justify-center bg-black/30">
      <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-2xl max-h-[90vh] overflow-y-auto">
        <h2 className="text-xl font-semibold mb-4 text-red-600">
          Add Booking for Customer
        </h2>

        <div className="space-y-3">
          {/* Customer Dropdown */}
          <div>
            <label className="block text-sm font-medium">Customer</label>
            <select
              name="customer_id"
              value={form.customer_id}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded px-4 py-2"
            >
              <option value="">-- Select Customer --</option>
              {customers.map((c) => (
                <option key={c.id} value={c.id}>
                  {c.full_name} ({c.email})
                </option>
              ))}
            </select>
          </div>

          {/* Package Dropdown */}
          <div>
            <label className="block text-sm font-medium">Package</label>
            <select
              name="package_id"
              value={form.package_id}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded px-4 py-2"
            >
              <option value="">-- Select Package --</option>
              {packages.map((p) => (
                <option key={p.id} value={p.id}>
                  {p.title} ({p.destination?.country || "Unknown"})
                </option>
              ))}
            </select>
          </div>

          {/* Date & Travelers */}
          <div>
            <label className="block text-sm font-medium">Travel Date</label>
            <input
              type="date"
              name="travel_date"
              value={form.travel_date}
              onChange={handleChange}
              className="w-full border px-4 py-2 rounded"
            />
          </div>

          <div>
            <label className="block text-sm font-medium">
              Number of Travelers
            </label>
            <input
              type="number"
              name="number_of_travelers"
              value={form.number_of_travelers}
              onChange={handleChange}
              className="w-full border px-4 py-2 rounded"
              min={1}
            />
          </div>

          <div>
            <label className="block text-sm font-medium">
              Points to Redeem (optional)
            </label>
            <input
              type="number"
              name="points_to_redeem"
              value={form.points_to_redeem}
              onChange={handleChange}
              className="w-full border px-4 py-2 rounded"
              min={0}
            />
          </div>

          {error && <p className="text-red-600 text-sm">{error}</p>}
        </div>

        <div className="flex justify-end gap-4 mt-6">
          <button
            className="px-4 py-2 border cursor-pointer rounded hover:bg-gray-100"
            onClick={onClose}
            disabled={loading}
          >
            Cancel
          </button>
          <button
            className="px-4 py-2 bg-red-600 text-white cursor-pointer rounded hover:bg-red-700"
            onClick={handleSubmit}
            disabled={loading}
          >
            {loading ? "Saving..." : "Save Booking"}
          </button>
        </div>
      </div>
      <ToastContainer position="top-right" autoClose={3000} />
    </div>
  );
}
