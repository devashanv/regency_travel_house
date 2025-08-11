import React, { useEffect, useState } from "react";
import clsx from "clsx";
import NavBar1 from "../components/NavBar1";
import Footer from "../components/Footer";
import { Link } from "react-router-dom";
import { LuArrowUpRight } from "react-icons/lu";

import AboutImg1 from "../assets/aboutus1.jpg";
import AboutImg2 from "../assets/aboutus2.jpg";
import LineArt from "../assets/packges_lineart.png";
import sus from "../assets/sus.png";
import Goal15 from "../assets/goals/goal15.jpg";
import Goal8 from "../assets/goals/goal8.jpg";
import Goal5 from "../assets/goals/goal5.jpg";

function Sustainability() {
  //top mount
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const [activeIndex, setActiveIndex] = useState(1);

  const cardsData = [
    {
      title: "Mountain Escapes",
      description: "Discover serene trails and breathtaking views.",
      image: "/raysofhope.jpg",
    },
    {
      title: "Cultural Journeys",
      description: "Explore heritage, history, and authentic experiences.",
      image: "/sus3.jpg",
    },
    {
      title: "Beach Retreats",
      description: "Relax and rejuvenate by the turquoise waters.",
      image: "/sus2.jpg",
    },
  ];
  return (
    <>
      {/* header */}
      <header>
        <NavBar1 />
      </header>

      <main>
        {/* landing section */}
        {/* <div className="bg-gray-100 pt-20 pb-10 w-full flex"> */}
        <div className="bg-none sm:bg-[url('src/assets/aboutBanner4.jpg')] sm:bg-cover sm:bg-center sm:bg-no-repeat sm:bg-blend-multiply lg:h-[80dvh] pt-12 lg:pt-20 lg:pb-10 flex items-center">
          <div className="w-5/6 mx-auto flex flex-col lg:flex-row">
            <section className="py-2 text-left w-full lg:w-4/6 mb-4 leading-line-height mb-10 lg:pr-40">
              <h1 className="text-lg font-bold lg:text-5xl text-primary text-center lg:text-left">
                Empower the Planet & Future
              </h1>
              <p className="text-gray-400 font-normal text-base mt-8 w-full leading-7 text-justify lg:text-left">
                Step into a journey that goes beyond destinations. At Regency
                Travel House, every trip you take contributes to protecting our
                planet and lighting the path for young minds. We’re committed to
                sustainable tourism and dedicated to nurturing education in
                underprivileged communities — because true adventure uplifts the
                world around us.
              </p>
            </section>

            {/* <section className="flex w-full lg:w-2/6 justify-end gap-4">
                            <img src="about1.jpg" alt="" className="w-2/3 mx-auto lg:w-full h-full left-0 rounded-full object-cover" />
                        </section> */}
          </div>
        </div>

        {/* sustainability */}
        <div className="h-auto lg:h-[100vh] my-20 flex justify-center items-center">
          <div className=" h-5/6 inset-0 z-20 flex flex-col-reverse lg:flex-row items-center justify-left text-white mx-auto w-5/6">
            {/* sustainability */}
            <div className="hidden lg:flex w-full lg:w-1/2 h-full  flex-col gap-5 ">
              {/* <div className="h-1/2 flex gap-5">
                                <div className="bg-transparent h-full w-1/2 flex  rounded-bl-3xl rounded-br-3xl rounded-tl-3xl shadow-xl text-white">
                                    <img src="test2.jpg" alt="" className="rounded-bl-3xl rounded-tr-3xl rounded-tl-3xl h-full  object-cover w-full" />
                                </div>

                                <div className="bg-transparent h-full w-1/2 flex  rounded-bl-3xl rounded-br-3xl rounded-tl-3xl shadow-xl text-white">
                                    <img src="about2.jpg" alt="" className="rounded-br-3xl rounded-tr-3xl rounded-tl-3xl h-full  object-cover w-full" />
                                </div>
                            </div>

                            <div className="h-1/2 flex gap-5">
                                <div className="bg-transparent h-full w-1/2 rounded-bl-3xl rounded-br-3xl rounded-tl-3xl shadow-xl text-white">
                                    <img src="sus2.jpg" alt="" className="rounded-bl-3xl rounded-br-3xl rounded-tl-3xl h-full  object-cover w-full" />
                                </div>

                                <div className="bg-transparent h-full w-1/2 rounded-bl-3xl rounded-br-3xl rounded-tl-3xl shadow-xl text-white">
                                    <img src="mission.jpg" alt="" className="rounded-bl-3xl rounded-br-3xl rounded-tr-3xl h-full  object-cover w-full" />
                                </div>
                            </div> */}
              <img src={sus} alt="" className="rounded-4xl" />
            </div>

            {/* to be */}
            <div className="lg:hidden w-full lg:w-1/2 h-full flex flex-col gap-5 ">
              <div className="bg-transparent h-full w-full mt-5 lg:mt-0 flex  rounded-bl-3xl rounded-br-3xl rounded-tl-3xl shadow-xl text-white">
                <img
                  src="test2.jpg"
                  alt=""
                  className="rounded-bl-3xl rounded-tr-3xl rounded-tl-3xl h-full  object-cover w-full"
                />
              </div>
            </div>

            {/* content. */}
            <div className="w-full lg:w-1/2 h-full lg:pl-20 lg:pt-10">
              <h2 className="text-xl font-semibold text-gray-600 text-center lg:text-left">
                Our Commitment to
              </h2>
              <p className="text-gray-300 flex flex-col font-bold text-title mt-5 mb-3 ">
                <span className="text-3xl lg:text-[50px] text-primary text-center lg:text-left ">
                  Sustainability.
                </span>
              </p>
              <p className="mb-3 text-gray-500 leading-7 text-justify lg:text-left">
                {" "}
                At Regency Travel House, we believe in responsible and ethical
                travel that positively impacts communities and the environment.
                Guided by the United Nations Sustainable Development Goals
                (SDGs), we have implemented key initiatives under Goals 3, 4, 5,
                8, and 15 to create meaningful change.{" "}
              </p>

              <p className="mb-3 mt-10 lg:mt-20 text-body bg-secondary py-2 px-5 text-center lg:text-left">
                Regency Travel House, we have implemented, Sustainable
                Development Goals (SDGs), 3, 4, 5, 8, and 15.
              </p>
            </div>
          </div>
        </div>

        {/* rays of hope */}
        <div className="bg-neutral-100 h-auto py-10 lg:py-0 lg:h-[90vh] my-2 flex justify-center items-center">
          <div className="h-5/6 inset-0 z-20 flex items-center justify-left text-white mx-auto w-5/6">
            <section className="w-full h-full flex justify-ceneter items-center">
              <div className="h-full mx-auto flex flex-col lg:flex-row items-center gap-10">
                {/* Content */}
                <div className="w-full lg:w-1/2 text-center lg:text-left lg:pr-15">
                  <h2 className="text-xl font-semibold text-gray-600">
                    SDGs 3 & 4
                  </h2>
                  <h2 className="text-title  sm:text-4xl font-bold text-[#0d1537] my-5 italic">
                    Rays of Hope
                  </h2>

                  <p className="mb-3 text-gray-500 leading-6 text-justify lg:text-left">
                    Through our Rays of Hope initiative, we are committed to
                    creating meaningful impact in the lives of children by
                    supporting two critical Sustainable Development Goals: Good
                    Health and Well-being (SDG 3) and Quality Education (SDG 4).
                    <br/>
                    <br/>
                    In partnership with local government establishments, we
                    conduct well-being sessions that provide both health and
                    psychological support to students in underprivileged
                    schools. These efforts ensure that children receive the care
                    they need to thrive emotionally and physically. In parallel,
                    we actively support educational development by improving
                    school infrastructure and donating essential learning
                    materials. Our goal is to help create an environment where
                    every child has access to safe, inclusive, and quality
                    education, regardless of their background.
                  </p>

                  <p className="mb-3 mt-20 text-body bg-secondary py-2 px-5">
                    Regency Travel House, we have implemented, Good Health &
                    Well-Being, Quality Education.
                  </p>
                </div>

                {/* Image */}
                <div className="w-full lg:w-1/2 h-full">
                  <img
                    src="raysofhope.jpg"
                    alt="University Collaboration"
                    className="w-full h-full rounded-xl shadow-md object-cover"
                  />
                </div>
              </div>
            </section>
          </div>
        </div>

        {/* goals */}
        <div className="h-[90vh] hidden lg:flex justify-center items-center my-25">
          <div className="h-full py-10 inset-0 z-20 flex gap-8 items-center justify-left text-white mx-auto w-5/6">
            <div className="relative w-1/3 bg-red-300 h-full rounded-3xl">
              <img
                src={Goal5}
                alt=""
                className="w-full h-full rounded-3xl object-cover"
              />
              <div className="bottom-0 absolute h-2/5 rounded-bl-3xl rounded-br-3xl px-10 bg-black/40 backdrop-blur-sm border border-white/20 py-5 text-left">
                <h2 className="text-xl font-bold text-body mb-2">Goal 5</h2>
                <p className="text-base font-normal text-gray-300 mb-3">
                  Ensuring gender equality in recruitment, leadership, and
                  decision-making. Empowering women within our organization by
                  providing opportunities for professional growth.
                </p>
              </div>
            </div>

            <div className="relative w-1/3 bg-red-300 h-full rounded-3xl">
              <img
                src={Goal8}
                alt=""
                className="w-full h-full rounded-3xl object-cover"
              />
              <div className="bottom-0 absolute h-2/5 rounded-bl-3xl rounded-br-3xl px-10 bg-black/40 backdrop-blur-sm border border-white/20 py-5 text-left">
                <h2 className="text-xl font-bold text-body mb-2">Goal 8</h2>
                <p className="text-base font-normal text-gray-300">
                  Offering training programs for young individuals who have not
                  completed formal education, equipping them with the skills to
                  build successful careers while contributing to the national
                  economy.{" "}
                </p>
              </div>
            </div>

            <div className="relative w-1/3 bg-red-300 h-full rounded-3xl">
              <img
                src={Goal15}
                alt=""
                className="w-full h-full rounded-3xl object-cover"
              />
              <div className="bottom-0 absolute h-2/5 rounded-bl-3xl rounded-br-3xl px-10 bg-black/40 backdrop-blur-sm border border-white/20 py-5 text-left">
                <h2 className="text-xl font-bold text-body mb-2">Goal 15</h2>
                <p className="text-base font-normal text-gray-300 mb-3">
                  Supporting reforestation projects to restore Sri Lanka’s
                  natural landscapes.Collaborating with the Youth Exploration
                  Society to combat species extinction and protect endangered
                  flora and fauna.
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="lg:hidden min-h-screen flex justify-center items-center my-25">
          <div className="w-11/12 max-w-screen-xl mx-auto flex flex-col lg:flex-row gap-6 lg:gap-8 py-10">
            <div className="relative w-full lg:w-1/3 bg-red-300 h-[500px] rounded-3xl">
              <img
                src={Goal5}
                alt=""
                className="w-full h-full rounded-3xl object-cover"
              />
              <div className="bottom-0 absolute h-2/5 rounded-bl-3xl rounded-br-3xl px-6 md:px-10 bg-black/40 backdrop-blur-sm border border-white/20 py-5 text-left">
                <h2 className="text-lg md:text-xl font-bold text-white mb-2">
                  Goal 5
                </h2>
                <p className="text-sm md:text-base font-normal text-gray-300">
                  Ensuring gender equality in recruitment, leadership, and
                  decision-making. Empowering women within our organization by
                  providing opportunities for professional growth.
                </p>
              </div>
            </div>

            <div className="relative w-full lg:w-1/3 bg-red-300 h-[500px] rounded-3xl">
              <img
                src={Goal8}
                alt=""
                className="w-full h-full rounded-3xl object-cover"
              />
              <div className="bottom-0 absolute h-2/5 rounded-bl-3xl rounded-br-3xl px-6 md:px-10 bg-black/40 backdrop-blur-sm border border-white/20 py-5 text-left">
                <h2 className="text-lg md:text-xl font-bold text-white mb-2">
                  Goal 8
                </h2>
                <p className="text-sm md:text-base font-normal text-gray-300">
                  Offering training programs for young individuals who have not
                  completed formal education, equipping them with the skills to
                  build successful careers while contributing to the national
                  economy.
                </p>
              </div>
            </div>

            <div className="relative w-full lg:w-1/3 bg-red-300 h-[500px] rounded-3xl">
              <img
                src={Goal15}
                alt=""
                className="w-full h-full rounded-3xl object-cover"
              />
              <div className="bottom-0 absolute h-2/5 rounded-bl-3xl rounded-br-3xl px-6 md:px-10 bg-black/40 backdrop-blur-sm border border-white/20 py-5 text-left">
                <h2 className="text-lg md:text-xl font-bold text-white mb-2">
                  Goal 15
                </h2>
                <p className="text-sm md:text-base font-normal text-gray-300">
                  Supporting reforestation projects to restore Sri Lanka’s
                  natural landscapes. Collaborating with the Youth Exploration
                  Society to combat species extinction and protect endangered
                  flora and fauna.
                </p>
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* footer section*/}
      <div className="bg-primary bg-center px-20 pt-10 print:hidden">
        <Footer />

        <hr className="mx-auto bg-secondary text-secondary h-[1px] w-4/5 mt-20" />
        <div>
          <p className="bg-primary text-center text-xs p-3 text-body">
            © All rights reserved by All In One Holdings.
          </p>
        </div>
      </div>
    </>
  );
}

export default Sustainability;
