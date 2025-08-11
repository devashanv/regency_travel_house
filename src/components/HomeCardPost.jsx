import React from "react";
import { LuArrowUpRight } from "react-icons/lu";
import { PiFlowerLotusFill } from "react-icons/pi";
import { Link } from "react-router-dom";
import cluture from "../assets/des/adventure.jpg";
import AdventureAwaits from "../assets/des/AdventureAwaits.jpg";

function HomeCardPost() {
  return (
    <>
      {/* desktop mode */}
      <div className="hidden lg:h-[100vh] lg:flex items-center">
        <div className="h-full mx-auto w-5/6 flex flex-col gap-5">
          <div className="">
            <h2 className="text-xl font-semibold text-gray-400">
              Find our best destination
            </h2>
            <p className="text-primary font-bold text-title">
              Your Journey Starts here
            </p>
          </div>

          <div className="flex h-3/6 gap-5">
            {/* first card */}
            <div className="relative h-full w-2/3 rounded-3xl">
              <div className=" absolute bg-transparent bottom-0 shadow-lg pb-10 w-full rounded-xl flex flex-col px-8 justify-center z-10">
                <h3 className="text-3xl font-bold text-body z-5">
                  Leisure Redefined
                </h3>
                <p className="text-base text-body mt-3 z-3">
                  Luxury escapes tailored for pure relaxation, comfort, and
                  unforgettable tranquility.
                </p>

                <Link
                  to="/destination-packages?category=leisure"
                  className="z-2"
                >
                  <button className="border border-body w-1/5 rounded-full py-2 mt-5 text-body hover:bg-body hover:text-primary  hover:cursor-pointer">
                    <span className="flex justify-center gap-1 items-center">
                      Show More <LuArrowUpRight />
                    </span>
                  </button>
                </Link>

                <div className="absolute bottom-0 rounded-3xl left-0 w-full h-80 bg-gradient-to-t from-[#0d1b2a]/80 to-transparent pointer-events-none" />
              </div>
              <div className="w-full h-full">
                <img
                  src="https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80"
                  alt=""
                  className="h-full w-full shadow-lg object-cover rounded-3xl"
                />
              </div>
            </div>

            {/* second card */}
            <div className="w-1/3 flex">
              <div className="relative w-1/2 h-full">
                {/* <img src="https://images.unsplash.com/photo-1503220317375-aaad61436b1b?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80" alt="" className="h-full shadow-lg w-full object-cover rounded-bl-3xl rounded-tl-3xl" /> */}
                <img
                  src={AdventureAwaits}
                  alt=""
                  className="h-full shadow-lg w-full object-cover rounded-bl-3xl rounded-tl-3xl"
                />

                <div className="absolute bottom-0 rounded-3xl left-0 w-full h-40 bg-gradient-to-t from-[#0d1b2a]/80 to-transparent pointer-events-none" />
              </div>
              <div className="bg-body shadow-lg w-1/2 h-full flex flex-col px-3 justify-center text-left rounded-tr-3xl rounded-br-3xl">
                <h3 className="lg:text-2xl sm:text-sm font-bold text-primary">
                  Adventure Awaits
                </h3>

                <p className="text-sm  text-gray-600 mt-3">
                  Thrill-packed journeys for adrenaline seekers craving nature,
                  action, and exploration.
                </p>
                <Link
                  to="/destination-packages?category=Adventure"
                  className="z-2"
                >
                  <span className="text-secondary text-base w-full mt-5 text-left flex  gap-1 ">
                    Show More <LuArrowUpRight />
                  </span>
                </Link>
              </div>
            </div>
          </div>

          {/* third card */}
          <div className="w-full flex gap-10 h-1/3">
            <div className="flex h-full gap-2 w-full">
              <div className="bg-body shadow-lg w-1/3 px-10 flex flex-col px-3 justify-center text-left rounded-3xl">
                <PiFlowerLotusFill className="w-12  h-12  text-secondary self-start" />
                <h3 className="text-2xl font-bold text-primary">
                  Pilgrim Getaways
                </h3>
                <p className="text-sm  text-gray-600 mt-3">
                  Spiritual retreats designed for inner peace, devotion, and
                  cultural connection.
                </p>

                <button className="text-secondary flex ustify-center items-center text-base w-full mt-5 text-left">
                  <Link
                    to="/destination-packages?category=Pilgrim"
                    className="z-2"
                  >
                    <span className="flex justify-center gap-1 items-center">
                      Show More <LuArrowUpRight />
                    </span>
                  </Link>
                </button>
              </div>
              <div className="relative w-2/3 h-full">
                {/* <img src="https://images.unsplash.com/photo-1476514525535-07fb3b4ae5f1?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80" alt="" className="h-full shadow-lg w-full object-cover rounded-3xl" /> */}
                <img
                  src={cluture}
                  alt=""
                  className="h-full shadow-lg w-full object-cover rounded-3xl"
                />

                <div className=" absolute bg-transparent bottom-0 shadow-lg pb-10 w-full rounded-xl flex flex-col px-8 justify-center z-10">
                  <h3 className="text-2xl font-bold text-body z-5">
                    Cultural Redefined
                  </h3>
                  <p className="text-base text-body mt-3 z-3">
                    Immersive experiences showcasing heritage, traditions, and
                    timeless local stories.
                  </p>

                  <Link
                    to="/destination-packages?category=Cultural"
                    className="z-2"
                  >
                    <button className="border border-body w-1/5 rounded-full py-2 mt-5 text-body hover:bg-body hover:text-primary z-2 hover:cursor-pointer">
                      <span className="flex justify-center gap-1 items-center">
                        Show More <LuArrowUpRight />
                      </span>
                    </button>
                  </Link>

                  <div className="absolute bottom-0 rounded-3xl left-0 w-full h-50 bg-gradient-to-t from-[#0d1b2a]/80 to-transparent pointer-events-none" />
                </div>
              </div>
            </div>

          </div>
        </div>
      </div>

      {/* mobile mode */}
      <div className="lg:hidden h-auto flex items-center">
        <div className="mx-auto w-5/6 flex flex-col gap-5">
          {/* Section Header */}
          <div>
            <h2 className="text-xl font-semibold text-gray-400">
              Find our best destination
            </h2>
            <p className="text-primary font-bold text-title">
              Your Journey Starts here
            </p>
          </div>

          {/* Top Two Cards - First Row */}
          <div className="flex flex-col md:flex-row gap-5">
            {/* First card (2/3 on desktop) */}
            <div className="relative w-full md:w-2/3 h-[300px] md:h-[400px] rounded-3xl">
              <div className="absolute bottom-0 z-10 w-full px-8 pb-10 flex flex-col justify-center">
                <h3 className="text-3xl font-bold text-body">
                  Leisure Redefined
                </h3>
                <p className="text-base text-body mt-3">
                  Luxury escapes tailored for pure relaxation, comfort, and
                  unforgettable tranquility.
                </p>
                <Link to="/destination-packages?category=leisure">
                  <button className="border border-body px-5 py-2 mt-5 rounded-full text-body hover:bg-body hover:text-primary transition">
                    <span className="flex justify-center gap-1 items-center">
                      Show More <LuArrowUpRight />
                    </span>
                  </button>
                </Link>
              </div>
              <div className="absolute bottom-0 left-0 w-full h-80 bg-gradient-to-t from-[#0d1b2a]/80 to-transparent rounded-3xl pointer-events-none" />
              <img
                src="https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80"
                alt="Leisure"
                className="h-full w-full object-cover rounded-3xl shadow-lg"
              />
            </div>

            {/* Second card (1/3 on desktop) */}
            <div className="w-full md:w-1/3 h-[300px] md:h-[400px] flex">
              <div className="relative w-1/2 h-full md:hidden">
                <img
                  src="https://images.unsplash.com/photo-1503220317375-aaad61436b1b?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80"
                  alt="Adventure"
                  className="h-full w-full object-cover rounded-bl-3xl rounded-tl-3xl shadow-lg"
                />
                <div className="absolute bottom-0 left-0 w-full h-40 bg-gradient-to-t from-[#0d1b2a]/80 to-transparent rounded-3xl pointer-events-none" />
              </div>
              <div className="w-1/2 md:w-full h-full bg-body shadow-lg flex flex-col justify-center px-4 rounded-tr-3xl rounded-br-3xl">
                <h3 className="text-lg md:text-2xl font-bold text-primary">
                  Adventure Awaits
                </h3>
                <Link to="/destination-packages?category=Adventure">
                  <p className="text-sm text-gray-600 mt-3">
                    Thrill-packed journeys for adrenaline seekers craving
                    nature, action, and exploration.
                  </p>
                  <button className="text-secondary flex items-center text-base mt-5">
                    <span className="flex gap-1 items-center">
                      Show More <LuArrowUpRight />
                    </span>
                  </button>
                </Link>
              </div>
            </div>
          </div>

          {/* Bottom Two Cards - Second Row (Reverse Order) */}
          <div className="flex flex-col md:flex-row gap-5">
            {/* First card (1/3 on desktop) */}
            <div className="w-full md:w-1/3 h-[300px] md:h-[400px] bg-body shadow-lg px-6 py-6 rounded-3xl flex flex-col justify-center">
              <PiFlowerLotusFill className="w-12  h-12  text-secondary" />
              <h3 className="text-xl md:text-2xl font-bold text-primary">
                Pilgrim Getaways
              </h3>
              <p className="text-sm text-gray-600 mt-3">
                Spiritual retreats designed for inner peace, devotion, and
                cultural connection.
              </p>
              <Link to="/destination-packages?category=Pilgrim">
                <button className="text-secondary flex items-center text-base mt-5">
                  <span className="flex gap-1 items-center">
                    Show More <LuArrowUpRight />
                  </span>
                </button>
              </Link>
            </div>

            {/* Second card (2/3 on desktop) */}
            <div className="relative w-full md:w-2/3 h-[300px] md:h-[400px] rounded-3xl">
              <div className="absolute bottom-0 z-10 w-full px-8 pb-10 flex flex-col justify-center">
                <h3 className="text-2xl font-bold text-body">
                  Cultural Redefined
                </h3>
                <p className="text-base text-body mt-3">
                  Immersive experiences showcasing heritage, traditions, and
                  timeless local stories.
                </p>
                <Link to="/destination-packages?category=Cultural">
                  <button className="border border-body px-5 py-2 mt-5 rounded-full text-body hover:bg-body hover:text-primary transition">
                    <span className="flex justify-center gap-1 items-center">
                      Show More <LuArrowUpRight />
                    </span>
                  </button>
                </Link>
              </div>
              <div className="absolute bottom-0 left-0 w-full h-40 bg-gradient-to-t from-[#0d1b2a]/80 to-transparent rounded-3xl pointer-events-none" />
              <img
                src="https://images.unsplash.com/photo-1476514525535-07fb3b4ae5f1?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80"
                alt="Culture"
                className="h-full w-full object-cover rounded-3xl shadow-lg"
              />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default HomeCardPost;
