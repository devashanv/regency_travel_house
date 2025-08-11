import SideNav from "../../components/SideNav";
import NavBar from "../../components/NavBar";
import API from "../../api/axiosClient";
import React, { useState, useEffect } from "react";
import {
  FaAward,
  FaFilter,
  FaSort,
  FaChevronDown,
  FaMapMarkerAlt,
  FaCalendarAlt,
  FaMoon,
  FaUserFriends,
  FaLeaf,
} from "react-icons/fa";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer } from "react-toastify";

const Tours = () => {
  const [selectedFilter, setSelectedFilter] = useState("All");
  const [selectedSort, setSelectedSort] = useState("Date Added");

  const [bookings, setBookings] = useState([]);
  const [bookingImages, setBookingImages] = useState({});
  const [setLoadingsss] = useState(true);

  const [loyalty, setLoyalty] = useState(null);
  const [loyaltyLoading, setLoyaltyLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem("auth_token");
    if (token) {
      API.defaults.headers.common["Authorization"] = `Bearer ${token}`;

      API.get("/bookings")
        .then(async (res) => {
          const bookingData = res.data;
          setBookings(bookingData);

          const images = {};
          await Promise.all(
            bookingData.map(async (booking) => {
              // if (booking.package?.destination_id) {
              //   const img = await fetchHeroImage(
              //     booking.package.destination_id
              //   );
              if (booking.package?.id) {
                const img = await fetchHeroImage(booking.package.id);

                images[booking.id] = img;
              }
            })
          );

          setBookingImages(images);
          setLoadingsss(false);
        })
        .catch((err) => {
          console.error(
            "Error loading confirmed bookings:",
            err.response || err.message
          );
          setLoadingsss(false);
        });
    }
    fetchLoyalty();
  }, []);

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

  const fetchLoyalty = async () => {
    try {
      const response = await API.get("/customer/loyalty-summary");
      setLoyalty(response.data);
    } catch (error) {
      toast.error("Failed to load loyalty data");
      console.error(error);
    } finally {
      setLoyaltyLoading(false);
    }
  };

  return (
    <>
      <div className="relative h-screen">
        {/* Navbar Section */}
        <div className="relative w-full top-0">
          <NavBar />
        </div>

        {/* SideNav Section */}
        <div className="flex w-full flex-row ">
          {/* Sidenav */}
          <div className=" lg:block lg:w-1/6 h-screen relative">
            {" "}
            <SideNav />
          </div>

          {/* Bodycontent */}
          <div className="w-full lg:w-5/6 h-screen overflow-y-auto">
            <div className="flex lg:w-full">
              <div className="h-auto lg:w-full">
                <main className="flex-1 lg:w-full bg-gray-50 overflow-y-auto">
                  <div className="w-screen lg:w-full  p-4 lg:p-6 space-y-6">
                    {/* Loyalty Banner */}
                    {loyalty && (
                      <div className=" bg-gradient-to-r from-gray-900 to-blue-900 text-white p-6 rounded-lg shadow flex flex-col md:flex-row md:items-center md:justify-between gap-6">
                        <div className="flex items-center gap-4">
                          <div className="w-12 h-12 rounded-full bg-white/20 flex items-center justify-center">
                            <FaAward className="text-yellow-400 text-xl" />
                          </div>
                          <div>
                            <h3 className="font-semibold text-lg">
                              Regency Rewards
                            </h3>
                            <p className="text-sm text-white/80">
                              Earn points with every booking and unlock
                              exclusive benefits
                            </p>
                            {loyalty.tier === "Bronze" && (
                              <p className="text-xs mt-1 text-orange-300">
                                You're a <strong>Bronze</strong> member — make
                                more bookings to upgrade!
                              </p>
                            )}
                          </div>
                        </div>

                        <div className="flex gap-8">
                          <div className="text-center">
                            <div className="text-yellow-400 font-bold text-xl">
                              {Math.round(loyalty.loyalty_points || 0)}
                            </div>
                            <div className="text-xs text-white/80">Points</div>
                          </div>
                          <div className="text-center">
                            <div
                              className={`font-bold text-xl ${
                                loyalty.tier === "Gold"
                                  ? "text-yellow-400"
                                  : loyalty.tier === "Silver"
                                  ? "text-gray-200"
                                  : "text-orange-300"
                              }`}
                            >
                              {loyalty.tier}
                            </div>
                            <div className="text-xs text-white/80">Tier</div>
                          </div>
                        </div>

                        <div className="w-full md:w-72">
                          {(() => {
                            const points = loyalty.loyalty_points || 0;
                            let progress = 0;
                            let label = "";
                            let barColor = "";

                            if (points < 500) {
                              progress = (points / 500) * 100;
                              label = `${500 - points} to Silver`;
                              barColor = "bg-orange-300";
                            } else if (points < 1000) {
                              progress = ((points - 500) / 500) * 100;
                              label = `${1000 - points} to Gold`;
                              barColor = "bg-gray-300";
                            } else {
                              progress = 100;
                              label = "Gold Tier Achieved";
                              barColor = "bg-yellow-400";
                            }

                            return (
                              <>
                                <div className="flex justify-between text-xs mb-1">
                                  <span>{label}</span>
                                  <span>{Math.round(progress)}%</span>
                                </div>
                                <div className="h-2 bg-white/20 rounded-full overflow-hidden">
                                  <div
                                    className={`h-full ${barColor} rounded-full transition-all duration-500`}
                                    style={{ width: `${progress}%` }}
                                  ></div>
                                </div>
                              </>
                            );
                          })()}
                        </div>
                      </div>
                    )}

                    {/* Header and Filters */}
                    <div className="flex flex-col md:flex-row justify-between items-start md:items-center">
                      <h1 className="text-2xl font-bold">
                        My <span className="text-blue-600">Tours</span>
                      </h1>
                    </div>

                    {bookings.length === 0 ? (
                      <div className="text-center text-gray-500 py-10">
                        <p className="text-lg hidden lg:block font-medium">
                          No tours booked yet.
                        </p>
                        <p className="text-sm mt-1 hidden lg:block">
                          Your booked tours will appear here once available.
                        </p>
                      </div>
                    ) : (
                      <>
                        {/* Mobile View */}
                        <div className=" w-screen overflow-x-scroll space-y-8 block md:hidden">
                          {["pending", "confirmed", "completed"].map(
                            (status) => {
                              const filtered = bookings.filter(
                                (b) => b.status === status
                              );
                              return (
                                <div key={status}>
                                  <h3 className="text-lg font-semibold text-gray-700 mb-2 px-1">
                                    {status.charAt(0).toUpperCase() +
                                      status.slice(1)}{" "}
                                    Bookings
                                  </h3>

                                  {filtered.length > 0 ? (
                                    <div className="flex space-x-4 overflow-x-auto pb-2 scrollbar-hide snap-x snap-mandatory px-1">
                                      {filtered.map((booking) => (
                                        <div
                                          key={booking.id}
                                          className="min-w-[260px] snap-start flex-shrink-0 bg-white rounded-xl shadow hover:shadow-lg transition transform hover:-translate-y-1"
                                        >
                                          <div className="relative">
                                            <img
                                              src={
                                                bookingImages[booking.id] ||
                                                "https://via.placeholder.com/300"
                                              }
                                              alt={booking.package?.title}
                                              className="w-full h-40 object-cover rounded-t-xl"
                                            />
                                            <div className="absolute top-2 left-2 bg-blue-600 text-white text-xs px-2 py-1 rounded">
                                              {booking.status?.toUpperCase()}
                                            </div>
                                          </div>

                                          <div className="p-3 space-y-2">
                                            <h4 className="font-semibold text-sm truncate">
                                              {booking.package?.title}
                                            </h4>
                                            <p className="text-xs text-gray-500">
                                              <FaMapMarkerAlt className="inline text-blue-600 mr-1" />
                                              {booking.package?.activities ||
                                                "Unknown"}
                                            </p>

                                            <div className="flex justify-between text-xs pt-2 border-t mt-2">
                                              <span>
                                                <FaCalendarAlt className="inline text-blue-600 mr-1" />
                                                {booking.travel_date}
                                              </span>
                                              <span>
                                                <FaUserFriends className="inline text-blue-600 mr-1" />
                                                {booking.number_of_travelers}
                                              </span>
                                            </div>

                                            {booking.status === "completed" ? (
                                              <div className="mt-3 text-center bg-green-50 border border-green-100 p-2 rounded">
                                                <div className="text-green-600 font-bold text-sm flex justify-center items-center">
                                                  <FaLeaf className="mr-2" />
                                                  {booking.package?.footprint}
                                                </div>
                                                <div className="text-[11px] text-gray-500">
                                                  CO₂ Footprint
                                                </div>
                                              </div>
                                            ) : (
                                              <div className="mt-3 text-center bg-gray-50 border border-gray-200 p-2 rounded text-[11px] text-gray-500 italic">
                                                You can see your CO₂ waste after
                                                the tour is completed.
                                              </div>
                                            )}
                                          </div>
                                        </div>
                                      ))}
                                    </div>
                                  ) : (
                                    <p className="text-sm text-gray-500 px-1">
                                      No {status} bookings.
                                    </p>
                                  )}
                                </div>
                              );
                            }
                          )}
                        </div>

                        {/* Desktop View */}
                        <div className=" hidden md:grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                          {bookings.map((booking) => (
                            <div
                              key={booking.id}
                              className="bg-white rounded-xl shadow hover:shadow-lg transition transform hover:-translate-y-1 overflow-hidden relative"
                            >
                              <div className="absolute top-3 left-3 bg-blue-600 text-white text-xs px-3 py-1 rounded font-semibold z-10">
                                {booking.status?.toUpperCase()}
                              </div>

                              <img
                                src={
                                  bookingImages[booking.id] ||
                                  "https://via.placeholder.com/300"
                                }
                                alt={booking.package?.title}
                                className="w-full h-48 object-cover"
                              />

                              <div className="grid grid-cols-3">
                                <div className="col-span-2 p-4">
                                  <div className="mb-2">
                                    <h3 className="font-semibold text-[18px]">
                                      {booking.package?.title}
                                    </h3>
                                    <p className="text-[13px] text-gray-500 flex items-center">
                                      <FaMapMarkerAlt className="mr-1 text-blue-600" />
                                      {booking.package?.activities || "Unknown"}
                                    </p>
                                  </div>

                                  <div className="flex justify-between py-4 border-t border-b border-gray-200 text-xs text-center">
                                    <div className="flex flex-col items-center">
                                      <FaCalendarAlt className="text-blue-600 mb-1" />
                                      <span className="font-bold">
                                        {booking.travel_date}
                                      </span>
                                      <span className="text-[11px] text-gray-400 uppercase mt-1">
                                        Date
                                      </span>
                                    </div>
                                    <div className="flex flex-col items-center">
                                      <FaMoon className="text-blue-600 mb-1" />
                                      <span className="font-bold">
                                        {booking.package?.duration_days
                                          ? booking.package.duration_days - 1
                                          : 0}
                                      </span>
                                      <span className="text-[10px] text-gray-400 uppercase mt-1">
                                        Nights
                                      </span>
                                    </div>
                                    <div className="flex flex-col items-center">
                                      <FaUserFriends className="text-blue-600 mb-1" />
                                      <span className="font-bold">
                                        {booking.number_of_travelers}
                                      </span>
                                      <span className="text-[10px] text-gray-400 uppercase mt-1">
                                        People
                                      </span>
                                    </div>
                                  </div>
                                </div>

                                {booking.status === "completed" ? (
                                  <div className="bg-green-50 border-l border-gray-200 flex flex-col justify-center items-center p-4 text-center">
                                    <div className="text-green-600 font-bold text-[16px] flex items-center mb-1">
                                      <FaLeaf className="mr-2" />
                                      {booking.package?.footprint}
                                    </div>
                                    <div className="text-gray-500 text-[11px]">
                                      CO₂ Footprint
                                    </div>
                                  </div>
                                ) : (
                                  <div className="bg-gray-50 border-l border-gray-200 flex items-center justify-center px-4 text-center text-[11px] text-gray-500 italic">
                                    You can see your CO₂ waste after the tour is
                                    completed.
                                  </div>
                                )}
                              </div>
                            </div>
                          ))}
                        </div>
                      </>
                    )}
                  </div>
                </main>
              </div>
              <ToastContainer position="top-right" autoClose={3000} />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Tours;
