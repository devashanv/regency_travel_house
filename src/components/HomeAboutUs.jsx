import React from 'react'
import AboutImg1 from '../assets/aboutus1.jpg'
import AboutImg2 from '../assets/aboutus2.jpg'

import { FaHotel } from "react-icons/fa6";
import { PiAirplaneTiltFill } from "react-icons/pi";
import { MdAssistantDirection } from "react-icons/md";
import { FaHandsHelping } from "react-icons/fa";

function HomeAboutUs() {
  return (
    <>
        <div className="w-full">
            <div className="max-w-7xl mx-auto flex flex-col lg:flex-row items-center gap-12">
                {/* Images Section */}
                <div className="relative h-[85vh] w-full lg:w-1/2 flex justify-center">
                    <img src={AboutImg1} alt="" className="w-full rounded-2xl h-full object-cover"/>
                    <div className="absolute inset-0 rounded-2xl bg-gradient-to-t from-black/80 via-black/20 to-transparent z-10" />
                    <div className="absolute bg-body to-transparent z-10 bottom-5 left-5 w-50 h-20 rounded-lg flex flex-row gap-3  px-2 items-center hover:cursor-pointer hover:scale-110 transition">
                        <img src={AboutImg2} alt="" className="w-1/2 h-[80%] rounded-lg"/>
                        <p className="1/2 text-xs">More about Regency Travel House</p>
                    </div>
                </div>
                
                
                {/* Text Section */}
                <div className="w-full lg:w-1/2 text-center lg:text-left space-y-6">
                    <div className="">
                        <h2 className="text-xl font-semibold text-gray-600">Who are we?</h2>
                        <p className="text-primary font-bold text-title mt-8 mb-3 pr-20">Discover Your Next Adventure, Your journey begins here</p>
                        <p className="mb-3 text-gray-500"> At WanderScape Travels, we craft unforgettable travel experiences
                        tailored to your dreams. Whether it’s relaxing on a tropical beach,
                        exploring ancient cities, or chasing adventure—we’re here to guide
                        every step.</p>
                    </div>

                    {/* Feature Tags */}
                    <div className="flex flex-wrap justify-center lg:justify-start gap-4 mt-15">
                        <span className="flex items-center gap-2 px-4 py-2 bg-body text-indigo-800 rounded-full text-sm sm:text-base font-medium">
                            <span className="text-lg"><FaHotel /></span> Hotel Stay
                        </span>
                        <span className="flex items-center gap-2 px-4 py-2 bg-body text-indigo-800 rounded-full text-sm sm:text-base font-medium">
                            <span className="text-lg"><PiAirplaneTiltFill /></span> Air Travel
                        </span>
                        <span className="flex items-center gap-2 px-4 py-2 bg-body text-indigo-800 rounded-full text-sm sm:text-base font-medium">
                            <span className="text-lg"><MdAssistantDirection /></span> Guided Tours
                        </span>
                        <span className="flex items-center gap-2 px-4 py-2 bg-body text-indigo-800 rounded-full text-sm sm:text-base font-medium">
                            <span className="text-lg"><FaHandsHelping /></span> Travel Support
                        </span>
                    </div>
                </div>
            </div>
        </div>
    </>
  )
}

export default HomeAboutUs