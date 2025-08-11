import React, { useEffect, useState } from "react";
import NavBar1 from "../components/NavBar1";
import contactImg1 from "../assets/contactus1.jpg";
import contactImg2 from "../assets/contactus2.jpg";
import LocationMap from "../components/LocationMap";
import Footer from "../components/Footer";
import TestSort from "../components/TestSort";
import API from "../api/axiosClient";
import contactBanner from '../assets/contact2.jpg';
import { FaWhatsapp } from "react-icons/fa";
import { MdSupportAgent } from "react-icons/md";
import { RiMessengerLine } from "react-icons/ri";
import { GoLocation } from "react-icons/go";
import { IoMailOutline } from "react-icons/io5";
import { CiPhone } from "react-icons/ci";

function ContactUs() {
  //top mount
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  /* contact feature */
  //via email
  const companyEmail = "info@regencytravelhouse.com";
  const handleEmailClick = () => {
    const emailUrl = `https://mail.google.com/mail/?view=cm&fs=1&to=${companyEmail}`;
    window.open(emailUrl, "_blank");
  };

  //via whatsapp
  const companyWhatsApp = "94707945500";
  const handleWhatsAppClick = () => {
    const whatsappLink = `https://wa.me/${companyWhatsApp}`;
    window.open(whatsappLink, "_blank");
  };

  //via messenger
  const handleMessengerClick = () => {
    // const pageUsername = "regencytravel";
    const messengerLink = `https://www.facebook.com/messages/t/627049950482251`;
    window.open(messengerLink, "_blank");
  };

  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    subject: "",
    message: "",
  });

  const [responseMessage, setResponseMessage] = useState("");

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem("auth_token");
    console.log("Token found:", token);

    if (token) {
      API.defaults.headers.common["Authorization"] = `Bearer ${token}`;
      try {
        const res = await API.post("/complaints", {
          subject:
            formData.subject || `${formData.firstName} ${formData.lastName}`,
          message: formData.message,
        });

        setResponseMessage("Your complaint has been submitted successfully.");
        setFormData({
          firstName: "",
          lastName: "",
          email: "",
          subject: "",
          message: "",
        });
        console.log(formData);
      } catch (error) {
        setResponseMessage(
          "An error occurred while submitting your complaint."
        );
        console.error(error.response?.data || error.message);
      }
    } else {
      setResponseMessage("You need to log in to submit a complaint.");
    }
  };

  return (
    <>
      {/* header */}
      <header>
        <NavBar1 page="contact" />
      </header>

      <main>
        {/* landing section */}
        <div style={{ backgroundImage: `url(${contactBanner})` }} className=" sm:bg-cover sm:bg-center sm:bg-no-repeat sm:bg-blend-multiply lg:h-[80dvh] pt-12 lg:pt-20 lg:pb-10 flex items-center">
          {/* <div className="bg-none sm:bg-[url('src/assets/contact.jpg')] sm:bg-cover sm:bg-center sm:bg-no-repeat sm:bg-blend-multiply lg:h-[90vh] pt-12 lg:pt-20 lg:pb-10 flex items-center"> */}
          <div className="w-5/6 mx-auto flex flex-col lg:flex-row">
            {/* Text Section */}
            <section className="py-2 text-left w-full md:w-full mb-10 md:mb-4 leading-line-height lg:pr-170">
              <h1 className="text-xl md:text-3xl lg:text-5xl font-bold text-primary text-center lg:text-left">
                Get in Touch with Us
              </h1>

              {/* Guideline font */}
              {/* <h1 className="text-xl md:text-3xl Heading-font lg:text-5xl font-bold text-primary text-center lg:text-left">
                Get in Touch with Us
              </h1> */}

              <p className="text-gray-400 font-normal text-base mt-4 md:mt-6 leading-7">
                Have a question about your trip, need assistance, or just want
                to say hello? Our team is here to help you with travel advice,
                support, and all your general inquiries. Reach out — we’d love
                to hear from you!
              </p>

              {/* CTA Buttons */}
              <div className="flex gap-4 md:gap-5 mt-6 md:mt-9 text-sm print:hidden">
                <button
                  onClick={handleEmailClick}
                  className="border-2 border-secondary cursor-pointer rounded-full bg-secondary text-white text-sm md:text-base w-12 h-12 md:w-15 md:h-15 flex items-center justify-center hover:bg-secondary/[0.8] transition"
                >
                  <IoMailOutline className="text-2xl" />
                </button>

                <button
                  onClick={handleWhatsAppClick}
                  className="border-2 border-secondary cursor-pointer rounded-full bg-secondary text-white text-sm md:text-base w-12 h-12 md:w-15 md:h-15 flex items-center justify-center hover:bg-secondary/[0.8] transition"
                >
                  <FaWhatsapp className="text-2xl" />
                </button>

                <button
                  onClick={handleMessengerClick}
                  className="border-2 border-secondary cursor-pointer rounded-full bg-secondary text-white text-sm md:text-base w-12 h-12 md:w-15 md:h-15 flex items-center justify-center hover:bg-secondary/[0.8] transition"
                >
                  <RiMessengerLine className="text-2xl" />
                </button>
              </div>
            </section>

            {/* Image Section */}
            {/* for desktop */}
            {/* <section className="hidden lg:block w-full md:w-2/6 flex justify-center items-center mt-6 md:mt-0">
              <section className="flex w-full justify-end">
                <img
                  src={contactImg1}
                  alt=""
                  className="w-85 h-85 rounded-full  object-cover rounded-4xl"
                />
                <img
                  src={contactImg2}
                  alt=""
                  className="w-40 h-40 right-0 top-0 relative rounded-full object-cover rounded-4xl"
                />
              </section>
            </section> */}

            {/* for mobile */}
            <section className="lg:hidden w-full flex justify-center items-center mt-6 md:mt-0">
              <div className="relative w-4/5 max-w-xs">
                <img
                  src={contactImg1}
                  alt="Primary Contact"
                  className="w-full h-auto rounded-full object-cover"
                />
                <img
                  src={contactImg2}
                  alt="Secondary Contact"
                  className="w-24 h-24 rounded-full object-cover absolute -bottom-4 -left-0 border-4 border-white shadow-lg"
                />
              </div>
            </section>
          </div>
        </div>

        {/* form section */}
        <div className="w-5/6 mx-auto flex justify-center items-center h-auto lg:h-[100vh]">
          <div className="flex flex-col-reverse lg:flex-row w-full">
            <div className="w-full lg:w-2/3 flex justify-center items-center">
              <form
                onSubmit={handleSubmit}
                className="w-full lg:pr-20 flex flex-col gap-3 mt-10 lg:m-0 lg:mb-0 mb-15 md:mb-20"
              >
                <input
                  type="text"
                  name="firstName"
                  placeholder="Enter first name"
                  value={formData.firstName}
                  onChange={handleChange}
                  className="w-full text-mainfont text-base lg:w-full lg:text-base py-3  px-2 rounded-2xl border-2 border-gray-400 focus:ring-1  focus:ring-secondary focus:outline-none focus:border-secondary placeholder:text-[#949494] placeholder:text-xs lg:placeholder:text-base"
                />

                <input
                  type="text"
                  name="lastName"
                  placeholder="Enter last name"
                  value={formData.lastName}
                  onChange={handleChange}
                  className="w-full text-mainfont text-base lg:w-full lg:text-base py-3  px-2 rounded-2xl border-2 border-gray-400 focus:ring-1  focus:ring-secondary focus:outline-none focus:border-secondary placeholder:text-[#949494] placeholder:text-xs lg:placeholder:text-base"
                />

                <input
                  type="email"
                  name="email"
                  placeholder="Enter email address"
                  value={formData.email}
                  onChange={handleChange}
                  className="w-full text-mainfont text-base lg:w-full lg:text-base py-3  px-2 rounded-2xl border-2 border-gray-400 focus:ring-1 focus:ring-secondary focus:outline-none focus:border-secondary placeholder:text-[#949494] placeholder:text-xs lg:placeholder:text-base"
                />
                <input
                  type="text"
                  name="subject"
                  placeholder="Subject (optional)"
                  value={formData.subject}
                  onChange={handleChange}
                  className="w-full text-mainfont text-base lg:w-full lg:text-base py-3  px-2 rounded-2xl border-2 border-gray-400 focus:ring-1 focus:ring-secondary focus:outline-none focus:border-secondary placeholder:text-[#949494] placeholder:text-xs lg:placeholder:text-base"
                />

                <textarea
                  name="message"
                  placeholder="Enter your message here..."
                  rows={6}
                  value={formData.message}
                  onChange={handleChange}
                  className="w-full text-base lg:w-full lg:text-base py-3  px-2 rounded-2xl border-2 resize-none border-gray-400  text-mainfont focus:ring-1 focus:ring-secondary focus:outline-none focus:border-secondary placeholder:text-[#949494] placeholder:text-xs lg:placeholder:text-base"
                ></textarea>

                <button
                  type="submit"
                  className="border-2 border-secondary rounded-full text-body text-xs md:w-full lg:w-45 lg:text-base hover:bg-secondary/[0.8] hover:cursor-pointer transition duration-300 ease-in-out hover:border-transparent bg-secondary font-semibold px-3 py-3 flex gap-2 justify-center items-center mt-10"
                >
                  Submit
                </button>
                {responseMessage && (
                  <p className="mt-3 text-sm text-gray-600">
                    {responseMessage}
                  </p>
                )}
              </form>
            </div>

            <div className="lg:w-1/3 w-full md:w-full mt-20 md:mt-15 lg:mt-0">
              <h2 className="text-xl font-semibold text-gray-600 text-center lg:text-left">
                Write Directly to Us
              </h2>
              <p className="text-primary font-bold text-title mt-3 lg:mt-2 mb-3 text-center lg:text-left">
                Connect With
              </p>
              <p className="mb-3 text-gray-500">
                Every great journey starts with a conversation. Here’s how you
                can reach us whichever way suits you best.
              </p>

              <div className="flex flex-col gap-8 mt-10">
                <ul className=" w-full lg:w-full font-normal flex flex-col gap-2 lg:gap-3 lg:flex-col lg:pl-0 lg:justify-between">
                  <li className="flex flex-row items-center gap-2 text-body/[0.8]">
                    <CiPhone className="text-gray-200 text- bold text-sm w-10 h-10 p-2 bg-primary rounded-full bg-body hover:bg-secondary" />
                    <div className="text-gray-500">
                      <p>+94 70 794 5500 | +94 81 240 5050</p>
                    </div>
                  </li>
                  <li className="flex flex-row items-center gap-2 text-gray-500/[0.8]">
                    <IoMailOutline className="text-gray-200 text- bold text-sm w-10 h-10 p-2 bg-primary rounded-full bg-body hover:bg-secondary" />
                    <div className="text-gray-500">
                      <p>info@regencytravelhouse.com</p>
                    </div>
                  </li>
                  <li className="flex flex-row items-center gap-2 text-gray-500/[0.8]">
                    <GoLocation className="text-gray-200 text- bold text-sm w-10 h-10 p-2 bg-primary rounded-full bg-body hover:bg-secondary" />
                    <div className="text-gray-500">
                      <p>
                        {" "}
                        No 747/1A/A , Sirimavo Bandaranaike Mawatha,
                        Kandy, Sri Lanka.
                      </p>
                    </div>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>

        {/* map section */}
        <div className="w-full h-[90vh] md:h-auto md:mb-30 md:mt-10 px-5 mb-10 mx-auto flex flex-col justify-center items-center bg-neutral-50">
          <div className="w-5/6">
            <h2 className="text-xl font-semibold text-gray-600 md:pt-0 lg:pt-0">
              Our Lcation
            </h2>
            <p className="text-gray-400 font-normal text-base mt-1 mb-10 w-full leading-7">
              {" "}
              Find your way to us. Whether you're planning a trip or just want
              to drop by, our location is one pin away.
            </p>
          </div>
          <div className="w-full">
            <LocationMap />
          </div>
        </div>
      </main>

      {/* footer section*/}
      <div className="bg-primary bg-center lg:px-5 px-10 pt-10 print:hidden">
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

export default ContactUs;
