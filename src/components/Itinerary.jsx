import React, { useState } from "react";
import { motion } from "framer-motion";

const Itinerary = ({ day, index, isActive, onToggle }) => {
  return (
    <div className="relative border-l-4 border-gray-200 pl-6">
      <div className="mb-8 relative">
        {/* Vertical Line Dot */}
        <div className="absolute left-[-20px] bg-blue-50 top-1.5">
          <div
            className={`w-4 h-4 rounded-full border-4 ${
              isActive ? "border-red-500 bg-white" : "border-gray-300 bg-white"
            }`}
          ></div>
        </div>

        {/* Distance */}
        <div className="flex justify-between items-start gap-4 p-4 rounded-md">
          <div className="w-full">
            <h3
              className="text-lg font-semibold cursor-pointer"
              onClick={onToggle}
            >
              {day.title || `Day ${day.day_number}`}
            </h3>
            <p className="text-sm text-gray-500">{day.location}</p>

            {/* Accordion */}
            {isActive && day.description && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                transition={{ duration: 0.3 }}
                className="bg-white lg:w-110 sm:w-65 p-4 rounded border  border-secondary mt-2 "
              >
                <p className="mb-3 text-gray-700 ">{day.description}</p>
              
              </motion.div>
            )}
          </div>

          <span className="text-sm bg-gray-100 px-3 py-1 rounded-full whitespace-nowrap">
            {day.day_number}
          </span>
        </div>
      </div>
    </div>
  );
};

export default Itinerary;
