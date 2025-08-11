import React, { useState, useEffect } from "react";
import NavBar1 from "../components/NavBar1";
import Footer from "../components/Footer";
import HomePackageCard from "../components/HomePackageCard";
import FAQs from "../components/FAQs";
import LoyaltyDoll from "../components/LoyaltyDoll";
import Pagination from "@mui/material/Pagination";
import API from "../api/axiosClient";
import destinationBanner from '../assets/destinationBanner3.jpg';
function DestinationPackages() {
  const [specialPackages, setSpecialPackages] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 11;

  useEffect(() => {
    window.scrollTo(0, 0);

    const fetchSpecialPackages = async () => {
      try {
        const response = await API.get("/packages/specialpackages");
        setSpecialPackages(response.data);
      } catch (error) {
        console.error("Failed to fetch special packages:", error);
      }
    };

    fetchSpecialPackages();
  }, []);

  const handlePageChange = (_, value) => {
    setCurrentPage(value);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const paginatedPackages = specialPackages.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const totalPages = Math.ceil(specialPackages.length / itemsPerPage);

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
  ];

  return (
    <>
  
    <header className="">
        <NavBar1 page="special-packages" />
      </header>

      {/* header section */}
      {/* <div className="w-full mx-auto bg-gray-100 py-20"> */}
        <div style={{ backgroundImage: `url(${destinationBanner})` }} className="bg-none  sm:bg-cover sm:bg-center sm:bg-no-repeat sm:bg-blend-multiply lg:h-[60dvh] pt-12 lg:pt-20 lg:pb-10 flex items-center">

        <div className="w-full lg:w-5/6 mx-auto flex flex-col lg:flex-row gap-8 px-4 sm:px-6">
          {/* Left Content Section */}
          <section className="w-full lg:w-3/5 text-left mb-4 lg:mb-10">
            <h1 className="text-2xl sm:text-3xl lg:text-5xl font-bold text-primary">
              Special Travel Packages
            </h1>
            <p className="text-gray-500 font-normal text-base sm:text-lg mt-4 leading-relaxed lg:pr-10">
              Unlock amazing experiences with our exclusive special packages.
              Tailored for unforgettable journeys, premium experiences, and
              unbeatable value.
            </p>
          </section>


        </div>
      </div>

      {/* Filter Bar */}
      <div className="w-5/6 mx-auto mt-20">
        


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

            {specialPackages.map((pkg) => (
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

          {!specialPackages.length && (
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
