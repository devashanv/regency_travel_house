import React, { useState, useEffect } from "react";
import "../styles/HomePackageCard.css";
import { IoIosHeart } from "react-icons/io";
import { CiCalendar } from "react-icons/ci";
import { IoEyeOutline } from "react-icons/io5";
import { CiViewTimeline } from "react-icons/ci";
import { useNavigate, useLocation, Link } from "react-router-dom";
import API from "../api/axiosClient";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function HomePackageCard(props) {
  const [addedToWishlist, setAddedToWishlist] = useState(false);
  const [loading, setLoading] = useState(false);
  const [heroImage, setHeroImage] = useState(null);

  const navigate = useNavigate();
  const location = useLocation();

  const handleAddToWishlist = async () => {
    const token = localStorage.getItem("auth_token");

    if (!token) {
      toast.info("Please log in to add to your wishlist.");
      navigate("/login", { state: { from: location.pathname } });
      return;
    }

    if (addedToWishlist || loading) return;

    setLoading(true);
    try {
      const response = await API.post(
        "/wishlist",
        { package_id: props.packageId },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (response.status === 201) {
        setAddedToWishlist(true);
        toast.success("Added to wishlist!");
      }
    } catch (error) {
      if (error.response?.status === 409) {
        setAddedToWishlist(true);
        toast.info("This package is already in your wishlist!");
      } else {
        console.error("Wishlist error:", error);
        toast.error("Failed to add to wishlist");
      }
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const fetchHeroImage = async () => {
      if (!props.packageId) return;

      try {
        const res = await API.get(`/packages/${props.packageId}/images/hero`);
        if (res.data?.filename) {
          setHeroImage(
            `https://portal.knowmo.me/storage/images/${res.data.filename}`
          );
        }
      } catch (err) {
        console.error("Failed to load hero image", err);
      }
    };

    fetchHeroImage();
  }, [props.packageId]);

  return (
    <>
      <div className="hc-card-list rounded-4xl mt-2">
        <article className="hc-card bg-black">
          {/* Image */}
          <figure className="hc-card-image w-full h-55">
            <Link to={`/destination/${props.packageId}`}>
              {heroImage ? (
                <img
                  src={heroImage}
                  alt="Hero"
                  className="object-cover w-full h-full rounded-2xl"
                />
              ) : (
                <div className="w-full h-full bg-gray-200 flex items-center justify-center text-gray-500">
                  No Image Available
                </div>
              )}
            </Link>
          </figure>

          {/* Header */}
          <div className="hc-card-header px-5">
            {" "}
            <Link to={`/destination/${props.packageId}`}>
              <p className="font-semibold text-lg">{props.title}</p>
            </Link>
            <button
              className={`w-9 h-9 border-2 rounded-full flex justify-center items-center hover:bg-white hover:cursor-pointer ${
                addedToWishlist
                  ? "text-red-600 border-red-400"
                  : "text-gray-300 border-gray-200 hover:text-[#ff1212] hover:border-secondary"
              }`}
              onClick={handleAddToWishlist}
              disabled={loading}
              title={
                addedToWishlist ? "Already in Wishlist" : "Add to Wishlist"
              }
            >
              {loading ? (
                <span className="text-xs">...</span>
              ) : (
                <IoIosHeart className="mx-1 my-1 text-xl font-medium" />
              )}
            </button>
          </div>

          <Link to={`/destination/${props.packageId}`}>
            {/* Description */}
            <div className="px-5 my-3 text-gray-600 mb-12">
              <p className="text-sm text-gray-400 line-clamp-2">
                {props.description}
              </p>
              <button className="border border-secondary float-end hover:secondary mt-2 text-secondary px-4 py-2 text-xs rounded-full font-semibold transition hover:cursor-pointer">
                More Details
              </button>
            </div>

            {/* Footer */}
            <div className="hc-card-footer flex gap-5 px-5 text-sm">
              <div className="hc-card-meta">
                <CiViewTimeline className="text-lg" />
                <p className="flex gap-2">
                  <span>{props.months}</span>
                </p>
              </div>
              <div className="hc-card-meta">
                <CiCalendar className="text-lg" />
                <p>{props.duration}</p>
              </div>
            </div>
          </Link>
        </article>

        <ToastContainer position="top-right" autoClose={3000} />
      </div>
    </>
  );
}

export default HomePackageCard;
