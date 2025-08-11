import React, { useEffect, useState } from "react";
import SideNav from "../../components/SideNav";
import NavBar from "../../components/NavBar";
import API from "../../api/axiosClient";
import ReceiptUploadModal from "../../components/ReceiptUploadModal";
import {
  FaCalendarAlt,
  FaUserFriends,
  FaMoon,
  FaMapMarkerAlt,
  FaLeaf,
  FaUpload,
} from "react-icons/fa";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Transactions = () => {
  const [bookings, setBookings] = useState([]);
  const [selectedBooking, setSelectedBooking] = useState(null);
  const [bookingImages, setBookingImages] = useState({});

  const fetchHeroImage = async (packageId) => {
    try {
      const res = await API.get(`/packages/${packageId}/images/hero`);
      if (res.data?.filename) {
        return `https://portal.knowmo.me/storage/images/${res.data.filename}`;
      }
    } catch (error) {
      console.error("Failed to load hero image", error);
    }
    return "https://via.placeholder.com/300"; // fallback
  };

  useEffect(() => {
    const token = localStorage.getItem("auth_token");
    if (token) {
      API.defaults.headers.common["Authorization"] = `Bearer ${token}`;

      API.get("/booking/transactions").then(async (res) => {
        setBookings(res.data);

        const images = {};
        for (const booking of res.data) {
          const packageId = booking.package?.id;
          if (packageId) {
            images[booking.id] = await fetchHeroImage(packageId);
          }
        }
        setBookingImages(images);
      });
    }
  }, []);

  return (
    <>
      <ToastContainer position="top-right" autoClose={3000} />
      <div className="relative h-screen">
        {/* Navbar Section */}
        <div className="relative w-full top-0">
          <NavBar />
        </div>

        {/* SideNav Section */}
        <div className="  flex w-full flex-row ">
          {/* Sidenav */}
          <div className=" lg:block lg:w-1/6 h-screen relative">
            {" "}
            <SideNav />
          </div>

          {/* Bodycontent */}
          <div className="w-full lg:w-5/6 h-screen overflow-y-auto">
            <div className="flex">
              <div className="h-auto "></div>

              <main className="flex-1 p-6 bg-gray-50 overflow-y-auto min-h-screen">
                <h2 className="lg:ml-9 text-2xl font-bold mb-6">
                  My <span className="text-blue-600">Transactions</span>
                </h2>

                {bookings.length === 0 ? (
                  <div className="text-center text-gray-500 py-16">
                    <p className="text-lg font-semibold">
                      No transactions found.
                    </p>
                    <p className="text-sm mt-1">
                      Your tour bookings and uploads will appear here.
                    </p>
                  </div>
                ) : (
                  <div className="lg:ml-9 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {bookings.map((booking) => (
                      <div
                        key={booking.id}
                        className="bg-white rounded-2xl shadow-md  hover:shadow-lg transition p-4 flex flex-col"
                      >
                        <img
                          src={
                            bookingImages[booking.id] ||
                            "https://via.placeholder.com/300"
                          }
                          alt={booking.package?.title || "Booking"}
                          className="rounded-xl w-full h-44 object-cover mb-4"
                        />

                        <div className="flex justify-between items-center mb-2">
                          <h3 className="text-lg font-semibold">
                            {booking.package?.title}
                          </h3>
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

                        <p className="text-sm text-gray-500 flex items-center mb-4">
                          <FaMapMarkerAlt className="mr-2 text-blue-600" />
                          {booking.package?.activities || "Unknown"}
                        </p>

                        <div className="grid grid-cols-3 gap-4 text-center text-sm mb-4">
                          <div>
                            <FaCalendarAlt className="mx-auto text-blue-500 mb-1" />
                            <p className="font-semibold">
                              {booking.travel_date}
                            </p>
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
                            <p className="font-semibold">
                              {booking.number_of_travelers}
                            </p>
                            <p className="text-xs text-gray-500">People</p>
                          </div>
                        </div>

                        <div className="flex justify-between items-center bg-green-50 text-green-700 rounded-md px-3 py-2 mb-4">
                          <div className="flex items-center gap-2">
                            <FaLeaf />
                            <p className="text-sm font-medium">
                              {booking.carbon} CO₂
                            </p>
                          </div>
                          <span className="text-xs font-medium">
                            Carbon Footprint
                          </span>
                        </div>

                        <button
                          onClick={() => setSelectedBooking(booking)}
                          className="inline-flex cursor-pointer items-center px-3 py-2 bg-blue-600 text-white rounded-md text-sm hover:bg-blue-700 transition"
                        >
                          <FaUpload className="mr-2" />
                          Upload Receipt
                        </button>
                      </div>
                    ))}
                  </div>
                )}
              </main>
            </div>

            {selectedBooking && (
              <ReceiptUploadModal
                booking={selectedBooking}
                onClose={() => setSelectedBooking(null)}
              />
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default Transactions;
