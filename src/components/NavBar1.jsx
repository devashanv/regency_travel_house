import React, { useState, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { IoIosArrowDown, IoIosArrowUp } from "react-icons/io";
import { FiMenu } from "react-icons/fi";
import { RxCross2 } from "react-icons/rx";
import PlaneImg from "../assets/lineArtPlane.png";
import PlaneImg2 from "../assets/travel-line.webp";
import "../styles/NavBar.css";
import Logo from "../assets/RTH-logo.png";

function NavBar1(prop) {
  const [isMenuToggle, setisMenuToggle] = useState(false);

  const [user, setUser] = useState(null);

  const location = useLocation();
  const navigate = useNavigate();

  const handleClick = (path) => {
    if (location.pathname === path) {
      navigate(0);
    } else {
      navigate(path);
    }
  };

  useEffect(() => {
    try {
      const storedUser = localStorage.getItem("auth_user");
      if (storedUser && storedUser !== "undefined") {
        setUser(JSON.parse(storedUser));
      }
    } catch (error) {
      console.error("Failed to parse auth_user from localStorage", error);
      setUser(null);
    }
  }, []);

  const openMenu = () => {
    setisMenuToggle(!isMenuToggle);
  };

  const [showDestinations, setShowDestinations] = useState(false);

  return (
    <>
      <div className="absolute h-50 top-0 left-0 w-full z-[-1] bg-gradient-to-b from-white/60 via-white/20 to-transparent"></div>
      <nav className="nav-blur flex justify-between px-5 py-3 lg:px-10 lg:py-2 relative">
        {/* logo */}
        <div className="w-2/3 flex lg:w-1/5 lg:flex">
          <img
            src={Logo}
            alt="Regency Travel House logo"
            className="w-40 h-12 lg:w-52 lg:h-16 object-cover"
          />
        </div>

        {/* nav links - desktop only */}
        <div className="hidden lg:flex lg:w-3/5 lg:px-10 lg:justify-between lg:items-center ">
          <ul
            className="w-full h-full items-center lg:w-4/5 lg:mx-auto font-semibold flex gap-4 flex-row pl-0 justify-between"
            id="nav-links"
          >
            <li
              className={
                prop.page === "home"
                  ? "text-secondary"
                  : "text-primary hover:text-secondary"
              }
            >
              <Link to="/">Home</Link>
            </li>
            <li
              className={
                prop.page === "about"
                  ? "text-secondary"
                  : "text-primary hover:text-secondary"
              }
            >
              <Link to="/aboutus">About</Link>
            </li>

            {/* destinations  */}
            <li className="group hidden items-center lg:flex  h-full">
              <span
                className={
                  prop.page === "destination"
                    ? "text-secondary flex items-center"
                    : "text-primary hover:text-secondary flex items-center"
                }
              >
                Destination{" "}
                <IoIosArrowDown className="ml-1 group-hover:rotate-180 transition" />
              </span>

              {/* Dropdown Menu */}
              <ul className="absolute pt-11 pb-11 m w-full flex text-bold   justify-center top-18 left-0 hidden group-hover:flex flex-row z-50  bg-white/30 backdrop-blur-md text-sm shadow-xl rounded-lg py-6 px-8 gap-10 transition transition-all duration-800 ease-out">
                <div className=" w-[300px] mt-[-50px] flex items-center justify-center">
                  <img src={PlaneImg2} alt="Line Art" />
                </div>

                <div className="w-4/6 flex  justify-between">
                  {/*Asia */}
                  <div className="w-1/5 flex  flex-col items-center ">
                    <Link
                      className="text-gray-800 text-xl font-semibold mb-4 hover:text-secondary"
                      to="/destination-packages?region=South-East"
                    >
                      Asia
                    </Link>
                    <div className="grid grid-cols-2  gap-10 lg:gap-6 lg:w-auto">
                      <div>
                        <div className="flex flex-col justify-center gap-3 text-lg font-thin">
                          <Link
                            to="/destination-packages?country=cambodia"
                            className="hover:text-secondary "
                          >
                            Bhuthan
                          </Link>
                          <Link
                            to="/destination-packages?country=cambodia"
                            className="hover:text-secondary"
                          >
                            Cambodia
                          </Link>
                          <Link
                            to="/destination-packages?country=cambodia"
                            className="hover:text-secondary"
                          >
                            China
                          </Link>
                          <Link
                            to="/destination-packages?country=india"
                            className="hover:text-secondary"
                          >
                            India
                          </Link>
                          <Link
                            to="/destination-packages?country=loas"
                            className="hover:text-secondary"
                          >
                            Laos
                          </Link>

                          <Link
                            to="/destination-packages?country=malaysia"
                            className="hover:text-secondary"
                          >
                            Malaysia
                          </Link>

                          <Link
                            to="/destination-packages?country=mongolia"
                            className="hover:text-secondary"
                          >
                            Mongolia
                          </Link>

                          <Link
                            to="/destination-packages?country=myanmar"
                            className="hover:text-secondary"
                          >
                            Myanmar
                          </Link>
                        </div>
                      </div>

                      <div className="flex  lg:w-auto flex-col gap-3 text-lg font-thin">
                        <Link
                          to="/destination-packages?country=seychellese"
                          className="hover:text-secondary"
                        >
                          Seychelles
                        </Link>
                        <Link
                          to="/destination-packages?country=Singapore"
                          className="hover:text-secondary"
                        >
                          Singapore
                        </Link>
                        <Link
                          to="/destination-packages?country=sri-lanka"
                          className="hover:text-secondary"
                        >
                          Sri Lanka
                        </Link>
                        <Link
                          to="/destination-packages?country=japan"
                          className="hover:text-secondary"
                        >
                          Japan
                        </Link>
                        <Link
                          to="/destination-packages?country=nepal"
                          className="hover:text-secondary"
                        >
                          Nepal
                        </Link>
                        <Link
                          to="/destination-packages?country=thailand"
                          className="hover:text-secondary"
                        >
                          Thailand
                        </Link>
                        <Link
                          to="/destination-packages?country=vietnam"
                          className="hover:text-secondary"
                        >
                          Vietnam
                        </Link>
                      </div>
                    </div>
                    <div className="flex justify-center items-center mt-4 w-full text-lg font-semibold"></div>
                  </div>

                  {/* Africa */}
                  <div className="w-1/5 flex flex-col items-center">
                    <Link
                      className="text-gray-800 text-xl font-semibold mb-4  hover:text-secondary"
                      to="/destination-packages?region=Africa"
                    >
                      Africa
                    </Link>
                    <div className="flex flex-col gap-3 text-lg font-thin">
                      <Link
                        to="/destination-packages?country=bostwana"
                        className="hover:text-secondary"
                      >
                        Bostwana
                      </Link>
                      <Link
                        to="/destination-packages?country=egypt"
                        className="hover:text-secondary"
                      >
                        Egypt
                      </Link>
                      <Link
                        to="/destination-packages?country=kenya"
                        className="hover:text-secondary"
                      >
                        Kenya
                      </Link>
                      <Link
                        to="/destination-packages?country=tanzania"
                        className="hover:text-secondary"
                      >
                        Tanzania
                      </Link>
                    </div>
                  </div>

                  {/* Europe */}
                  <div className="w-1/5 flex flex-col items-center">
                    <Link
                      className="text-gray-800 text-xl font-semibold mb-4  hover:text-secondary"
                      to="/destination-packages?region=europe"
                    >
                      Europe
                    </Link>
                    <div className="grid grid-cols-2 gap-10">
                      <div>
                        <div className="flex flex-col gap-2 t text-lg font-thin">
                          <Link
                            to="/destination-packages?country=albania"
                            className="hover:text-secondary"
                          >
                            Albania
                          </Link>
                          <Link
                            to="/destination-packages?country=india"
                            className="hover:text-secondary"
                          >
                            Balkan
                          </Link>
                          <Link
                            to="/destination-packages?country=croatia"
                            className="hover:text-secondary"
                          >
                            Croatia
                          </Link>
                          <Link
                            to="/destination-packages?country=france"
                            className="hover:text-secondary"
                          >
                            France
                          </Link>
                          <Link
                            to="/destination-packages?country=italy"
                            className="hover:text-secondary"
                          >
                            Italy
                          </Link>
                          <Link
                            to="/destination-packages?country=netherland"
                            className="hover:text-secondary"
                          >
                            Netherland
                          </Link>
                          <Link
                            to="/destination-packages?country=russia"
                            className="hover:text-secondary"
                          >
                            Russia
                          </Link>
                          <Link
                            to="/destination-packages?country=serbia"
                            className="hover:text-secondary"
                          >
                            Serbia
                          </Link>
                        </div>
                      </div>
                      <div className="flex flex-col gap-2 t text-lg font-thin">
                        <Link
                          to="/destination-packages?country=slovania"
                          className="hover:text-secondary"
                        >
                          Slovenia
                        </Link>
                        <Link
                          to="/destination-packages?country=turkey"
                          className="hover:text-secondary"
                        >
                          Turkey
                        </Link>
                      </div>
                    </div>
                  </div>

                  {/* middel east */}
                  <div className="w-1/5 flex flex-col items-center">
                    <Link
                      className="text-gray-800 text-xl font-semibold mb-4  hover:text-secondary"
                      to="/destination-packages?region=middel-east"
                    >
                      Middle East
                    </Link>
                    <div className="flex flex-col gap-3 text-lg font-thin">
                      <Link
                        to="/destination-packages?country=jordan"
                        className="hover:text-secondary"
                      >
                        Jordan
                      </Link>
                      <Link
                        to="/destination-packages?country=oman"
                        className="hover:text-secondary"
                      >
                        Oman
                      </Link>
                    </div>
                  </div>
                </div>
                <div className="w-1/6  relative">
                  <Link to="/destination-packages">
                    <button className=" px-10 py-2 bg-secondary rounded-full text-white text-sm py-2 hover:bg-secondary transition hover:bg-secondary/[0.8] hover:cursor-pointer">
                      All Packages
                    </button>
                  </Link>
                </div>
              </ul>
            </li>

            {/* Special Tours  */}
            <li
              className={
                prop.page === "special-packages"
                  ? "text-secondary"
                  : "text-primary hover:text-secondary"
              }
            >
              <Link to="/special-packages">Cruise & Special Tours</Link>
            </li>

            <li
              className={
                prop.page === "career"
                  ? "text-secondary"
                  : "text-primary hover:text-secondary"
              }
            >
              <Link to="/career">Careers</Link>
            </li>
            <li
              className={
                prop.page === "contact"
                  ? "text-secondary"
                  : "text-primary hover:text-secondary"
              }
            >
              <Link to="/contactus">Contact</Link>
            </li>
          </ul>
        </div>

        {/* sign in button - desktop only */}
        <div className="hidden lg:flex lg:gap-5 lg:w-1/5 justify-end items-center">
          {/* language switcher */}
          {/* <script
            src="https://static.elfsight.com/platform/platform.js"
            async
          ></script>
          <div
            className="pt-8 hidden lg:flex"
            class="elfsight-app-d393b67b-7b34-4578-b174-240f9c697e1f"
          ></div> */}

          <script
            src="https://static.elfsight.com/platform/platform.js"
            async
          ></script>
          <div
            class="elfsight-app-dc07b7b7-c25b-43ae-a0f0-b0911e72ada9"
            data-elfsight-app-lazy
          ></div>

          {user ? (
            <div className="relative group">
              <div className="text-white hover:bg-secondary font-medium text-sm px-3 py-2 rounded-full bg-primary cursor-pointer">
                <Link to="/mydashboard">{user.full_name?.split(" ")[0]}</Link>
              </div>
            </div>
          ) : (
            <Link to="/login">
              <button
                className={
                  prop.page === "signin" || prop.page === "signup"
                    ? "hidden"
                    : "block w-20 bg-primary cursor-pointer rounded-full text-white text-sm py-2 hover:bg-secondary transition"
                }
              >
                Sign In
              </button>
            </Link>
          )}
        </div>

        {/* Hamburger menu icon - mobile only */}
        <div className="flex items-center gap-4 lg:hidden">
          <div className="lg:flex lg:w-1/5 justify-end items-center">
            {user ? (
              <div className="relative group">
                <div className="text-white hover:bg-secondary font-medium text-sm px-3 py-2 rounded-full bg-primary cursor-pointer">
                  <Link to="/mydashboard">{user.full_name?.split(" ")[0]}</Link>
                </div>
              </div>
            ) : (
              <Link to="/login">
                <button
                  className={
                    prop.page === "signin" || prop.page === "signup"
                      ? "hidden"
                      : "block w-20 bg-primary rounded-full text-white text-sm py-2 hover:bg-secondary transition"
                  }
                >
                  Sign In
                </button>
              </Link>
            )}
          </div>
          <button onClick={openMenu}>
            {isMenuToggle ? (
              <FiMenu className="w-7 h-7 text-primary hover:text-secondary hover:cursor-pointer" />
            ) : (
              <FiMenu className="w-7 h-7 text-primary hover:text-secondary hover:cursor-pointer" />
            )}
          </button>
        </div>

        {/* Mobile slide-in menu */}
        <div
          className={`lg:hidden bg-white/0.8 backdrop-blur-2xl fixed top-0 right-0 h-full w-3/4 bg-white shadow-lg z-50 transform transition-transform duration-300 ease-in-out ${
            isMenuToggle ? "translate-x-0" : "translate-x-full"
          }`}
        >
          <div className="flex justify-end p-4">
            <button onClick={openMenu}>
              <RxCross2 className="w-6 h-6 text-primary hover:text-secondary hover:cursor-pointer" />
            </button>
          </div>
          <ul className="flex flex-col gap-2 px-2 py-2 text-lg">
            <li className="hover:bg-neutral-100 py-2 px-4 rounded-2xl hover:cursor-pointer">
              {/* language switcher */}
              <script
                src="https://static.elfsight.com/platform/platform.js"
                async
              ></script>
              <div
                class="elfsight-app-dc07b7b7-c25b-43ae-a0f0-b0911e72ada9"
                data-elfsight-app-lazy
              ></div>
            </li>

            <li
              className={
                prop.page === "home"
                  ? "text-secondary py-2 px-4"
                  : "hover:bg-neutral-100 py-2 px-4 rounded-2xl hover:cursor-pointer"
              }
            >
              <Link to="/" onClick={openMenu}>
                Home
              </Link>
            </li>
            <li
              className={
                prop.page === "about"
                  ? "text-secondary py-2 px-4"
                  : "hover:bg-neutral-100 py-2 px-4 rounded-2xl hover:cursor-pointer"
              }
            >
              <Link to="/aboutus" onClick={openMenu}>
                About
              </Link>
            </li>
            <li className="hover:bg-neutral-100 py-2 px-4 rounded-2xl hover:cursor-pointer">
              {/* Destinations Dropdown */}
              <li className="py-2 rounded-2xl hover:cursor-pointer hover:bg-neutral-100">
                <div
                  className="flex justify-between items-center"
                  onClick={() => setShowDestinations(!showDestinations)}
                >
                  <span>Destinations</span>
                  {showDestinations ? <IoIosArrowUp /> : <IoIosArrowDown />}
                </div>
                {showDestinations && (
                  <ul className="mt-2 ml-2 flex flex-col gap-2 text-base text-gray-700">
                    <li className="hover:bg-white px-4 py-2 rounded-xl">
                      <Link
                        to="/destination-packages?region=Asia"
                        onClick={openMenu}
                      >
                        Asia
                      </Link>
                    </li>

                    <li className="hover:bg-white px-4 py-2 rounded-xl">
                      <Link
                        to="/destination-packages?region=Africa"
                        onClick={openMenu}
                      >
                        Africa
                      </Link>
                    </li>

                    <li className="hover:bg-white px-4 py-2 rounded-xl">
                      <Link
                        to="/destination-packages?region=europe"
                        onClick={openMenu}
                      >
                        Europe
                      </Link>
                    </li>

                    <li className="hover:bg-white px-4 py-2 rounded-xl">
                      <Link
                        to="/destination-packages?region=middel-east"
                        onClick={openMenu}
                      >
                        Middle East
                      </Link>
                    </li>

                    <li className="hover:bg-white px-4 py-2 rounded-xl">
                      <Link to="/destination-packages" onClick={openMenu}>
                        All Packages
                      </Link>
                    </li>
                  </ul>
                )}
              </li>
            </li>

            <li
              className={
                prop.page === "special-packages"
                  ? "text-secondary py-2 px-4"
                  : "hover:bg-neutral-100 py-2 px-4 rounded-2xl hover:cursor-pointer"
              }
            >
              <Link to="/special-packages">Cruise & Special Tours</Link>
            </li>
            <li
              className={
                prop.page === "career"
                  ? "text-secondary py-2 px-4"
                  : "hover:bg-neutral-100 py-2 px-4 rounded-2xl hover:cursor-pointer"
              }
            >
              <Link to="/career" onClick={openMenu}>
                Careers
              </Link>
            </li>
            <li
              className={
                prop.page === "contact"
                  ? "text-secondary py-2 px-4"
                  : "hover:bg-neutral-100 py-2 px-4 rounded-2xl hover:cursor-pointer"
              }
            >
              <Link to="/contactus" onClick={openMenu}>
                Contact
              </Link>
            </li>
          </ul>
        </div>
      </nav>
    </>
  );
}

export default NavBar1;
