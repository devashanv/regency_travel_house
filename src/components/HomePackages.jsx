import React, { useState } from 'react'
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";
import img1 from '../assets/card-images/card1.jpg'
import { MdLocationPin } from "react-icons/md";
import { FaCalendarDays } from "react-icons/fa6";
import { FaLocationArrow } from "react-icons/fa6";

function HomePackages() {

    const settings = {
        dots: false,
        infinite: true,
        slidesToShow: 1,
        slidesToScroll: 1,
        vertical: true,
        verticalSwiping: true,
        beforeChange: function(currentSlide, nextSlide) {
          console.log("before change", currentSlide, nextSlide);
        },
        afterChange: function(currentSlide) {
          console.log("after change", currentSlide);
        }
      };
    
      // State to handle whether the package is in the wishlist
//   const [isInWishlist, setIsInWishlist] = useState(false);

//   // Toggle Wishlist
//   const toggleWishlist = () => {
//     setIsInWishlist((prev) => !prev); // Toggle wishlist status
//   };


    const travelPackages = [
        {
          title: 'Tropical Paradise Getaway',
          description:
            'Experience the ultimate beach holiday in the Caribbean with white sands, turquoise waters, and luxury resorts.',
          features: [
            'All-inclusive meals and drinks',
            'Private beach access',
            'Guided excursions to nearby islands',
            'Luxury spa treatments',
          ],
          imageUrl: 'https://via.placeholder.com/600x400?text=Tropical+Paradise',
          exploreLink: '#explore1',
        },
        {
          title: 'Mountain Adventure Expedition',
          description:
            'Embark on an exhilarating journey through the Swiss Alps with breathtaking views and thrilling activities.',
          features: [
            'Hiking and trekking tours',
            'Visit to mountain villages',
            'Alpine skiing',
            'Traditional Swiss cuisine',
          ],
          imageUrl: 'https://via.placeholder.com/600x400?text=Mountain+Adventure',
          exploreLink: '#explore2',
        },
        {
          title: 'Cultural City Tour',
          description:
            'Explore ancient cities with rich history, vibrant culture, and world-renowned architecture.',
          features: [
            'Guided city tours',
            'Museum and gallery visits',
            'Culinary experiences',
            'Historic landmarks',
          ],
          imageUrl: 'https://via.placeholder.com/600x400?text=Cultural+Tour',
          exploreLink: '#explore3',
        },
      ];

    const [isInWishlist, setIsInWishlist] = useState(false);

    // Feature icons mapped directly to features
    // const featureIcons = {
    //   'All-inclusive meals and drinks': faUtensils,
    //   'Private beach access': faCheckCircle,
    //   'Guided excursions to nearby islands': faMountain,
    //   'Luxury spa treatments': faSpa,
    // };
    
    const toggleWishlist = () => {
      setIsInWishlist((prev) => !prev); // Toggle the wishlist status
    };

    //   //slider settings
    //   var settings = {
    //     dots: true,
    //     infinite: true,
    //     slidesToShow: 3,
    //     slidesToScroll: 1,
    //     autoplay: true,
    //     autoplaySpeed: 5000,
    //     responsive: [
    //       {
    //         breakpoint: 1024,
    //         settings: {
    //           dots: true,
    //           infinite: true,
    //           slidesToShow: 3,
    //           slidesToScroll: 1,
    //           autoplay: true,
    //           autoplaySpeed: 5000,
    //         }
    //       },
    //       {
    //         breakpoint: 900,
    //         settings: {
    //           dots: true,
    //           infinite: true,
    //           slidesToShow: 2,
    //           slidesToScroll: 1,
    //           autoplay: true,
    //           autoplaySpeed: 5000,
    //         }
    //       },
    //       {
    //         breakpoint: 768,
    //         settings: {
    //           dots: true,
    //           infinite: true,
    //           slidesToShow: 2,
    //           slidesToScroll: 1,
    //           autoplay: true,
    //           autoplaySpeed: 5000,
    //         }
    //       },
    //       {
    //         breakpoint: 480,
    //         settings: {
    //           dots: true,
    //           infinite: true,
    //           slidesToShow: 1,
    //           slidesToScroll: 1,
    //           autoplay: true,
    //           autoplaySpeed: 5000,
    //         }
    //       }
    //     ]
    // };


  return (
    <>
        <div className="slider-container">
            <Slider {...settings}>
                <div>
                    <div className="max-w-full card-shadow pb-[-100px] sm:max-w-2xl lg:max-w-4xl p-4 rounded-lg shadow-lg flex flex-col sm:flex-row justify-between items-center">
                    {/* Left section: Image */}
                    <div className="sm:w-1/2 mt-6 ml-4s m:mt-0">
                        <img className="w-full h-70 object-cover rounded-lg shadow-lg transform hover:scale-105 transition-transform duration-300"  src="card-images/card1.jpg"  alt="Tropical Paradise"
                        />
                    </div>

                    {/* Right section: Description */}
                    <div className="sm:w-1/2 p-6 text-center sm:text-left">
                        <h3 className="text-2xl font-semibold text-gray-800 mb-4 mt-14">Tropical Paradise Getaway</h3>
                        <p className="text-gray-600 mb-6">
                        Experience the ultimate beach holiday in the Caribbean with white sands, turquoise waters, and luxury resorts.
                        </p>


                        {/* Features list as chips */}
                        <div className="flex flex-wrap gap-3 mb-6">
                            <div className="flex items-center bg-blue-100 text-blue-700 text-sm font-medium py-1 px-4 rounded-full shadow-md hover:bg-blue-200 transition duration-300 gap-2">
                                <MdLocationPin />India
                            </div>
                            <div className="flex items-center bg-blue-100 text-blue-700 text-sm font-medium py-1 px-4 rounded-full shadow-md hover:bg-blue-200 transition duration-300 gap-2">
                                <FaLocationArrow  /> Channai
                            </div>
                            <div className="flex items-center bg-blue-100 text-blue-700 text-sm font-medium py-1 px-4 rounded-full shadow-md hover:bg-blue-200 transition duration-300 gap-2">
                                <FaCalendarDays /> 05 Days
                            </div>
                        </div>

        
                        {/* <a href="#explore" className="text-right text-secondary hover:underline"> Explore More </a> */}
                    </div>
                    </div>       
                </div>

                <div>
                    <div className="max-w-full  sm:max-w-2xl lg:max-w-4xl mx-auto my-1 p-4 rounded-lg shadow-lg flex flex-col sm:flex-row justify-between items-center">
                    {/* Left section: Image */}
                    <div className="sm:w-1/2 mt-6 ml-4sm:mt-0">
                        <img className="w-full h-64 object-cover rounded-lg shadow-lg transform hover:scale-105 transition-transform duration-300"  src="card-images/card1.jpg"  alt="Tropical Paradise"
                        />
                    </div>

                    {/* Right section: Description */}
                    <div className="sm:w-1/2 p-6 text-center sm:text-left">
                        <h3 className="text-2xl font-semibold text-gray-800 mb-4 mt-14">Tropical Paradise Getaway</h3>
                        <p className="text-gray-600 mb-6">
                        Experience the ultimate beach holiday in the Caribbean with white sands, turquoise waters, and luxury resorts.
                        </p>


                        {/* Features list as chips */}
                        <div className="flex flex-wrap gap-3 mb-6">
                            <div className="flex items-center bg-blue-100 text-blue-700 text-sm font-medium py-1 px-4 rounded-full shadow-md hover:bg-blue-200 transition duration-300 gap-2">
                                <MdLocationPin />India
                            </div>
                            <div className="flex items-center bg-blue-100 text-blue-700 text-sm font-medium py-1 px-4 rounded-full shadow-md hover:bg-blue-200 transition duration-300 gap-2">
                                <FaLocationArrow  /> Channai
                            </div>
                            <div className="flex items-center bg-blue-100 text-blue-700 text-sm font-medium py-1 px-4 rounded-full shadow-md hover:bg-blue-200 transition duration-300 gap-2">
                                <FaCalendarDays /> 05 Days
                            </div>
                        </div>

        
                        {/* <a href="#explore" className="text-right text-secondary hover:underline"> Explore More </a> */}
                    </div>
                    </div>       
                </div>

                <div>
                    <div className="max-w-full  sm:max-w-2xl lg:max-w-4xl mx-auto my-1 p-4 rounded-lg shadow-lg flex flex-col sm:flex-row justify-between items-center">
                    {/* Left section: Image */}
                    <div className="sm:w-1/2 mt-6 ml-4sm:mt-0">
                        <img className="w-full h-64 object-cover rounded-lg shadow-lg transform hover:scale-105 transition-transform duration-300"  src="card-images/card1.jpg"  alt="Tropical Paradise"
                        />
                    </div>

                    {/* Right section: Description */}
                    <div className="sm:w-1/2 p-6 text-center sm:text-left">
                        <h3 className="text-2xl font-semibold text-gray-800 mb-4 mt-14">Tropical Paradise Getaway</h3>
                        <p className="text-gray-600 mb-6">
                        Experience the ultimate beach holiday in the Caribbean with white sands, turquoise waters, and luxury resorts.
                        </p>


                        {/* Features list as chips */}
                        <div className="flex flex-wrap gap-3 mb-6">
                            <div className="flex items-center bg-blue-100 text-blue-700 text-sm font-medium py-1 px-4 rounded-full shadow-md hover:bg-blue-200 transition duration-300 gap-2">
                                <MdLocationPin />India
                            </div>
                            <div className="flex items-center bg-blue-100 text-blue-700 text-sm font-medium py-1 px-4 rounded-full shadow-md hover:bg-blue-200 transition duration-300 gap-2">
                                <FaLocationArrow  /> Channai
                            </div>
                            <div className="flex items-center bg-blue-100 text-blue-700 text-sm font-medium py-1 px-4 rounded-full shadow-md hover:bg-blue-200 transition duration-300 gap-2">
                                <FaCalendarDays /> 05 Days
                            </div>
                        </div>

        
                        {/* <a href="#explore" className="text-right text-secondary hover:underline"> Explore More </a> */}
                    </div>
                    </div>       
                </div>

                <div>
                    <div className="max-w-full  sm:max-w-2xl lg:max-w-4xl mx-auto my-1 p-4 rounded-lg shadow-lg flex flex-col sm:flex-row justify-between items-center">
                    {/* Left section: Image */}
                    <div className="sm:w-1/2 mt-6 ml-4sm:mt-0">
                        <img className="w-full h-64 object-cover rounded-lg shadow-lg transform hover:scale-105 transition-transform duration-300"  src="card-images/card1.jpg"  alt="Tropical Paradise"
                        />
                    </div>

                    {/* Right section: Description */}
                    <div className="sm:w-1/2 p-6 text-center sm:text-left">
                        <h3 className="text-2xl font-semibold text-gray-800 mb-4 mt-14">Tropical Paradise Getaway</h3>
                        <p className="text-gray-600 mb-6">
                        Experience the ultimate beach holiday in the Caribbean with white sands, turquoise waters, and luxury resorts.
                        </p>


                        {/* Features list as chips */}
                        <div className="flex flex-wrap gap-3 mb-6">
                            <div className="flex items-center bg-blue-100 text-blue-700 text-sm font-medium py-1 px-4 rounded-full shadow-md hover:bg-blue-200 transition duration-300 gap-2">
                                <MdLocationPin />India
                            </div>
                            <div className="flex items-center bg-blue-100 text-blue-700 text-sm font-medium py-1 px-4 rounded-full shadow-md hover:bg-blue-200 transition duration-300 gap-2">
                                <FaLocationArrow  /> Channai
                            </div>
                            <div className="flex items-center bg-blue-100 text-blue-700 text-sm font-medium py-1 px-4 rounded-full shadow-md hover:bg-blue-200 transition duration-300 gap-2">
                                <FaCalendarDays /> 05 Days
                            </div>
                        </div>

        
                        {/* <a href="#explore" className="text-right text-secondary hover:underline"> Explore More </a> */}
                    </div>
                    </div>       
                </div>



            </Slider>
        </div>
    </>
  )
}

export default HomePackages