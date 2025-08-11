import React, { useState, useEffect } from "react";
import SideNav from "../../components/SideNav";
import NavBar from "../../components/NavBar";
import API from "../../api/axiosClient";
import { Loader2 } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import DonatePointsModal from "./DonatePointsModal";
import TripQuote from "../../components/TripQuote";

function UserDashboard() {
  const [wishlist, setWishlist] = useState([]);
  const [wishlistImages, setWishlistImages] = useState({});
  const [pendingBookings, setPendingBookings] = useState([]);
  const [bookingImages, setBookingImages] = useState({});
  const [packages, setPackages] = useState([]);
  const [packageImages, setPackageImages] = useState({});
  const [bookings, setBookings] = useState([]);
  const [loyalty, setLoyalty] = useState(null);
  const [loading, setLoading] = useState(true);
  const [loadingPackages, setLoadingPackages] = useState(true);
  const [loyaltyLoading, setLoyaltyLoading] = useState(true);
  const [openDonateModal, setOpenDonateModal] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [selectedPackageId, setSelectedPackageId] = useState(null);
  const [date, setDate] = useState(new Date());
  const navigate = useNavigate();

  const monthNames = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];
  const days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  const year = date.getFullYear();
  const month = date.getMonth();
  const today = new Date();
  const isToday = (day) =>
    day === today.getDate() &&
    month === today.getMonth() &&
    year === today.getFullYear();
  const firstDay = new Date(year, month, 1).getDay();
  const daysInMonth = new Date(year, month + 1, 0).getDate();

  const handlePrev = () => setDate(new Date(year, month - 1, 1));
  const handleNext = () => setDate(new Date(year, month + 1, 1));

  const fetchHeroImage = async (packageId) => {
    try {
      const res = await API.get(`/packages/${packageId}/images/hero`);
      if (res.data?.filename) {
        return `https://portal.knowmo.me/storage/images/${res.data.filename}`;
      }
    } catch (err) {
      console.error(`Failed to fetch hero image for package ${packageId}`, err);
    }
    return "https://via.placeholder.com/300";
  };

  useEffect(() => {
    const token = localStorage.getItem("auth_token");
    if (!token) return navigate("/login");
    API.defaults.headers.common["Authorization"] = `Bearer ${token}`;

    API.get("/wishlist")
      .then(async (res) => {
        setWishlist(res.data);
        const images = {};
        for (const item of res.data) {
          if (item.package?.id) {
            images[item.package.id] = await fetchHeroImage(item.package.id);
          }
        }
        setWishlistImages(images);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error fetching wishlist:", err);
        setLoading(false);
      });
  }, []);

  const handleRemove = async (wishlistId) => {
    const token = localStorage.getItem("auth_token");
    try {
      await API.delete(`/wishlist/${wishlistId}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setWishlist((prev) => prev.filter((item) => item.id !== wishlistId));
      toast.success("Removed from wishlist!");
    } catch (error) {
      console.error("Error removing from wishlist:", error);
      toast.error("Failed to remove from wishlist.");
    }
  };

  useEffect(() => {
    const token = localStorage.getItem("auth_token");
    if (!token) return navigate("/login");
    API.defaults.headers.common["Authorization"] = `Bearer ${token}`;

    API.get("/bookings")
      .then(async (res) => {
        setPendingBookings(res.data);
        const images = {};
        for (const booking of res.data) {
          if (booking.package?.id) {
            images[booking.id] = await fetchHeroImage(booking.package.id);
          }
        }
        setBookingImages(images);
      })
      .catch((err) => console.error("Error loading bookings:", err));
  }, []);

  useEffect(() => {
    const token = localStorage.getItem("auth_token");
    if (!token) return navigate("/login");
    API.defaults.headers.common["Authorization"] = `Bearer ${token}`;

    API.get("/packages")
      .then(async (res) => {
        setPackages(res.data);
        const images = {};
        for (const pkg of res.data) {
          if (pkg.id) {
            images[pkg.id] = await fetchHeroImage(pkg.id);
          }
        }
        setPackageImages(images);
        setLoadingPackages(false);
      })
      .catch((err) => {
        console.error("Error loading packages:", err);
        setLoadingPackages(false);
      });
  }, []);

  useEffect(() => {
    const token = localStorage.getItem("auth_token");
    if (!token) return navigate("/login");
    API.defaults.headers.common["Authorization"] = `Bearer ${token}`;

    API.get("/booking/confirmed")
      .then((res) => setBookings(res.data))
      .catch((err) => console.error("Error loading confirmed bookings:", err));
  }, []);

  useEffect(() => {
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
    fetchLoyalty();
  }, []);

  const [customer, setCustomer] = useState(null);
  const [error, setError] = useState("");

  useEffect(() => {
    const token = localStorage.getItem("auth_token");
    const customerId = localStorage.getItem("customer_id");

    if (token && customerId) {
      API.defaults.headers.common["Authorization"] = `Bearer ${token}`;
      API.get(`/customers/${customerId}`)
        .then((response) => {
          setCustomer(response.data);
          setError("");
        })
        .catch((error) => {
          console.error("Failed to fetch customer:", error);
          setError("Unable to load customer data. Please try again later.");
        })
        .finally(() => {
          setLoading(false);
        });
    } else {
      setError("Missing authentication. Please log in again.");
      setLoading(false);
    }
  }, []);

  return (
    <>
      <div className="relative h-screen">
        {/* Navbar Section */}
        <div className="relative w-full top-0">
          <NavBar />
        </div>

        {/* SideNav Section */}
        <div className="  flex w-full flex-row ">
          {/* Sidenav */}
          <div className="lg:w-1/6 h-screen relative">
            {" "}
            <SideNav />
          </div>

          {/* Bodycontent */}
          <div className="w-full lg:w-5/6 h-screen overflow-y-auto">
            <div className="flex">
              <div className="h-auto ">
                <main className="flex-1 bg-gray-100 h-auto p-6">
                  <div className="mb-8 lg:ml-9">
                    <h1 className="text-3xl font-bold text-gray-800">
                      Hello,{" "}
                      <span className="text-indigo-600">
                        {customer?.full_name?.trim().split(/\s+/)[0]}
                      </span>
                      <span className="block font-semibold text-gray-800 text-sm"></span>
                    </h1>
                    <p className="text-gray-600 mt-2">
                      Welcome back! Let's experience the world together.
                    </p>
                  </div>

                  <div className="lg:ml-9  grid grid-cols-1 lg:grid-cols-3 gap-6">
                    <div className="lg:col-span-2   shadow rounded-xl p-6">
                      {/* Wishlist   */}
                      <div className="">
                        <h3 className="text-lg sm:text-xl font-semibold text-gray-800">
                          Your Wishlist
                        </h3>
                        <div className="space-y-4 mt-4">
                          {wishlist.length === 0 ? (
                            <div className="text-center text-gray-500 py-10">
                              <p className="text-lg font-medium">
                                Your wishlist is empty.
                              </p>
                              <p className="text-sm mt-2">
                                Start exploring and add packages you love!
                              </p>
                            </div>
                          ) : (
                            <>
                              {/* Mobile: Horizontal Scroll */}
                              <div className="flex space-x-4 overflow-x-auto pb-2 md:hidden snap-x snap-mandatory scrollbar-hide">
                                {wishlist.slice(0, 3).map((item) => (
                                  <div
                                    key={item.id}
                                    className="min-w-[260px] max-w-[280px] snap-start flex-shrink-0 relative group bg-white rounded-xl shadow-md hover:shadow-xl transition-shadow duration-300 overflow-hidden"
                                  >
                                    {/* Heart Icon */}
                                    <div className="absolute top-2 right-2 z-10">
                                      <button
                                        className="text-red-500 bg-white rounded-full p-2 shadow hover:text-red-700"
                                        title="Remove from Wishlist"
                                        onClick={() => handleRemove(item.id)}
                                      >
                                        <i className="fas fa-heart"></i>
                                      </button>
                                    </div>

                                    <img
                                      src={
                                        wishlistImages[item.package?.id] ||
                                        "https://via.placeholder.com/300"
                                      }
                                      alt={item.package?.title || "Package"}
                                      className="w-full h-52 object-cover transition-transform duration-300 group-hover:scale-105"
                                    />

                                    <div className="p-4">
                                      <h3 className="text-lg font-bold text-gray-800 truncate">
                                        {item.package?.title || "No Title"}
                                      </h3>
                                      <div className="text-sm text-gray-500 flex gap-2 mt-1">
                                        <i className="fas fa-calendar-alt mt-[2px]"></i>
                                        <span>
                                          {item.package?.start_date || "N/A"}
                                        </span>{" "}
                                        -{" "}
                                        <span>
                                          {item.package?.end_date || "N/A"}
                                        </span>
                                      </div>
                                      <div className="mt-4 flex justify-between gap-3">
                                        <button
                                          onClick={() => {
                                            setSelectedPackageId(
                                              item.package?.id
                                            );
                                            setShowModal(true);
                                          }}
                                          className="bg-[#ec2326] w-full hover:bg-red-700 text-white px-4 py-2 rounded-full font-semibold transition"
                                        >
                                          Get a Quote
                                        </button>
                                      </div>
                                    </div>
                                  </div>
                                ))}
                              </div>

                              {/* Desktop & Tablet */}
                              <div className="hidden   md:grid grid-cols-2 lg:grid-cols-3 gap-6">
                                {wishlist.slice(0, 3).map((item) => (
                                  <div
                                    key={item.id}
                                    className="relative group rounded-xl shadow-md hover:shadow-xl transition-shadow duration-300 overflow-hidden"
                                  >
                                    <div className="absolute  top-2 right-2 z-20">
                                      <button
                                        className="text-red-500 cursor-pointer bg-white rounded-full p-2 shadow hover:text-red-700"
                                        title="Remove from Wishlist"
                                        onClick={() => handleRemove(item.id)}
                                      >
                                        <i className="fas fa-heart"></i>
                                      </button>
                                    </div>

                                    <img
                                      src={
                                        wishlistImages[item.package?.id] ||
                                        "https://via.placeholder.com/300"
                                      }
                                      alt={item.package?.title || "Package"}
                                      className="w-full h-52 object-cover transition-transform duration-300 group-hover:scale-105"
                                    />

                                    <div className="p-4 ">
                                      <h3 className="text-lg font-bold text-gray-800 truncate">
                                        {item.package?.title || "No Title"}
                                      </h3>
                                      <div className="text-sm text-gray-500 flex gap-2 mt-1">
                                        <i className="fas fa-calendar-alt mt-[2px]"></i>
                                        <span>
                                          {item.package?.start_date || "N/A"}
                                        </span>{" "}
                                        -{" "}
                                        <span>
                                          {item.package?.end_date || "N/A"}
                                        </span>
                                      </div>
                                      <div className="mt-4 flex justify-between gap-3">
                                        <button
                                          onClick={() => {
                                            setSelectedPackageId(
                                              item.package?.id
                                            );
                                            setShowModal(true);
                                          }}
                                          className="bg-[#ec2326] w-full hover:bg-red-700 cursor-pointer text-white px-4 py-2 rounded-full font-semibold transition"
                                        >
                                          Get a Quote
                                        </button>
                                      </div>
                                    </div>
                                  </div>
                                ))}
                              </div>
                            </>
                          )}

                          {showModal && selectedPackageId && (
                            <TripQuote
                              packageId={selectedPackageId}
                              onClose={() => {
                                setShowModal(false);
                                setSelectedPackageId(null);
                              }}
                            />
                          )}
                        </div>
                      </div>

                      {/* Recent Bookings */}
                      <div className="">
                        <h3 className=" mt-6 lg:md-block text-lg sm:text-xl font-semibold text-gray-800">
                          Recent Bookings
                        </h3>

                        <div className="space-y-4 sm:mt-3 ">
                          {/* Mobile: Horizontal scroll */}

                          {pendingBookings.length === 0 ? (
                            <div className="text-center text-gray-500 py-10">
                              <p className="text-lg font-medium">
                                No recent bookings found.
                              </p>
                              <p className="text-sm mt-1">
                                Start planning your next adventure today!
                              </p>
                            </div>
                          ) : (
                            <>
                              {/* Mobile View */}

                              <div className="sm:hidden overflow-x-auto pb-2">
                                <div className="flex space-x-4 snap-x snap-mandatory px-1">
                                  {pendingBookings
                                    .slice(0, 3)
                                    .map((booking) => (
                                      <div
                                        key={booking.id}
                                        className="min-w-[260px] max-w-[280px] bg-white snap-start flex-shrink-0 rounded-lg p-4 shadow-sm hover:shadow-md transition"
                                      >
                                        <div className="w-full h-40 rounded-md overflow-hidden bg-gray-200 mb-3">
                                          <img
                                            src={
                                              bookingImages[booking.id] ||
                                              "https://via.placeholder.com/150"
                                            }
                                            alt={
                                              booking.package?.title ||
                                              "Booking"
                                            }
                                            className="w-full h-full object-cover"
                                          />
                                        </div>

                                        <h4 className="text-sm font-semibold text-gray-800 truncate">
                                          {booking.package?.title || "Trip"}
                                        </h4>
                                        <span className="inline-block mt-1 text-xs rounded-full bg-yellow-100 text-yellow-800 px-2 py-0.5">
                                          {booking.status}
                                        </span>

                                        <p className="text-xs text-gray-500 mt-2">
                                          <i className="fas fa-calendar-alt mr-1"></i>
                                          Travel Date: {booking.travel_date}
                                        </p>

                                        <div className="mt-3 text-sm font-bold text-indigo-600">
                                          USD {booking.total_price}
                                        </div>

                                        <button
                                          onClick={() =>
                                            navigate(
                                              `/destination/${booking.package?.id}`
                                            )
                                          }
                                          className="mt-2 cursor-pointer bg-indigo-600 hover:bg-[#0070C4] text-white px-4 py-2 w-full rounded-md text-sm"
                                        >
                                          View Details
                                        </button>
                                      </div>
                                    ))}
                                </div>
                              </div>

                              {/* Desktop & Tablet */}
                              <div className="hidden sm:block pt-10 space-y-4 sm:space-y-6">
                                {/* <h3 className="text-lg sm:text-xl hidden lg:block font-semibold text-gray-800">
                          Recent Bookings
                        </h3> */}
                                {pendingBookings.slice(0, 3).map((booking) => (
                                  <div
                                    key={booking.id}
                                    className="flex flex-col sm:flex-row gap-4 items-start bg-gray-50 rounded-lg p-4 shadow-sm hover:shadow-md transition"
                                  >
                                    <div className="w-full sm:w-32 h-48 sm:h-32 overflow-hidden rounded-md bg-gray-200">
                                      <img
                                        src={
                                          bookingImages[booking.id] ||
                                          "https://via.placeholder.com/150"
                                        }
                                        alt={
                                          booking.package?.title || "Booking"
                                        }
                                        className="w-full h-full object-cover"
                                      />
                                    </div>

                                    <div className="flex flex-col flex-1 w-full">
                                      <div className="flex justify-between items-start flex-col sm:flex-row gap-2">
                                        <h4 className="text-base sm:text-lg font-semibold text-gray-700">
                                          {booking.package?.title || "Trip"}
                                        </h4>
                                        <span className="px-3 py-1 text-xs sm:text-sm rounded-full bg-yellow-100 text-yellow-800 self-start sm:self-auto">
                                          {booking.status}
                                        </span>
                                      </div>

                                      <div className="flex items-center gap-2 text-sm text-gray-600 mt-2">
                                        <i className="fas fa-calendar-alt"></i>
                                        <span>
                                          Travel Date: {booking.travel_date}
                                        </span>
                                      </div>

                                      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mt-3 gap-2 sm:gap-0">
                                        <span className="text-base sm:text-lg font-bold text-indigo-600">
                                          USD {booking.total_price}
                                        </span>
                                        <button
                                          onClick={() =>
                                            navigate(
                                              `/destination/${booking.package?.id}`
                                            )
                                          }
                                          className="w-full sm:w-auto cursor-pointer bg-indigo-600 hover:bg-[#0070C4] text-white px-4 py-2 rounded-md text-sm"
                                        >
                                          View Details
                                        </button>
                                      </div>
                                    </div>
                                  </div>
                                ))}
                              </div>
                            </>
                          )}
                        </div>
                      </div>
                    </div>

                    <div className="side-column space-y-8">
                      {/* Upcoming Trips */}
                      <div className="calendar-card bg-white p-6 rounded-xl shadow">
                        <div className="hidden md:block calendar-card bg-white p-6 rounded-xl shadow w-full max-w-md">
                          <div className="flex justify-between items-center mb-4">
                            <h3 className="text-lg font-semibold text-gray-800">
                              {monthNames[month]} {year}
                            </h3>
                            <div className="flex items-center space-x-2">
                              <button
                                onClick={handlePrev}
                                className="text-gray-500 hover:text-indigo-600"
                              >
                                <i className="fas fa-chevron-left" />
                              </button>
                              <button
                                onClick={handleNext}
                                className="text-gray-500 hover:text-indigo-600"
                              >
                                <i className="fas fa-chevron-right" />
                              </button>
                            </div>
                          </div>

                          <div className="grid grid-cols-7 text-center text-sm font-medium text-gray-600 mb-2">
                            {days.map((day) => (
                              <div key={day}>{day}</div>
                            ))}
                          </div>

                          <div className="grid grid-cols-7 gap-2 text-sm text-center text-gray-800">
                            {Array.from({ length: firstDay }).map(
                              (_, index) => (
                                <div key={`empty-${index}`} />
                              )
                            )}

                            {Array.from({ length: daysInMonth }, (_, i) => {
                              const day = i + 1;
                              const isCurrentDay = isToday(day);
                              return (
                                <div
                                  key={day}
                                  className={`py-2 rounded-lg transition cursor-pointer ${
                                    isCurrentDay
                                      ? "bg-[#0070C4] text-white font-semibold"
                                      : "hover:bg-indigo-100"
                                  }`}
                                >
                                  {day}
                                </div>
                              );
                            })}
                          </div>
                        </div>

                        <div className="calendar-events mt-6">
                          <h4 className="text-md font-semibold text-gray-700 mb-3">
                            Upcoming Trips
                          </h4>

                          <div className="events-list space-y-4">
                            {bookings.length > 0 ? (
                              bookings.slice(0, 3).map((booking) => {
                                const travelDate = new Date(
                                  booking.travel_date
                                );
                                const day = travelDate.getDate();
                                const month = travelDate.toLocaleString(
                                  "default",
                                  {
                                    month: "short",
                                  }
                                );

                                return (
                                  <div
                                    key={booking.id}
                                    className="event-item flex items-center gap-4 p-3 bg-gray-100 rounded-md shadow-sm"
                                  >
                                    <div className="event-date bg-indigo-600 text-white rounded-md w-12 h-12 flex flex-col items-center justify-center font-bold">
                                      <span className="event-day text-lg">
                                        {day}
                                      </span>
                                      <span className="event-month text-xs uppercase">
                                        {month}
                                      </span>
                                    </div>

                                    <div className="event-info">
                                      <h5 className="event-title font-semibold text-gray-800">
                                        {booking.package?.title ||
                                          "Untitled Trip"}
                                      </h5>
                                    </div>
                                  </div>
                                );
                              })
                            ) : (
                              <div className="no-events flex flex-col items-center text-gray-400 p-6 border border-dashed border-gray-300 rounded-lg">
                                <i className="fas fa-calendar-plus text-2xl mb-2"></i>
                                <p>No upcoming trips</p>
                              </div>
                            )}
                          </div>
                        </div>
                      </div>

                      {/* Loyalty Program */}
                      <div className="bg-white p-6 rounded-2xl shadow-md">
                        <h3 className="text-xl font-bold text-gray-800 mb-6">
                          Loyalty Program
                        </h3>

                        {loading ? (
                          <div className="flex justify-center items-center h-32">
                            <Loader2 className="animate-spin w-8 h-8 text-gray-600" />
                          </div>
                        ) : (
                          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                            {/* Available Points */}
                            <div className="flex items-center gap-4 p-4 bg-gray-50 rounded-lg shadow-sm">
                              <div className="text-yellow-500 text-2xl">
                                <i className="fas fa-star"></i>
                              </div>
                              <div>
                                <p className="text-lg font-semibold text-gray-800">
                                  {loyalty?.loyalty_points ?? 0}
                                </p>
                                <p className="text-sm text-gray-500">
                                  Available Points
                                </p>
                              </div>
                            </div>

                            {/* Bonus Points  */}
                            <div className="flex items-center gap-4 p-4 bg-gray-50 rounded-lg shadow-sm">
                              <div className="text-red-500 text-2xl">
                                <i className="fas fa-times-circle"></i>
                              </div>
                              <div>
                                <p className="text-lg font-semibold text-gray-800">
                                  {loyalty?.total_redeemed ?? 0}
                                </p>
                                <p className="text-sm text-gray-500">
                                  Total Points Redeemed
                                </p>
                              </div>
                            </div>

                            {/* Donate Points */}
                            <div className="flex items-center gap-4 p-4 bg-gray-50 rounded-lg shadow-sm">
                              <div className="text-green-500 text-2xl">
                                <i className="fas fa-hands-helping"></i>
                              </div>
                              <div>
                                <p className="text-lg font-semibold text-gray-800">
                                  {loyalty?.donate ?? 0}
                                </p>
                                <p className="text-sm text-gray-500">
                                  Donated Points
                                </p>
                              </div>
                            </div>

                            {/* Membership Tier */}
                            <div className="flex items-center gap-4 p-4 bg-gray-50 rounded-lg shadow-sm">
                              <div className="text-indigo-500 text-2xl">
                                <i className="fas fa-gem"></i>
                              </div>
                              <div>
                                <p className="text-lg font-semibold text-gray-800">
                                  {loyalty?.tier ?? "Bronze"}
                                </p>
                                <p className="text-sm text-gray-500">
                                  Membership Tier
                                </p>
                              </div>
                            </div>
                          </div>
                        )}

                        {/* Donate Button */}
                        <div className="flex justify-center mt-6">
                          <button
                            onClick={() => setOpenDonateModal(true)}
                            className="cursor-pointer  bg-secondary w-full  text-white font-semibold px-6 py-2 rounded-full shadow-md transition"
                          >
                            Donate Points
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Recommended Trips */}
                  <div className="hidden md:block lg:ml-9 pt-6 popular-trips space-y-6">
                    <div className="section-header flex justify-between items-center">
                      <h3 className="section-title text-xl font-semibold text-gray-800">
                        Recommended For You
                      </h3>
                    </div>

                    {loadingPackages ? (
                      <p className="text-gray-600">
                        Loading recommended trips...
                      </p>
                    ) : packages.length === 0 ? (
                      <div className="no-trips-placeholder col-span-full flex flex-col items-center text-gray-400 p-6 border border-dashed border-gray-300 rounded-lg">
                        <i className="fas fa-compass text-3xl mb-2"></i>
                        <p className="text-sm">No recommended trips found</p>
                      </div>
                    ) : (
                      <div className="trips-grid grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                        {packages.slice(0, 3).map((pkg) => (
                          <div
                            key={pkg.id}
                            className="trip-card bg-white rounded-xl shadow overflow-hidden relative"
                          >
                            <div className="trip-image-container relative">
                              <img
                                src={
                                  packageImages[pkg.id] ||
                                  "https://via.placeholder.com/150"
                                }
                                alt={pkg.title || "Trip"}
                                className="trip-image w-full h-56 object-cover"
                              />

                              <div className="trip-badge absolute top-2 left-2 bg-red-500 text-white text-xs px-2 py-1 rounded flex items-center gap-1">
                                <i className="fas fa-fire"></i> Popular
                              </div>
                            </div>

                            <div className="trip-info p-4 space-y-2">
                              <div className="trip-header flex justify-between items-center">
                                <h4 className="trip-title font-medium text-gray-800 text-lg">
                                  {pkg.title}
                                </h4>
                              </div>

                              <p className="trip-location text-sm text-gray-500 flex items-center gap-1">
                                <i className="fas fa-map-marker-alt"></i>{" "}
                                {pkg.destination?.name || "Unknown"}
                              </p>

                              <div className="trip-meta flex gap-4 text-gray-500 text-sm">
                                <span className="trip-duration flex items-center gap-1">
                                  <i className="fas fa-calendar-alt"></i>{" "}
                                  {pkg.start_date} - {pkg.end_date}
                                </span>
                                <span className="trip-difficulty flex items-center gap-1">
                                  <i className="fas fa-clock"></i>{" "}
                                  {pkg.duration_days} Days
                                </span>
                              </div>

                              <div className="trip-footer flex justify-between items-center pt-2 border-t mt-2">
                                <span className="trip-price text-gray-800 font-semibold text-md">
                                  USD {pkg.price_per_person}
                                </span>

                                <button
                                  onClick={() =>
                                    navigate(`/destination/${pkg?.id}`)
                                  }
                                  className="cursor-pointer trip-book-btn bg-indigo-600 text-white text-sm px-4 py-2 rounded hover:bg-indigo-700 transition"
                                >
                                  View Details
                                </button>
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>

                  {openDonateModal && (
                    <DonatePointsModal
                      loyalty={loyalty}
                      onClose={() => setOpenDonateModal(false)}
                    />
                  )}
                </main>
              </div>
            </div>
          </div>
        </div>
        <ToastContainer position="top-right" autoClose={3000} />
        {openDonateModal && (
          <DonatePointsModal
            loyalty={loyalty}
            onClose={() => setOpenDonateModal(false)}
          />
        )}
        {showModal && selectedPackageId && (
          <TripQuote
            packageId={selectedPackageId}
            onClose={() => {
              setShowModal(false);
              setSelectedPackageId(null);
            }}
          />
        )}
      </div>
    </>

    // <div className="flex mb-14">
    //   <div className="w-5/6 h-auto  mt-20  ml-65">
    //     <main className="flex-1 bg-gray-100 h-auto p-6">

    //       <div className="lg:ml-9  grid grid-cols-1 lg:grid-cols-3 gap-6">
    //         <div className="lg:col-span-2   shadow rounded-xl p-6">
    //           <div></div>
    //           {/* Wishlist   */}
    //           <div className="">
    //             <h3 className="text-lg sm:text-xl font-semibold text-gray-800">
    //               Your Wishlist
    //             </h3>
    //             <div className="space-y-4 mt-4">
    //               {wishlist.length === 0 ? (
    //                 <div className="text-center text-gray-500 py-10">
    //                   <p className="text-lg font-medium">
    //                     Your wishlist is empty.
    //                   </p>
    //                   <p className="text-sm mt-2">
    //                     Start exploring and add packages you love!
    //                   </p>
    //                 </div>
    //               ) : (
    //                 <>
    //                   {/* Mobile: Horizontal Scroll */}
    //                   <div className="flex space-x-4 overflow-x-auto pb-2 md:hidden snap-x snap-mandatory scrollbar-hide">
    //                     {wishlist.slice(0, 3).map((item) => (
    //                       <div
    //                         key={item.id}
    //                         className="min-w-[260px] max-w-[280px] snap-start flex-shrink-0 relative group bg-white rounded-xl shadow-md hover:shadow-xl transition-shadow duration-300 overflow-hidden"
    //                       >
    //                         {/* Heart Icon */}
    //                         <div className="absolute top-2 right-2 z-10">
    //                           <button
    //                             className="text-red-500 bg-white rounded-full p-2 shadow hover:text-red-700"
    //                             title="Remove from Wishlist"
    //                             onClick={() => handleRemove(item.id)}
    //                           >
    //                             <i className="fas fa-heart"></i>
    //                           </button>
    //                         </div>

    //                         <img
    //                           src={
    //                             wishlistImages[item.package?.id] ||
    //                             "https://via.placeholder.com/300"
    //                           }
    //                           alt={item.package?.title || "Package"}
    //                           className="w-full h-52 object-cover transition-transform duration-300 group-hover:scale-105"
    //                         />

    //                         <div className="p-4">
    //                           <h3 className="text-lg font-bold text-gray-800 truncate">
    //                             {item.package?.title || "No Title"}
    //                           </h3>
    //                           <div className="text-sm text-gray-500 flex gap-2 mt-1">
    //                             <i className="fas fa-calendar-alt mt-[2px]"></i>
    //                             <span>
    //                               {item.package?.start_date || "N/A"}
    //                             </span>{" "}
    //                             -{" "}
    //                             <span>{item.package?.end_date || "N/A"}</span>
    //                           </div>
    //                           <div className="mt-4 flex justify-between gap-3">
    //                             <button
    //                               onClick={() => {
    //                                 setSelectedPackageId(item.package?.id);
    //                                 setShowModal(true);
    //                               }}
    //                               className="bg-[#ec2326] w-full hover:bg-red-700 text-white px-4 py-2 rounded-full font-semibold transition"
    //                             >
    //                               Get a Quote
    //                             </button>
    //                           </div>
    //                         </div>
    //                       </div>
    //                     ))}
    //                   </div>

    //                   {/* Desktop & Tablet */}
    //                   <div className="hidden   md:grid grid-cols-2 lg:grid-cols-3 gap-6">
    //                     {wishlist.slice(0, 3).map((item) => (
    //                       <div
    //                         key={item.id}
    //                         className="relative group -z-100 bg-red-300  rounded-xl shadow-md hover:shadow-xl transition-shadow duration-300 overflow-hidden"
    //                       >
    //                         <div className="absolute  top-2 right-2 z-20">
    //                           <button
    //                             className="text-red-500 cursor-pointer bg-white rounded-full p-2 shadow hover:text-red-700"
    //                             title="Remove from Wishlist"
    //                             onClick={() => handleRemove(item.id)}
    //                           >
    //                             <i className="fas fa-heart"></i>
    //                           </button>
    //                         </div>

    //                         <img
    //                           src={
    //                             wishlistImages[item.package?.id] ||
    //                             "https://via.placeholder.com/300"
    //                           }
    //                           alt={item.package?.title || "Package"}
    //                           className="w-full h-52 object-cover transition-transform duration-300 group-hover:scale-105"
    //                         />

    //                         <div className="p-4 bg-amber-200">
    //                           <h3 className="text-lg font-bold text-gray-800 truncate">
    //                             {item.package?.title || "No Title"}
    //                           </h3>
    //                           <div className="text-sm text-gray-500 flex gap-2 mt-1">
    //                             <i className="fas fa-calendar-alt mt-[2px]"></i>
    //                             <span>
    //                               {item.package?.start_date || "N/A"}
    //                             </span>{" "}
    //                             -{" "}
    //                             <span>{item.package?.end_date || "N/A"}</span>
    //                           </div>
    //                           <div className="mt-4 flex justify-between gap-3">
    //                             <button
    //                               onClick={() => {
    //                                 setSelectedPackageId(item.package?.id);
    //                                 setShowModal(true);
    //                               }}
    //                               className="bg-[#ec2326] w-full hover:bg-red-700 cursor-pointer text-white px-4 py-2 rounded-full font-semibold transition"
    //                             >
    //                               Get a Quote
    //                             </button>
    //                           </div>
    //                         </div>
    //                       </div>
    //                     ))}
    //                   </div>
    //                 </>
    //               )}

    //               {showModal && selectedPackageId && (
    //                 <TripQuote
    //                   packageId={selectedPackageId}
    //                   onClose={() => {
    //                     setShowModal(false);
    //                     setSelectedPackageId(null);
    //                   }}
    //                 />
    //               )}
    //             </div>
    //           </div>

    //           {/* Recent Bookings */}
    //           <div className="">
    //             <h3 className=" mt-6 lg:md-block text-lg sm:text-xl font-semibold text-gray-800">
    //               Recent Bookings
    //             </h3>

    //             <div className="space-y-4 sm:mt-3 ">
    //               {/* Mobile: Horizontal scroll */}

    //               {pendingBookings.length === 0 ? (
    //                 <div className="text-center text-gray-500 py-10">
    //                   <p className="text-lg font-medium">
    //                     No recent bookings found.
    //                   </p>
    //                   <p className="text-sm mt-1">
    //                     Start planning your next adventure today!
    //                   </p>
    //                 </div>
    //               ) : (
    //                 <>
    //                   {/* Mobile View */}

    //                   <div className="sm:hidden overflow-x-auto pb-2">
    //                     <div className="flex space-x-4 snap-x snap-mandatory px-1">
    //                       {pendingBookings.slice(0, 3).map((booking) => (
    //                         <div
    //                           key={booking.id}
    //                           className="min-w-[260px] max-w-[280px] bg-white snap-start flex-shrink-0 rounded-lg p-4 shadow-sm hover:shadow-md transition"
    //                         >
    //                           <div className="w-full h-40 rounded-md overflow-hidden bg-gray-200 mb-3">
    //                             <img
    //                               src={
    //                                 bookingImages[booking.id] ||
    //                                 "https://via.placeholder.com/150"
    //                               }
    //                               alt={booking.package?.title || "Booking"}
    //                               className="w-full h-full object-cover"
    //                             />
    //                           </div>

    //                           <h4 className="text-sm font-semibold text-gray-800 truncate">
    //                             {booking.package?.title || "Trip"}
    //                           </h4>
    //                           <span className="inline-block mt-1 text-xs rounded-full bg-yellow-100 text-yellow-800 px-2 py-0.5">
    //                             {booking.status}
    //                           </span>

    //                           <p className="text-xs text-gray-500 mt-2">
    //                             <i className="fas fa-calendar-alt mr-1"></i>
    //                             Travel Date: {booking.travel_date}
    //                           </p>

    //                           <div className="mt-3 text-sm font-bold text-indigo-600">
    //                             USD {booking.total_price}
    //                           </div>

    //                           <button
    //                             onClick={() =>
    //                               navigate(
    //                                 `/destination/${booking.package?.id}`
    //                               )
    //                             }
    //                             className="mt-2 cursor-pointer bg-indigo-600 hover:bg-[#0070C4] text-white px-4 py-2 w-full rounded-md text-sm"
    //                           >
    //                             View Details
    //                           </button>
    //                         </div>
    //                       ))}
    //                     </div>
    //                   </div>

    //                   {/* Desktop & Tablet */}
    //                   <div className="hidden sm:block pt-10 space-y-4 sm:space-y-6">
    //                     {/* <h3 className="text-lg sm:text-xl hidden lg:block font-semibold text-gray-800">
    //                     Recent Bookings
    //                   </h3> */}
    //                     {pendingBookings.slice(0, 3).map((booking) => (
    //                       <div
    //                         key={booking.id}
    //                         className="flex flex-col sm:flex-row gap-4 items-start bg-gray-50 rounded-lg p-4 shadow-sm hover:shadow-md transition"
    //                       >
    //                         <div className="w-full sm:w-32 h-48 sm:h-32 overflow-hidden rounded-md bg-gray-200">
    //                           <img
    //                             src={
    //                               bookingImages[booking.id] ||
    //                               "https://via.placeholder.com/150"
    //                             }
    //                             alt={booking.package?.title || "Booking"}
    //                             className="w-full h-full object-cover"
    //                           />
    //                         </div>

    //                         <div className="flex flex-col flex-1 w-full">
    //                           <div className="flex justify-between items-start flex-col sm:flex-row gap-2">
    //                             <h4 className="text-base sm:text-lg font-semibold text-gray-700">
    //                               {booking.package?.title || "Trip"}
    //                             </h4>
    //                             <span className="px-3 py-1 text-xs sm:text-sm rounded-full bg-yellow-100 text-yellow-800 self-start sm:self-auto">
    //                               {booking.status}
    //                             </span>
    //                           </div>

    //                           <div className="flex items-center gap-2 text-sm text-gray-600 mt-2">
    //                             <i className="fas fa-calendar-alt"></i>
    //                             <span>
    //                               Travel Date: {booking.travel_date}
    //                             </span>
    //                           </div>

    //                           <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mt-3 gap-2 sm:gap-0">
    //                             <span className="text-base sm:text-lg font-bold text-indigo-600">
    //                               USD {booking.total_price}
    //                             </span>
    //                             <button
    //                               onClick={() =>
    //                                 navigate(
    //                                   `/destination/${booking.package?.id}`
    //                                 )
    //                               }
    //                               className="w-full sm:w-auto cursor-pointer bg-indigo-600 hover:bg-[#0070C4] text-white px-4 py-2 rounded-md text-sm"
    //                             >
    //                               View Details
    //                             </button>
    //                           </div>
    //                         </div>
    //                       </div>
    //                     ))}
    //                   </div>
    //                 </>
    //               )}
    //             </div>
    //           </div>
    //         </div>

    //         <div className="side-column space-y-8">
    //           {/* Upcoming Trips */}
    //           <div className="calendar-card bg-white p-6 rounded-xl shadow">
    //             <div className="hidden md:block calendar-card bg-white p-6 rounded-xl shadow w-full max-w-md">
    //               <div className="flex justify-between items-center mb-4">
    //                 <h3 className="text-lg font-semibold text-gray-800">
    //                   {monthNames[month]} {year}
    //                 </h3>
    //                 <div className="flex items-center space-x-2">
    //                   <button
    //                     onClick={handlePrev}
    //                     className="text-gray-500 hover:text-indigo-600"
    //                   >
    //                     <i className="fas fa-chevron-left" />
    //                   </button>
    //                   <button
    //                     onClick={handleNext}
    //                     className="text-gray-500 hover:text-indigo-600"
    //                   >
    //                     <i className="fas fa-chevron-right" />
    //                   </button>
    //                 </div>
    //               </div>

    //               <div className="grid grid-cols-7 text-center text-sm font-medium text-gray-600 mb-2">
    //                 {days.map((day) => (
    //                   <div key={day}>{day}</div>
    //                 ))}
    //               </div>

    //               <div className="grid grid-cols-7 gap-2 text-sm text-center text-gray-800">
    //                 {Array.from({ length: firstDay }).map((_, index) => (
    //                   <div key={`empty-${index}`} />
    //                 ))}

    //                 {Array.from({ length: daysInMonth }, (_, i) => {
    //                   const day = i + 1;
    //                   const isCurrentDay = isToday(day);
    //                   return (
    //                     <div
    //                       key={day}
    //                       className={`py-2 rounded-lg transition cursor-pointer ${
    //                         isCurrentDay
    //                           ? "bg-[#0070C4] text-white font-semibold"
    //                           : "hover:bg-indigo-100"
    //                       }`}
    //                     >
    //                       {day}
    //                     </div>
    //                   );
    //                 })}
    //               </div>
    //             </div>

    //             <div className="calendar-events mt-6">
    //               <h4 className="text-md font-semibold text-gray-700 mb-3">
    //                 Upcoming Trips
    //               </h4>

    //               <div className="events-list space-y-4">
    //                 {bookings.length > 0 ? (
    //                   bookings.slice(0, 3).map((booking) => {
    //                     const travelDate = new Date(booking.travel_date);
    //                     const day = travelDate.getDate();
    //                     const month = travelDate.toLocaleString("default", {
    //                       month: "short",
    //                     });

    //                     return (
    //                       <div
    //                         key={booking.id}
    //                         className="event-item flex items-center gap-4 p-3 bg-gray-100 rounded-md shadow-sm"
    //                       >
    //                         <div className="event-date bg-indigo-600 text-white rounded-md w-12 h-12 flex flex-col items-center justify-center font-bold">
    //                           <span className="event-day text-lg">{day}</span>
    //                           <span className="event-month text-xs uppercase">
    //                             {month}
    //                           </span>
    //                         </div>

    //                         <div className="event-info">
    //                           <h5 className="event-title font-semibold text-gray-800">
    //                             {booking.package?.title || "Untitled Trip"}
    //                           </h5>
    //                         </div>
    //                       </div>
    //                     );
    //                   })
    //                 ) : (
    //                   <div className="no-events flex flex-col items-center text-gray-400 p-6 border border-dashed border-gray-300 rounded-lg">
    //                     <i className="fas fa-calendar-plus text-2xl mb-2"></i>
    //                     <p>No upcoming trips</p>
    //                   </div>
    //                 )}
    //               </div>
    //             </div>
    //           </div>

    //           {/* Loyalty Program */}
    //           <div className="bg-white p-6 rounded-2xl shadow-md">
    //             <h3 className="text-xl font-bold text-gray-800 mb-6">
    //               Loyalty Program
    //             </h3>

    //             {loading ? (
    //               <div className="flex justify-center items-center h-32">
    //                 <Loader2 className="animate-spin w-8 h-8 text-gray-600" />
    //               </div>
    //             ) : (
    //               <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
    //                 {/* Available Points */}
    //                 <div className="flex items-center gap-4 p-4 bg-gray-50 rounded-lg shadow-sm">
    //                   <div className="text-yellow-500 text-2xl">
    //                     <i className="fas fa-star"></i>
    //                   </div>
    //                   <div>
    //                     <p className="text-lg font-semibold text-gray-800">
    //                       {loyalty?.loyalty_points ?? 0}
    //                     </p>
    //                     <p className="text-sm text-gray-500">
    //                       Available Points
    //                     </p>
    //                   </div>
    //                 </div>

    //                 {/* Bonus Points  */}
    //                 <div className="flex items-center gap-4 p-4 bg-gray-50 rounded-lg shadow-sm">
    //                   <div className="text-red-500 text-2xl">
    //                     <i className="fas fa-times-circle"></i>
    //                   </div>
    //                   <div>
    //                     <p className="text-lg font-semibold text-gray-800">
    //                       {loyalty?.total_redeemed ?? 0}
    //                     </p>
    //                     <p className="text-sm text-gray-500">
    //                       Total Points Redeemed
    //                     </p>
    //                   </div>
    //                 </div>

    //                 {/* Donate Points */}
    //                 <div className="flex items-center gap-4 p-4 bg-gray-50 rounded-lg shadow-sm">
    //                   <div className="text-green-500 text-2xl">
    //                     <i className="fas fa-hands-helping"></i>
    //                   </div>
    //                   <div>
    //                     <p className="text-lg font-semibold text-gray-800">
    //                       {loyalty?.donate ?? 0}
    //                     </p>
    //                     <p className="text-sm text-gray-500">
    //                       Donated Points
    //                     </p>
    //                   </div>
    //                 </div>

    //                 {/* Membership Tier */}
    //                 <div className="flex items-center gap-4 p-4 bg-gray-50 rounded-lg shadow-sm">
    //                   <div className="text-indigo-500 text-2xl">
    //                     <i className="fas fa-gem"></i>
    //                   </div>
    //                   <div>
    //                     <p className="text-lg font-semibold text-gray-800">
    //                       {loyalty?.tier ?? "Bronze"}
    //                     </p>
    //                     <p className="text-sm text-gray-500">
    //                       Membership Tier
    //                     </p>
    //                   </div>
    //                 </div>
    //               </div>
    //             )}

    //             {/* Donate Button */}
    //             <div className="flex justify-center mt-6">
    //               <button
    //                 onClick={() => setOpenDonateModal(true)}
    //                 className="cursor-pointer  bg-secondary w-full  text-white font-semibold px-6 py-2 rounded-full shadow-md transition"
    //               >
    //                 Donate Points
    //               </button>
    //             </div>
    //           </div>
    //         </div>
    //       </div>

    //       {/* Recommended Trips */}
    //       <div className="hidden md:block lg:ml-9 pt-6 popular-trips space-y-6">
    //         <div className="section-header flex justify-between items-center">
    //           <h3 className="section-title text-xl font-semibold text-gray-800">
    //             Recommended For You
    //           </h3>
    //         </div>

    //         {loadingPackages ? (
    //           <p className="text-gray-600">Loading recommended trips...</p>
    //         ) : packages.length === 0 ? (
    //           <div className="no-trips-placeholder col-span-full flex flex-col items-center text-gray-400 p-6 border border-dashed border-gray-300 rounded-lg">
    //             <i className="fas fa-compass text-3xl mb-2"></i>
    //             <p className="text-sm">No recommended trips found</p>
    //           </div>
    //         ) : (
    //           <div className="trips-grid grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
    //             {packages.slice(0, 3).map((pkg) => (
    //               <div
    //                 key={pkg.id}
    //                 className="trip-card bg-white rounded-xl shadow overflow-hidden relative"
    //               >
    //                 <div className="trip-image-container relative">
    //                   <img
    //                     src={
    //                       packageImages[pkg.id] ||
    //                       "https://via.placeholder.com/150"
    //                     }
    //                     alt={pkg.title || "Trip"}
    //                     className="trip-image w-full h-56 object-cover"
    //                   />

    //                   <div className="trip-badge absolute top-2 left-2 bg-red-500 text-white text-xs px-2 py-1 rounded flex items-center gap-1">
    //                     <i className="fas fa-fire"></i> Popular
    //                   </div>
    //                 </div>

    //                 <div className="trip-info p-4 space-y-2">
    //                   <div className="trip-header flex justify-between items-center">
    //                     <h4 className="trip-title font-medium text-gray-800 text-lg">
    //                       {pkg.title}
    //                     </h4>
    //                   </div>

    //                   <p className="trip-location text-sm text-gray-500 flex items-center gap-1">
    //                     <i className="fas fa-map-marker-alt"></i>{" "}
    //                     {pkg.destination?.name || "Unknown"}
    //                   </p>

    //                   <div className="trip-meta flex gap-4 text-gray-500 text-sm">
    //                     <span className="trip-duration flex items-center gap-1">
    //                       <i className="fas fa-calendar-alt"></i>{" "}
    //                       {pkg.start_date} - {pkg.end_date}
    //                     </span>
    //                     <span className="trip-difficulty flex items-center gap-1">
    //                       <i className="fas fa-clock"></i> {pkg.duration_days}{" "}
    //                       Days
    //                     </span>
    //                   </div>

    //                   <div className="trip-footer flex justify-between items-center pt-2 border-t mt-2">
    //                     <span className="trip-price text-gray-800 font-semibold text-md">
    //                       USD {pkg.price_per_person}
    //                     </span>

    //                     <button
    //                       onClick={() => navigate(`/destination/${pkg?.id}`)}
    //                       className="cursor-pointer trip-book-btn bg-indigo-600 text-white text-sm px-4 py-2 rounded hover:bg-indigo-700 transition"
    //                     >
    //                       View Details
    //                     </button>
    //                   </div>
    //                 </div>
    //               </div>
    //             ))}
    //           </div>
    //         )}
    //       </div>

    //       {openDonateModal && (
    //         <DonatePointsModal
    //           loyalty={loyalty}
    //           onClose={() => setOpenDonateModal(false)}
    //         />
    //       )}
    //     </main>
    //   </div>
    // </div>

    //   <ToastContainer position="top-right" autoClose={3000} />
    //   {openDonateModal && (
    //     <DonatePointsModal
    //       loyalty={loyalty}
    //       onClose={() => setOpenDonateModal(false)}
    //     />
    //   )}
    //   {showModal && selectedPackageId && (
    //     <TripQuote
    //       packageId={selectedPackageId}
    //       onClose={() => {
    //         setShowModal(false);
    //         setSelectedPackageId(null);
    //       }}
    //     />
    //   )}
    // </div>
  );
}

export default UserDashboard;
