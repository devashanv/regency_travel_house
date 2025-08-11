import React, { useState, useEffect } from "react";
import NavBar1 from "../components/NavBar1";
import Footer from "../components/Footer";
import HomePackageCard from "../components/HomePackageCard";
import FAQs from "../components/FAQs";
import { useSearchParams, useLocation } from "react-router-dom";
import { IoMdArrowDropup, IoMdArrowDropdown } from "react-icons/io";
import LoyaltyDoll from "../components/LoyaltyDoll";
import HeaderLineArt from "../assets/packges_lineart.png";
import Pagination from "@mui/material/Pagination";
import Stack from "@mui/material/Stack";
import API from "../api/axiosClient";
import destinationBanner from '../assets/destinationBanner3.jpg';


function DestinationPackages(props) {
  const [allPackages, setAllPackages] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 11;

  const [searchParams] = useSearchParams();
  const getCategory = searchParams.get("category");
  const getCountry = searchParams.get("country");
  const getRegion = searchParams.get("region");

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const [selectedFilters, setSelectedFilters] = useState({
    country: [],
    category: [],
    price: [],
    days: [],
    activities: [],
  });
  const [openDropdown, setOpenDropdown] = useState("");

  const [searchTerm, setSearchTerm] = useState("");
  const [packages, setPackages] = useState([]);
  const [loading, setLoading] = useState(false);
  const [heroImage, setHeroImage] = useState(null);

  const handleSearch = async (e) => {
    e.preventDefault();
    if (!searchTerm.trim()) return;

    setLoading(true);
    try {
      const response = await API.get(`/packages/search?q=${searchTerm}`);
      setPackages(response.data);
      console.log(response.data);
    } catch (error) {
      console.error("Search failed", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const fetchHeroImage = async () => {
      if (!props.packageId) return;

      try {
        const res = await API.get(`/packages/${props.packageId}/images/hero`);
        if (res.data && res.data.filename) {
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

  useEffect(() => {
    const fetchPackages = async () => {
      try {
        let response;
        if (getCategory) {
          response = await API.get(`/packages/category/${getCategory}`);
        } else if (getCountry && getCountry !== "all") {
          response = await API.get(`/packages/country/${getCountry}`);
        } else if (getRegion && getRegion !== "all") {
          response = await API.get(`/packages/region/${getRegion}`);
        } else {
          response = await API.get("/packages");
        }
        setAllPackages(response.data);
      } catch (error) {
        console.error("Failed to fetch packages:", error);
      }
    };
    fetchPackages();
  }, [getCategory, getCountry, getRegion]);

  const handlePageChange = (_, value) => {
    setCurrentPage(value);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const toggleDropdown = (type) => {
    setOpenDropdown(openDropdown === type ? "" : type);
  };

  //Filter
  const handleSelectFilter = (type, value) => {
    if (!selectedFilters[type].includes(value)) {
      setSelectedFilters((prev) => ({
        ...prev,
        [type]: [...prev[type], value],
      }));
    }
  };

  const handleRemoveFilter = (type, value) => {
    setSelectedFilters((prev) => ({
      ...prev,
      [type]: prev[type].filter((item) => item !== value),
    }));
  };

  const dropdownFilter = (label, options, type) => (
    <div className="relative w-full lg:w-1/5 mx-1">
      <button
        onClick={() => toggleDropdown(type)}
        className="px-4 py-2 flex items-center w-full justify-between bg-white rounded-full hover:bg-gray-100 cursor-pointer"
      >
        <span>{label}</span>
        <IoMdArrowDropdown />
      </button>
      {openDropdown === type && (
        <div className="absolute z-10 mt-2 w-52 bg-white border border-gray-200 rounded-lg shadow-lg">
          {options.map((option) => (
            <div
              key={option}
              onClick={() => {
                handleSelectFilter(type, option);
                setOpenDropdown("");
              }}
              className="px-4 py-3 hover:bg-blue-100 cursor-pointer text-base"
            >
              {option}
            </div>
          ))}
        </div>
      )}
    </div>
  );

  const filteredPackages = allPackages.filter((pkg) => {
    let match = true;

    if (
      selectedFilters.country.length &&
      !selectedFilters.country.includes(pkg.destination?.country)
    )
      match = false;

    if (
      selectedFilters.category.length &&
      !selectedFilters.category.includes(pkg.category)
    )
      match = false;

    if (selectedFilters.price.length) {
      const price = parseFloat(pkg.price_per_person);
      const priceMatch = selectedFilters.price.some((option) => {
        if (option === "Below $500") return price < 500;
        if (option === "$500-$1000") return price >= 500 && price <= 1000;
        if (option === "Above $1000") return price > 1000;
        return false;
      });
      if (!priceMatch) match = false;
    }

    if (selectedFilters.days.length) {
      const days = pkg.duration_days;
      const daysMatch = selectedFilters.days.some((option) => {
        if (option === "1-3 days") return days >= 1 && days <= 3;
        if (option === "4-7 days") return days >= 4 && days <= 7;
        if (option === "8+ days") return days >= 8;
        return false;
      });
      if (!daysMatch) match = false;
    }

    if (selectedFilters.activities.length) {
      const activityList = pkg.activities
        ?.split(",")
        .map((a) => a.trim().toLowerCase());
      const activitiesMatch = selectedFilters.activities.some((a) =>
        activityList?.includes(a.toLowerCase())
      );
      if (!activitiesMatch) match = false;
    }

    return match;
  });

  const startIndex = (currentPage - 1) * itemsPerPage;
  const currentPackages = filteredPackages.slice(
    startIndex,
    startIndex + itemsPerPage
  );
  const totalPages = Math.ceil(filteredPackages.length / itemsPerPage);

  const countryOptions = [
    "India",
    "Sri Lanka",
    "Cambodia",
    "Loas",
    "Myanmar",
    "Thailand",
    "Singapore",
    "Malaysia",
    "Vietnam",
    "Egypt",
  ];
  const categoryOptions = ["Beach", "Adventure", "Cultural", "Family"];
  const priceOptions = ["Below $500", "$500-$1000", "Above $1000"];
  const daysOptions = ["1-3 days", "4-7 days", "8+ days"];
  const activityOptions = [
    "Adventures",
    "Boad Rides",
    "Cable Cars",
    "Cruise Journey",
    "Honeymoon",
  ];

  /*FAQs sectoion*/
  const [openIndex, setOpenIndex] = useState(null);

  const handleToggle = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  const faqs = [
    {
      title: "What documents are required for international travel?",
      content:
        "You'll typically need a valid passport, visa (if applicable), and any health documents such as vaccination certificates depending on your destination.",
    },
    {
      title: "Can I reschedule or cancel my booking?",
      content:
        "Yes, most bookings can be rescheduled or canceled within a certain time frame. Check your booking details or contact our support team for assistance.",
    },
    {
      title: "Do you offer travel insurance?",
      content:
        "Absolutely! We partner with leading providers to offer affordable and comprehensive travel insurance options.",
    },
    {
      title: "Do you offer travel insurance?",
      content:
        "Absolutely! We partner with leading providers to offer affordable and comprehensive travel insurance options.",
    },
    {
      title: "Do you offer travel insurance?",
      content:
        "Absolutely! We partner with leading providers to offer affordable and comprehensive travel insurance options.",
    },
  ];

  return (
    <>
      <header className="">
        <NavBar1 page="destination" />
      </header>

      {/* header section */}
      {/* <div className="w-full mx-auto bg-gray-100 py-20"> */}
        <div style={{ backgroundImage: `url(${destinationBanner})` }} className="bg-none  sm:bg-cover sm:bg-center sm:bg-no-repeat sm:bg-blend-multiply lg:h-[60dvh] pt-12 lg:pt-20 lg:pb-10 flex items-center">

        <div className="w-full lg:w-5/6 mx-auto flex flex-col lg:flex-row gap-8 px-4 sm:px-6">
          {/* Left Content Section */}
          <section className="w-full lg:w-3/5 text-left mb-4 lg:mb-10">
            <h1 className="text-2xl sm:text-3xl lg:text-5xl font-bold text-primary">
              Find Your Dream Package
            </h1>
            <p className="text-gray-500 font-normal text-base sm:text-lg mt-4 leading-relaxed lg:pr-10">
              Discover top travel packages tailored for unforgettable escapes.
              Handpicked destinations, seamless planning, exclusive deals,
              breathtaking views, cultural experiences, thrilling adventures,
              and personalized services — your perfect journey starts here with
              the best in travel.
            </p>
          </section>

          {/* Search Bar Section */}
          <section className="w-full lg:w-2/5">
            <div className="mt-4 lg:mt-5 mb-0">
              <form
                onSubmit={handleSearch}
                className="flex flex-col sm:flex-row gap-3 lg:gap-4"
              >
                <input
                  type="text"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  placeholder="Search your package here..."
                  className="w-full text-sm py-2 px-4 lg:py-3 rounded-full border-2 border-gray-300 text-black focus:ring-1 focus:ring-secondary/[0.2] focus:outline-none focus:border-secondary/[0.9] placeholder:text-gray-400 placeholder:text-xs lg:placeholder:text-sm hover:border-secondary"
                />
                <button
                  type="submit"
                  className="w-full sm:w-auto border-2 border-secondary rounded-full text-white text-xs lg:text-base bg-secondary font-semibold px-5 py-2 hover:bg-secondary/[0.8] transition"
                >
                  Search
                </button>
              </form>
            </div>
          </section>
        </div>
      </div>

      {/* Filter Bar */}
      <div className="w-5/6 mx-auto mt-20">
        <div className="lg:flex-row flex-col bg-white border w-full lg:w-full rounded-4xl lg:rounded-full p-3 flex justify-between">
          {dropdownFilter("Country", countryOptions, "country")}
          {dropdownFilter("Category", categoryOptions, "category")}
          {dropdownFilter("Price", priceOptions, "price")}
          {dropdownFilter("Days", daysOptions, "days")}
          {dropdownFilter("Activities", activityOptions, "activities")}
        </div>

        <div className="flex mb-4 flex-wrap gap-3 mt-5">
          {Object.entries(selectedFilters).flatMap(([type, values]) =>
            values.map((val) => (
              <div
                key={type + val}
                className="flex items-center bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm"
              >
                {val}
                <button
                  onClick={() => handleRemoveFilter(type, val)}
                  className="ml-2 font-bold"
                >
                  ×
                </button>
              </div>
            ))
          )}
        </div>

        {/* Packages*/}
        <div className="w-full mx-auto">
          <div className="flex px-5 gap-4 overflow-x-auto snap-x snap-mandatory scrollbar-hide sm:flex-wrap sm:justify-start sm:gap-9">
            <div className="hidden sm:block relative w-93 bg-gradient-to-br from-[#0b0a3d] via-[#261aa7] to-[#9b1d74] px-10 flex flex-col gap-4 py-8 h-122 rounded-[30px] flex-shrink-0 snap-start">
              <h1 className="text-5xl text-body font-bold leading-15">
                Collect Your Loyalty Points{" "}
              </h1>
              <h1 className="pt-6 text-lime-300 text-2xl font-bold">
                10% <span>per booking,</span>
              </h1>
              <LoyaltyDoll />
              <p className="mt-4 text-gray-200 text-normal">
                Join our Loyalty Program and turn every journey into rewards!
                Enjoy exclusive perks, member-only deals, and unforgettable
                experiences every time you travel with us
              </p>
            </div>

            {(searchTerm.trim() ? packages : currentPackages).map((pkg) => (
              <div
                key={pkg.id}
                className="min-w-[280px] max-w-xs snap-start flex-shrink-0 sm:flex-shrink sm:min-w-0 sm:max-w-none"
              >
                <HomePackageCard
                  packageId={pkg.id}
                  title={pkg.title}
                  description={pkg.description}
                  views={pkg.views}
                  months={`${pkg.start_date} - ${pkg.end_date}`}
                  duration={`${pkg.duration_days} Days`}
                  destinationId={pkg.destination_id}
                />
              </div>
            ))}
          </div>

          {!searchTerm.trim() && !currentPackages.length && (
            <p className="text-center text-gray-500 w-full mt-4">
              No results found.
            </p>
          )}
        </div>

        {/* Pagination */}
        <div className="flex justify-center mt-16">
          <Pagination
            count={totalPages}
            page={currentPage}
            color="primary"
            onChange={handlePageChange}
          />
        </div>
      </div>

      {/* FAQ */}
      <div className="flex my-10justify-center items-center h-auto my-20  py-5">
        <div className="w-5/6 h-full mx-auto">
          <div className="mb-10">
            <h2 className="text-xl font-semibold text-gray-600">
              Your Questions, Answered Clearly
            </h2>
            <p className="text-primary font-bold text-title mt-8 mb-3">FAQs</p>
            <p className="mb-3 text-gray-500">
              We understand that planning your journey comes with many
              questions. This section covers the most common inquiries to help
              you make informed decisions with confidence. If you need further
              assistance, our team is just a message away.
            </p>
          </div>

          {/* accordion */}
          <div>
            {faqs.map((faq, index) => (
              <FAQs
                key={index}
                title={faq.title}
                content={faq.content}
                isOpen={openIndex === index}
                onClick={() => handleToggle(index)}
              />
            ))}
          </div>
        </div>
      </div>

      {/* footer section*/}
      <div className="bg-primary bg-center lg:px-5 px-10 pt-10 print:hidden">
        <Footer />

        <hr className="mx-auto bg-secondary text-secondary h-[1px] w-5/6 lg:w-4/5 mt-5 " />
        <div>
          <p className="bg-primary text-center text-xs p-3 text-body">
            © All rights reserved by All In One Holdings.
          </p>
        </div>
      </div>
    </>
  );
}

export default DestinationPackages;
