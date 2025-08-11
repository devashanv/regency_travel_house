// import React, { useEffect, useState } from "react";
// import API from "../../api/axiosClient";
// import { toast } from "react-toastify";
// import AdminHeader from "../../components/AdminHeader";
// import AdminSideNav from "../../components/AdminSideNav";
// import {
//   FaPlus,
//   FaTrash,
//   FaEdit,
//   FaChevronDown,
//   FaChevronUp,
//   FaFilter,
// } from "react-icons/fa";
// import ItineraryFormModal from "./ItineraryFormModal";

// export default function AllPackageItineraries() {
//   const [packages, setPackages] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [expanded, setExpanded] = useState({});
//   const [showModal, setShowModal] = useState(false);
//   const [selectedItinerary, setSelectedItinerary] = useState(null);
//   const [selectedPackageId, setSelectedPackageId] = useState(null);
//   const [editMode, setEditMode] = useState(false);

//   const fetchAll = async () => {
//     try {
//       const token = localStorage.getItem("auth_token");
//       API.defaults.headers.common["Authorization"] = `Bearer ${token}`;
//       const res = await API.get("/all-packages-itineraries");
//       setPackages(res.data);
//     } catch (err) {
//       toast.error("Failed to fetch packages with itineraries.");
//     } finally {
//       setLoading(false);
//     }
//   };

//   useEffect(() => {
//     fetchAll();
//   }, []);

//   const toggleExpand = (pkgId) => {
//     setExpanded((prev) => ({
//       ...prev,
//       [pkgId]: !prev[pkgId],
//     }));
//   };

//   const handleEdit = (pkgId, itinerary) => {
//     setSelectedPackageId(pkgId);
//     setSelectedItinerary(itinerary);
//     setEditMode(true);
//     setShowModal(true);
//   };

//   const handleAdd = (pkgId) => {
//     setSelectedPackageId(pkgId);
//     setSelectedItinerary(null);
//     setEditMode(false);
//     setShowModal(true);
//   };

//   const handleDelete = async (itineraryId, pkgId) => {
//     if (!window.confirm("Are you sure you want to delete this itinerary?"))
//       return;
//     try {
//       await API.delete(`/itineraries/${itineraryId}`);
//       const updatedPackages = packages.map((pkg) =>
//         pkg.id === pkgId
//           ? {
//               ...pkg,
//               itineraries: pkg.itineraries.filter((i) => i.id !== itineraryId),
//             }
//           : pkg
//       );
//       setPackages(updatedPackages);
//       toast.success("Itinerary deleted.");
//     } catch {
//       toast.error("Delete failed.");
//     }
//   };

//   const handleModalClose = () => {
//     setSelectedItinerary(null);
//     setSelectedPackageId(null);
//     setEditMode(false);
//     setShowModal(false);
//   };

//   const handleModalSubmit = (updated) => {
//     const updatedPackages = packages.map((pkg) => {
//       if (pkg.id === selectedPackageId) {
//         let newItineraries = [...pkg.itineraries];
//         if (editMode) {
//           newItineraries = newItineraries.map((it) =>
//             it.id === updated.id ? updated : it
//           );
//         } else {
//           newItineraries.push(updated);
//         }
//         return { ...pkg, itineraries: newItineraries };
//       }
//       return pkg;
//     });

//     setPackages(updatedPackages);
//     handleModalClose();
//     toast.success(editMode ? "Itinerary updated." : "Itinerary added.");
//   };

//   const itemsPerPage = 5;
//   const [currentPage, setCurrentPage] = useState(1);
//   const indexOfLastItem = currentPage * itemsPerPage;
//   const indexOfFirstItem = indexOfLastItem - itemsPerPage;
//   const currentPackages = packages.slice(indexOfFirstItem, indexOfLastItem);
//   const totalPages = Math.ceil(packages.length / itemsPerPage);

//   return (
//     <div className="min-h-screen bg-gray-50">
//       <AdminHeader />
//       <div className="flex">
//         <div className="w-1/6 h-auto ">
//           <AdminSideNav />
//         </div>
//         <div className="w-5/6 h-auto pt-10">
//           {" "}
//           <main className="flex-1 p-6">
//             <div className="flex justify-between items-center mb-4">
//               <h1 className="text-2xl font-semibold mb-6">
//                 All <span className="text-red-600">Package Itineraries</span>
//               </h1>
//             </div>

//             {/* Filters */}
//             <div className="flex flex-wrap gap-4 items-end mb-6">
              
//               <div>
//                 <label className="block text-sm font-medium mb-1">
//                   Package
//                 </label>
//                 <select
//                   className="border-gray-300 cursor-pointer border rounded-md px-3 py-2 w-48"
//                 >
//                   <option value="all">All Packages</option>
//                   {packages.map((pkg) => (
//                     <option key={pkg.id} value={pkg.id}>
//                       {pkg.title}
//                     </option>
//                   ))}
//                 </select>
//               </div>

