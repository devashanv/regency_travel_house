import React from "react";

export default function DestinationDetailModal({ destination, onClose }) {
  return (
    <div className="fixed inset-0 z-100 flex items-center justify-center bg-black/30">
      <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-2xl overflow-y-auto max-h-[90vh]">
        <h2 className="text-xl font-semibold mb-4">Destination Details</h2>

        <div className="space-y-2">
          <div>
            <strong>Name:</strong> {destination.name}
          </div>
          <div>
            <strong>Location:</strong> {destination.location || "N/A"}
          </div>
          <div>
            <strong>Description:</strong>
            <p className="mt-1 text-gray-700">{destination.description || "N/A"}</p>
          </div>

          <div className="mt-4">
            <strong>Associated Packages:</strong>
            <ul className="list-disc ml-5 mt-1 text-sm">
              {destination.packages?.length > 0 ? (
                destination.packages.map((p) => (
                  <li key={p.id}>
                    {p.title} (${p.price_per_person}) - {p.duration_days} Days
                  </li>
                ))
              ) : (
                <li>No packages found.</li>
              )}
            </ul>
          </div>
        </div>

        <div className="flex justify-end gap-4 mt-6">
          <button
            onClick={onClose}
            className="px-4 py-2 cursor-pointer  bg-gray-200 hover:bg-gray-300 rounded"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
}
