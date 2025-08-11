import SideNav from "../../components/SideNav";
import NavBar from "../../components/NavBar";
import API from "../../api/axiosClient";
import React, { useState, useEffect } from "react";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router-dom";
import TripQuote from "../../components/TripQuote";
import { FaTrash } from "react-icons/fa";

function Wishlist() {
  const [wishlist, setWishlist] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedPackageId, setSelectedPackageId] = useState(null);
  const [wishlistImages, setWishlistImages] = useState({});
  const navigate = useNavigate();

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
    const fetchWishlist = async () => {
      const token = localStorage.getItem("auth_token");
      if (!token) {
        navigate("/login");
        return;
      }

      API.defaults.headers.common["Authorization"] = `Bearer ${token}`;

      try {
        const res = await API.get("/wishlist");
        const wishlistData = res.data;

        setWishlist(wishlistData);

        const images = {};
        await Promise.all(
          wishlistData.map(async (item) => {
            if (item.package?.id) {
              const image = await fetchHeroImage(item.package.id);
              images[item.package.id] = image;
            }
          })
        );

        setWishlistImages(images);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching wishlist:", error);
        setLoading(false);
      }
    };

    fetchWishlist();
  }, [navigate]);

  const handleRemove = async (wishlistId) => {
    const token = localStorage.getItem("auth_token");

    try {
      await API.delete(`/wishlist/${wishlistId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setWishlist((prev) => prev.filter((item) => item.id !== wishlistId));
      toast.success("Removed from wishlist!");
    } catch (error) {
      console.error("Error removing from wishlist:", error);
      toast.error("Failed to remove from wishlist. Please try again.");
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
            <div className="flex">
              <div className="h-auto ">
                <main className="flex-1 lg:bg-gray-100 min-h-screen overflow-y-auto">
                  <div className="p-6 lg:ml-9">
                    <h2 className="text-3xl font-bold mb-6 text-gray-800">
                      Your Wishlist
                    </h2>

                    {loading ? (
                      <p className="text-gray-600 animate-pulse">
                        Loading wishlist...
                      </p>
                    ) : wishlist.length === 0 ? (
                      <div className="text-center text-gray-500 py-16">
                        <p className="text-lg font-semibold">
                          No items in wishlist.
                        </p>
                        <p className="text-sm mt-1">
                          Start exploring and add packages you love!
                        </p>
                      </div>
                    ) : (
                      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 pb-10 gap-6">
                        {wishlist.map((item) => (
                          <div
                            key={item.id}
                            className="bg-white rounded-xl shadow hover:shadow-lg transition-shadow duration-300 overflow-hidden flex flex-col h-full"
                          >
                            {/* Image Box */}
                            <div className="relative">
                              <img
                                src={
                                  wishlistImages[item.package?.id] ||
                                  "https://via.placeholder.com/300"
                                }
                                alt={item.package?.title || "Package"}
                                className="w-full h-52 object-cover transition-transform duration-300 group-hover:scale-105"
                              />
                              <div className="absolute top-2 left-2 bg-indigo-600 text-white text-xs px-2 py-1 rounded-md">
                                {item.package?.start_date} -{" "}
                                {item.package?.end_date}
                              </div>
                            </div>

                            {/* Package Content */}
                            <div className="p-4 flex flex-col flex-grow">
                              <h3 className="text-xl font-semibold text-gray-800 mb-2">
                                {item.package?.title || "No Title"}
                              </h3>

                              <p className="text-gray-600 text-sm mb-2 flex-grow">
                                {item.package?.description?.slice(0, 48) ||
                                  "No description available."}
                              </p>

                              <p className="text-indigo-700 font-bold mb-4">
                                USD{" "}
                                {item.package?.price_per_person?.toLocaleString() ||
                                  "N/A"}
                              </p>

                              {/* Button Group - always at bottom */}
                              <div className="mt-auto flex justify-between gap-2">
                                <button
                                  onClick={() => handleRemove(item.id)}
                                  className="bg-red-600 hover:bg-red-700 cursor-pointer text-white w-1/2 px-4 py-2 rounded-full flex items-center justify-center gap-2 transition"
                                >
                                  <FaTrash /> Remove
                                </button>

                                <button
                                  onClick={() =>
                                    setSelectedPackageId(item.package?.id)
                                  }
                                  className="bg-indigo-600 hover:bg-indigo-700 cursor-pointer text-white w-1/2 px-4 py-2 rounded-full transition"
                                >
                                  Get a Quote
                                </button>
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                </main>
              </div>

              {selectedPackageId && (
                <TripQuote
                  packageId={selectedPackageId}
                  onClose={() => setSelectedPackageId(null)}
                />
              )}
              <ToastContainer position="top-right" autoClose={3000} />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Wishlist;