//               <div>

//               </div>

//               <button
//                 // onClick={applyFilters}
//                 className="flex items-center gap-2 border cursor-pointer border-gray-300 rounded-md px-4 py-2 hover:bg-gray-100"
//               >
//                 <FaFilter /> Apply Filters
//               </button>

//               <button
//                 // onClick={resetFilters}
//                 className="flex items-center gap-2 border cursor-pointer border-gray-300 text-gray-700 rounded-md px-4 py-2 hover:bg-gray-100"
//               >
//                 Reset
//               </button>
//             </div>

//             {loading ? (
//               <p>Loading...</p>
//             ) : packages.length === 0 ? (
//               <p>No packages found.</p>
//             ) : (
//               currentPackages.map((pkg) => (
//                 <div
//                   key={pkg.id}
//                   className="mb-8 border border-gray-300 rounded p-4 bg-white shadow"
//                 >
//                   <div
//                     className="flex justify-between items-center cursor-pointer"
//                     onClick={() => toggleExpand(pkg.id)}
//                   >
//                     <div>
//                       <h2 className="text-lg font-semibold text-gray-700">
//                         {pkg.title || pkg.name}
//                       </h2>
//                       <p className="text-sm text-gray-600 mb-1">
//                         Duration: {pkg.duration_days} days
//                       </p>
//                     </div>
//                     <div className="text-xl text-gray-600 hover:text-gray-800">
//                       {expanded[pkg.id] ? <FaChevronUp /> : <FaChevronDown />}
//                     </div>
//                   </div>

//                   {expanded[pkg.id] && (
//                     <>
//                       <div className="mt-3 mb-2 flex justify-end">
//                         <button
//                           onClick={() => handleAdd(pkg.id)}
//                           className="bg-red-600 text-white px-3 py-1 text-sm rounded flex items-center gap-2 hover:bg-red-700"
//                         >
//                           <FaPlus /> Add Day
//                         </button>
//                       </div>

//                       {pkg.itineraries.length === 0 ? (
//                         <p className="text-gray-500 italic">
//                           No itineraries yet.
//                         </p>
//                       ) : (
//                         <ul className="space-y-2 mt-3">
//                           {pkg.itineraries.map((i) => (
//                             <li
//                               key={i.id}
//                               className="border border-gray-300 px-4 py-2 rounded bg-gray-50 flex justify-between items-start gap-4"
//                             >
//                               <div>
//                                 <p className="font-medium text-gray-800">
//                                   Day {i.day_number}: {i.title}
//                                 </p>
//                                 <p className="text-sm text-gray-600">
//                                   {i.description}
//                                 </p>
//                                 <p className="text-xs text-gray-500 italic">
//                                   📍 {i.location}
//                                 </p>
//                               </div>
//                               <div className="flex gap-2">
//                                 <button
//                                   onClick={() => handleEdit(pkg.id, i)}
//                                   className="bg-yellow-100 text-yellow-600 px-3 py-1 text-xs rounded flex items-center gap-1 hover:bg-yellow-200"
//                                 >
//                                   <FaEdit /> Edit
//                                 </button>
//                                 <button
//                                   onClick={() => handleDelete(i.id, pkg.id)}
//                                   className="bg-red-100 text-red-600 px-3 py-1 text-xs rounded flex items-center gap-1 hover:bg-red-200"
//                                 >
//                                   <FaTrash /> Delete
//                                 </button>
//                               </div>
//                             </li>
//                           ))}
//                         </ul>
//                       )}
//                     </>
//                   )}
//                 </div>
//               ))
//             )}
//             <div className="flex justify-between items-center mt-6">
//               <button
//                 onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
//                 disabled={currentPage === 1}
//                 className="px-4 py-2 bg-gray-200 rounded disabled:opacity-50"
//               >
//                 Previous
//               </button>
//               <span className="text-sm text-gray-600">
//                 Page {currentPage} of {totalPages}
//               </span>
//               <button
//                 onClick={() =>
//                   setCurrentPage((prev) => Math.min(prev + 1, totalPages))
//                 }
//                 disabled={currentPage === totalPages}
//                 className="px-4 py-2 bg-gray-200 cursor-pointer rounded disabled:opacity-50"
//               >
//                 Next
//               </button>
//             </div>

//             {showModal && (
//               <ItineraryFormModal
//                 packageId={selectedPackageId}
//                 editMode={editMode}
//                 initialData={selectedItinerary}
//                 onClose={handleModalClose}
//                 onSubmit={handleModalSubmit}
//               />
//             )}
//           </main>
//         </div>
//       </div>
//     </div>
//   );
// }








