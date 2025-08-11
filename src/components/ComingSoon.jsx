import React, { useState, useEffect } from "react";
import { toast } from "react-toastify";
import BreadCrumbs from "./BreadCrumbs";
import { IoMailOutline } from "react-icons/io5";
import { FaWhatsapp } from "react-icons/fa";
import { MdSupportAgent } from "react-icons/md";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer } from "react-toastify";
function ComingSoon({ title, heroImage }) {
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    passport: "",
    startDate: "",
    endDate: "",
    message: "",
  });

  const [errors, setErrors] = useState({});
  const [shakeFields, setShakeFields] = useState({});
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    const today = new Date().toISOString().split("T")[0];
    document.getElementById("startDate").min = today;
    document.getElementById("endDate").min = today;
  }, []);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    setErrors({ ...errors, [e.target.name]: false });
    setShakeFields({ ...shakeFields, [e.target.name]: false });
  };

  const validateForm = () => {
    const newErrors = {};
    const newShakes = {};
    Object.entries(form).forEach(([key, value]) => {
      if (!value.trim() && key !== "message") {
        newErrors[key] = true;
        newShakes[key] = true;
      }
    });

    if (form.startDate && form.endDate && form.endDate < form.startDate) {
      newErrors.endDate = true;
      newShakes.endDate = true;
    }

    setErrors(newErrors);
    setShakeFields(newShakes);

    setTimeout(() => {
      setShakeFields({});
    }, 500);

    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    setSuccess(true);
    toast.success("Your inquiry has been submitted!");
    launchConfetti();

    setTimeout(() => {
      setSuccess(false);
      setForm({
        name: "",
        email: "",
        phone: "",
        passport: "",
        startDate: "",
        endDate: "",
        message: "",
      });
    }, 3000);
  };

  const launchConfetti = () => {
    const confettiContainer = document.createElement("div");
    confettiContainer.className = "fixed inset-0 pointer-events-none z-[9999]";
    document.body.appendChild(confettiContainer);

    for (let i = 0; i < 50; i++) {
      const confetti = document.createElement("div");
      confetti.className =
        "absolute w-2 h-2 rounded-full opacity-80 animate-fall";
      confetti.style.backgroundColor = [
        "#CE2326",
        "#0D1537",
        "#4CAF50",
        "#FFC107",
      ][Math.floor(Math.random() * 4)];
      confetti.style.left = `${Math.random() * 100}%`;
      confetti.style.animationDuration = `${Math.random() * 2 + 2}s`;
      confetti.style.transform = `translateY(-100%) rotate(${
        Math.random() * 360
      }deg)`;
      confettiContainer.appendChild(confetti);

      setTimeout(() => {
        confetti.remove();
        if (i === 49) confettiContainer.remove();
      }, 4000);
    }
  };

  const handleEmailClick = () => {
    const emailUrl =
      "https://mail.google.com/mail/?view=cm&fs=1&to=info@regencytravelhouse.com";
    window.open(emailUrl, "_blank");
  };

  const handleWhatsAppClick = () => {
    const whatsappLink = "https://wa.me/94707945500";
    window.open(whatsappLink, "_blank");
  };

  const handleCallClick = () => {
    window.location.href = "tel:+94812405050";
  };

  return (
    <div className="relative min-h-screen bg-gray-100 pb-10">
      {/* Hero Banner */}
      <div className="w-full h-[55vh] relative">
        <img
          src={heroImage}
          alt="Coming Soon"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-black/60"></div>
        <div className="absolute top-5 left-5 z-20 text-white">
          <BreadCrumbs />
        </div>
        <div className="absolute fixed md:top-100 top-120 lg:top-80 right-5 lg:right-10 flex flex-col gap-3 justify-end text-sm z-80">
          <button
            onClick={handleEmailClick}
            className="flex w-15 h-15 items-center justify-center text-xl bg-black/30 backdrop-blur-sm border border-white/20 text-white rounded-full shadow-sm hover:shadow-md hover:bg-secondary transition"
          >
            <IoMailOutline />
          </button>

          <button
            onClick={handleWhatsAppClick}
            className="flex w-15 h-15 items-center justify-center text-xl bg-black/30 backdrop-blur-sm border border-white/20 text-white rounded-full shadow-sm hover:shadow-md hover:bg-secondary transition"
          >
            <FaWhatsapp />
          </button>

          <button
            onClick={handleCallClick}
            className="flex w-15 h-15 items-center justify-center text-xl bg-black/30 backdrop-blur-sm border border-white/20 text-white rounded-full shadow-sm hover:shadow-md hover:bg-secondary transition"
          >
            <MdSupportAgent />
          </button>
        </div>

        <div className="absolute inset-0 flex flex-col items-center justify-center text-center text-white z-20">
          <h2 className="text-xl font-semibold">{title}</h2>
          <h1 className="text-5xl md:text-6xl font-bold mt-2 animate-pulse">
            Coming Soon...
          </h1>
        </div>
      </div>

      {/* Contact Form */}
      <form
        onSubmit={handleSubmit}
        className="-mt-[2%] lg:w-5/6 shadow-2xl shadow-black-500/250  mx-auto bg-white rounded-3xl p-10 animate-fade-in-up relative z-30"
      >
        <h2 className="text-3xl font-bold text-center text-primary mb-8">
          Plan Your Journey
        </h2>

        <div className="grid md:grid-cols-2 gap-5">
          {["name", "email", "phone", "passport"].map((field) => (
            <div
              key={field}
              className={`relative flex flex-col ${
                shakeFields[field] ? "animate-shake" : ""
              }`}
            >
              <input
                type={
                  field === "email"
                    ? "email"
                    : field === "phone"
                    ? "tel"
                    : "text"
                }
                name={field}
                id={field}
                value={form[field]}
                onChange={handleChange}
                placeholder=" "
                className={`peer w-full px-4 pt-6 pb-2 border rounded-full focus:outline-none focus:ring-2 focus:ring-primary transition-all
          ${errors[field] ? "border-red-500" : "border-gray-300"}`}
              />
              <label
                htmlFor={field}
                className={`absolute left-4 top-2 text-sm text-gray-500 transition-all
          peer-placeholder-shown:top-4 peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-400
          peer-focus:top-2 peer-focus:text-sm peer-focus:text-primary`}
              >
                {field.charAt(0).toUpperCase() + field.slice(1)}
              </label>
            </div>
          ))}
        </div>

        <div className="grid md:grid-cols-2 gap-5 mt-5">
          {["startDate", "endDate"].map((field) => (
            <div
              key={field}
              className={`flex flex-col ${
                shakeFields[field] ? "animate-shake" : ""
              }`}
            >
              <input
                type="date"
                name={field}
                id={field}
                value={form[field]}
                onChange={handleChange}
                className={`p-4 border rounded-full focus:outline-none focus:ring-2 focus:ring-primary ${
                  errors[field] ? "border-red-500" : "border-gray-300"
                }`}
              />
            </div>
          ))}
        </div>

        <div
          className={`relative mt-5 ${
            shakeFields.message ? "animate-shake" : ""
          }`}
        >
          <textarea
            name="message"
            id="message"
            rows="4"
            value={form.message}
            onChange={handleChange}
            placeholder=" "
            className="peer w-full pt-6 px-4 pb-2 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary transition-all"
          ></textarea>
          <label
            htmlFor="message"
            className="absolute left-4 top-2 text-sm text-gray-500 transition-all
      peer-placeholder-shown:top-4 peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-400
      peer-focus:top-2 peer-focus:text-sm peer-focus:text-primary"
          >
            Special Requests
          </label>
        </div>

        <button
          type="submit"
          className={`mt-8 w-full py-4 text-white font-semibold cursor-pointer rounded-full transition ${
            success ? "bg-green-500" : "bg-secondary hover:bg-[#b51d20]"
          }`}
        >
          {success ? "Success!" : "Submit Inquiry"}
        </button>
      </form>

      {/* Keyframes */}
      <style>{`
        @keyframes fall {
          0% { transform: translateY(-100%) rotate(0deg); opacity: 1; }
          100% { transform: translateY(100vh) rotate(360deg); opacity: 0; }
        }

        .animate-fall {
          animation-name: fall;
          animation-timing-function: ease-in;
        }

        @keyframes shake {
          0%, 100% { transform: translateX(0); }
          20%, 60% { transform: translateX(-5px); }
          40%, 80% { transform: translateX(5px); }
        }

        .animate-shake {
          animation: shake 0.4s;
        }
      `}</style>
      <ToastContainer position="top-right" autoClose={3000} />
    </div>
  );
}

export default ComingSoon;
