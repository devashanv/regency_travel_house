import React, { useEffect, useState } from "react";
import Video1 from "../assets/hero-videos/1.mp4";
import Video2 from "../assets/hero-videos/5.mp4";
import Video3 from "../assets/hero-videos/2.mp4";
import { FaPhoneAlt, FaEnvelope, FaMapMarkerAlt } from "react-icons/fa";
import { BiPhoneCall } from "react-icons/bi";
import { MdOutlineEmail } from "react-icons/md";
import { GrLocation } from "react-icons/gr";
import { Link } from "react-router-dom";
import NavBar from "../components/NavBar";

function HeroSection() {
  const [current, setCurrent] = useState(0);

  const slides = [
    {
      video: Video1,
      title: "Discover Paradise on Earth",
      description:
        "Discover the breathtaking beauty of tropical islands with pristine beaches, crystal clear waters, and vibrant marine life. Experience paradise like never before with our exclusive island getaway packages.",
    },
    {
      video: Video3,
      title: "Travel. Explore. Live. Stuning.",
      description:
        "Create unforgettable memories with your loved one in the world's most romantic destinations. From private beach dinners to luxury spa treatments, we'll make your romantic dreams come true.",
    },
    {
      video: Video2,
      title: "Every Mile Tells a New Story",
      description:
        "Embark on thrilling adventures through rugged landscapes, towering mountains, and wild rivers. Our adventure tours are designed to challenge and inspire you while keeping safety our top priority.",
    },
  ];

  const contactInfo = [
    { icon: <FaPhoneAlt />, label: "+1 234 567 890" },
    { icon: <FaEnvelope />, label: "info@travelagency.com" },
    { icon: <FaMapMarkerAlt />, label: "123 Beach Avenue, Wanderlust City" },
  ];

  // Auto play every 6 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrent((prev) => (prev + 1) % slides.length);
    }, 8000);
    return () => clearInterval(interval);
  }, []);

  const handleDotClick = (index) => {
    setCurrent(index);
  };

  return (
    <>
      <div className="flex items-center justify-center">
        <div className="relative w-full md:h-[50vh] h-[90vh] lg:h-screen overflow-hidden font-sans lg:mt-[-80px] z-[-10]">
          {/* Videos */}
          {slides.map((slide, index) => (
            <video
              key={index}
              src={slide.video}
              autoPlay
              muted
              loop
              playsInline
              className={`absolute w-full h-full object-cover transition-opacity duration-1000 ease-in-out ${
                current === index ? "opacity-100 z-[-1]" : "opacity-0 z-0"
              }`}
            />
          ))}

          {/* Slide Content */}
          <div className=" lg:absolute lg:z-30 lg:inset-0 lg:flex lg:items-start bg-red200 lg:px-20 absolute z-30 inset-0 flex flex-col items-center px-10">
            {/* edit */}
            <div className=" lg:text-white lg:pt-25 lg:w-1/2 lg:flex lg:flex-col lg:justify-center lg:h-5/6 lg:space-y-10 md:w-4/5 text-white  full flex flex-col justify-center h-4/5 space-y-10">
              <h1 className="lg:text-[60px] lg:mt-[-50px] -mt-10 lg:font-bold lg:leading-tight lg:text-left  lg:pr-10text-[40px] text-center font-bold leading-tight">
                {slides[current].title}
              </h1>
              <p className="lg:text-lg lg:text-gray-200 lg:leading-8 lg:text-left lg:pr-5 md:text-lg text-base text-center text-gray-100 leading-6">
                {slides[current].description}
              </p>

              {/* edit */}
              {/* Dot Indicators */}
              <div className="lg:absolute lg:bottom-20 lg:left-27 lg:mt-20 lg:transform lg:-translate-x-1/2 lg:z-30 lg:flex lg:gap-2 absolute bottom-50 left-18 transform -translate-x-1/2 z-30 flex gap-2">
                {slides.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => handleDotClick(index)}
                    className={`w-3 h-3 rounded-full transition-all duration-300 ${
                      current === index ? "bg-white" : "bg-white/50"
                    }`}
                  />
                ))}
              </div>
            </div>

            {/* contact info */}
            <div className=" lg:absolute lg:w-80 md:flex-row lg:flex-col md:gap-5 lg:gap-2 lg:bottom-8 flex flex-col lg:right-8 lg:z-30 w-full gap-2 mt-[-10px] lg:mt-0 pb-5 lg:pb-0">
              <div className="flex flex-row w-full gap-1 group">
                <div className="bg-white/10 flex justify-center items-center lg:w-2/12 backdrop-blur-md rounded-full border border-white/20 lg:shadow-xl text-white group-hover:bg-secondary group-hover:cursor-pointer p-2 gap-3">
                  <BiPhoneCall className="text-lg" />
                </div>
                <div className="lg:bg-white/10 lg:w-10/12 w-full backdrop-blur-md rounded-full border border-white/20 shadow-xl text-white group-hover:bg-secondary group-hover:cursor-pointer">
                  <p className="p-3 lg:text-sm text-xs">+94 81 240 5050</p>
                </div>
              </div>

              <div className="flex flex-row w-full gap-1 group">
                <div className="bg-white/10 flex justify-center items-center lg:w-2/12 backdrop-blur-md rounded-full border border-white/20 lg:shadow-xl text-white group-hover:bg-secondary group-hover:cursor-pointer p-2 gap-3">
                  <MdOutlineEmail className="text-lg" />
                </div>
                <div className="lg:bg-white/10 lg:w-10/12 w-full backdrop-blur-md rounded-full border border-white/20 shadow-xl text-white group-hover:bg-secondary group-hover:cursor-pointer">
                  <p className="p-3 lg:text-sm text-xs">
                    info@regencytravelhouse.com
                  </p>
                </div>
              </div>

              <div className="flex flex-row w-full gap-1 group ">
                <div className="bg-white/10 flex justify-center items-center lg:w-2/12 backdrop-blur-md rounded-full border border-white/20 lg:shadow-xl text-white group-hover:bg-secondary group-hover:cursor-pointer p-2 gap-3">
                  <GrLocation className="text-lg" />
                </div>
                <div className="lg:bg-white/10 lg:w-10/12 w-full backdrop-blur-md rounded-full border border-white/20 shadow-xl text-white group-hover:bg-secondary group-hover:cursor-pointer">
                  <p className="p-3 lg:text-sm text-xs group-hover:bg-secondary group-hover:cursor-pointer lg:rounded-full">
                    {" "}
                    No 747/1A/A , Sirimavo Bandaranaike Mawatha,
                    Kandy, Sri Lanka.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* CTA Buttons */}
        <div className=" lg:flex items-center lg:items-left lg:justify-start lg:gap-4 lg:mt-2 flex justify-center gap-4 mt-10 absolute  bottom-[35dvh] lg:bottom-35 lg:left-20">
          <Link to="/contactus">
            <button className="border cursor-pointer z-888 text-sm lg:text-base border-white text-white px-6 py-3 rounded-full font-semibold hover:bg-white hover:text-black lg:transition">
              Get In Touch
            </button>
          </Link>
          <Link to="/destination-packages">
            <button className="bg-[#ec2326] cursor-pointer text-sm lg:text-base text-white px-6 py-3 rounded-full font-semibold hover:opacity-90 transition">
              Explore Destination
            </button>
          </Link>
        </div>
      </div>
    </>
  );
}

export default HeroSection;
