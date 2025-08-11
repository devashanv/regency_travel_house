import React from 'react'
import { GrLocation } from "react-icons/gr";
import { IoIosTimer } from "react-icons/io";

function CareerCard(props) {
  return (
    <>
        <div  className="border-2 border-black rounded-2xl px-5 py-5 flex justify-center items center hover:bg-gray-100 hover:cursor-pointer">
            <div className="w-5/6 pr-20 flex flex-col gap-4">
                <h2 className="font-semibold text-xl">Travel Tour Manager</h2>
                <p className="text-gray-400">Lorem ipsum dolor sit amet consectetur adipisicing elit. Debitis eaque repellat placeat reprehenderit obcaecati, sequi quibusdam amet vitae nihil deleniti accusamus nesciunt earum. Perspiciatis, doloremque.</p>

                {/* chips */}
                  <div className="flex flex-wrap justify-center lg:justify-start gap-4">
                      <span className="flex items-center gap-2 px-4 py-2 bg-body text-indigo-800 rounded-full text-sm sm:text-base font-medium">
                          <span className="text-lg"><GrLocation /></span> Kandy, Sri Lanka
                      </span>
                      <span className="flex items-center gap-2 px-4 py-2 bg-body text-indigo-800 rounded-full text-sm sm:text-base font-medium">
                          <span className="text-lg"><IoIosTimer /></span> Ful-time
                      </span>
                  </div>
            </div>
            <div className="">
               <button className={" border-2 border-border-primary rounded-full text-text-primary text-xs md:w-full lg:w-32 lg:text-base hover:bg-primary hover:border-transparent hover:text-body hover:cursor-pointer h-12 transition duration-300 ease-in-out"}>
                  <span>Apply Now</span>
              </button> 
            </div>
        </div>
    </>
  )
}

export default CareerCard