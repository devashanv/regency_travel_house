// import React from "react";

// export default function CustomerDetailModal({ customer, onClose }) {
//   return (
//     <div className="fixed inset-0 bg-black/40 z-100 flex justify-center items-center">
//       <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-lg">
//         <h2 className="text-xl font-semibold text-red-600 mb-4">
//           Customer Details
//         </h2>

//         <div className="space-y-2">
//           <p>
//             <strong>Full Name:</strong> {customer.full_name}
//           </p>
//           <p>
//             <strong>Email:</strong> {customer.email}
//           </p>
//           <p>
//             <strong>Phone:</strong> {customer.phone || "—"}
//           </p>
//           <p>
//             <strong>Address:</strong> {customer.address || "—"}
//           </p>
//           <p>
//             <strong>Country:</strong> {customer.country_of_residence || "—"}
//           </p>
//           <p>
//             <strong>Date of Birth:</strong> {customer.date_of_birth || "—"}
//           </p>
//           <p>
//             <strong>Bookings:</strong> {customer.bookings_count}
//           </p>
//           <p>
//             <strong>
//               {customer.id_type.charAt(1).toUpperCase() +
//                 customer.id_type.slice(1)}
//               :
//             </strong>{" "}
//             {customer.id_number}{" "}
//           </p>
//         </div>

//         <div className="mt-6 flex justify-end">
//           <button
//             onClick={onClose}
//             className="px-4 py-2 border cursor-pointer rounded hover:bg-gray-100"
//           >
//             Close
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// }


import React from "react";

export default function CustomerDetailModal({ customer, onClose }) {
  const idLabel = customer.id_type
    ? customer.id_type.charAt(0).toUpperCase() + customer.id_type.slice(1)
    : "ID Type";

  return (
    <div className="fixed inset-0 bg-black/40 z-100 flex justify-center items-center">
      <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-lg">
        <h2 className="text-xl font-semibold text-red-600 mb-4">
          Customer Details
        </h2>

        <div className="space-y-2">
          <p>
            <strong>Full Name:</strong> {customer.full_name}
          </p>
          <p>
            <strong>Email:</strong> {customer.email}
          </p>
          <p>
            <strong>Phone:</strong> {customer.phone || "—"}
          </p>
          <p>
            <strong>Address:</strong> {customer.address || "—"}
          </p>
          <p>
            <strong>Country:</strong> {customer.country_of_residence || "—"}
          </p>
          <p>
            <strong>Date of Birth:</strong> {customer.date_of_birth || "—"}
          </p>
          <p>
            <strong>Bookings:</strong> {customer.bookings_count}
          </p>
          <p>
            <strong>{idLabel}:</strong> {customer.id_number || "—"}
          </p>
        </div>

        <div className="mt-6 flex justify-end">
          <button
            onClick={onClose}
            className="px-4 py-2 border cursor-pointer rounded hover:bg-gray-100"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
}