import React, { useEffect, useState } from "react";
import API from "../../api/axiosClient";
import { toast } from "react-toastify";
import AdminHeader from "../../components/AdminHeader";
import AdminSideNav from "../../components/AdminSideNav";
import {
  FaPlus,
  FaTrash,
  FaEdit,
  FaChevronDown,
  FaChevronUp,
  FaFilter,
} from "react-icons/fa";
import ItineraryFormModal from "./ItineraryFormModal";

export default function AllPackageItineraries() {
  const [packages, setPackages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [expanded, setExpanded] = useState({});
  const [showModal, setShowModal] = useState(false);
  const [selectedItinerary, setSelectedItinerary] = useState(null);
  const [selectedPackageId, setSelectedPackageId] = useState(null);
  const [editMode, setEditMode] = useState(false);

  const [filters, setFilters] = useState({
    package_id: "all",
    location: "",
    day_number: "",
    day_from: "",
    day_to: "",
  });

  const handleChange = (e) => {
    setFilters({
      ...filters,
      [e.target.name]: e.target.value,
    });
  };

  const fetchAll = async () => {
    try {
      const token = localStorage.getItem("auth_token");
      API.defaults.headers.common["Authorization"] = `Bearer ${token}`;
      const res = await API.get("/all-packages-itineraries");
      setPackages(res.data);
    } catch (err) {
      toast.error("Failed to fetch packages with itineraries.");
    } finally {
      setLoading(false);
    }
  };

  const applyFilters = async () => {
    try {
      const res = await API.get("/admin/itineraries/filter", {
        params: filters,
      });
      const filteredData = {};

      // Reorganize data by package_id
      res.data.forEach((item) => {
        if (!filteredData[item.package.id]) {
          filteredData[item.package.id] = {
            ...item.package,
            itineraries: [],
          };
        }
        filteredData[item.package.id].itineraries.push(item);
      });

      setPackages(Object.values(filteredData));
    } catch (error) {
      toast.error("Failed to apply filters.");
      console.error(error);
    }
  };

  const resetFilters = () => {
    const reset = {
      package_id: "all",
      location: "",
      day_number: "",
      day_from: "",
      day_to: "",
    };
    setFilters(reset);
    fetchAll();
  };

  useEffect(() => {
    fetchAll();
  }, []);

  const toggleExpand = (pkgId) => {
    setExpanded((prev) => ({
      ...prev,
      [pkgId]: !prev[pkgId],
    }));
  };

  const handleEdit = (pkgId, itinerary) => {
    setSelectedPackageId(pkgId);
    setSelectedItinerary(itinerary);
    setEditMode(true);
    setShowModal(true);
  };

  const handleAdd = (pkgId) => {
    setSelectedPackageId(pkgId);
    setSelectedItinerary(null);
    setEditMode(false);
    setShowModal(true);
  };

  const handleDelete = async (itineraryId, pkgId) => {
    if (!window.confirm("Are you sure you want to delete this itinerary?")) return;
    try {
      await API.delete(`/itineraries/${itineraryId}`);
      const updatedPackages = packages.map((pkg) =>
        pkg.id === pkgId
          ? {
              ...pkg,
              itineraries: pkg.itineraries.filter((i) => i.id !== itineraryId),
            }
          : pkg
      );
      setPackages(updatedPackages);
      toast.success("Itinerary deleted.");
    } catch {
      toast.error("Delete failed.");
    }
  };

  const handleModalClose = () => {
    setSelectedItinerary(null);
    setSelectedPackageId(null);
    setEditMode(false);
    setShowModal(false);
  };

  const handleModalSubmit = (updated) => {
    const updatedPackages = packages.map((pkg) => {
      if (pkg.id === selectedPackageId) {
        let newItineraries = [...pkg.itineraries];
        if (editMode) {
          newItineraries = newItineraries.map((it) =>
            it.id === updated.id ? updated : it
          );
        } else {
          newItineraries.push(updated);
        }
        return { ...pkg, itineraries: newItineraries };
      }
      return pkg;
    });

    setPackages(updatedPackages);
    handleModalClose();
    toast.success(editMode ? "Itinerary updated." : "Itinerary added.");
  };

  const itemsPerPage = 5;
  const [currentPage, setCurrentPage] = useState(1);
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentPackages = packages.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(packages.length / itemsPerPage);

  return (
    <div className="min-h-screen bg-gray-50">
      <AdminHeader />
      <div className="flex">
        <div className="w-1/6">
          <AdminSideNav />
        </div>
        <div className="w-5/6 pt-10">
          <main className="flex-1 p-6">
            <h1 className="text-2xl font-semibold mb-6">
              All <span className="text-red-600">Package Itineraries</span>
            </h1>

            {/* Filters */}
            <div className="flex flex-wrap gap-4 items-end mb-6">
              <div>
                <label className="block text-sm font-medium mb-1">Package</label>
                <select
                  name="package_id"
                  value={filters.package_id}
                  onChange={handleChange}
                  className="border-gray-300 border rounded-md px-3 py-2 w-48"
                >
                  <option value="all">All Packages</option>
                  {packages.map((pkg) => (
                    <option key={pkg.id} value={pkg.id}>
                      {pkg.title}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium mb-1">Location</label>
                <input
                  type="text"
                  name="location"
                  value={filters.location}
                  onChange={handleChange}
                  className="border-gray-300 border rounded-md px-3 py-2 w-48"
                  placeholder="Enter location"
                />
              </div>


              <div className="flex gap-2 mt-5">
                <button
                  onClick={applyFilters}
                  className="flex items-center gap-2 border cursor-pointer border-gray-300 rounded-md px-4 py-2 hover:bg-gray-100"
                >
                  <FaFilter /> Apply Filters
                </button>

                <button
                  onClick={resetFilters}
                  className="flex items-center gap-2 border cursor-pointer border-gray-300 text-gray-700 rounded-md px-4 py-2 hover:bg-gray-100"
                >
                  Reset
                </button>
              </div>
            </div>

            {loading ? (
              <p>Loading...</p>
            ) : currentPackages.length === 0 ? (
              <p>No packages found.</p>
            ) : (
              currentPackages.map((pkg) => (
                <div key={pkg.id} className="mb-8 border border-gray-300 rounded p-4 bg-white shadow">
                  <div
                    className="flex justify-between items-center cursor-pointer"
                    onClick={() => toggleExpand(pkg.id)}
                  >
                    <div>
                      <h2 className="text-lg font-semibold text-gray-700">
                        {pkg.title || pkg.name}
                      </h2>
                      <p className="text-sm text-gray-600 mb-1">
                        Duration: {pkg.duration_days} days
                      </p>
                    </div>
                    <div className="text-xl text-gray-600 hover:text-gray-800">
                      {expanded[pkg.id] ? <FaChevronUp /> : <FaChevronDown />}
                    </div>
                  </div>

                  {expanded[pkg.id] && (
                    <>
                      <div className="mt-3 mb-2 flex justify-end">
                        <button
                          onClick={() => handleAdd(pkg.id)}
                          className="bg-red-600 text-white px-3 py-1 text-sm rounded flex items-center gap-2 hover:bg-red-700"
                        >
                          <FaPlus /> Add Day
                        </button>
                      </div>

                      {pkg.itineraries.length === 0 ? (
                        <p className="text-gray-500 italic">No itineraries yet.</p>
                      ) : (
                        <ul className="space-y-2 mt-3">
                          {pkg.itineraries.map((i) => (
                            <li
                              key={i.id}
                              className="border border-gray-300 px-4 py-2 rounded bg-gray-50 flex justify-between items-start gap-4"
                            >
                              <div>
                                <p className="font-medium text-gray-800">
                                  Day {i.day_number}: {i.title}
                                </p>
                                <p className="text-sm text-gray-600">{i.description}</p>
                                <p className="text-xs text-gray-500 italic">📍 {i.location}</p>
                              </div>
                              <div className="flex gap-2">
                                <button
                                  onClick={() => handleEdit(pkg.id, i)}
                                  className="bg-yellow-100 text-yellow-600 px-3 py-1 text-xs rounded flex items-center gap-1 hover:bg-yellow-200"
                                >
                                  <FaEdit /> Edit
                                </button>
                                <button
                                  onClick={() => handleDelete(i.id, pkg.id)}
                                  className="bg-red-100 text-red-600 px-3 py-1 text-xs rounded flex items-center gap-1 hover:bg-red-200"
                                >
                                  <FaTrash /> Delete
                                </button>
                              </div>
                            </li>
                          ))}
                        </ul>
                      )}
                    </>
                  )}
                </div>
              ))
            )}

            {/* Pagination */}
            <div className="flex justify-between items-center mt-6">
              <button
                onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
                disabled={currentPage === 1}
                className="px-4 py-2 bg-gray-200 rounded disabled:opacity-50"
              >
                Previous
              </button>
              <span className="text-sm text-gray-600">
                Page {currentPage} of {totalPages}
              </span>
              <button
                onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
                disabled={currentPage === totalPages}
                className="px-4 py-2 bg-gray-200 rounded disabled:opacity-50"
              >
                Next
              </button>
            </div>

            {showModal && (
              <ItineraryFormModal
                packageId={selectedPackageId}
                editMode={editMode}
                initialData={selectedItinerary}
                onClose={handleModalClose}
                onSubmit={handleModalSubmit}
              />
            )}
          </main>
        </div>
      </div>
    </div>
  );
}
