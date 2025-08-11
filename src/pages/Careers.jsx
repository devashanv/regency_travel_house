import React, { useEffect, useRef, useState } from "react";
import NavBar1 from "../components/NavBar1";
import Footer from "../components/Footer";
import CareerCard from "../components/CareerCard";
import emailjs from "emailjs-com";
import { IoArrowDown } from "react-icons/io5";
import { CiDiscount1 } from "react-icons/ci";
import { IoBriefcaseOutline } from "react-icons/io5";
import { IoCalendarOutline } from "react-icons/io5";
import { FaRegHeart } from "react-icons/fa";
import { PiUserSwitch } from "react-icons/pi";
import { AiOutlineGlobal } from "react-icons/ai";

import careerBanner from '../assets/career3.jpg';

import EmployeeImg1 from "../assets/employee/employee1.jpg";
import EmployeeImg2 from "../assets/employee/employee2.jpg";
import EmployeeImg3 from "../assets/employee/employee3.jpg";
import EmployeeImg4 from "../assets/employee/employee4.jpg";
import EmployeeImg5 from "../assets/employee/employee5.jpg";
import API from "../api/axiosClient";

function Careers() {
  const [careers, setCareers] = useState(null);
  const [submitting, setSubmitting] = useState(false);
  const fileInputRef = useRef(null);

  const [formData, setFormData] = useState({
    full_name: "",
    email: "",
    phone: "",
    position_applied: "",
    cover_letter: "",
    cv: "",
    cv_path: "",
  });

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const [cv, setCv] = useState(null);
  const [responseMessage, setResponseMessage] = useState("");

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleFileChange = (e) => {
    setCv(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);

    const form = new FormData();
    form.append("full_name", formData.full_name);
    form.append("email", formData.email);
    form.append("phone", formData.phone);
    form.append("position_applied", formData.position_applied);
    form.append("cover_letter", formData.cover_letter);
    form.append("cv", cv);

    try {
      const res = await API.post("/careers/apply", form, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      setResponseMessage("Your application has been submitted successfully.");
      setFormData({
        full_name: "",
        email: "",
        phone: "",
        position_applied: "",
        cover_letter: "",
        cv_path: "",
      });
      setCv(null);

      if (fileInputRef.current) {
        fileInputRef.current.value = "";
      }
    } catch (error) {
      setResponseMessage(
        "An error occurred while submitting your application."
      );
      console.error(error.response?.data || error.message);
    } finally {
      setSubmitting(false);
      console.log("File to upload:", cv);
    }
  };

  //top mount
  const perks = [
    {
      icon: <CiDiscount1 className="text-sky-700 w-6 h-6" />,
      title: "Exclusive Opportunities",
      desc: "Enjoy discounted rates on flights, hotels, and tours as part of our team.",
    },
    {
      icon: <IoBriefcaseOutline className="text-emerald-700 w-6 h-6" />,
      title: "Professional Development",
      desc: "Access ongoing training, certifications, and industry events to grow your career.",
    },
    {
      icon: <IoCalendarOutline className="text-amber-700 w-6 h-6" />,
      title: "Flexible Time Off",
      desc: "We value work-life balance—take the time you need to recharge and explore.",
    },
    {
      icon: <FaRegHeart className="text-rose-700 w-6 h-6" />,
      title: "Health & Wellness",
      desc: "Comprehensive health insurance and wellness programs to support your well-being.",
    },
    {
      icon: <PiUserSwitch className="text-indigo-700 w-6 h-6" />,
      title: "Collaborative Culture",
      desc: "Join a supportive, respectful environment that thrives on shared success.",
    },
    {
      icon: <AiOutlineGlobal className="text-teal-700 w-6 h-6" />,
      title: "Global Exposure",
      desc: "Be part of international projects and connect with global travel professionals.",
    },
  ];

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
        <NavBar1 page="career" />
      </header>

      <main>
        {/* landing section */}
        {/* <div className="bg-[url(src/assets/careers.jpg)] object-fill bg-blend-multiply pt-20 pb-10 flex"> */}
        <div style={{ backgroundImage: `url(${careerBanner})` }} className="bg-none  sm:bg-cover sm:bg-center sm:bg-no-repeat sm:bg-blend-multiply lg:h-[80dvh] pt-12 lg:pt-20 lg:pb-10 flex items-center">
          <div className="w-5/6 mx-auto flex lg:flex-row flex-col ">
            <section className="py-2 text-left w-ful lg:w-4/6 mb-4 leading-line-height mb-10 lg:pr-80">
              <h1 className="text-lg font-bold lg:text-5xl text-primary text-center lg:text-left">
                Be Part of Our Family
              </h1>
              <p className="text-gray-400 font-normal text-base mt-6 w-full leading-7">
                Discover top travel packages tailored for unforgettable escapes.
                Handpicked destinations, seamless planning, exclusive deals,
                breathtaking views, cultural experiences, thrilling adventures,
                and personalized services — your perfect journey starts here
                with the best in travel.
              </p>

              <div className="flex items-center">
                <div className="w-full flex justify-center sm:justify-start">
                  <button
                    onClick={() => handleScroll("vacancy")}
                    className={
                      "border-2 border-secondary rounded-full text-body text-xs md:w-1/3 lg:w-45 lg:text-base hover:bg-secondary/[0.8] hover:cursor-pointer transition duration-300 ease-in-out hover:border-transparent bg-secondary font-semibold px-3 py-3 flex gap-2 justify-center items-center mt-10"
                    }
                  >
                    <span>Open Positions </span>
                    <IoArrowDown />
                  </button>
                </div>
              </div>
            </section>

            {/* <section className="flex w-full md:w-4/6 md:mx-auto lg:w-2/6 justify-between ">
                <img
                  src={EmployeeImg1}
                  alt=""
                  className="w-25 h-70 md:w-35 h-80 lg:w-30 lg:h-80 object-cover rounded-4xl"
                />
                <img
                  src={EmployeeImg3}
                  alt=""
                  className="w-25 h-70 md:w-35 h-80 lg:w-30 lg:h-80 object-cover rounded-4xl mt-15"
                />
                <img
                  src={EmployeeImg4}
                  alt=""
                  className="w-25 h-70 md:w-35 h-80 lg:w-30 lg:h-80 object-cover rounded-4xl"
                />
              </section> */}
          </div>
        </div>

        {/* benifits */}
        <div>
          <section className="lg:py-16 px-4 lg:mt-10 mb-10">
            <div className="max-w-6xl mx-auto flex flex-col lg:flex-row">
              <div className="w-full lg:w-2/5 px-5 lg:px-0 lg:pr-10 md:mb-8">
                <h2 className="text-xl font-semibold text-gray-600 text-center lg:text-left">
                  Perks & Benefits
                </h2>
                <p className="text-primary font-bold text-title mt-8 mb-3 text-center lg:text-left">
                  Why join us?
                </p>
                <p className="mb-3 text-gray-500 text-justify lg:text-left">
                  Join our travel family for professional growth, flexible
                  policies, wellness programs, and a vibrant culture that
                  supports learning, collaboration, and meaningful recognition.
                </p>
                <p className="mb-3 text-gray-500 text-justify lg:text-left">
                  Experience global exposure, cultural exchange, trusted
                  mentorship, and unforgettable journeys — creating lasting
                  memories and advancing your career in a purpose-driven
                  environment.
                </p>
              </div>
              <div className="w-full lg:w-3/5 grid grid-cols-2 gap-4 lg:grid-cols-3 lg:gap-8">
                {perks.map((perk, idx) => (
                  <div
                    key={idx}
                    className="bg-white shadow-md rounded-2xl p-4 sm:p-6 hover:shadow-lg transition"
                  >
                    <div className="mb-4">{perk.icon}</div>
                    <h3 className="text-base sm:text-xl font-semibold text-gray-700 mb-2">
                      {perk.title}
                    </h3>
                    <p className="text-sm sm:text-base text-gray-600">
                      {perk.desc}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </section>
        </div>

        {/* open position */}
        <div id="vacancy" className="w-full bg-neutral-50 py-10 mb-20 mx-auto">
          <div className="w-5/6 mx-auto">
            <h2 className="text-xl font-semibold text-gray-600 py-8 text-center lg:text-left">
              Current Openings
            </h2>

            {/* careers */}
            {careers === null ? (
              <div className="w-full flex justify-center items-center gap-4 mb-1">
                <h2 className="text-xl font-normal text-gray-400 py-8">
                  Not any positions available yet!
                </h2>
              </div>
            ) : (
              <div className="w-full flex flex-col gap-4 mb-1">
                <CareerCard />
                <CareerCard />
                <CareerCard />
                <CareerCard />
                <CareerCard />
              </div>
            )}
          </div>
        </div>

        {/* form section */}
        <div className="mb-30 mt-25 ">
          {/* form submission message */}

          <div className="w-5/6 mx-auto flex flex-col-reverse lg:flex-row lg:gap-2">
            <div className="lg:w-2/3 w-full mt-10 lg:mt-0">
              <form
                onSubmit={handleSubmit}
                className="w-full lg:pr-20 flex flex-col gap-3"
              >
                <input
                  type="text"
                  name="full_name"
                  id="full_name"
                  value={formData.full_name}
                  onChange={handleChange}
                  placeholder="Enter Full Name"
                  className="w-full text-mainfont text-base lg:w-full lg:text-base py-3  px-2 rounded-xl border-2 border-secondary focus:ring-1 focus:ring-secondary focus:outline-none focus:border-secondary placeholder:text-[#949494] placeholder:text-xs lg:placeholder:text-base"
                />

                <input
                  type="text"
                  name="email"
                  id="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="Enter Email Address"
                  className="w-full text-mainfont text-base lg:w-full lg:text-base py-3  px-2 rounded-xl border-2 border-secondary focus:ring-1 focus:ring-secondary focus:outline-none focus:border-secondary placeholder:text-[#949494] placeholder:text-xs lg:placeholder:text-base"
                />

                <input
                  type="text"
                  name="position_applied"
                  id="position_applied"
                  value={formData.position_applied}
                  onChange={handleChange}
                  placeholder="What is your position"
                  className="w-full text-mainfont text-base lg:w-full lg:text-base py-3  px-2 rounded-xl border-2 border-secondary focus:ring-1 focus:ring-secondary focus:outline-none focus:border-secondary placeholder:text-[#949494] placeholder:text-xs lg:placeholder:text-base"
                />

                <textarea
                  name="cover_letter"
                  id="cover_letter"
                  value={formData.cover_letter}
                  onChange={handleChange}
                  placeholder="Write Cover Letter"
                  rows={6}
                  className="w-full text-base lg:w-full lg:text-base py-3  px-2 rounded-xl border-2 resize-none border-secondary  text-mainfont focus:ring-1 focus:ring-secondary focus:outline-none focus:border-secondary placeholder:text-[#949494] placeholder:text-xs lg:placeholder:text-base"
                ></textarea>

                <input
                  type="file"
                  name="cv"
                  id="cv"
                  accept=".pdf,.doc,.docx"
                  onChange={handleFileChange}
                  ref={fileInputRef}
                  required
                  placeholder=""
                  className="w-full text-gray-600 text-base lg:w-full lg:text-base rounded-xl border-2 border-secondary focus:ring-1  focus:ring-secondary focus:outline-none focus:border-secondary file:p-2 file:rounded-md file:bg-gray-100 lg:placeholder:text-secondary hover:cursor-pointer hover:bg-gray-100"
                />
                <label className="text-sm text-secondary">Max Size : 6MB</label>
                <button
                  type="submit"
                  disabled={submitting}
                  className={`border-2 border-secondary rounded-full text-body text-xs md:w-full lg:w-45 lg:text-base transition duration-300 ease-in-out font-semibold px-3 py-3 flex gap-2 justify-center items-center mt-10 ${
                    submitting
                      ? "bg-secondary/60 cursor-not-allowed"
                      : "bg-secondary hover:bg-secondary/[0.8] hover:border-transparent"
                  }`}
                >
                  {submitting ? "Submitting..." : "Submit"}
                </button>
                {responseMessage && (
                  <p className="mt-3 text-sm text-gray-600">
                    {responseMessage}
                  </p>
                )}
              </form>
            </div>

            <div className="w-full lg:w-1/3">
              <div className="">
                <h2 className="text-xl font-semibold text-gray-600 text-center lg:text-left">
                  No Matching Position Available?
                </h2>
                <p className="text-primary font-bold text-title mt-8 mb-3 text-center lg:text-left">
                  Apply Here
                </p>
                <p className="mb-3 text-gray-500 text-justify lg:text-left">
                  We’re always open to discovering new talent. If there’s no
                  position that matches your profile right now, feel free to
                  send us your resume and a brief message. We’ll keep it on file
                  and reach out if something comes up!
                </p>
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

export default Careers;
