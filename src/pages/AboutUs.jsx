import React, { useEffect, useState } from "react";
import NavBar1 from "../components/NavBar1";
import { GiThreeLeaves } from "react-icons/gi";
import { FaPeopleRoof } from "react-icons/fa6";
import { FaUsers } from "react-icons/fa";
import { FaPlaneDeparture } from "react-icons/fa";
import { LuCrown } from "react-icons/lu";
import { IoArrowDown } from "react-icons/io5";
import Footer from "../components/Footer";
import { Link } from "react-router-dom";
import Slider from "react-slick";
import aboutBanner from '../assets/aboutBanner4.jpg';

import "../styles/fonts.css";

function AboutUs() {
  //top mount
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const [showOverlay, setShowOverlay] = useState(true);

  const handlePlay = (e) => {
    e.target.play();
    setShowOverlay(false);
  };

  // tem members
  const team = [
    {
      name: "Anjali de Silva",
      position: "Tour Manager",
      image: "/team/team1.jpg",
    },
    {
      name: "Dilshan Perera",
      position: "Travel Consultant",
      image: "/team/team3.jpg",
    },
    {
      name: "Geetha Fernando",
      position: "Operations Head",
      image: "/team/team1.jpg",
    },
    {
      name: "Aarav Singh",
      position: "Marketing Lead",
      image: "/team/team4.jpg",
    },
    {
      name: "Sashindu Kulasignhe",
      position: "Customer Relations",
      image: "/team/team8.jpg",
    },
    {
      name: "Mihindu Rajanayake",
      position: "Destination Expert",
      image: "/team/team6.jpg",
    },
  ];

  const settings = {
    infinite: true,
    speed: 500,
    slidesToShow: 5,
    slidesToScroll: 1,
    arrows: false,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  };

  // team
  const teamSliderSettings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1,
    arrows: false,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
          arrows: false,
        },
      },
      {
        breakpoint: 900,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 2,
          centerPadding: "0",
        },
      },
    ],
  };

  const [activeBtn, setActiveBtn] = useState("");
  const [activeIndex, setActiveIndex] = useState(null);

  const handleScroll = (id) => {
    setActiveBtn(id);
    const section = document.getElementById(id);
    if (section) {
      section.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <>
      {/* header */}
      <header>
        <NavBar1 page="about" />
      </header>

      <main>
        {/* landing section */}
        {/* <div className="bg-gray-100 pt-20 pb-10 w-full flex"> */}
        <div  style={{ backgroundImage: `url(${aboutBanner})` }} className="bg-none sm:bg-cover sm:bg-center sm:bg-no-repeat sm:bg-blend-multiply lg:h-[80dvh] pt-12 lg:pt-20 lg:pb-10 flex items-center">
          <div className="w-5/6 mx-auto flex lg:flex-row flex-col">
            <section className="py-2 text-left w-full lg:w-4/6 mb-4 leading-line-height mb-10 lg:pr-40">
              <h1 className="text-lg font-bold lg:text-5xl text-primary text-center lg:text-left">
                Your Journey, Our Passion
              </h1>
              <p className="text-gray-400 font-normal text-base mt-6 w-full leading-7 text-justify lg:text-left">
                At Regency Travel House, travel isn’t just about destinations,
                it’s about the stories, the people, and the unforgettable
                moments. We're a team of explorers, planners, and dreamers
                committed to turning your travel dreams into beautifully crafted
                experiences.
              </p>
              <div className="flex items-center">
                <div className="w-full flex justify-center sm:justify-start">
                  <button
                    onClick={() => handleScroll("offer")}
                    className={
                      "border-2 border-secondary rounded-full text-body text-xs md:w-1/3 lg:w-45 lg:text-base hover:bg-secondary/[0.8] hover:cursor-pointer transition duration-300 ease-in-out hover:border-transparent bg-secondary font-semibold px-3 py-3 flex gap-2 justify-center items-center mt-10"
                    }
                  >
                    <span>More About Us </span>
                    <IoArrowDown />
                  </button>
                </div>
              </div>
            </section>

            {/* <section className="flex w-full lg:w-2/6 justify-end gap-4">
              <img
                src="about1.jpg"
                alt=""
                className="w-2/3 mx-auto lg:w-full h-full left-0 rounded-full object-cover"
              />
            </section> */}
          </div>
        </div>

        {/* about us */}
        <div className="flex justify- mb-10 mt-20 items-center h-auto lg:h-[90vh]">
          <div className="w-5/6 mx-auto flex h-5/6 flex-col-reverse lg:flex-row">
            {/* Image Section */}
            <div className="w-full lg:w-1/2 flex justify-center mt-10 lg:mt-0">
              <img
                src="lady1.jpg"
                alt="about us banner image"
                className="w-1/2 h-60 lg:h-5/6 border-6 border-white/20 backdrop-blur-md object-cover rounded-4xl"
              />
              <img
                src="baloon6.jpg"
                alt="about us banner image"
                className="w-1/2 h-60 lg:h-5/6 border-6 border-white/20 backdrop-blur-md object-cover ml-[-50px] mt-10 lg:ml-[-100px] lg:mt-20 rounded-4xl"
              />
            </div>

            <section className="w-full lg:w-1/2 text-left leading-line-height lg:pr-10">
              <div className="">
                <h2 className="text-xl font-semibold text-gray-600 text-center lg:text-left">
                  Who are we?
                </h2>
                {/* <p className="text-primary sinhala-text font-bold text-6xl mt-8 mb-6 lg:mb-4 text-center lg:text-left">
                  ආයුබෝවන්!
                </p> */}
                <p className="text-primary tracking-wider sinhala-text font-bold text-6xl mt-8 mb-6 lg:mb-4 text-center lg:text-left">
                  wdhqfndajka
                </p>

                <p className="text-primary font-bold text-title  mb-6 lg:mb-4 text-center lg:text-left">
                  Welcome to Regency Travel House.
                </p>
                <p className="mb-3 text-gray-500 text-justify">
                  At Regency Travel House (Pvt) Ltd, we believe that travel is
                  more than just a journey it’s an experience that enriches the
                  soul. Established in 2025, our mission is to craft
                  personalized, immersive, and unforgettable travel experiences,
                  whether exploring the breathtaking beauty of Sri Lanka or
                  venturing across the world.
                </p>
              </div>

              <div className="mt-10">
                <div className="w-full flex justify-center">
                  <ul className="grid grid-cols-3 lg:grid-cols-3 justify-items-center gap-5">
                    <li className="flex flex-col gap-2 justify-center items-center">
                      <GiThreeLeaves className="text-4xl text-secondary" />
                      <p className="text-center">Respect for Nature</p>
                      <p className="text-center text-gray-400 text-xs lg:text-base">
                        We are committed to sustainable tourism...
                      </p>
                    </li>
                    <li className="flex flex-col gap-2 justify-center items-center">
                      <FaPeopleRoof className="text-4xl text-secondary" />
                      <p className="text-center">Respect for People</p>
                      <p className="text-center text-gray-400 text-xs lg:text-base">
                        We actively support local schools...
                      </p>
                    </li>
                    <li className="flex flex-col gap-2 justify-center items-center">
                      <FaUsers className="text-4xl text-secondary mt-[-20px] lg:mt-0" />
                      <p className="text-center">Respect for Each Other</p>
                      <p className="text-center text-gray-400 text-xs lg:text-base">
                        By fostering a positive culture...
                      </p>
                    </li>
                  </ul>
                </div>
              </div>
            </section>
          </div>
        </div>

        {/* sustainability - desktop */}
        <div className="hidden lg:flex items-center h-auto lg:h-[90vh]">
          <div className="w-5/6 mx-auto h-5/6 flex gap-5">
            <div className="w-2/3 rounded-4xl">
              <img
                src="test2.jpg"
                alt="Beautiful Destination"
                className="w-full h-full object-cover z-1  rounded-4xl"
              />
              <div className="mt-[-250px] px-20 bg-white/10 backdrop-blur-lg border border-white/20 py-5 text-center">
                <h2 className="text-xl font-semibold text-body">
                  Sustainability
                </h2>
                <p className="text-base font-normal text-gray-200">
                  At Regency Travel House, we believe in responsible and ethical
                  travel that positively impacts communities and the
                  environment.{" "}
                </p>
                <button className="px-6 mt-5 py-2 bg-secondary hover:bg-secondary/[0.8] hover:cursor-pointer text-white font-medium rounded-full border border-white/30 transition duration-300">
                  <Link to="/sustainability">Explore more </Link>
                </button>
              </div>
            </div>

            <div className="w-1/3">
              <img
                src="team/team7.jpg"
                alt="Beautiful Destination"
                className="w-full h-full object-cover z-1  rounded-4xl"
              />
              <div className="mt-[-250px] px-10 bg-white/10 backdrop-blur-lg border border-white/20 py-5 text-center">
                <h2 className="text-xl font-semibold text-body">
                  Rais Of Hope
                </h2>
                <p className="text-base font-normal text-gray-100">
                  We are dedicated to uplifting underprivileged schools.
                </p>
                <button className="px-6 mt-5 py-2 bg-secondary hover:bg-secondary/[0.8] hover:cursor-pointer text-white font-medium rounded-full border border-white/30 transition duration-300">
                  <Link to="/sustainability">Explore more </Link>
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* offerfeatures */}
        <div className="flex mt-20 mb-20 justify-center items-center lg:my-20 bg-neutral-100 py-5">
          <div className="w-full h-full px-10" id="offer">
            <div className="mb-10">
              <h2 className="text-xl font-semibold text-gray-600 text-center lg:text-left">
                What we offer?
              </h2>
              <p className="text-primary font-bold text-title mt-8 mb-3 text-center lg:text-left">
                We Bring Your Travel Dreams to Life!
              </p>
              <p className="mb-3 text-gray-500 text-justify lg:text-left">
                We don’t just book your trip we bring your travel dreams to life
                with seamless service and attention to every need.
              </p>
            </div>

            {/* React Slick Slider */}
            <Slider {...settings}>
              <div className="min-w-[250px] bg-white shadow rounded-2xl p-6 hover:shadow-lg transition">
                <div className="mb-4">
                  <FaPlaneDeparture className="bg-secondary text-white text-5xl p-2 rounded-full" />
                </div>
                <h3 className="text-xl font-semibold text-gray-700 mb-2">
                  Air Travel
                </h3>
                <p className="text-gray-600 text-base">
                  Lorem, ipsum dolor sit amet consectetur adipisicing elit.
                  Maiores, fugiat.
                </p>
              </div>

              <div className="min-w-[250px] bg-white shadow rounded-2xl p-6 hover:shadow-lg transition">
                <div className="mb-4">
                  <FaPlaneDeparture className="bg-secondary text-white text-5xl p-2 rounded-full" />
                </div>
                <h3 className="text-xl font-semibold text-gray-700 mb-2">
                  Air Travel
                </h3>
                <p className="text-gray-600 text-base">
                  Lorem, ipsum dolor sit amet consectetur adipisicing elit.
                  Maiores, fugiat.
                </p>
              </div>

              <div className="min-w-[250px] bg-white shadow rounded-2xl p-6 hover:shadow-lg transition">
                <div className="mb-4">
                  <FaPlaneDeparture className="bg-secondary text-white text-5xl p-2 rounded-full" />
                </div>
                <h3 className="text-xl font-semibold text-gray-700 mb-2">
                  Air Travel
                </h3>
                <p className="text-gray-600 text-base">
                  Lorem, ipsum dolor sit amet consectetur adipisicing elit.
                  Maiores, fugiat.
                </p>
              </div>

              <div className="min-w-[250px] bg-white shadow rounded-2xl p-6 hover:shadow-lg transition">
                <div className="mb-4">
                  <FaPlaneDeparture className="bg-secondary text-white text-5xl p-2 rounded-full" />
                </div>
                <h3 className="text-xl font-semibold text-gray-700 mb-2">
                  Air Travel
                </h3>
                <p className="text-gray-600 text-base">
                  Lorem, ipsum dolor sit amet consectetur adipisicing elit.
                  Maiores, fugiat.
                </p>
              </div>
            </Slider>
          </div>
        </div>

        {/* sustainability - mobile */}
        <div className="flex lg:hidden justify-center my-10 items-center md:h-auto h-[58vh] md:h-[70vh] px-10 md:mt-30">
          <div className="w-full lg:w-5/6 mx-auto flex flex-col md:flex-row md:gap-5 lg:flex-row gap-15 mt-[-10px]">
            <h2 className="text-xl md:hidden font-semibold text-gray-600 text-center mb-[-20px]">
              Our sustainability.
            </h2>
            <div className="w-full lg:w-2/3 rounded-4xl relative">
              <img
                src="test2.jpg"
                alt="Beautiful Destination"
                className="w-full h-full object-cover z-1 rounded-4xl"
              />
              <div className="mt-[-140px] px-5 lg:px-20 bg-white/10 backdrop-blur-lg border border-white/20 py-2 text-center">
                <h2 className="text-xl font-semibold text-body">
                  Sustainability
                </h2>
                <p className="hidden text-base font-normal text-gray-200">
                  At Regency Travel House, we believe in responsible and ethical
                  travel that positively impacts communities and the
                  environment.
                </p>
                <button className="px-6 mt-5 py-2 bg-secondary hover:bg-secondary/[0.8] hover:cursor-pointer text-white font-medium rounded-full border border-white/30 transition duration-300">
                  <Link to="/sustainability">Explore more</Link>
                </button>
              </div>
            </div>

            <div className="w-full lg:w-1/3 relative">
              <img
                src="team/team7.jpg"
                alt="Beautiful Destination"
                className="w-full h-full object-cover z-1 rounded-4xl"
              />
              <div className="mt-[-140px] px-5 lg:px-20 bg-white/10 backdrop-blur-lg border border-white/20 py-2 text-center">
                <h2 className="text-xl font-semibold text-body">
                  Rise of Hope
                </h2>
                <p className="hidden text-base font-normal text-gray-100">
                  We are dedicated to uplifting underprivileged schools.
                </p>
                <button className="px-6 mt-5 py-2 bg-secondary hover:bg-secondary/[0.8] hover:cursor-pointer text-white font-medium rounded-full border border-white/30 transition duration-300">
                  <Link to="/sustainability">Explore more</Link>
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* video */}
        {/* <div className="flex flex-col justify-center bg-neutral-50 py-10 items-center lg:h-[90vh] mt-30 mb-20">
          <div className="lg:hidden mt-[-25px] px-10 mb-5 md:px-20">
            <h2 className="text-xl font-semibold text-gray-600 py-5 text-center">
              Elegance in Every Journey
            </h2>
            <p className="mb-3 text-base text-justify  text-gray-500">
              Experience bespoke luxury travel like never before exclusive
              destinations, seamless service, and refined elegance crafted to
              indulge your senses and elevate every moment of your journey.
            </p>
          </div>
          <div className="w-full px-2 lg:w-5/6 h-full">
            <video controls className="w-full h-full rounded-4xl object-cover">
              <source
                src="sample.mp4"
                type="video/mp4"
                className="w-full h-full rounded-4xl"
              />
            </video>
          </div>
        </div> */}

        {/* vission/mission - desktop */}
        <div className="hidden lg:flex justify-center items-center h-[90vh] mt-30 mb-20 py-10 bg-neutral-100">
          <div className="w-10/12 mx-auto h-full flex justify-center items-center">
            <div className="w-1/2 mx-auto h-full flex gap-10 ">
              <img
                src="mission.jpg"
                alt=""
                className="w-full object-cover rounded-4xl"
              />
            </div>
            <div className="w-1/2 mx-auto ml-[-100px] h-auto flex flex-col px-12 py-5 gap-5 bg-white card-shadow rounded-3xl">
              <div className="">
                <LuCrown className="text-3xl text-secondary" />
                <h2 className="text-xl font-semibold text-gray-600 py-5">
                  Our Passion & Purpose
                </h2>
                <p className="mb-3 text-gray-500 ">
                  We are driven by a deep love for travel and a commitment to
                  showcasing the wonders of Sri Lanka’s culture, heritage, and
                  natural beauty. Our educational and interactive programs
                  ensure every trip is meaningful, engaging, and memorable.
                  Whether you're looking for a tailor-made itinerary, luxury
                  getaways, or adventure-filled excursions, our experts curate
                  the perfect journey to match your vision.
                </p>
              </div>

              <div className="mt-[-10px]">
                <h2 className="text-xl font-semibold text-gray-600 py-5">
                  Our Philosophy:Beyond Travel
                </h2>
                <p className="mb-3 text-gray-500">
                  We understand that travel is not just about destinations—it’s
                  about inspiration, connection, and transformation. Our mission
                  is to create experiences that motivate, invigorate, and
                  inspire, ensuring our clients feel empowered and enriched
                  through every journey.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* edit */}
        {/* vission/mission - mobile */}
        <div className="flex lg:hidden justify-center items-center mt-20 mb-20  h-auto">
          <div className="w-11/12 mx-auto flex flex-col items-center gap-6 h-full">
            {/* Content*/}
            <div className="w-full bg-white h-[50vh] md:h-[40vh] card-shadow rounded-3xl px-6 py-6">
              <LuCrown className="text-2xl text-secondary mb-2" />
              <h2 className="text-lg font-semibold text-gray-600 mb-3">
                Our Passion & Purpose
              </h2>
              <p className="text-xs md:text-base text-gray-500 mb-5 ">
                We are driven by a deep love for travel and a commitment to
                showcasing the wonders of Sri Lanka’s culture, heritage, and
                natural beauty. Our educational and interactive programs ensure
                every trip is meaningful, engaging, and memorable. Whether
                you're looking for a tailor-made itinerary, luxury getaways, or
                adventure-filled excursions, our experts curate the perfect
                journey to match your vision.
              </p>

              <h2 className="text-lg font-semibold text-gray-600 mb-3">
                Our Philosophy: Beyond Travel
              </h2>
              <p className="text-xs md:text-base text-gray-500">
                We understand that travel is not just about destinations—it’s
                about inspiration, connection, and transformation. Our mission
                is to create experiences that motivate, invigorate, and inspire,
                ensuring our clients feel empowered and enriched through every
                journey.
              </p>
            </div>

            {/* edit */}
            {/* Image Section Second */}
            <div className="w-full px-2 h-[30vh] mt-[-50px] md:mt-[-150px]">
              <img
                src="mission.jpg"
                alt=""
                className="w-full h-full object-cover rounded-3xl"
              />
            </div>
          </div>
        </div>

        {/* member section - desktop (Hidden Coustomer Req)*/}
        <div className="hidden lg:hidden justify-center h-[80vh]">
          <div className="w-5/6 h-5/6">
            <div className="w-full px-4 py-12 max-w-7xl mx-auto">
              <div className="flex flex-col lg:flex-row gap-10">
                {/* Description*/}
                <div className="lg:w-2/5 w-full">
                  <h2 className="text-xl font-semibold text-gray-600">
                    Our Team
                  </h2>
                  <p className="text-primary font-bold text-title mt-8 mb-3">
                    Passionate & Dedicated
                  </p>
                  <p className="mb-3 text-gray-500 ">
                    With a wealth of experience and a genuine love for travel,
                    our team is committed to delivering exceptional service that
                    exceeds expectations. Whether you’re a solo traveler, a
                    family, or a corporate group, we ensure every trip is
                    stress-free, seamless, and unforgettable.
                  </p>

                  <p className="mb-3 mt-10 text-body bg-secondary py-2 px-5">
                    At Regency Travel House, travel is more than a service—it’s
                    our passion. Let’s create extraordinary experiences
                    together!
                  </p>
                </div>

                {/* Team Slider */}
                <div className="lg:w-3/5 w-full px-10 mt-20">
                  <Slider {...teamSliderSettings}>
                    {team.map((member, index) => (
                      <div
                        key={index}
                        className="w-1/2 flex  gap-2 items-center text-center"
                      >
                        <img
                          src={member.image}
                          alt={member.name}
                          className="w-50 h-40 object-cover rounded-full shadow-md mb-3 mx-auto"
                        />
                        <p className="font-semibold text-gray-800">
                          {member.position}
                        </p>
                        <p className="text-gray-600 text-sm">{member.name}</p>
                      </div>
                    ))}
                  </Slider>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* member section - mobile (Hidden Coustomer Req)*/}
        <div className="lg:hidden hidden justify-center mb-20 px-5">
          <div className="w-11/12 max-w-7xl">
            <div className="flex flex-col lg:flex-row gap-15">
              {/* Description */}
              <div className="lg:w-2/5 w-full md:px-10">
                <h2 className="text-xl font-semibold text-gray-600 text-center lg:text-left">
                  Our Team
                </h2>
                <p className="text-primary font-bold text-title mt-8 mb-3 text-center lg:text-left">
                  Passionate & Dedicated
                </p>
                <p className="mb-3 md:text-base text-gray-500 text-justify lg:text-left">
                  With a wealth of experience and a genuine love for travel, our
                  team is committed to delivering exceptional service...
                </p>
                <p className="mb-3 mt-10 text-body bg-secondary py-2 px-5 md:text-center">
                  At Regency Travel House, travel is more than a service—it’s
                  our passion...
                </p>
              </div>

              {/* Team Slider */}
              <div className="lg:w-3/5 w-full">
                <Slider {...teamSliderSettings}>
                  {team.map((member, index) => (
                    <div
                      key={index}
                      className="w-1/2 flex  gap-2 items-center text-center"
                    >
                      <img
                        src={member.image}
                        alt={member.name}
                        className="w-50 h-28 md:h-50 object-cover rounded-full shadow-md mb-3 mx-auto"
                      />
                      <p className="font-semibold text-gray-800">
                        {member.position}
                      </p>
                      <p className="text-gray-600 text-sm">{member.name}</p>
                    </div>
                  ))}
                </Slider>
              </div>
            </div>
          </div>
        </div>

        {/*Founder msg-  desktop*/}
        <div className="flex justify-center lg:h-[80vh] h-auto">
          <div className="w-11/12 lg:w-5/6 h-5/6 ">
            <div className="w-full flex px-4  py-12 max-w-7xl  mx-auto">
              <div className="flex flex-col bg-white lg:flex gap-10">
                {/* Description*/}
                <div className="lg: w-full ">
                  <h2 className="text-xl font-semibold text-gray-600">
                    Message from the
                  </h2>
                  <div className="lg:w-1/2 px-1 lg:px-4  bg-secondary text-body shadow-lg">
                    <p className="text-body font-bold text-4xl lg:text-title mt-8 mb-3">
                      Founder Chairperson
                    </p>
                    <h2 className="text-lg font-semibold">Ayanthi Agunawela</h2>
                    {/* <p className="text-sm">Founder / Chairperson</p> */}
                    <p className="text-sm mb-9 pb-4">Regency Travel House</p>
                  </div>
                  <p className="mb-3 text-gray-500 text-justify lg:text-left">
                    At Regency Travel House, our journey began with a simple yet
                    powerful vision to make travel more meaningful, seamless,
                    and memorable for every customer we serve. From humble
                    beginnings, we have grown into a trusted name in the travel
                    industry, guided by integrity, passion, and an unwavering
                    commitment to excellence.
                    <br />
                    <br /> As the Founder and Chairperson, I take great pride in
                    the values that continue to shape our path: personalized
                    service, continuous innovation, and a deep understanding of
                    what truly matters to our clients. Whether it's a business
                    trip, a family holiday, or a spiritual journey, we treat
                    every travel experience with the care and attention it
                    deserves. Our team is the heart of Regency Travel House.
                    Their dedication, professionalism, and local expertise
                    ensure that our clients receive not just a service, but a
                    relationship built on trust and reliability.
                    <br />
                    <br />
                    Looking ahead, we remain committed to responsible and
                    sustainable travel, embracing new technologies, and
                    expanding our partnerships to better serve a global
                    audience.
                    <br /> Thank you for being part of our journey. We look
                    forward to creating new travel memories with you.
                  </p>
                </div>

                {/* <div className="w-1/2 px-4 py-6 bg-secondary text-body shadow-lg">
                  <div className="space-y-1 text-left">
                    <h2 className="text-lg font-semibold">Ayanthi Agunawela</h2>
                    <p className="text-sm">Founder / Chairperson</p>
                    <p className="text-sm">Regency Travel House</p>
                  </div>
                </div> */}
              </div>
            </div>
          </div>
        </div>
      </main>

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

export default AboutUs;
