import React, { useState, useRef, useEffect } from "react";
import NavBar1 from "../components/NavBar1";
import BreadCrumbs from "../components/BreadCrumbs";
import { MdLocationPin } from "react-icons/md";
import Itinerary from "../components/Itinerary";
import Footer from "../components/Footer";
// import html2pdf from "html2pdf.js";
// import { useReactToPrint } from "react-to-print";
import { MdAssistantDirection } from "react-icons/md";
import { MdOutlineAirplaneTicket } from "react-icons/md";
import { IoMailOutline } from "react-icons/io5";
import { FaWhatsapp } from "react-icons/fa";
import { MdSupportAgent } from "react-icons/md";
import { FaHeart } from "react-icons/fa";
import { FaShareNodes } from "react-icons/fa6";
import { HiPrinter } from "react-icons/hi2";
import { FaCalendarDay } from "react-icons/fa6";
import { FaHotel } from "react-icons/fa6";
import { BiSolidDish } from "react-icons/bi";
import { FaCar } from "react-icons/fa";
import { SiAdguard } from "react-icons/si";
import { FaClipboard } from "react-icons/fa";
import { IoIosCheckmarkCircle } from "react-icons/io";
import { IoLogoWhatsapp } from "react-icons/io";
import { ImMail4 } from "react-icons/im";
import { useNavigate } from "react-router-dom";
import { useParams } from "react-router-dom";
import API from "../api/axiosClient";
import { toast, ToastContainer } from "react-toastify";
import TripQuote from "../components/TripQuote";
import ComingSoon from "../components/ComingSoon";
import TourMap from "../components/TourMap";
import { FaLeaf } from "react-icons/fa";
import { SlCallOut } from "react-icons/sl";

