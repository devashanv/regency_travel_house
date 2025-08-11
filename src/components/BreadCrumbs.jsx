import { ChevronRight } from "lucide-react";
import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import API from "../api/axiosClient";

const BreadCrumbs = () => {
  const { id } = useParams();
  const [pkg, setPkg] = useState(null);

  useEffect(() => {
    const fetchPackage = async () => {
      try {
        const response = await API.get(`/packages/${id}`);
        console.log("Package data:", response.data);
        setPkg(response.data);
      } catch (error) {
        console.error("Failed to fetch package:", error);
      }
    };

    if (id) {
      fetchPackage();
    }
  }, [id]);

  return (
    <nav
      className="text-sm w-auto bg-black/5 backdrop-blur-sm border border-white/20 text-white px-6 py-3 rounded-2xl"
      aria-label="Breadcrumb"
    >
      <ol className="flex items-center space-x-1 sm:space-x-2">
        <li>
          <Link to="/" className="hover:underline text-white/80 font-medium">
            Home
          </Link>
        </li>
        <li>
          <ChevronRight className="w-4 h-4 text-white/70" />
        </li>
        <li>
          <Link
            to="/destination-packages"
            className="hover:underline text-white/80 font-medium cursor-pointer"
          >
            Packages
          </Link>
        </li>
        <li>
          <ChevronRight className="w-4 h-4 text-white/70" />
        </li>
        <li className="text-white" aria-current="page">
          {pkg?.title || "Loading..."}
        </li>
      </ol>
    </nav>
  );
};

export default BreadCrumbs;