function Destination() {
  //top mount
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  // share functionality
  const [copied, setCopied] = useState(false);
  const [open, setOpen] = useState(false);
  const currentUrl = window.location.href;

  const copyToClipboard = () => {
    navigator.clipboard.writeText(currentUrl).then(() => {
      setCopied(true);
      setTimeout(() => {
        setCopied(false);
        setOpen(false);
      }, 1500);
    });
  };

  const shareViaWhatsApp = () => {
    const whatsappUrl = `https://wa.me/?text=${encodeURIComponent(currentUrl)}`;
    window.open(whatsappUrl, "_blank");
  };

  const shareViaEmail = () => {
    const pageURL = window.location.href;
    const emailUrl = `https://mail.google.com/mail/?view=cm&fs=1&to=&su=Check%20out%20this%20travel%20package&body=${pageURL}&tf=1  `;
    window.open(emailUrl, "_blank");
  };

  /* contact feature */
  //via email
  const companyEmail = "info@regencytravelhouse.com";
  const handleEmailClick = () => {
    const emailUrl = `https://mail.google.com/mail/?view=cm&fs=1&to=${companyEmail}`;
    window.open(emailUrl, "_blank");
  };

  //via whatsapp
  const companyWhatsApp = "+94707945500";
  const handleWhatsAppClick = () => {
    const whatsappLink = `https://wa.me/${companyWhatsApp}`;
    window.open(whatsappLink, "_blank");
  };

  //via phone
  const phoneNumber = "+94812405050";
  const handleCallClick = () => {
    window.location.href = `tel:${phoneNumber}`;
  };

  // page print function
  const printRef = useRef();
  const [printMode, setPrintMode] = useState(false);

  const handlePrint = () => {
    if (!pkg || !pkg.itineraries) {
      toast.error("Content still loading. Please try again in a moment.");
      return;
    }

    setActiveBtn("about");
    setPrintMode(true);

    setTimeout(() => {
      requestAnimationFrame(() => {
        requestAnimationFrame(() => {
          window.print();
          setPrintMode(false);
        });
      });
    }, 400);
  };

  const [activeBtn, setActiveBtn] = useState("");
  const [activeIndex, setActiveIndex] = useState(null);

  const [showModal, setShowModal] = useState(false);
  const [addedToWishlist, setAddedToWishlist] = useState(false);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleScroll = (id) => {
    setActiveBtn(id);
    const section = document.getElementById(id);
    if (section) {
      section.scrollIntoView({ behavior: "smooth" });
    }
  };

  const TripAccordion = () => {
    const [openIndex, setOpenIndex] = useState(null);

    const toggleAccordion = (index) => {
      setOpenIndex(openIndex === index ? null : index);
    };
  };

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

    fetchPackage();
  }, [id]);

  const [heroImage, setHeroImage] = useState(null);

  useEffect(() => {
    const fetchHeroImage = async () => {
      if (!pkg?.id) return;

      try {
        const res = await API.get(`/packages/${pkg.id}/images/hero`);
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
  }, [pkg]);

  const [galleryImages, setGalleryImages] = useState([]);

  useEffect(() => {
    const fetchGalleryImages = async () => {
      if (!pkg?.id) return;

      try {
        const res = await API.get(`/packages/${pkg.id}/images`);
        const imageList = res.data.map((img) => ({
          ...img,
          url: `https://portal.knowmo.me/storage/images/${img.filename}`,
        }));
        console.log(imageList);
        setGalleryImages(imageList);
      } catch (err) {
        console.error("Failed to load gallery images", err);
      }
    };

    fetchGalleryImages();
  }, [pkg]);

  if (!pkg) return;

  if (pkg.description?.toLowerCase().includes("coming soon")) {
    return (
      <>
        {/* <SEO
          title={`${pkg.title} - Coming Soon | Regency Travel House`}
          description="This travel package will be available soon. Stay tuned for more details!"
          url={window.location.href}
          image="https://regency.knowmo.me/assets/RTH-logo.png"
        /> */}
        <header className="print:hidden">
          <NavBar1 page="destination" />
        </header>

        <ComingSoon
          title={pkg.title}
          heroImage={heroImage}
          onEmailClick={handleEmailClick}
          onWhatsAppClick={handleWhatsAppClick}
          onCallClick={handleCallClick}
        />

        {/* footer section*/}
        <div className="bg-primary bg-center lg:px-5 px-10 lg:pt-10 print:hidden">
          <Footer />

          <hr className="mx-auto bg-secondary text-secondary h-[1px] w-5/6 lg:w-4/5 mt-5 lg:mt-0" />
          <div>
            <p className="bg-primary text-center text-xs p-3 text-body">
              © All rights reserved by All In One Holdings.
            </p>
          </div>
        </div>
      </>
    );
  }

  const handleAddToWishlist = async () => {
    const token = localStorage.getItem("auth_token");
    if (!token) {
      toast.info("Please log in to add to your wishlist.");
      navigate("/login");
      return;
    }

    if (addedToWishlist || loading) return;

    setLoading(true);
    try {
      const response = await API.post(
        "/wishlist",
        { package_id: pkg.id },
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

  return (
    <>
      <header className="print:hidden">
        <NavBar1 page="destination" />
      </header>

      <div>
        <main className="print:bg-white print:text-black">
          {/* hero section */}
          <div className="relative w-full bg-cover bg-center h-[65vh] md:h-[40vh] lg:h-[70vh] rounded-2xl">
            {heroImage ? (
              <img
                src={heroImage}
                alt="Hero"
                className="object-cover w-full h-full rounded-2xl"
              />
            ) : (
              <div className="w-full object-cover h-full bg-gray-200 flex items-center justify-center text-gray-500">
                No Image Available
              </div>
            )}

            {/* Overlay */}
            <div className="absolute inset-0 bg-gradient-to-r from-black/80 to-transparent rounded-2xl z-10"></div>

            {/* Breadcrumbs */}
            <div className="absolute top-5 left-5 z-20">
              <BreadCrumbs />
            </div>

            {/* contact btns */}
            <div className="print:hidden absolute fixed md:top-100 top-120 lg:top-80 right-5 lg:right-10 flex flex-col gap-3 justify-end text-sm print:hidden z-80 print:text-black">
              <button
                onClick={handleEmailClick}
                className="flex w-15 h-15 items-center justify-center text-xl bg-black/30 backdrop-blur-sm border border-white/20 text-white rounded-full shadow-sm hover:shadow-md hover:bg-secondary hover:cursor-pointer text-white  transition"
              >
                <IoMailOutline />
              </button>
              <button
                onClick={handleWhatsAppClick}
                className="flex w-15 h-15 items-center justify-center text-xl bg-black/30 backdrop-blur-sm border border-white/20 text-white rounded-full shadow-sm hover:shadow-md hover:bg-secondary hover:cursor-pointer text-white  transition"
              >
                <FaWhatsapp />
              </button>
              <button
                onClick={handleCallClick}
                className="flex w-15 h-15 items-center justify-center text-xl bg-black/30 backdrop-blur-sm border border-white/20 text-white rounded-full shadow-sm hover:shadow-md hover:bg-secondary hover:cursor-pointer text-white  transition"
              >
                <SlCallOut />
              </button>
            </div>

            <div className="absolute inset-0 flex items-center px-5 md:px-10 lg:px-52 z-20">
              <div className="text-white w-full text-center md:text-center lg:text-left">
                <h1 className="text-5xl md:text-6xl font-bold mt-8  mb-4">
                  {pkg.title}
                </h1>

                <div className="flex flex-col md:flex-row md:justify-center lg:justify-start gap-3 md:gap-10 mb-5 text-white/80">
                  <p className="text-xl flex items-center gap-2">
                    <MdLocationPin className="w-4"/>
                    {pkg.destination.country}
                  </p>
                  <p className="text-xl flex items-center gap-2">
                    <FaCalendarDay className="text-base" />
                    <span>
                      {pkg.start_date} to {pkg.end_date}
                    </span>
                  </p>
                </div>

                <div className="flex flex-col md:flex-row md:justify-center lg:justify-start gap-3 md:gap-10 mb-5 text-white/80">
                  <p className="text-xl flex items-center gap-2">
                    <FaLeaf className="w-4" />
                    <span>
                      {pkg.footprint} CO<sub>2</sub>
                    </span>
                  </p>
                </div>

                <p className="text-3xl font-semibold text-white pb-1">
                  Starting From USD {pkg.price_per_person}
                </p>
                <p className="text-xs font-normal text-white/70">
                  (Conditions Apply)
                </p>

                <div className="mt-5 flex flex-col gap-5 print:hidden">
                  <div className="mt-5 flex flex-col gap-5 print:hidden">
                    <button
                      onClick={() => setShowModal(true)}
                      className="bg-[#ec2326] cursor-pointer w-40 hover:bg-red-700 text-white px-6 py-3 rounded-full font-semibold transition"
                    >
                      Get a Quote
                    </button>

                    {showModal && (
                      <TripQuote
                        packageId={pkg.id}
                        onClose={() => setShowModal(false)}
                      />
                    )}
                  </div>

                  <div className="flex gap-5 mt-6">
                    <button
                      className={`text-body border border-white px-6 py-3 rounded-full font-semibold hover:bg-white hover:text-[#0d1537] transition ${
                        addedToWishlist
                          ? "text-red-600 border-red-400"
                          : "text-gray-300 border-gray-200 hover:text-[#ff1212] hover:border-secondary"
                      }`}
                      onClick={handleAddToWishlist}
                      disabled={loading}
                      title={
                        addedToWishlist
                          ? "Already in Wishlist"
                          : "Add to Wishlist"
                      }
                    >
                      {loading ? (
                        <span className="text-xs">...</span>
                      ) : (
                        <FaHeart className="mx-1 my-1 cursor-pointer text-xl font-medium" />
                      )}
                    </button>

                    <button
                      onClick={() => setOpen(!open)}
                      className="text-body border cursor-pointer border-white px-6 py-3 rounded-full font-semibold hover:bg-white hover:text-[#0d1537] transition"
                    >
                      <FaShareNodes />
                    </button>
                    <button
                      onClick={handlePrint}
                      className="text-body border cursor-pointer border-white px-6 py-3 rounded-full font-semibold hover:bg-white hover:text-[#0d1537] transition"
                    >
                      <HiPrinter />
                    </button>

                    {/* share popup box */}
                    {open && (
                      <div className="fixed inset-0 z-50 flex items-center justify-center">
                        <div
                          className="absolute inset-0 bg-black/20 backdrop-blur-xs"
                          onClick={() => setOpen(false)}
                        ></div>

                        <div className="relative z-50 bg-white shadow-xl flex flex-col rounded-lg w-1/3 p-4 space-y-3 animate-fade-in">
                          <div className="text-center px-5">
                            <p className="text-primary font-bold text-title mt-8 mb-3">
                              Share This Destination
                            </p>
                            <p className="mb-3 text-gray-500">
                              Let your friends discover this amazing journey too
                              — copy the link or share it instantly!
                            </p>
                          </div>

                          <div className="flex gap-2">
                            {/* copy */}
                            <button
                              onClick={copyToClipboard}
                              className="w-1/3 h-30 bg-gray-100 hover:bg-gray-200 px-4 py-2 rounded hover:cursor-pointer"
                            >
                              {copied ? (
                                <p className="flex flex-col gap-2 text-xs justify-center items-center">
                                  <IoIosCheckmarkCircle className="w-15 h-15 p-3 text-green-400 rounded-full bg-white shadow" />
                                  Copied!
                                </p>
                              ) : (
                                <p className="flex flex-col gap-2 text-xs justify-center items-center text-primary">
                                  <FaClipboard className="w-15 h-15 p-3 text-secondary rounded-full bg-white shadow" />
                                  Copy to Clipboard
                                </p>
                              )}
                            </button>

                            {/* whatsapp */}
                            <button
                              onClick={shareViaWhatsApp}
                              className="w-1/3 h-30 bg-gray-100 hover:bg-gray-200 px-4 py-2 rounded hover:cursor-pointer"
                            >
                              <p className="flex flex-col gap-2 text-xs justify-center items-center text-primary">
                                <IoLogoWhatsapp className="w-15 h-15 p-3 text-secondary rounded-full bg-white shadow" />
                                Via WhatsApp
                              </p>
                            </button>

                            {/* email */}
                            <button
                              onClick={shareViaEmail}
                              className="w-1/3 h-30 bg-gray-100 hover:bg-gray-200 px-4 py-2 rounded hover:cursor-pointer"
                            >
                              <p className="flex flex-col gap-2 text-xs justify-center items-center text-primary">
                                <ImMail4 className="w-15 h-15 p-3 text-secondary rounded-full bg-white shadow text-primary" />
                                Via Email
                              </p>
                            </button>
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* tabs section */}
          <div className="">
            {/* Tabs */}
            <header className="mt-10 top-0 z-50 w-full lg:w-1/2 mx-auto p-5">
              <div className="container mx-auto flex space-x-6 card-shadow justify-around gap-0 text-white flex rounded-full">
                <button
                  onClick={() => handleScroll("about")}
                  className={
                    activeBtn == "about"
                      ? "text-body w-1/4 h-full transition duration-150 py-3 rounded-full bg-primary text-body hover:cursor-pointer"
                      : "text-gray-600 w-1/4 h-full transition duration-150 py-3 rounded-full hover:bg-primary hover:text-body hover:cursor-pointer"
                  }
                >
                  About
                </button>
                <button
                  onClick={() => handleScroll("map")}
                  className={
                    activeBtn == "map"
                      ? "text-body w-1/4 h-full transition duration-150 py-3 rounded-full bg-primary hover:text-body hover:cursor-pointer"
                      : "text-gray-600 w-1/4 h-full transition duration-150 py-3 rounded-full hover:bg-primary hover:text-body hover:cursor-pointer"
                  }
                >
                  Map
                </button>
                <button
                  onClick={() => handleScroll("itineraries")}
                  className={
                    activeBtn == "itineraries"
                      ? "text-body w-1/4 h-full transition duration-150 py-3 rounded-full bg-primary hover:text-body hover:cursor-pointer"
                      : "text-gray-600 w-1/4 h-full transition duration-150 py-3 rounded-full hover:bg-primary hover:text-body hover:cursor-pointer"
                  }
                >
                  Itineraries
                </button>
                <button
                  onClick={() => handleScroll("gallery")}
                  className={
                    activeBtn == "gallery"
                      ? "text-body w-1/4 h-full transition duration-150 py-3 rounded-full bg-primary hover:text-body hover:cursor-pointer"
                      : "text-gray-600 w-1/4 h-full transition duration-150 py-3 rounded-full hover:bg-primary hover:text-body hover:cursor-pointer"
                  }
                >
                  Gallery
                </button>
              </div>
            </header>

            {/* Page Sections */}
            <main className="space-y-20 lg:px-4 py-10 w-5/6 mx-auto print:text-black print:mt-5">
              <section id="about" className="flex lg:flex-row flex-col">
                <div className="w-full lg:w-2/5">
                  <h2 className="text-3xl mt-5 font-bold mb-2 text-center lg:text-left print:text-black">
                    {pkg.title}
                  </h2>

                  <p className="text-gray-400 text-sm mt-5 lg:pr-5 leading-6 text-justify lg:text-left print:text-black">
                    {pkg.description}
                  </p>

                  <p className="flex test-xs text-gray-500 mt-5 gap-2 mr-20 print:text-black">
                    <span>Activities:</span>
                    <span>{pkg.activities}</span>
                  </p>
                  {/* includes & eexcludes */}
                  <div className="w-full mt-[-40px] text-gray-600 ">
                    <div className="flex flex-col gap-3 w-full mt-8">
                      <div className="w-full py-10 print:text-black">
                        <p className="print:text-black">Includes:</p>
                        <div className="flex flex-wrap justify-start gap-4 mt-4">
                          {pkg.include?.split(",").map((item, idx) => (
                            <span
                              key={idx}
                              className="flex items-center gap-2 px-4 py-2 bg-white card-shadow   text-gray-500 rounded-full text-sm sm:text-sm font-medium"
                            >
                              {item.trim()}
                            </span>
                          ))}
                        </div>
                      </div>

                      <div className="w-full print:text-black">
                        <p className="print:text-black">Excludes:</p>

                        <div className="flex flex-wrap justify-start gap-4 mt-4 print:text-black">
                          {pkg.exclude?.split(",").map((item, idx) => (
                            <span
                              key={idx}
                              className="flex items-center gap-2 px-4 py-2 bg-red-100 text-gray-500 rounded-full text-sm sm:text-sm font-medium"
                            >
                              {item.trim()}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* gallery section - desktop*/}
                <div className="hidden lg:block w-3/5">
                  <section id="gallery" className="p-6 max-w-7xl mx-auto">
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 auto-rows-[200px] gap-4">
                      {galleryImages.map((img, i) => (
                        <div
                          key={i}
                          className="relative overflow-hidden rounded-xl shadow-md group"
                        >
                          <img
                            src={img.url}
                            alt={`Gallery ${i + 1}`}
                            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                          />
                        </div>
                      ))}
                      {galleryImages.length === 0 && (
                        <p className="text-gray-500 text-sm">
                          No images available for this package.
                        </p>
                      )}
                    </div>
                  </section>
                </div>

                {/* gallery section - mobile*/}
                <div className="w-full lg:w-3/5 lg:hidden">
                  <section
                    id="gallery"
                    className="pt-10 lg:p-6 w-full lg:max-w-7xl mx-auto"
                  >
                    <div className="grid lg:grid-cols-1 grid-cols-3 md:grid-cols-3 auto-rows-[200px] gap-4">
                      {galleryImages.map((img, i) => (
                        <div
                          key={i}
                          className="relative overflow-hidden rounded-xl shadow-md group"
                        >
                          <img
                            src={img.url}
                            alt={`Gallery ${i + 1}`}
                            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                          />
                        </div>
                      ))}
                      {galleryImages.length === 0 && (
                        <p className="text-gray-500 text-sm">
                          No images available for this package.
                        </p>
                      )}
                    </div>
                  </section>
                </div>
              </section>
            </main>
          </div>
        </main>

        {/* common cards */}
        <section className="px-6 py-8 w-full mt-10 lg:mt-10 print:text-black">
          <div className="mx-auto w-full grid grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-6 text-center">
            <div className="flex flex-col items-center space-y-3">
              <div className="text-3xl md:text-4xl lg:text-5xl p-6 md:p-8 lg:p-10 rounded-full bg-primary card-shadow flex items-center justify-center">
                <FaHotel className="text-indigo-200" />
              </div>
              <h3 className="font-semibold text-base md:text-lg text-black">
                Accommodation
              </h3>
              <p className="text-xs md:text-sm lg:text-base text-gray-500 px-3 md:px-20 lg:px-0">
                Stay in cozy, stylish places with comfort and luxury.
              </p>
            </div>

            <div className="flex flex-col items-center space-y-3">
              <div className="text-3xl md:text-4xl lg:text-5xl p-6 md:p-8 lg:p-10 rounded-full bg-primary card-shadow flex items-center justify-center">
                <FaCar className="text-indigo-200" />
              </div>
              <h3 className="font-semibold text-base md:text-lg text-black">
                Transport
              </h3>
              <p className="text-xs md:text-sm lg:text-base text-gray-500 px-3 md:px-20 lg:px-0">
                Smooth, reliable travel tailored to your comfort.
              </p>
            </div>

            <div className="flex flex-col items-center space-y-3">
              <div className="text-3xl md:text-4xl lg:text-5xl p-6 md:p-8 lg:p-10 rounded-full bg-primary card-shadow flex items-center justify-center">
                <BiSolidDish className="text-indigo-200" />
              </div>
              <h3 className="font-semibold text-base md:text-lg text-black">
                Meals
              </h3>
              <p className="text-xs md:text-sm lg:text-base text-gray-500 px-3 md:px-20 lg:px-0">
                Enjoy local meals crafted to delight your taste buds.
              </p>
            </div>

            <div className="flex flex-col items-center space-y-3">
              <div className="text-3xl md:text-4xl lg:text-5xl p-6 md:p-8 lg:p-10 rounded-full bg-primary card-shadow flex items-center justify-center">
                <SiAdguard className="text-indigo-200" />
              </div>
              <h3 className="font-semibold text-base md:text-lg text-black">
                Safety
              </h3>
              <p className="text-xs md:text-sm lg:text-base text-gray-500 px-3 md:px-20 lg:px-0">
                Travel safe with trusted partners and 24/7 support.
              </p>
            </div>
          </div>
        </section>

        {/* itineraries */}
        <div className="w-5/6 h-auto md:mt-15 lg:mt-0 mx-auto flex flex-col lg:flex-row lg:py-20 print:block print:text-black">
          <section id="itineraries" className="w-full lg:w-1/2 h-auto">
            <h2 className="text-3xl font-bold mb-4">Itineraries</h2>

            {/* list of your code section */}
            <div className="w-full lg:max-w-2xl mx-auto p-6">
              {pkg.itineraries
                ?.slice()
                .sort((a, b) => a.dayNumber - b.dayNumber)
                .map((day, index) => (
                  <Itinerary
                    key={index}
                    index={index}
                    day={day}
                    // isActive={activeIndex === index}
                    isActive={printMode || activeIndex === index}
                    onToggle={() => {
                      setActiveIndex(index === activeIndex ? null : index);
                      window.flyToCoords(
                        day.latitude,
                        day.longitude,
                        day.zoom_level || 15
                      );
                    }}
                  />
                ))}
              <p className="text-xl flex items-center gap-2">
                {pkg.itineraries?.title}
              </p>
            </div>
          </section>

          <section
            id="map"
            className="w-1/2  lg:w-full min-h-screen lg:px-10  print:text-black print:hidden"
          >
            <h2 className="text-3xl font-bold mb-4">Map</h2>
            <TourMap packageId={id} />
          </section>
        </div>
      </div>

      {/* footer section*/}
      <div className="bg-primary bg-center lg:px-5 px-10 lg:pt-10 print:hidden">
        <Footer />

        <hr className="mx-auto bg-secondary text-secondary h-[1px] w-5/6 lg:w-4/5 mt-5 lg:mt-0" />
        <div>
          <p className="bg-primary text-center text-xs p-3 text-body">
            © All rights reserved by All In One Holdings.
          </p>
        </div>
      </div>
    </>
  );
}

export default Destination;
